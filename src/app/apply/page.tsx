"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ScoringRequest, EmploymentType, LoanPurpose, CreditHistory } from "@/types/scoring";
import { scoreApplication } from "@/lib/api";

const EMPLOYMENT_TYPES: EmploymentType[] = ["正社員", "契約社員", "派遣社員", "自営業", "無職"];
const LOAN_PURPOSES: LoanPurpose[] = ["住宅", "自動車", "教育", "事業", "生活費", "その他"];
const CREDIT_HISTORIES: CreditHistory[] = ["良好", "なし", "遅延あり", "債務整理歴あり"];

export default function ApplyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<ScoringRequest & { applicant_name: string }>({
    applicant_name: "",
    age: 30,
    annual_income: 500,
    employment_type: "正社員",
    years_employed: 5,
    loan_amount: 100,
    loan_purpose: "生活費",
    existing_loans: 0,
    existing_debt: 0,
    credit_history: "良好",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { applicant_name, ...scoringInput } = form;
      const result = await scoreApplication(scoringInput);
      sessionStorage.setItem("scoring_result", JSON.stringify(result));
      sessionStorage.setItem("applicant_name", applicant_name);
      router.push("/result");
    } catch {
      setError("審査中にエラーが発生しました。バックエンドが起動しているか確認してください。");
    } finally {
      setLoading(false);
    }
  };

  const set = (key: string, value: string | number) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <main className="min-h-screen bg-slate-950 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">与信審査申請</h1>
        <p className="text-slate-400 mb-8">必要事項を入力してください。審査結果は即時に表示されます。</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Section title="申請者情報">
            <Field label="お名前">
              <input
                type="text"
                required
                value={form.applicant_name}
                onChange={(e) => set("applicant_name", e.target.value)}
                className={inputClass}
                placeholder="山田 太郎"
              />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="年齢">
                <input type="number" required min={18} max={80} value={form.age}
                  onChange={(e) => set("age", Number(e.target.value))} className={inputClass} />
              </Field>
              <Field label="年収（万円）">
                <input type="number" required min={0} value={form.annual_income}
                  onChange={(e) => set("annual_income", Number(e.target.value))} className={inputClass} />
              </Field>
            </div>
          </Section>

          <Section title="雇用情報">
            <div className="grid grid-cols-2 gap-4">
              <Field label="雇用形態">
                <select value={form.employment_type}
                  onChange={(e) => set("employment_type", e.target.value)} className={inputClass}>
                  {EMPLOYMENT_TYPES.map((t) => <option key={t}>{t}</option>)}
                </select>
              </Field>
              <Field label="勤続年数">
                <input type="number" required min={0} value={form.years_employed}
                  onChange={(e) => set("years_employed", Number(e.target.value))} className={inputClass} />
              </Field>
            </div>
          </Section>

          <Section title="借入情報">
            <div className="grid grid-cols-2 gap-4">
              <Field label="借入希望額（万円）">
                <input type="number" required min={10} value={form.loan_amount}
                  onChange={(e) => set("loan_amount", Number(e.target.value))} className={inputClass} />
              </Field>
              <Field label="借入目的">
                <select value={form.loan_purpose}
                  onChange={(e) => set("loan_purpose", e.target.value)} className={inputClass}>
                  {LOAN_PURPOSES.map((p) => <option key={p}>{p}</option>)}
                </select>
              </Field>
              <Field label="現在の借入件数">
                <input type="number" required min={0} value={form.existing_loans}
                  onChange={(e) => set("existing_loans", Number(e.target.value))} className={inputClass} />
              </Field>
              <Field label="現在の借入残高（万円）">
                <input type="number" required min={0} value={form.existing_debt}
                  onChange={(e) => set("existing_debt", Number(e.target.value))} className={inputClass} />
              </Field>
            </div>
          </Section>

          <Section title="信用情報">
            <Field label="信用履歴">
              <select value={form.credit_history}
                onChange={(e) => set("credit_history", e.target.value)} className={inputClass}>
                {CREDIT_HISTORIES.map((h) => <option key={h}>{h}</option>)}
              </select>
            </Field>
          </Section>

          {error && (
            <div className="bg-red-900/30 border border-red-700 text-red-300 rounded-lg p-4 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-semibold py-4 rounded-xl transition-colors text-lg"
          >
            {loading ? "審査中..." : "審査を申し込む"}
          </button>
        </form>
      </div>
    </main>
  );
}

const inputClass =
  "w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
      <h2 className="text-slate-300 font-semibold mb-4">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-slate-400 text-sm mb-1">{label}</label>
      {children}
    </div>
  );
}
