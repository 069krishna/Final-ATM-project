'use client';

import { useAccount } from '@/context/AccountContext';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import type { TransactionType } from '@/types';
import { useState } from 'react';

interface TransactionDialogProps {
  type: TransactionType;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function TransactionDialog({ type, open, onOpenChange }: TransactionDialogProps) {
  const { deposit, withdraw, transfer } = useAccount();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formSchema = z.object({
    amount: z.coerce
      .number({ invalid_type_error: 'Please enter a valid amount.' })
      .positive({ message: 'Amount must be positive.' }),
    recipient: z.string().optional(),
  });

  if (type === 'Transfer') {
    formSchema.extend({
      recipient: z.string().min(3, { message: 'Recipient name is required.' }),
    });
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      recipient: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    let success = false;
    switch (type) {
      case 'Deposit':
        success = deposit(values.amount);
        break;
      case 'Withdrawal':
        success = withdraw(values.amount);
        break;
      case 'Transfer':
        if (values.recipient) {
          success = transfer(values.amount, values.recipient);
        }
        break;
    }
    setIsSubmitting(false);
    if (success) {
      form.reset();
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{type} Funds</DialogTitle>
          <DialogDescription>
            {type === 'Deposit' && 'Add funds to your account.'}
            {type === 'Withdrawal' && 'Withdraw funds from your account.'}
            {type === 'Transfer' && 'Send funds to another account.'}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount (INR)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {type === 'Transfer' && (
              <FormField
                control={form.control}
                name="recipient"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recipient</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Processing...' : `Confirm ${type}`}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
