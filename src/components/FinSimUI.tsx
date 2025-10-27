'use client';

import { useState } from 'react';
import { AccountProvider } from '@/context/AccountContext';
import Header from '@/components/Header';
import AccountSummary from '@/components/AccountSummary';
import TransactionHistory from '@/components/TransactionHistory';
import InvestmentPlans from '@/components/InvestmentPlans';
import TransactionDialog from '@/components/TransactionDialog';
import type { TransactionType } from '@/types';

export default function FinSimUI() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<TransactionType | null>(null);

  const handleOpenDialog = (type: TransactionType) => {
    setDialogType(type);
    setDialogOpen(true);
  };

  const handleDialogChange = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      setDialogType(null);
    }
  };

  return (
    <AccountProvider>
      <div className="flex flex-col min-h-screen bg-background text-foreground font-body">
        <Header onAction={handleOpenDialog} />
        <main className="flex-grow p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-8">
              <AccountSummary />
              <div className="printable">
                <TransactionHistory />
              </div>
            </div>
            <div className="lg:col-span-1 space-y-8">
              <InvestmentPlans />
            </div>
          </div>
        </main>
      </div>
      {dialogType && (
        <TransactionDialog
          type={dialogType}
          open={dialogOpen}
          onOpenChange={handleDialogChange}
        />
      )}
    </AccountProvider>
  );
}
