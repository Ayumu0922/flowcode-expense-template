import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Receipt } from 'lucide-react';
import { useExpenseStore, expenseCategories } from '../store/expenseStore';
import PageTransition from '../components/ui/PageTransition';
import EmptyState from '../components/ui/EmptyState';
import { useToast } from '../components/ui/Toast';
import { useConfirm } from '../components/ui/ConfirmDialog';

const statusConfig: Record<string, { label: string; color: string }> = {
  draft: { label: '下書き', color: 'bg-zinc-500/10 text-zinc-400' },
  pending: { label: '承認待ち', color: 'bg-amber-500/10 text-amber-400' },
  approved: { label: '承認済み', color: 'bg-accent-500/10 text-accent-400' },
  rejected: { label: '却下', color: 'bg-red-500/10 text-red-400' },
};

export default function ExpenseListPage() {
  const { expenses, deleteExpense } = useExpenseStore();
  const { showToast } = useToast();
  const { confirm } = useConfirm();
  const [filter, setFilter] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    const ok = await confirm({ title: '申請を削除', message: 'この申請を削除してもよろしいですか？', confirmLabel: '削除', variant: 'danger' });
    if (!ok) return;
    deleteExpense(id);
    showToast('申請を削除しました', 'success');
  };

  const filtered = filter ? expenses.filter((e) => e.status === filter) : expenses;

  return (
    <PageTransition className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">申請一覧</h1>
        <p className="text-sm text-zinc-500">{expenses.length}件の申請</p>
      </div>
      <div className="flex gap-2">
        <button onClick={() => setFilter(null)} className={`px-3 py-1.5 rounded-lg text-sm font-medium ${!filter ? 'bg-accent-500/10 text-accent-400' : 'text-zinc-400 hover:text-white'}`}>すべて</button>
        {Object.entries(statusConfig).map(([key, { label }]) => (
          <button key={key} onClick={() => setFilter(key)} className={`px-3 py-1.5 rounded-lg text-sm font-medium ${filter === key ? 'bg-accent-500/10 text-accent-400' : 'text-zinc-400 hover:text-white'}`}>{label}</button>
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
                <td className="px-5 py-3"><button onClick={() => handleDelete(e.id)} className="opacity-0 group-hover:opacity-100 text-zinc-500 hover:text-red-400"><Trash2 className="w-4 h-4" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <EmptyState icon={Receipt} title="該当する申請がありません" description="条件を変更するか、新しい申請を作成してください" action={<Link to="/create" className="inline-flex items-center gap-2 px-4 py-2 bg-accent-600 hover:bg-accent-500 text-white text-sm font-medium rounded-lg transition-colors">新規申請</Link>} />}
      </div>
    </PageTransition>
  );
}
