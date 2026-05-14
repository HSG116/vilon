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
  const [showOverlay, setShowOverlay] = useState(true);
  const [showFinal, setShowFinal] = useState(false);
  const endedRef = useRef(false);

  const t = {
    en: {
      close: "Enter Hub",
      play: "WATCH"
    },
    ar: {
      close: "دخول المركز",
      play: "شاهد"
    }
  }[lang];

  const startVideo = () => {
    if (!videoRef.current) return;
    setShowOverlay(false);
    videoRef.current.play().catch(() => {
      endedRef.current = true;
      setVideoEnded(true);
      setShowFinal(true);
      triggerConfetti();
    });
  };

  const handleVideoEnd = () => {
    endedRef.current = true;
    setVideoEnded(true);
    setShowFinal(true);
    triggerConfetti();
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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black overflow-hidden select-none font-sans">
      <AnimatePresence mode="wait">
        {showOverlay && !showFinal && (
          <motion.div
            key="overlay"
            onClick={startVideo}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 z-40 flex items-center justify-center cursor-pointer"
          >
            {/* Dynamic gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-black via-[#1a0000] to-black" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,0,0.08),transparent_70%)]" />

            {/* Floating orbs */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    x: [Math.random() * 100 - 50, Math.random() * 100 - 50],
                    y: [Math.random() * 100 - 50, Math.random() * 100 - 50],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ duration: 8 + i * 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute w-32 h-32 md:w-48 md:h-48 rounded-full blur-[100px] opacity-30"
                  style={{
                    background: `radial-gradient(circle, rgba(255,${50 + i * 50},0,0.4), transparent)`,
                    top: `${20 + i * 30}%`,
                    left: `${10 + i * 35}%`,
                  }}
                />
              ))}
            </div>

            {/* Pulsing rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0.8, opacity: 0.4 }}
                  animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.4, 0.1, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 1 }}
                  className="absolute w-72 h-72 md:w-[500px] md:h-[500px] rounded-full border border-red-500/15"
                />
              ))}
            </div>

            {/* Sparkle particles */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 0.8, 0],
                    scale: [0, 1, 0],
                    x: [0, Math.random() * 100 - 50],
                    y: [0, Math.random() * -100 - 50],
                  }}
                  transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 3 }}
                  className="absolute w-1 h-1 bg-red-400 rounded-full shadow-[0_0_10px_rgba(255,0,0,0.8)]"
                  style={{ top: `${40 + Math.random() * 20}%`, left: `${40 + Math.random() * 20}%` }}
                />
              ))}
            </div>

            {/* Center content */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: "spring", damping: 18, stiffness: 100, delay: 0.2 }}
              className="relative flex flex-col items-center gap-5 md:gap-8 z-10"
            >
              {/* Glowing play icon */}
              <div className="relative">
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-red-500 blur-[100px] opacity-40"
                />
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-red-500 via-red-600 to-red-900 flex items-center justify-center shadow-[0_0_80px_rgba(255,0,0,0.5)] border border-red-400/30"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 md:w-16 md:h-16 text-white ml-1.5">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </motion.div>
              </div>

              {/* Title */}
              <div className="text-center">
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-white font-black text-2xl md:text-4xl tracking-[0.15em] drop-shadow-[0_0_20px_rgba(255,0,0,0.5)]"
                >
                  {lang === 'en' ? 'CELEBRATION' : 'احتفالية'}
                </motion.p>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  className="h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent mt-3 mx-auto max-w-[60%]"
                />
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-red-400/60 text-xs md:text-sm mt-3 tracking-[0.2em] font-mono"
                >
                  {lang === 'en' ? 'TAP ANYWHERE TO PLAY' : 'اضغط في أي مكان للتشغيل'}
                </motion.p>
              </div>

              {/* Animated arrow */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.6, 0] }}
                transition={{ delay: 1.5, duration: 2.5, repeat: Infinity }}
                className="flex flex-col items-center gap-1 text-white/30"
              >
                <svg className="w-5 h-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                <span className="text-[10px] tracking-[0.3em] uppercase">{lang === 'en' ? 'START' : 'ابدأ'}</span>
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {!showOverlay && !showFinal && (
          <motion.div
            key="video"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-30 flex items-center justify-center bg-black"
          >
            <video
              ref={videoRef}
              src={VIDEO_URL}
              className="w-full h-full object-cover"
              onEnded={handleVideoEnd}
              playsInline
              autoPlay
              controls={false}
            />
          </motion.div>
        )}

        {showFinal && (
          <motion.div
            key="final"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-[#050505] p-4 md:p-8 text-center overflow-hidden"
          >
            {/* Background effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,0,0.1),transparent_60%)]" />
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    x: [Math.random() * 200 - 100, Math.random() * 200 - 100],
                    y: [Math.random() * 200 - 100, Math.random() * 200 - 100],
                  }}
                  transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute rounded-full blur-[150px] opacity-20"
                  style={{
                    background: `radial-gradient(circle, rgba(255,0,0,0.3), transparent)`,
                    width: `${100 + i * 50}px`,
                    height: `${100 + i * 50}px`,
                    top: `${10 + i * 20}%`,
                    left: `${10 + i * 20}%`,
                  }}
                />
              ))}
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: '100vh', opacity: 0 }}
                  animate={{ y: '-10vh', opacity: [0, 0.5, 0] }}
                  transition={{ duration: 5 + Math.random() * 10, repeat: Infinity, delay: Math.random() * 5 }}
                  className="absolute w-1 h-1 bg-red-500/60 rounded-full"
                  style={{ left: `${Math.random() * 100}%`, width: `${2 + Math.random() * 3}px`, height: `${2 + Math.random() * 3}px` }}
                />
              ))}
            </div>

            {/* Image container */}
            <motion.div
              initial={{ y: 100, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ type: "spring", damping: 20, stiffness: 80 }}
              className="relative w-full max-w-[85vw] md:max-w-4xl aspect-[3/4] md:aspect-video rounded-[24px] md:rounded-[40px] overflow-hidden border border-red-500/30 shadow-[0_0_120px_rgba(255,0,0,0.3)] z-10"
            >
              {/* Shimmer border */}
              <div className="absolute inset-0 z-20 rounded-[24px] md:rounded-[40px] pointer-events-none">
                <div className="absolute inset-0 rounded-[24px] md:rounded-[40px] bg-gradient-to-b from-transparent via-red-500/10 to-transparent opacity-50" />
              </div>

              <img
                src={FINAL_IMAGE}
                className="w-full h-full object-cover"
                alt="Celebration"
              />

              {/* Bottom gradient overlay */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
            </motion.div>

            {/* Enter Hub Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, type: "spring", damping: 15 }}
              className="mt-6 md:mt-10 relative z-20"
            >
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-12 py-4 md:px-24 md:py-5 rounded-full bg-gradient-to-b from-red-600 to-red-900 text-white font-black text-lg md:text-xl tracking-[0.15em] uppercase shadow-[0_0_60px_rgba(255,0,0,0.4)] border border-red-500/30 overflow-hidden group"
              >
                {/* Hover shine */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                {/* Top light */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1),transparent_60%)]" />
                <span className="relative z-10 flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  {t.close}
                </span>
              </motion.button>
            </motion.div>

            {/* Crown decoration at top */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              transition={{ delay: 0.8 }}
              className="absolute top-8 md:top-12 text-6xl md:text-8xl pointer-events-none"
            >
              👑
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
