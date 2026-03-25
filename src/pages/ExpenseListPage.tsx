import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useExpenseStore, expenseCategories } from '../store/expenseStore';

const statusConfig: Record<string, { label: string; color: string }> = {
  draft: { label: '下書き', color: 'bg-zinc-500/10 text-zinc-400' },
  pending: { label: '承認待ち', color: 'bg-amber-500/10 text-amber-400' },
  approved: { label: '承認済み', color: 'bg-emerald-500/10 text-emerald-400' },
  rejected: { label: '却下', color: 'bg-red-500/10 text-red-400' },
};

export default function ExpenseListPage() {
  const { expenses, deleteExpense } = useExpenseStore();
  const [filter, setFilter] = useState<string | null>(null);

  const filtered = filter ? expenses.filter((e) => e.status === filter) : expenses;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">申請一覧</h1>
        <p className="text-sm text-zinc-500">{expenses.length}件の申請</p>
      </div>
      <div className="flex gap-2">
        <button onClick={() => setFilter(null)} className={`px-3 py-1.5 rounded-lg text-sm font-medium ${!filter ? 'bg-emerald-500/10 text-emerald-400' : 'text-zinc-400 hover:text-white'}`}>すべて</button>
        {Object.entries(statusConfig).map(([key, { label }]) => (
          <button key={key} onClick={() => setFilter(key)} className={`px-3 py-1.5 rounded-lg text-sm font-medium ${filter === key ? 'bg-emerald-500/10 text-emerald-400' : 'text-zinc-400 hover:text-white'}`}>{label}</button>
        ))}
      </div>
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead><tr className="border-b border-zinc-800">
            <th className="text-left text-xs text-zinc-500 px-5 py-3">件名</th>
            <th className="text-left text-xs text-zinc-500 px-5 py-3">カテゴリ</th>
            <th className="text-left text-xs text-zinc-500 px-5 py-3">金額</th>
            <th className="text-left text-xs text-zinc-500 px-5 py-3">日付</th>
            <th className="text-left text-xs text-zinc-500 px-5 py-3">ステータス</th>
            <th className="text-left text-xs text-zinc-500 px-5 py-3"></th>
          </tr></thead>
          <tbody>
            {filtered.map((e) => (
              <tr key={e.id} className="border-b border-zinc-800/50 last:border-0 hover:bg-zinc-800/30 group">
                <td className="px-5 py-3 text-sm text-white">{e.title}</td>
                <td className="px-5 py-3 text-sm text-zinc-400">{e.category}</td>
                <td className="px-5 py-3 text-sm font-semibold text-white">¥{e.amount.toLocaleString()}</td>
                <td className="px-5 py-3 text-sm text-zinc-500">{e.date}</td>
                <td className="px-5 py-3"><span className={`text-xs px-2 py-0.5 rounded-full ${statusConfig[e.status].color}`}>{statusConfig[e.status].label}</span></td>
                <td className="px-5 py-3"><button onClick={() => deleteExpense(e.id)} className="opacity-0 group-hover:opacity-100 text-zinc-500 hover:text-red-400"><Trash2 className="w-4 h-4" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="text-center text-zinc-500 py-8">該当する申請がありません</p>}
      </div>
    </div>
  );
}
