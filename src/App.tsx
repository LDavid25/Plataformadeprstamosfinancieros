import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { LoanProvider, useLoan } from './context/LoanContext';
import { LandingPage } from './components/LandingPage';
import { ProgressIndicator } from './components/ProgressIndicator';
import { PersonalInfoForm } from './components/PersonalInfoForm';
import { PrerequisiteForm } from './components/PrerequisiteForm';
import { SubmissionSuccess } from './components/SubmissionSuccess';
import { CallMeBack } from './components/CallMeBack';
import { Button } from './components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from './components/ui/sheet';
import { Building2, ArrowRight, ArrowLeft, X } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import AvisoLegal from './components/AvisoLegal';

const STEPS = [
  { id: 1, title: 'Información Personal', description: 'Datos básicos' },
  { id: 2, title: 'Prerequisitos', description: 'RFC y CIEC' },
  { id: 3, title: 'Confirmación', description: 'Envío exitoso' },
];

const AppContent: React.FC = () => {
  const { applicationData, setCurrentStep, setEvaluationResult, submitApplication } = useLoan();
  const { currentStep } = applicationData;
  const [isSheetOpen, setIsSheetOpen] = useState(false);

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

  const validatePrerequisites = () => {
    const { prerequisiteInfo } = applicationData;
    return !!(
      prerequisiteInfo.rfc &&
      prerequisiteInfo.ciec &&
      prerequisiteInfo.creditType
    );
  };

  const handleStartApplication = () => {
    setCurrentStep(1);
    setIsSheetOpen(true);
    toast.info('Completa tu información personal para continuar');
  };

  const handleNext = async () => {
    if (currentStep === 1) {
      if (!validatePersonalInfo()) {
        toast.error('Por favor completa todos los campos requeridos');
        return;
      }
      setCurrentStep(2);
      toast.info('Ingresa tus prerequisitos');
    } else if (currentStep === 2) {
      if (!validatePrerequisites()) {
        toast.error('Por favor completa todos los campos requeridos');
        return;
      }
      
      // Show loading state
      const toastId = toast.loading('Enviando solicitud...');
      
      try {
        // Submit the application and send email
        const result = await submitApplication();
        
        if (result.success) {
          toast.success('¡Solicitud enviada con éxito!', { id: toastId });
          setCurrentStep(3);
        } else {
          toast.error(result.error || 'Error al enviar la solicitud', { id: toastId });
        }
      } catch (error) {
        console.error('Error submitting application:', error);
        toast.error('Ocurrió un error al procesar tu solicitud', { id: toastId });
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCloseSheet = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentStep > 1) {
      toast.warning('Guarda tu progreso antes de cerrar');
      return;
    }
    setIsSheetOpen(false);
  };

  const handleNewApplication = () => {
    setCurrentStep(1);
    setIsSheetOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-right" richColors />
      <CallMeBack />

      {/* Header with glassmorphism */}
      <header className="bg-card/80 border-b border-border backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-32 relative">
                <img 
                  src="/img/BANX-1_2x.png" 
                  alt="Logo Banx not Banks" 
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="hidden md:block">
                <h1 className="text-2xl text-foreground">Créditos Banx not Banks</h1>
                <p className="text-sm text-muted-foreground">Tu socio financiero de confianza</p>
              </div>
            </div>
            <Button 
              onClick={handleStartApplication} 
              size="lg" 
              className="gap-2 glow-primary"
            >
              Solicitar Crédito
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Landing Page - Always visible */}
      <LandingPage onStartApplication={handleStartApplication} />

      {/* Application Sheet - Slides from right */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent 
          className="w-full sm:max-w-3xl lg:max-w-4xl overflow-y-auto"
          onInteractOutside={(e: Event) => {
            // Prevent closing when clicking outside if there's unsaved data
            if (currentStep > 1) {
              e.preventDefault();
              toast.warning('Guarda tu progreso antes de cerrar');
            }
          }}
        >
          <SheetHeader className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <SheetTitle className="text-2xl">Solicitud de Crédito</SheetTitle>
                  <SheetDescription>
                    Completa el formulario para evaluar tu crédito
                  </SheetDescription>
                </div>
              </div>
            </div>
          </SheetHeader>

          {currentStep !== 3 && (
            <div className="mb-10">
              <ProgressIndicator currentStep={currentStep} steps={STEPS} />
            </div>
          )}

          <div>
            {currentStep === 1 && <PersonalInfoForm />}
            {currentStep === 2 && <PrerequisiteForm />}
            {currentStep === 3 && <SubmissionSuccess />}

            {/* Navigation Buttons */}
            {currentStep !== 3 ? (
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
                  {currentStep === 2 ? 'Enviar Solicitud' : 'Siguiente'}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex gap-4 mt-8">
                <Button
                  variant="outline"
                  onClick={handleCloseSheet}
                  size="lg"
                  className="flex-1 gap-2 border-primary/20 hover:border-primary/40"
                >
                  <X className="h-4 w-4" />
                  Cerrar
                </Button>
                <Button
                  onClick={handleNewApplication}
                  size="lg"
                  className="flex-1 gap-2 glow-primary"
                >
                  Nueva Solicitud
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

const AppWithRouter: React.FC = () => {
  const location = useLocation();
  const isAvisoLegal = location.pathname === '/aviso-legal';

  return (
    <LoanProvider>
      {!isAvisoLegal && <AppContent />}
      <Routes>
        <Route path="/aviso-legal" element={<AvisoLegal />} />
      </Routes>
    </LoanProvider>
  );
};

export default function App() {
  return (
    <LoanProvider>
      <AppWithRouter />
    </LoanProvider>
  );
}