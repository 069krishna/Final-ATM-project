'use client';

import { useAccount } from '@/context/AccountContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { History, ArrowDownToLine, ArrowUpFromLine, ArrowRightLeft, Printer, FileDown } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';

export default function TransactionHistory() {
  const { transactions } = useAccount();
  const { toast } = useToast();

  const getTransactionIcon = (type: 'Deposit' | 'Withdrawal' | 'Transfer') => {
    switch (type) {
      case 'Deposit':
        return <ArrowDownToLine className="h-4 w-4 text-green-500" />;
      case 'Withdrawal':
        return <ArrowUpFromLine className="h-4 w-4 text-red-500" />;
      case 'Transfer':
        return <ArrowRightLeft className="h-4 w-4 text-blue-500" />;
    }
  };

  const getVariant = (type: string) => {
    switch (type) {
        case 'Deposit': return 'default';
        case 'Withdrawal': return 'destructive';
        case 'Transfer': return 'secondary';
        default: return 'outline';
    }
  }

  const handleExport = () => {
    if (transactions.length === 0) {
      toast({
        title: 'No Transactions',
        description: 'There is no history to export.',
        variant: 'destructive',
      });
      return;
    }

    const headers = ['ID', 'Type', 'Amount (INR)', 'Date', 'Description'];
    const rows = transactions.map(tx => [
      tx.id,
      tx.type,
      tx.amount,
      format(new Date(tx.date), 'yyyy-MM-dd HH:mm:ss'),
      `"${tx.description.replace(/"/g, '""')}"` // Escape double quotes
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.href) {
      URL.revokeObjectURL(link.href);
    }
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute('download', `finsim-transactions-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
        title: "Export Successful",
        description: "Your transaction history has been downloaded.",
      });
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
            <div className='flex items-center gap-3'>
                <History className="h-6 w-6" />
                <CardTitle>Transaction History</CardTitle>
            </div>
            <div className="flex items-center gap-2 no-print">
                <Button variant="outline" size="sm" onClick={handleExport}>
                    <FileDown className="h-4 w-4" />
                    Export
                </Button>
                <Button variant="outline" size="sm" onClick={() => window.print()}>
                    <Printer className="h-4 w-4" />
                    Print
                </Button>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">Type</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length > 0 ? (
              transactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell>
                    <Badge variant={getVariant(tx.type)} className="capitalize flex items-center gap-2 w-fit">
                        {getTransactionIcon(tx.type)}
                        {tx.type}
                    </Badge>
                  </TableCell>
                  <TableCell className={`text-right font-medium ${tx.type === 'Deposit' ? 'text-green-600' : 'text-red-600'}`}>
                    {tx.type === 'Deposit' ? '+' : '-'}{' '}
                    ₹{tx.amount.toLocaleString('en-IN')}
                  </TableCell>
                  <TableCell>{format(new Date(tx.date), 'PPp')}</TableCell>
                  <TableCell>{tx.description}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No transactions yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
