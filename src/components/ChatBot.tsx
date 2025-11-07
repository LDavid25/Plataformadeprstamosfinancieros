import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { MessageCircle, X, Send } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const FAQ_RESPONSES: Record<string, string> = {
  'monto máximo': 'El monto máximo de préstamo es de $1,000,000 USD.',
  'tasas': 'Nuestras tasas de interés van desde 3% hasta 25% anual, dependiendo de tu perfil crediticio.',
  'plazo': 'Ofrecemos plazos desde 6 meses hasta 30 años (360 meses).',
  'requisitos': 'Necesitas: ser mayor de 18 años, tener ingresos comprobables, y cumplir con el DTI menor a 60%.',
  'tiempo': 'El proceso de evaluación toma entre 24-48 horas. Si apruebas, recibes el dinero en 2-3 días hábiles.',
  'documentos': 'Necesitas: identificación oficial, comprobantes de ingresos de 3 meses, estados de cuenta, y constancia laboral.',
  'dti': 'DTI (Debt-to-Income) es el ratio de deuda a ingreso. Debe ser menor a 60% para calificar.',
  'score': 'Evaluamos tu score considerando historial crediticio, ingresos, estabilidad laboral, y patrimonio.',
};

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: '¡Hola! 👋 Soy tu asistente virtual. ¿En qué puedo ayudarte? Puedo responder preguntas sobre montos, tasas, plazos, requisitos, y más.',
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const [keyword, response] of Object.entries(FAQ_RESPONSES)) {
      if (lowerMessage.includes(keyword)) {
        return response;
      }
    }
    
    return 'Lo siento, no tengo información específica sobre eso. ¿Puedes preguntarme sobre montos, tasas, plazos, requisitos, documentos, DTI o score crediticio?';
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputValue('');

    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: getBotResponse(inputValue),
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 500);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg glow-primary"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 shadow-2xl border-primary/30 glow-primary z-[99999]">
      <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-primary to-accent text-white rounded-t-lg z-[99999]">
        <CardTitle className="text-lg">Asistente Virtual</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(false)}
          className="text-white hover:bg-white/20"
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-96 p-4 bg-black text-white">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.isBot
                      ? 'bg-gray-800 text-white border border-gray-700'
                      : 'bg-primary text-white shadow-lg shadow-primary/30'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.isBot ? 'text-muted-foreground' : 'text-white/70'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString('es', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="p-4 border-t border-border flex gap-2 bg-card">
          <Input
            placeholder="Escribe tu pregunta..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="bg-input-background border-primary/20 focus:border-primary"
          />
          <Button onClick={handleSend} size="icon" className="glow-primary">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
