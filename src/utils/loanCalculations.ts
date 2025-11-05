export interface MonthlyPayment {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export const calculateMonthlyPayment = (
  amount: number,
  annualRate: number,
  termMonths: number
): number => {
  const monthlyRate = annualRate / 100 / 12;
  if (monthlyRate === 0) return amount / termMonths;
  
  const payment =
    (amount * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) /
    (Math.pow(1 + monthlyRate, termMonths) - 1);
  
  return payment;
};

export const calculateTotalInterest = (
  monthlyPayment: number,
  termMonths: number,
  amount: number
): number => {
  return monthlyPayment * termMonths - amount;
};

export const generateAmortizationSchedule = (
  amount: number,
  annualRate: number,
  termMonths: number
): MonthlyPayment[] => {
  const monthlyRate = annualRate / 100 / 12;
  const monthlyPayment = calculateMonthlyPayment(amount, annualRate, termMonths);
  const schedule: MonthlyPayment[] = [];
  
  let balance = amount;
  
  for (let month = 1; month <= termMonths; month++) {
    const interest = balance * monthlyRate;
    const principal = monthlyPayment - interest;
    balance = balance - principal;
    
    schedule.push({
      month,
      payment: monthlyPayment,
      principal,
      interest,
      balance: Math.max(0, balance),
    });
  }
  
  return schedule;
};

export const calculateDTI = (
  monthlyIncome: number,
  monthlyExpenses: number,
  existingDebts: number,
  newLoanPayment: number
): number => {
  const totalMonthlyDebt = monthlyExpenses + existingDebts + newLoanPayment;
  return (totalMonthlyDebt / monthlyIncome) * 100;
};

export const calculateCreditScore = (
  financialInfo: {
    monthlyIncome: number;
    monthlyExpenses: number;
    assets: number;
    existingDebts: number;
    creditScore?: number;
  },
  employmentInfo: {
    yearsEmployed: number;
    employmentType: string;
    incomeStability: string;
  },
  personalInfo: {
    age: number;
    dependents: number;
  },
  loanData: {
    amount: number;
    term: number;
  }
): number => {
  let score = 0;
  
  // Credit history (40 points)
  if (financialInfo.creditScore) {
    score += (financialInfo.creditScore / 850) * 40;
  } else {
    score += 20; // Default for new customers
  }
  
  // Income to loan ratio (25 points)
  const incomeRatio = (loanData.amount / (financialInfo.monthlyIncome * 12));
  if (incomeRatio < 1) score += 25;
  else if (incomeRatio < 2) score += 20;
  else if (incomeRatio < 3) score += 15;
  else score += 5;
  
  // Employment stability (15 points)
  if (employmentInfo.yearsEmployed >= 5) score += 15;
  else if (employmentInfo.yearsEmployed >= 3) score += 12;
  else if (employmentInfo.yearsEmployed >= 1) score += 8;
  else score += 3;
  
  // Assets (10 points)
  const assetRatio = financialInfo.assets / loanData.amount;
  if (assetRatio >= 1) score += 10;
  else if (assetRatio >= 0.5) score += 7;
  else if (assetRatio >= 0.25) score += 4;
  else score += 1;
  
  // Debt burden (10 points)
  const debtRatio = financialInfo.existingDebts / financialInfo.monthlyIncome;
  if (debtRatio < 0.2) score += 10;
  else if (debtRatio < 0.4) score += 7;
  else if (debtRatio < 0.6) score += 4;
  else score += 1;
  
  return Math.round(score);
};

export const evaluateLoanApplication = (
  personalInfo: any,
  financialInfo: any,
  employmentInfo: any,
  loanData: any
): { status: 'approved' | 'rejected' | 'manual'; score: number; dti: number; message: string } => {
  const monthlyPayment = calculateMonthlyPayment(
    loanData.amount,
    loanData.interestRate,
    loanData.term
  );
  
  const dti = calculateDTI(
    financialInfo.monthlyIncome,
    financialInfo.monthlyExpenses,
    financialInfo.existingDebts,
    monthlyPayment
  );
  
  const score = calculateCreditScore(
    financialInfo,
    employmentInfo,
    personalInfo,
    loanData
  );
  
  let status: 'approved' | 'rejected' | 'manual';
  let message: string;
  
  if (score >= 75 && dti <= 40) {
    status = 'approved';
    message = '¡Felicidades! Tu solicitud ha sido aprobada. Procederemos con la documentación.';
  } else if (score < 50 || dti > 60) {
    status = 'rejected';
    message = 'Lamentablemente, tu solicitud no cumple con los requisitos mínimos en este momento.';
  } else {
    status = 'manual';
    message = 'Tu solicitud requiere evaluación manual. Un asesor te contactará en 24-48 horas.';
  }
  
  return { status, score, dti, message };
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('es-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('es-US').format(num);
};
