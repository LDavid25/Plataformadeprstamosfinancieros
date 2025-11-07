import React, { useEffect, useState } from 'react';
import { LoanProvider, useLoan } from './context/LoanContext';
import { LandingPage } from './components/LandingPage';
import { ProgressIndicator } from './components/ProgressIndicator';
import { PersonalInfoForm } from './components/PersonalInfoForm';
import { PrerequisiteForm } from './components/PrerequisiteForm';
import { SubmissionSuccess } from './components/SubmissionSuccess';
import { ChatBot } from './components/ChatBot';
import { Button } from './components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from './components/ui/sheet';
import { Building2, ArrowRight, ArrowLeft, X } from 'lucide-react';
import { Toaster, toast } from 'sonner@2.0.3';

const STEPS = [
  { id: 1, title: 'Información Personal', description: 'Datos básicos' },
  { id: 2, title: 'Prerequisitos', description: 'RFC y CIEC' },
  { id: 3, title: 'Confirmación', description: 'Envío exitoso' },
];

const AppContent: React.FC = () => {
  const { applicationData, setCurrentStep, setEvaluationResult } = useLoan();
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

  const handleNext = () => {
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
      setCurrentStep(3);
      toast.success('¡Solicitud enviada con éxito!');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
  };

  const handleNewApplication = () => {
    setCurrentStep(1);
    setIsSheetOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-right" richColors />
      <ChatBot />

      {/* Header with glassmorphism */}
      <header className="bg-card/80 border-b border-border backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg glow-primary">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl text-foreground">Créditos Banx</h1>
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
          onInteractOutside={(e) => {
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

export default function App() {
  return (
    <LoanProvider>
      <AppContent />
    </LoanProvider>
  );
}