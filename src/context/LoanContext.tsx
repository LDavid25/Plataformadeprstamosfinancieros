import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { sendLoanApplicationEmail } from '../utils/emailService';

export interface LoanData {
  amount: number;
  term: number;
  interestRate: number;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  age: number;
  idNumber: string;
  maritalStatus: string;
  dependents: number;
  email: string;
  phone: string;
}

export interface PrerequisiteInfo {
  rfc: string;
  ciec: string;
  creditType: string;
}

export interface FinancialInfo {
  monthlyIncome: number;
  monthlyExpenses: number;
  assets: number;
  existingDebts: number;
  creditScore: number;
}

export interface EmploymentInfo {
  employmentType: string;
  yearsEmployed: number;
  company: string;
  sector: string;
  incomeStability: string;
}

export interface ApplicationData {
  loanData: LoanData;
  personalInfo: Partial<PersonalInfo>;
  prerequisiteInfo: Partial<PrerequisiteInfo>;
  financialInfo: Partial<FinancialInfo>;
  employmentInfo: Partial<EmploymentInfo>;
  currentStep: number;
  evaluationResult?: {
    status: 'approved' | 'rejected' | 'manual';
    score: number;
    dti: number;
    message: string;
  };
}

interface LoanContextType {
  applicationData: ApplicationData;
  updateLoanData: (data: Partial<LoanData>) => void;
  updatePersonalInfo: (data: Partial<PersonalInfo>) => void;
  updatePrerequisiteInfo: (data: Partial<PrerequisiteInfo>) => void;
  updateFinancialInfo: (data: Partial<FinancialInfo>) => void;
  updateEmploymentInfo: (data: Partial<EmploymentInfo>) => void;
  setCurrentStep: (step: number) => void;
  setEvaluationResult: (result: ApplicationData['evaluationResult']) => void;
  resetApplication: () => void;
  submitApplication: () => Promise<{ success: boolean; error?: string }>;
}

const LoanContext = createContext<LoanContextType | undefined>(undefined);

const initialState: ApplicationData = {
  loanData: {
    amount: 50000,
    term: 12,
    interestRate: 8.5,
  },
  personalInfo: {},
  prerequisiteInfo: {},
  financialInfo: {},
  employmentInfo: {},
  currentStep: 0,
};

export const LoanProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [applicationData, setApplicationData] = useState<ApplicationData>(initialState);

  const updateLoanData = (data: Partial<LoanData>) => {
    setApplicationData(prev => ({
      ...prev,
      loanData: { ...prev.loanData, ...data },
    }));
  };

  const updatePersonalInfo = (data: Partial<PersonalInfo>) => {
    setApplicationData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...data },
    }));
  };

  const updatePrerequisiteInfo = (data: Partial<PrerequisiteInfo>) => {
    setApplicationData(prev => ({
      ...prev,
      prerequisiteInfo: { ...prev.prerequisiteInfo, ...data },
    }));
  };

  const updateFinancialInfo = (data: Partial<FinancialInfo>) => {
    setApplicationData(prev => ({
      ...prev,
      financialInfo: { ...prev.financialInfo, ...data },
    }));
  };

  const updateEmploymentInfo = (data: Partial<EmploymentInfo>) => {
    setApplicationData(prev => ({
      ...prev,
      employmentInfo: { ...prev.employmentInfo, ...data },
    }));
  };

  const setCurrentStep = (step: number) => {
    setApplicationData(prev => ({ ...prev, currentStep: step }));
  };

  const setEvaluationResult = (result: ApplicationData['evaluationResult']) => {
    setApplicationData(prev => ({ ...prev, evaluationResult: result }));
  };

  const resetApplication = () => {
    setApplicationData(initialState);
    localStorage.removeItem('loanApplication');
  };

  const submitApplication = useCallback(async (): Promise<{ success: boolean; error?: string }> => {
    try {
      // Validate required fields - matching the validation in App.tsx
      const { personalInfo, prerequisiteInfo } = applicationData;
      
      // Validate personal info
      if (!(
        personalInfo.firstName &&
        personalInfo.lastName &&
        personalInfo.age &&
        personalInfo.idNumber &&
        personalInfo.maritalStatus &&
        personalInfo.dependents !== undefined &&
        personalInfo.email &&
        personalInfo.phone
      )) {
        return { 
          success: false, 
          error: 'Por favor completa toda la información personal requerida' 
        };
      }
      
      // Validate prerequisite info
      if (!(
        prerequisiteInfo.rfc &&
        prerequisiteInfo.ciec &&
        prerequisiteInfo.creditType
      )) {
        return { 
          success: false, 
          error: 'Por favor completa toda la información fiscal requerida' 
        };
      }

      // Prepare the data for the email
      const emailData = {
        personalInfo: {
          firstName: applicationData.personalInfo.firstName || '',
          lastName: applicationData.personalInfo.lastName || '',
          email: applicationData.personalInfo.email || '',
          phone: applicationData.personalInfo.phone || 'No proporcionado',
          idNumber: applicationData.personalInfo.idNumber || 'No proporcionado',
          age: applicationData.personalInfo.age || 0,
          maritalStatus: applicationData.personalInfo.maritalStatus || 'No especificado',
          dependents: applicationData.personalInfo.dependents || 0,
        },
        prerequisiteInfo: {
          rfc: applicationData.prerequisiteInfo.rfc || 'No proporcionado',
          ciec: applicationData.prerequisiteInfo.ciec || 'No proporcionada',
          creditType: applicationData.prerequisiteInfo.creditType || 'No especificado',
        },
        financialInfo: {
          monthlyIncome: applicationData.financialInfo.monthlyIncome || 0,
          monthlyExpenses: applicationData.financialInfo.monthlyExpenses || 0,
          assets: applicationData.financialInfo.assets || 0,
          existingDebts: applicationData.financialInfo.existingDebts || 0,
          creditScore: applicationData.financialInfo.creditScore || 0,
        },
        loanData: {
          amount: applicationData.loanData.amount,
          term: applicationData.loanData.term,
          interestRate: applicationData.loanData.interestRate,
        },
      };

      // Send the email
      const result = await sendLoanApplicationEmail(emailData);
      
      if (result.success) {
        // Only reset the application if email was sent successfully
        resetApplication();
        return { success: true };
      } else {
        return result;
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Error al procesar la solicitud' 
      };
    }
  }, [applicationData]);

  return (
    <LoanContext.Provider
      value={{
        applicationData,
        updateLoanData,
        updatePersonalInfo,
        updatePrerequisiteInfo,
        updateFinancialInfo,
        updateEmploymentInfo,
        setCurrentStep,
        setEvaluationResult,
        resetApplication,
        submitApplication,
      }}
    >
      {children}
    </LoanContext.Provider>
  );
};

export const useLoan = () => {
  const context = useContext(LoanContext);
  if (context === undefined) {
    throw new Error('useLoan must be used within a LoanProvider');
  }
  return context;
};