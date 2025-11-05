import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { useLoan } from '../context/LoanContext';
import { generateAmortizationSchedule, formatCurrency } from '../utils/loanCalculations';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export const LoanChart: React.FC = () => {
  const { applicationData } = useLoan();
  const { amount, term, interestRate } = applicationData.loanData;

  const schedule = generateAmortizationSchedule(amount, interestRate, term);
  
  // Datos para el gráfico de barras (mensual)
  const monthlyData = schedule.slice(0, Math.min(24, term)).map((payment) => ({
    month: `Mes ${payment.month}`,
    Capital: Math.round(payment.principal),
    Interés: Math.round(payment.interest),
  }));

  // Datos para el gráfico circular (totales)
  const totalPrincipal = amount;
  const totalInterest = schedule.reduce((sum, p) => sum + p.interest, 0);
  
  const pieData = [
    { name: 'Capital', value: totalPrincipal },
    { name: 'Intereses', value: totalInterest },
  ];

  const COLORS = ['#E9521E', '#FF6B3D'];

  // Datos para evolución del balance
  const balanceData = schedule
    .filter((_, index) => index % Math.max(1, Math.floor(term / 24)) === 0)
    .map((payment) => ({
      month: `Mes ${payment.month}`,
      balance: Math.round(payment.balance),
    }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-primary/30 p-3 rounded-lg shadow-lg">
          <p className="font-semibold text-foreground">{payload[0].payload.month}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <TrendingUp className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle>Análisis Visual del Préstamo</CardTitle>
            <CardDescription>
              Distribución y evolución de pagos
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="monthly" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-card border border-border">
            <TabsTrigger value="monthly" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Pagos Mensuales
            </TabsTrigger>
            <TabsTrigger value="distribution" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Distribución Total
            </TabsTrigger>
            <TabsTrigger value="balance" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Evolución Balance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="monthly" className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Distribución de capital e intereses en cada pago mensual
            </p>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(233, 82, 30, 0.1)" />
                <XAxis 
                  dataKey="month" 
                  angle={-45} 
                  textAnchor="end" 
                  height={100}
                  stroke="#A0A0A0"
                />
                <YAxis stroke="#A0A0A0" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="Capital" fill="#E9521E" radius={[8, 8, 0, 0]} />
                <Bar dataKey="Interés" fill="#FF6B3D" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="distribution" className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Proporción entre capital prestado e intereses totales
            </p>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: ${formatCurrency(entry.value)}`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid rgba(233, 82, 30, 0.3)' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
                <p className="text-sm text-muted-foreground">Capital</p>
                <p className="text-xl text-primary">{formatCurrency(totalPrincipal)}</p>
              </div>
              <div className="p-4 bg-accent/10 border border-accent/30 rounded-lg">
                <p className="text-sm text-muted-foreground">Intereses</p>
                <p className="text-xl text-accent">{formatCurrency(totalInterest)}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="balance" className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Evolución del balance pendiente a lo largo del tiempo
            </p>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={balanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(233, 82, 30, 0.1)" />
                <XAxis 
                  dataKey="month" 
                  angle={-45} 
                  textAnchor="end" 
                  height={100}
                  stroke="#A0A0A0"
                />
                <YAxis stroke="#A0A0A0" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="balance"
                  stroke="#E9521E"
                  strokeWidth={3}
                  dot={{ fill: '#E9521E', r: 6 }}
                  activeDot={{ r: 8 }}
                  name="Balance Pendiente"
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
