export type Transaction = {
  id: string;
  type: 'Deposit' | 'Withdrawal' | 'Transfer';
  amount: number;
  date: string;
  description: string;
};

export type TransactionType = 'Deposit' | 'Withdrawal' | 'Transfer';
