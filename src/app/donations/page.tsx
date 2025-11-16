import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Banknote } from 'lucide-react';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Donations',
};

export default function DonationsPage() {
  const bankDetails = {
    'Bank Name': 'Equity Bank Uganda Limited',
    'Account Name': 'Albertine Institute For Community Development',
    'Account Number': '1032101921319',
    'Swift Code': 'EQBLUGKA',
    'Branch': 'Kampala Road',
  };

  return (
    <div className="animate-enter">
      <header className="bg-primary py-16 text-primary-foreground md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-4xl font-bold md:text-5xl">Support Our Work</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">
            Your contribution, no matter the size, makes a real difference in the lives of the communities we serve and helps protect our shared environment.
          </p>
        </div>
      </header>
      
      <div className="container mx-auto max-w-2xl px-4 py-16">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
                <Banknote className="h-6 w-6" />
            </div>
            <CardTitle className="mt-4 font-headline text-3xl">Donate via Bank Transfer</CardTitle>
            <CardDescription className="text-lg">
              Please use the details below to make a direct bank transfer.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 rounded-lg border bg-muted/50 p-6 text-lg">
              {Object.entries(bankDetails).map(([key, value]) => (
                <div key={key} className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <dt className="font-semibold text-primary">{key}:</dt>
                  <dd className="font-mono text-muted-foreground">{value}</dd>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>For international transfers, please ensure you use the correct SWIFT code. If you have any questions or need a receipt for your donation, please contact us at <a href="mailto:info@aicode.org" className="text-accent underline">info@aicode.org</a>.</p>
              <p className="mt-2 font-semibold">Thank you for your generosity!</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
