from app.schemas.scoring import ScoringRequest, ScoringResponse


def _employment_score(employment_type: str) -> float:
    scores = {"正社員": 1.0, "契約社員": 0.7, "派遣社員": 0.6, "自営業": 0.5, "無職": 0.0}
    return scores.get(employment_type, 0.5)


def _credit_history_score(credit_history: str) -> float:
    scores = {"良好": 1.0, "なし": 0.6, "遅延あり": 0.2, "債務整理歴あり": 0.0}
    return scores.get(credit_history, 0.5)


def _debt_ratio(annual_income: int, existing_debt: int, loan_amount: int) -> float:
    if annual_income == 0:
        return 1.0
    total_debt = existing_debt + loan_amount
    return total_debt / annual_income


def calculate_score(req: ScoringRequest) -> ScoringResponse:
    reasons = []

    # 各指標のスコア計算
    employment_s = _employment_score(req.employment_type)
    credit_s = _credit_history_score(req.credit_history)
    debt_ratio = _debt_ratio(req.annual_income, req.existing_debt, req.loan_amount)

    income_s = min(req.annual_income / 800, 1.0)
    tenure_s = min(req.years_employed / 10, 1.0)
    debt_s = max(0.0, 1.0 - debt_ratio / 0.5)  # 負債比率50%超で0点
    age_s = 1.0 if 25 <= req.age <= 55 else 0.7

    # 重み付き合計（合計重み = 1.0）
    raw = (
        employment_s * 0.25
        + credit_s * 0.25
        + income_s * 0.20
        + debt_s * 0.15
        + tenure_s * 0.10
        + age_s * 0.05
    )

    score = round(raw * 100)
    probability = round(raw, 3)

    # 審査理由の生成
    if employment_s < 0.6:
        reasons.append("雇用形態がリスク要因です")
    if credit_s < 0.5:
        reasons.append("信用履歴に問題があります")
    if debt_ratio > 0.4:
        reasons.append(f"負債比率が高めです（{debt_ratio:.0%}）")
    if req.annual_income < 300:
        reasons.append("年収が基準を下回っています")
    if req.years_employed < 2:
        reasons.append("勤続年数が短いです")
    if not reasons:
        reasons.append("審査基準を概ね満たしています")

    # 審査結果の判定
    if score >= 65:
        result = "承認"
        max_loan = min(req.loan_amount, req.annual_income * 5)
    elif score >= 45:
        result = "条件付き承認"
        max_loan = min(req.loan_amount, req.annual_income * 2)
    else:
        result = "否決"
        max_loan = 0

    return ScoringResponse(
        score=score,
        result=result,
        probability=probability,
        reasons=reasons,
        max_loan_amount=max_loan,
    )
