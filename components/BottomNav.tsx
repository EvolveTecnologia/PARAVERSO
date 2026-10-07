import React from 'react';
import { Home, Search, Bookmark, Download, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const { t } = useLanguage();

  const tabs = [
    { id: 'home', label: t.navHome, icon: Home },
    { id: 'search', label: t.navSearch, icon: Search },
    { id: 'my-list', label: t.myList, icon: Bookmark },
    { id: 'downloads', label: t.navDownloads, icon: Download },
    { id: 'profile', label: t.navProfile, icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#0A1626] border-t border-[#0072BC]/20 z-50 flex justify-around items-center py-2 safe-area-inset-bottom md:hidden shadow-2xl backdrop-blur-md">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center gap-1 transition-colors duration-200 cursor-pointer ${
              isActive ? 'text-white' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Icon size={20} strokeWidth={isActive ? 2.5 : 2} className={isActive ? 'text-[#00A3E0]' : ''} />
            <span className={`text-[10px] font-semibold ${isActive ? 'text-white' : 'text-gray-400'}`}>{tab.label}</span>
            {isActive && <div className="w-1.5 h-1.5 bg-[#DE292E] rounded-full mt-0.5 shadow-sm" />}
          </button>
        );
      })}
    </div>
  );
};

export default BottomNav;
