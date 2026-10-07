import React from 'react';
import { ArrowLeft, ShieldCheck, Database, Eye, Server, Lock } from 'lucide-react';
import LandingFooter from '../../components/LandingFooter';

type LandingView = 'home' | 'categories' | 'technology' | 'impact' | 'about' | 'partners' | 'contact' | 'help' | 'terms' | 'privacy';

interface PageProps {
  onBack: () => void;
  onViewChange: (v: LandingView) => void;
}

const PrivacyPage: React.FC<PageProps> = ({ onBack, onViewChange }) => {
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
        <span className="text-xs font-bold text-[#DE292E] uppercase tracking-widest">Privacidade • Governo do Pará</span>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 py-16">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-100 border border-emerald-300 rounded-full mb-6">
            <ShieldCheck size={14} className="text-emerald-700" />
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest">Proteção de Dados &amp; LGPD</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-[#0A1626] uppercase tracking-tight mb-4">
            Sua Privacidade é <br />
            <span className="text-[#0072BC]">Prioridade de Estado</span>
          </h1>
          <p className="text-gray-600 text-sm leading-relaxed">
            No <strong>PARAVERSO</strong> e na <strong>SECULT-PA</strong>, a segurança, a ética no tratamento de dados e o respeito à privacidade dos cidadãos orientam nossas diretrizes tecnológicas.
          </p>
        </div>

        {/* Data Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 space-y-3 shadow-sm">
            <Database className="text-[#0072BC]" size={28} />
            <h4 className="font-bold text-base text-[#0A1626]">Dados Coletados</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Coletamos estritamente o necessário para sua identificação e emissão de certificados oficiais: nome completo, endereço de e-mail e histórico de imersão nos conteúdos.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 space-y-3 shadow-sm">
            <Eye className="text-[#DE292E]" size={28} />
            <h4 className="font-bold text-base text-[#0A1626]">Finalidade do Tratamento</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Suas informações são utilizadas exclusivamente para a validação das trilhas culturais, aprimoramento do acervo público e atendimento aos canais da ouvidoria.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 space-y-3 shadow-sm">
            <Server className="text-emerald-600" size={28} />
            <h4 className="font-bold text-base text-[#0A1626]">Hospedagem &amp; Segurança</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Os dados são mantidos em infraestruturas computacionais seguras com criptografia em trânsito e em repouso, respeitando os protocolos do Governo Estadual.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 space-y-3 shadow-sm">
            <Lock className="text-[#00A3E0]" size={28} />
            <h4 className="font-bold text-base text-[#0A1626]">Direitos do Titular</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Você tem total direito de acesso, correção e exclusão de seus dados a qualquer momento pelo canal oficial da ouvidoria da SECULT.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center text-xs text-gray-500 shadow-sm">
          Canal oficial do encarregado de dados (DPO) : <strong>ouvidoria@secult.pa.gov.br</strong> • Secretaria de Estado de Cultura do Pará • Belém - PA.
        </div>
      </div>

      <LandingFooter onViewChange={onViewChange} />
    </div>
  );
};

export default PrivacyPage;
