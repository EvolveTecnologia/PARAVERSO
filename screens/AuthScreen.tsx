import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, ArrowLeft, Phone, FileText, Shield, Check, Home, AlertCircle, Sparkles, Smartphone, Download } from 'lucide-react';
import { Logo } from '../components/Logo';
import { usePWAInstall } from '../components/usePWAInstall';
import { PWAInstallModal } from '../components/PWAInstallModal';
import { useLanguage } from '../context/LanguageContext';
import LanguageSelector from '../components/LanguageSelector';

interface AuthScreenProps {
  onLogin: () => void;
  onBack?: () => void;
}

type AuthMode = 'login' | 'register' | 'forgot' | 'terms' | 'privacy';

const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin, onBack }) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);
  const pwa = usePWAInstall();
  const { t } = useLanguage();
  
  // Login State
  const [loginEmail, setLoginEmail] = useState('cidadao@paraverso.pa.gov.br');
  const [loginPassword, setLoginPassword] = useState('@123456@');
  const [loginError, setLoginError] = useState('');

  // Register State
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    phone: '',
    idNumber: '',
    password: ''
  });
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleInstallClick = async () => {
    if (pwa.deferredPrompt || pwa.isInstallable) {
      try {
        const res = await pwa.install('android');
        if (res.success || res.mode === 'native-prompt' || res.mode === 'already-installed') {
          return;
        }
      } catch (e) {
        console.warn('Native prompt error:', e);
      }
      setIsInstallModalOpen(true);
    } else {
      setIsInstallModalOpen(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Register Logic
    if (mode === 'register') {
      if (!termsAccepted) return;
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        onLogin();
      }, 1000);
      return;
    }

    // Login Logic
    if (mode === 'login') {
      if (
        (loginEmail === 'cidadao@paraverso.pa.gov.br' && loginPassword === '@123456@') ||
        (loginEmail.includes('@') && loginPassword.length >= 4)
      ) {
        setLoginError('');
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          onLogin();
        }, 1000);
      } else {
        setLoginError('E-mail ou senha incorretos (use as credenciais de demonstração).');
        setIsLoading(false);
      }
    }
  };

  const fillDemoCredentials = () => {
    setLoginEmail('cidadao@paraverso.pa.gov.br');
    setLoginPassword('@123456@');
    setLoginError('');
  };

  const renderLogin = () => (
    <div className="w-full space-y-4 animate-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-1">
        <h1 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight leading-none">Acessar sua Conta</h1>
        <p className="text-[11px] text-gray-300">Portal Oficial SECULT-PA • Governo do Pará</p>
      </div>

      {loginError && (
        <div className="bg-red-500/15 border border-red-500/30 rounded-xl p-3 flex items-center gap-2 animate-in fade-in">
          <AlertCircle size={16} className="text-red-400 shrink-0" />
          <p className="text-[11px] font-semibold text-red-300">{loginError}</p>
        </div>
      )}

      {/* Demo Credentials Helper Pill */}
      <button 
        type="button"
        onClick={fillDemoCredentials}
        className="w-full py-2 px-3 bg-[#0072BC]/20 hover:bg-[#0072BC]/30 border border-[#0072BC]/40 rounded-xl flex items-center justify-between text-left text-[11px] text-[#00A3E0] transition-colors cursor-pointer"
      >
        <span className="flex items-center gap-1.5 font-bold">
          <Sparkles size={13} className="text-[#DE292E]" />
          Acesso Demonstração (clique para preencher)
        </span>
        <span className="text-gray-300 font-mono text-[10px]">cidadao@paraverso.pa.gov.br</span>
      </button>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">{t.emailLabel}</label>
          <div className="relative flex items-center">
            <Mail className="absolute left-3.5 text-gray-400" size={16} />
            <input 
              type="email" 
              required
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              placeholder="seu.email@exemplo.com"
              className="w-full bg-[#0A1626]/80 border border-white/15 rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#0072BC]"
            />
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <label className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">{t.passwordLabel}</label>
            <button 
              type="button" 
              onClick={() => setMode('forgot')}
              className="text-[10px] text-[#00A3E0] hover:underline"
            >
              {t.forgotPassword}
            </button>
          </div>
          <div className="relative flex items-center">
            <Lock className="absolute left-3.5 text-gray-400" size={16} />
            <input 
              type={showPassword ? 'text' : 'password'} 
              required
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#0A1626]/80 border border-white/15 rounded-xl py-3 pl-10 pr-10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#0072BC]"
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 text-gray-400 hover:text-white"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-[#DE292E] hover:bg-[#C8191E] text-white font-bold py-3.5 rounded-xl uppercase tracking-widest text-xs transition-all shadow-md hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 cursor-pointer mt-2"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            'Entrar na Plataforma'
          )}
        </button>
      </form>

      <div className="text-center pt-2">
        <p className="text-[11px] text-gray-400">
          Primeiro acesso?{' '}
          <button 
            type="button" 
            onClick={() => setMode('register')}
            className="text-[#00A3E0] font-bold hover:underline cursor-pointer"
          >
            Cadastre-se gratuitamente
          </button>
        </p>
      </div>
    </div>
  );

  const renderRegister = () => (
    <div className="w-full space-y-4 animate-in slide-in-from-right-4 duration-500">
      <div className="text-center space-y-1">
        <h1 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight leading-none">Criar Acesso</h1>
        <p className="text-[11px] text-gray-300">Faça parte do ecossistema cultural do Pará</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">{t.fullNameLabel}</label>
          <div className="relative flex items-center">
            <User className="absolute left-3.5 text-gray-400" size={16} />
            <input 
              type="text" 
              required
              value={registerData.name}
              onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
              placeholder="Ex : Maria de Nazaré Santos"
              className="w-full bg-[#0A1626]/80 border border-white/15 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#0072BC]"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">{t.emailLabel}</label>
          <div className="relative flex items-center">
            <Mail className="absolute left-3.5 text-gray-400" size={16} />
            <input 
              type="email" 
              required
              value={registerData.email}
              onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
              placeholder="seu.email@exemplo.com"
              className="w-full bg-[#0A1626]/80 border border-white/15 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#0072BC]"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">{t.phoneLabel}</label>
          <div className="relative flex items-center">
            <Phone className="absolute left-3.5 text-gray-400" size={16} />
            <input 
              type="tel" 
              required
              value={registerData.phone}
              onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
              placeholder="(91) 99999-9999"
              className="w-full bg-[#0A1626]/80 border border-white/15 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#0072BC]"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">{t.passwordLabel}</label>
          <div className="relative flex items-center">
            <Lock className="absolute left-3.5 text-gray-400" size={16} />
            <input 
              type="password" 
              required
              value={registerData.password}
              onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
              placeholder="••••••••"
              className="w-full bg-[#0A1626]/80 border border-white/15 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#0072BC]"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <input 
            type="checkbox" 
            id="terms" 
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="w-4 h-4 rounded border-gray-400 text-[#0072BC] focus:ring-[#0072BC]"
          />
          <label htmlFor="terms" className="text-[10px] text-gray-300 leading-tight">
            Li e concordo com os{' '}
            <button type="button" onClick={() => setMode('terms')} className="text-[#00A3E0] underline">Termos de Uso</button>
            {' '}e{' '}
            <button type="button" onClick={() => setMode('privacy')} className="text-[#00A3E0] underline">Privacidade</button>
          </label>
        </div>

        <button 
          type="submit" 
          disabled={!termsAccepted || isLoading}
          className="w-full bg-[#DE292E] disabled:bg-gray-600 hover:bg-[#C8191E] text-white font-bold py-3 rounded-xl uppercase tracking-widest text-xs transition-all shadow-md cursor-pointer mt-2"
        >
          {isLoading ? 'Cadastrando...' : 'Finalizar Cadastro'}
        </button>
      </form>

      <div className="text-center pt-1">
        <button 
          type="button" 
          onClick={() => setMode('login')}
          className="text-[11px] text-[#00A3E0] hover:underline"
        >
          Já possui conta? Fazer login
        </button>
      </div>
    </div>
  );

  const renderForgot = () => (
    <div className="w-full space-y-4 animate-in slide-in-from-left-4 duration-500">
      <div className="text-center space-y-1">
        <h1 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight leading-none">Recuperar Senha</h1>
        <p className="text-[11px] text-gray-300">Informe seu e-mail para receber as instruções</p>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); alert('Instruções enviadas para seu e-mail!'); setMode('login'); }} className="space-y-4">
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">{t.emailLabel}</label>
          <div className="relative flex items-center">
            <Mail className="absolute left-3.5 text-gray-400" size={16} />
            <input 
              type="email" 
              required
              placeholder="seu.email@exemplo.com"
              className="w-full bg-[#0A1626]/80 border border-white/15 rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#0072BC]"
            />
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full bg-[#0072BC] hover:bg-[#005CAB] text-white font-bold py-3 rounded-xl uppercase tracking-widest text-xs transition-all cursor-pointer"
        >
          Enviar Instruções
        </button>
      </form>

      <div className="text-center pt-2">
        <button 
          type="button" 
          onClick={() => setMode('login')}
          className="text-[11px] text-gray-300 hover:text-white cursor-pointer"
        >
          ← Voltar ao login
        </button>
      </div>
    </div>
  );

  const renderTerms = () => (
    <div className="h-full flex flex-col justify-between text-xs space-y-4 text-gray-300">
      <h2 className="text-base font-bold text-white uppercase border-b border-white/10 pb-2">Termos de Uso • SECULT-PA</h2>
      <div className="flex-1 overflow-y-auto space-y-3 pr-2 text-justify">
        <p>A utilização da plataforma PARAVERSO rege-se pelas diretrizes de preservação e difusão do patrimônio cultural e imaterial do Estado do Pará.</p>
        <p>Os conteúdos são para usufruto educacional, cultural e informativo. É proibida a reprodução comercial não autorizada.</p>
      </div>
      <button 
        type="button" 
        onClick={() => setMode('register')} 
        className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl cursor-pointer"
      >
        Fechar e retornar
      </button>
    </div>
  );

  const renderPrivacy = () => (
    <div className="h-full flex flex-col justify-between text-xs space-y-4 text-gray-300">
      <h2 className="text-base font-bold text-white uppercase border-b border-white/10 pb-2">Política de Privacidade</h2>
      <div className="flex-1 overflow-y-auto space-y-3 pr-2 text-justify">
        <p>A Secretaria de Estado de Cultura do Pará assegura a proteção rigorosa dos dados cadastrais dos usuários em consonância com a LGPD (Lei Geral de Proteção de Dados).</p>
      </div>
      <button 
        type="button" 
        onClick={() => setMode('register')} 
        className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl cursor-pointer"
      >
        Fechar e retornar
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0A1626] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,114,188,0.25)_0%,transparent_60%)] pointer-events-none" />

      {/* Top Header: Back Button & Language Selector */}
      <div className="absolute top-6 left-6 right-6 z-50 flex items-center justify-between pointer-events-auto">
        {onBack ? (
          <button 
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 rounded-full text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
          >
            <Home size={14} /> Início
          </button>
        ) : <div />}

        <LanguageSelector variant="dark" />
      </div>

      {/* Main Container */}
      <div className="w-full max-w-[420px] space-y-6 relative z-10 flex flex-col items-center px-4 pt-12 sm:pt-0">
        {mode !== 'terms' && mode !== 'privacy' && (
          <div className="flex justify-center mb-1 animate-in fade-in duration-300">
            <Logo inverted={true} className="h-10 sm:h-12 w-auto" />
          </div>
        )}

        {/* Card */}
        <div className={`w-full bg-[#132238]/90 backdrop-blur-xl border border-[#0072BC]/25 p-6 rounded-3xl shadow-2xl transition-all duration-500 ${mode === 'terms' || mode === 'privacy' ? 'h-[60vh]' : ''}`}>
          {mode === 'login' && renderLogin()}
          {mode === 'register' && renderRegister()}
          {mode === 'forgot' && renderForgot()}
          {mode === 'terms' && renderTerms()}
          {mode === 'privacy' && renderPrivacy()}
        </div>

        {mode !== 'terms' && mode !== 'privacy' && (
          <div className="text-center pt-1">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Governo do Estado do Pará • SECULT-PA
            </p>
          </div>
        )}
      </div>

      {/* Modal PWA */}
      <PWAInstallModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
        isInstallable={pwa.isInstallable}
        isInstalled={pwa.isInstalled}
        isIOS={pwa.isIOS}
        isAndroid={pwa.isAndroid}
        onInstall={pwa.install}
      />
    </div>
  );
};

export default AuthScreen;
