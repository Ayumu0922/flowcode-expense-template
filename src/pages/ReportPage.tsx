import { motion } from 'framer-motion';
import { useExpenseStore, expenseCategories } from '../store/expenseStore';

export default function ReportPage() {
  const { expenses } = useExpenseStore();
  const total = expenses.reduce((s, e) => s + e.amount, 0);
  const approved = expenses.filter((e) => e.status === 'approved').reduce((s, e) => s + e.amount, 0);
  const pending = expenses.filter((e) => e.status === 'pending').reduce((s, e) => s + e.amount, 0);

  const byCategory = expenseCategories.map((cat) => ({
    category: cat,
    amount: expenses.filter((e) => e.category === cat).reduce((s, e) => s + e.amount, 0),
    count: expenses.filter((e) => e.category === cat).length,
  })).filter((c) => c.count > 0);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-xl font-bold text-white">レポート</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5"><p className="text-xs text-zinc-500 mb-1">総申請額</p><p className="text-2xl font-bold text-white">¥{total.toLocaleString()}</p></div>
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5"><p className="text-xs text-zinc-500 mb-1">承認済み</p><p className="text-2xl font-bold text-accent-400">¥{approved.toLocaleString()}</p></div>
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5"><p className="text-xs text-zinc-500 mb-1">承認待ち</p><p className="text-2xl font-bold text-amber-400">¥{pending.toLocaleString()}</p></div>
      </div>
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
        <h2 className="text-sm font-semibold text-white mb-4">カテゴリ別</h2>
        <div className="space-y-3">
          {byCategory.map((c) => (
            <div key={c.category}>
              <div className="flex justify-between text-sm mb-1"><span className="text-zinc-300">{c.category} ({c.count}件)</span><span className="text-white font-semibold">¥{c.amount.toLocaleString()}</span></div>
              <div className="w-full bg-zinc-800 rounded-full h-2"><div className="h-2 rounded-full bg-accent-500 transition-all" style={{ width: `${(c.amount / total) * 100}%` }} /></div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
