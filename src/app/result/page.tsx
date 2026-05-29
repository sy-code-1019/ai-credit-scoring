"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ScoringResponse, ScoringResult } from "@/types/scoring";

const resultConfig: Record<ScoringResult, { color: string; bg: string; label: string }> = {
  承認: { color: "text-green-400", bg: "bg-green-500/10 border-green-500/30", label: "承認" },
  条件付き承認: { color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/30", label: "条件付き承認" },
  否決: { color: "text-red-400", bg: "bg-red-500/10 border-red-500/30", label: "否決" },
};

export default function ResultPage() {
  const [result, setResult] = useState<ScoringResponse | null>(null);
  const [name, setName] = useState("");

  useEffect(() => {
    const raw = sessionStorage.getItem("scoring_result");
    const n = sessionStorage.getItem("applicant_name");
    if (raw) setResult(JSON.parse(raw));
    if (n) setName(n);
  }, []);

  if (!result) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400 mb-4">審査結果がありません</p>
          <Link href="/apply" className="text-blue-400 hover:text-blue-300">申請ページへ</Link>
        </div>
      </main>
    );
  }

  const config = resultConfig[result.result];

  return (
    <main className="min-h-screen bg-slate-950 py-12 px-4">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">審査結果</h1>

        <div className={`rounded-2xl border p-8 mb-6 text-center ${config.bg}`}>
          <p className="text-slate-400 text-sm mb-2">{name} 様</p>
          <div className={`text-5xl font-bold mb-4 ${config.color}`}>{config.label}</div>
          <div className="flex justify-center gap-8 mt-6">
            <div>
              <div className="text-4xl font-bold text-white">{result.score}</div>
              <div className="text-slate-400 text-sm mt-1">与信スコア（/100）</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white">{Math.round(result.probability * 100)}%</div>
              <div className="text-slate-400 text-sm mt-1">返済可能確率</div>
            </div>
          </div>
        </div>

        {result.result !== "否決" && (
          <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 mb-6">
            <h2 className="text-slate-300 font-semibold mb-2">承認可能額</h2>
            <div className="text-3xl font-bold text-blue-400">
              {result.max_loan_amount.toLocaleString()} 万円
            </div>
          </div>
        )}

        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 mb-8">
          <h2 className="text-slate-300 font-semibold mb-4">審査理由</h2>
          <ul className="space-y-2">
            {result.reasons.map((reason, i) => (
              <li key={i} className="flex items-start gap-2 text-slate-400">
                <span className="text-blue-400 mt-0.5">•</span>
                {reason}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-4">
          <Link
            href="/apply"
            className="flex-1 text-center bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            新規申請
          </Link>
          <Link
            href="/"
            className="flex-1 text-center border border-slate-700 hover:border-slate-500 text-slate-300 font-semibold py-3 rounded-xl transition-colors"
          >
            トップへ戻る
          </Link>
        </div>
      </div>
    </main>
  );
}
