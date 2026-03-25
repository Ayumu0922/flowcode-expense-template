import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ExpenseListPage from './pages/ExpenseListPage';
import CreateExpensePage from './pages/CreateExpensePage';
import ReportPage from './pages/ReportPage';
import SettingsPage from './pages/SettingsPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<ExpenseListPage />} />
        <Route path="/create" element={<CreateExpensePage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}
