import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { ArrowRight, CheckCircle, Check, ArrowRightCircle, Clock, FileText, Building2, Users, BarChart2, DollarSign, ChevronRight, ChevronLeft, MessageSquare, Star, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Input } from './ui/input';
import { Slider } from './ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const advantagesRef = useRef<HTMLDivElement>(null);

  const handleGetStarted = () => {
    navigate('/calculadora');
  };

  // GSAP animations would go here in a real implementation
  useEffect(() => {
    // Initialize GSAP animations
    // gsap.from(".hero-content", { opacity: 0, y: 60, duration: 1 });
    // gsap.from(".hero-btn", { opacity: 0, scale: 0.8, delay: 0.8, duration: 0.5 });
  }, []);

  const creditTypes = [
    { id: 'personal', name: 'Personal', description: 'Para necesidades personales, viajes o gastos inesperados.' },
    { id: 'empresarial', name: 'Empresarial Simple', description: 'Para emprendedores que necesitan capital de trabajo.' },
    { id: 'revolvente', name: 'Revolvente', description: 'Línea de crédito flexible para tus necesidades financieras.' },
    { id: 'pyme', name: 'PYME', description: 'Soluciones financieras para pequeñas y medianas empresas.' },
    { id: 'factoraje', name: 'Factoraje', description: 'Anticipo de facturas para mejorar tu flujo de efectivo.' },
  ];

  const advantages = [
    { icon: <Clock className="h-8 w-8" />, title: 'Respuesta en 24h', description: 'Proceso rápido y sin complicaciones' },
    { icon: <DollarSign className="h-8 w-8" />, title: 'Tasas desde 12%', description: 'Las mejores tasas del mercado' },
    { icon: <CheckCircle className="h-8 w-8" />, title: 'Sin aval', description: 'Sin garantía hipotecaria requerida' },
    { icon: <FileText className="h-8 w-8" />, title: 'Trámite 100% digital', description: 'Sin papeleos ni filas' },
    { icon: <Building2 className="h-8 w-8" />, title: 'Atención personalizada', description: 'Expertos en crédito a tu disposición' },
  ];

  const processSteps = [
    { icon: <FileText className="h-6 w-6" />, title: 'Solicitud', description: 'Completa el formulario en línea' },
    { icon: <Check className="h-6 w-6" />, title: 'Aprobación', description: 'Revisión de documentos' },
    { icon: <DollarSign className="h-6 w-6" />, title: 'Desembolso', description: 'Recibe tu dinero en 24h' },
  ];

  const testimonials = [
    { name: 'Ana M.', role: 'Emprendedora', content: 'Gracias a Banx pude ampliar mi negocio. El proceso fue muy sencillo y rápido.' },
    { name: 'Carlos R.', role: 'Profesional independiente', content: 'Excelente servicio al cliente y tasas muy competitivas.' },
    { name: 'Laura G.', role: 'Dueña de PYME', content: 'La mejor opción para financiamiento empresarial.' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 51, 102, 0.8), rgba(0, 119, 182, 0.8)), url(/images/financial-building.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute top-0 left-0 right-0 z-10">
          <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-white" />
              <span className="text-2xl font-bold text-white">Banx</span>
            </div>
            <Button variant="ghost" className="text-white hover:bg-white/10">
              Iniciar sesión
            </Button>
          </nav>
        </div>

        <div className="container mx-auto px-6 z-10 hero-content">
          <div className="max-w-3xl text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Financiamiento inteligente para hacer crecer tu negocio
            </h1>
            <p className="text-xl text-gray-100 mb-10 max-w-2xl">
              Obtén hasta $5,000,000 MXN con tasas desde 12% anual. Precalifícate en 5 minutos sin compromiso.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="hero-btn text-lg px-8 py-6 bg-white text-primary hover:bg-gray-100"
                onClick={handleGetStarted}
              >
                Conoce tu crédito ideal
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-6 text-white border-white hover:bg-white/10"
              >
                Ver opciones de crédito
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Banx Section */}
      <section ref={advantagesRef} className="py-20 bg-gray-50 advantage-section">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">¿Por qué elegir Banx?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Somos la opción preferida por miles de emprendedores y empresas en México
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {advantages.map((advantage, index) => (
              <Card key={index} className="advantage-card p-6 text-center hover:shadow-lg transition-shadow duration-300 border-0 shadow-sm">
                <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  {advantage.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{advantage.title}</h3>
                <p className="text-gray-600">{advantage.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Credit Types Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Líneas de Crédito Banx</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Encuentra el crédito que mejor se adapte a tus necesidades
            </p>
          </div>

          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-12">
              {creditTypes.map((type) => (
                <TabsTrigger 
                  key={type.id} 
                  value={type.id}
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  {type.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {creditTypes.map((type) => (
              <TabsContent key={type.id} value={type.id} className="credit-card">
                <Card className="border-0 shadow-lg">
                  <CardHeader className="bg-blue-600 text-white rounded-t-lg">
                    <CardTitle className="text-2xl">{type.name}</CardTitle>
                    <p className="text-blue-100">{type.description}</p>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Beneficios</h3>
                        <ul className="space-y-3">
                          {['Sin comisión por apertura', 'Tasas desde 12%', 'Plazos hasta 60 meses', 'Sin aval*'].map((benefit, i) => (
                            <li key={i} className="flex items-start">
                              <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold mb-4">Simulador</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Monto</label>
                            <div className="flex items-center space-x-2">
                              <span>$</span>
                              <Input type="number" placeholder="Ej: 100,000" className="w-full" />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Plazo</label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona un plazo" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="12">12 meses</SelectItem>
                                <SelectItem value="24">24 meses</SelectItem>
                                <SelectItem value="36">36 meses</SelectItem>
                                <SelectItem value="48">48 meses</SelectItem>
                                <SelectItem value="60">60 meses</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <Button className="w-full mt-4">Solicitar este crédito</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-700 text-white process-section">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Proceso Banx</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              En solo 3 sencillos pasos podrás obtener tu crédito
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {processSteps.map((step, index) => (
              <div key={index} className="step flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4">
                  <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-blue-600">
                    {step.icon}
                  </div>
                </div>
                <div className="bg-white/10 p-6 rounded-xl w-full h-full">
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-blue-100">{step.description}</p>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                    <ArrowRightCircle className="h-8 w-8 text-white/50" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Lo que dicen nuestros clientes</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Miles de emprendedores y empresas ya confían en nosotros
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 italic mb-6">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold mr-4">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto final-cta">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Listo para impulsar tu negocio?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Obtén tu préstamo con las mejores condiciones del mercado. Sin papeleos, sin complicaciones.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-6 text-lg"
              onClick={handleGetStarted}
            >
              Comenzar ahora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="mt-4 text-sm text-blue-100">Solo necesitas tu RFC y comprobante de ingresos. Proceso 100% digital.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Building2 className="h-8 w-8 text-white" />
                <span className="text-2xl font-bold">Banx</span>
              </div>
              <p className="text-gray-400">Soluciones financieras inteligentes para tu negocio.</p>
              <div className="flex space-x-4 mt-6">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contacto</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-400 mr-2" />
                  <span>800 123 4567</span>
                </li>
                <li className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-400 mr-2" />
                  <span>hola@banx.mx</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Enlaces rápidos</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Inicio</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Créditos</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Nosotros</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Aviso de privacidad</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Términos y condiciones</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Preguntas frecuentes</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} Banx. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;