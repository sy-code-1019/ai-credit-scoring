import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-950 flex items-center justify-center p-8">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-6">
          <span className="inline-block bg-blue-500/20 text-blue-300 text-sm font-medium px-4 py-1 rounded-full border border-blue-500/30">
            AI与信審査システム
          </span>
        </div>
        <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
          公平・迅速な<br />
          <span className="text-blue-400">与信審査</span>をAIで
        </h1>
        <p className="text-slate-400 text-lg mb-10">
          従来数日かかっていた審査を即時に。<br />
          機械学習モデルが客観的にスコアリングします。
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/apply"
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-xl transition-colors text-lg"
          >
            審査を申し込む
          </Link>
          <Link
            href="/dashboard"
            className="border border-slate-600 hover:border-slate-400 text-slate-300 font-semibold px-8 py-4 rounded-xl transition-colors text-lg"
          >
            審査履歴を見る
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-6 text-center">
          {[
            { value: "即時", label: "審査時間" },
            { value: "客観的", label: "判断基準" },
            { value: "透明性", label: "審査理由の提示" },
          ].map((item) => (
            <div key={item.label} className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
              <div className="text-2xl font-bold text-blue-400">{item.value}</div>
              <div className="text-slate-400 text-sm mt-1">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
