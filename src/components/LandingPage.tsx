import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  Shield, 
  Zap, 
  Clock, 
  Users, 
  TrendingUp,
  Calculator,
  FileText,
  CheckCircle,
  DollarSign,
  Briefcase,
  RefreshCw,
  BarChart3,
  FileStack,
  ArrowRight,
  Star,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { useLoan } from '../context/LoanContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LandingPageProps {
  onStartApplication: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartApplication }) => {
  const { applicationData, updateLoanData } = useLoan();
  const [calcAmount, setCalcAmount] = useState(100000);
  const [calcTerm, setCalcTerm] = useState(12);
  const [calcType, setCalcType] = useState('personal');

  const scrollToCalculator = () => {
    const calculatorSection = document.getElementById('calculadora');
    if (calculatorSection) {
      calculatorSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Líneas de crédito
  const creditLines = [
    {
      id: 'personal',
      title: 'Crédito Personal',
      icon: Users,
      description: 'Para tus proyectos personales y necesidades inmediatas',
      amount: 'Hasta $500,000',
      rate: 'Desde 12% anual',
      term: 'Hasta 48 meses',
      features: [
        'Aprobación en 24 horas',
        'Sin garantía hipotecaria',
        'Tasa fija',
        'Pagos mensuales flexibles'
      ],
      color: 'text-primary'
    },
    {
      id: 'empresarial',
      title: 'Empresarial Simple',
      icon: Briefcase,
      description: 'Impulsa tu negocio con capital de trabajo',
      amount: 'Hasta $1,000,000',
      rate: 'Desde 10% anual',
      term: 'Hasta 60 meses',
      features: [
        'Documentación mínima',
        'Sin aval requerido',
        'Tasa preferencial',
        'Asesoría personalizada'
      ],
      color: 'text-accent'
    },
    {
      id: 'revolvente',
      title: 'Línea Revolvente',
      icon: RefreshCw,
      description: 'Liquidez disponible cuando la necesites',
      amount: 'Hasta $750,000',
      rate: 'Desde 15% anual',
      term: 'Renovable anualmente',
      features: [
        'Dispón cuando quieras',
        'Solo pagas lo que usas',
        'Tasa variable',
        'Renovación automática'
      ],
      color: 'text-blue-400'
    },
    {
      id: 'pyme',
      title: 'PYME Expansión',
      icon: TrendingUp,
      description: 'Para crecer y expandir tu empresa',
      amount: 'Hasta $2,000,000',
      rate: 'Desde 9% anual',
      term: 'Hasta 84 meses',
      features: [
        'Montos grandes',
        'Periodo de gracia disponible',
        'Tasa competitiva',
        'Plan personalizado'
      ],
      color: 'text-green-400'
    },
    {
      id: 'factoraje',
      title: 'Factoraje Financiero',
      icon: FileStack,
      description: 'Adelanta tus cuentas por cobrar',
      amount: 'Hasta $5,000,000',
      rate: 'Desde 8% anual',
      term: 'Según factura',
      features: [
        'Liquidez inmediata',
        'Sin deuda en balance',
        'Mejor flujo de efectivo',
        'Evaluación rápida'
      ],
      color: 'text-yellow-400'
    }
  ];

  // Proceso de solicitud
  const processSteps = [
    {
      step: 1,
      title: 'Calcula y Precalifícate',
      description: 'Usa nuestra calculadora y completa tu solicitud en línea',
      icon: Calculator
    },
    {
      step: 2,
      title: 'Evaluación Automática',
      description: 'Nuestro sistema evalúa tu perfil en tiempo real',
      icon: BarChart3
    },
    {
      step: 3,
      title: 'Recibe tu Crédito',
      description: 'Aprobación en 48 horas y depósito directo a tu cuenta',
      icon: CheckCircle
    }
  ];

  // Ventajas
  const advantages = [
    {
      icon: Zap,
      title: 'Proceso Rápido',
      description: 'Respuesta en menos de 48 horas'
    },
    {
      icon: Shield,
      title: '100% Seguro',
      description: 'Encriptación bancaria de datos'
    },
    {
      icon: Clock,
      title: 'Disponible 24/7',
      description: 'Solicita en cualquier momento'
    },
    {
      icon: DollarSign,
      title: 'Tasas Competitivas',
      description: 'Las mejores del mercado'
    },
    {
      icon: Users,
      title: 'Asesoría Experta',
      description: 'Apoyo personalizado siempre'
    }
  ];

  // Testimonios
  const testimonials = [
    {
      name: 'María González',
      role: 'Emprendedora',
      content: 'Gracias a Créditos Banx pude expandir mi negocio. El proceso fue rápido y transparente.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1647884866497-0bacd3f9e388?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGJ1c2luZXNzJTIwcGVyc29ufGVufDF8fHx8MTc2MjQyMTk0OXww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      name: 'Carlos Ramírez',
      role: 'Director de PYME',
      content: 'La mejor decisión financiera que he tomado. Tasas justas y excelente atención.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBzdWNjZXNzfGVufDF8fHx8MTc2MjQ0NjQxMnww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      name: 'Laura Martínez',
      role: 'Profesionista',
      content: 'Proceso 100% digital y sin complicaciones. Recomendado ampliamente.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1762341114803-a797c44649f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBlbnRyZXByZW5ldXJ8ZW58MXx8fHwxNzYyNDU2NjcxfDA&ixlib=rb-4.1.0&q=80&w=1080'
    }
  ];

  const calculatePreview = () => {
    const rates: { [key: string]: number } = {
      personal: 0.12,
      empresarial: 0.10,
      revolvente: 0.15,
      pyme: 0.09,
      factoraje: 0.08
    };
    const monthlyRate = rates[calcType] / 12;
    const monthlyPayment = calcAmount * (monthlyRate * Math.pow(1 + monthlyRate, calcTerm)) / (Math.pow(1 + monthlyRate, calcTerm) - 1);
    const total = monthlyPayment * calcTerm;
    return { monthlyPayment, total, rate: rates[calcType] * 100 };
  };

  const preview = calculatePreview();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1694702740570-0a31ee1525c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBidWlsZGluZ3xlbnwxfHx8fDE3NjI0MDUzMjh8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Modern office building"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/95" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="mb-6 px-4 py-2 bg-primary/10 border-primary/30 hover:bg-primary/20">
                <Zap className="h-4 w-4 mr-2" />
                Plataforma Líder en Créditos Empresariales
              </Badge>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-foreground leading-tight tracking-tight">
                Tu crédito ideal,{' '}
                <span className="text-primary">a un clic</span>
              </h1>
              
              <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 max-w-2xl leading-relaxed font-light">
                Precalifícate en minutos. Proceso 100% digital con las mejores tasas del mercado.
              </p>

              <div className="flex flex-wrap gap-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <Button 
                    size="lg" 
                    className="gap-2 glow-primary text-lg px-8 py-6"
                    onClick={onStartApplication}
                  >
                    Conoce tu crédito ideal
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-primary/30 hover:bg-primary/10 text-lg px-8 py-6"
                    onClick={scrollToCalculator}
                  >
                    Ver calculadora
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ventajas Section */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl mb-4">¿Por qué Créditos Banx?</h2>
            <p className="text-xl text-muted-foreground">
              La confianza de miles de clientes nos respalda
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {advantages.map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <Card className="h-full hover:border-primary/40 transition-all hover:shadow-lg hover:shadow-primary/20 hover:scale-105">
                  <CardHeader className="text-center">
                    <div className="mx-auto p-4 bg-primary/10 rounded-full w-fit mb-4">
                      <advantage.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{advantage.title}</CardTitle>
                    <CardDescription>{advantage.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Líneas de Crédito Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl mb-4">Líneas de Crédito Banx</h2>
            <p className="text-xl text-muted-foreground">
              Soluciones financieras para cada necesidad
            </p>
          </motion.div>

          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-12 bg-card border border-border h-auto">
              {creditLines.map((line) => (
                <TabsTrigger 
                  key={line.id}
                  value={line.id}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3"
                >
                  <line.icon className="h-4 w-4 mr-2" />
                  <span className="hidden md:inline">{line.title}</span>
                  <span className="md:hidden">{line.title.split(' ')[0]}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {creditLines.map((line) => (
              <TabsContent key={line.id} value={line.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card className="border-primary/20">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <line.icon className={`h-10 w-10 ${line.color}`} />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-2xl mb-2">{line.title}</CardTitle>
                          <CardDescription className="text-lg">{line.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <div className="p-4 bg-card border border-border rounded-lg">
                          <p className="text-sm text-muted-foreground mb-1">Monto</p>
                          <p className="text-2xl text-primary">{line.amount}</p>
                        </div>
                        <div className="p-4 bg-card border border-border rounded-lg">
                          <p className="text-sm text-muted-foreground mb-1">Tasa</p>
                          <p className="text-2xl text-accent">{line.rate}</p>
                        </div>
                        <div className="p-4 bg-card border border-border rounded-lg">
                          <p className="text-sm text-muted-foreground mb-1">Plazo</p>
                          <p className="text-2xl text-foreground">{line.term}</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-6">
                        {line.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      <Button 
                        className="w-full gap-2 glow-primary"
                        size="lg"
                        onClick={onStartApplication}
                      >
                        Solicitar este crédito
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Proceso Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl mb-4 text-foreground">Proceso Banx</h2>
            <p className="text-xl text-muted-foreground">
              3 simples pasos para obtener tu crédito
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="relative"
              >
                <Card className="h-full bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl"></div>
                        <div className="relative p-6 bg-primary/10 rounded-full border-2 border-primary">
                          <step.icon className="h-12 w-12 text-primary" />
                        </div>
                      </div>
                    </div>
                    <div className="text-5xl text-primary mb-4">{step.step}</div>
                    <CardTitle className="text-xl mb-2">{step.title}</CardTitle>
                    <CardDescription>{step.description}</CardDescription>
                  </CardHeader>
                </Card>
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                    <ArrowRight className="h-8 w-8 text-primary" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculadora Preview Section */}
      <section className="py-20" id="calculadora">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl mb-4">Calculadora de Crédito</h2>
            <p className="text-xl text-muted-foreground">
              Simula tu crédito y conoce tu pago mensual
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-primary/20 glow-primary">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="calc-type">Tipo de Crédito</Label>
                      <Select value={calcType} onValueChange={setCalcType}>
                        <SelectTrigger id="calc-type" className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="personal">Personal</SelectItem>
                          <SelectItem value="empresarial">Empresarial Simple</SelectItem>
                          <SelectItem value="revolvente">Línea Revolvente</SelectItem>
                          <SelectItem value="pyme">PYME Expansión</SelectItem>
                          <SelectItem value="factoraje">Factoraje</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="calc-amount">
                        Monto Deseado: ${calcAmount.toLocaleString()}
                      </Label>
                      <Slider
                        id="calc-amount"
                        min={10000}
                        max={1000000}
                        step={10000}
                        value={[calcAmount]}
                        onValueChange={(value) => setCalcAmount(value[0])}
                        className="mt-4"
                      />
                    </div>

                    <div>
                      <Label htmlFor="calc-term">
                        Plazo: {calcTerm} meses
                      </Label>
                      <Slider
                        id="calc-term"
                        min={6}
                        max={84}
                        step={6}
                        value={[calcTerm]}
                        onValueChange={(value) => setCalcTerm(value[0])}
                        className="mt-4"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <motion.div
                      key={`${calcAmount}-${calcTerm}-${calcType}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="p-6 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg border border-primary/30"
                    >
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Pago Mensual Estimado</p>
                          <p className="text-3xl text-primary">
                            ${preview.monthlyPayment.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </p>
                        </div>
                        <Separator />
                        <div>
                          <p className="text-sm text-muted-foreground">Total a Pagar</p>
                          <p className="text-2xl">
                            ${preview.total.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Tasa Anual</p>
                          <p className="text-2xl text-accent">{preview.rate}%</p>
                        </div>
                      </div>
                    </motion.div>

                    <Button 
                      className="w-full gap-2 glow-primary" 
                      size="lg"
                      onClick={onStartApplication}
                    >
                      Solicitar este crédito
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonios Section */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl mb-4">Lo que dicen nuestros clientes</h2>
            <p className="text-xl text-muted-foreground">
              Miles de clientes satisfechos confían en nosotros
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="h-full hover:border-primary/40 transition-all hover:shadow-lg hover:shadow-primary/10">
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-6 italic">"{testimonial.content}"</p>
                    <div className="flex items-center gap-3">
                      <ImageWithFallback
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final Section */}
      <section className="py-20 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-5xl mb-6">
              Empieza tu Precalificación{' '}
              <span className="text-primary">Gratuita</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Solo necesitas tu RFC y CIEC. Proceso 100% digital y seguro.
            </p>
            <Button 
              size="lg" 
              className="gap-2 glow-primary-strong text-lg px-12 py-6"
              onClick={onStartApplication}
            >
              Comenzar ahora
              <ArrowRight className="h-5 w-5" />
            </Button>
            <p className="text-sm text-muted-foreground mt-6">
              Sin compromiso • Respuesta inmediata • 100% seguro
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <h3>Créditos Banx</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Líderes en soluciones financieras para personas y empresas.
              </p>
              <div className="flex gap-3">
                <Button size="icon" variant="outline" className="border-primary/20 hover:bg-primary/10">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="outline" className="border-primary/20 hover:bg-primary/10">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="outline" className="border-primary/20 hover:bg-primary/10">
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="outline" className="border-primary/20 hover:bg-primary/10">
                  <Instagram className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Productos */}
            <div>
              <h4 className="mb-4">Productos</h4>
              <ul className="space-y-2 text-sm">
                <li className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                  Crédito Personal
                </li>
                <li className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                  Empresarial Simple
                </li>
                <li className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                  Línea Revolvente
                </li>
                <li className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                  PYME Expansión
                </li>
                <li className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                  Factoraje Financiero
                </li>
              </ul>
            </div>

            {/* Contacto */}
            <div>
              <h4 className="mb-4">Contacto</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                  <span>800-BANX-01<br />Lun-Vie 9:00-18:00</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                  <span>contacto@creditosbanx.com</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                  <span>Ciudad de México, CDMX</span>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                  Términos y Condiciones
                </li>
                <li className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                  Política de Privacidad
                </li>
                <li className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                  Aviso de Privacidad
                </li>
                <li className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                  Regulaciones CNBV
                </li>
                <li className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                  UNE
                </li>
              </ul>
            </div>
          </div>

          <Separator className="my-8" />

          <div className="text-center text-sm text-muted-foreground">
            <p>© 2025 Créditos Banx. Todos los derechos reservados.</p>
            <p className="mt-2">
              Créditos Banx es una marca registrada. Autorizado y regulado por la CNBV.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};