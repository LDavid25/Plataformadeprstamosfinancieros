import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useLoan } from '../context/LoanContext';
import { Briefcase, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';

export const EmploymentInfoForm: React.FC = () => {
  const { applicationData, updateEmploymentInfo, setCurrentStep } = useLoan();
  const { employmentInfo } = applicationData;

  const handleNext = () => {
    console.log('handleNext llamado');
    console.log('employmentInfo:', employmentInfo);
    
    // Validar campos requeridos
    if (!employmentInfo.employmentType) {
      console.log('Falta employmentType');
      alert('Por favor selecciona el tipo de empleo');
      return;
    }
    if (employmentInfo.yearsEmployed === undefined) {
      console.log('Falta yearsEmployed');
      alert('Por favor ingresa la antigüedad laboral');
      return;
    }
    if (!employmentInfo.company) {
      console.log('Falta company');
      alert('Por favor ingresa el nombre de la empresa o actividad');
      return;
    }
    if (!employmentInfo.sector) {
      console.log('Falta sector');
      alert('Por favor selecciona el sector económico');
      return;
    }
    if (!employmentInfo.incomeStability) {
      console.log('Falta incomeStability');
      alert('Por favor selecciona la estabilidad de ingresos');
      return;
    }
    
    console.log('Todos los campos están completos, avanzando al paso 5');
    // Llamar a setCurrentStep para avanzar al siguiente paso
    // La lógica de evaluación se manejará en AppContent
    setCurrentStep(5);
  };

  const handleBack = () => {
    setCurrentStep(3); // Volver a Información Financiera
  };

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Briefcase className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle>Información Laboral</CardTitle>
            <CardDescription>
              Detalles sobre tu situación laboral actual
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="employmentType">Tipo de Empleo *</Label>
          <Select
            value={employmentInfo.employmentType || ''}
            onValueChange={(value) => updateEmploymentInfo({ employmentType: value })}
          >
            <SelectTrigger className="bg-input-background border-primary/20 focus:border-primary">
              <SelectValue placeholder="Selecciona tu tipo de empleo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="employee">Empleado Dependiente</SelectItem>
              <SelectItem value="independent">Trabajador Independiente</SelectItem>
              <SelectItem value="business_owner">Empresario/Dueño de Negocio</SelectItem>
              <SelectItem value="retired">Jubilado/Pensionado</SelectItem>
              <SelectItem value="other">Otro</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="yearsEmployed">Antigüedad Laboral (años) *</Label>
          <Input
            id="yearsEmployed"
            type="number"
            placeholder="5"
            value={employmentInfo.yearsEmployed || ''}
            onChange={(e) => updateEmploymentInfo({ yearsEmployed: Number(e.target.value) })}
            min={0}
            max={50}
            step={0.5}
            required
            className="bg-input-background border-primary/20 focus:border-primary"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">Empresa / Actividad Económica *</Label>
          <Input
            id="company"
            placeholder="Nombre de la empresa o actividad"
            value={employmentInfo.company || ''}
            onChange={(e) => updateEmploymentInfo({ company: e.target.value })}
            required
            className="bg-input-background border-primary/20 focus:border-primary"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="sector">Sector Económico *</Label>
          <Select
            value={employmentInfo.sector || ''}
            onValueChange={(value) => updateEmploymentInfo({ sector: value })}
          >
            <SelectTrigger className="bg-input-background border-primary/20 focus:border-primary">
              <SelectValue placeholder="Selecciona el sector" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="technology">Tecnología</SelectItem>
              <SelectItem value="finance">Finanzas y Banca</SelectItem>
              <SelectItem value="healthcare">Salud</SelectItem>
              <SelectItem value="education">Educación</SelectItem>
              <SelectItem value="retail">Comercio / Retail</SelectItem>
              <SelectItem value="manufacturing">Manufactura</SelectItem>
              <SelectItem value="construction">Construcción</SelectItem>
              <SelectItem value="services">Servicios</SelectItem>
              <SelectItem value="government">Gobierno</SelectItem>
              <SelectItem value="agriculture">Agricultura</SelectItem>
              <SelectItem value="other">Otro</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="incomeStability">Estabilidad de Ingresos *</Label>
          <Select
            value={employmentInfo.incomeStability || ''}
            onValueChange={(value) => updateEmploymentInfo({ incomeStability: value })}
          >
            <SelectTrigger className="bg-input-background border-primary/20 focus:border-primary">
              <SelectValue placeholder="Evalúa la estabilidad de tus ingresos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="very_stable">Muy Estable (Salario fijo)</SelectItem>
              <SelectItem value="stable">Estable (Salario + comisiones pequeñas)</SelectItem>
              <SelectItem value="moderate">Moderada (Salario variable)</SelectItem>
              <SelectItem value="variable">Variable (Principalmente comisiones)</SelectItem>
              <SelectItem value="unstable">Inestable (Ingresos irregulares)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-yellow-500 mb-2">
            Documentación Requerida
          </h4>
          <ul className="text-sm text-foreground space-y-1 list-disc list-inside">
            <li>Recibos de pago de los últimos 3 meses</li>
            <li>Constancia laboral o contrato de trabajo</li>
            <li>Declaración de impuestos (si aplica)</li>
            <li>Estados de cuenta bancarios</li>
          </ul>
        </div>
        <div className="flex justify-between pt-6 border-t border-border mt-6">
          <Button 
            variant="outline" 
            onClick={handleBack}
            className="gap-1"
          >
            <ArrowLeft className="h-4 w-4" />
            Atrás
          </Button>
          <Button 
            onClick={handleNext}
            className="gap-1"
          >
            Ver Resultado
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
