'use client';

import { AccountProvider } from '@/context/AccountContext';
import AccountSummary from '@/components/AccountSummary';
import TransactionHistory from '@/components/TransactionHistory';
import InvestmentPlans from '@/components/InvestmentPlans';

export default function DashboardPage() {
  return (
    <AccountProvider>
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
    </AccountProvider>
  );
}
