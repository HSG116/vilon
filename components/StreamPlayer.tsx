import React, { useState } from 'react';
import { Language } from '../types';

interface StreamPlayerProps {
  lang: Language;
  isLive: boolean;
  viewers: number;
  channelSlug: string;
  poster?: string;
}

export const StreamPlayer: React.FC<StreamPlayerProps> = ({ lang, isLive, viewers, channelSlug, poster }) => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  const t = {
    offline: lang === 'en' ? 'OFFLINE' : 'غير متصل',
    refresh: lang === 'en' ? 'Refresh Player' : 'تحديث البث',
  };

  return (
    <div className="relative w-full h-full bg-black rounded-2xl overflow-hidden group perspective-1000 shadow-2xl border border-white/10">

      {/* --- PLAYER ELEMENT --- */}
      {isLive ? (
        <>
          <div className="absolute top-4 left-4 z-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
             <button 
                onClick={handleRefresh}
                title={t.refresh}
                className="p-2 bg-black/60 hover:bg-[#53FC18]/80 text-white rounded-full backdrop-blur-md transition-colors border border-white/10 shadow-lg"
             >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
             </button>
          </div>
          <iframe
            key={refreshKey}
            src={`https://player.kick.com/${channelSlug}?autoplay=true&muted=true`}
            className="w-full h-full border-0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title="Kick Stream"
          />
        </>
      ) : (
        <div className="relative w-full h-full group/offline">
          {poster && <img src={poster} className="w-full h-full object-cover opacity-40 transition-transform duration-1000 group-hover/offline:scale-110" alt="Offline Poster" />}
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-[2px] z-30">
            <div className="text-center space-y-6 p-8">
              <div className="relative w-24 h-24 mx-auto">
                <div className="absolute inset-0 bg-[#FF0000]/20 rounded-full blur-xl animate-pulse"></div>
                <div className="relative w-full h-full rounded-full bg-black/40 border border-white/10 flex items-center justify-center backdrop-blur-md">
                   <svg className="w-10 h-10 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                   </svg>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-white/40 font-black tracking-[0.5em] text-xs uppercase">{t.offline}</p>
                <h3 className="text-white text-xl md:text-2xl font-black tracking-tight uppercase">
                   {lang === 'en' ? 'Check Last Stream Below' : 'شاهد ملخص البث السابق بالأسفل'}
                </h3>
              </div>
            </div>
          </div>
          
          {/* Animated Gradient Edge */}
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-[#FF0000] to-transparent opacity-50"></div>
        </div>
      )}
    </div>
  );
};