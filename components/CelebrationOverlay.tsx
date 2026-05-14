import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

interface CelebrationOverlayProps {
  onClose: () => void;
  lang: 'en' | 'ar';
}

const VIDEO_URL = "/Golden_confetti_flies__sword_pulses_202605130013-_2_.mp4";
const FINAL_IMAGE = "/e4277d6d-eb27-4f41-9ec1-8a45944eb3a3%20(1).jpg";

export const CelebrationOverlay: React.FC<CelebrationOverlayProps> = ({ onClose, lang }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [error, setError] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [needsInteraction, setNeedsInteraction] = useState(false);
  const endedRef = useRef(false);

  React.useEffect(() => {
    const t = setTimeout(() => {
      if (!endedRef.current) {
        endedRef.current = true;
        setVideoEnded(true);
        triggerConfetti();
      }
    }, 8000);
    return () => clearTimeout(t);
  }, []);

  const t = {
    en: {
      close: "Enter Hub",
      loading: "INITIALIZING STREAM...",
      play: "▶ WATCH"
    },
    ar: {
      close: "دخول المركز",
      loading: "جاري التحميل...",
      play: "▶ شاهد"
    }
  }[lang];

  const handleVideoEnd = () => {
    endedRef.current = true;
    setVideoEnded(true);
    triggerConfetti();
  };

  const attemptPlay = () => {
    if (videoRef.current) {
        setNeedsInteraction(false);
        videoRef.current.play().catch(() => {
            endedRef.current = true;
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
                className={`w-full h-full object-cover transition-opacity duration-1000 ${isReady && !needsInteraction ? 'opacity-100' : 'opacity-0'}`}
                onEnded={handleVideoEnd}
                onLoadedData={handleVideoReady}
                onError={handleVideoError}
                playsInline
                autoPlay
                controls={false}
              />
              
              {!isReady && !error && !needsInteraction && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-black z-20">
                   <motion.div 
                     animate={{ rotate: 360 }}
                     transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                     className="w-24 h-24 border-2 border-red-500/20 border-t-red-500 rounded-full"
                   />
                   <span className="text-red-500 font-mono text-xs animate-pulse tracking-widest uppercase">{t.loading}</span>
                </div>
              )}

              {needsInteraction && (
                <motion.div
                  onClick={attemptPlay}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 z-30 flex items-center justify-center cursor-pointer"
                >
                  {/* Animated gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-red-950/40 to-black/90" />
                  
                  {/* Pulsing rings */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0.8, opacity: 0.5 }}
                        animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.3, 0.1, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity, delay: i * 1 }}
                        className="absolute w-64 h-64 md:w-96 md:h-96 rounded-full border border-red-500/20"
                      />
                    ))}
                  </div>

                  {/* Center content */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{ type: "spring", damping: 15, delay: 0.3 }}
                    className="relative flex flex-col items-center gap-6"
                  >
                    {/* Icon with glow */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-red-500 blur-[80px] opacity-40 animate-pulse" />
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="relative w-20 h-20 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-red-500 to-red-900 flex items-center justify-center shadow-[0_0_60px_rgba(255,0,0,0.4)]"
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 md:w-14 md:h-14 text-white ml-1">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </motion.div>
                    </div>

                    {/* Text */}
                    <div className="text-center">
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="text-white/90 font-black text-xl md:text-3xl tracking-wider"
                      >
                        {lang === 'en' ? '🎉 CELEBRATION' : '🎉 احتفالية'}
                      </motion.p>
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="text-white/40 text-sm md:text-base mt-2 tracking-wide"
                      >
                        {lang === 'en' ? 'Tap anywhere to begin' : 'اضغط في أي مكان للبدء'}
                      </motion.p>
                    </div>

                    {/* Bottom hint */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.5, 0] }}
                      transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
                      className="flex items-center gap-2 text-white/30 text-xs"
                    >
                      <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                      <span>{lang === 'en' ? 'Click anywhere' : 'اضغط في أي مكان'}</span>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}

              {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a] text-white flex-col gap-6 md:gap-10 p-6 md:p-12 text-center z-20">
                   <button 
                     onClick={() => setVideoEnded(true)}
                     className="relative px-10 py-4 bg-white/10 backdrop-blur-md text-white font-bold text-lg rounded-2xl border border-white/10 hover:bg-white/20 transition-all hover:scale-105"
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
