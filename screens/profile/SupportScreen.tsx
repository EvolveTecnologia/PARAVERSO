import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Phone, Mail, MapPin, Loader2 } from 'lucide-react';

interface Message {
  id: number;
  type: 'bot' | 'user';
  text: string;
  options?: string[];
  action?: 'whatsapp';
}

const SupportScreen: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, type: 'bot', text: 'Olá! Sou o assistente virtual do PARAVERSO • SECULT Pará. Qual é o seu nome?' }
  ]);
  const [inputText, setInputText] = useState('');
  const [step, setStep] = useState(0);
  const [userData, setUserData] = useState({ name: '', subject: '', description: '' });
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const addBotMessage = (text: string, options?: string[], action?: 'whatsapp', delay = 800) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { id: Date.now(), type: 'bot', text, options, action }]);
    }, delay);
  };

  const handleSend = (text: string = inputText) => {
    if (!text.trim()) return;

    setMessages(prev => [...prev, { id: Date.now(), type: 'user', text }]);
    setInputText('');

    if (step === 0) {
      setUserData(prev => ({ ...prev, name: text }));
      setStep(1);
      addBotMessage(`Prazer em falar com você, ${text}! Sobre qual assunto podemos te auxiliar?`, [
        'Acesso às Obras VR', 'Certificados SECULT', 'Dúvidas Culturais', 'Transmissões Ao Vivo', 'Outro'
      ]);
    } else if (step === 1) {
      setUserData(prev => ({ ...prev, subject: text }));
      setStep(2);
      addBotMessage('Perfeito. Por favor, descreva brevemente sua dúvida ou solicitação.');
    } else if (step === 2) {
      setUserData(prev => ({ ...prev, description: text }));
      setStep(3);
      addBotMessage(
        'Agradecemos pelas informações! Nossa equipe de atendimento ao cidadão em Belém também pode atendê-lo diretamente via WhatsApp ou canal oficial.',
        undefined,
        'whatsapp'
      );
    }
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(`*Suporte PARAVERSO • SECULT*\nNome: ${userData.name}\nAssunto: ${userData.subject}\nMensagem: ${userData.description}`);
    window.open(`https://wa.me/5521986738943?text=${text}`, '_blank');
  };

  return (
    <div className="flex flex-col h-full bg-[#0A1626] text-white pb-24 md:pb-0">
      
      {/* Top Cards Info */}
      <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-3 gap-3 border-b border-[#0072BC]/20 bg-[#0F1E36]">
        <div className="bg-[#0A1626] p-3.5 rounded-2xl border border-white/5 flex items-center gap-3">
          <div className="bg-[#0072BC]/20 p-2.5 rounded-xl text-[#00A3E0]"><Mail size={18}/></div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">E-mail Oficial</p>
            <p className="text-white text-xs select-all">contato@secult.pa.gov.br</p>
          </div>
        </div>
        <div className="bg-[#0A1626] p-3.5 rounded-2xl border border-white/5 flex items-center gap-3">
          <div className="bg-emerald-500/20 p-2.5 rounded-xl text-emerald-400"><Phone size={18}/></div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">WhatsApp / Ouvidoria</p>
            <p className="text-white text-xs select-all">+55 (91) 4009-8700</p>
          </div>
        </div>
        <div className="bg-[#0A1626] p-3.5 rounded-2xl border border-white/5 flex items-center gap-3">
          <div className="bg-[#DE292E]/20 p-2.5 rounded-xl text-[#DE292E]"><MapPin size={18}/></div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Sede SECULT • Belém</p>
            <p className="text-white text-xs">Av. Gov. Magalhães Barata, 830 - Nazaré, Belém - PA</p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4" ref={scrollRef}>
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex items-end gap-2.5 max-w-[85%] md:max-w-[65%] ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${msg.type === 'user' ? 'bg-[#DE292E]' : 'bg-[#0072BC]'}`}>
                {msg.type === 'user' ? <User size={13} /> : <Bot size={13} />}
              </div>
              
              <div className={`p-3.5 rounded-2xl text-xs leading-relaxed shadow-md ${
                msg.type === 'user' 
                  ? 'bg-[#DE292E] text-white rounded-br-none' 
                  : 'bg-[#0F1E36] text-gray-200 border border-[#0072BC]/20 rounded-bl-none'
              }`}>
                <p>{msg.text}</p>
                
                {msg.options && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {msg.options.map(opt => (
                      <button 
                        key={opt}
                        onClick={() => handleSend(opt)}
                        className="bg-white/5 hover:bg-[#0072BC]/40 border border-[#0072BC]/30 px-3 py-1.5 rounded-xl text-[11px] font-bold text-[#00A3E0] transition-colors cursor-pointer"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                {msg.action === 'whatsapp' && (
                  <button 
                    onClick={openWhatsApp}
                    className="mt-3 w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all text-xs tracking-wider uppercase shadow-lg cursor-pointer"
                  >
                    <Phone size={14} /> Falar com Atendimento
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-gray-400 text-xs pl-2">
            <Loader2 size={14} className="animate-spin text-[#00A3E0]" />
            <span>Assistente PARAVERSO digitando...</span>
          </div>
        )}
      </div>

      {/* Input Form */}
      <div className="p-4 border-t border-white/10 bg-[#0F1E36]">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="flex items-center gap-2"
        >
          <input 
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Digite sua mensagem aqui..."
            className="flex-1 bg-[#0A1626] border border-white/10 rounded-2xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#0072BC]"
          />
          <button 
            type="submit"
            className="bg-[#DE292E] hover:bg-[#C8191E] p-3 rounded-2xl text-white transition-all shadow-md cursor-pointer shrink-0"
          >
            <Send size={16} />
          </button>
        </form>
      </div>

    </div>
  );
};

export default SupportScreen;
