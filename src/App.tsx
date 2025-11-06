import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { LoanProvider, useLoan } from './context/LoanContext';
import LandingPage from './components/LandingPage';
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
  { id: 1, path: '/calculadora', title: 'Calculadora', description: 'Calcula tu préstamo' },
  { id: 2, path: '/informacion-personal', title: 'Información Personal', description: 'Datos básicos' },
  { id: 3, path: '/informacion-financiera', title: 'Información Financiera', description: 'Situación económica' },
  { id: 4, path: '/informacion-laboral', title: 'Información Laboral', description: 'Datos laborales' },
  { id: 5, path: '/resultado', title: 'Resultado', description: 'Evaluación' },
];

const AppContent: React.FC = () => {
  const { applicationData, setCurrentStep, setEvaluationResult } = useLoan();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Sincronizar la ruta con el paso actual
  useEffect(() => {
    const pathToStep = STEPS.find(step => step.path === location.pathname)?.id || 1;
    if (pathToStep !== applicationData.currentStep) {
      setCurrentStep(pathToStep);
    }
  }, [location.pathname]);
  
  // Sincronizar el paso actual con la ruta
  useEffect(() => {
    // Si estamos en la raíz, mostrar el landing page y no hacer nada más
    if (location.pathname === '/') {
      return;
    }

    // Si estamos en el paso 5 (resultado), evaluar el préstamo primero
    if (applicationData.currentStep === 5) {
      // Verificar si ya tenemos un resultado de evaluación
      if (!applicationData.evaluationResult) {
        // Evaluar la solicitud
        const result = evaluateLoanApplication(
          applicationData.personalInfo,
          applicationData.financialInfo,
          applicationData.employmentInfo,
          applicationData.loanData
        );
        setEvaluationResult(result);
      }
      // Navegar a la ruta de resultados
      navigate('/resultado');
      return;
    }
    
    // Para otros pasos, sincronizar la ruta normalmente
    const currentPath = STEPS.find(step => step.id === applicationData.currentStep)?.path;
    if (currentPath && currentPath !== location.pathname) {
      navigate(currentPath);
    }
  }, [applicationData.currentStep, location.pathname]);
  
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

  const validateLoanData = () => {
    const { loanData } = applicationData;
    return !!(
      loanData.amount &&
      loanData.term &&
      loanData.interestRate
    );
  };

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      if (currentStep === 1) {
        if (!validateLoanData()) {
          toast.error('Por favor completa todos los campos de la calculadora');
          return;
        }
        setCurrentStep(2);
        toast.success('¡Bien hecho! Ahora tus datos personales');
      } else if (currentStep === 2) {
        if (!validatePersonalInfo()) {
          toast.error('Por favor completa todos los campos requeridos');
          return;
        }
        setCurrentStep(3);
        toast.success('¡Perfecto! Ahora tu información financiera');
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
        setCurrentStep(5);
        toast.success('Evaluando tu solicitud...');
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleHome = () => {
    setCurrentStep(1);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-right" richColors />
      <ChatBot />
      
      {location.pathname === '/' ? (
        <LandingPage />
      ) : (
        <>
          <header className="bg-background border-b sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Building2 className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent">
                  Préstamos Rápidos
                </h1>
              </div>
              <nav>
                <Button 
                  variant="ghost" 
                  onClick={handleHome}
                >
                  <Home className="h-4 w-4 mr-2" />
                  Inicio
                </Button>
              </nav>
            </div>
          </header>

          <main className="container mx-auto px-4 py-8">
            <ProgressIndicator steps={STEPS} currentStep={currentStep} />
            
            <div className="mt-8">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/calculadora" element={
                  <div className="space-y-8">
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

                    <div className="flex justify-between mt-8">
                      <Button onClick={handleBack} variant="outline" className="gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Atrás
                      </Button>
                      <Button onClick={handleNext} className="gap-2">
                        Siguiente
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                } />
                <Route path="/informacion-personal" element={
                  <div className="space-y-8">
                    <PersonalInfoForm />
                    <div className="flex justify-between">
                      <Button onClick={handleBack} variant="outline" className="gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Atrás
                      </Button>
                      <Button onClick={handleNext} className="gap-2">
                        Siguiente
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                } />
                <Route path="/informacion-financiera" element={
                  <div className="space-y-8">
                    <FinancialInfoForm />
                    <div className="flex justify-between">
                      <Button onClick={handleBack} variant="outline" className="gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Atrás
                      </Button>
                      <Button onClick={handleNext} className="gap-2">
                        Siguiente
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                } />
                <Route path="/informacion-laboral" element={
                  <div className="space-y-8">
                    <EmploymentInfoForm />
                    <div className="flex justify-between">
                      <Button onClick={handleBack} variant="outline" className="gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Atrás
                      </Button>
                      <Button onClick={handleNext} className="gap-2">
                        Siguiente
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                } />
                <Route path="/resultado" element={<EvaluationResult />} />
              </Routes>
            </div>
          </main>
        </>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <LoanProvider>
        <AppContent />
      </LoanProvider>
    </Router>
  );
};

export default App;
