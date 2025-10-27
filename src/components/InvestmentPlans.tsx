'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ShieldCheck, BarChartHorizontal, TrendingUp, BarChart, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useAccount } from '@/context/AccountContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function InvestmentPlans() {
  const { withdraw, balance } = useAccount();
  const { toast } = useToast();
  const [investmentAmount, setInvestmentAmount] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');

  const plans = [
    {
      title: 'Low Risk',
      returnRate: 'Up to 5% return',
      description: 'Conservative investments with stable, predictable growth. Ideal for capital preservation.',
      icon: <ShieldCheck className="h-8 w-8 text-blue-500" />,
      graphLink: 'https://www.google.com/finance/quote/SENSEX:INDEXBOM',
    },
    {
      title: 'Medium Risk',
      returnRate: '5-12% return',
      description: 'A balanced portfolio of assets offering moderate growth with manageable risk.',
      icon: <BarChartHorizontal className="h-8 w-8 text-yellow-500" />,
      graphLink: 'https://www.google.com/finance/quote/NIFTY_BANK:INDEXNSE',
    },
    {
      title: 'High Risk',
      returnRate: '12%+ return',
      description: 'Aggressive growth strategies with higher potential returns and higher volatility.',
      icon: <TrendingUp className="h-8 w-8 text-red-500" />,
      graphLink: 'https://www.google.com/finance/quote/BTC-INR',
    },
  ];

  const handleInvest = () => {
    if (investmentAmount <= 0) {
      toast({
        variant: 'destructive',
        title: 'Invalid Amount',
        description: 'Please enter a positive amount to invest.',
      });
      return;
    }
    const success = withdraw(investmentAmount);
    if (success) {
      toast({
        title: 'Investment Successful',
        description: `You have invested ₹${investmentAmount.toLocaleString('en-IN')} in the ${selectedPlan} plan.`,
      });
      setIsDialogOpen(false);
      setInvestmentAmount(0);
    }
  };

  const openDialog = (planTitle: string) => {
    setSelectedPlan(planTitle);
    setIsDialogOpen(true);
  };

  return (
    <>
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3">
              <BarChart className="h-6 w-6" />
              <CardTitle>Investment Plans</CardTitle>
          </div>
          <CardDescription>Explore simulated plans to grow your wealth. For educational purposes only.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {plans.map((plan) => (
            <Card key={plan.title} className="hover:shadow-md transition-shadow flex flex-col">
              <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                <div className="bg-muted p-3 rounded-full">
                  {plan.icon}
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg">{plan.title}</CardTitle>
                  <CardDescription className="text-primary font-semibold">{plan.returnRate}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </CardContent>
              <CardFooter className="flex justify-end gap-2 pt-4">
                  <Button onClick={() => openDialog(plan.title)}>Invest</Button>
                  <Button variant="outline" asChild>
                      <Link href={plan.graphLink} target="_blank">
                          Graph
                          <ExternalLink className="ml-2 h-4 w-4" />
                      </Link>
                  </Button>
              </CardFooter>
            </Card>
          ))}
        </CardContent>
      </Card>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invest in {selectedPlan}</DialogTitle>
            <DialogDescription>
              Enter the amount you would like to invest. Your current balance is ₹{balance.toLocaleString('en-IN')}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <Input
                id="amount"
                type="number"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                className="col-span-3"
                placeholder="0.00"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleInvest}>Confirm Investment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
