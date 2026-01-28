import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Phone, X, MessageCircle, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CallMeBack: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);

  const formatPhoneNumber = (value: string): string => {
    // Eliminar todo lo que no sea número
    const numbers = value.replace(/\D/g, '');
    
    // Aplicar formato: (XXX) XXX-XXXX para números de 10 dígitos
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    if (numbers.length <= 10) return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
    
    // Para números más largos (incluyendo lada internacional)
    return `+${numbers.slice(0, numbers.length - 10)} (${numbers.slice(-10, -7)}) ${numbers.slice(-7, -4)}-${numbers.slice(-4)}`;
  };

  const validatePhoneNumber = (number: string): boolean => {
    // Validar que el número tenga entre 10 y 15 dígitos
    const cleanNumber = number.replace(/\D/g, '');
    const phoneRegex = /^[0-9]{10,15}$/;
    return phoneRegex.test(cleanNumber);
  };

  const handleCallMe = () => {
    if (validatePhoneNumber(phoneNumber)) {
      // Lógica para manejar la solicitud de llamada
      console.log('Número válido:', phoneNumber);
      setIsSubmitted(true);
      setError('');
      // Aquí podrías agregar una llamada a tu API o servicio
    } else {
      setError('Por favor ingresa un número de teléfono válido (mínimo 10 dígitos)');
    }
  };

  const handleWhatsApp = () => {
    
    const message = encodeURIComponent('Hola, me gustaría más información sobre sus servicios de crédito.');
    // Asegurarse de que el número no empiece con 1 (código de país)
    const formattedPhone = '000000';
    window.open(`https://wa.me/${formattedPhone}?text=${message}`, '_blank');
  };

  const resetForm = () => {
    setPhoneNumber('');
    setIsSubmitted(false);
    setError('');
  };

  // Efecto para mostrar/ocultar el tooltip cada 15 segundos
  React.useEffect(() => {
    // Mostrar el tooltip después de 3 segundos de la carga inicial
    const initialTimer = setTimeout(() => {
      setShowTooltip(true);
    }, 3000);

    // Configurar el intervalo para mostrar/ocultar el tooltip
    const interval = setInterval(() => {
      setShowTooltip(prev => !prev);
    }, 15000); // Cambiar cada 15 segundos

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50" style={{ pointerEvents: 'none' }}>
        <div className="relative">
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-full right-0 mb-3 bg-primary text-white text-sm font-medium px-4 py-2 rounded-lg shadow-lg whitespace-nowrap"
                style={{ pointerEvents: 'auto', marginRight: '60px' }}
              >
                ¡Solicita una llamada!
                <div className="absolute right-3 bottom-0 w-2 h-2 transform translate-y-1/2 rotate-45 bg-primary"></div>
              </motion.div>
            )}
          </AnimatePresence>
        
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              x: 0,
              y: 0
            }}
            whileHover={{ 
              scale: 1.1,
              transition: { duration: 0.2 }
            }}
            whileTap={{ 
              scale: 0.95,
              transition: { duration: 0.1 }
            }}
            onHoverStart={() => setShowTooltip(true)}
            onHoverEnd={() => setShowTooltip(false)}
            style={{
              position: 'relative',
              width: '56px',
              height: '56px',
              pointerEvents: 'auto'
            }}
          >
            <Button
              onClick={() => {
                setIsOpen(true);
                setShowTooltip(false);
              }}
              className="h-14 w-14 rounded-full shadow-xl bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
              size="icon"
              aria-label="Solicitar llamada"
            >
              <Phone className="h-6 w-6" />
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-6 right-6 z-50 w-80"
    >
      <Card className="shadow-2xl border-primary/30 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary to-accent text-white p-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg flex items-center gap-2">
              <Phone className="h-5 w-5" />
              ¿Quieres que te llamemos?
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setIsOpen(false);
                resetForm();
              }}
              className="text-white hover:bg-white/20 h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-4 bg-card">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4"
              >
                <p className="text-sm text-muted-foreground">
                  Déjanos tu número y te contactaremos a la brevedad o envíanos un mensaje por WhatsApp.
                </p>
                
                <div className="space-y-2">
                  <div className="relative">
                    <Input
                      type="tel"
                      placeholder="+52 (123) 456-7890"
                      value={phoneNumber}
                      onChange={(e) => {
                        // Obtener solo los números
                        const input = e.target.value.replace(/\D/g, '');
                        // Aplicar formato
                        const formatted = formatPhoneNumber(input);
                        setPhoneNumber(formatted);
                        if (error) setError('');
                      }}
                      onKeyDown={(e) => {
                        // Permitir solo teclas de control, números y teclas de navegación
                        if (!/^[0-9\b\t\n\r\f\v\x00-\x08\x0B\x0E-\x1F\x7F]$/.test(e.key) && 
                            !['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      maxLength={20} // Espacio suficiente para formato internacional
                      className={`pr-10 ${error ? 'border-destructive' : ''}`}
                    />
                    {error && (
                      <AlertCircle className="h-4 w-4 text-destructive absolute right-3 top-1/2 transform -translate-y-1/2" />
                    )}
                  </div>
                  {error && (
                    <p className="text-xs text-destructive">{error}</p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <Button 
                    onClick={handleCallMe}
                    className="w-full bg-primary hover:bg-primary/90"
                    disabled={!phoneNumber.trim()}
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Llámame
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-green-500 text-green-600 hover:bg-green-50"
                    onClick={handleWhatsApp}
                    disabled={!validatePhoneNumber(phoneNumber)}
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Enviar WhatsApp
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-4"
              >
                <div className="flex justify-center mb-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <h4 className="font-medium mb-2">¡Solicitud enviada!</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Nos pondremos en contacto contigo a la brevedad. Gracias por tu interés.
                </p>
                <Button 
                  onClick={() => {
                    setIsOpen(false);
                    resetForm();
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Cerrar
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
};
