from pydantic import BaseModel, Field
from typing import Literal


class ScoringRequest(BaseModel):
    age: int = Field(..., ge=18, le=80, description="年齢")
    annual_income: int = Field(..., ge=0, description="年収（万円）")
    employment_type: Literal["正社員", "契約社員", "派遣社員", "自営業", "無職"] = Field(..., description="雇用形態")
    years_employed: int = Field(..., ge=0, description="勤続年数")
    loan_amount: int = Field(..., ge=10, description="借入希望額（万円）")
    loan_purpose: Literal["住宅", "自動車", "教育", "事業", "生活費", "その他"] = Field(..., description="借入目的")
    existing_loans: int = Field(..., ge=0, description="現在の借入件数")
    existing_debt: int = Field(..., ge=0, description="現在の借入残高（万円）")
    credit_history: Literal["良好", "遅延あり", "債務整理歴あり", "なし"] = Field(..., description="信用履歴")


class ScoringResponse(BaseModel):
    score: int = Field(..., ge=0, le=100, description="与信スコア（0-100）")
    result: Literal["承認", "条件付き承認", "否決"]
    probability: float = Field(..., ge=0.0, le=1.0, description="返済可能確率")
    reasons: list[str] = Field(..., description="審査理由")
    max_loan_amount: int = Field(..., description="承認可能な最大融資額（万円）")
