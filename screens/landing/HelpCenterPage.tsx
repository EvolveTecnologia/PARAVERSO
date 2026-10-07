import React, { useState } from 'react';
import { ArrowLeft, Search, User, Award, CreditCard, Video, Building2, HelpCircle, ChevronRight, MessageCircle } from 'lucide-react';
import LandingFooter from '../../components/LandingFooter';

type LandingView = 'home' | 'categories' | 'technology' | 'impact' | 'about' | 'partners' | 'contact' | 'help' | 'terms' | 'privacy';

interface PageProps {
  onBack: () => void;
  onViewChange: (v: LandingView) => void;
}

const HelpCenterPage: React.FC<PageProps> = ({ onBack, onViewChange }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { icon: User, title: 'Conta & Acesso', desc: 'Login, senha, cadastro e perfil de cidadão.' },
    { icon: Award, title: 'Certificados Culturais', desc: 'Emissão, autenticação digital e comprovação SECULT.' },
    { icon: Video, title: 'Realidade Virtual 360°', desc: 'Experiência em óculos VR, smartphone e modo web interativo.' },
    { icon: CreditCard, title: 'Acesso Público Gratuito', desc: 'Políticas de gratuidade e democratização cultural do Pará.' },
    { icon: Building2, title: 'Escolas & Instituições', desc: 'Uso pedagógico em salas de aula e acervos comunitários.' },
    { icon: HelpCircle, title: 'Suporte Técnico & Ouvidoria', desc: 'Ajuda online, canais de atendimento e perguntas frequentes.' },
  ];

  const faqs = [
    { q: "Como obter um certificado de participação cultural?", a: "Após concluir a visualização dos episódios e módulos de uma trilha cultural, o certificado oficial da SECULT-PA é gerado instantaneamente no seu perfil com código QR e validação digital." },
    { q: "Preciso de óculos de Realidade Virtual para assistir?", a: "Não. O PARAVERSO funciona perfeitamente no seu smartphone com giroscópio (basta mover o aparelho), no computador através do mouse/touchpad ou com qualquer headset de Realidade Virtual compatível." },
    { q: "A plataforma é gratuita para todos os cidadãos?", a: "Sim! O PARAVERSO é uma iniciativa pública do Governo do Estado do Pará desenvolvida pela SECULT para democratizar o acesso ao patrimônio e manifestações de todos os 144 municípios." },
    { q: "Onde fica a sede da Secretaria de Estado de Cultura?", a: "A sede da SECULT-PA fica localizada na Av. Gov. Magalhães Barata, 830 - Nazaré, Belém - PA." },
  ];

  const filteredFaqs = searchQuery
    ? faqs.filter(f => f.q.toLowerCase().includes(searchQuery.toLowerCase()) || f.a.toLowerCase().includes(searchQuery.toLowerCase()))
    : faqs;

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
        <span className="text-xs font-bold text-[#DE292E] uppercase tracking-widest">Ajuda • PARAVERSO</span>
      </div>

      {/* Hero Search */}
      <section className="relative py-16 px-6 md:px-12 text-center bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-3xl md:text-5xl font-black text-[#0A1626] tracking-tight">
            Como podemos te <span className="text-[#0072BC]">ajudar</span> hoje?
          </h1>
          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="text-gray-400" size={20} />
            </div>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquise por dúvidas sobre Realidade Virtual, certificados, conta..."
              className="w-full bg-[#F8FAFC] border border-gray-200 rounded-2xl py-4 pl-12 pr-6 text-[#0A1626] placeholder-gray-400 focus:outline-none focus:border-[#0072BC] text-base shadow-inner"
            />
          </div>
        </div>
      </section>

      {/* Main Categories Grid */}
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <div key={i} className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-[#0072BC] transition-all cursor-pointer shadow-sm">
                <div className="w-12 h-12 bg-[#0072BC]/10 text-[#0072BC] rounded-xl flex items-center justify-center mb-4">
                  <Icon size={24} />
                </div>
                <h3 className="font-bold text-base text-[#0A1626] mb-1">{cat.title}</h3>
                <p className="text-xs text-gray-500">{cat.desc}</p>
              </div>
            );
          })}
        </div>

        {/* FAQs */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black uppercase text-[#0A1626] mb-8 text-center">Perguntas Mais Frequentes</h2>
          <div className="space-y-4">
            {filteredFaqs.map((faq, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-gray-200 space-y-2 shadow-sm">
                <h4 className="font-bold text-sm text-[#0A1626]">{faq.q}</h4>
                <p className="text-xs text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => { window.scrollTo(0, 0); onViewChange('contact'); }}
              className="px-8 py-3.5 bg-[#DE292E] hover:bg-[#C8191E] text-white font-bold rounded-xl text-xs uppercase tracking-wider inline-flex items-center gap-2 shadow-md cursor-pointer transition-transform hover:scale-105"
            >
              <MessageCircle size={16} />
              <span>Falar com o Suporte e Ouvidoria</span>
            </button>
          </div>
        </div>
      </section>

      <LandingFooter onViewChange={onViewChange} />
    </div>
  );
};

export default HelpCenterPage;
