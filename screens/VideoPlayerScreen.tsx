import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  ChevronLeft, Play, Pause, 
  Settings, Check, X, Minimize, Maximize, Languages, Gauge, Globe,
  Glasses
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
  moduleTitle?: string;
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

export const VideoPlayerScreen: React.FC<VideoPlayerScreenProps> = ({ 
  lesson, 
  courseTitle, 
  onBack, 
  onProgressUpdate 
}) => {
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
  const [isVrMode, setIsVrMode] = useState(false);
  const [showVrNotice, setShowVrNotice] = useState(false);

  // References to single and dual players
  const singlePlayerRef = useRef<any>(null);
  const leftPlayerRef = useRef<any>(null);
  const rightPlayerRef = useRef<any>(null);

  // DOM mount wrappers isolated from React VDOM reconciliation
  const singleMountRef = useRef<HTMLDivElement>(null);
  const leftMountRef = useRef<HTMLDivElement>(null);
  const rightMountRef = useRef<HTMLDivElement>(null);

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
  const is360Content = 
    videoId === '0dkQxRADDH4' || 
    lesson.title.toLowerCase().includes('360') || 
    lesson.title.toLowerCase().includes('vr') ||
    courseTitle.toLowerCase().includes('360') ||
    courseTitle.toLowerCase().includes('vr');

  // Load YouTube Iframe API once
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
    }
  }, []);

  // Safely clean up existing player instances and DOM mounts
  const destroyAllPlayers = useCallback(() => {
    try {
      if (singlePlayerRef.current?.destroy) {
        singlePlayerRef.current.destroy();
      }
    } catch (e) {
      // ignore
    }
    singlePlayerRef.current = null;

    try {
      if (leftPlayerRef.current?.destroy) {
        leftPlayerRef.current.destroy();
      }
    } catch (e) {
      // ignore
    }
    leftPlayerRef.current = null;

    try {
      if (rightPlayerRef.current?.destroy) {
        rightPlayerRef.current.destroy();
      }
    } catch (e) {
      // ignore
    }
    rightPlayerRef.current = null;

    // Clear internal dynamic nodes safely
    if (singleMountRef.current) singleMountRef.current.innerHTML = '';
    if (leftMountRef.current) leftMountRef.current.innerHTML = '';
    if (rightMountRef.current) rightMountRef.current.innerHTML = '';
  }, []);

  // Initialize player based on VR mode
  useEffect(() => {
    setIsReady(false);
    let isCancelled = false;

    const createPlayers = () => {
      if (isCancelled || !window.YT || !window.YT.Player) return;

      destroyAllPlayers();

      if (!isVrMode) {
        // Initialize Single Standard Player
        if (!singleMountRef.current) return;
        singleMountRef.current.innerHTML = '';
        const mountNode = document.createElement('div');
        mountNode.style.width = '100%';
        mountNode.style.height = '100%';
        singleMountRef.current.appendChild(mountNode);

        singlePlayerRef.current = new window.YT.Player(mountNode, {
          videoId: videoId,
          playerVars: {
            autoplay: 1,
            controls: 0,
            rel: 0,
            modestbranding: 1,
            playsinline: 1,
            enablejsapi: 1,
            origin: window.location.origin,
            fs: 0,
            start: Math.floor(currentTime)
          },
          events: {
            onReady: (event: any) => {
              if (isCancelled) return;
              setIsReady(true);
              setDuration(event.target.getDuration());
              if (currentTime > 0) {
                event.target.seekTo(currentTime, true);
              }
              event.target.setPlaybackRate(playbackSpeed);
              if (isPlaying) {
                event.target.playVideo();
              }
            },
            onStateChange: (event: any) => {
              if (isCancelled) return;
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
      } else {
        // Initialize Dual Players for VR Stereoscopic Split-Screen
        if (!leftMountRef.current || !rightMountRef.current) return;
        leftMountRef.current.innerHTML = '';
        rightMountRef.current.innerHTML = '';

        const leftNode = document.createElement('div');
        leftNode.style.width = '100%';
        leftNode.style.height = '100%';
        leftMountRef.current.appendChild(leftNode);

        const rightNode = document.createElement('div');
        rightNode.style.width = '100%';
        rightNode.style.height = '100%';
        rightMountRef.current.appendChild(rightNode);

        let leftReady = false;
        let rightReady = false;

        const checkBothReady = () => {
          if (leftReady && rightReady && !isCancelled) {
            setIsReady(true);
            if (leftPlayerRef.current?.getDuration) {
              setDuration(leftPlayerRef.current.getDuration());
            }
            if (currentTime > 0) {
              leftPlayerRef.current?.seekTo(currentTime, true);
              rightPlayerRef.current?.seekTo(currentTime, true);
            }
            leftPlayerRef.current?.setPlaybackRate(playbackSpeed);
            rightPlayerRef.current?.setPlaybackRate(playbackSpeed);
            
            // Audio config: Left has audio, Right is muted to avoid echo
            leftPlayerRef.current?.unMute();
            rightPlayerRef.current?.mute();

            if (isPlaying) {
              leftPlayerRef.current?.playVideo();
              rightPlayerRef.current?.playVideo();
            }
          }
        };

        // Left Eye Player
        leftPlayerRef.current = new window.YT.Player(leftNode, {
          videoId: videoId,
          playerVars: {
            autoplay: 1,
            controls: 0,
            rel: 0,
            modestbranding: 1,
            playsinline: 1,
            enablejsapi: 1,
            origin: window.location.origin,
            fs: 0,
            start: Math.floor(currentTime)
          },
          events: {
            onReady: () => {
              leftReady = true;
              checkBothReady();
            },
            onStateChange: (event: any) => {
              if (isCancelled) return;
              if (event.data === window.YT.PlayerState.PLAYING) {
                setIsPlaying(true);
                rightPlayerRef.current?.playVideo();
              } else if (event.data === window.YT.PlayerState.PAUSED) {
                setIsPlaying(false);
                rightPlayerRef.current?.pauseVideo();
              } else if (event.data === window.YT.PlayerState.ENDED) {
                setIsPlaying(false);
                rightPlayerRef.current?.pauseVideo();
                if (onProgressUpdate) onProgressUpdate(lesson.id, duration);
              }
            }
          }
        });

        // Right Eye Player
        rightPlayerRef.current = new window.YT.Player(rightNode, {
          videoId: videoId,
          playerVars: {
            autoplay: 1,
            controls: 0,
            rel: 0,
            modestbranding: 1,
            playsinline: 1,
            enablejsapi: 1,
            origin: window.location.origin,
            fs: 0,
            mute: 1,
            start: Math.floor(currentTime)
          },
          events: {
            onReady: (event: any) => {
              try {
                event.target.mute();
              } catch (e) {}
              rightReady = true;
              checkBothReady();
            }
          }
        });
      }
    };

    // Small delay to allow DOM containers to attach
    const timer = setTimeout(() => {
      if (window.YT && window.YT.Player) {
        createPlayers();
      } else {
        window.onYouTubeIframeAPIReady = createPlayers;
      }
    }, 50);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
      destroyAllPlayers();
    };
  }, [isVrMode, lesson.id, videoId, destroyAllPlayers]);

  // Periodic Time Sync
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isReady || !isPlaying) return;

      try {
        if (!isVrMode && singlePlayerRef.current?.getCurrentTime) {
          const time = singlePlayerRef.current.getCurrentTime();
          setCurrentTime(time);
          if (onProgressUpdate) onProgressUpdate(lesson.id, time);
        } else if (isVrMode && leftPlayerRef.current?.getCurrentTime) {
          const time = leftPlayerRef.current.getCurrentTime();
          setCurrentTime(time);
          if (onProgressUpdate) onProgressUpdate(lesson.id, time);

          // Drift correction between left and right players
          if (rightPlayerRef.current?.getCurrentTime) {
            const rightTime = rightPlayerRef.current.getCurrentTime();
            if (Math.abs(time - rightTime) > 0.4) {
              rightPlayerRef.current.seekTo(time, true);
            }
          }
        }
      } catch (e) {
        // ignore sync tick errors
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isReady, isPlaying, isVrMode, lesson.id, onProgressUpdate]);

  // Fullscreen change listener
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
      }, isVrMode ? 3000 : 4000);
    }
  };

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!isReady) return;

    if (isPlaying) {
      if (!isVrMode) {
        singlePlayerRef.current?.pauseVideo();
      } else {
        leftPlayerRef.current?.pauseVideo();
        rightPlayerRef.current?.pauseVideo();
      }
      setIsPlaying(false);
    } else {
      if (!isVrMode) {
        singlePlayerRef.current?.playVideo();
      } else {
        leftPlayerRef.current?.playVideo();
        rightPlayerRef.current?.playVideo();
      }
      setIsPlaying(true);
    }
    triggerControls();
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (!isVrMode) {
      singlePlayerRef.current?.seekTo(newTime, true);
    } else {
      leftPlayerRef.current?.seekTo(newTime, true);
      rightPlayerRef.current?.seekTo(newTime, true);
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (!isVrMode) {
      singlePlayerRef.current?.setPlaybackRate(speed);
    } else {
      leftPlayerRef.current?.setPlaybackRate(speed);
      rightPlayerRef.current?.setPlaybackRate(speed);
    }
    setShowSettings(false);
  };

  const toggleVrMode = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const nextMode = !isVrMode;
    setIsVrMode(nextMode);
    setShowSettings(false);

    if (nextMode) {
      setShowVrNotice(true);
      setTimeout(() => setShowVrNotice(false), 4000);
      if (containerRef.current && !document.fullscreenElement) {
        containerRef.current.requestFullscreen().catch(() => {});
      }
    }
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
      {/* VR Orientation / Headset Notice Banner */}
      {showVrNotice && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[350] bg-[#0072BC]/95 text-white px-5 py-3 rounded-2xl shadow-2xl backdrop-blur-xl border border-white/20 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300 pointer-events-none">
          <Glasses className="text-white animate-pulse" size={24} />
          <div className="text-left">
            <p className="text-xs font-black uppercase tracking-wider">Modo Óculos VR Ativado</p>
            <p className="text-[11px] text-gray-200">Gire o smartphone na horizontal e insira no seu óculos VR / Cardboard.</p>
          </div>
        </div>
      )}

      {/* Main Video Viewport Layer (Both exist statically in React DOM to prevent removeChild crash) */}
      
      {/* Standard Single Screen View */}
      <div 
        className={`relative w-full h-full flex items-center justify-center ${isVrMode ? 'hidden' : 'block'}`}
      >
        <div 
          ref={singleMountRef}
          className="w-full h-full pointer-events-none"
        />
      </div>

      {/* Stereoscopic Split-Screen View (VR Headsets / Cardboard) */}
      <div 
        className={`relative w-full h-full flex-row items-stretch bg-black overflow-hidden ${isVrMode ? 'flex' : 'hidden'}`}
      >
        {/* Left Eye Viewport */}
        <div className="relative flex-1 h-full border-r border-black overflow-hidden flex items-center justify-center bg-black">
          <div 
            ref={leftMountRef}
            className="w-full h-full pointer-events-none scale-[1.03]"
          />
          {/* Left Eye Optical Center Reticle */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
            <div className="w-6 h-6 border border-white/40 rounded-full flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
            </div>
          </div>
          {/* Left Eye Label */}
          <div className="absolute top-4 left-4 z-20 pointer-events-none opacity-40">
            <span className="text-[10px] font-bold tracking-widest text-white/70 bg-black/60 px-2 py-0.5 rounded uppercase">
              Olho Esquerdo
            </span>
          </div>
        </div>

        {/* Central Physical Alignment Divider Line */}
        <div className="relative w-2 sm:w-3 bg-black z-30 flex flex-col items-center justify-between py-6 pointer-events-none border-x border-white/10">
          <div className="w-1 h-6 bg-white/30 rounded-full" />
          <div className="flex flex-col items-center gap-1">
            <div className="w-2 h-2 bg-[#00A3E0] rounded-full animate-ping" />
            <div className="w-1 h-12 bg-white/40 rounded-full" />
          </div>
          <div className="w-1 h-6 bg-white/30 rounded-full" />
        </div>

        {/* Right Eye Viewport */}
        <div className="relative flex-1 h-full border-l border-black overflow-hidden flex items-center justify-center bg-black">
          <div 
            ref={rightMountRef}
            className="w-full h-full pointer-events-none scale-[1.03]"
          />
          {/* Right Eye Optical Center Reticle */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
            <div className="w-6 h-6 border border-white/40 rounded-full flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
            </div>
          </div>
          {/* Right Eye Label */}
          <div className="absolute top-4 right-4 z-20 pointer-events-none opacity-40">
            <span className="text-[10px] font-bold tracking-widest text-white/70 bg-black/60 px-2 py-0.5 rounded uppercase">
              Olho Direito
            </span>
          </div>
        </div>
      </div>

      {/* Backdrop for click controls */}
      <div 
        onClick={togglePlay}
        className="absolute inset-0 z-10 cursor-pointer" 
      />

      {/* Custom Overlay Controls */}
      <div className={`absolute inset-0 z-20 flex flex-col justify-between transition-opacity duration-300 pointer-events-none ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* Top Bar */}
        <div className="p-4 sm:p-6 md:p-8 flex items-center justify-between bg-gradient-to-b from-black/85 via-black/50 to-transparent">
          <div className="flex items-center gap-3 sm:gap-4 pointer-events-auto">
            <button 
              onClick={(e) => { e.stopPropagation(); onBack(); }} 
              className="p-2.5 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-xl border border-white/10 cursor-pointer transition-colors"
              title="Voltar"
            >
              <ChevronLeft size={20} />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xs md:text-sm font-bold text-white uppercase tracking-tight line-clamp-1">
                  {lesson.title}
                </h1>
                {is360Content && (
                  <span className="px-2 py-0.5 bg-[#DE292E] text-white text-[9px] font-black uppercase tracking-wider rounded-md">
                    360° VR
                  </span>
                )}
              </div>
              <p className="text-[10px] md:text-xs text-[#00A3E0] font-bold uppercase tracking-wider">
                {courseTitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 pointer-events-auto">
            {/* VR Mode Toggle Button */}
            <button 
              onClick={toggleVrMode} 
              className={`px-3 py-2 sm:px-4 sm:py-2.5 rounded-full text-xs font-black uppercase tracking-wider border flex items-center gap-2 transition-all cursor-pointer backdrop-blur-xl shadow-lg ${
                isVrMode 
                  ? 'bg-[#DE292E] hover:bg-[#C8191E] border-white/40 text-white scale-105 shadow-[#DE292E]/40' 
                  : is360Content 
                    ? 'bg-[#0072BC]/90 hover:bg-[#0072BC] border-[#00A3E0] text-white animate-pulse' 
                    : 'bg-white/10 hover:bg-white/20 border-white/15 text-white'
              }`}
              title={isVrMode ? "Sair do Modo Óculos VR" : "Ativar Modo Óculos VR Estereoscópico"}
            >
              <Glasses size={18} className={isVrMode ? "animate-bounce" : ""} />
              <span className="hidden sm:inline">
                {isVrMode ? 'Sair do Modo VR' : 'Modo Óculos VR'}
              </span>
              <span className="sm:hidden">
                {isVrMode ? 'Sair VR' : 'VR'}
              </span>
            </button>

            {/* Settings Button */}
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
            className={`w-16 h-16 bg-[#0072BC]/85 hover:bg-[#0072BC] backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white transition-all duration-300 cursor-pointer shadow-xl ${
              isPlaying ? 'opacity-0 scale-75 pointer-events-none' : 'opacity-100 scale-100'
            }`}
          >
            {isPlaying ? <Pause size={28} fill="white" /> : <Play size={28} fill="white" className="ml-1" />}
          </button>
        </div>

        {/* Bottom Bar */}
        <div className="p-4 sm:p-6 md:p-8 space-y-3 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
          {/* Seek Range Bar */}
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
              {isVrMode && (
                <span className="ml-1 px-1.5 py-0.5 bg-[#DE292E] text-white text-[9px] font-black rounded">
                  VR SPLIT
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 pointer-events-auto">
              {/* Quick VR Toggle in Bottom Bar */}
              <button 
                onClick={toggleVrMode} 
                className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                  isVrMode ? 'bg-[#DE292E] border-white text-white' : 'bg-white/10 hover:bg-white/20 border-white/10 text-white'
                }`}
                title={isVrMode ? "Desativar Modo VR" : "Ativar Modo VR Estereoscópico"}
              >
                <Glasses size={16} />
              </button>

              {/* Fullscreen Toggle */}
              <button 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  if (containerRef.current) {
                    if (document.fullscreenElement) {
                      document.exitFullscreen().catch(() => {});
                    } else {
                      containerRef.current.requestFullscreen().catch(() => {});
                    }
                  }
                }} 
                className="p-2 bg-white/10 hover:bg-white/20 rounded-xl text-white border border-white/10 cursor-pointer transition-colors"
                title="Alternar Tela Cheia"
              >
                {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Drawer */}
      <div className={`absolute inset-0 z-[300] bg-black/50 backdrop-blur-sm transition-all duration-300 flex items-center justify-end ${showSettings ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className={`w-full max-w-[320px] h-full bg-[#0A1626]/95 backdrop-blur-2xl border-l border-white/10 p-6 flex flex-col space-y-6 transition-transform duration-300 ${showSettings ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h2 className="text-xs font-bold text-white uppercase tracking-wider">Configurações de Reprodução</h2>
            <button onClick={(e) => { e.stopPropagation(); setShowSettings(false); }} className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white cursor-pointer">
              <X size={16} />
            </button>
          </div>
          
          <div className="space-y-6 flex-1 overflow-y-auto hide-scrollbar text-white">
            {/* Modo Realidade Virtual / Óculos VR */}
            <div className="space-y-2.5 bg-white/5 p-3 rounded-2xl border border-white/10">
              <h3 className="text-[10px] font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
                <Glasses size={14} className="text-[#00A3E0]" /> Modo de Imersão VR
              </h3>
              <p className="text-[11px] text-gray-400">
                Divide a tela para uso em óculos de Realidade Virtual (Cardboard, VR Box, etc.).
              </p>
              <button 
                onClick={toggleVrMode}
                className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider border flex items-center justify-between transition-all cursor-pointer ${
                  isVrMode 
                    ? 'bg-[#DE292E] border-[#DE292E] text-white shadow-md' 
                    : 'bg-[#0072BC] border-[#00A3E0] text-white hover:bg-[#005CAB]'
                }`}
              >
                <span>{isVrMode ? 'Desativar Modo VR' : 'Ativar Modo Split-Screen VR'}</span>
                <Glasses size={16} />
              </button>
            </div>

            {/* Velocidade de Reprodução */}
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

            {/* Idiomas do Áudio / Legendas */}
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
  );
};

export default VideoPlayerScreen;
