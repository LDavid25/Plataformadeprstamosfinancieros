import React, { useEffect } from 'react';
import { LoanProvider, useLoan } from './context/LoanContext';
import { LoanCalculator } from './components/LoanCalculator';
import { AmortizationTable } from './components/AmortizationTable';
import { LoanChart } from './components/LoanChart';
import { ProgressIndicator } from './components/ProgressIndicator';
import { PersonalInfoForm } from './components/PersonalInfoForm';
import { FinancialInfoForm } from './components/FinancialInfoForm';
import { EmploymentInfoForm } from './components/EmploymentInfoForm';
import { EvaluationResult } from './components/EvaluationResult';
import { ChatBot } from './components/ChatBot';
import { Button } from './components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { evaluateLoanApplication } from './utils/loanCalculations';
import { Building2, Calculator, FileText, CheckCircle, ArrowRight, ArrowLeft, Home, Sparkles } from 'lucide-react';
import { Toaster, toast } from 'sonner@2.0.3';

const STEPS = [
  { id: 1, title: 'Calculadora', description: 'Calcula tu préstamo' },
  { id: 2, title: 'Información Personal', description: 'Datos básicos' },
  { id: 3, title: 'Información Financiera', description: 'Situación económica' },
  { id: 4, title: 'Información Laboral', description: 'Datos laborales' },
  { id: 5, title: 'Resultado', description: 'Evaluación' },
];

const AppContent: React.FC = () => {
  const { applicationData, setCurrentStep, setEvaluationResult } = useLoan();
  const { currentStep } = applicationData;

  useEffect(() => {
    // Auto-save to localStorage
    const timer = setTimeout(() => {
      localStorage.setItem('loanApplication', JSON.stringify(applicationData));
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [applicationData]);

  useEffect(() => {
    // Load from localStorage on mount
    const saved = localStorage.getItem('loanApplication');
    if (saved) {
      toast.success('Progreso anterior cargado automáticamente');
    }
  }, []);

  const validatePersonalInfo = () => {
    const { personalInfo } = applicationData;
    return !!(
      personalInfo.firstName &&
      personalInfo.lastName &&
      personalInfo.age &&
      personalInfo.idNumber &&
      personalInfo.maritalStatus &&
      personalInfo.dependents !== undefined &&
      personalInfo.email &&
      personalInfo.phone
    );
  };

  const validateFinancialInfo = () => {
    const { financialInfo } = applicationData;
    return !!(
      financialInfo.monthlyIncome &&
      financialInfo.monthlyExpenses !== undefined &&
      financialInfo.assets !== undefined &&
      financialInfo.existingDebts !== undefined
    );
  };

  const validateEmploymentInfo = () => {
    const { employmentInfo } = applicationData;
    return !!(
      employmentInfo.employmentType &&
      employmentInfo.yearsEmployed !== undefined &&
      employmentInfo.company &&
      employmentInfo.sector &&
      employmentInfo.incomeStability
    );
  };

  const handleNext = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
      toast.info('Completa tu información personal');
    } else if (currentStep === 2) {
      if (!validatePersonalInfo()) {
        toast.error('Por favor completa todos los campos requeridos');
        return;
      }
      setCurrentStep(3);
      toast.info('Ingresa tu información financiera');
    } else if (currentStep === 3) {
      if (!validateFinancialInfo()) {
        toast.error('Por favor completa todos los campos requeridos');
        return;
      }
      setCurrentStep(4);
      toast.info('Casi terminamos, información laboral');
    } else if (currentStep === 4) {
      if (!validateEmploymentInfo()) {
        toast.error('Por favor completa todos los campos requeridos');
        return;
      }
      // Evaluate the application
      const result = evaluateLoanApplication(
        applicationData.personalInfo,
        applicationData.financialInfo,
        applicationData.employmentInfo,
        applicationData.loanData
      );
      setEvaluationResult(result);
      setCurrentStep(5);
      toast.success('Evaluación completada');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleHome = () => {
    setCurrentStep(1);
  };

  if (currentStep === 1) {
    return (
      <div className="min-h-screen bg-background">
        <Toaster position="top-right" richColors />
        <ChatBot />
        
        {/* Header with glow effect */}
        <header className="bg-card border-b border-border backdrop-blur-sm bg-opacity-80 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg glow-primary">
                  <Building2 className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl text-foreground">FinanCredit</h1>
                  <p className="text-sm text-muted-foreground">Tu socio financiero de confianza</p>
                </div>
              </div>
              <Button onClick={() => setCurrentStep(2)} size="lg" className="gap-2 glow-primary">
                Solicitar Préstamo
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Hero Section with gradient */}
        <section className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6 border border-primary/20">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm text-primary">Plataforma de Préstamos Inteligente</span>
            </div>
            <h2 className="text-4xl mb-4 text-foreground">
              Préstamos hasta <span className="text-primary">$1,000,000</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Calcula, solicita y obtén tu préstamo en 48 horas
            </p>
          </div>

          {/* Features with neo design */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="border-primary/20 hover:border-primary/40 transition-all hover:glow-primary">
              <CardHeader>
                <div className="p-3 bg-primary/10 rounded-lg w-fit mb-3">
                  <Calculator className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Calculadora Inteligente</CardTitle>
                <CardDescription>
                  Simula tu préstamo con tasas personalizadas
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-accent/20 hover:border-accent/40 transition-all hover:shadow-lg hover:shadow-accent/20">
              <CardHeader>
                <div className="p-3 bg-accent/10 rounded-lg w-fit mb-3">
                  <FileText className="h-8 w-8 text-accent" />
                </div>
                <CardTitle>Proceso Simple</CardTitle>
                <CardDescription>
                  Completa tu solicitud en pocos minutos
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-green-500/20 hover:border-green-500/40 transition-all hover:shadow-lg hover:shadow-green-500/20">
              <CardHeader>
                <div className="p-3 bg-green-500/10 rounded-lg w-fit mb-3">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
                <CardTitle>Respuesta Rápida</CardTitle>
                <CardDescription>
                  Evaluación automática en tiempo real
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Main Content with dark cards */}
          <Tabs defaultValue="calculator" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-card border border-border">
              <TabsTrigger value="calculator" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Calculadora
              </TabsTrigger>
              <TabsTrigger value="chart" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Gráficos
              </TabsTrigger>
              <TabsTrigger value="table" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Tabla de Amortización
              </TabsTrigger>
            </TabsList>

            <TabsContent value="calculator">
              <LoanCalculator />
            </TabsContent>

            <TabsContent value="chart">
              <LoanChart />
            </TabsContent>

            <TabsContent value="table">
              <AmortizationTable />
            </TabsContent>
          </Tabs>

          {/* CTA with gradient */}
          <div className="mt-12 text-center">
            <Card className="bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 border-primary/30 glow-primary-strong">
              <CardContent className="p-8">
                <h3 className="text-2xl mb-4 text-foreground">
                  ¿Listo para solicitar tu préstamo?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Completa el proceso de solicitud y obtén una respuesta inmediata
                </p>
                <Button
                  onClick={() => setCurrentStep(2)}
                  size="lg"
                  className="gap-2 glow-primary"
                >
                  Iniciar Solicitud
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-card border-t border-border mt-20">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <h3>FinanCredit</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Préstamos personales y empresariales con las mejores tasas del mercado.
                </p>
              </div>
              <div>
                <h4 className="mb-4">Productos</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="hover:text-primary transition-colors cursor-pointer">Préstamos Personales</li>
                  <li className="hover:text-primary transition-colors cursor-pointer">Préstamos Empresariales</li>
                  <li className="hover:text-primary transition-colors cursor-pointer">Refinanciamiento</li>
                </ul>
              </div>
              <div>
                <h4 className="mb-4">Ayuda</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="hover:text-primary transition-colors cursor-pointer">Preguntas Frecuentes</li>
                  <li className="hover:text-primary transition-colors cursor-pointer">Centro de Ayuda</li>
                  <li className="hover:text-primary transition-colors cursor-pointer">Contacto</li>
                </ul>
              </div>
              <div>
                <h4 className="mb-4">Legal</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="hover:text-primary transition-colors cursor-pointer">Términos y Condiciones</li>
                  <li className="hover:text-primary transition-colors cursor-pointer">Política de Privacidad</li>
                  <li className="hover:text-primary transition-colors cursor-pointer">Regulaciones</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
              <p>© 2025 FinanCredit. Todos los derechos reservados.</p>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-right" richColors />
      <ChatBot />

      {/* Header */}
      <header className="bg-card border-b border-border backdrop-blur-sm bg-opacity-80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-xl text-foreground">FinanCredit</h1>
              </div>
            </div>
            <Button variant="outline" onClick={handleHome} className="gap-2 border-primary/20 hover:border-primary/40">
              <Home className="h-4 w-4" />
              Inicio
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {currentStep !== 5 && (
          <ProgressIndicator currentStep={currentStep} steps={STEPS} />
        )}

        <div className="max-w-4xl mx-auto">
          {currentStep === 2 && <PersonalInfoForm />}
          {currentStep === 3 && <FinancialInfoForm />}
          {currentStep === 4 && <EmploymentInfoForm />}
          {currentStep === 5 && <EvaluationResult />}

          {/* Navigation Buttons */}
          {currentStep !== 5 && (
            <div className="flex gap-4 mt-8">
              {currentStep > 1 && (
                <Button
                  variant="outline"
                  onClick={handleBack}
                  size="lg"
                  className="flex-1 gap-2 border-primary/20 hover:border-primary/40"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Anterior
                </Button>
              )}
              <Button
                onClick={handleNext}
                size="lg"
                className="flex-1 gap-2 glow-primary"
              >
                {currentStep === 4 ? 'Evaluar Solicitud' : 'Siguiente'}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <LoanProvider>
      <AppContent />
    </LoanProvider>
  );
}
