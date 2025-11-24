from pydantic import BaseModel
from typing import List

class Criterion(BaseModel):
    id: str
    label: str
    description: str

class Palier(BaseModel):
    level: int
    name: str
    criteria: List[Criterion]

class Dimension(BaseModel):
    id: str
    name: str
    description: str
    paliers: List[Palier]

class QuestionsResponse(BaseModel):
    total: int
    questions: List[dict]
