import React from 'react';
import { ArrowLeft, ShieldCheck, Scale, FileText } from 'lucide-react';
import LandingFooter from '../../components/LandingFooter';

interface TermsPageProps {
  onBack: () => void;
  onViewChange: (view: any) => void;
}

const TermsPage: React.FC<TermsPageProps> = ({ onBack, onViewChange }) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0A1626] font-sans">
      <nav className="bg-[#0A1626] text-white py-4 px-6 md:px-12 flex items-center justify-between border-b border-[#0072BC]/20">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} /> Voltar ao Início
        </button>
        <span className="text-xs font-bold text-[#DE292E] uppercase tracking-widest">
          Termos de Uso • SECULT-PA
        </span>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12 md:py-16">
        <div className="mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0072BC]/10 text-[#0072BC] rounded-full text-xs font-bold">
            <Scale size={14} /> Legislação &amp; Diretrizes Públicas
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-[#0A1626] tracking-tight">
            Termos Gerais de Uso e Acesso
          </h1>
          <p className="text-gray-600 text-sm">
            Plataforma pública gerida pela <strong>Secretaria de Estado de Cultura (SECULT)</strong> • Governo do Estado do Pará • Belém - PA.
          </p>
        </div>

        <div className="space-y-8 text-sm text-gray-700 leading-relaxed bg-white p-8 md:p-12 rounded-3xl border border-gray-200 shadow-sm">
          <section className="space-y-3">
            <h3 className="text-base font-bold text-[#0A1626] uppercase tracking-wide">1. Finalidade Pública &amp; Acesso</h3>
            <p>
              Os presentes Termos de Uso regem o acesso e a fruição da plataforma digital <strong>PARAVERSO</strong>, desenvolvida para proporcionar imersão em Realidade Virtual 360°, streaming cultural e salvaguarda do patrimônio material e imaterial do Estado do Pará. O acesso aos conteúdos culturais é gratuito e voltado ao cidadão.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-base font-bold text-[#0A1626] uppercase tracking-wide">2. Cadastro e Uso dos Serviços</h3>
            <p>
              O cidadão poderá criar sua conta para salvar preferências, emitir certificados culturais da SECULT e sincronizar conteúdos favoritos. O usuário compromete-se a prestar dados verídicos e manter o sigilo de suas credenciais de acesso.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-base font-bold text-[#0A1626] uppercase tracking-wide">3. Propriedade Intelectual &amp; Patrimônio Cultural</h3>
            <p>
              Todos os registros audiovisuais, fotografias imersivas em 360°, trilhas musicais e materiais informativos disponibilizados no PARAVERSO respeitam a Lei Federal de Direitos Autorais e a salvaguarda do patrimônio imaterial. É vedada qualquer reprodução comercial sem expressa anuência da SECULT-PA e dos detentores dos saberes tradicionais.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-base font-bold text-[#0A1626] uppercase tracking-wide">4. Certificações Oficiais</h3>
            <p>
              Os certificados emitidos pelo PARAVERSO atestam a participação e conclusão de trilhas de imersão e formação cultural chanceladas pela Secretaria de Estado de Cultura do Pará, contendo código de validação digital.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-base font-bold text-[#0A1626] uppercase tracking-wide">5. Legislação Aplicável e Foro</h3>
            <p>
              Estes termos regem-se pela legislação da República Federativa do Brasil, em particular pela LGPD e princípios da administração pública, elegendo-se o foro da Comarca de Belém do Pará para resolução de eventuais controvérsias.
            </p>
          </section>
        </div>
      </main>

      <LandingFooter onViewChange={onViewChange} />
    </div>
  );
};

export default TermsPage;
