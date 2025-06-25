'use client';

import { type ReactNode, createContext, useContext, useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import type { Transaction } from '@/types';

interface AccountContextType {
  balance: number;
  transactions: Transaction[];
  deposit: (amount: number) => boolean;
  withdraw: (amount: number) => boolean;
  transfer: (amount: number, recipient: string) => boolean;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

export const useAccount = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error('useAccount must be used within an AccountProvider');
  }
  return context;
};

export const AccountProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const [balance, setBalance] = useState(25000);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const minBalance = 10000;

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'date'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
    };
    setTransactions(prev => [newTransaction, ...prev].slice(0, 10)); // Keep last 10 transactions
  };

  const deposit = (amount: number) => {
    setBalance(prev => prev + amount);
    addTransaction({ type: 'Deposit', amount, description: 'Funds added to account' });
    toast({
      title: "Success",
      description: `₹${amount.toLocaleString('en-IN')} deposited successfully.`,
      className: 'bg-accent text-accent-foreground border-green-300',
    });
    return true;
  };

  const withdraw = (amount: number) => {
    if (balance - amount < minBalance) {
      toast({
        variant: 'destructive',
        title: "Transaction Failed",
        description: `Your balance cannot go below the minimum of ₹${minBalance.toLocaleString('en-IN')}.`,
      });
      return false;
    }
    setBalance(prev => prev - amount);
    addTransaction({ type: 'Withdrawal', amount, description: 'Funds withdrawn via ATM' });
    toast({
      title: "Success",
      description: `₹${amount.toLocaleString('en-IN')} withdrawn successfully.`,
    });
    return true;
  };

  const transfer = (amount: number, recipient: string) => {
    if (balance - amount < minBalance) {
      toast({
        variant: 'destructive',
        title: "Transaction Failed",
        description: `Your balance cannot go below the minimum of ₹${minBalance.toLocaleString('en-IN')}.`,
      });
      return false;
    }
    setBalance(prev => prev - amount);
    addTransaction({ type: 'Transfer', amount, description: `Transferred to ${recipient}` });
    toast({
      title: "Success",
      description: `₹${amount.toLocaleString('en-IN')} transferred to ${recipient}.`,
    });
    return true;
  };

  const value = { balance, transactions, deposit, withdraw, transfer };

  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
};
