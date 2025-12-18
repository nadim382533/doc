
export interface ExpenseItem {
  id: string;
  sl: number;
  date: string;
  amount: number;
}

export type AppSection = 'dashboard' | 'pro-vc-statement' | 'settings' | 'history';

export interface DashboardStats {
  totalExpense: number;
  entryCount: number;
  recentEntries: ExpenseItem[];
}
