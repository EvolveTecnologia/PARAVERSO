import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, Play, Pause, 
  Settings, Check, X, Minimize, Maximize, Languages, Gauge, Globe
} from 'lucide-react';
import { Lesson } from '../types';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface VideoPlayerScreenProps {
  lesson: Lesson;
  courseTitle: string;
  moduleTitle: string;
  onBack: () => void;
  onProgressUpdate?: (lessonId: string, time: number) => void;
}

const LANGUAGES = [
  { id: 'pt', label: 'Português (Brasil)', flag: '🇧🇷', code: 'pt' },
  { id: 'en', label: 'Inglês', flag: '🇺🇸', code: 'en' },
  { id: 'fr', label: 'Francês', flag: '🇫🇷', code: 'fr' },
  { id: 'es', label: 'Espanhol', flag: '🇪🇸', code: 'es' },
];

const SPEEDS = [0.75, 1, 1.25, 1.5, 2];

const VideoPlayerScreen: React.FC<VideoPlayerScreenProps> = ({ lesson, courseTitle, onBack, onProgressUpdate }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [selectedLang, setSelectedLang] = useState('pt');
  const [subtitlesEnabled, setSubtitlesEnabled] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hideControlsTimeout = useRef<NodeJS.Timeout | null>(null);

  // Extract YouTube ID
  const getYouTubeId = (url?: string) => {
    if (!url) return 'p3Qec3Rl_s4';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : 'p3Qec3Rl_s4';
  };

  const videoId = getYouTubeId(lesson.videoUrl);

  // Load YouTube API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    const initPlayer = () => {
      if (window.YT && window.YT.Player) {
        playerRef.current = new window.YT.Player(`youtube-player-${lesson.id}`, {
          videoId: videoId,
          playerVars: {
            autoplay: 1,
            controls: 0,
            rel: 0,
            modestbranding: 1,
            playsinline: 1,
            enablejsapi: 1,
            origin: window.location.origin,
            fs: 0
          },
          events: {
            onReady: (event: any) => {
              setIsReady(true);
              setDuration(event.target.getDuration());
              event.target.playVideo();
              setIsPlaying(true);
            },
            onStateChange: (event: any) => {
              if (event.data === window.YT.PlayerState.PLAYING) {
                setIsPlaying(true);
              } else if (event.data === window.YT.PlayerState.PAUSED) {
                setIsPlaying(false);
              } else if (event.data === window.YT.PlayerState.ENDED) {
                setIsPlaying(false);
                if (onProgressUpdate) onProgressUpdate(lesson.id, duration);
              }
            }
          }
        });
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }
    };
  }, [lesson.id, videoId]);

  // Sync Video Time
  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current && isReady && isPlaying) {
        try {
          const time = playerRef.current.getCurrentTime();
          setCurrentTime(time);
          if (onProgressUpdate) onProgressUpdate(lesson.id, time);
        } catch (e) {
          // ignore
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isReady, isPlaying, lesson.id]);

  // Handle Fullscreen Events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Controls Visibility Timeout
  const triggerControls = () => {
    setShowControls(true);
    if (hideControlsTimeout.current) clearTimeout(hideControlsTimeout.current);
    if (isPlaying) {
      hideControlsTimeout.current = setTimeout(() => {
        if (!showSettings) {
          setShowControls(false);
        }
      }, 4000);
    }
  };

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!playerRef.current || !isReady) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    } else {
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
    triggerControls();
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (playerRef.current && isReady) {
      playerRef.current.seekTo(newTime, true);
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (playerRef.current && isReady) {
      playerRef.current.setPlaybackRate(speed);
    }
    setShowSettings(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={triggerControls}
      onClick={triggerControls}
      className="fixed inset-0 z-[200] bg-black flex items-center justify-center select-none overflow-hidden"
    >
      {/* YouTube Player Container */}
      <div className="relative w-full h-full flex items-center justify-center">
        <div 
          id={`youtube-player-${lesson.id}`} 
          className="w-full h-full pointer-events-none"
        />

        {/* Backdrop for click controls */}
        <div 
          onClick={togglePlay}
          className="absolute inset-0 z-10 cursor-pointer" 
        />

        {/* Custom Overlay Controls */}
        <div className={`absolute inset-0 z-20 flex flex-col justify-between transition-opacity duration-300 pointer-events-none ${showControls ? 'opacity-100' : 'opacity-0'}`}>
          {/* Top Bar */}
          <div className="p-4 sm:p-6 md:p-8 flex items-center justify-between bg-gradient-to-b from-black/80 via-black/40 to-transparent">
            <div className="flex items-center gap-3 sm:gap-4 pointer-events-auto">
              <button onClick={(e) => { e.stopPropagation(); onBack(); }} className="p-2.5 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-xl border border-white/10 cursor-pointer transition-colors">
                <ChevronLeft size={20} />
              </button>
              <div>
                <h1 className="text-xs md:text-sm font-bold text-white uppercase tracking-tight line-clamp-1">{lesson.title}</h1>
                <p className="text-[10px] md:text-xs text-[#00A3E0] font-bold uppercase tracking-wider">{courseTitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 pointer-events-auto">
              <button 
                onClick={(e) => { e.stopPropagation(); setShowSettings(true); }} 
                className="p-2.5 bg-white/10 hover:bg-white/20 rounded-full text-white border border-white/10 cursor-pointer transition-colors"
                title="Configurações de Reprodução"
              >
                <Settings size={18} />
              </button>
            </div>
          </div>

          {/* Central Play/Pause button */}
          <div className="flex items-center justify-center pointer-events-auto">
            <button 
              onClick={togglePlay} 
              className={`w-16 h-16 bg-[#0072BC]/85 hover:bg-[#0072BC] backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white transition-all duration-300 cursor-pointer shadow-xl ${isPlaying ? 'opacity-0 scale-75 pointer-events-none' : 'opacity-100 scale-100'}`}
            >
              {isPlaying ? <Pause size={28} fill="white" /> : <Play size={28} fill="white" className="ml-1" />}
            </button>
          </div>

          {/* Bottom Bar */}
          <div className="p-4 sm:p-6 md:p-8 space-y-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
            <div className="px-2 pointer-events-auto">
              <input 
                type="range" 
                min="0" 
                max={duration || 100} 
                step="0.1" 
                value={currentTime} 
                onClick={(e) => e.stopPropagation()}
                onChange={handleSeek} 
                className="w-full h-1.5 bg-white/20 rounded-full appearance-none cursor-pointer accent-[#DE292E]" 
              />
            </div>

            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2.5 text-[10px] sm:text-xs font-bold text-white bg-black/60 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
                <span className="text-[#00A3E0]">{formatTime(currentTime)}</span>
                <span className="opacity-30">/</span>
                <span className="opacity-70">{formatTime(duration)}</span>
                {playbackSpeed !== 1 && <span className="text-[#DE292E] ml-1">{playbackSpeed}x</span>}
              </div>
              <button 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  if (containerRef.current) {
                    document.fullscreenElement ? document.exitFullscreen() : containerRef.current.requestFullscreen();
                  }
                }} 
                className="p-2 bg-white/10 hover:bg-white/20 rounded-xl text-white border border-white/10 cursor-pointer pointer-events-auto transition-colors"
                title="Alternar Tela Cheia"
              >
                {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
              </button>
            </div>
          </div>
        </div>

        {/* Settings Drawer */}
        <div className={`absolute inset-0 z-[300] bg-black/50 backdrop-blur-sm transition-all duration-300 flex items-center justify-end ${showSettings ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className={`w-full max-w-[300px] h-full bg-[#0A1626]/95 backdrop-blur-2xl border-l border-white/10 p-6 flex flex-col space-y-6 transition-transform duration-300 ${showSettings ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-xs font-bold text-white uppercase tracking-wider">Configurações de Reprodução</h2>
              <button onClick={(e) => { e.stopPropagation(); setShowSettings(false); }} className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white cursor-pointer">
                <X size={16} />
              </button>
            </div>
            
            <div className="space-y-6 flex-1 overflow-y-auto hide-scrollbar text-white">
              {/* Velocidade */}
              <div className="space-y-2.5">
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <Gauge size={13} /> Velocidade de reprodução
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {SPEEDS.map(speed => (
                    <button 
                      key={speed}
                      onClick={(e) => { e.stopPropagation(); handleSpeedChange(speed); }}
                      className={`py-2 rounded-xl text-[11px] font-bold border transition-all cursor-pointer ${
                        playbackSpeed === speed 
                          ? 'bg-[#0072BC] border-[#00A3E0] text-white shadow-md' 
                          : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Idiomas das Legendas */}
              <div className="space-y-2.5">
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <Globe size={13} /> Idioma do Áudio / Legendas
                </h3>
                <div className="space-y-1.5 bg-white/5 rounded-2xl p-2 border border-white/5">
                  {LANGUAGES.map(lang => (
                    <button 
                      key={lang.id}
                      onClick={(e) => { e.stopPropagation(); setSelectedLang(lang.id); }}
                      className={`w-full p-2.5 rounded-xl flex items-center justify-between border transition-all cursor-pointer ${
                        selectedLang === lang.id 
                          ? 'bg-[#0072BC]/40 border-[#0072BC] text-white' 
                          : 'bg-transparent border-transparent text-gray-400 hover:text-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base">{lang.flag}</span>
                        <span className="text-xs font-medium">{lang.label}</span>
                      </div>
                      {selectedLang === lang.id && <Check size={14} className="text-[#00A3E0]" />}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Legendas Toggle */}
              <div className="space-y-2">
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <Languages size={13} /> Legendas
                </h3>
                <button 
                  onClick={(e) => { e.stopPropagation(); setSubtitlesEnabled(!subtitlesEnabled); }}
                  className={`w-full p-3.5 rounded-xl flex items-center justify-between border transition-all cursor-pointer ${
                    subtitlesEnabled ? 'bg-[#0072BC]/20 border-[#0072BC] text-[#00A3E0]' : 'bg-white/5 border-white/10 text-gray-400'
                  }`}
                >
                  <span className="text-xs font-bold uppercase tracking-wider">Ativar Legendas</span>
                  <div className={`w-9 h-5 rounded-full relative transition-colors ${subtitlesEnabled ? 'bg-[#0072BC]' : 'bg-gray-700'}`}>
                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${subtitlesEnabled ? 'left-4.5' : 'left-0.5'}`} />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default VideoPlayerScreen;
