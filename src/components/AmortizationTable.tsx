import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Button } from './ui/button';
import { useLoan } from '../context/LoanContext';
import { generateAmortizationSchedule, formatCurrency } from '../utils/loanCalculations';
import { FileText, Download } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

export const AmortizationTable: React.FC = () => {
  const { applicationData } = useLoan();
  const { amount, term, interestRate } = applicationData.loanData;
  const [showAll, setShowAll] = useState(false);

  const schedule = generateAmortizationSchedule(amount, interestRate, term);
  const displaySchedule = showAll ? schedule : schedule.slice(0, 12);

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle>Tabla de Amortización</CardTitle>
              <CardDescription>
                Detalle mensual de pagos, capital e intereses
              </CardDescription>
            </div>
          </div>
          <Button variant="outline" size="sm" className="gap-2 border-primary/30 hover:border-primary">
            <Download className="h-4 w-4" />
            Exportar PDF
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px] w-full">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">Mes</TableHead>
                <TableHead className="text-right text-muted-foreground">Pago Mensual</TableHead>
                <TableHead className="text-right text-muted-foreground">Capital</TableHead>
                <TableHead className="text-right text-muted-foreground">Interés</TableHead>
                <TableHead className="text-right text-muted-foreground">Balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displaySchedule.map((payment) => (
                <TableRow key={payment.month} className="border-border hover:bg-secondary/50">
                  <TableCell className="text-foreground">{payment.month}</TableCell>
                  <TableCell className="text-right text-foreground">
                    {formatCurrency(payment.payment)}
                  </TableCell>
                  <TableCell className="text-right text-green-500">
                    {formatCurrency(payment.principal)}
                  </TableCell>
                  <TableCell className="text-right text-accent">
                    {formatCurrency(payment.interest)}
                  </TableCell>
                  <TableCell className="text-right text-primary">
                    {formatCurrency(payment.balance)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
        
        {term > 12 && (
          <div className="mt-4 text-center">
            <Button
              variant="outline"
              onClick={() => setShowAll(!showAll)}
              className="border-primary/30 hover:border-primary"
            >
              {showAll ? 'Mostrar menos' : `Mostrar todos los ${term} pagos`}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
