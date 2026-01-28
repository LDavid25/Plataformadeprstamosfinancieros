import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useLoan } from '../context/LoanContext';
import { User } from 'lucide-react';

export const PersonalInfoForm: React.FC = () => {
  const { applicationData, updatePersonalInfo } = useLoan();
  const { personalInfo } = applicationData;

  return (
    <div className="space-y-8 p-4">
      {/* Header */}
      <div className="text-center mb-4">
        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
          <User className="text-primary" />
        </div>
        <h2 className="text-3xl mb-2">Información Personal</h2>
        <p className="text-muted-foreground">
          Comenzamos con tus datos básicos
        </p>
      </div>

      {/* Personal Information Card */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Datos Personales
          </CardTitle>
          <CardDescription>
            Ingresa tu información tal como aparece en tu identificación oficial
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Nombre *</Label>
              <Input
                id="firstName"
                placeholder="Juan"
                value={personalInfo.firstName || ''}
                onChange={(e) => updatePersonalInfo({ firstName: e.target.value })}
                required
                className="bg-input-background border-primary/20 focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Apellido *</Label>
              <Input
                id="lastName"
                placeholder="Pérez"
                value={personalInfo.lastName || ''}
                onChange={(e) => updatePersonalInfo({ lastName: e.target.value })}
                required
                className="bg-input-background border-primary/20 focus:border-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Edad *</Label>
              <Input
                id="age"
                type="number"
                placeholder="30"
                value={personalInfo.age || ''}
                onChange={(e) => updatePersonalInfo({ age: Number(e.target.value) })}
                min={18}
                max={100}
                required
                className="bg-input-background border-primary/20 focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="idNumber">Número de Identificación *</Label>
              <Input
                id="idNumber"
                placeholder="123456789"
                value={personalInfo.idNumber || ''}
                onChange={(e) => updatePersonalInfo({ idNumber: e.target.value })}
                required
                className="bg-input-background border-primary/20 focus:border-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="maritalStatus">Estado Civil *</Label>
              <Select
                value={personalInfo.maritalStatus || ''}
                onValueChange={(value) => updatePersonalInfo({ maritalStatus: value })}
              >
                <SelectTrigger className="bg-input-background border-primary/20 focus:border-primary">
                  <SelectValue placeholder="Selecciona tu estado civil" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Soltero/a</SelectItem>
                  <SelectItem value="married">Casado/a</SelectItem>
                  <SelectItem value="divorced">Divorciado/a</SelectItem>
                  <SelectItem value="widowed">Viudo/a</SelectItem>
                  <SelectItem value="other">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dependents">Número de Dependientes *</Label>
              <Input
                id="dependents"
                type="number"
                placeholder="0"
                value={personalInfo.dependents || ''}
                onChange={(e) => updatePersonalInfo({ dependents: Number(e.target.value) })}
                min={0}
                max={20}
                required
                className="bg-input-background border-primary/20 focus:border-primary"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Correo Electrónico *</Label>
            <Input
              id="email"
              type="email"
              placeholder="juan.perez@email.com"
              value={personalInfo.email || ''}
              onChange={(e) => updatePersonalInfo({ email: e.target.value })}
              required
              className="bg-input-background border-primary/20 focus:border-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Teléfono *</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={personalInfo.phone || ''}
              onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
              required
              className="bg-input-background border-primary/20 focus:border-primary"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};