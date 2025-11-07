import React from 'react';
import { useLoan } from '../context/LoanContext';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { CheckCircle2, FileText, Shield, Clock, Mail, Phone } from 'lucide-react';
import { motion } from 'motion/react';

export const SubmissionSuccess: React.FC = () => {
  const { applicationData } = useLoan();
  const { personalInfo, prerequisiteInfo } = applicationData;

  const creditTypeLabels: Record<string, string> = {
    personal: 'Crédito Personal',
    empresarial: 'Empresarial Simple',
    pyme: 'PYME Expansión',
    revolvente: 'Línea Revolvente',
    factoraje: 'Factoraje Financiero'
  };

  return (
    <div className="space-y-8">
      {/* Success Animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.6 }}
        className="flex flex-col items-center justify-center text-center mb-10"
      >
        <div className="relative mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="p-6 bg-green-500/10 rounded-full"
          >
            <CheckCircle2 className="h-20 w-20 text-green-500" />
          </motion.div>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="absolute -top-2 -right-2"
          >
            <div className="p-2 bg-primary rounded-full">
              <FileText className="h-6 w-6 text-white" />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl mb-4 text-foreground">
            ¡Solicitud Enviada Exitosamente!
          </h2>
          <p className="text-lg text-muted-foreground max-w-md">
            Hemos recibido tu solicitud de crédito y estamos procesando tu información
          </p>
        </motion.div>
      </motion.div>

      {/* Application Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="border-primary/20 bg-card/50 backdrop-blur">
          <CardContent className="p-8 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <h3 className="text-xl">Resumen de tu Solicitud</h3>
              <Badge variant="outline" className="border-green-500/50 text-green-500">
                En Proceso
              </Badge>
            </div>

            {/* Personal Info */}
            <div className="space-y-3">
              <h4 className="text-sm text-muted-foreground uppercase tracking-wider">
                Solicitante
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Nombre Completo</p>
                  <p className="font-medium">
                    {personalInfo.firstName} {personalInfo.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">RFC</p>
                  <p className="font-mono font-medium">{prerequisiteInfo.rfc}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{personalInfo.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Teléfono</p>
                  <p className="font-medium">{personalInfo.phone}</p>
                </div>
              </div>
            </div>

            {/* Credit Type */}
            <div className="space-y-3 pt-4 border-t border-border">
              <h4 className="text-sm text-muted-foreground uppercase tracking-wider">
                Tipo de Crédito Solicitado
              </h4>
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <p className="font-medium text-lg">
                  {creditTypeLabels[prerequisiteInfo.creditType || ''] || prerequisiteInfo.creditType}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Next Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="border-blue-500/20 bg-blue-500/5">
          <CardContent className="p-6">
            <h3 className="text-xl mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Próximos Pasos
            </h3>
            <ol className="space-y-4">
              <li className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                  1
                </div>
                <div>
                  <p className="font-medium">Verificación de Datos</p>
                  <p className="text-sm text-muted-foreground">
                    Validaremos tu información fiscal ante el SAT (24-48 horas)
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                  2
                </div>
                <div>
                  <p className="font-medium">Evaluación Crediticia</p>
                  <p className="text-sm text-muted-foreground">
                    Nuestro equipo revisará tu solicitud y calculará tu precalificación
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                  3
                </div>
                <div>
                  <p className="font-medium">Respuesta y Oferta</p>
                  <p className="text-sm text-muted-foreground">
                    Te contactaremos con los resultados y condiciones de tu crédito
                  </p>
                </div>
              </li>
            </ol>
          </CardContent>
        </Card>
      </motion.div>

      {/* Contact Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border-primary/20">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">creditos@banx.com</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-primary/20">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Teléfono</p>
                <p className="font-medium">800-123-4567</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Security Notice */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex items-center justify-center gap-2 text-sm text-muted-foreground pt-4"
      >
        <Shield className="h-4 w-4 text-green-500" />
        <span>Tus datos están protegidos con encriptación de nivel bancario</span>
      </motion.div>
    </div>
  );
};