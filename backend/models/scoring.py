from pydantic import BaseModel
from typing import Dict, List

class DimensionScore(BaseModel):
    name: str
    score: int
    percentage: float
    paliers: Dict[str, int]

class ScoringResult(BaseModel):
    dimension_scores: Dict[str, DimensionScore]
    global_score: float
    profile: str
    digital_gaps: List[str]
