from pydantic import BaseModel, validator
from typing import Dict
from datetime import datetime

class Answer(BaseModel):
    question_id: str
    score: int
    
    @validator('score')
    def validate_score(cls, v):
        if not (0 <= v <= 3):
            raise ValueError('Score must be between 0 and 3')
        return v

class AssessmentSession(BaseModel):
    id: str
    company_name: str
    industry: str
    size: str
    answers: Dict[str, int]
    created_at: datetime
    status: str  # in_progress, completed
