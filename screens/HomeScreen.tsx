import React, { useState, useEffect, useRef } from 'react';
import { COURSES } from '../constants';
import { Category } from '../types';
import CourseCard from '../components/CourseCard';
import { Landmark, Sparkles, Globe, Leaf, Utensils, Briefcase, Check, Plus, Play, ArrowRight, PartyPopper, Film } from 'lucide-react';
import { Logo } from '../components/Logo';
import { useLanguage } from '../context/LanguageContext';

interface HomeScreenProps {
  onCourseClick: (id: string) => void;
  onCategoryClick: (category: Category) => void;
  myListIds?: string[];
  onToggleMyList?: (id: string) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onCourseClick, onCategoryClick, myListIds = [], onToggleMyList }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const { t } = useLanguage();

  const slides = [
    {
      id: 'cirio-de-nazare',
      title: 'CÍRIO DE NAZARÉ - FÉ & IDENTIDADE',
      subtitle: 'Patrimônio Imaterial da Humanidade',
      description: 'A maior manifestação cultural e religiosa do planeta registrada em alta definição 360º para salvaguarda da memória paraense.',
      image: 'https://urbnews.com.br/wp-content/uploads/2025/10/cirio-2024-caique-araujo_b796e2c9125ba0ecc0e1444af90db143.jpg',
      category: 'Patrimônio Imaterial'
    },
    {
      id: 'festival-de-carimbo',
      title: 'FESTIVAL DE CARIMBÓ DE MARAPANIM',
      subtitle: 'Tradição & Mestres da Cultura',
      description: 'O som dos curimbós, as saias coloridas e a força poética dos mestres da cultura popular nas praias e vilas do Pará.',
      image: 'https://load.websg.app.br/belem.com.br/image?src=https://belem.com.br/images/noticias/17027/19111055_1000154702.png&w=1200&h=675&output=jpg',
      category: 'Eventos Culturais'
    },
    {
      id: 'pararraia-2026',
      title: 'PARÁRRAIÁ - O SÃO JOÃO DA AMAZÔNIA',
      subtitle: 'Festivais & Quadrilhas Juninas',
      description: 'A maior festa junina do Norte do Brasil: espetáculos de quadrilhas, shows de tecnobrega, forró paraense e culinária típica.',
      image: 'https://cdn.dol.com.br/img/Artigo-Destaque/940000/1200x675/---2026-06-06t075520179009437800-3.jpg?fallback=https%3A%2F%2Fcdn.dol.com.br%2Fimg%2FArtigo-Destaque%2F940000%2F---2026-06-06t075520179009437800.png%3Fxid%3D3255389&xid=3255389',
      category: 'Eventos Culturais'
    },
    {
      id: 'povo-munduruku',
      title: 'CONHEÇA QUEM É O POVO MUNDURUKU',
      subtitle: 'Saberes Ancestrais do Tapajós',
      description: 'A cosmologia sagrada, a resistência histórica e a riqueza cultural dos Munduruku em registros imersivos de alta fidelidade.',
      image: 'https://www.esquerdadiario.com.br/IMG/jpg/162205115260ae895080312_1622051152_3x2_rt.jpg',
      category: 'Patrimonial e Saberes'
    },
    {
      id: 'amazonia-vr-360',
      title: 'A FLORESTA AMAZÔNICA EM REALIDADE VIRTUAL 360º',
      subtitle: 'Imersão & Biodiversidade Única',
      description: 'Sobrevoe as copas das árvores centenárias, navegue pelos igarapés intocados e conheça a biodiversidade única das Unidades de Conservação do Estado do Pará.',
      image: 'https://i.ytimg.com/vi/J2RWKouu7fs/maxresdefault.jpg',
      category: 'Meio Ambiente'
    }
  ];

  const categories = [
    { id: Category.Patrimonial, label: 'PATRIMONIAL E SABERES', icon: Landmark, color: 'from-[#0072BC]/40 to-[#004884]/80' },
    { id: Category.Eventos, label: 'EVENTOS CULTURAIS', icon: PartyPopper, color: 'from-[#DE292E]/40 to-[#0A1626]/80' },
    { id: Category.Documentarios, label: 'DOCUMENTÁRIOS', icon: Film, color: 'from-[#005CAB]/40 to-[#0A1626]/80' },
    { id: Category.MeioAmbiente, label: 'MEIO AMBIENTE', icon: Leaf, color: 'from-emerald-800/40 to-[#0072BC]/60' },
    { id: Category.Bioeconomia, label: 'BIOECONOMIA', icon: Utensils, color: 'from-amber-700/40 to-[#DE292E]/50' },
    { id: Category.Gestao, label: 'GESTÃO CULTURAL', icon: Briefcase, color: 'from-[#0A1626]/60 to-[#0072BC]/60' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      } else {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      }
    }
    touchStartX.current = null;
  };

  const CONTENT_PADDING = "px-4 sm:px-6 md:px-10";

  const SectionRow = ({ title, category }: { title: string, category: Category }) => {
    const courses = COURSES.filter(c => c.category === category);
    if (courses.length === 0) return null;

    return (
      <section className="group/section animate-in fade-in slide-in-from-bottom-4 duration-700 mb-6 md:mb-8">
        <div className={`flex items-center justify-between mb-3 ${CONTENT_PADDING}`}>
          <h2 className="text-xs sm:text-sm md:text-base font-bold text-gray-100 uppercase tracking-wide flex items-center gap-2">
            <span className="w-1.5 h-4 bg-[#DE292E] rounded-full inline-block" />
            {title}
          </h2>
          <button 
            onClick={() => onCategoryClick(category)}
            className="text-[11px] text-[#00A3E0] hover:text-white font-semibold flex items-center gap-1 transition-colors cursor-pointer"
          >
            Ver todos <ArrowRight size={12} />
          </button>
        </div>
        <div className="relative">
          <div className={`flex gap-3 md:gap-4 overflow-x-auto hide-scrollbar py-2 ${CONTENT_PADDING} scroll-smooth items-start`}>
            {courses.map(course => (
              <div key={course.id} className="w-40 sm:w-52 md:w-64 lg:w-72 flex-shrink-0">
                <CourseCard course={course} onClick={onCourseClick} />
              </div>
            ))}
            <div className="w-4 flex-shrink-0" />
          </div>
          <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-[#0A1626] to-transparent pointer-events-none hidden md:block z-20" />
        </div>
      </section>
    );
  };

  return (
    <div className="pb-24 bg-[#0A1626] min-h-screen font-sans relative text-white">
      
      {/* Mobile Top Header: Apenas Logo (Sem botão de idiomas no topo) */}
      <div className="fixed top-0 left-0 w-full z-50 px-4 py-3 flex justify-start items-center md:hidden bg-gradient-to-b from-[#0A1626] via-[#0A1626]/95 to-transparent pointer-events-none">
        <div className="pointer-events-auto">
          <Logo inverted={true} className="h-7 w-auto drop-shadow-md" />
        </div>
      </div>

      {/* Hero Banner Area */}
      <div 
        className="relative w-full h-[52vh] sm:h-[60vh] md:h-[72vh] overflow-hidden group mb-6 md:mb-8"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {slides.map((slide, index) => {
          const isInList = myListIds.includes(slide.id);

          return (
            <div
              key={`${slide.id}-${index}`}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img 
                  src={slide.image} 
                  className="w-full h-full object-cover select-none animate-ken-burns"
                  alt={slide.title}
                  draggable={false}
                  onClick={() => onCourseClick(slide.id)}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A1626] via-[#0A1626]/85 to-transparent w-[95%] md:w-3/4 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1626] via-transparent to-transparent pointer-events-none" />
              </div>
              
              {/* Text Content */}
              <div className={`absolute bottom-12 md:top-0 md:bottom-0 left-0 w-full md:w-[55%] flex flex-col justify-end md:justify-center z-20 ${CONTENT_PADDING}`}>
                <div className="animate-in slide-in-from-left-10 fade-in duration-700 delay-100 space-y-2.5 md:space-y-4">
                  
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-[#0072BC] text-white text-[10px] sm:text-xs font-black uppercase tracking-wider rounded-md shadow-sm">
                      {slide.category}
                    </span>
                    <span className="text-[10px] sm:text-xs font-bold text-gray-300 uppercase tracking-widest hidden sm:inline">
                      {slide.subtitle}
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-white leading-tight uppercase tracking-tight drop-shadow-md">
                    {slide.title}
                  </h1>

                  <p className="text-xs sm:text-sm md:text-base text-gray-300 line-clamp-2 sm:line-clamp-3 max-w-xl font-normal leading-relaxed">
                    {slide.description}
                  </p>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={() => onCourseClick(slide.id)}
                      className="px-5 sm:px-7 py-2.5 sm:py-3 bg-[#DE292E] hover:bg-[#C8191E] text-white rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-[#DE292E]/25 hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <Play size={16} fill="white" />
                      <span>{t.watchNow}</span>
                    </button>

                    {onToggleMyList && (
                      <button
                        onClick={() => onToggleMyList(slide.id)}
                        className={`px-4 sm:px-5 py-2.5 sm:py-3 border rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                          isInList
                            ? 'bg-white/20 border-white text-white'
                            : 'bg-white/5 border-white/20 hover:bg-white/10 text-white'
                        }`}
                      >
                        {isInList ? <Check size={16} /> : <Plus size={16} />}
                        <span>{isInList ? t.inMyList : t.myList}</span>
                      </button>
                    )}
                  </div>

                </div>
              </div>
            </div>
          );
        })}

        {/* Indicators */}
        <div className="absolute bottom-6 right-6 z-20 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i} 
              onClick={(e) => { e.stopPropagation(); setCurrentSlide(i); }}
              className={`h-1.5 rounded-full transition-all duration-300 shadow-sm cursor-pointer ${
                i === currentSlide ? 'w-6 sm:w-8 bg-[#DE292E]' : 'w-2 bg-gray-500 hover:bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Categories Row */}
      <div className={`mb-6 md:mb-8 relative z-20 ${CONTENT_PADDING}`}>
        <h3 className="text-xs font-bold text-gray-400 mb-2.5 uppercase tracking-wider">{t.categoriesSection}</h3>
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-2.5 sm:gap-3 md:gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button 
                key={cat.id}
                onClick={() => onCategoryClick(cat.id)}
                className={`relative h-16 sm:h-20 md:h-24 bg-gradient-to-br ${cat.color} border border-white/15 rounded-2xl hover:border-[#00A3E0] hover:scale-[1.02] transition-all duration-300 group shadow-md flex items-center justify-center overflow-hidden w-full cursor-pointer`}
              >
                <div className="z-10 flex flex-col items-center gap-1 px-1.5">
                  <Icon size={20} className="text-white group-hover:scale-110 transition-transform sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-white text-center leading-tight">{cat.label}</span>
                </div>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Rows */}
      <div className="space-y-4">
        <SectionRow title="Eventos Culturais e Festivais" category={Category.Eventos} />
        <SectionRow title="Patrimonial e Saberes Amazônicos" category={Category.Patrimonial} />
        <SectionRow title="Documentários Paraenses" category={Category.Documentarios} />
        <SectionRow title="Meio Ambiente e Clima Amazônico" category={Category.MeioAmbiente} />
        <SectionRow title="Bioeconomia e Gastronomia Paraense" category={Category.Bioeconomia} />
        <SectionRow title="Gestão Cultural & Editais PNAB" category={Category.Gestao} />
      </div>

      <style>{`
        .animate-ken-burns {
          animation: kenBurns 20s infinite alternate;
        }
        @keyframes kenBurns {
          from { transform: scale(1); }
          to { transform: scale(1.08); }
        }
      `}</style>
    </div>
  );
};

export default HomeScreen;
