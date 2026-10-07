import React, { useState, useEffect } from 'react';
import { Course, Lesson, Material } from '../types';
import { Play, Download, Star, ChevronLeft, CheckCircle, FileText, AlertCircle, RotateCcw, Check, ChevronDown, ChevronUp, Plus } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface CourseDetailsProps {
  course: Course;
  downloadedIds: string[];
  myListIds?: string[];
  onBack: () => void;
  onLessonClick: (lesson: Lesson) => void;
  onMaterialClick?: (material: Material) => void;
  onRemoveDownload?: (id: string) => void;
  onToggleMyList?: (id: string) => void;
}

const CourseDetails: React.FC<CourseDetailsProps> = ({ 
  course, 
  downloadedIds, 
  myListIds = [], 
  onBack, 
  onLessonClick, 
  onMaterialClick, 
  onRemoveDownload, 
  onToggleMyList 
}) => {
  const [activeTab, setActiveTab] = useState<'lecons' | 'supports' | 'activites' | 'tuteur'>('lecons');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [lessonProgress, setLessonProgress] = useState<Record<string, number>>({});
  const [expandedModules, setExpandedModules] = useState<Record<number, boolean>>({ 0: true });
  const { t } = useLanguage();

  const isInList = myListIds.includes(course.id);

  useEffect(() => {
    const progress: Record<string, number> = {};
    course.modules?.forEach(m => {
      m.lessons.forEach(l => {
        const saved = localStorage.getItem(`paraverso_progress_${l.id}`) || localStorage.getItem(`cerclehub_progress_${l.id}`);
        if (saved) progress[l.id] = parseFloat(saved);
      });
    });
    setLessonProgress(progress);
  }, [course]);

  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizFinished, setQuizFinished] = useState(false);

  const toggleModule = (index: number) => {
    setExpandedModules(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const confirmDelete = () => {
    if (deleteConfirmId && onRemoveDownload) {
      onRemoveDownload(deleteConfirmId);
      setDeleteConfirmId(null);
    }
  };

  const handleAnswerSelect = (optionIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: optionIndex
    }));
  };

  const handleNextQuestion = () => {
    if (!course.quiz) return;
    if (currentQuestionIndex < course.quiz.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setQuizFinished(false);
  };

  const calculateScore = () => {
    if (!course.quiz) return 0;
    let score = 0;
    course.quiz.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  return (
    <div className="min-h-screen bg-[#0A1626] text-white">
      {/* Top Banner & Header */}
      <div className="relative w-full h-[40vh] sm:h-[48vh] md:h-[55vh] overflow-hidden">
        <img 
          src={course.heroImage || course.thumbnail} 
          alt={course.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1626] via-[#0A1626]/70 to-transparent" />
        
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="absolute top-4 left-4 sm:top-6 sm:left-6 z-30 p-2.5 rounded-full bg-[#0A1626]/70 hover:bg-[#0A1626] border border-white/10 backdrop-blur-md transition-all text-white cursor-pointer"
        >
          <ChevronLeft size={22} />
        </button>
      </div>

      {/* Course Info Container */}
      <div className="px-4 sm:px-8 md:px-12 max-w-6xl mx-auto -mt-20 sm:-mt-24 md:-mt-32 relative z-20 space-y-4 mb-8">
        <div className="space-y-2.5 sm:space-y-3">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white leading-tight uppercase tracking-tight drop-shadow-xl break-words">
            {course.title}
          </h1>
          <p className="text-[#00A3E0] text-xs sm:text-sm font-bold">
            {course.category} • Curadoria / Direção: {course.instructor}
          </p>
          <p className="text-gray-300 text-xs sm:text-sm max-w-3xl leading-relaxed line-clamp-3 md:line-clamp-none">
            {course.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-2 sm:pt-3">
            <button 
              onClick={() => course.modules?.[0]?.lessons?.[0] && onLessonClick(course.modules[0].lessons[0])}
              className="flex-1 sm:flex-none sm:w-64 flex items-center justify-center gap-2.5 bg-[#DE292E] hover:bg-[#C8191E] text-white py-3 sm:py-3.5 px-5 rounded-xl font-bold transition-transform active:scale-95 shadow-md uppercase tracking-wider text-xs cursor-pointer"
            >
              <Play size={16} fill="currentColor" /> {t.watchNow}
            </button>
            <button 
              onClick={() => onToggleMyList && onToggleMyList(course.id)}
              className="flex items-center justify-center gap-2 px-4 sm:px-5 py-3 sm:py-3.5 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-all shadow-md uppercase tracking-wider text-xs cursor-pointer border border-white/15"
            >
              {isInList ? <Check size={16} /> : <Plus size={16} />}
              {isInList ? t.inMyList : t.myList}
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-white/10 px-4 sm:px-8 md:px-12 max-w-6xl mx-auto">
        <div className="flex gap-4 sm:gap-6 md:gap-8 overflow-x-auto hide-scrollbar">
          {[
            { id: 'lecons', label: 'Episódios & Módulos' },
            { id: 'supports', label: 'Fichas & Materiais' },
            { id: 'activites', label: 'Avaliação & Quiz' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-4 text-xs md:text-sm font-bold whitespace-nowrap transition-all relative cursor-pointer ${
                activeTab === tab.id ? 'text-white' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-[#DE292E] rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="pb-24 pt-6 max-w-6xl mx-auto px-6 md:px-12">
        {activeTab === 'lecons' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            {course.modules?.map((module, mIdx) => (
              <div key={mIdx} className="space-y-1">
                <button 
                  onClick={() => toggleModule(mIdx)}
                  className="w-full py-4 flex items-center justify-between group active:bg-white/5 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-5 bg-[#0072BC] rounded-full" />
                    <h3 className="text-xs md:text-sm font-bold uppercase tracking-wider text-gray-300 text-left">
                      {module.title}
                    </h3>
                  </div>
                  {expandedModules[mIdx] ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                </button>
                
                <div className={`space-y-3 transition-all duration-300 overflow-hidden ${expandedModules[mIdx] ? 'max-h-[2000px] pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                  {module.lessons.map((lesson) => {
                    const savedTime = lessonProgress[lesson.id] || 0;
                    const totalSecs = (parseInt(lesson.duration) || 15) * 60; 
                    const progressPercent = Math.min((savedTime / totalSecs) * 100, 100);

                    return (
                      <div 
                        key={lesson.id} 
                        onClick={() => onLessonClick(lesson)} 
                        className="flex gap-4 items-center group p-3.5 rounded-2xl bg-[#132238] hover:bg-[#1A2D48] transition-all border border-[#0072BC]/20 cursor-pointer"
                      >
                        <div className="relative w-24 h-16 rounded-xl overflow-hidden shrink-0 bg-black shadow-lg">
                          <img src={course.thumbnail} className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform" alt="" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Play size={14} fill="white" className="text-white opacity-90" />
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-gray-100 leading-snug">
                            {lesson.title}
                          </h4>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                              {lesson.duration}
                            </span>
                            {progressPercent > 0 && (
                              <span className="text-[10px] font-bold text-[#00A3E0]">
                                {Math.round(progressPercent)}%
                              </span>
                            )}
                          </div>
                          
                          {progressPercent > 0 && (
                            <div className="w-full h-1 bg-white/10 mt-2 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-[#0072BC]" 
                                style={{ width: `${progressPercent}%` }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'supports' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            {course.materials?.map((material) => {
              const isDownloaded = downloadedIds.includes(material.id);
              return (
                <div 
                  key={material.id} 
                  onClick={() => onMaterialClick && onMaterialClick(material)} 
                  className={`flex items-center gap-4 p-4 bg-[#132238] border rounded-2xl transition-all cursor-pointer ${isDownloaded ? 'border-emerald-500/30' : 'border-white/10 hover:border-[#0072BC]'}`}
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${isDownloaded ? 'bg-emerald-500/20 text-emerald-400' : 'bg-[#0072BC]/20 text-[#00A3E0]'}`}>
                    <FileText size={22} />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <h4 className="text-xs font-bold text-white truncate">{material.title}</h4>
                    <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">PDF • PARAVERSO • SECULT-PA</span>
                  </div>
                  {isDownloaded && <CheckCircle size={18} className="text-emerald-400" />}
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'activites' && (
          <div className="space-y-6 animate-in fade-in duration-300 min-h-[350px]">
            {!course.quiz ? (
              <div className="text-center py-16 text-gray-400 text-xs">
                Nenhum quiz de avaliação pendente para esta obra.
              </div>
            ) : !quizStarted ? (
              <div className="p-8 bg-[#132238] rounded-3xl border border-white/10 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-[#0072BC]/20 rounded-full flex items-center justify-center mb-5 text-[#00A3E0]">
                  <RotateCcw size={30} />
                </div>
                <h3 className="text-base font-black uppercase mb-1">Quiz de Validação</h3>
                <p className="text-xs text-gray-300 mb-6 max-w-sm">Teste seus conhecimentos para validar o módulo e registrar sua participação cultural.</p>
                <button 
                  onClick={() => setQuizStarted(true)} 
                  className="w-full md:w-80 py-3.5 bg-[#DE292E] hover:bg-[#C8191E] text-white rounded-xl font-bold text-xs tracking-wider uppercase shadow-xl transition-all cursor-pointer"
                >
                  INICIAR QUIZ
                </button>
              </div>
            ) : quizFinished ? (
              <div className="p-8 bg-[#132238] rounded-3xl border border-white/10 text-center">
                <h3 className="text-xs font-bold text-[#00A3E0] uppercase tracking-wider mb-2">Pontuação Final</h3>
                <div className="text-4xl font-black text-white mb-2">{calculateScore()} / {course.quiz.length}</div>
                <p className="text-xs text-gray-300">
                  {calculateScore() >= (course.quiz.length / 2) ? 'Parabéns, você completou este módulo com êxito!' : 'Continue revisando os episódios e tente novamente.'}
                </p>
                <button 
                  onClick={resetQuiz} 
                  className="mt-6 text-[#DE292E] hover:text-[#C8191E] font-bold uppercase text-xs tracking-wider cursor-pointer"
                >
                  Refazer teste
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="p-6 bg-[#132238] rounded-3xl border border-white/10">
                  <h3 className="text-sm font-bold text-white leading-relaxed mb-6">
                    Questão {currentQuestionIndex + 1}/{course.quiz.length} : {course.quiz?.[currentQuestionIndex].question}
                  </h3>
                  <div className="space-y-3">
                    {course.quiz?.[currentQuestionIndex].options.map((opt, oIdx) => (
                      <button 
                        key={oIdx} 
                        onClick={() => handleAnswerSelect(oIdx)} 
                        className={`w-full p-4 rounded-2xl text-left text-xs transition-all flex justify-between items-center cursor-pointer ${
                          selectedAnswers[currentQuestionIndex] === oIdx 
                            ? 'bg-[#0072BC] text-white font-bold' 
                            : 'bg-[#0A1626] text-gray-300 border border-white/10 hover:border-white/20'
                        }`}
                      >
                        <span>{opt}</span>
                        {selectedAnswers[currentQuestionIndex] === oIdx && <Check size={16} />}
                      </button>
                    ))}
                  </div>
                </div>
                <button 
                  disabled={selectedAnswers[currentQuestionIndex] === undefined} 
                  onClick={handleNextQuestion} 
                  className="w-full py-4 bg-[#DE292E] hover:bg-[#C8191E] text-white rounded-xl font-bold text-xs tracking-wider shadow-xl disabled:opacity-40 cursor-pointer"
                >
                  {currentQuestionIndex < course.quiz.length - 1 ? 'PRÓXIMA QUESTÃO' : 'VALIDAR E CONCLUIR'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {deleteConfirmId && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-[#132238] border border-white/10 rounded-3xl p-8 w-full max-w-sm text-center space-y-6">
            <div className="w-14 h-14 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle size={28} />
            </div>
            <h3 className="text-base font-black text-white uppercase">Remover download?</h3>
            <div className="flex flex-col gap-3">
              <button onClick={confirmDelete} className="w-full py-3.5 bg-red-600 text-white rounded-xl font-bold text-xs tracking-wider cursor-pointer">
                CONFIRMAR
              </button>
              <button onClick={() => setDeleteConfirmId(null)} className="w-full py-3.5 bg-white/10 text-white rounded-xl font-bold text-xs tracking-wider cursor-pointer">
                CANCELAR
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;
