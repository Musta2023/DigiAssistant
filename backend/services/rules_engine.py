"""
Rules Engine - Business rules for assessment logic
"""

QUESTION_RULES = {
    "max_per_dimension": 12,
    "max_per_palier": 3,
    "score_range": (0, 3),
    "total_questions": 72
}

PROFILE_RULES = {
    "Débutant": {
        "min": 0,
        "max": 25,
        "description": "Phase initiale"
    },
    "Émergent": {
        "min": 26,
        "max": 50,
        "description": "Transformation en cours"
    },
    "Challenger": {
        "min": 51,
        "max": 75,
        "description": "Transition avancée"
    },
    "Leader": {
        "min": 76,
        "max": 100,
        "description": "Mature et leader"
    }
}

def validate_score(score: int) -> bool:
    """Validate score is within allowed range"""
    return QUESTION_RULES["score_range"][0] <= score <= QUESTION_RULES["score_range"][1]

def get_profile_recommendation(profile: str) -> str:
    """Get recommendation based on profile"""
    recommendations = {
        "Débutant": "Établir une stratégie claire et engager la direction",
        "Émergent": "Accélérer l'adoption et renforcer les compétences",
        "Challenger": "Optimiser l'intégration et innover",
        "Leader": "Maintenir l'avantage et explorer de nouvelles frontières"
    }
    return recommendations.get(profile, "")
