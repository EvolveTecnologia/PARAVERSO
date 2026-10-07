import React from 'react';
import { ArrowLeft, Handshake, Building2, Landmark, GraduationCap, Video, BarChart, Globe, Zap, ArrowRight } from 'lucide-react';
import LandingFooter from '../../components/LandingFooter';

type LandingView = 'home' | 'categories' | 'technology' | 'impact' | 'about' | 'partners' | 'contact' | 'help' | 'terms' | 'privacy';

interface PageProps {
  onBack: () => void;
  onViewChange: (v: LandingView) => void;
}

const PartnersPage: React.FC<PageProps> = ({ onBack, onViewChange }) => {
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
        <span className="text-xs font-bold text-[#DE292E] uppercase tracking-widest">Parcerias • PARAVERSO</span>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-6 md:px-12 text-center bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#0072BC]/10 rounded-full text-[#0072BC] text-xs font-black uppercase tracking-widest">
            <Handshake size={14} />
            <span>Alianças Culturais &amp; Ecossistema Paraense</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-black uppercase leading-tight tracking-tight text-[#0A1626]">
            Parcerias que Fortalecem o Patrimônio e a <br />
            <span className="text-[#0072BC]">Economia Criativa do Pará</span>
          </h1>
          
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            O <strong>PARAVERSO</strong> e o <strong>Governo do Pará</strong> colaboram com coletivos comunitários, mestres da cultura, universidades, produtoras audiovisuais e entidades socioculturais para preservar e projetar mundialmente a diversidade amazônica.
          </p>

          <div className="pt-4">
            <button 
              onClick={() => { window.scrollTo(0, 0); onViewChange('contact'); }}
              className="px-8 py-4 bg-[#DE292E] hover:bg-[#C8191E] text-white font-black uppercase tracking-widest text-xs rounded-xl transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Integrar a Rede Cultural</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Model Grid */}
      <section className="py-20 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-gray-200 space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#0072BC]/10 text-[#0072BC] flex items-center justify-center">
              <Landmark size={24} />
            </div>
            <h3 className="text-lg font-black uppercase text-[#0A1626]">Instituições Culturais</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Co-produção de mostras, salvaguarda de acervos de museus e digitalização em 360° de monumentos e pontos históricos do Estado.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-200 space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#DE292E]/10 text-[#DE292E] flex items-center justify-center">
              <GraduationCap size={24} />
            </div>
            <h3 className="text-lg font-black uppercase text-[#0A1626]">Universidades &amp; Escolas</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Distribuição pedagógica de conteúdos imersivos sobre história, geografia amazônica e biodiversidade para estudantes paraenses.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-200 space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <Building2 size={24} />
            </div>
            <h3 className="text-lg font-black uppercase text-[#0A1626]">Bioeconomia &amp; Turismo</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Fomento ao turismo de baixo impacto de carbono, gastronomia amazônica e valorização das cadeias de bioeconomia local.
            </p>
          </div>
        </div>
      </section>

      <LandingFooter onViewChange={onViewChange} />
    </div>
  );
};

export default PartnersPage;
