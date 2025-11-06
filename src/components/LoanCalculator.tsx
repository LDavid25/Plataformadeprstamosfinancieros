import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Slider } from './ui/slider';
import { useLoan } from '../context/LoanContext';
import {
  calculateMonthlyPayment,
  calculateTotalInterest,
  formatCurrency,
  formatNumber,
} from '../utils/loanCalculations';
import { Calculator, TrendingUp, Calendar, Percent } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

export const LoanCalculator: React.FC = () => {
  const { applicationData, updateLoanData } = useLoan();
  const { amount, term, interestRate } = applicationData.loanData;

  const monthlyPayment = calculateMonthlyPayment(amount, interestRate, term);
  const totalInterest = calculateTotalInterest(monthlyPayment, term, amount);
  const totalAmount = amount + totalInterest;

  const handleAmountChange = (value: number[]) => {
    updateLoanData({ amount: value[0] });
  };

  const handleTermChange = (value: number[]) => {
    updateLoanData({ term: value[0] });
  };

  const handleInterestChange = (value: number[]) => {
    updateLoanData({ interestRate: value[0] });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="space-y-6">
        <Card className="border-primary/20">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Calculator className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle>Calculadora de Préstamos</CardTitle>
                <CardDescription>
                  Ajusta los parámetros para calcular tu préstamo ideal
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Monto del préstamo */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="amount">Monto del Préstamo</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="text-sm text-muted-foreground hover:text-primary transition-colors">ⓘ</div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Cantidad total que deseas solicitar (máximo $1,000,000)</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex items-center gap-4">
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => updateLoanData({ amount: Number(e.target.value) })}
                  min={1000}
                  max={1000000}
                  step={1000}
                  className="w-40 bg-input-background border-primary/20 focus:border-primary"
                />
                <span className="text-sm text-muted-foreground">USD</span>
              </div>
              <Slider
                value={[amount]}
                onValueChange={handleAmountChange}
                min={1000}
                max={1000000}
                step={1000}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>$1,000</span>
                <span>$1,000,000</span>
              </div>
            </div>

            {/* Plazo */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="term">Plazo de Amortización</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="text-sm text-muted-foreground hover:text-primary transition-colors">ⓘ</div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Período en meses para pagar el préstamo</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex items-center gap-4">
                <Input
                  id="term"
                  type="number"
                  value={term}
                  onChange={(e) => updateLoanData({ term: Number(e.target.value) })}
                  min={6}
                  max={360}
                  className="w-40 bg-input-background border-primary/20 focus:border-primary"
                />
                <span className="text-sm text-muted-foreground">meses ({Math.round(term / 12)} años)</span>
              </div>
              <Slider
                value={[term]}
                onValueChange={handleTermChange}
                min={6}
                max={360}
                step={6}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>6 meses</span>
                <span>360 meses (30 años)</span>
              </div>
            </div>

            {/* Tasa de interés */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="interest">Tasa de Interés Anual</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="text-sm text-muted-foreground hover:text-primary transition-colors">ⓘ</div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Tasa de interés aplicable según perfil crediticio</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex items-center gap-4">
                <Input
                  id="interest"
                  type="number"
                  value={interestRate}
                  onChange={(e) => updateLoanData({ interestRate: Number(e.target.value) })}
                  min={3}
                  max={25}
                  step={0.1}
                  className="w-40 bg-input-background border-primary/20 focus:border-primary"
                />
                <span className="text-sm text-muted-foreground">%</span>
              </div>
              <Slider
                value={[interestRate]}
                onValueChange={handleInterestChange}
                min={3}
                max={25}
                step={0.1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>3%</span>
                <span>25%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resultados con efecto neo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-gradient-to-br from-primary/20 to-primary/5 border-primary/30 hover:glow-primary transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Cuota Mensual</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl text-primary">{formatCurrency(monthlyPayment)}</div>
              <p className="text-sm text-muted-foreground mt-1">Pago mensual estimado</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent/20 to-accent/5 border-accent/30 hover:shadow-lg hover:shadow-accent/20 transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Percent className="h-5 w-5 text-accent" />
                <CardTitle className="text-lg">Total de Intereses</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl text-accent">{formatCurrency(totalInterest)}</div>
              <p className="text-sm text-muted-foreground mt-1">Intereses durante el plazo</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/20 to-green-500/5 border-green-500/30 hover:shadow-lg hover:shadow-green-500/20 transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <CardTitle className="text-lg">Monto Total</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl text-green-500">{formatCurrency(totalAmount)}</div>
              <p className="text-sm text-muted-foreground mt-1">Capital + Intereses</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/20 transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-500" />
                <CardTitle className="text-lg">Total de Pagos</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl text-blue-500">{formatNumber(term)} pagos</div>
              <p className="text-sm text-muted-foreground mt-1">Durante {Math.round(term / 12)} años</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
