'use client';

import { SidebarProvider, Sidebar, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import SidebarContent from '@/components/SidebarContent';
import { Landmark } from 'lucide-react';
import Header from '@/components/Header';
import { useState } from 'react';
import { TransactionType } from '@/types';
import TransactionDialog from '@/components/TransactionDialog';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
    <SidebarProvider>
      <Sidebar>
        <SidebarContent />
      </Sidebar>
      <SidebarInset>
        <Header onAction={handleOpenDialog} />
        <main className="flex-grow p-4 sm:p-6 lg:p-8">
            {children}
        </main>
      </SidebarInset>
      {dialogType && (
        <TransactionDialog
          type={dialogType}
          open={dialogOpen}
          onOpenChange={handleDialogChange}
        />
      )}
    </SidebarProvider>
  );
}
