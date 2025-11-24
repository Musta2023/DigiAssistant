from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Dict
import json
from datetime import datetime

router = APIRouter()

class Answer(BaseModel):
    question_id: str
    score: int  # 0-3

class AssessmentAnswers(BaseModel):
    company_name: str
    industry: str
    size: str
    answers: Dict[str, int]

# In-memory storage (replace with database in production)
assessments = {}

@router.post("/assessment/start")
async def start_assessment(company_name: str, industry: str, size: str):
    """Start a new assessment"""
    assessment_id = datetime.now().strftime("%Y%m%d%H%M%S")
    assessments[assessment_id] = {
        "id": assessment_id,
        "company_name": company_name,
        "industry": industry,
        "size": size,
        "answers": {},
        "created_at": datetime.now().isoformat(),
        "status": "in_progress"
    }
    return {"assessment_id": assessment_id, "message": "Assessment started"}

@router.post("/assessment/{assessment_id}/answer")
async def submit_answer(assessment_id: str, answer: Answer):
    """Submit an answer to a question"""
    if assessment_id not in assessments:
        raise HTTPException(status_code=404, detail="Assessment not found")
    
    if not (0 <= answer.score <= 3):
        raise HTTPException(status_code=400, detail="Score must be between 0 and 3")
    
    assessments[assessment_id]["answers"][answer.question_id] = answer.score
    return {"message": "Answer recorded", "questions_answered": len(assessments[assessment_id]["answers"])}

@router.get("/assessment/{assessment_id}")
async def get_assessment(assessment_id: str):
    """Get assessment details"""
    if assessment_id not in assessments:
        raise HTTPException(status_code=404, detail="Assessment not found")
    
    return assessments[assessment_id]

@router.post("/assessment/{assessment_id}/complete")
async def complete_assessment(assessment_id: str):
    """Mark assessment as complete"""
    if assessment_id not in assessments:
        raise HTTPException(status_code=404, detail="Assessment not found")
    
    assessments[assessment_id]["status"] = "completed"
    assessments[assessment_id]["completed_at"] = datetime.now().isoformat()
    return {"message": "Assessment completed", "assessment_id": assessment_id}
