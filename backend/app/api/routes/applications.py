from fastapi import APIRouter
from app.schemas.application import ApplicationCreate, ApplicationResponse
from app.schemas.scoring import ScoringResponse
from app.ml.scorer import calculate_score
from datetime import datetime

router = APIRouter()

# インメモリストア（DB接続前の暫定実装）
_store: list[dict] = []
_counter = 1


@router.post("/", response_model=ApplicationResponse)
def create_application(body: ApplicationCreate):
    global _counter
    result: ScoringResponse = calculate_score(body.scoring_input)
    record = {
        "id": _counter,
        "applicant_name": body.applicant_name,
        "scoring_input": body.scoring_input,
        "scoring_result": result,
        "created_at": datetime.now(),
    }
    _store.append(record)
    _counter += 1
    return record


@router.get("/", response_model=list[ApplicationResponse])
def list_applications():
    return _store
