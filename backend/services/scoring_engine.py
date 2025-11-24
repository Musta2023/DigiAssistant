"""
Scoring Engine - Core business logic for DigiMaturity
"""

def calculate_criterion_score(raw_response: int) -> int:
    """Convert raw response (0-3) to criterion score"""
    return max(0, min(3, raw_response))

def calculate_palier_score(criterion_scores: list) -> int:
    """Sum of 3 criteria (0-9)"""
    return sum(criterion_scores)

def calculate_dimension_score(palier_scores: list) -> float:
    """Sum of 4 paliers converted to percentage (0-36 -> 0-100)"""
    total = sum(palier_scores)
    return (total / 36) * 100

def calculate_global_score(dimension_percentages: list) -> float:
    """Average of 6 dimension percentages"""
    return sum(dimension_percentages) / len(dimension_percentages)

def determine_profile(global_score: float) -> str:
    """Determine maturity profile"""
    if global_score < 26:
        return "Débutant"
    elif global_score < 51:
        return "Émergent"
    elif global_score < 76:
        return "Challenger"
    else:
        return "Leader"

def identify_gaps(dimension_scores: dict, profile: str) -> list:
    """Identify digital gaps based on profile"""
    profile_targets = {
        "Débutant": 1,
        "Émergent": 2,
        "Challenger": 3,
        "Leader": 4
    }
    
    target_palier = profile_targets.get(profile, 1)
    gaps = []
    
    for dim_id, scores in dimension_scores.items():
        for palier_level, palier_score in scores['paliers'].items():
            if palier_score < (target_palier * 3):
                gaps.append(f"{scores['name']} - {palier_level}")
    
    return gaps
