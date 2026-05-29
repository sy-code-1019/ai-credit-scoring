export type EmploymentType = "正社員" | "契約社員" | "派遣社員" | "自営業" | "無職";
export type LoanPurpose = "住宅" | "自動車" | "教育" | "事業" | "生活費" | "その他";
export type CreditHistory = "良好" | "遅延あり" | "債務整理歴あり" | "なし";
export type ScoringResult = "承認" | "条件付き承認" | "否決";

export interface ScoringRequest {
  age: number;
  annual_income: number;
  employment_type: EmploymentType;
  years_employed: number;
  loan_amount: number;
  loan_purpose: LoanPurpose;
  existing_loans: number;
  existing_debt: number;
  credit_history: CreditHistory;
}

export interface ScoringResponse {
  score: number;
  result: ScoringResult;
  probability: number;
  reasons: string[];
  max_loan_amount: number;
}

export interface ApplicationCreate {
  applicant_name: string;
  scoring_input: ScoringRequest;
}
