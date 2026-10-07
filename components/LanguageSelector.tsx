import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useLanguage, Language } from '../context/LanguageContext';

// Vector authentic flags for maximum crispness across all platforms & devices
export const FlagBrazil: React.FC<{ className?: string }> = ({ className = 'w-6 h-4' }) => (
  <svg viewBox="0 0 720 504" className={`rounded-[2px] shadow-sm shrink-0 ${className}`}>
    <rect width="720" height="504" fill="#009C3B" />
    <polygon points="360,42 666,252 360,462 54,252" fill="#FFDF00" />
    <circle cx="360" cy="252" r="126" fill="#002776" />
    <path
      d="M248 274 C 285 240, 360 220, 480 260"
      stroke="#FFFFFF"
      strokeWidth="15"
      fill="none"
    />
  </svg>
);

export const FlagUSA: React.FC<{ className?: string }> = ({ className = 'w-6 h-4' }) => (
  <svg viewBox="0 0 741 390" className={`rounded-[2px] shadow-sm shrink-0 ${className}`}>
    <rect width="741" height="390" fill="#B22234" />
    <g fill="#FFFFFF">
      <rect y="30" width="741" height="30" />
      <rect y="90" width="741" height="30" />
      <rect y="150" width="741" height="30" />
      <rect y="210" width="741" height="30" />
      <rect y="270" width="741" height="30" />
      <rect y="330" width="741" height="30" />
    </g>
    <rect width="296" height="210" fill="#3C3B6E" />
    <g fill="#FFFFFF">
      {/* Representative stars grid */}
      <circle cx="35" cy="25" r="7" /><circle cx="85" cy="25" r="7" /><circle cx="135" cy="25" r="7" /><circle cx="185" cy="25" r="7" /><circle cx="235" cy="25" r="7" />
      <circle cx="60" cy="55" r="7" /><circle cx="110" cy="55" r="7" /><circle cx="160" cy="55" r="7" /><circle cx="210" cy="55" r="7" />
      <circle cx="35" cy="85" r="7" /><circle cx="85" cy="85" r="7" /><circle cx="135" cy="85" r="7" /><circle cx="185" cy="85" r="7" /><circle cx="235" cy="85" r="7" />
      <circle cx="60" cy="115" r="7" /><circle cx="110" cy="115" r="7" /><circle cx="160" cy="115" r="7" /><circle cx="210" cy="115" r="7" />
      <circle cx="35" cy="145" r="7" /><circle cx="85" cy="145" r="7" /><circle cx="135" cy="145" r="7" /><circle cx="185" cy="145" r="7" /><circle cx="235" cy="145" r="7" />
      <circle cx="60" cy="175" r="7" /><circle cx="110" cy="175" r="7" /><circle cx="160" cy="175" r="7" /><circle cx="210" cy="175" r="7" />
    </g>
  </svg>
);

export const FlagFrance: React.FC<{ className?: string }> = ({ className = 'w-6 h-4' }) => (
  <svg viewBox="0 0 900 600" className={`rounded-[2px] shadow-sm shrink-0 ${className}`}>
    <rect width="300" height="600" fill="#002654" />
    <rect x="300" width="300" height="600" fill="#FFFFFF" />
    <rect x="600" width="300" height="600" fill="#ED2939" />
  </svg>
);

interface LanguageSelectorProps {
  className?: string;
  variant?: 'dark' | 'light';
  showLabel?: boolean;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  className = '',
  variant = 'dark',
  showLabel = true,
}) => {
  const { language, setLanguage, availableLanguages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const renderFlag = (code: Language, flagClass = 'w-5 h-3.5') => {
    switch (code) {
      case 'pt':
        return <FlagBrazil className={flagClass} />;
      case 'en':
        return <FlagUSA className={flagClass} />;
      case 'fr':
        return <FlagFrance className={flagClass} />;
    }
  };

  const handleSelect = (code: Language) => {
    setLanguage(code);
    setIsOpen(false);
  };

  const isDark = variant === 'dark';

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      {/* Globe trigger button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Selecionar idioma / Select language"
        className={`group flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 outline-none cursor-pointer border ${
          isDark
            ? 'bg-[#132238]/80 hover:bg-[#1A2D48] text-white border-white/10 hover:border-[#0072BC]/50 shadow-sm'
            : 'bg-white hover:bg-gray-50 text-[#0A1626] border-gray-200 hover:border-[#0072BC]/40 shadow-sm'
        } ${isOpen ? (isDark ? 'border-[#0072BC] bg-[#1A2D48] ring-2 ring-[#0072BC]/30' : 'border-[#0072BC] ring-2 ring-[#0072BC]/20') : ''}`}
      >
        <Globe
          className={`w-4 h-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12 ${
            isOpen ? 'text-[#00A3E0]' : isDark ? 'text-[#00A3E0]' : 'text-[#0072BC]'
          }`}
          strokeWidth={2.2}
        />

        {/* Current Active Flag */}
        <div className="flex items-center gap-1.5">
          {renderFlag(language, 'w-5 h-3.5')}
          {showLabel && (
            <span className="hidden sm:inline uppercase text-[11px] font-black tracking-wider">
              {language.toUpperCase()}
            </span>
          )}
        </div>

        <ChevronDown
          size={14}
          className={`transition-transform duration-200 opacity-70 ${isOpen ? 'rotate-180 text-[#00A3E0]' : ''}`}
        />
      </button>

      {/* Language Popover / Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute right-0 mt-2 w-64 sm:w-72 rounded-2xl p-2 z-[200] shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200 backdrop-blur-xl border ${
            isDark
              ? 'bg-[#0D1B2A]/95 text-white border-white/15 divide-y divide-white/5'
              : 'bg-white/95 text-[#0A1626] border-gray-200 divide-y divide-gray-100 shadow-xl'
          }`}
        >
          {/* Header title */}
          <div className="px-3 py-2 text-[10px] uppercase font-black tracking-widest text-[#00A3E0] flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Globe size={13} />
              Idioma / Language
            </span>
            <span className="text-[9px] text-gray-400 font-normal">PARAVERSO</span>
          </div>

          {/* Languages List */}
          <div className="py-1 space-y-1">
            {availableLanguages.map((option) => {
              const isSelected = option.code === language;
              return (
                <button
                  key={option.code}
                  onClick={() => handleSelect(option.code)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? isDark
                        ? 'bg-[#0072BC]/20 text-white font-bold border border-[#0072BC]/40 shadow-inner'
                        : 'bg-[#0072BC]/10 text-[#0072BC] font-bold border border-[#0072BC]/20'
                      : isDark
                      ? 'text-gray-200 hover:bg-white/10 hover:text-white'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-[#0A1626]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* SVG Flag */}
                    <div className="relative shrink-0 drop-shadow">
                      {renderFlag(option.code, 'w-7 h-5')}
                    </div>
                    <div>
                      <div className="text-xs font-bold leading-tight flex items-center gap-1.5">
                        <span>{option.countryName}</span>
                      </div>
                      <div className={`text-[11px] ${isSelected ? 'text-[#00A3E0]' : 'text-gray-400'}`}>
                        {option.langName}
                      </div>
                    </div>
                  </div>

                  {/* Active Indicator Checkmark */}
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-[#0072BC] text-white flex items-center justify-center shadow-sm shrink-0">
                      <Check size={13} strokeWidth={3} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Footer note */}
          <div className="px-3 pt-2 pb-1 text-[10px] text-gray-400 flex items-center justify-between">
            <span>SECULT-PA • Governo do Pará</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#DE292E]" />
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
