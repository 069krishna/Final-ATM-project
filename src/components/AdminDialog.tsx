'use client';

import { useAccount } from '@/context/AccountContext';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { ShieldAlert } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';

interface AdminDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AdminDialog({ open, onOpenChange }: AdminDialogProps) {
  const { resetBalance, setBalance, resetTransactions } = useAccount();
  const [newBalance, setNewBalance] = useState('');
  const { toast } = useToast();

  const handleSetBalance = () => {
    const amount = parseFloat(newBalance);
    if (isNaN(amount) || amount < 0) {
      toast({
        variant: 'destructive',
        title: 'Invalid Amount',
        description: 'Please enter a valid positive number.',
      });
      return;
    }
    setBalance(amount);
    setNewBalance('');
    onOpenChange(false);
  };
  
  const handleResetHistory = () => {
    resetTransactions();
    onOpenChange(false);
  }
  
  const handleResetBalance = () => {
    resetBalance();
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShieldAlert className="h-6 w-6" />
            Admin Panel
          </DialogTitle>
          <DialogDescription>
            These actions are for demonstration purposes and will reset parts of the simulation.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex justify-between items-center p-3 border rounded-lg">
            <div>
              <h4 className="font-medium">Reset History</h4>
              <p className="text-sm text-muted-foreground">Clear all transaction records.</p>
            </div>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="destructive">Reset</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete the transaction history. This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleResetHistory}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
          </div>

          <div className="flex justify-between items-center p-3 border rounded-lg">
             <div>
                <h4 className="font-medium">Reset Balance</h4>
                <p className="text-sm text-muted-foreground">Reset balance to the default amount.</p>
             </div>
             <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="destructive">Reset</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will reset the account balance to its initial value.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleResetBalance}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
          </div>

          <div className="space-y-2 p-3 border rounded-lg">
            <div className="flex justify-between items-start">
                <div>
                    <h4 className="font-medium">Set Custom Balance</h4>
                    <p className="text-sm text-muted-foreground">Set the balance to a specific amount.</p>
                </div>
            </div>
             <div className="flex items-center gap-2">
              <Label htmlFor="balance-input" className="sr-only">Set Balance</Label>
              <Input
                id="balance-input"
                type="number"
                value={newBalance}
                onChange={(e) => setNewBalance(e.target.value)}
                placeholder="Enter new balance"
                className="flex-grow"
              />
              <Button onClick={handleSetBalance}>Set</Button>
            </div>
          </div>
        </div>
        <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
