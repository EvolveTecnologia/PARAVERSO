import React from 'react';
import { ArrowLeft, Target, Globe, Award, TrendingUp, Users, Leaf, ShieldCheck, Cpu, Building2, MapPin, Landmark, Sparkles, HeartHandshake, BookOpen, Trophy } from 'lucide-react';
import LandingFooter from '../../components/LandingFooter';

type LandingView = 'home' | 'categories' | 'technology' | 'impact' | 'about' | 'partners' | 'contact' | 'help' | 'terms' | 'privacy';

interface PageProps {
  onBack: () => void;
  onViewChange: (v: LandingView) => void;
}

const AboutPage: React.FC<PageProps> = ({ onBack, onViewChange }) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0A1626] font-sans animate-in slide-in-from-right duration-500">
      {/* Header */}
      <div className="sticky top-0 left-0 right-0 z-50 p-4 md:p-6 flex items-center justify-between bg-white/90 backdrop-blur-md border-b border-gray-200">
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 px-4 py-2 bg-[#0072BC]/10 hover:bg-[#0072BC]/20 rounded-full text-[#0072BC] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Voltar ao Início</span>
        </button>
        <span className="text-xs font-bold text-[#DE292E] uppercase tracking-widest">Institucional • Governo do Pará</span>
      </div>

      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 px-5 sm:px-8 md:px-12 overflow-hidden bg-gradient-to-b from-white to-[#F8FAFC] border-b border-gray-200">
        <div className="max-w-5xl mx-auto text-center space-y-4 sm:space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#0072BC]/10 border border-[#0072BC]/20 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#DE292E] animate-pulse" />
            <span className="text-[11px] sm:text-xs font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#0072BC]">Secretaria de Estado de Cultura • SECULT-PA</span>
          </div>
          
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase leading-tight tracking-tight text-[#0A1626]">
            A Força da Cultura Paraense <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0072BC] via-[#00A3E0] to-[#DE292E]">
              e a Inovação Tecnológica do PARAVERSO
            </span>
          </h1>
          
          <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed font-normal">
            A Secretaria de Estado da Cultura do Pará (SECULT-PA) é o órgão do Governo do Estado responsável por coordenar, promover e executar a política cultural paraense, atuando de forma integrada com a Fundação Cultural do Pará (FCP).
          </p>
        </div>
      </section>

      {/* Institucional & Gestão */}
      <section className="py-12 sm:py-16 px-5 sm:px-8 md:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-black text-[#DE292E] uppercase tracking-widest">
              <span>Governança Pública &amp; Gestão</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A1626] leading-tight">
              Modernização, democratização e valorização das nossas raízes amazônicas.
            </h2>
            <div className="space-y-3.5 text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed">
              <p>
                A <strong>SECULT-PA</strong> lidera o planejamento e a execução de políticas que asseguram o direito constitucional à cultura para todos os cidadãos nos 144 municípios paraenses.
              </p>
              <p>
                Trabalha em permanente integração com a <strong>Fundação Cultural do Pará (FCP)</strong>, cuja missão é fomentar, preservar e difundir os bens culturais, garantindo o acesso às mais diversas linguagens artísticas.
              </p>
              <p>
                Sob a liderança do <strong>Governo Helder Barbalho</strong>, a gestão da secretaria é conduzida pelo secretário <strong>Bruno Chagas da Silva Rodrigues</strong>, dando continuidade e expandindo os programas estratégicos de fomento, descentralização e valorização dos trabalhadores da cultura.
              </p>
            </div>

            <div className="pt-2 flex items-center gap-3 text-xs font-semibold text-gray-600 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
              <MapPin size={18} className="text-[#DE292E] shrink-0" />
              <span>Av. Gov. Magalhães Barata, 830 - Nazaré, Belém - PA • Sede SECULT-PA</span>
            </div>
          </div>

          {/* O que é o PARAVERSO */}
          <div className="bg-[#0A1626] text-white p-8 md:p-10 rounded-3xl border border-[#0072BC]/30 shadow-xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0072BC]/20 text-[#00A3E0] rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles size={14} /> Solução Tecnológica Proprietária
            </div>
            <h3 className="text-xl md:text-2xl font-black uppercase text-white">
              A Plataforma PARAVERSO
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              A Plataforma de Streaming PARAVERSO é uma solução proprietária de imersão digital em Realidade Virtual 360º, estruturada para modernizar a política cultural e a comunicação pública do Estado do Pará.
            </p>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Apoiada em infraestrutura com adaptive streaming, armazenamento em nuvem, CDN e rigorosa segurança cibernética, a plataforma funciona como ecossistema interativo para hospedar e transmitir eventos ao vivo (shows, esportes, Círio de Nazaré), sobrevoos e documentários ambientais.
            </p>
            <div className="pt-2 border-t border-white/10 text-xs text-[#00A3E0] font-semibold">
              Integrada ao Portal da SECULT-PA e ao Mapa Cultural do Pará.
            </div>
          </div>
        </div>
      </section>

      {/* Os 5 Pilares da SECULT-PA */}
      <section className="py-16 px-6 md:px-16 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#0072BC]/10 text-[#0072BC] rounded-full text-xs font-bold uppercase tracking-wider">
              <span>Atuação Transversal</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-[#0A1626]">Os 5 Pilares de Atuação da SECULT-PA</h2>
            <p className="text-sm text-gray-600">Como a política cultural impulsiona o desenvolvimento integral do Estado</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Pilar 1 */}
            <div className="p-6 rounded-3xl bg-[#F8FAFC] border border-gray-200 space-y-3 shadow-sm hover:border-[#0072BC] transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#0072BC]/10 text-[#0072BC] flex items-center justify-center font-bold">
                <Landmark size={24} />
              </div>
              <h4 className="font-bold text-base text-[#0A1626]">1. Projetos &amp; Editais de Fomento</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Execução da Política Nacional Aldir Blanc (PNAB), Pontões de Cultura, editais da FCP ("Novos Contemporâneos") e ocupações artísticas nas Usinas da Paz.
              </p>
            </div>

            {/* Pilar 2 */}
            <div className="p-6 rounded-3xl bg-[#F8FAFC] border border-gray-200 space-y-3 shadow-sm hover:border-[#DE292E] transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#DE292E]/10 text-[#DE292E] flex items-center justify-center font-bold">
                <Sparkles size={24} />
              </div>
              <h4 className="font-bold text-base text-[#0A1626]">2. Eventos, Shows &amp; COP30</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Suporte ao Círio de Nazaré, preparação para a COP30 em Belém com o Circuito MIA, Fest Verão, shows de carimbó, tecnobrega e guitarradas em todo o estado.
              </p>
            </div>

            {/* Pilar 3 */}
            <div className="p-6 rounded-3xl bg-[#F8FAFC] border border-gray-200 space-y-3 shadow-sm hover:border-emerald-600 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                <Leaf size={24} />
              </div>
              <h4 className="font-bold text-base text-[#0A1626]">3. Turismo: Cultura como Motor</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Em sinergia com a SETUR: salvaguarda de patrimônios imateriais, turismo de base comunitária, gastronomia amazônica e festivais como o Sairé e festas no Marajó.
              </p>
            </div>

            {/* Pilar 4 */}
            <div className="p-6 rounded-3xl bg-[#F8FAFC] border border-gray-200 space-y-3 shadow-sm hover:border-[#005CAB] transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#005CAB]/10 text-[#005CAB] flex items-center justify-center font-bold">
                <BookOpen size={24} />
              </div>
              <h4 className="font-bold text-base text-[#0A1626]">4. Educação &amp; Saberes</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Trabalho transversal com a SEDUC: Portal do Conhecimento com entrega de kits literários da FCP, Teatro e Território nas periferias e história dos mestres populares.
              </p>
            </div>

            {/* Pilar 5 */}
            <div className="p-6 rounded-3xl bg-[#F8FAFC] border border-gray-200 space-y-3 shadow-sm hover:border-amber-600 transition-all md:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                <Trophy size={24} />
              </div>
              <h4 className="font-bold text-base text-[#0A1626]">5. Esporte &amp; Expressão Corporal</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Em diálogo com a SEEL: fomento à Capoeira como patrimônio cultural, Jogos Indígenas e lutas tradicionais, além de skate e breakdance nas Usinas da Paz.
              </p>
            </div>
          </div>
        </div>
      </section>

      <LandingFooter onViewChange={onViewChange} />
    </div>
  );
};

export default AboutPage;
