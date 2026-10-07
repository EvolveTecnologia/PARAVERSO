import React, { useState } from 'react';
import { 
  User, ShieldCheck, HelpCircle, 
  LogOut, Settings, ChevronLeft, 
  ChevronRight, Sparkles
} from 'lucide-react';
import { UserProfile } from '../types';

import AccountScreen from './profile/AccountScreen';
import LegalScreen from './profile/LegalScreen';
import SupportScreen from './profile/SupportScreen';
import SettingsScreen from './profile/SettingsScreen';

type SubViewType = 'account' | 'privacy' | 'support' | 'settings';

interface ProfileScreenProps {
  onLogout: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ onLogout }) => {
  const [activeSubView, setActiveSubView] = useState<SubViewType>('account');
  const [isMobileDetailOpen, setIsMobileDetailOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  
  const [user, setUser] = useState<UserProfile>({
    name: 'Placide Baundja Ikuba',
    email: 'cidadao@paraverso.pa.gov.br',
    cpf: '042.891.242-10',
    avatar: '/perfil.jpg',
    level: 12,
    badges: ['Pioneiro Cultural', 'Cidadão Pará'],
    plan: 'Acesso Público Oficial • SECULT-PA'
  });

  const menuItems = [
    { 
      id: 'account' as SubViewType, 
      label: 'Minha Conta', 
      icon: User, 
      subtitle: 'Dados cadastrais, contatos e endereço no Pará' 
    },
    { 
      id: 'privacy' as SubViewType, 
      label: 'Termos e Privacidade', 
      icon: ShieldCheck, 
      subtitle: 'Termos de uso, licenças e conformidade LGPD' 
    },
    { 
      id: 'support' as SubViewType, 
      label: 'Suporte e Ajuda', 
      icon: HelpCircle, 
      subtitle: 'Atendimento ao cidadão, chat e ouvidoria SECULT' 
    },
    { 
      id: 'settings' as SubViewType, 
      label: 'Configurações', 
      icon: Settings, 
      subtitle: 'Streaming, economia de dados e preferências' 
    },
  ];

  const handleSelectMenuItem = (id: SubViewType) => {
    setActiveSubView(id);
    setIsMobileDetailOpen(true);
  };

  const renderActiveScreen = () => {
    switch (activeSubView) {
      case 'account':
        return <AccountScreen user={user} onUpdate={setUser} />;
      case 'privacy':
        return <LegalScreen />;
      case 'support':
        return <SupportScreen />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <AccountScreen user={user} onUpdate={setUser} />;
    }
  };

  const currentItem = menuItems.find(i => i.id === activeSubView) || menuItems[0];

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#0A1626] text-white overflow-hidden">
      
      {/* Sidebar / Main Menu (visible on desktop always, visible on mobile when detail is closed) */}
      <div className={`w-full md:w-1/3 lg:w-80 md:border-r border-white/10 flex flex-col h-full bg-[#0A1626] relative z-10 ${isMobileDetailOpen ? 'hidden md:flex' : 'flex'}`}>
        
        {/* Profile Header */}
        <div className="pt-20 sm:pt-24 pb-6 px-6 text-center bg-gradient-to-b from-[#132238] to-[#0A1626] border-b border-white/5 shrink-0">
          <div className="relative inline-block mb-3">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-[#0072BC] shadow-xl mx-auto flex items-center justify-center bg-[#132238]">
              <img 
                src={user.avatar} 
                className="w-full h-full rounded-full object-cover object-center aspect-square" 
                alt="Avatar do Usuário"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=face';
                }}
              />
            </div>
            <div className="absolute bottom-0 right-0 bg-[#0072BC] p-1.5 rounded-full text-white shadow-md border-2 border-[#0A1626]">
              <Sparkles size={13} className="text-[#00A3E0]" />
            </div>
          </div>
          <h1 className="text-base sm:text-lg font-bold tracking-tight text-white mb-0.5 uppercase truncate">
            {user.name}
          </h1>
          <p className="text-[10px] sm:text-[11px] text-[#00A3E0] font-bold uppercase tracking-wider">
            {user.plan}
          </p>
        </div>

        {/* Menu Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2 pb-32 md:pb-8 hide-scrollbar">
          <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 px-3 py-1">
            Menu do Perfil
          </div>

          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSubView === item.id;
            return (
              <button 
                key={item.id} 
                onClick={() => handleSelectMenuItem(item.id)}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl transition-all border group text-left cursor-pointer ${
                  isActive 
                    ? 'bg-[#0072BC] border-[#00A3E0] shadow-lg shadow-[#0072BC]/20 text-white' 
                    : 'bg-[#132238]/60 border-white/5 hover:bg-[#132238] hover:border-white/10 text-gray-200'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className={`p-2.5 rounded-xl transition-colors shrink-0 ${isActive ? 'bg-white/20 text-white' : 'bg-white/5 text-gray-400 group-hover:text-white'}`}>
                    <Icon size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="block text-xs font-bold tracking-wide truncate">
                      {item.label}
                    </span>
                    <span className={`text-[10px] block truncate ${isActive ? 'text-white/80' : 'text-gray-400'}`}>
                      {item.subtitle}
                    </span>
                  </div>
                </div>
                <ChevronRight size={14} className={`shrink-0 ml-2 ${isActive ? 'text-white' : 'text-gray-500'}`} />
              </button>
            );
          })}

          <div className="pt-4 border-t border-white/5">
            <button 
              onClick={() => setShowLogoutConfirm(true)}
              className="w-full flex items-center gap-3 p-3.5 text-red-400 hover:bg-red-500/10 rounded-2xl transition-all border border-transparent hover:border-red-500/20 group cursor-pointer"
            >
              <div className="p-2 bg-red-500/10 rounded-xl group-hover:bg-red-500/20 text-red-400">
                <LogOut size={18} />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider">Encerrar Sessão</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Detail Overlay View (Shown on mobile when a subscreen is opened) */}
      <div className={`fixed inset-0 bg-[#0A1626] z-50 flex flex-col md:hidden overflow-hidden ${isMobileDetailOpen ? 'flex' : 'hidden'}`}>
        {/* Mobile Detail Header */}
        <div className="px-4 py-4 pt-16 border-b border-white/10 flex items-center justify-between bg-[#0F1E36] sticky top-0 z-10 shadow-md">
          <button 
            onClick={() => setIsMobileDetailOpen(false)} 
            className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/15 rounded-xl transition-colors cursor-pointer text-white text-xs font-bold uppercase tracking-wider"
          >
            <ChevronLeft size={18} />
            <span>Voltar ao Menu</span>
          </button>
          <div className="text-right">
            <h2 className="text-xs font-black text-white uppercase tracking-wider">
              {currentItem.label}
            </h2>
            <p className="text-[10px] text-[#00A3E0] font-medium">PARAVERSO</p>
          </div>
        </div>

        {/* Mobile Detail Content */}
        <div className="flex-1 overflow-y-auto pb-32 hide-scrollbar">
          {renderActiveScreen()}
        </div>
      </div>

      {/* Desktop Main Content Area (Hidden on mobile) */}
      <div className="hidden md:flex flex-1 flex-col h-full bg-[#0A1626] overflow-hidden">
        {/* Desktop Header */}
        <div className="pt-20 px-8 py-5 border-b border-white/10 bg-[#0F1E36]/60 backdrop-blur-md flex items-center justify-between shrink-0">
          <div>
            <span className="text-[10px] font-bold text-[#00A3E0] uppercase tracking-wider">Painel do Usuário</span>
            <h2 className="text-lg font-black text-white uppercase tracking-tight">
              {currentItem.label}
            </h2>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-300 font-bold">{user.name}</p>
            <p className="text-[10px] text-gray-400">CPF: {user.cpf}</p>
          </div>
        </div>

        {/* Desktop Subview Scroll Container */}
        <div className="flex-1 overflow-y-auto hide-scrollbar overscroll-contain">
          {renderActiveScreen()}
        </div>
      </div>

      {/* Logout Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-[#132238] border border-white/10 p-8 rounded-3xl w-full max-w-sm space-y-6 text-center shadow-2xl text-white">
            <div className="w-14 h-14 bg-red-500/10 text-red-400 rounded-full flex items-center justify-center mx-auto border border-red-500/20">
              <LogOut size={26} />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold uppercase tracking-tight">Encerrar sessão?</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Você precisará entrar novamente para acessar sua lista e conteúdos do PARAVERSO.
              </p>
            </div>
            <div className="flex flex-col gap-2.5 pt-2">
              <button 
                onClick={() => { setShowLogoutConfirm(false); onLogout(); }}
                className="w-full py-3.5 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer"
              >
                CONFIRMAR SAÍDA
              </button>
              <button 
                onClick={() => setShowLogoutConfirm(false)}
                className="w-full py-3.5 bg-white/10 hover:bg-white/15 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                CANCELAR
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileScreen;
