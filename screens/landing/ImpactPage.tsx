import React from 'react';
import { ArrowLeft, Target, TrendingUp, Users, Leaf, Award, MapPin } from 'lucide-react';
import LandingFooter from '../../components/LandingFooter';

type LandingView = 'home' | 'categories' | 'technology' | 'impact' | 'about' | 'partners' | 'contact' | 'help' | 'terms' | 'privacy';

interface PageProps {
  onBack: () => void;
  onViewChange: (v: LandingView) => void;
}

const ImpactPage: React.FC<PageProps> = ({ onBack, onViewChange }) => {
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
        <span className="text-xs font-bold text-[#DE292E] uppercase tracking-widest">Impacto Cultural &amp; Social • Pará</span>
      </div>
      
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 py-10 sm:py-14 md:py-16">
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-emerald-100 border border-emerald-300 rounded-full mb-4 sm:mb-6">
            <Leaf size={14} className="text-emerald-700" />
            <span className="text-[11px] sm:text-xs font-bold text-emerald-800 uppercase tracking-wider sm:tracking-widest">Sustentabilidade, Bioeconomia &amp; Cidadania</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#0A1626] uppercase leading-tight mb-4 sm:mb-6">
            Impacto Social &amp; Preservação <br />
            <span className="text-[#0072BC]">do Patrimônio Paraense</span>
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Por meio da <strong>SECULT-PA</strong>, a plataforma <strong>PARAVERSO</strong> promove a democratização cultural, a difusão da memória ancestral e a valorização das manifestações populares em todos os 144 municípios do Estado do Pará.
          </p>
        </div>

        {/* 4 Methodologies */}
        <div className="space-y-4 sm:space-y-6 mb-16 sm:mb-20 md:mb-24 max-w-4xl mx-auto">
          <div className="bg-white p-5 sm:p-6 md:p-8 rounded-2xl md:rounded-3xl border border-gray-200 flex flex-col sm:flex-row items-start gap-4 sm:gap-6 shadow-sm">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#0072BC] text-white flex items-center justify-center font-bold text-base sm:text-lg shrink-0">
              1
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#0A1626] mb-1 sm:mb-2">Democratização do Acesso nos 144 Municípios</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Levar a imersão em Realidade Virtual e o acervo histórico a comunidades ribeirinhas, quilombolas, indígenas e escolas públicas de todo o território paraense.
              </p>
            </div>
          </div>

          <div className="bg-white p-5 sm:p-6 md:p-8 rounded-2xl md:rounded-3xl border border-gray-200 flex flex-col sm:flex-row items-start gap-4 sm:gap-6 shadow-sm">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#DE292E] text-white flex items-center justify-center font-bold text-base sm:text-lg shrink-0">
              2
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#0A1626] mb-1 sm:mb-2">Salvaguarda da Memória &amp; Mestres da Cultura</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Documentação sistemática em 360° dos saberes do Carimbó, Marujada, Círio de Nazaré, artesanato marajoara e patrimônio imaterial para as futuras gerações.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-200 flex flex-col md:flex-row items-start gap-6 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#00A3E0] text-white flex items-center justify-center font-bold text-lg shrink-0">
              3
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#0A1626] mb-2">Turismo Sustentável de Baixo Carbono</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                A tecnologia imersiva permite a divulgação de destinos ecológicos e culturais, estimulando a bioeconomia e gerando visibilidade internacional sustentável.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-200 flex flex-col md:flex-row items-start gap-6 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shrink-0">
              4
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#0A1626] mb-2">Certificação Pública e Formação Cidadã</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Emissão de certificados oficiais da SECULT para educadores, estudantes e pesquisadores que completam as trilhas culturais da plataforma.
              </p>
            </div>
          </div>
        </div>
      </div>

      <LandingFooter onViewChange={onViewChange} />
    </div>
  );
};

export default ImpactPage;
