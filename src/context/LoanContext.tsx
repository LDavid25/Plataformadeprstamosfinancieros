import React, { createContext, useContext, useState, ReactNode } from 'react';

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
  updateFinancialInfo: (data: Partial<FinancialInfo>) => void;
  updateEmploymentInfo: (data: Partial<EmploymentInfo>) => void;
  setCurrentStep: (step: number) => void;
  setEvaluationResult: (result: ApplicationData['evaluationResult']) => void;
  resetApplication: () => void;
}

const LoanContext = createContext<LoanContextType | undefined>(undefined);

const initialState: ApplicationData = {
  loanData: {
    amount: 50000,
    term: 12,
    interestRate: 8.5,
  },
  personalInfo: {},
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
  };

  return (
    <LoanContext.Provider
      value={{
        applicationData,
        updateLoanData,
        updatePersonalInfo,
        updateFinancialInfo,
        updateEmploymentInfo,
        setCurrentStep,
        setEvaluationResult,
        resetApplication,
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
