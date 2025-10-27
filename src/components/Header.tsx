'use client';

import { Button } from '@/components/ui/button';
import type { TransactionType } from '@/types';
import { ArrowDownToLine, ArrowUpFromLine, ArrowRightLeft } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';

interface HeaderProps {
  onAction: (type: TransactionType) => void;
}

export default function Header({ onAction }: HeaderProps) {
  return (
    <header className="bg-background border-b sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
             <SidebarTrigger className="md:hidden" />
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button variant="outline" className="bg-accent/30 border-accent" onClick={() => onAction('Deposit')}>
              <ArrowDownToLine className="h-4 w-4 mr-2" />
              Deposit
            </Button>
            <Button variant="outline" onClick={() => onAction('Withdrawal')}>
              <ArrowUpFromLine className="h-4 w-4 mr-2" />
              Withdraw
            </Button>
            <Button onClick={() => onAction('Transfer')}>
              <ArrowRightLeft className="h-4 w-4 mr-2" />
              Transfer
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
