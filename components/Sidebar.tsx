import React, { useState } from 'react';
import { Home, Search, Bookmark, Download, User, LogOut } from 'lucide-react';
import { Logo } from './Logo';
import { useLanguage } from '../context/LanguageContext';
import LanguageSelector from './LanguageSelector';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onLogout }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useLanguage();

  const tabs = [
    { id: 'home', label: t.navHome, icon: Home },
    { id: 'search', label: t.navSearch, icon: Search },
    { id: 'my-list', label: t.myList, icon: Bookmark },
    { id: 'downloads', label: t.navDownloads, icon: Download },
    { id: 'profile', label: t.navProfile, icon: User },
  ];

  return (
    <div
      className={`fixed left-0 top-0 h-full z-[100] flex flex-col transition-all duration-300 ease-in-out group outline-none ${
        isHovered 
          ? 'w-[320px] bg-gradient-to-r from-[#0A1626] via-[#0A1626]/95 to-[#0D1B2A]/90 backdrop-blur-md border-r border-[#0072BC]/20 shadow-2xl' 
          : 'w-[100px] bg-[#0A1626] border-r border-[#0072BC]/20'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsHovered(false);
        }
      }}
      tabIndex={0}
    >
      {/* Logo Area */}
      <div className={`h-28 flex items-center ${isHovered ? 'justify-start px-6' : 'justify-center'} transition-all duration-300`}>
        {isHovered ? (
          <Logo inverted={true} className="h-10" />
        ) : (
          <div className="w-12 h-12 rounded-2xl bg-[#132238]/90 hover:bg-[#132238] border border-[#0072BC]/30 flex items-center justify-center transition-all p-1.5 shadow-lg group-hover:scale-105">
            <Logo variant="icon-only" className="w-full h-full drop-shadow" />
          </div>
        )}
      </div>

      {/* Nav Items */}
      <nav className="flex-1 flex flex-col justify-center gap-2 px-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-4 p-3.5 rounded-xl transition-all duration-200 group/item outline-none cursor-pointer ${
                isActive 
                  ? 'text-white bg-[#0072BC] shadow-md shadow-[#0072BC]/30' 
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              } ${isHovered ? 'justify-start px-4' : 'justify-center'}`}
            >
              <div className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover/item:scale-110'}`}>
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              
              <span className={`text-sm font-bold tracking-wide whitespace-nowrap overflow-hidden transition-all duration-300 ${
                isHovered ? 'opacity-100 max-w-[220px] translate-x-0' : 'opacity-0 max-w-0 -translate-x-4'
              }`}>
                {tab.label}
              </span>

              {/* Active Indicator accent - Vermelho da bandeira do Pará */}
              {isActive && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-7 bg-[#DE292E] rounded-l-full shadow-sm" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Section: Language & Logout */}
      <div className="p-4 pb-6 space-y-2 border-t border-white/5">
        {/* Language selector in sidebar */}
        <div className={`flex items-center ${isHovered ? 'justify-start px-2' : 'justify-center'} transition-all`}>
          <LanguageSelector variant="dark" showLabel={isHovered} />
        </div>

        {onLogout && (
          <button 
            onClick={onLogout}
            className={`flex items-center gap-4 p-3 rounded-xl text-gray-400 hover:text-[#DE292E] hover:bg-red-500/10 transition-all w-full outline-none cursor-pointer ${
              isHovered ? 'justify-start px-4' : 'justify-center'
            }`}
          >
            <LogOut size={20} />
            <span className={`text-sm font-bold whitespace-nowrap overflow-hidden transition-all duration-300 ${
              isHovered ? 'opacity-100 max-w-[200px]' : 'opacity-0 max-w-0'
            }`}>
              {t.navLogout}
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
