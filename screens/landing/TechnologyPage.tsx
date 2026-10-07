import React from 'react';
import { ArrowLeft, Brain, Lock, WifiOff, Smartphone, Server, Layers, Zap } from 'lucide-react';
import LandingFooter from '../../components/LandingFooter';

type LandingView = 'home' | 'categories' | 'technology' | 'impact' | 'about' | 'partners' | 'contact' | 'help' | 'terms' | 'privacy';

interface PageProps {
  onBack: () => void;
  onViewChange: (v: LandingView) => void;
}

const TechnologyPage: React.FC<PageProps> = ({ onBack, onViewChange }) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0A1626] font-sans animate-in slide-in-from-right duration-500">
      {/* Header */}
      <div className="sticky top-0 left-0 right-0 z-50 p-4 md:p-6 flex items-center justify-between bg-white/90 backdrop-blur-md border-b border-gray-200">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-[#0072BC]/10 hover:bg-[#0072BC]/20 rounded-full text-[#0072BC] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Voltar</span>
        </button>
        <span className="text-xs font-bold text-[#DE292E] uppercase tracking-widest">Tecnologia • PARAVERSO</span>
      </div>
      
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 py-10 sm:py-14 md:py-16">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center mb-14 sm:mb-18 md:mb-24">
          <div className="md:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0072BC]/10 border border-[#0072BC]/20 rounded-full mb-4 sm:mb-6">
              <Brain size={14} className="text-[#0072BC]" />
              <span className="text-[10px] sm:text-[11px] font-bold text-[#0072BC] uppercase tracking-wider">Infraestrutura VR 360° &amp; Streaming Adaptativo</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#0A1626] uppercase leading-tight mb-4 sm:mb-6">
              Imersão Digital <br />
              <span className="text-[#0072BC]">Realidade Virtual</span> &amp; Memória Viva
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed mb-6 sm:mb-8">
              Apoiada em uma infraestrutura com adaptive streaming, armazenamento em nuvem, CDN e rigorosa segurança cibernética, a plataforma funciona como um ecossistema interativo para hospedar eventos, documentários e sobrevoos da Amazônia Paraense.
            </p>
            
            <div className="grid grid-cols-3 gap-4 sm:gap-6 border-t border-gray-200 pt-6 sm:pt-8">
              <div className="space-y-1">
                <span className="text-xl sm:text-2xl md:text-3xl font-black text-[#0A1626] block">99.9%</span>
                <span className="text-[9px] sm:text-[10px] text-gray-500 uppercase font-bold tracking-wider sm:tracking-widest">Disponibilidade</span>
              </div>
              <div className="space-y-1">
                <span className="text-xl sm:text-2xl md:text-3xl font-black text-[#DE292E] block">4K / 360°</span>
                <span className="text-[9px] sm:text-[10px] text-gray-500 uppercase font-bold tracking-wider sm:tracking-widest">Fluxo Imersivo</span>
              </div>
              <div className="space-y-1">
                <span className="text-xl sm:text-2xl md:text-3xl font-black text-[#00A3E0] block">Zero Buffering</span>
                <span className="text-[9px] sm:text-[10px] text-gray-500 uppercase font-bold tracking-wider sm:tracking-widest">CDN Pará</span>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 w-full">
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
                <img 
                  src="https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=800&auto=format&fit=crop" 
                  alt="Tecnologia PARAVERSO" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-4 sm:p-5 rounded-2xl shadow-xl border border-gray-100 max-w-xs">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                    <Zap size={16} />
                  </div>
                  <span className="text-xs font-bold text-[#0A1626] uppercase tracking-wider">Áudio Espacial 360°</span>
                </div>
                <p className="text-[11px] text-gray-500 leading-normal">
                  Captação binaural e som espacial que recriam a atmosfera de festividades e florestas.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-14 sm:mb-18 md:mb-20">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#0072BC]/10 text-[#0072BC] flex items-center justify-center">
              <Server size={24} />
            </div>
            <h3 className="text-lg font-bold text-[#0A1626]">Infraestrutura Resiliente</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Distribuição em servidores distribuídos no Brasil com baixa latência para atender toda a região metropolitana de Belém e os municípios do interior.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#DE292E]/10 text-[#DE292E] flex items-center justify-center">
              <WifiOff size={24} />
            </div>
            <h3 className="text-lg font-bold text-[#0A1626]">Acesso Offline &amp; Leve</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Downloads inteligentes de fichas técnicas e conteúdos para consulta em áreas com cobertura reduzida de internet.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#00A3E0]/10 text-[#00A3E0] flex items-center justify-center">
              <Lock size={24} />
            </div>
            <h3 className="text-lg font-bold text-[#0A1626]">Segurança &amp; LGPD</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Criptografia de ponta a ponta, certificações autenticadas com hash imutável e proteção integral dos dados do cidadão.
            </p>
          </div>
        </div>
      </div>

      <LandingFooter onViewChange={onViewChange} />
    </div>
  );
};

export default TechnologyPage;
