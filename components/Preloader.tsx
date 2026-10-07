import React from 'react';
import { Logo } from './Logo';

const Preloader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[999] bg-[#0A1626] flex flex-col items-center justify-center overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,114,188,0.25)_0%,transparent_70%)]" />
      
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <div className="relative mb-10 animate-logo-pulse">
          <Logo inverted={true} className="h-14 sm:h-16 md:h-20 w-auto drop-shadow-2xl" />
        </div>
        
        {/* Cinematic Progress Bar with Pará brand colors */}
        <div className="flex flex-col items-center space-y-4">
          <div className="w-64 h-[3px] bg-white/10 rounded-full overflow-hidden relative">
            <div className="h-full bg-gradient-to-r from-[#0072BC] via-[#00A3E0] to-[#DE292E] shadow-[0_0_15px_rgba(222,41,46,0.6)] animate-load-progress" />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#00A3E0] animate-pulse">
              Carregando o Paráverso...
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes logo-pulse {
          0%, 100% { transform: scale(1); opacity: 0.95; }
          50% { transform: scale(1.03); opacity: 1; }
        }
        @keyframes load-progress {
          0% { width: 0%; }
          30% { width: 45%; }
          70% { width: 80%; }
          100% { width: 100%; }
        }
        .animate-logo-pulse {
          animation: logo-pulse 2.5s ease-in-out infinite;
        }
        .animate-load-progress {
          animation: load-progress 2.5s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Preloader;
