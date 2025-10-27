'use client';

import { type ReactNode, createContext, useContext, useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import type { Transaction } from '@/types';

interface AccountContextType {
  balance: number;
  transactions: Transaction[];
  deposit: (amount: number) => boolean;
  withdraw: (amount: number) => boolean;
  transfer: (amount: number, recipient: string) => boolean;
  resetBalance: () => void;
  setBalance: (amount: number) => void;
  resetTransactions: () => void;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

export const useAccount = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error('useAccount must be used within an AccountProvider');
  }
  return context;
};

const INITIAL_BALANCE = 25000;
const MIN_BALANCE = 10000;

export const AccountProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const [balance, setBalanceState] = useState(INITIAL_BALANCE);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'date'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
    };
    setTransactions(prev => [newTransaction, ...prev].slice(0, 10)); // Keep last 10 transactions
  };

  const deposit = (amount: number) => {
    setBalanceState(prev => prev + amount);
    addTransaction({ type: 'Deposit', amount, description: 'Funds added to account' });
    toast({
      title: "Success",
      description: `₹${amount.toLocaleString('en-IN')} deposited successfully.`,
      className: 'bg-accent text-accent-foreground border-green-300',
    });
    return true;
  };

  const withdraw = (amount: number) => {
    if (balance - amount < MIN_BALANCE) {
      toast({
        variant: 'destructive',
        title: "Transaction Failed",
        description: `Your balance cannot go below the minimum of ₹${MIN_BALANCE.toLocaleString('en-IN')}.`,
      });
      return false;
    }
    setBalanceState(prev => prev - amount);
    addTransaction({ type: 'Withdrawal', amount, description: 'Funds withdrawn' });
    toast({
      title: "Success",
      description: `₹${amount.toLocaleString('en-IN')} withdrawn successfully.`,
    });
    return true;
  };

  const transfer = (amount: number, recipient: string) => {
    if (balance - amount < MIN_BALANCE) {
      toast({
        variant: 'destructive',
        title: "Transaction Failed",
        description: `Your balance cannot go below the minimum of ₹${MIN_BALANCE.toLocaleString('en-IN')}.`,
      });
      return false;
    }
    setBalanceState(prev => prev - amount);
    addTransaction({ type: 'Transfer', amount, description: `Transferred to ${recipient}` });
    toast({
      title: "Success",
      description: `₹${amount.toLocaleString('en-IN')} transferred to ${recipient}.`,
    });
    return true;
  };

  const resetBalance = () => {
    setBalanceState(INITIAL_BALANCE);
    toast({
      title: 'Admin Action',
      description: 'Account balance has been reset.',
    });
  };

  const setBalance = (amount: number) => {
    setBalanceState(amount);
     toast({
      title: 'Admin Action',
      description: `Account balance set to ₹${amount.toLocaleString('en-IN')}.`,
    });
  };

  const resetTransactions = () => {
    setTransactions([]);
    toast({
      title: 'Admin Action',
      description: 'Transaction history has been cleared.',
    });
  }

  const value = { balance, transactions, deposit, withdraw, transfer, resetBalance, setBalance, resetTransactions };

  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
};
