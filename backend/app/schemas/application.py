from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from app.schemas.scoring import ScoringRequest, ScoringResponse


class ApplicationCreate(BaseModel):
    applicant_name: str = Field(..., min_length=1, max_length=50)
    scoring_input: ScoringRequest


class ApplicationResponse(BaseModel):
    id: int
    applicant_name: str
    scoring_input: ScoringRequest
    scoring_result: ScoringResponse
    created_at: datetime

    class Config:
        from_attributes = True
