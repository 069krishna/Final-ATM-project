'use client';

import { useAccount } from '@/context/AccountContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Landmark } from 'lucide-react';

export default function AccountSummary() {
  const { balance } = useAccount();

  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Account Balance</CardTitle>
        <Landmark className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold text-primary">
          ₹{balance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        <p className="text-xs text-muted-foreground pt-1">
          Available balance for transactions
        </p>
      </CardContent>
    </Card>
  );
}
