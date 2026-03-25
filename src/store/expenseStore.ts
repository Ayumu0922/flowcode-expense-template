import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  status: 'draft' | 'pending' | 'approved' | 'rejected';
  receipt: boolean;
  note: string;
}

interface ExpenseState {
  expenses: Expense[];
  addExpense: (e: Omit<Expense, 'id' | 'status'>) => void;
  updateStatus: (id: string, status: Expense['status']) => void;
  deleteExpense: (id: string) => void;
}

const defaultExpenses: Expense[] = [
  { id: '1', title: 'クライアント訪問交通費', amount: 1580, category: '交通費', date: '2024-01-20', status: 'approved', receipt: true, note: '東京→横浜往復' },
  { id: '2', title: 'チームランチ接待', amount: 12000, category: '接待交際費', date: '2024-01-18', status: 'pending', receipt: true, note: 'A社との打ち合わせランチ' },
  { id: '3', title: 'ノートPC用スタンド', amount: 4500, category: '備品購入', date: '2024-01-15', status: 'approved', receipt: true, note: '' },
  { id: '4', title: '大阪出張 宿泊費', amount: 9800, category: '出張費', date: '2024-01-12', status: 'approved', receipt: true, note: '1泊' },
  { id: '5', title: 'タクシー代（深夜帰宅）', amount: 3200, category: '交通費', date: '2024-01-10', status: 'rejected', receipt: false, note: '領収書紛失' },
  { id: '6', title: 'セミナー参加費', amount: 5000, category: 'その他', date: '2024-01-08', status: 'pending', receipt: true, note: 'フロントエンド勉強会' },
];

export const expenseCategories = ['交通費', '出張費', '接待交際費', '備品購入', 'その他'];

export const useExpenseStore = create<ExpenseState>()(
  persist(
    (set) => ({
      expenses: defaultExpenses,
      addExpense: (e) => set((s) => ({ expenses: [{ ...e, id: crypto.randomUUID(), status: 'pending' }, ...s.expenses] })),
      updateStatus: (id, status) => set((s) => ({ expenses: s.expenses.map((e) => e.id === id ? { ...e, status } : e) })),
      deleteExpense: (id) => set((s) => ({ expenses: s.expenses.filter((e) => e.id !== id) })),
    }),
    { name: 'expense-storage' }
  )
);
