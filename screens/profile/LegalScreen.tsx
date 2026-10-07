import React, { useState } from 'react';
import { Shield, FileText, Lock, Database, CheckCircle2 } from 'lucide-react';

const LegalScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'terms' | 'license' | 'privacy' | 'data'>('terms');

  const tabs = [
    { id: 'terms', label: 'Termos de Uso', icon: FileText },
    { id: 'license', label: 'Licença e Direitos', icon: Shield },
    { id: 'privacy', label: 'Privacidade', icon: Lock },
    { id: 'data', label: 'Proteção de Dados (LGPD)', icon: Database },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'terms':
        return (
          <div className="space-y-5 animate-in fade-in duration-300 text-gray-300 text-xs leading-relaxed">
            <div className="bg-[#132238] p-5 sm:p-6 rounded-2xl border border-white/10 space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-white uppercase tracking-tight">
                Termos de Uso • Plataforma PARAVERSO
              </h2>
              <p>
                Bem-vindo ao PARAVERSO, plataforma pública desenvolvida e mantida pela Secretaria de Estado de Cultura do Pará (SECULT-PA) em conjunto com o Governo do Estado do Pará. O objetivo central é proporcionar acesso irrestrito, democrático e imersivo ao patrimônio histórico, artístico e cultural paraense.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-[#132238] p-5 rounded-2xl border border-white/10 space-y-2">
                <h3 className="text-xs font-bold text-[#00A3E0] uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#00A3E0]" /> 1. Finalidade Pública e Acesso Gratuito
                </h3>
                <p>
                  O PARAVERSO disponibiliza conteúdos audiovisuais, transmissões de festivais culturais tradicionais, documentários, registros de saberes imateriais e experiências imersivas em Realidade Virtual 360° para livre fruição e pesquisa comunitária e educacional.
                </p>
              </div>

              <div className="bg-[#132238] p-5 rounded-2xl border border-white/10 space-y-2">
                <h3 className="text-xs font-bold text-[#00A3E0] uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#00A3E0]" /> 2. Direitos Culturais e Saberes Tradicionais
                </h3>
                <p>
                  Todos os registros documentais, obras fotográficas, manifestações populares e saberes de povos originários e comunidades ribeirinhas e quilombolas preservam os direitos morais de seus mestres, coletivos e detentores culturais.
                </p>
              </div>

              <div className="bg-[#132238] p-5 rounded-2xl border border-white/10 space-y-2">
                <h3 className="text-xs font-bold text-[#00A3E0] uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#00A3E0]" /> 3. Responsabilidade do Usuário
                </h3>
                <p>
                  O usuário compromete-se a utilizar a plataforma de forma ética, abstendo-se de condutas que comprometam a integridade dos servidores, a reprodução não autorizada com fins comerciais ou o desrespeito às manifestações culturais do Estado do Pará.
                </p>
              </div>
            </div>
          </div>
        );

      case 'license':
        return (
          <div className="space-y-5 animate-in fade-in duration-300 text-gray-300 text-xs leading-relaxed">
            <div className="bg-[#132238] p-5 sm:p-6 rounded-2xl border border-white/10 space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-white uppercase tracking-tight">
                Licença de Uso e Salvaguarda de Direitos
              </h2>
              <p>
                A SECULT-PA outorga ao usuário licença de uso individual, intransferível e não exclusiva para fins culturais, pedagógicos, acadêmicos e informativos.
              </p>
            </div>

            <div className="bg-[#132238] p-5 rounded-2xl border border-white/10 space-y-3">
              <h3 className="text-xs font-bold text-[#00A3E0] uppercase tracking-wider">
                Diretrizes de Difusão Cultural:
              </h3>
              <ul className="space-y-2.5">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00A3E0] mt-1.5 shrink-0" />
                  <span><strong>Uso Não Comercial:</strong> É terminantemente proibida a comercialização ou monetização de qualquer material audiovisual ou imersivo presente no acervo.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00A3E0] mt-1.5 shrink-0" />
                  <span><strong>Preservação de Créditos:</strong> Exibições públicas educacionais em escolas ou centros culturais devem sempre citar a autoria original e a chancela do PARAVERSO • SECULT-PA.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00A3E0] mt-1.5 shrink-0" />
                  <span><strong>Integridade das Obras em 360°:</strong> As experiências em realidade virtual devem ser reproduzidas sem edições ou cortes que descaracterizem o patrimônio imaterial retratado.</span>
                </li>
              </ul>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-5 animate-in fade-in duration-300 text-gray-300 text-xs leading-relaxed">
            <div className="bg-[#132238] p-5 sm:p-6 rounded-2xl border border-white/10 space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-white uppercase tracking-tight">
                Política de Privacidade e Transparência
              </h2>
              <p>
                O Governo do Estado do Pará e a SECULT-PA tratam a proteção de dados e a privacidade dos cidadãos como pilares fundamentais da administração pública moderna.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#132238] p-5 rounded-2xl border border-white/10 space-y-2">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Dados Coletados</h3>
                <p>Nome completo, e-mail institucional ou pessoal, município de residência e histórico de visualizações dentro do ambiente cultural da plataforma.</p>
              </div>

              <div className="bg-[#132238] p-5 rounded-2xl border border-white/10 space-y-2">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Finalidade Exclusiva</h3>
                <p>Personalização da experiência do usuário, sincronização da lista de conteúdos favoritos e geração de métricas públicas anonimizadas de fomento à cultura paraense.</p>
              </div>
            </div>
          </div>
        );

      case 'data':
        return (
          <div className="space-y-5 animate-in fade-in duration-300 text-gray-300 text-xs leading-relaxed">
            <div className="bg-[#132238] p-5 sm:p-6 rounded-2xl border border-white/10 space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-white uppercase tracking-tight">
                Proteção de Dados e Direitos do Cidadão (LGPD)
              </h2>
              <p>
                Em plena conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018), garantimos o exercício pleno de todos os direitos dos titulares de dados:
              </p>
            </div>

            <div className="bg-[#132238] p-5 rounded-2xl border border-white/10 space-y-3">
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-[#00A3E0] uppercase tracking-wider">Como exercer seus direitos:</h3>
                <p>
                  O titular poderá a qualquer momento solicitar a retificação, confirmação de tratamento, anonimização ou exclusão de seus dados mediante requisição formal à Ouvidoria Geral da SECULT-PA através do endereço:
                </p>
                <div className="p-3 bg-[#0A1626] rounded-xl border border-white/10 text-white font-mono text-xs select-all">
                  ouvidoria@secult.pa.gov.br
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0A1626] text-white">
      
      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto hide-scrollbar border-b border-white/10 px-4 sm:px-8 bg-[#0F1E36] sticky top-0 z-10">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 sm:px-6 py-4 border-b-2 transition-all whitespace-nowrap cursor-pointer text-xs uppercase tracking-wider ${
                isActive 
                  ? 'border-[#0072BC] text-white font-bold bg-white/5' 
                  : 'border-transparent text-gray-400 hover:text-gray-200'
              }`}
            >
              <Icon size={16} className={isActive ? 'text-[#00A3E0]' : 'text-gray-500'} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content Container */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 max-w-4xl mx-auto w-full pb-32">
        {renderContent()}

        <div className="mt-12 pt-6 border-t border-white/10 text-center space-y-1">
          <p className="text-[11px] font-bold text-gray-300 uppercase tracking-wider">
            Governo do Estado do Pará • Secretaria de Estado de Cultura (SECULT-PA)
          </p>
          <p className="text-[10px] text-gray-500">
            PARAVERSO • Plataforma Pública de Salvaguarda e Difusão Cultural
          </p>
        </div>
      </div>
    </div>
  );
};

export default LegalScreen;
