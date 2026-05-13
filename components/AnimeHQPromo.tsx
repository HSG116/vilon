import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface AnimeHQPromoProps {
    lang: 'en' | 'ar';
}

export const AnimeHQPromo: React.FC<AnimeHQPromoProps> = ({ lang }) => {
    const [isVisible, setIsVisible] = useState(false);
    const isRTL = lang === 'ar';

    useEffect(() => {
        // Check if user has already dismissed the promo
        const isDismissed = localStorage.getItem('anime_promo_dismissed');
        if (isDismissed) return;

        // Show after a short delay
        const timer = setTimeout(() => setIsVisible(true), 2500);
        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        localStorage.setItem('anime_promo_dismissed', 'true');
    };

    const text = isRTL 
        ? "افضل موقع انمي بالتاريخ ومع استخدامك لكود (VLN30) يجيك خصم 30% عالاشتراكات"
        : "The best anime site in history! Use code (VLN30) for a 30% discount on subscriptions.";
    
    const buttonText = isRTL ? "تصفح الموقع" : "Browse Site";

    return (
        <AnimatePresence>
            {isVisible && (
                    <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="fixed bottom-4 md:bottom-auto md:top-24 right-4 md:right-8 z-[999] max-w-[calc(100%-2rem)] md:max-w-[450px] w-full"
                >
                    <div className="relative group overflow-hidden rounded-[16px] md:rounded-[24px] p-[1px] bg-gradient-to-r from-yellow-500/20 via-white/10 to-yellow-500/20 shadow-[0_8px_20px_rgba(0,0,0,0.5)] md:shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                        {/* Shimmer Border effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[2000ms] ease-linear pointer-events-none"></div>
                        
                        <div className="relative bg-[#0a0a0a]/98 backdrop-blur-3xl rounded-[15px] md:rounded-[23px] p-2 md:p-5">
                            {/* Gradient Accents */}
                            <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/10 blur-[40px] opacity-20 pointer-events-none"></div>

                            {/* Close button */}
                            <button 
                                onClick={handleClose}
                                className="absolute top-1 right-1 text-white/20 hover:text-white transition-colors p-1.5 z-30"
                            >
                                <svg className="w-3 h-3 md:w-3.5 md:h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <div className={`relative z-10 flex items-center gap-2 md:gap-6 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                                {/* Logo Section */}
                                <div className="shrink-0">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-yellow-500/20 blur-md opacity-40"></div>
                                        <img 
                                            src="https://animhq.com/wp-content/themes/animhq/Interface/images/LOGO2.png" 
                                            alt="AnimeHQ Logo" 
                                            className="h-5 md:h-10 object-contain relative z-10"
                                        />
                                    </div>
                                </div>
                                
                                {/* Info Section */}
                                <div className={`flex-1 min-w-0 ${isRTL ? 'text-right' : 'text-left'}`}>
                                    <p className="text-white/90 text-[8px] md:text-xs font-bold leading-tight mb-1 line-clamp-1 md:line-clamp-2 md:mb-1.5">
                                        {text}
                                    </p>
                                    
                                    <div className={`flex items-center gap-1.5 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                                        <div className="bg-white/5 border border-yellow-500/20 rounded-md md:rounded-lg px-1 py-0.5 md:px-1.5 md:py-0.5 flex items-center gap-1 md:gap-1.5">
                                            <span className="text-[7px] md:text-[9px] font-black text-yellow-500/60 uppercase tracking-tighter">{isRTL ? 'كود' : 'CODE'}</span>
                                            <span className="text-[9px] md:text-sm font-black text-yellow-500 tracking-wider">VLN30</span>
                                        </div>
                                        <div className="h-1 w-1 rounded-full bg-white/20"></div>
                                        <span className="text-[8px] md:text-[10px] font-black text-yellow-500 uppercase">{isRTL ? 'خصم 30%' : '30% OFF'}</span>
                                    </div>
                                </div>

                                {/* CTA Section - Hidden on mobile, visible on md+ */}
                                <div className="shrink-0 hidden md:block">
                                    <a 
                                        href="https://animhq.com/" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="bg-yellow-500 hover:bg-yellow-400 text-black font-black px-4 py-2 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-[0_4px_12px_rgba(234,179,8,0.3)] active:scale-95 text-xs"
                                    >
                                        <span>{buttonText}</span>
                                        <svg className={`w-3 h-3 transition-transform ${isRTL ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </a>
                                </div>

                                {/* Mobile CTA - compact version */}
                                <div className="shrink-0 md:hidden">
                                     <a 
                                        href="https://animhq.com/" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="w-8 h-8 bg-yellow-500 text-black rounded-lg flex items-center justify-center shadow-lg active:scale-90"
                                    >
                                        <svg className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
