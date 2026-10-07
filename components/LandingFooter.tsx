import React from 'react';
import { Logo } from './Logo';
import { MapPin, Phone, Mail } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

type LandingView = 'home' | 'categories' | 'technology' | 'impact' | 'about' | 'partners' | 'contact' | 'help' | 'terms' | 'privacy';

interface LandingFooterProps {
  onViewChange: (view: LandingView) => void;
}

const LandingFooter: React.FC<LandingFooterProps> = ({ onViewChange }) => {
  const { t } = useLanguage();

  const handleNav = (view: LandingView) => {
    window.scrollTo(0, 0);
    onViewChange(view);
  };

  return (
    <footer className="bg-[#0A1626] text-gray-300 py-16 px-6 md:px-16 border-t border-[#0072BC]/20 text-xs relative z-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
        {/* Brand & Address Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="cursor-pointer" onClick={() => handleNav('home')}>
            <Logo inverted={true} className="h-10" />
          </div>
          <p className="text-gray-300 text-sm leading-relaxed max-w-sm pt-2">
            A Plataforma PARAVERSO é uma solução tecnológica pública de difusão cultural e imersão em Realidade Virtual 360º, desenvolvida para valorizar a identidade, o patrimônio e os saberes do Estado do Pará.
          </p>
          <div className="pt-2 space-y-2 text-gray-300">
            <div className="flex items-start gap-2.5">
              <MapPin size={16} className="text-[#DE292E] shrink-0 mt-0.5" />
              <span>Secretaria de Estado de Cultura (SECULT-PA) • Praça D. Pedro II, s/n - Cidade Velha, Belém - PA</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone size={16} className="text-[#00A3E0] shrink-0" />
              <span>(91) 4009-8700</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail size={16} className="text-[#DE292E] shrink-0" />
              <span>contato@secult.pa.gov.br</span>
            </div>
          </div>
        </div>

        {/* Menu Plataforma */}
        <div className="space-y-4">
          <h4 className="font-bold text-white uppercase tracking-widest text-xs border-b border-[#0072BC]/30 pb-2">Plataforma</h4>
          <button onClick={() => handleNav('categories')} className="block text-gray-300 hover:text-[#00A3E0] cursor-pointer transition-colors text-left">Eixos Culturais &amp; Acervo</button>
          <button onClick={() => handleNav('technology')} className="block text-gray-300 hover:text-[#00A3E0] cursor-pointer transition-colors text-left">Realidade Virtual 360°</button>
          <button onClick={() => handleNav('impact')} className="block text-gray-300 hover:text-[#00A3E0] cursor-pointer transition-colors text-left">Impacto &amp; Preservação</button>
        </div>

        {/* Menu Suporte */}
        <div className="space-y-4">
          <h4 className="font-bold text-white uppercase tracking-widest text-xs border-b border-[#0072BC]/30 pb-2">Suporte</h4>
          <button onClick={() => handleNav('help')} className="block text-gray-300 hover:text-[#00A3E0] cursor-pointer transition-colors text-left">Central de Ajuda</button>
          <button onClick={() => handleNav('terms')} className="block text-gray-300 hover:text-[#00A3E0] cursor-pointer transition-colors text-left">Termos de Uso</button>
          <button onClick={() => handleNav('privacy')} className="block text-gray-300 hover:text-[#00A3E0] cursor-pointer transition-colors text-left">Política de Privacidade</button>
        </div>

        {/* Menu Institucional */}
        <div className="space-y-4">
          <h4 className="font-bold text-white uppercase tracking-widest text-xs border-b border-[#0072BC]/30 pb-2">Institucional</h4>
          <button onClick={() => handleNav('about')} className="block text-gray-300 hover:text-[#00A3E0] cursor-pointer transition-colors text-left">Sobre o PARAVERSO</button>
          <button onClick={() => handleNav('partners')} className="block text-gray-300 hover:text-[#00A3E0] cursor-pointer transition-colors text-left">SECULT-PA &amp; Parcerias</button>
          <button onClick={() => handleNav('contact')} className="block text-gray-300 hover:text-[#00A3E0] cursor-pointer transition-colors text-left">Fale Conosco</button>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400">
        <p>Copyright © 2026 Governo do Estado do Pará • SECULT-PA. {t.rightsReserved}</p>
        <p className="text-gray-400 text-[11px]">
          PARAVERSO • Tecnologia, Cultura &amp; Memória Amazônica.
        </p>
      </div>
    </footer>
  );
};

export default LandingFooter;
