import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, MapPin, Phone, Mail, Send, CheckCircle, Loader2, Building, ExternalLink, MessageSquare, User, Bot, Check } from 'lucide-react';
import LandingFooter from '../../components/LandingFooter';

type LandingView = 'home' | 'categories' | 'technology' | 'impact' | 'about' | 'partners' | 'contact' | 'help' | 'terms' | 'privacy';

interface PageProps {
  onBack: () => void;
  onViewChange: (v: LandingView) => void;
}

type Step = 'name' | 'email' | 'phone' | 'company' | 'interest' | 'message' | 'summary';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  type?: 'text' | 'options' | 'action';
  options?: string[];
}

const ContactPage: React.FC<PageProps> = ({ onBack, onViewChange }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Olá! Sou o assistente virtual do PARAVERSO • SECULT Pará. Vamos iniciar nosso atendimento? Qual é o seu nome completo?',
      sender: 'bot',
      type: 'text'
    }
  ]);
  const [currentStep, setCurrentStep] = useState<Step>('name');
  const [userInput, setUserInput] = useState('');
  const [collectedData, setCollectedData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    interest: '',
    message: ''
  });
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!userInput.trim()) return;

    const input = userInput.trim();
    const newMsg: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user'
    };

    setMessages(prev => [...prev, newMsg]);
    setUserInput('');
    setIsTyping(true);

    setTimeout(() => {
      let botResponse: Message = { id: Date.now().toString(), text: '', sender: 'bot' };
      let nextStep: Step = currentStep;
      const newData = { ...collectedData };

      switch (currentStep) {
        case 'name':
          newData.name = input;
          setCollectedData(newData);
          nextStep = 'email';
          botResponse = {
            id: Date.now().toString(),
            text: `Prazer em falar com você, ${input}! Qual é o seu melhor e-mail para retornarmos o contato?`,
            sender: 'bot'
          };
          break;
        case 'email':
          newData.email = input;
          setCollectedData(newData);
          nextStep = 'phone';
          botResponse = {
            id: Date.now().toString(),
            text: 'Excelente! Poderia informar seu telefone / WhatsApp com DDD?',
            sender: 'bot'
          };
          break;
        case 'phone':
          newData.phone = input;
          setCollectedData(newData);
          nextStep = 'company';
          botResponse = {
            id: Date.now().toString(),
            text: 'Você representa alguma instituição, escola, coletivo cultural ou atua como cidadão individual?',
            sender: 'bot'
          };
          break;
        case 'company':
          newData.company = input;
          setCollectedData(newData);
          nextStep = 'interest';
          botResponse = {
            id: Date.now().toString(),
            text: 'Qual é o seu principal interesse no PARAVERSO? (Selecione uma ou mais opções abaixo)',
            sender: 'bot',
            type: 'options',
            options: [
              'Experiências em Realidade Virtual 360°',
              'Parceria Cultural & SECULT Pará',
              'Transmissão de Festivais & Shows',
              'Uso Pedagógico em Escolas',
              'Documentação do Patrimônio Imaterial',
              'Outro Assunto'
            ]
          };
          break;
        case 'message':
          newData.message = input;
          setCollectedData(newData);
          nextStep = 'summary';
          botResponse = {
            id: Date.now().toString(),
            text: 'Muito obrigado! Suas informações foram registradas com sucesso. Nossa equipe de atendimento ao cidadão entrará em contato em breve.',
            sender: 'bot',
            type: 'action'
          };
          break;
        default:
          break;
      }

      setMessages(prev => [...prev, botResponse]);
      setCurrentStep(nextStep);
      setIsTyping(false);
    }, 900);
  };

  const toggleInterest = (interest: string) => {
    let updated: string[];
    if (selectedInterests.includes(interest)) {
      updated = selectedInterests.filter(i => i !== interest);
    } else {
      updated = [...selectedInterests, interest];
    }
    setSelectedInterests(updated);
  };

  const confirmInterests = () => {
    if (selectedInterests.length === 0) return;

    const interestSummary = selectedInterests.join(', ');
    const userMsg: Message = {
      id: Date.now().toString(),
      text: interestSummary,
      sender: 'user'
    };

    setMessages(prev => [...prev, userMsg]);
    setCollectedData(prev => ({ ...prev, interest: interestSummary }));
    setIsTyping(true);

    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now().toString(),
        text: 'Ótima escolha! Por favor, detalhe sua mensagem ou proposta para a equipe da SECULT.',
        sender: 'bot'
      };
      setMessages(prev => [...prev, botResponse]);
      setCurrentStep('message');
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0A1626] font-sans">
      {/* Header */}
      <div className="sticky top-0 left-0 right-0 z-50 p-4 md:p-6 flex items-center justify-between bg-white/90 backdrop-blur-md border-b border-gray-200">
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 px-4 py-2 bg-[#0072BC]/10 hover:bg-[#0072BC]/20 rounded-full text-[#0072BC] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Voltar ao Início</span>
        </button>
        <span className="text-xs font-bold text-[#DE292E] uppercase tracking-widest">Atendimento • Governo do Pará</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Institutional Information */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0072BC]/10 rounded-full text-[#0072BC] text-xs font-black uppercase tracking-widest mb-4">
                <Building size={14} />
                <span>Sede Institucional</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-[#0A1626] tracking-tight leading-tight mb-4">
                Conecte-se com o <span className="text-[#0072BC]">PARAVERSO</span>
              </h1>
              <p className="text-gray-600 text-sm leading-relaxed">
                A Secretaria de Estado de Cultura do Pará (SECULT) está à disposição para parcerias, suporte aos cidadãos e projetos colaborativos de difusão do patrimônio amazônico.
              </p>
            </div>

            {/* Coordinates Cards */}
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#0072BC]/10 text-[#0072BC] flex items-center justify-center shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#0A1626]">Endereço &amp; Sede</h4>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    <strong>Secretaria de Estado de Cultura (SECULT)</strong><br />
                    Av. Gov. Magalhães Barata, 830 - Nazaré<br />
                    Belém - PA, CEP 66063-240
                  </p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#DE292E]/10 text-[#DE292E] flex items-center justify-center shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#0A1626]">Telefone &amp; Ouvidoria</h4>
                  <p className="text-xs text-gray-600 mt-1">
                    +55 (91) 4009-8700
                  </p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#00A3E0]/10 text-[#00A3E0] flex items-center justify-center shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#0A1626]">E-mail Oficial</h4>
                  <p className="text-xs text-gray-600 mt-1">
                    contato@secult.pa.gov.br<br />
                    ouvidoria@secult.pa.gov.br
                  </p>
                </div>
              </div>
            </div>

            {/* Map Preview */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                <span className="text-xs font-bold text-gray-700">SECULT • Belém do Pará</span>
                <a 
                  href="https://maps.google.com/?q=SECULT+Belem+Para" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-xs text-[#0072BC] font-semibold flex items-center gap-1 hover:underline"
                >
                  Abrir Mapa <ExternalLink size={12} />
                </a>
              </div>
              <iframe 
                title="Mapa Sede SECULT Belém"
                src="https://maps.google.com/maps?q=Secretaria+de+Cultura+do+Para+Belem&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%" 
                height="200" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
              />
            </div>
          </div>

          {/* Right Column: Interactive Chat Assistant */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-200 shadow-md flex flex-col h-[640px] overflow-hidden">
            {/* Chat Header */}
            <div className="p-5 bg-gradient-to-r from-[#0072BC] to-[#005CAB] text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shadow-inner">
                  <Bot size={22} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-wide">Assistente Virtual PARAVERSO</h3>
                  <div className="flex items-center gap-1.5 text-[11px] text-blue-100">
                    <span className="w-2 h-2 rounded-full bg-[#DE292E] animate-pulse" />
                    <span>Ao vivo • Belém - Pará</span>
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full">Atendimento</span>
            </div>

            {/* Chat Body */}
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${
                    m.sender === 'user' 
                      ? 'bg-[#0072BC] text-white rounded-br-none shadow-sm' 
                      : 'bg-white text-[#0A1626] rounded-bl-none border border-gray-200 shadow-sm'
                  }`}>
                    <p>{m.text}</p>
                    
                    {/* Render Multi-options */}
                    {m.type === 'options' && m.options && currentStep === 'interest' && (
                      <div className="mt-4 space-y-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {m.options.map((opt, i) => {
                            const isSelected = selectedInterests.includes(opt);
                            return (
                              <button
                                key={i}
                                type="button"
                                onClick={() => toggleInterest(opt)}
                                className={`text-left p-2.5 rounded-xl text-xs font-semibold border transition-all flex items-center justify-between cursor-pointer ${
                                  isSelected 
                                    ? 'bg-[#DE292E] text-white border-[#DE292E]' 
                                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-[#0072BC]'
                                }`}
                              >
                                <span>{opt}</span>
                                {isSelected && <Check size={14} />}
                              </button>
                            );
                          })}
                        </div>
                        <button
                          type="button"
                          onClick={confirmInterests}
                          disabled={selectedInterests.length === 0}
                          className={`w-full mt-3 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white transition-all ${
                            selectedInterests.length > 0
                              ? 'bg-[#0072BC] hover:bg-[#005CAB] cursor-pointer shadow-md'
                              : 'bg-gray-300 cursor-not-allowed'
                          }`}
                        >
                          Confirmar Seleção ({selectedInterests.length})
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-xs text-gray-400 italic">
                  <Loader2 size={14} className="animate-spin text-[#0072BC]" />
                  <span>PARAVERSO digitando...</span>
                </div>
              )}
            </div>

            {/* Chat Footer Input */}
            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-200 flex gap-3">
              <input 
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder={currentStep === 'summary' ? 'Mensagem enviada com sucesso!' : 'Digite sua resposta aqui...'}
                disabled={currentStep === 'summary' || currentStep === 'interest'}
                className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#0A1626] focus:outline-none focus:border-[#0072BC] disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!userInput.trim() || currentStep === 'summary' || currentStep === 'interest'}
                className="bg-[#DE292E] hover:bg-[#C8191E] disabled:opacity-50 text-white font-bold px-5 py-3 rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Send size={16} />
              </button>
            </form>
          </div>

        </div>
      </div>

      <LandingFooter onViewChange={onViewChange} />
    </div>
  );
};

export default ContactPage;
