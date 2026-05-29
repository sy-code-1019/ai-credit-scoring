import { ScoringRequest, ScoringResponse, ApplicationCreate } from "@/types/scoring";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export async function scoreApplication(data: ScoringRequest): Promise<ScoringResponse> {
  const res = await fetch(`${API_BASE}/api/scoring/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("スコアリングAPIエラー");
  return res.json();
}

export async function submitApplication(data: ApplicationCreate): Promise<void> {
  const res = await fetch(`${API_BASE}/api/applications/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("申請送信エラー");
}
