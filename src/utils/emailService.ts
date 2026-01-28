import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_xm3gkv3';
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_3tf1kua';
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

export interface EmailParams {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    idNumber: string;
    age: number;
    maritalStatus: string;
    dependents: number;
  };
  prerequisiteInfo: {
    rfc: string;
    ciec: string;
    creditType: string;
  };
  financialInfo: {
    monthlyIncome: number;
    monthlyExpenses: number;
    assets: number;
    existingDebts: number;
    creditScore: number;
  };
  loanData: {
    amount: number;
    term: number;
    interestRate: number;
  };
}

export const sendLoanApplicationEmail = async (params: EmailParams): Promise<{ success: boolean; error?: string }> => {
  try {
    // Format the data for the email template
    const templateParams = {
      to_email: params.personalInfo.email,
      to_name: `${params.personalInfo.firstName} ${params.personalInfo.lastName}`,
      ...params.personalInfo,
      ...params.prerequisiteInfo, // Incluir los campos de prerequisiteInfo
      ...params.financialInfo,
      loanAmount: params.loanData.amount,
      loanTerm: params.loanData.term,
      interestRate: params.loanData.interestRate,
      applicationDate: new Date().toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    };

    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      PUBLIC_KEY
    );

    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Error al enviar el correo electrónico' 
    };
  }
};
