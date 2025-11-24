from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Dict, List
import json

router = APIRouter()

def load_criteria():
    with open('data/criteria.json', 'r', encoding='utf-8') as f:
        return json.load(f)

class ScoringRequest(BaseModel):
    assessment_id: str
    answers: Dict[str, int]

class ScoringResult(BaseModel):
    dimension_scores: Dict[str, int]
    global_score: float
    profile: str
    digital_gaps: List[str]

def calculate_scores(answers: Dict[str, int]):
    """Calculate all scores from answers"""
    criteria = load_criteria()
    
    dimension_scores = {}
    
    for dimension in criteria['dimensions']:
        dimension_score = 0
        palier_scores = {}
        
        for palier in dimension['paliers']:
            palier_score = 0
            for criterion in palier['criteria']:
                criterion_id = criterion['id']
                score = answers.get(criterion_id, 0)
                palier_score += score
            
            palier_scores[f"palier_{palier['level']}"] = palier_score
            dimension_score += palier_score
        
        # Convert to percentage (0-36 -> 0-100)
        dimension_percentage = (dimension_score / 36) * 100
        dimension_scores[dimension['id']] = {
            "name": dimension['name'],
            "score": dimension_score,
            "percentage": round(dimension_percentage, 1),
            "paliers": palier_scores
        }
    
    # Calculate global score
    global_score = sum(d['percentage'] for d in dimension_scores.values()) / len(dimension_scores)
    
    # Determine profile
    if global_score < 26:
        profile = "Débutant"
    elif global_score < 51:
        profile = "Émergent"
    elif global_score < 76:
        profile = "Challenger"
    else:
        profile = "Leader"
    
    # Identify digital gaps
    digital_gaps = []
    profile_threshold = {
        "Débutant": 1,
        "Émergent": 2,
        "Challenger": 3,
        "Leader": 4
    }
    
    threshold = profile_threshold.get(profile, 1)
    for dimension_id, scores in dimension_scores.items():
        for palier_key, palier_score in scores['paliers'].items():
            if palier_score < (threshold * 3):
                digital_gaps.append(f"{scores['name']} - {palier_key}")
    
    return {
        "dimension_scores": dimension_scores,
        "global_score": round(global_score, 1),
        "profile": profile,
        "digital_gaps": digital_gaps
    }

@router.post("/scoring/calculate")
async def calculate_scoring(request: ScoringRequest):
    """Calculate scores for an assessment"""
    if not request.answers:
        raise HTTPException(status_code=400, detail="No answers provided")
    
    result = calculate_scores(request.answers)
    return result

@router.get("/scoring/benchmark")
async def get_benchmark_scores():
    """Get benchmark scores by profile"""
    return {
        "Débutant": {
            "range": "0-25%",
            "description": "Organisation en phase initiale de transformation numérique"
        },
        "Émergent": {
            "range": "26-50%",
            "description": "Organisation ayant commencé la transformation numérique"
        },
        "Challenger": {
            "range": "51-75%",
            "description": "Organisation en transition avancée vers le numérique"
        },
        "Leader": {
            "range": "76-100%",
            "description": "Organisation mature et leader en matière numérique"
        }
    }
