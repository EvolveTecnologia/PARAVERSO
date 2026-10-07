import React, { useState, useEffect, useRef } from 'react';
import { Play, Sparkles, Shield, Cpu, Zap, Award, Globe, Users, ChevronDown, ArrowRight, CheckCircle, Smartphone, Monitor, Tv, Briefcase, GraduationCap, Leaf, Utensils, HelpCircle, Landmark, PartyPopper, Film } from 'lucide-react';
import { Logo } from '../components/Logo';
import { COURSES } from '../constants';
import { Category } from '../types';
import CourseCard from '../components/CourseCard';
import { useLanguage } from '../context/LanguageContext';
import LanguageSelector from '../components/LanguageSelector';
import LandingFooter from '../components/LandingFooter';

// Subpages for rich navigation
import CategoriesPage from './landing/CategoriesPage';
import TechnologyPage from './landing/TechnologyPage';
import ImpactPage from './landing/ImpactPage';
import AboutPage from './landing/AboutPage';
import PartnersPage from './landing/PartnersPage';
import ContactPage from './landing/ContactPage';
import HelpCenterPage from './landing/HelpCenterPage';
import TermsPage from './landing/TermsPage';
import PrivacyPage from './landing/PrivacyPage';

interface LandingPageProps {
  onEnter: () => void;
}

type LandingView = 'home' | 'categories' | 'technology' | 'impact' | 'about' | 'partners' | 'contact' | 'help' | 'terms' | 'privacy';

const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  const [currentView, setCurrentView] = useState<LandingView>('home');
  const [scrolled, setScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const sliderIntervalRef = useRef<number | null>(null);
  const { t } = useLanguage();

  // Scroll to top whenever currentView changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [currentView]);

  // --- SLIDES DATA (Hero Section) ---
  const slides = [
    {
      id: 1,
      image: 'https://urbnews.com.br/wp-content/uploads/2025/10/cirio-2024-caique-araujo_b796e2c9125ba0ecc0e1444af90db143.jpg',
      title: 'CÍRIO DE NAZARÉ, FESTIVAIS & PATRIMÔNIO',
      description: 'Viva de perto as maiores manifestações do Pará em Realidade Virtual 360°, com alta fidelidade para salvaguarda da memória e difusão cultural.',
      category: 'Patrimônio Imaterial'
    },
    {
      id: 2,
      image: 'https://load.websg.app.br/belem.com.br/image?src=https://belem.com.br/images/noticias/17027/19111055_1000154702.png&w=1200&h=675&output=jpg',
      title: 'FESTIVAIS CULTURAIS DO PARÁ',
      description: 'Festival de Carimbó, Parárraiá, Sairé em Alter do Chão e Marujada de Bragança: os ritmos e cores que movimentam a economia criativa.',
      category: 'Eventos & Tradição'
    },
    {
      id: 3,
      image: 'https://www.esquerdadiario.com.br/IMG/jpg/162205115260ae895080312_1622051152_3x2_rt.jpg',
      title: 'PATRIMONIAL & SABERES AMAZÔNICOS',
      description: 'Conheça o Povo Munduruku, o Arquipélago do Marajó, Santarém e os Jogos Indígenas: a rica cosmologia dos povos da floresta.',
      category: 'Amazônia Viva'
    }
  ];

  // --- CATEGORIES DATA (6 Items Exatos) ---
  const brandCategories = [
    { id: Category.Patrimonial, label: 'PATRIMONIAL E SABERES', icon: Landmark, grad: 'from-[#0072BC] to-[#004884]' },
    { id: Category.Eventos, label: 'EVENTOS CULTURAIS', icon: PartyPopper, grad: 'from-[#DE292E] to-[#0A1626]' },
    { id: Category.Documentarios, label: 'DOCUMENTÁRIOS', icon: Film, grad: 'from-[#005CAB] to-[#0A1626]' },
    { id: Category.MeioAmbiente, label: 'MEIO AMBIENTE', icon: Leaf, grad: 'from-emerald-800 to-[#0072BC]' },
    { id: Category.Bioeconomia, label: 'BIOECONOMIA', icon: Utensils, grad: 'from-amber-700 to-[#DE292E]' },
    { id: Category.Gestao, label: 'GESTÃO CULTURAL', icon: Briefcase, grad: 'from-[#0A1626] to-[#0072BC]' },
  ];

  // --- SCROLL EFFECT ---
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- SLIDER LOGIC ---
  const startSlider = () => {
    if (sliderIntervalRef.current) clearInterval(sliderIntervalRef.current);
    sliderIntervalRef.current = window.setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 6000);
  };

  useEffect(() => {
    if (currentView === 'home') {
      startSlider();
    }
    return () => {
      if (sliderIntervalRef.current) clearInterval(sliderIntervalRef.current);
    };
  }, [currentView]);

  const handleManualSlide = (index: number) => {
    setCurrentSlide(index);
    startSlider(); 
  };

  // --- ROUTING LOGIC ---
  if (currentView === 'categories') return <CategoriesPage onBack={() => setCurrentView('home')} onViewChange={setCurrentView} />;
  if (currentView === 'technology') return <TechnologyPage onBack={() => setCurrentView('home')} onViewChange={setCurrentView} />;
  if (currentView === 'impact') return <ImpactPage onBack={() => setCurrentView('home')} onViewChange={setCurrentView} />;
  if (currentView === 'about') return <AboutPage onBack={() => setCurrentView('home')} onViewChange={setCurrentView} />;
  if (currentView === 'partners') return <PartnersPage onBack={() => setCurrentView('home')} onViewChange={setCurrentView} />;
  if (currentView === 'contact') return <ContactPage onBack={() => setCurrentView('home')} onViewChange={setCurrentView} />;
  if (currentView === 'help') return <HelpCenterPage onBack={() => setCurrentView('home')} onViewChange={setCurrentView} />;
  if (currentView === 'terms') return <TermsPage onBack={() => setCurrentView('home')} onViewChange={setCurrentView} />;
  if (currentView === 'privacy') return <PrivacyPage onBack={() => setCurrentView('home')} onViewChange={setCurrentView} />;

  // --- CONTENT FILTERING ---
  const techCourses = COURSES.filter(c => c.category === Category.Eventos).slice(0, 4);
  const patrimonialCourses = COURSES.filter(c => c.category === Category.Patrimonial).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#0A1626] font-sans text-white overflow-x-hidden animate-in fade-in duration-500">
      
      {/* --- NAVBAR --- */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 md:px-12 py-3 flex justify-between items-center ${scrolled ? 'bg-[#0A1626]/95 backdrop-blur-md shadow-lg border-b border-[#0072BC]/20' : 'bg-gradient-to-b from-[#0A1626]/90 to-transparent'}`}>
        <div className="flex-shrink-0 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <Logo inverted={true} className="h-8 sm:h-10 md:h-11" />
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <LanguageSelector variant="dark" />

          <button 
            onClick={onEnter}
            className="px-4 sm:px-6 py-2 sm:py-2.5 bg-[#DE292E] hover:bg-[#C8191E] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer"
          >
            {t.signIn}
          </button>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative h-[85vh] w-full overflow-hidden group">
        {slides.map((slide, index) => (
          <div 
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            <img 
              src={slide.image} 
              alt={slide.title} 
              className="w-full h-full object-cover animate-ken-burns" 
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1920&auto=format&fit=crop';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A1626] via-[#0A1626]/75 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1626] via-transparent to-transparent" />
            
            <div className="absolute top-0 left-0 h-full flex flex-col justify-center px-5 sm:px-8 md:px-14 max-w-2xl pt-16 md:pt-12">
              <div className="inline-flex items-center gap-2 mb-2 animate-in slide-in-from-left-4 fade-in duration-700 delay-100">
                <span className="w-2 h-2 rounded-full bg-[#DE292E] animate-pulse" />
                <span className="text-[#00A3E0] font-bold tracking-widest uppercase text-[10px] md:text-xs">
                  {slide.category}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase leading-tight mb-3 drop-shadow-xl animate-in slide-in-from-left-4 fade-in duration-700 delay-200 tracking-tight">
                {slide.title}
              </h1>
              <p className="text-gray-200 text-xs md:text-sm lg:text-base mb-6 leading-relaxed line-clamp-3 md:line-clamp-none animate-in slide-in-from-left-4 fade-in duration-700 delay-300 max-w-xl">
                {slide.description}
              </p>
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 animate-in slide-in-from-bottom-4 fade-in duration-700 delay-500">
                <button 
                  onClick={onEnter}
                  className="bg-[#DE292E] hover:bg-[#C8191E] text-white px-5 sm:px-6 py-3 rounded-xl font-extrabold uppercase tracking-wider text-xs transition-all transform hover:scale-[1.03] active:scale-95 shadow-lg shadow-[#DE292E]/30 cursor-pointer w-full sm:w-auto text-center"
                >
                  {t.watchNow}
                </button>
                <button 
                  onClick={() => setCurrentView('about')}
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 sm:px-5 py-3 rounded-xl font-bold uppercase tracking-wider text-xs transition-all cursor-pointer w-full sm:w-auto text-center"
                >
                  Sobre o PARAVERSO
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {/* Indicators */}
        <div className="absolute bottom-20 right-6 md:right-16 z-20 flex gap-3">
          {slides.map((_, i) => (
            <button 
              key={i}
              onClick={() => handleManualSlide(i)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${i === currentSlide ? 'w-8 bg-[#DE292E]' : 'w-4 bg-gray-500 hover:bg-gray-300'}`}
            />
          ))}
        </div>
      </section>

      {/* --- BRAND HUBS (6 Categories) --- */}
      <section className="px-5 sm:px-8 md:px-14 -mt-10 md:-mt-12 relative z-20 mb-12 md:mb-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {brandCategories.map((hub, idx) => {
            const Icon = hub.icon;
            return (
              <div 
                key={idx} 
                onClick={() => onEnter()} 
                className={`h-20 sm:h-24 md:h-28 rounded-2xl bg-gradient-to-br ${hub.grad} border border-white/15 flex flex-col items-center justify-center gap-1.5 md:gap-2 shadow-lg hover:scale-[1.03] transition-transform cursor-pointer group relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Icon size={22} className="text-white drop-shadow-md group-hover:scale-110 transition-transform" />
                <span className="font-bold text-[11px] sm:text-xs tracking-wide uppercase text-center px-2 leading-tight">{hub.label}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* --- CONTENT PREVIEW --- */}
      <div className="space-y-14 pb-20">
        <section className="px-6 md:px-16">
          <div className="flex items-end justify-between mb-6 border-b border-white/10 pb-3">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">Eventos Culturais e Festivais</h2>
              <p className="text-xs text-gray-400 mt-1">Festival de Carimbó, Parárraiá, Festival do Sairé e Marujada em alta definição 360°</p>
            </div>
            <button onClick={onEnter} className="text-xs font-bold text-[#00A3E0] hover:text-white uppercase tracking-wider cursor-pointer">
              Ver Acervo Completo →
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techCourses.map(course => (
              <div key={course.id} onClick={onEnter} className="cursor-pointer transform hover:scale-[1.02] transition-all">
                <CourseCard course={course} onClick={onEnter} />
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 md:px-16">
          <div className="flex items-end justify-between mb-6 border-b border-white/10 pb-3">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">Patrimonial e Saberes Amazônicos</h2>
              <p className="text-xs text-gray-400 mt-1">Conheça quem é o Povo Munduruku, o Marajó, Santarém e os Jogos Indígenas do Pará</p>
            </div>
            <button onClick={onEnter} className="text-xs font-bold text-[#00A3E0] hover:text-white uppercase tracking-wider cursor-pointer">
              Ver Acervo Completo →
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {patrimonialCourses.map(course => (
              <div key={course.id} onClick={onEnter} className="cursor-pointer transform hover:scale-[1.02] transition-all">
                <CourseCard course={course} onClick={onEnter} />
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* --- DEVICES SECTION --- */}
      <section className="py-24 px-6 md:px-16 bg-gradient-to-b from-[#0A1626] to-[#005CAB]/25 border-y border-white/10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 max-w-7xl mx-auto">
          <div className="md:w-1/2 space-y-6 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#0072BC]/20 border border-[#0072BC]/30 rounded-full text-xs font-bold text-[#00A3E0] uppercase tracking-wider">
              <span>Experiência Multi-Dispositivo</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black leading-tight">Acesse a cultura paraense onde e quando quiser.</h2>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
              No smartphone, tablet, computador, óculos de Realidade Virtual ou Smart TV. O PARAVERSO foi concebido com streaming adaptativo para democratizar o acesso à cultura em todo o Pará e no mundo.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-6">
              <div className="flex flex-col items-center gap-3 text-gray-300">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Tv size={32} className="text-[#00A3E0]" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider">Smart TV</span>
              </div>
              <div className="flex flex-col items-center gap-3 text-gray-300">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Monitor size={32} className="text-[#00A3E0]" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider">Computador</span>
              </div>
              <div className="flex flex-col items-center gap-3 text-gray-300">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Smartphone size={32} className="text-[#00A3E0]" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider">Smartphone</span>
              </div>
              <div className="flex flex-col items-center gap-3 text-gray-300">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Cpu size={32} className="text-[#00A3E0]" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider">Óculos VR</span>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="w-64 sm:w-80 md:w-96 aspect-[9/16] bg-[#0F1E36] rounded-[40px] border-4 border-[#0072BC]/40 shadow-2xl overflow-hidden p-3 relative">
                <img 
                  src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop" 
                  alt="App PARAVERSO" 
                  className="w-full h-full object-cover rounded-[32px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1626] via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-center">
                  <span className="px-3 py-1 bg-[#DE292E] text-white text-[10px] font-black uppercase tracking-wider rounded-md">360° VR Imersivo</span>
                  <p className="font-bold text-sm mt-2 text-white">PARAVERSO Mobile</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <LandingFooter onViewChange={setCurrentView} />
    </div>
  );
};

export default LandingPage;
