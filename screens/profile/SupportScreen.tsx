import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Phone, Mail, MapPin, Loader2, MessageSquare, HelpCircle } from 'lucide-react';

interface Message {
  id: number;
  type: 'bot' | 'user';
  text: string;
  options?: string[];
  action?: 'whatsapp' | 'email';
}

const SupportScreen: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      type: 'bot', 
      text: 'Olá! Bem-vindo ao canal de Suporte e Atendimento do PARAVERSO • SECULT Pará. Como podemos ajudar você hoje?',
      options: [
        'Como assistir vídeos em 360°',
        'Problemas com reprodução',
        'Sugestão de conteúdo cultural',
        'Falar com a Ouvidoria SECULT'
      ]
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const addBotResponse = (text: string, options?: string[], action?: 'whatsapp' | 'email', delay = 600) => {
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

    const lower = text.toLowerCase();

    if (lower.includes('360') || lower.includes('vr') || lower.includes('realidade')) {
      addBotResponse(
        'As experiências em Realidade Virtual 360° do PARAVERSO podem ser assistidas movimentando o smartphone, usando o mouse no computador ou conectando óculos VR compatíveis. Deseja explorar a categoria de Imersões?',
        ['Ver Documentários e Imersões', 'Outra dúvida']
      );
    } else if (lower.includes('reprodução') || lower.includes('travando') || lower.includes('vídeo') || lower.includes('video')) {
      addBotResponse(
        'Para otimizar a reprodução, verifique sua conexão com a internet e ajuste a qualidade de vídeo para "Automática" na aba de Configurações. Se o problema persistir, você pode limpar o cache local.',
        ['Como ir em Configurações', 'Falar com Atendente']
      );
    } else if (lower.includes('sugestão') || lower.includes('conteúdo') || lower.includes('evento')) {
      addBotResponse(
        'Adoramos receber indicações de manifestações culturais e saberes do Pará! Você pode enviar propostas de registro diretamente para o comitê curador da SECULT-PA pelo e-mail oficial.',
        undefined,
        'email'
      );
    } else if (lower.includes('ouvidoria') || lower.includes('atendente') || lower.includes('falar')) {
      addBotResponse(
        'Nossa equipe de atendimento da Secretaria de Estado de Cultura do Pará está disponível em Belém para atender você via WhatsApp ou pelo telefone oficial da Ouvidoria.',
        undefined,
        'whatsapp'
      );
    } else {
      addBotResponse(
        'Recebemos sua mensagem! Nossa equipe de mediação cultural e técnica retornará em breve. Se preferir atendimento em tempo real, utilize nosso canal direto da Ouvidoria.',
        ['Falar com a Ouvidoria SECULT', 'Perguntas Frequentes'],
        'whatsapp'
      );
    }
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent('Olá! Gostaria de suporte sobre a plataforma PARAVERSO - SECULT Pará.');
    window.open(`https://wa.me/559140098700?text=${text}`, '_blank');
  };

  const openEmail = () => {
    window.location.href = 'mailto:contato@secult.pa.gov.br?subject=Suporte%20PARAVERSO';
  };

  return (
    <div className="flex flex-col h-full bg-[#0A1626] text-white">
      
      {/* Informative Cards Header */}
      <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-3 border-b border-white/10 bg-[#0F1E36] shrink-0">
        <div className="bg-[#0A1626] p-3.5 rounded-2xl border border-white/5 flex items-center gap-3">
          <div className="bg-[#0072BC]/20 p-2.5 rounded-xl text-[#00A3E0] shrink-0">
            <Mail size={18} />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">E-mail Oficial</p>
            <p className="text-white text-xs select-all truncate">contato@secult.pa.gov.br</p>
          </div>
        </div>

        <div className="bg-[#0A1626] p-3.5 rounded-2xl border border-white/5 flex items-center gap-3">
          <div className="bg-emerald-500/20 p-2.5 rounded-xl text-emerald-400 shrink-0">
            <Phone size={18} />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Ouvidoria SECULT</p>
            <p className="text-white text-xs select-all truncate">(91) 4009-8700</p>
          </div>
        </div>

        <div className="bg-[#0A1626] p-3.5 rounded-2xl border border-white/5 flex items-center gap-3">
          <div className="bg-[#DE292E]/20 p-2.5 rounded-xl text-[#DE292E] shrink-0">
            <MapPin size={18} />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Sede Belém - PA</p>
            <p className="text-white text-xs truncate">Av. Gov. Magalhães Barata, 830 - Nazaré</p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 max-w-4xl mx-auto w-full" ref={scrollRef}>
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex items-end gap-2.5 max-w-[90%] sm:max-w-[75%] ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-md ${
                msg.type === 'user' ? 'bg-[#DE292E] text-white' : 'bg-[#0072BC] text-white'
              }`}>
                {msg.type === 'user' ? <User size={15} /> : <Bot size={15} />}
              </div>
              
              <div className={`p-4 rounded-2xl text-xs leading-relaxed shadow-lg ${
                msg.type === 'user' 
                  ? 'bg-[#0072BC] text-white rounded-br-none' 
                  : 'bg-[#132238] text-gray-200 border border-white/10 rounded-bl-none'
              }`}>
                <p>{msg.text}</p>
                
                {msg.options && (
                  <div className="mt-3 flex flex-wrap gap-2 pt-1">
                    {msg.options.map((opt, i) => (
                      <button 
                        key={i}
                        onClick={() => handleSend(opt)}
                        className="bg-[#0A1626] hover:bg-[#0072BC]/40 border border-[#0072BC]/30 px-3 py-1.5 rounded-xl text-[11px] font-bold text-[#00A3E0] transition-colors cursor-pointer text-left"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                {msg.action === 'whatsapp' && (
                  <button 
                    onClick={openWhatsApp}
                    className="mt-3.5 w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all text-xs tracking-wider uppercase shadow-md cursor-pointer"
                  >
                    <Phone size={15} /> Falar com Atendimento no WhatsApp
                  </button>
                )}

                {msg.action === 'email' && (
                  <button 
                    onClick={openEmail}
                    className="mt-3.5 w-full bg-[#0072BC] hover:bg-[#0086dc] text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all text-xs tracking-wider uppercase shadow-md cursor-pointer"
                  >
                    <Mail size={15} /> Enviar E-mail para a Curadoria
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-gray-400 text-xs pl-2 py-2">
            <Loader2 size={15} className="animate-spin text-[#00A3E0]" />
            <span>Atendimento PARAVERSO processando...</span>
          </div>
        )}
      </div>

      {/* Input Field */}
      <div className="p-4 border-t border-white/10 bg-[#0F1E36] shrink-0">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="flex items-center gap-2 max-w-4xl mx-auto"
        >
          <div className="flex-1 bg-[#0A1626] border border-white/10 rounded-2xl px-4 py-3 flex items-center gap-2 focus-within:border-[#0072BC] transition-colors">
            <MessageSquare size={16} className="text-gray-400 shrink-0" />
            <input 
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Digite sua dúvida ou mensagem para o suporte..."
              className="bg-transparent text-xs text-white placeholder-gray-500 outline-none w-full"
            />
          </div>
          <button 
            type="submit"
            className="bg-[#0072BC] hover:bg-[#0086dc] p-3.5 rounded-2xl text-white transition-all shadow-lg cursor-pointer shrink-0 active:scale-95"
            aria-label="Enviar mensagem"
          >
            <Send size={16} />
          </button>
        </form>
      </div>

    </div>
  );
};

export default SupportScreen;
