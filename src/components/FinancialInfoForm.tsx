import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { useLoan } from '../context/LoanContext';
import { DollarSign, TrendingDown, Wallet, CreditCard, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

export const FinancialInfoForm: React.FC = () => {
  const { applicationData, updateFinancialInfo, setCurrentStep } = useLoan();
  const { financialInfo } = applicationData;

  const handleNext = () => {
    // Validar campos requeridos
    if (!financialInfo.monthlyIncome || !financialInfo.monthlyExpenses) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }
    setCurrentStep(4); // Ir a Información Laboral
  };

  const handleBack = () => {
    setCurrentStep(2); // Volver a Información Personal
  };

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <DollarSign className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle>Información Financiera</CardTitle>
            <CardDescription>
              Proporciona detalles sobre tu situación económica
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="monthlyIncome">Ingresos Mensuales Comprobables *</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className="text-sm text-muted-foreground hover:text-primary transition-colors">ⓘ</div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Total de ingresos mensuales después de impuestos</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-muted-foreground" />
            <Input
              id="monthlyIncome"
              type="number"
              placeholder="5000"
              value={financialInfo.monthlyIncome || ''}
              onChange={(e) => updateFinancialInfo({ monthlyIncome: Number(e.target.value) })}
              min={0}
              step={100}
              required
              className="bg-input-background border-primary/20 focus:border-primary"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="monthlyExpenses">Gastos Fijos Mensuales *</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className="text-sm text-muted-foreground hover:text-primary transition-colors">ⓘ</div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Incluye renta, servicios, alimentación, etc.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-muted-foreground" />
            <Input
              id="monthlyExpenses"
              type="number"
              placeholder="2000"
              value={financialInfo.monthlyExpenses || ''}
              onChange={(e) => updateFinancialInfo({ monthlyExpenses: Number(e.target.value) })}
              min={0}
              step={100}
              required
              className="bg-input-background border-primary/20 focus:border-primary"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="assets">Patrimonio (Bienes e Inversiones) *</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className="text-sm text-muted-foreground hover:text-primary transition-colors">ⓘ</div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Valor estimado de propiedades, vehículos, ahorros, etc.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-muted-foreground" />
            <Input
              id="assets"
              type="number"
              placeholder="50000"
              value={financialInfo.assets || ''}
              onChange={(e) => updateFinancialInfo({ assets: Number(e.target.value) })}
              min={0}
              step={1000}
              required
              className="bg-input-background border-primary/20 focus:border-primary"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="existingDebts">Deudas Existentes (Pago Mensual) *</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className="text-sm text-muted-foreground hover:text-primary transition-colors">ⓘ</div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Suma de pagos mensuales de préstamos actuales</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-muted-foreground" />
            <Input
              id="existingDebts"
              type="number"
              placeholder="500"
              value={financialInfo.existingDebts || ''}
              onChange={(e) => updateFinancialInfo({ existingDebts: Number(e.target.value) })}
              min={0}
              step={50}
              required
              className="bg-input-background border-primary/20 focus:border-primary"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="creditScore">Puntuación Crediticia (Opcional)</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className="text-sm text-muted-foreground hover:text-primary transition-colors">ⓘ</div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Si conoces tu score crediticio (300-850), ingrésalo aquí</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            id="creditScore"
            type="number"
            placeholder="700"
            value={financialInfo.creditScore || ''}
            onChange={(e) => updateFinancialInfo({ creditScore: Number(e.target.value) })}
            min={300}
            max={850}
            className="bg-input-background border-primary/20 focus:border-primary"
          />
        </div>

        <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-primary mb-2">
            Resumen de Capacidad de Pago
          </h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-foreground">Ingresos Mensuales:</span>
              <span className="text-green-500">
                ${(financialInfo.monthlyIncome || 0).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground">Gastos + Deudas:</span>
              <span className="text-red-500">
                ${((financialInfo.monthlyExpenses || 0) + (financialInfo.existingDebts || 0)).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t border-primary/30">
              <span className="font-semibold text-foreground">Disponible:</span>
              <span className="font-semibold text-primary">
                ${Math.max(0, (financialInfo.monthlyIncome || 0) - (financialInfo.monthlyExpenses || 0) - (financialInfo.existingDebts || 0)).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-between pt-6 border-t border-border mt-6">
          <Button 
            variant="outline" 
            onClick={handleBack}
            className="gap-1"
          >
            <ArrowLeft className="h-4 w-4" />
            Atrás
          </Button>
          <Button 
            onClick={handleNext}
            className="gap-1"
          >
            Siguiente
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
