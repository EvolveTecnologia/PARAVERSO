import React, { useState } from 'react';
import { 
  X, Smartphone, Apple, Chrome, Share2, PlusSquare, 
  CheckCircle, ArrowRight, ShieldCheck, Download, 
  ExternalLink, Sparkles, Monitor
} from 'lucide-react';
import { Logo } from './Logo';

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  isInstallable: boolean;
  isInstalled: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  onInstall: (platform?: 'android' | 'ios' | 'desktop') => Promise<{ success: boolean; mode: string }>;
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({
  isOpen,
  onClose,
  isInstallable,
  isInstalled,
  isIOS,
  isAndroid,
  onInstall,
}) => {
  const [selectedPlatform, setSelectedPlatform] = useState<'android' | 'ios' | 'desktop'>(() => {
    if (isIOS) return 'ios';
    if (isAndroid) return 'android';
    return 'desktop';
  });

  const [installSuccess, setInstallSuccess] = useState(false);
  const [isTriggering, setIsTriggering] = useState(false);
  const [showIOSShareGuide, setShowIOSShareGuide] = useState(false);

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    setIsTriggering(true);
    try {
      const res = await onInstall(selectedPlatform);
      setIsTriggering(false);

      if (res.success || res.mode === 'already-installed') {
        setInstallSuccess(true);
        setTimeout(() => {
          onClose();
        }, 2000);
      } else if (res.mode === 'ios-safari' || selectedPlatform === 'ios') {
        setShowIOSShareGuide(true);
      }
    } catch (e) {
      setIsTriggering(false);
      if (selectedPlatform === 'ios') {
        setShowIOSShareGuide(true);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto hide-scrollbar">
      <div 
        className="w-full max-w-lg bg-[#0A1626] border border-[#0072BC]/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-white my-auto animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pwa-modal-title"
      >
        {/* Header Bar */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#132238] to-[#0A1626] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-1.5 shadow-md shrink-0">
              <Logo variant="icon-only" className="w-full h-full" />
            </div>
            <div>
              <h2 id="pwa-modal-title" className="text-xs sm:text-sm font-black tracking-wide text-white uppercase flex items-center gap-2">
                Instalar Aplicativo PWA
              </h2>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[9px] bg-[#DE292E] text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  Mobile &amp; Tablet
                </span>
                <span className="text-[10px] text-gray-300">PARAVERSO</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-300 hover:text-white transition-colors cursor-pointer shrink-0"
            aria-label="Fechar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 overflow-y-auto hide-scrollbar space-y-4 max-h-[75vh]">
          {isInstalled ? (
            <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center gap-3 text-emerald-300">
              <CheckCircle size={24} className="shrink-0 text-emerald-400" />
              <div>
                <p className="text-xs font-bold">Aplicativo já instalado!</p>
                <p className="text-[11px] text-emerald-300/80 mt-0.5">
                  Você já possui o acesso em tela cheia na sua tela de início.
                </p>
              </div>
            </div>
          ) : installSuccess ? (
            <div className="p-5 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-center space-y-2 animate-in zoom-in-95">
              <CheckCircle size={32} className="mx-auto text-emerald-400" />
              <p className="text-sm font-bold text-emerald-300">Instalação confirmada!</p>
              <p className="text-xs text-gray-300">O aplicativo PARAVERSO foi configurado no seu dispositivo.</p>
            </div>
          ) : (
            <>
              {/* Platform Selector Tabs */}
              <div className="flex bg-[#132238] p-1 rounded-2xl border border-white/10">
                <button
                  type="button"
                  onClick={() => { setSelectedPlatform('android'); setShowIOSShareGuide(false); }}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    selectedPlatform === 'android' ? 'bg-[#0072BC] text-white shadow-md' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Chrome size={15} />
                  <span>Android</span>
                </button>
                <button
                  type="button"
                  onClick={() => { setSelectedPlatform('ios'); setShowIOSShareGuide(true); }}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    selectedPlatform === 'ios' ? 'bg-[#0072BC] text-white shadow-md' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Apple size={15} />
                  <span>iPhone / iPad</span>
                </button>
                <button
                  type="button"
                  onClick={() => { setSelectedPlatform('desktop'); setShowIOSShareGuide(false); }}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    selectedPlatform === 'desktop' ? 'bg-[#0072BC] text-white shadow-md' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Monitor size={15} />
                  <span>Computador</span>
                </button>
              </div>

              {/* Instructions per platform */}
              {selectedPlatform === 'ios' ? (
                <div className="bg-[#132238]/60 border border-white/10 rounded-2xl p-4 space-y-3">
                  <h4 className="text-xs font-black uppercase text-[#00A3E0] flex items-center gap-2">
                    <Apple size={16} /> Como instalar no Safari (iOS) :
                  </h4>
                  <ol className="text-xs text-gray-300 space-y-2.5 list-none">
                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#0072BC] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">1</span>
                      <span>Toque no botão <strong>Compartilhar</strong> (<Share2 size={13} className="inline text-[#00A3E0]" />) na barra inferior do Safari.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#0072BC] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">2</span>
                      <span>Role o menu e toque em <strong>"Adicionar à Tela de Início"</strong> (<PlusSquare size={13} className="inline text-[#DE292E]" />).</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#0072BC] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">3</span>
                      <span>Confirme em <strong>"Adicionar"</strong> no canto superior direito.</span>
                    </li>
                  </ol>
                </div>
              ) : (
                <div className="bg-[#132238]/60 border border-white/10 rounded-2xl p-4 space-y-3">
                  <h4 className="text-xs font-black uppercase text-[#00A3E0] flex items-center gap-2">
                    <Chrome size={16} /> Instalação com 1 Clique (Chrome / Edge) :
                  </h4>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Instale o PARAVERSO diretamente como aplicativo nativo no seu dispositivo. Desfrute de reprodução offline e tela cheia.
                  </p>
                  <button
                    onClick={handleInstallClick}
                    disabled={isTriggering}
                    className="w-full py-3 bg-[#DE292E] hover:bg-[#C8191E] text-white font-bold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                  >
                    <Download size={16} />
                    <span>Instalar Aplicativo Agora</span>
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#0A1626] border-t border-white/10 flex items-center justify-between text-[11px] text-gray-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span>Oficial • SECULT-PA • Governo do Pará</span>
          </div>
          <button
            onClick={onClose}
            className="text-xs text-gray-300 hover:text-white uppercase font-bold cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PWAInstallModal;
