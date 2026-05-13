import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { ShieldAlert } from 'lucide-react';

interface CelebrationOverlayProps {
  onClose: () => void;
  lang: 'en' | 'ar';
}

const VIDEO_URL = "/Golden_confetti_flies__sword_pulses_202605130013-_2_.mp4";
const FINAL_IMAGE = "/e4277d6d-eb27-4f41-9ec1-8a45944eb3a3 (1).jpg";

export const CelebrationOverlay: React.FC<CelebrationOverlayProps> = ({ onClose, lang }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [error, setError] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const t = {
    en: {
      thankYou: "100,000 LEGENDS!",
      celebration: "KICK MILESTONE REACHED",
      close: "Enter Hub",
      loading: "INITIALIZING STREAM..."
    },
    ar: {
      thankYou: "100,000 أسطورة!",
      celebration: "إنجاز تاريخي على كيك",
      close: "دخول المركز",
      loading: "جاري التحميل..."
    }
  }[lang];

  const handleVideoEnd = () => {
    setVideoEnded(true);
    triggerConfetti();
  };

  const attemptPlay = () => {
    if (videoRef.current) {
        videoRef.current.play().catch(() => {
            setVideoEnded(true);
            triggerConfetti();
        });
    }
  };

  const handleVideoReady = () => {
    setIsReady(true);
    attemptPlay();
  };

  const handleVideoError = () => {
    console.error("Video failed to load");
    setError(true);
  };

  const triggerConfetti = () => {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };
    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      const particleCount = 50 * (timeLeft / duration);
      // Changed to RED confetti theme
      confetti({ ...defaults, particleCount, colors: ['#FF0000', '#FF2D2D', '#ffffff'], origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, colors: ['#FF0000', '#FF2D2D', '#ffffff'], origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-3xl overflow-hidden select-none font-sans perspective-1000">
      
      <AnimatePresence mode="wait">
        {!videoEnded && (
          <motion.div
            key="video"
            initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.2, filter: "blur(20px)" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative w-full h-full flex items-center justify-center p-0"
          >
            {/* Cinematic Glow Behind Video */}
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
              <motion.div 
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-3/4 h-3/4 bg-red-600/20 rounded-full blur-[120px]" 
              />
            </div>

            <div className="w-full h-full relative z-10 shadow-[inset_0_0_150px_rgba(0,0,0,1)] flex items-center justify-center bg-black">
              <video
                ref={videoRef}
                src={VIDEO_URL}
                className={`w-full h-full object-cover transition-opacity duration-1000 ${isReady ? 'opacity-100' : 'opacity-0'}`}
                onEnded={handleVideoEnd}
                onLoadedData={handleVideoReady}
                onError={handleVideoError}
                playsInline
                autoPlay
                controls={false}
              />
              
              {!isReady && !error && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-black z-20">
                   <motion.div 
                     animate={{ rotate: 360 }}
                     transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                     className="w-24 h-24 border-2 border-red-500/20 border-t-red-500 rounded-full"
                   />
                   <span className="text-red-500 font-mono text-xs animate-pulse tracking-widest uppercase">{t.loading}</span>
                </div>
              )}

              {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a] text-white flex-col gap-6 md:gap-10 p-6 md:p-12 text-center z-20">
                   <div className="relative group">
                      <div className="absolute inset-0 bg-red-600 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                      <ShieldAlert className="w-24 h-24 text-red-500 relative z-10" />
                   </div>
                   <button 
                     onClick={() => setVideoEnded(true)}
                     className="relative px-14 py-5 bg-red-600 text-white font-black text-xl rounded-2xl shadow-[0_20px_60px_rgba(255,0,0,0.4)] hover:scale-105 transition-all"
                   >
                     {lang === 'en' ? 'SKIP' : 'تخطي'}
                   </button>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {videoEnded && (
          <motion.div
            key="final"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-[#050505] p-3 md:p-6 text-center"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.15)_0%,transparent_60%)]" />

            <motion.div
              initial={{ y: 200, opacity: 0, rotateX: 20 }}
              animate={{
                y: [0, -10, 0],
                opacity: 1,
                rotateX: 0,
              }}
              transition={{
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                opacity: { duration: 1 },
                rotateX: { type: "spring", damping: 15, stiffness: 45 }
              }}
              className="relative w-full max-w-[90vw] md:max-w-4xl aspect-square md:aspect-video max-h-[50vh] md:max-h-none rounded-[20px] md:rounded-[40px] overflow-hidden border-2 border-red-500/40 shadow-[0_0_100px_rgba(255,0,0,0.4),inset_0_0_40px_rgba(255,0,0,0.2)] perspective-1000 z-10"
            >
              <img
                src={FINAL_IMAGE}
                className="w-full h-full object-cover select-none pointer-events-none transform hover:scale-105 transition-transform duration-1000"
                alt="Celebration"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 rounded-[30px] md:rounded-[40px] border border-white/20 pointer-events-none mix-blend-overlay"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-8 md:mt-16 relative z-20"
            >
              <button
                onClick={onClose}
                className="px-8 py-4 md:px-20 md:py-6 rounded-full bg-gradient-to-r from-red-600 via-red-500 to-red-800 text-white font-black text-lg md:text-2xl hover:scale-110 active:scale-95 transition-all duration-300 shadow-[0_15px_50px_rgba(255,0,0,0.5)] relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center gap-3 tracking-widest uppercase drop-shadow-md">
                  {t.close}
                </span>
                <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 z-0"></div>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity z-0" />
              </button>
            </motion.div>

            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: typeof window !== 'undefined' && window.innerWidth < 768 ? 15 : 40 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ x: Math.random() * window.innerWidth, y: window.innerHeight + 100, opacity: 0 }}
                  animate={{ y: -200, opacity: [0, 0.6, 0], scale: [1, 1.2, 0.5] }}
                  transition={{ duration: Math.random() * 10 + 5, repeat: Infinity, delay: Math.random() * 5 }}
                  className="absolute w-1.5 h-1.5 bg-red-500 rounded-full blur-[1px] shadow-[0_0_15px_#FF0000]"
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
