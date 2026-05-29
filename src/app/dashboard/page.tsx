import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-950 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">審査履歴ダッシュボード</h1>
            <p className="text-slate-400 mt-1">過去の審査結果一覧</p>
          </div>
          <Link
            href="/apply"
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            新規申請
          </Link>
        </div>

        <div className="bg-slate-900 rounded-xl border border-slate-800 p-8 text-center">
          <p className="text-slate-500">
            ダッシュボードはバックエンド接続後に履歴が表示されます。
          </p>
          <p className="text-slate-600 text-sm mt-2">
            GET /api/applications/ で取得
          </p>
        </div>
      </div>
    </main>
  );
}
