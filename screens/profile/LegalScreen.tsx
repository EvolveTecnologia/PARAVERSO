import React, { useState } from 'react';
import { Shield, FileText, Lock, Database } from 'lucide-react';

const LegalScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'terms' | 'license' | 'privacy' | 'data'>('terms');

  const tabs = [
    { id: 'terms', label: 'Termos de Uso', icon: FileText },
    { id: 'license', label: 'Licença & Direitos', icon: Shield },
    { id: 'privacy', label: 'Privacidade', icon: Lock },
    { id: 'data', label: 'Proteção de Dados (LGPD)', icon: Database },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'terms':
        return (
          <div className="space-y-4 animate-in fade-in duration-300">
            <h2 className="text-lg font-bold text-white uppercase tracking-tight">Termos de Uso • PARAVERSO</h2>
            <p className="text-xs text-gray-300 leading-relaxed">
              Bem-vindo à plataforma PARAVERSO, mantida e operada pelo Governo do Estado do Pará por intermédio da Secretaria de Estado de Cultura (SECULT-PA). Ao utilizar nossos serviços, você concorda com os termos e princípios que orientam o acesso democrático ao patrimônio cultural e imaterial paraense.
            </p>
            
            <h3 className="text-xs font-bold text-[#00A3E0] uppercase tracking-wider mt-4">1. Acesso & Finalidade Pública</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              O acesso aos conteúdos audiovisuais, transmissões ao vivo e experiências imersivas em Realidade Virtual 360° é livre para finalidades culturais, educativas e de pesquisa comunitária.
            </p>
            
            <h3 className="text-xs font-bold text-[#00A3E0] uppercase tracking-wider mt-4">2. Propriedade Intelectual & Patrimônio</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Os acervos documentais, obras fotográficas e registros de saberes tradicionais preservam os direitos morais dos mestres de cultura, artistas e detentores do patrimônio histórico paraense.
            </p>
          </div>
        );
      case 'license':
        return (
          <div className="space-y-4 animate-in fade-in duration-300">
            <h2 className="text-lg font-bold text-white uppercase tracking-tight">Licença de Uso dos Conteúdos</h2>
            <p className="text-xs text-gray-300 leading-relaxed">
              A SECULT-PA concede aos usuários uma licença de uso individual, não exclusiva e gratuita para visualização e difusão cultural sem fins comerciais.
            </p>
            
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-gray-400">
              <li>É vedada a exploração comercial sem prévia autorização formal dos realizadores e da SECULT.</li>
              <li>O download de fichas técnicas e materiais em PDF destina-se a estudos pessoais e difusão escolar.</li>
              <li>A preservação dos créditos autorais e a integridade das obras em 360° devem ser sempre respeitadas.</li>
            </ul>
          </div>
        );
      case 'privacy':
        return (
          <div className="space-y-4 animate-in fade-in duration-300">
            <h2 className="text-lg font-bold text-white uppercase tracking-tight">Política de Privacidade</h2>
            <p className="text-xs text-gray-300 leading-relaxed">
              A salvaguarda da privacidade e a transparência pública orientam o tratamento de dados no PARAVERSO, em estrita conformidade com a Lei Federal nº 13.709/2018 (Lei Geral de Proteção de Dados - LGPD).
            </p>
            
            <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-1">
              <h4 className="font-bold text-white text-xs">Dados Coletados</h4>
              <p className="text-xs text-gray-300">Nome, e-mail e histórico de progresso em experiências imersivas para fins de emissão de certificados culturais e aprimoramento da plataforma.</p>
            </div>
          </div>
        );
      case 'data':
        return (
          <div className="space-y-4 animate-in fade-in duration-300">
            <h2 className="text-lg font-bold text-white uppercase tracking-tight">Direitos do Cidadão (LGPD)</h2>
            <p className="text-xs text-gray-300 leading-relaxed">
              O cidadão pode a qualquer momento consultar, corrigir ou solicitar a exclusão de seus dados cadastrais enviando solicitação para a Ouvidoria da SECULT através de <span className="text-[#00A3E0]">ouvidoria@secult.pa.gov.br</span>.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0A1626] text-white">
      <div className="flex overflow-x-auto hide-scrollbar border-b border-[#0072BC]/20 px-6 md:px-10 bg-[#0A1626] sticky top-0 z-10">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-4 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                isActive ? 'border-[#DE292E] text-white font-bold' : 'border-transparent text-gray-400 hover:text-gray-200'
              }`}
            >
              <Icon size={15} />
              <span className="text-xs uppercase tracking-wider">{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="flex-1 overflow-y-auto p-6 md:p-10 text-gray-300 text-xs leading-relaxed pb-32">
        <div className="max-w-3xl mx-auto">
          {renderContent()}
          <p className="text-center text-[10px] text-gray-400 mt-12 pt-6 border-t border-white/10 uppercase tracking-wider">
            Governo do Estado do Pará • Secretaria de Estado de Cultura (SECULT-PA)
          </p>
        </div>
      </div>
    </div>
  );
};

export default LegalScreen;
