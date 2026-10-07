import React from 'react';
import { Course } from '../types';
import { Play, Sparkles } from 'lucide-react';

interface CourseCardProps {
  course: Course;
  onClick: (id: string) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onClick }) => {
  const is360 = course.id === 'amazonia-vr-360' || course.title.toLowerCase().includes('360');

  return (
    <div 
      className="flex-shrink-0 w-full cursor-pointer group/card relative outline-none focus:outline-none z-0 hover:z-30 focus:z-30 transition-transform duration-200"
      onClick={() => onClick(course.id)}
      tabIndex={0}
      role="button"
    >
      {/* 
        Image Container:
        - Mobile & Tablet: aspect-[2/3] (Retrato / Portrait Poster)
        - Desktop (lg+): aspect-video (Paisagem / Landscape 16:9 como era antes)
      */}
      <div className="relative aspect-[2/3] lg:aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-[#0D1B2E] border border-white/10 shadow-md group-hover/card:shadow-xl group-hover/card:shadow-black/60 transition-all duration-300 ease-out transform origin-center group-hover/card:scale-[1.03] lg:group-hover/card:scale-[1.04] group-hover/card:border-[#00A3E0]/70 group-hover/card:ring-2 group-hover/card:ring-[#00A3E0]/40">
        
        {/* Background Image */}
        <img 
          src={course.heroImage || course.thumbnail} 
          alt={course.title}
          className="w-full h-full object-cover transition-all duration-500 opacity-90 group-hover/card:opacity-100 group-hover/card:scale-105"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop';
          }}
        />
        
        {/* Cinematic Gradient Overlays */}
        {/* Mobile & Tablet portrait gradient */}
        <div className="lg:hidden absolute inset-0 bg-gradient-to-t from-[#0A1626]/95 via-transparent to-black/30 opacity-80 group-hover/card:opacity-60 transition-opacity duration-300 pointer-events-none" />
        {/* Desktop landscape gradient (como era antes) */}
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-t from-[#0A1626]/90 via-transparent to-transparent opacity-70 group-hover/card:opacity-40 transition-opacity duration-300 pointer-events-none" />

        {/* Badges Overlay at Top */}
        <div className="absolute top-2 left-2 right-2 flex items-center justify-between gap-1 pointer-events-none z-10">
          {is360 ? (
            <span className="px-2 py-0.5 bg-gradient-to-r from-[#DE292E] to-[#FF5A5F] text-white text-[9px] sm:text-[10px] font-black uppercase tracking-wider rounded-md shadow-md flex items-center gap-1">
              <Sparkles size={10} />
              360° VR
            </span>
          ) : (
            <span className="px-1.5 py-0.5 bg-[#0072BC]/90 backdrop-blur-md text-white text-[9px] sm:text-[10px] font-black uppercase tracking-wider rounded-md shadow-sm border border-white/15">
              {course.category.split(' ')[0]}
            </span>
          )}

          {course.duration && (
            <span className="px-1.5 py-0.5 bg-black/60 backdrop-blur-md text-gray-200 text-[9px] sm:text-[10px] font-bold rounded-md border border-white/10 ml-auto">
              {course.duration}
            </span>
          )}
        </div>

        {/* Play Button Icon on Hover/Active */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-all duration-300 pointer-events-none">
          <div className="w-10 h-10 sm:w-11 sm:h-11 bg-[#DE292E] rounded-full flex items-center justify-center shadow-xl transform scale-75 group-hover/card:scale-100 transition-transform duration-300 ease-out border border-white/30">
            <Play size={18} className="text-white fill-white ml-0.5" />
          </div>
        </div>
        
        {/* Progress Bar */}
        {course.progress > 0 && (
          <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
            <div 
              className="h-full bg-gradient-to-r from-[#0072BC] to-[#DE292E] shadow-[0_0_8px_rgba(222,41,46,0.8)]" 
              style={{ width: `${course.progress}%` }}
            />
          </div>
        )}
      </div>

      {/* Typography & Metadata */}
      <div className="mt-2 px-0.5 transition-all duration-300">
        <h3 className="text-xs sm:text-sm font-semibold leading-snug text-gray-200 group-hover/card:text-white transition-colors line-clamp-2">
          {course.title}
        </h3>
        <div className="flex items-center justify-between gap-1 mt-0.5">
          <p className="text-[10px] sm:text-[11px] text-[#00A3E0] font-medium line-clamp-1">
            {course.category}
          </p>
          {course.modulesCount > 0 && (
            <span className="text-[9px] sm:text-[10px] text-gray-400 font-medium whitespace-nowrap">
              {course.modulesCount} {course.modulesCount === 1 ? 'módulo' : 'módulos'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
