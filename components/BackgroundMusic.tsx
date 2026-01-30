
import React, { useState, useRef, useEffect } from 'react';

const BackgroundMusic: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const musicUrl = "https://www.archive.org/download/OmarKhairat_201612/01.%20Edam%20Mayet.mp3";

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        setIsLoading(true);
        audioRef.current.play().catch(err => {
          console.error("Autoplay blocked:", err);
          setIsLoading(false);
          setIsPlaying(false);
        });
      }
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handlePlay = () => { setIsPlaying(true); setIsLoading(false); };
    const handlePause = () => setIsPlaying(false);
    const handleWaiting = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    audio.addEventListener('playing', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('canplay', handleCanPlay);
    return () => {
      audio.removeEventListener('playing', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('canplay', handleCanPlay);
    };
  }, []);

  return (
    <div className="fixed bottom-6 left-20 z-[1400] font-cairo" dir="rtl">
      <audio ref={audioRef} src={musicUrl} loop preload="auto" crossOrigin="anonymous" />
      <button 
        onClick={toggleMusic}
        disabled={isLoading}
        className={`flex items-center gap-3 px-4 py-3 rounded-[20px] shadow-2xl transition-all duration-700 backdrop-blur-xl border ${
          isPlaying 
            ? 'bg-medical-blue text-white border-medical-blue scale-105' 
            : 'bg-white/90 text-medical-blue border-slate-200 hover:bg-white'
        } ${isLoading ? 'opacity-70 cursor-wait' : ''}`}
      >
        <div className="flex items-center justify-center w-5 h-5">
          {isLoading ? (
            <div className="w-3 h-3 border-2 border-medical-green border-t-transparent rounded-full animate-spin"></div>
          ) : isPlaying ? (
            <div className="flex gap-1 items-end h-3">
              <span className="w-1 bg-medical-green animate-[music-bar_0.8s_ease-in-out_infinite]"></span>
              <span className="w-1 bg-medical-green animate-[music-bar_1.2s_ease-in-out_infinite]"></span>
              <span className="w-1 bg-medical-green animate-[music-bar_0.6s_ease-in-out_infinite]"></span>
            </div>
          ) : (
            <span className="text-lg leading-none">🎹</span>
          )}
        </div>
        <span className="text-[9px] font-black uppercase tracking-[0.2em]">
          {isLoading ? 'تحميل...' : isPlaying ? 'عمر خيرت' : 'موسيقى'}
        </span>
      </button>

      <style>{`
        @keyframes music-bar {
          0%, 100% { height: 4px; }
          50% { height: 12px; }
        }
      `}</style>
    </div>
  );
};

export default BackgroundMusic;
