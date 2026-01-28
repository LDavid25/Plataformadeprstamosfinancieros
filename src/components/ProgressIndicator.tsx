import React from 'react';
import { Check } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  description: string;
}

interface ProgressIndicatorProps {
  currentStep: number;
  steps: Step[];
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  steps,
}) => {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                  step.id < currentStep
                    ? 'bg-green-500 border-green-500 text-white shadow-lg shadow-green-500/50'
                    : step.id === currentStep
                    ? 'bg-primary border-primary text-white shadow-lg shadow-primary/50 glow-primary'
                    : 'bg-card border-border text-muted-foreground'
                }`}
              >
                {step.id < currentStep ? (
                  <Check className="h-6 w-6" />
                ) : (
                  <span>{step.id}</span>
                )}
              </div>
              <div className="mt-2 text-center">
                <p
                  className={`text-sm ${
                    step.id <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  {step.title}
                </p>
                <p className="text-xs text-muted-foreground hidden md:block">
                  {step.description}
                </p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-1 mx-2 transition-all rounded-full ${
                  step.id < currentStep 
                    ? 'bg-green-500 shadow-md shadow-green-500/50' 
                    : 'bg-border'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
