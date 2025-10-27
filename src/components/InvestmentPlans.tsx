import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ShieldCheck, BarChartHorizontal, TrendingUp, BarChart, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function InvestmentPlans() {
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

  return (
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
                <Button>Invest</Button>
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
  );
}
