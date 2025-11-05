import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { useLoan } from '../context/LoanContext';
import { CheckCircle2, XCircle, Clock, Download, RotateCcw } from 'lucide-react';
import { formatCurrency } from '../utils/loanCalculations';

export const EvaluationResult: React.FC = () => {
  const { applicationData, resetApplication } = useLoan();
  const { evaluationResult, loanData } = applicationData;

  if (!evaluationResult) return null;

  const { status, score, dti, message } = evaluationResult;

  const getStatusIcon = () => {
    switch (status) {
      case 'approved':
        return <CheckCircle2 className="h-16 w-16 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-16 w-16 text-red-500" />;
      case 'manual':
        return <Clock className="h-16 w-16 text-yellow-500" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'approved':
        return 'from-green-500/20 to-green-500/5 border-green-500/30';
      case 'rejected':
        return 'from-red-500/20 to-red-500/5 border-red-500/30';
      case 'manual':
        return 'from-yellow-500/20 to-yellow-500/5 border-yellow-500/30';
    }
  };

  const getStatusGlow = () => {
    switch (status) {
      case 'approved':
        return 'shadow-lg shadow-green-500/30';
      case 'rejected':
        return 'shadow-lg shadow-red-500/30';
      case 'manual':
        return 'shadow-lg shadow-yellow-500/30';
    }
  };

  const getStatusTitle = () => {
    switch (status) {
      case 'approved':
        return 'Solicitud Aprobada';
      case 'rejected':
        return 'Solicitud Rechazada';
      case 'manual':
        return 'Evaluación Pendiente';
    }
  };

  return (
    <div className="space-y-6">
      <Card className={`bg-gradient-to-br ${getStatusColor()} ${getStatusGlow()}`}>
        <CardHeader>
          <div className="flex flex-col items-center text-center space-y-4">
            {getStatusIcon()}
            <div>
              <CardTitle className="text-2xl">{getStatusTitle()}</CardTitle>
              <CardDescription className="text-base mt-2">{message}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-card rounded-lg p-6 space-y-4 border border-border">
            <h3 className="font-semibold text-lg">Resumen de la Solicitud</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
                <p className="text-sm text-muted-foreground">Monto Solicitado</p>
                <p className="text-xl text-primary">{formatCurrency(loanData.amount)}</p>
              </div>
              <div className="p-4 bg-accent/10 border border-accent/30 rounded-lg">
                <p className="text-sm text-muted-foreground">Plazo</p>
                <p className="text-xl text-accent">{loanData.term} meses</p>
              </div>
              <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <p className="text-sm text-muted-foreground">Tasa de Interés</p>
                <p className="text-xl text-blue-500">{loanData.interestRate}%</p>
              </div>
              <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                <p className="text-sm text-muted-foreground">Score de Evaluación</p>
                <p className="text-xl text-purple-500">{score}/100</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Puntuación de Crédito</span>
                <span className="text-primary">{score}/100</span>
              </div>
              <Progress value={score} className="h-3" />
              <p className="text-xs text-muted-foreground">
                {score >= 75 ? 'Excelente' : score >= 60 ? 'Bueno' : score >= 50 ? 'Regular' : 'Necesita mejorar'}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Ratio Deuda-Ingreso (DTI)</span>
                <span className={dti <= 40 ? 'text-green-500' : dti <= 60 ? 'text-yellow-500' : 'text-red-500'}>
                  {dti.toFixed(1)}%
                </span>
              </div>
              <Progress value={Math.min(100, dti)} className="h-3" />
              <p className="text-xs text-muted-foreground">
                {dti <= 40 ? 'Dentro del rango aceptable' : dti <= 60 ? 'En el límite' : 'Fuera del rango recomendado'}
              </p>
            </div>
          </div>

          {status === 'approved' && (
            <div className="bg-card rounded-lg p-6 space-y-4 border border-green-500/30">
              <h3 className="font-semibold text-lg text-green-500">Próximos Pasos</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-foreground">
                <li>Recibirás un correo con el contrato de préstamo</li>
                <li>Revisa y firma el contrato digitalmente</li>
                <li>Proporciona la documentación requerida</li>
                <li>Una vez verificado, recibirás el desembolso en 2-3 días hábiles</li>
              </ol>
            </div>
          )}

          {status === 'manual' && (
            <div className="bg-card rounded-lg p-6 space-y-4 border border-yellow-500/30">
              <h3 className="font-semibold text-lg text-yellow-500">¿Qué sigue?</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-foreground">
                <li>Un asesor financiero revisará tu caso personalmente</li>
                <li>Te contactaremos en las próximas 24-48 horas</li>
                <li>Prepara la documentación que te solicitaremos</li>
                <li>Podrías necesitar un co-deudor o garantía adicional</li>
              </ul>
            </div>
          )}

          {status === 'rejected' && (
            <div className="bg-card rounded-lg p-6 space-y-4 border border-red-500/30">
              <h3 className="font-semibold text-lg text-red-500">Recomendaciones</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-foreground">
                <li>Mejora tu puntuación crediticia pagando deudas existentes</li>
                <li>Aumenta tus ingresos o reduce gastos fijos</li>
                <li>Considera solicitar un monto menor</li>
                <li>Puedes volver a aplicar en 3-6 meses</li>
              </ul>
            </div>
          )}

          <div className="flex gap-4">
            <Button className="flex-1 gap-2 glow-primary" size="lg">
              <Download className="h-4 w-4" />
              Descargar Resultado
            </Button>
            <Button
              variant="outline"
              className="flex-1 gap-2 border-primary/30 hover:border-primary"
              size="lg"
              onClick={resetApplication}
            >
              <RotateCcw className="h-4 w-4" />
              Nueva Solicitud
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
