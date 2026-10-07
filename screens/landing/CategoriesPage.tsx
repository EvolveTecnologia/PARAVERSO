import React from 'react';
import { ArrowLeft, Briefcase, ShieldCheck, Users, GraduationCap, Globe, Leaf, Cpu, Utensils, Target, Layers, Landmark, PartyPopper, Film } from 'lucide-react';
import LandingFooter from '../../components/LandingFooter';

type LandingView = 'home' | 'categories' | 'technology' | 'impact' | 'about' | 'partners' | 'contact' | 'help' | 'terms' | 'privacy';

interface PageProps {
  onBack: () => void;
  onViewChange: (v: LandingView) => void;
}

const CategoriesPage: React.FC<PageProps> = ({ onBack, onViewChange }) => {
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
        <span className="text-xs font-bold text-[#DE292E] uppercase tracking-widest">Ecossistema • PARAVERSO</span>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#0072BC]/10 rounded-full text-[#0072BC] text-xs font-bold uppercase tracking-wider mb-4">
            <span>Infraestrutura Cultural Integrada</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-[#0A1626] uppercase tracking-tight mb-6">
            Ecossistema de Difusão Cultural <br />
            <span className="text-[#0072BC]">Imersivo &amp; Democrático</span>
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-4xl leading-relaxed">
            A plataforma <strong>PARAVERSO</strong> ultrapassa o streaming tradicional. Trata-se de um ambiente público integrado da SECULT-PA que articula Realidade Virtual 360°, inteligência de mediação cultural e salvaguarda digital das riquezas do Estado do Pará.
          </p>
        </div>

        {/* 3 Pillars of the Ecosystem */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-200 hover:border-[#0072BC] transition-all shadow-sm">
            <div className="w-14 h-14 bg-[#0072BC]/10 rounded-2xl flex items-center justify-center text-[#0072BC] mb-6">
              <Layers size={28} />
            </div>
            <h3 className="text-xl font-bold text-[#0A1626] mb-3">Patrimônio &amp; Memória</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              Digitalização de saberes tradicionais, registros do Círio de Nazaré, Carimbó, marujadas e festivais culturais em altíssima fidelidade.
            </p>
            <ul className="space-y-2.5 text-xs text-gray-500 font-medium">
              <li className="flex items-center gap-2"><div className="w-2 h-2 bg-[#0072BC] rounded-full"/> Museus e Centros Históricos</li>
              <li className="flex items-center gap-2"><div className="w-2 h-2 bg-[#0072BC] rounded-full"/> Saberes dos Mestres de Cultura</li>
              <li className="flex items-center gap-2"><div className="w-2 h-2 bg-[#0072BC] rounded-full"/> Festas e Celebrações Populares</li>
            </ul>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-200 hover:border-[#DE292E] transition-all shadow-sm">
            <div className="w-14 h-14 bg-[#DE292E]/10 rounded-2xl flex items-center justify-center text-[#DE292E] mb-6">
              <ShieldCheck size={28} />
            </div>
            <h3 className="text-xl font-bold text-[#0A1626] mb-3">Governo &amp; Políticas Públicas</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              Transparência na difusão de investimentos da SECULT, modernização da comunicação pública estadual e inclusão digital dos cidadãos paraenses.
            </p>
            <ul className="space-y-2.5 text-xs text-gray-500 font-medium">
              <li className="flex items-center gap-2"><div className="w-2 h-2 bg-[#DE292E] rounded-full"/> Democratização do Acesso à Cultura</li>
              <li className="flex items-center gap-2"><div className="w-2 h-2 bg-[#DE292E] rounded-full"/> Difusão nos 144 Municípios do Pará</li>
              <li className="flex items-center gap-2"><div className="w-2 h-2 bg-[#DE292E] rounded-full"/> Certificação Oficial para Cidadãos</li>
            </ul>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-200 hover:border-[#00A3E0] transition-all shadow-sm">
            <div className="w-14 h-14 bg-[#00A3E0]/10 rounded-2xl flex items-center justify-center text-[#00A3E0] mb-6">
              <Users size={28} />
            </div>
            <h3 className="text-xl font-bold text-[#0A1626] mb-3">Criadores &amp; Coletivos</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              Espaço de projeção para artistas, cineastas e grupos comunitários do Pará levarem suas produções a públicos do Brasil e do exterior.
            </p>
            <ul className="space-y-2.5 text-xs text-gray-500 font-medium">
              <li className="flex items-center gap-2"><div className="w-2 h-2 bg-[#00A3E0] rounded-full"/> Difusão Audiovisual em 360°</li>
              <li className="flex items-center gap-2"><div className="w-2 h-2 bg-[#00A3E0] rounded-full"/> Valorização de Artistas Locais</li>
              <li className="flex items-center gap-2"><div className="w-2 h-2 bg-[#00A3E0] rounded-full"/> Transmissões de Espetáculos ao Vivo</li>
            </ul>
          </div>
        </div>

        {/* Áreas Temáticas */}
        <div className="bg-white p-8 md:p-12 rounded-3xl border border-gray-200 shadow-sm">
          <div className="max-w-2xl mb-10">
            <h2 className="text-2xl font-black text-[#0A1626] uppercase tracking-tight mb-2">Áreas Temáticas do Acervo</h2>
            <p className="text-sm text-gray-600">Trilhas imersivas que celebram a identidade, a ecologia e o patrimônio do Pará.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-gray-200 text-center space-y-2">
              <Landmark className="mx-auto text-[#0072BC]" size={24} />
              <div className="text-xs font-bold text-[#0A1626]">Patrimonial e Saberes</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-gray-200 text-center space-y-2">
              <PartyPopper className="mx-auto text-[#DE292E]" size={24} />
              <div className="text-xs font-bold text-[#0A1626]">Eventos Culturais</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-gray-200 text-center space-y-2">
              <Film className="mx-auto text-[#005CAB]" size={24} />
              <div className="text-xs font-bold text-[#0A1626]">Documentários</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-gray-200 text-center space-y-2">
              <Leaf className="mx-auto text-emerald-600" size={24} />
              <div className="text-xs font-bold text-[#0A1626]">Meio Ambiente</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-gray-200 text-center space-y-2">
              <Utensils className="mx-auto text-amber-600" size={24} />
              <div className="text-xs font-bold text-[#0A1626]">Bioeconomia</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-gray-200 text-center space-y-2">
              <Briefcase className="mx-auto text-[#0072BC]" size={24} />
              <div className="text-xs font-bold text-[#0A1626]">Gestão Cultural</div>
            </div>
          </div>
        </div>
      </div>

      <LandingFooter onViewChange={onViewChange} />
    </div>
  );
};

export default CategoriesPage;
