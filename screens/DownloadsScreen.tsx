import React, { useState } from 'react';
import { Download, Settings, Trash2, FileText, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { COURSES } from '../constants';
import { Material } from '../types';

interface DownloadsScreenProps {
  downloadedIds: string[];
  onRemoveDownload: (id: string) => void;
  onMaterialClick: (material: Material) => void;
}

const DownloadsScreen: React.FC<DownloadsScreenProps> = ({ downloadedIds, onRemoveDownload, onMaterialClick }) => {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const downloadedMaterials = COURSES.reduce((acc: {material: Material, courseTitle: string}[], course) => {
    course.materials?.forEach(m => {
      if (downloadedIds.includes(m.id)) {
        acc.push({ material: m, courseTitle: course.title });
      }
    });
    return acc;
  }, []);

  const confirmDelete = () => {
    if (deleteId) {
      setIsDeleting(true);
      setTimeout(() => {
        onRemoveDownload(deleteId);
        setIsDeleting(false);
        setDeleteId(null);
      }, 400);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1626] text-white px-6 md:px-16 pt-12 md:pt-16 pb-24 flex flex-col animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex justify-between items-end mb-10 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tight mb-2">Downloads Offline</h1>
          <p className="text-xs md:text-sm text-gray-300">Acesse fichas técnicas, roteiros e materiais educativos sem conexão com a internet.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end mr-4">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Armazenamento</div>
            <div className="flex items-center gap-2">
              <div className="w-28 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-[#0072BC] w-[18%]" />
              </div>
              <span className="text-xs font-bold text-white">420 MB / 32 GB</span>
            </div>
          </div>
          <button className="p-3 bg-white/5 hover:bg-white/10 rounded-full text-white transition-colors border border-white/10 cursor-pointer">
            <Settings size={18} />
          </button>
        </div>
      </div>

      <div className="flex-1">
        {downloadedMaterials.length > 0 ? (
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-6">
              Documentos disponíveis offline ({downloadedMaterials.length})
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {downloadedMaterials.map(({ material, courseTitle }) => (
                <div 
                  key={material.id}
                  className="group relative bg-[#132238] border border-white/10 hover:border-[#0072BC] rounded-2xl p-5 flex flex-col justify-between hover:bg-[#1A2D48] transition-all cursor-pointer h-48"
                  onClick={() => onMaterialClick(material)}
                >
                  <div className="flex justify-between items-start">
                    <div className="w-11 h-11 bg-[#0072BC]/20 text-[#00A3E0] rounded-xl flex items-center justify-center">
                      <FileText size={22} />
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteId(material.id);
                      }}
                      className="p-2 text-gray-400 hover:text-red-400 transition-colors rounded-full hover:bg-red-500/10 cursor-pointer"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-white line-clamp-2 mb-1">{material.title}</h4>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider line-clamp-1">{courseTitle}</p>
                  </div>

                  <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-bold uppercase tracking-wider pt-3 border-t border-white/10">
                    <CheckCircle size={13} /> Disponível offline
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[55vh] text-center">
            <div className="w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center mb-6 border border-white/10">
              <Download size={36} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">Seu espaço offline está vazio</h3>
            <p className="text-xs text-gray-300 max-w-sm leading-relaxed mb-6">
              Baixe materiais de apoio e fichas pedagógicas a partir das obras para consultar em qualquer região do Pará, inclusive em áreas com baixa conectividade.
            </p>
          </div>
        )}
      </div>

      {/* Delete Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-[#132238] border border-white/10 rounded-3xl p-8 w-full max-w-sm text-center space-y-6 shadow-2xl">
            <div className="w-16 h-16 bg-red-500/15 text-red-400 rounded-full flex items-center justify-center mx-auto border border-red-500/20">
              <AlertCircle size={32} />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white uppercase">Remover este documento?</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                O arquivo será apagado do armazenamento local do seu dispositivo.
              </p>
            </div>
            <div className="flex flex-col gap-2.5 pt-2">
              <button 
                onClick={confirmDelete}
                disabled={isDeleting}
                className="w-full py-3.5 bg-[#DE292E] hover:bg-[#C8191E] text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isDeleting ? <Loader2 size={16} className="animate-spin" /> : 'CONFIRMAR EXCLUSÃO'}
              </button>
              <button 
                onClick={() => setDeleteId(null)}
                disabled={isDeleting}
                className="w-full py-3.5 bg-white/10 hover:bg-white/15 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                CANCELAR
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DownloadsScreen;
