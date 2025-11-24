from fastapi import APIRouter, HTTPException
from typing import List
import json

router = APIRouter()

def load_criteria():
    with open('data/criteria.json', 'r', encoding='utf-8') as f:
        return json.load(f)

@router.get("/questions")
async def get_all_questions():
    """Get all 72 questions"""
    criteria = load_criteria()
    questions_list = []
    for dimension in criteria['dimensions']:
        for palier in dimension['paliers']:
            for criterion in palier['criteria']:
                questions_list.append({
                    "id": criterion['id'],
                    "dimension": dimension['name'],
                    "dimension_id": dimension['id'],
                    "palier": palier['level'],
                    "label": criterion['label'],
                    "description": criterion['description']
                })
    return {"total": len(questions_list), "questions": questions_list}

@router.get("/questions/{dimension_id}")
async def get_dimension_questions(dimension_id: str):
    """Get questions for a specific dimension"""
    criteria = load_criteria()
    for dimension in criteria['dimensions']:
        if dimension['id'] == dimension_id:
            questions_list = []
            for palier in dimension['paliers']:
                for criterion in palier['criteria']:
                    questions_list.append({
                        "id": criterion['id'],
                        "palier": palier['level'],
                        "label": criterion['label'],
                        "description": criterion['description']
                    })
            return {"dimension": dimension['name'], "questions": questions_list}
    raise HTTPException(status_code=404, detail="Dimension not found")

@router.get("/dimensions")
async def get_dimensions():
    """Get all dimensions"""
    criteria = load_criteria()
    dimensions = [
        {
            "id": d['id'],
            "name": d['name'],
            "description": d['description'],
            "paliers": len(d['paliers'])
        }
        for d in criteria['dimensions']
    ]
    return {"dimensions": dimensions}
