import React, { useState } from 'react';
import { useLoan } from '../context/LoanContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';
import { 
  FileText, 
  Shield, 
  Lock, 
  Info, 
  AlertCircle,
  Users,
  Briefcase,
  TrendingUp,
  RefreshCw,
  FileStack
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

export const PrerequisiteForm: React.FC = () => {
  const { applicationData, updatePrerequisiteInfo } = useLoan();
  const { prerequisiteInfo } = applicationData;
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (field: string, value: string) => {
    updatePrerequisiteInfo({ [field]: value });
  };

  const creditTypes = [
    {
      value: 'personal',
      label: 'Crédito Personal',
      icon: Users,
      description: 'Hasta $500,000 - Para tus proyectos personales',
      color: 'text-primary'
    },
    {
      value: 'empresarial',
      label: 'Empresarial Simple',
      icon: Briefcase,
      description: 'Hasta $1,000,000 - Capital de trabajo',
      color: 'text-accent'
    },
    {
      value: 'pyme',
      label: 'PYME Expansión',
      icon: TrendingUp,
      description: 'Hasta $2,000,000 - Crecimiento empresarial',
      color: 'text-green-400'
    },
    {
      value: 'revolvente',
      label: 'Línea Revolvente',
      icon: RefreshCw,
      description: 'Hasta $750,000 - Liquidez disponible',
      color: 'text-blue-400'
    },
    {
      value: 'factoraje',
      label: 'Factoraje Financiero',
      icon: FileStack,
      description: 'Hasta $5,000,000 - Adelanto de cuentas',
      color: 'text-yellow-400'
    }
  ];

  const selectedCredit = creditTypes.find(ct => ct.value === prerequisiteInfo.creditType);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
          <FileText className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-3xl mb-2">Información Fiscal</h2>
        <p className="text-muted-foreground">
          Datos necesarios para tu precalificación
        </p>
      </div>

      {/* Tipo de Crédito */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Tipo de Crédito
          </CardTitle>
          <CardDescription>
            Selecciona el tipo de crédito que deseas solicitar
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="creditType">Producto Financiero *</Label>
            <Select
              value={prerequisiteInfo.creditType || ''}
              onValueChange={(value) => handleChange('creditType', value)}
            >
              <SelectTrigger id="creditType" className="h-auto py-3">
                <SelectValue placeholder="Selecciona un tipo de crédito" />
              </SelectTrigger>
              <SelectContent>
                {creditTypes.map((credit) => (
                  <SelectItem key={credit.value} value={credit.value} className="py-3">
                    <div className="flex items-start gap-3">
                      <credit.icon className={`h-5 w-5 mt-0.5 ${credit.color}`} />
                      <div>
                        <p className="font-medium">{credit.label}</p>
                        <p className="text-sm text-muted-foreground">{credit.description}</p>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Selected Credit Preview */}
          {selectedCredit && (
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <div className="flex items-start gap-3">
                <selectedCredit.icon className={`h-6 w-6 ${selectedCredit.color}`} />
                <div className="flex-1">
                  <p className="font-medium mb-1">{selectedCredit.label}</p>
                  <p className="text-sm text-muted-foreground">{selectedCredit.description}</p>
                </div>
                <Badge variant="outline" className="border-primary/30">
                  Seleccionado
                </Badge>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* RFC y CIEC */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Datos Fiscales SAT
          </CardTitle>
          <CardDescription>
            Ingresa tu RFC y Clave CIEC para verificar tu estatus fiscal
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* RFC Field */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="rfc">RFC (Registro Federal de Contribuyentes) *</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>Tu RFC de 12 o 13 caracteres. Ej: XAXX010101000 (persona física) o XAXX010101XXX (persona moral)</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input
              id="rfc"
              placeholder="Ej: XAXX010101000"
              value={prerequisiteInfo.rfc || ''}
              onChange={(e) => handleChange('rfc', e.target.value.toUpperCase())}
              maxLength={13}
              className="font-mono"
            />
            <p className="text-xs text-muted-foreground">
              Ingresa tu RFC tal como aparece en tu Constancia de Situación Fiscal
            </p>
          </div>

          {/* CIEC Field */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="ciec">Clave CIEC (Contraseña del SAT) *</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>Es la contraseña que usas para acceder al portal del SAT. Si no la recuerdas, puedes recuperarla en sat.gob.mx</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="relative">
              <Input
                id="ciec"
                type={showPassword ? 'text' : 'password'}
                placeholder="Ingresa tu Clave CIEC"
                value={prerequisiteInfo.ciec || ''}
                onChange={(e) => handleChange('ciec', e.target.value)}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? (
                  <Lock className="h-4 w-4" />
                ) : (
                  <Lock className="h-4 w-4" />
                )}
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              Tu contraseña está protegida con encriptación de nivel bancario
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Information Alert */}
      <Alert className="border-blue-500/50 bg-blue-500/5">
        <Info className="h-4 w-4 text-blue-500" />
        <AlertDescription className="text-sm">
          <p className="font-medium mb-2">Uso de información fiscal</p>
          <ul className="space-y-1 ml-4 list-disc text-muted-foreground">
            <li>La información fiscal se utiliza exclusivamente para verificar el estatus activo ante el SAT</li>
            <li>Generamos una precalificación o calificación inicial basada en tus datos</li>
            <li>Banx no realiza movimientos, declaraciones ni gestiones fiscales en tu nombre</li>
            <li>La información podrá ser compartida únicamente con los habilitadores de servicios necesarios para completar el proceso de evaluación y otorgamiento del crédito</li>
          </ul>
        </AlertDescription>
      </Alert>

      {/* Security Badge */}
      <div className="flex items-center justify-center gap-6 pt-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Shield className="h-5 w-5 text-green-500" />
          <span>Conexión Segura SSL</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Lock className="h-5 w-5 text-green-500" />
          <span>Encriptación Bancaria</span>
        </div>
      </div>

      {/* Privacy Notice */}
      <Alert className="border-muted">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="text-xs">
          Al continuar, aceptas nuestro{' '}
          <a href="#" className="text-primary hover:underline">
            Aviso de Privacidad
          </a>{' '}
          y{' '}
          <a href="#" className="text-primary hover:underline">
            Términos y Condiciones
          </a>
          . Tus datos están protegidos conforme a la Ley Federal de Protección de Datos Personales.
        </AlertDescription>
      </Alert>
    </div>
  );
};