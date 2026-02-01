import React, { useState, useRef, useEffect } from 'react';

const BackgroundMusic: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // A more sophisticated, calm, and professional medical-themed ambient track
  // Using a reliable source for high-quality background atmosphere
  const musicUrl = "https://www.archive.org/download/OmarKhairat_201612/01.%20Edam%20Mayet.mp3";

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        setIsLoading(true);
        audioRef.current.play().catch(err => {
          console.error("Autoplay blocked or playback error:", err);
          setIsLoading(false);
          setIsPlaying(false);
        });
      }
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => {
      setIsPlaying(true);
      setIsLoading(false);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleWaiting = () => {
      setIsLoading(true);
    };

    const handleCanPlay = () => {
      setIsLoading(false);
    };

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
    <div className="fixed bottom-6 left-24 z-[1400] font-cairo" dir="rtl">
      <audio 
        ref={audioRef} 
        src={musicUrl} 
        loop 
        preload="auto" 
        crossOrigin="anonymous" 
      />
      
      <button 
        onClick={toggleMusic}
        disabled={isLoading}
        className={`group flex items-center gap-3 px-5 py-3 rounded-full shadow-2xl transition-all duration-700 backdrop-blur-2xl border-2 ${
          isPlaying 
            ? 'bg-medical-blue text-white border-medical-blue scale-105 shadow-medical-blue/30' 
            : 'bg-white/90 text-medical-blue border-slate-100 hover:bg-white hover:border-medical-green hover:text-medical-green shadow-slate-200'
        } ${isLoading ? 'opacity-70 cursor-wait' : 'active:scale-95'}`}
        aria-label={isPlaying ? "إيقاف الموسيقى" : "تشغيل الموسيقى الهادئة"}
      >
        <div className="flex items-center justify-center w-6 h-6">
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-medical-green border-t-transparent rounded-full animate-spin"></div>
          ) : isPlaying ? (
            <div className="flex gap-[3px] items-end h-4">
              <span className="w-[3px] bg-medical-green rounded-full animate-[music-bar-1_0.8s_ease-in-out_infinite]"></span>
              <span className="w-[3px] bg-medical-green rounded-full animate-[music-bar-2_1.2s_ease-in-out_infinite]"></span>
              <span className="w-[3px] bg-medical-green rounded-full animate-[music-bar-3_0.6s_ease-in-out_infinite]"></span>
              <span className="w-[3px] bg-medical-green rounded-full animate-[music-bar-4_1.0s_ease-in-out_infinite]"></span>
            </div>
          ) : (
            <span className="text-xl transition-transform group-hover:scale-110">🎹</span>
          )}
        </div>
        
        <div className="flex flex-col items-start leading-none text-right">
          <span className="text-[10px] font-black uppercase tracking-[0.1em] opacity-80">
            {isLoading ? 'جاري التحميل...' : 'موسيقى هادئة'}
          </span>
          {isPlaying && (
            <span className="text-[8px] font-bold text-medical-green animate-pulse mt-0.5">
              عمر خيرت
            </span>
          )}
        </div>
      </button>

      <style>{`
        @keyframes music-bar-1 { 0%, 100% { height: 6px; } 50% { height: 14px; } }
        @keyframes music-bar-2 { 0%, 100% { height: 10px; } 50% { height: 18px; } }
        @keyframes music-bar-3 { 0%, 100% { height: 4px; } 50% { height: 12px; } }
        @keyframes music-bar-4 { 0%, 100% { height: 8px; } 50% { height: 16px; } }
      `}</style>
    </div>
  );
};

export default BackgroundMusic;
