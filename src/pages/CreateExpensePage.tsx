import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useExpenseStore, expenseCategories } from '../store/expenseStore';

export default function CreateExpensePage() {
  const { addExpense } = useExpenseStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', amount: '', category: expenseCategories[0], date: new Date().toISOString().split('T')[0], receipt: true, note: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.amount) return;
    addExpense({ ...form, amount: Number(form.amount) });
    navigate('/');
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
      <h1 className="text-xl font-bold text-white mb-6">経費申請</h1>
      <form onSubmit={handleSubmit} className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 space-y-4">
        <div><label className="text-xs text-zinc-500 block mb-1">件名</label>
          <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500/50" /></div>
        <div className="grid grid-cols-3 gap-4">
          <div><label className="text-xs text-zinc-500 block mb-1">金額</label>
            <input value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} type="number" required className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500/50" /></div>
          <div><label className="text-xs text-zinc-500 block mb-1">カテゴリ</label>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500/50">
              {expenseCategories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select></div>
          <div><label className="text-xs text-zinc-500 block mb-1">日付</label>
            <input value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} type="date" className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500/50" /></div>
        </div>
        <label className="flex items-center gap-2 text-sm text-zinc-300 cursor-pointer">
          <input type="checkbox" checked={form.receipt} onChange={(e) => setForm({ ...form, receipt: e.target.checked })} className="rounded accent-emerald-500" />
          領収書あり
        </label>
        <div><label className="text-xs text-zinc-500 block mb-1">備考</label>
          <textarea value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} rows={3} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500/50 resize-none" /></div>
        <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors">申請する</button>
      </form>
    </motion.div>
  );
}
