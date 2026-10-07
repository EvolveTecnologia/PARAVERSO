import React, { useState } from 'react';
import { 
  Bell, Wifi, Monitor, PlayCircle, 
  Trash2, Smartphone, ShieldCheck, ChevronRight, CheckCircle2 
} from 'lucide-react';

const SettingsScreen: React.FC = () => {
  const [settings, setSettings] = useState({
    culturalNews: true,
    liveAlerts: true,
    wifiOnly: false,
    autoplay: true,
    quality: 'auto'
  });

  const [cacheCleaned, setCacheCleaned] = useState(false);

  const toggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key as keyof typeof settings] }));
  };

  const handleClearCache = () => {
    setCacheCleaned(true);
    setTimeout(() => {
      setCacheCleaned(false);
    }, 4000);
  };

  const SettingRow = ({ 
    icon: Icon, 
    title, 
    subtitle, 
    value, 
    onClick, 
    type = 'toggle' 
  }: {
    icon: any;
    title: string;
    subtitle: string;
    value?: boolean | string;
    onClick?: () => void;
    type?: 'toggle' | 'select' | 'action';
  }) => (
    <div 
      className="flex items-center justify-between p-4 bg-[#132238] border border-white/10 rounded-2xl hover:border-[#0072BC]/50 transition-all group cursor-pointer shadow-md" 
      onClick={onClick}
    >
      <div className="flex items-center gap-3.5 min-w-0 flex-1 pr-3">
        <div className="p-2.5 bg-[#0A1626] rounded-xl text-[#00A3E0] group-hover:text-white transition-colors shrink-0">
          <Icon size={18} />
        </div>
        <div className="min-w-0">
          <h4 className="text-xs font-bold text-white truncate">{title}</h4>
          <p className="text-[11px] text-gray-400 font-normal leading-tight">{subtitle}</p>
        </div>
      </div>
      
      {type === 'toggle' && (
        <div className={`w-11 h-6 rounded-full relative transition-colors shrink-0 ${value ? 'bg-[#0072BC]' : 'bg-gray-700'}`}>
          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all ${value ? 'left-6' : 'left-1'}`} />
        </div>
      )}

      {type === 'select' && (
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#00A3E0] shrink-0 bg-[#0A1626] px-3 py-1.5 rounded-xl border border-white/5">
          <span>{value}</span> 
          <ChevronRight size={14} />
        </div>
      )}
      
      {type === 'action' && (
        <ChevronRight size={16} className="text-gray-400 group-hover:text-white shrink-0" />
      )}
    </div>
  );

  return (
    <div className="p-4 sm:p-6 md:p-8 pb-32 space-y-7 max-w-4xl mx-auto text-white">
      
      {/* Toast Feedback */}
      {cacheCleaned && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300 shadow-lg">
          <CheckCircle2 size={18} className="shrink-0 text-emerald-400" />
          <span>Cache e arquivos temporários limpos com sucesso! Espaço liberado.</span>
        </div>
      )}

      {/* Preferências de Notificação */}
      <section className="space-y-3">
        <h3 className="text-xs font-bold text-[#00A3E0] uppercase tracking-wider px-1">
          Preferências de Notificação
        </h3>
        <div className="space-y-2.5">
          <SettingRow 
            icon={Bell} 
            title="Novidades Culturais e Estreias" 
            subtitle="Receba avisos sobre novos documentários, saberes e bioeconomia no Pará."
            value={settings.culturalNews}
            onClick={() => toggle('culturalNews')}
          />
          <SettingRow 
            icon={Smartphone} 
            title="Lembretes de Transmissões Ao Vivo" 
            subtitle="Alertas para festivais e eventos tradicionais do Pará ao vivo."
            value={settings.liveAlerts}
            onClick={() => toggle('liveAlerts')}
          />
        </div>
      </section>

      {/* Reprodução e Economia de Dados */}
      <section className="space-y-3">
        <h3 className="text-xs font-bold text-[#00A3E0] uppercase tracking-wider px-1">
          Reprodução e Economia de Dados
        </h3>
        <div className="space-y-2.5">
          <SettingRow 
            icon={Wifi} 
            title="Download Apenas em Wi-Fi" 
            subtitle="Economize seus dados móveis ao salvar materiais e vídeos no dispositivo."
            value={settings.wifiOnly}
            onClick={() => toggle('wifiOnly')}
          />
          <SettingRow 
            icon={PlayCircle} 
            title="Reprodução Contínua Automática" 
            subtitle="Iniciar o próximo conteúdo cultural automaticamente ao término."
            value={settings.autoplay}
            onClick={() => toggle('autoplay')}
          />
          <SettingRow 
            icon={Monitor} 
            title="Qualidade de Vídeo e VR Padrão" 
            subtitle="Defina a resolução preferencial para reprodução na plataforma."
            value={
              settings.quality === 'auto' 
                ? 'Automática (Recomendada)' 
                : settings.quality === 'high' 
                ? 'Alta Resolução (1080p Full HD)' 
                : 'Imersão 4K VR'
            }
            type="select"
            onClick={() => {
              setSettings(prev => ({
                ...prev,
                quality: prev.quality === 'auto' ? 'high' : prev.quality === 'high' ? '4k' : 'auto'
              }));
            }}
          />
        </div>
      </section>

      {/* Armazenamento e Privacidade */}
      <section className="space-y-3">
        <h3 className="text-xs font-bold text-[#00A3E0] uppercase tracking-wider px-1">
          Armazenamento e Manutenção
        </h3>
        <div className="space-y-2.5">
          <SettingRow 
            icon={Trash2} 
            title="Limpar Cache do Aplicativo" 
            subtitle="Libera espaço temporário em memória (aproximadamente 120 MB)."
            type="action"
            onClick={handleClearCache}
          />
          <SettingRow 
            icon={ShieldCheck} 
            title="Sessões Ativas e Segurança" 
            subtitle="Dispositivo atual autenticado no portal PARAVERSO • SECULT-PA."
            type="action"
            onClick={() => {}}
          />
        </div>
      </section>

      <div className="text-center pt-6 border-t border-white/10 space-y-1">
        <p className="text-[11px] font-bold text-gray-300 uppercase tracking-wider">
          PARAVERSO • Secretaria de Estado de Cultura (SECULT-PA)
        </p>
        <p className="text-[10px] text-gray-500">
          Governo do Estado do Pará • Versão 3.2 Oficial
        </p>
      </div>

    </div>
  );
};

export default SettingsScreen;
