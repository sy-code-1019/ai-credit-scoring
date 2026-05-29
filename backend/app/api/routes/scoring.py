from fastapi import APIRouter
from app.schemas.scoring import ScoringRequest, ScoringResponse
from app.ml.scorer import calculate_score

router = APIRouter()


@router.post("/", response_model=ScoringResponse)
def score(request: ScoringRequest):
    return calculate_score(request)
