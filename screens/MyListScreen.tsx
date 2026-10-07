import React, { useState, useMemo } from 'react';
import { Bookmark, Play, Trash2, ArrowRight, Sparkles, Filter, CheckCircle, Clock, BookOpen, Layers } from 'lucide-react';
import { COURSES } from '../constants';
import { Course, Category } from '../types';

interface MyListScreenProps {
  myListIds: string[];
  onToggleMyList: (courseId: string) => void;
  onCourseClick: (courseId: string) => void;
  onExplore?: () => void;
}

const MyListScreen: React.FC<MyListScreenProps> = ({
  myListIds,
  onToggleMyList,
  onCourseClick,
  onExplore,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showClearConfirm, setShowClearConfirm] = useState<boolean>(false);

  const savedCourses = useMemo(() => {
    return COURSES.filter(course => myListIds.includes(course.id));
  }, [myListIds]);

  const filteredCourses = useMemo(() => {
    if (selectedCategory === 'all') return savedCourses;
    return savedCourses.filter(course => course.category === selectedCategory);
  }, [savedCourses, selectedCategory]);

  const categoriesWithCount = useMemo(() => {
    const cats: { key: string; label: string; count: number }[] = [
      { key: 'all', label: 'Todos', count: savedCourses.length }
    ];

    Object.values(Category).forEach(cat => {
      const count = savedCourses.filter(c => c.category === cat).length;
      if (count > 0) {
        cats.push({ key: cat, label: cat, count });
      }
    });

    return cats;
  }, [savedCourses]);

  const handleClearAll = () => {
    savedCourses.forEach(c => onToggleMyList(c.id));
    setShowClearConfirm(false);
  };

  return (
    <div className="min-h-screen bg-[#0A1626] text-white px-4 sm:px-8 md:px-16 pt-10 md:pt-14 pb-28 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-white/10 pb-6 gap-4">
        <div>
          <div className="flex items-center gap-2.5 text-[#00A3E0] text-xs font-bold uppercase tracking-wider mb-2">
            <Bookmark size={18} className="fill-[#00A3E0]" />
            <span>Coleção Pessoal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
            Minha Lista
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-2xl">
            Seus festivais, documentários e saberes culturais paraenses favoritos salvos para assistir a qualquer momento.
          </p>
        </div>

        {savedCourses.length > 0 && (
          <div className="flex items-center gap-3">
            <div className="bg-[#132238] border border-white/10 rounded-xl px-4 py-2 text-right">
              <span className="text-[11px] uppercase font-bold text-gray-400 block tracking-wider">Itens Salvos</span>
              <span className="text-lg font-black text-[#00A3E0]">{savedCourses.length} produções</span>
            </div>
            {showClearConfirm ? (
              <div className="flex items-center gap-2 bg-red-950/80 border border-red-500/30 rounded-xl p-2">
                <span className="text-xs text-red-200">Limpar tudo?</span>
                <button
                  onClick={handleClearAll}
                  className="px-2.5 py-1 bg-red-600 hover:bg-red-500 text-white rounded text-xs font-bold cursor-pointer"
                >
                  Sim
                </button>
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-gray-300 rounded text-xs cursor-pointer"
                >
                  Não
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowClearConfirm(true)}
                title="Limpar todos os itens da lista"
                className="p-3 bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 rounded-xl border border-white/10 transition-colors cursor-pointer"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Empty State */}
      {savedCourses.length === 0 ? (
        <div className="max-w-xl mx-auto my-16 text-center bg-[#132238]/60 border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl">
          <div className="w-20 h-20 bg-gradient-to-br from-[#0072BC]/30 to-[#00A3E0]/10 border border-[#00A3E0]/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <Bookmark size={36} className="text-[#00A3E0]" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white mb-3">
            Sua lista está vazia
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed mb-8">
            Navegue pelas 6 categorias da plataforma e clique no botão <strong>+ Minha Lista</strong> para salvar festivais, imersões 360°, saberes tradicionais e documentários do Pará.
          </p>
          {onExplore && (
            <button
              onClick={onExplore}
              className="inline-flex items-center gap-3 px-6 py-3.5 bg-gradient-to-r from-[#0072BC] to-[#00A3E0] hover:from-[#00A3E0] hover:to-[#0072BC] text-white font-bold rounded-xl shadow-lg shadow-[#0072BC]/30 transition-all uppercase tracking-wider text-xs cursor-pointer"
            >
              <span>Explorar Acervo Paraense</span>
              <ArrowRight size={16} />
            </button>
          )}
        </div>
      ) : (
        <>
          {/* Category Filter Pills */}
          {categoriesWithCount.length > 2 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 hide-scrollbar">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 mr-2">
                <Filter size={14} /> Filtro:
              </span>
              {categoriesWithCount.map(cat => (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide uppercase transition-all whitespace-nowrap cursor-pointer border ${
                    selectedCategory === cat.key
                      ? 'bg-[#0072BC] text-white border-[#0072BC] shadow-lg shadow-[#0072BC]/20'
                      : 'bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 border-white/10'
                  }`}
                >
                  {cat.label} ({cat.count})
                </button>
              ))}
            </div>
          )}

          {/* Grid of Saved Courses */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map(course => (
              <div
                key={course.id}
                className="group relative bg-[#132238] rounded-2xl overflow-hidden border border-white/10 hover:border-[#0072BC]/50 transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1 flex flex-col"
              >
                {/* Image & Badges */}
                <div 
                  className="relative aspect-video w-full overflow-hidden cursor-pointer"
                  onClick={() => onCourseClick(course.id)}
                >
                  <img
                    src={course.heroImage || course.thumbnail}
                    alt={course.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=800&auto=format&fit=crop';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1626] via-transparent to-transparent opacity-80" />
                  
                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 bg-[#0A1626]/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider text-[#00A3E0] border border-white/10">
                    {course.category}
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleMyList(course.id);
                    }}
                    title="Remover da lista"
                    className="absolute top-3 right-3 p-2 bg-black/60 hover:bg-red-600/90 text-white rounded-lg backdrop-blur-md border border-white/10 transition-colors cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </button>

                  {/* Quick Play Overlay Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                    <div className="w-12 h-12 rounded-full bg-[#0072BC] text-white flex items-center justify-center shadow-lg shadow-black/50 transform group-hover:scale-110 transition-transform">
                      <Play size={20} className="fill-white ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 
                      onClick={() => onCourseClick(course.id)}
                      className="text-base font-bold text-white group-hover:text-[#00A3E0] transition-colors line-clamp-1 cursor-pointer"
                    >
                      {course.title}
                    </h3>
                    <p className="text-xs text-gray-400 line-clamp-2 mt-1.5 leading-relaxed">
                      {course.description}
                    </p>
                  </div>

                  {/* Metadata & Actions */}
                  <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-[11px] text-gray-400">
                      <span className="flex items-center gap-1 font-medium">
                        <Clock size={12} className="text-[#00A3E0]" />
                        {course.duration}
                      </span>
                      {course.modulesCount && (
                        <span className="flex items-center gap-1 font-medium">
                          <Layers size={12} className="text-amber-400" />
                          {course.modulesCount} {course.modulesCount > 1 ? 'módulos' : 'módulo'}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => onCourseClick(course.id)}
                      className="text-xs font-bold text-[#00A3E0] hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>Acessar</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyListScreen;
