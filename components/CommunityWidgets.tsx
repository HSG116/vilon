import React, { useState, useEffect } from 'react';
import { DiscordIcon, YoutubeIcon } from './Icons';
import { Language } from '../types';

interface DiscordData {
   name: string;
   instant_invite: string;
   presence_count: number;
   members: Array<{
      username: string;
      avatar_url: string;
      status: string;
      game?: {
         name: string;
      };
   }>;
   channels: Array<{
      id: string;
      name: string;
   }>;
}

interface YoutubeData {
   title: string;
   link: string;
   date: string;
   thumbnail: string;
}

interface CommunityWidgetsProps {
   lang: Language;
}

export const DiscordWidget: React.FC<CommunityWidgetsProps> = ({ lang }) => {
   const [data, setData] = useState<DiscordData | null>(null);
   const [loading, setLoading] = useState(true);
   const SERVER_ID = '1266325754950451220';

   useEffect(() => {
      const fetchDiscord = async () => {
         try {
            const response = await fetch(`https://discord.com/api/guilds/${SERVER_ID}/widget.json`);
            const json = await response.json();
            
            // If widget is disabled, we'll still try to show basic info
            if (json.code === 50004 || !json.instant_invite) {
               setData({
                  name: 'VILON COMMUNITY',
                  instant_invite: 'https://discord.gg/H8ujXwHkHT',
                  presence_count: 230,
                  members: [],
                  channels: []
               });
            } else {
               setData(json);
            }
         } catch (err) {
            console.error('Discord fetch error:', err);
         } finally {
            setLoading(false);
         }
      };
      fetchDiscord();
      const interval = setInterval(fetchDiscord, 60000);
      return () => clearInterval(interval);
   }, []);

   if (loading || !data) {
      return (
         <div className="h-[240px] w-full bg-[#0a0b14] rounded-[32px] animate-pulse border border-white/5" />
      );
   }

   const isRTL = lang === 'ar';
   const activeMembers = data.members.filter((m: any) => m.game);
   const squadAvatars = data.members.slice(0, 8);

   return (
      <div className="group relative flex flex-col h-auto min-h-[260px] w-full bg-[#0a0b14]/95 backdrop-blur-3xl border border-white/10 rounded-[32px] overflow-hidden transition-all duration-700 hover:border-[#5865F2]/50 hover:shadow-[0_0_80px_rgba(88,101,242,0.2)]">
         {/* BACKGROUND LINK */}
         <a
            href={data.instant_invite}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 z-40"
            aria-label="Join Discord"
         />

         {/* Background Subtle Gradient */}
         <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(88,101,242,0.1),transparent_40%)]"></div>
            <div className="absolute inset-0 opacity-[0.03] bg-[size:20px_20px] bg-[radial-gradient(circle,white_1px,transparent_1px)]"></div>
         </div>

         {/* TOP ACCENT LINE */}
         <div className="absolute top-0 inset-x-0 h-[4px] bg-gradient-to-r from-transparent via-[#5865F2] to-transparent z-20"></div>

         <div className="relative z-10 flex flex-col h-full p-6 md:p-8">
            {/* Header: Compact Identity */}
            <div className={`flex items-center gap-5 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
               <div className="relative shrink-0">
                  <div className="absolute -inset-2 bg-[#5865F2] blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                  <div className="relative w-16 h-16 rounded-2xl p-0.5 bg-[#1a1c2c] border border-white/15 shadow-2xl overflow-hidden transform group-hover:scale-105 transition-transform duration-500">
<img src="https://github.com/himedz116-hue/PNG/blob/main/%D8%AA%D8%B5%D9%85%D9%8A%D9%85%20%D8%A8%D8%AF%D9%88%D9%86%20%D8%B9%D9%86%D9%88%D8%A7%D9%86%20(3)%20(1).png?raw=true" className="w-full h-full object-cover rounded-[14px]" alt="Vilon" loading="lazy" decoding="async" />
                   </div>
                </div>

                <div className={`flex-1 min-w-0 ${isRTL ? 'text-right' : 'text-left'}`}>
                   <h2 className="text-xl md:text-2xl font-black text-white tracking-widest leading-none mb-2 uppercase transition-colors group-hover:text-blue-400">
                     {data.name || 'VILON COMMUNITY'}
                  </h2>
                  <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                     <div className="px-3 py-1 bg-[#5865F2]/20 border border-[#5865F2]/30 rounded-full flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                        <span className="text-[10px] font-black text-[#5865F2] uppercase tracking-wider">{data.presence_count} ONLINE</span>
                     </div>
                  </div>
               </div>
            </div>

            {/* Middle Section: Clean Bento Layout */}
            <div className={`flex flex-col sm:flex-row items-center justify-between gap-6 py-5 border-y border-white/5 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
               {/* Left: Squad Avatars */}
               <div className={`flex flex-col gap-3 ${isRTL ? 'items-end' : 'items-start'}`}>
                  <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">{lang === 'en' ? 'SQUAD MEMBERS' : 'الأعضاء'}</span>
                  <div className={`flex -space-x-3 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                     {squadAvatars.length > 0 ? squadAvatars.map((m: any, i: number) => (
                        <div key={i} className="relative group/avatar">
                           <img src={m.avatar_url} className="w-10 h-10 rounded-full border-2 border-[#0a0b14] bg-[#1a1c2c] shadow-lg transition-transform hover:scale-110 hover:z-20" alt="U" />
                           <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-[#0a0b14]"></div>
                        </div>
                     )) : (
                        <div className="flex -space-x-2">
                            {[1,2,3].map(i => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0a0b14] bg-[#1a1c2c] animate-pulse" />
                            ))}
                        </div>
                     )}
                     {data.presence_count > squadAvatars.length && (
                        <div className="w-10 h-10 rounded-full border-2 border-[#0a0b14] bg-[#1a1c2c] flex items-center justify-center text-[10px] font-black text-white/50">
                           +{data.presence_count - squadAvatars.length}
                        </div>
                     )}
                  </div>
               </div>

               {/* Right: Live Status */}
               <div className={`flex flex-col gap-3 ${isRTL ? 'items-end text-right' : 'items-start text-left'}`}>
                  <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">{lang === 'en' ? 'LIVE NOW' : 'نشط الآن'}</span>
                  <div className="flex items-center gap-3 bg-white/[0.03] px-5 py-2.5 rounded-2xl border border-white/5 backdrop-blur-xl">
                     <DiscordIcon className="w-4 h-4 text-[#5865F2]" />
                     <p className="text-xs font-bold text-white/90 line-clamp-1">
                        {activeMembers.length > 0 ? activeMembers[0].game.name : (lang === 'en' ? 'SQUAD READY' : 'الكل جاهز')}
                     </p>
                  </div>
               </div>
            </div>

            {/* Bottom Action Section: Integrated Button */}
            <div className={`mt-auto pt-6 flex items-center justify-between gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
               <div className={`hidden md:flex flex-col ${isRTL ? 'items-end text-right' : 'items-start text-left'}`}>
                  <span className="text-2xl font-black text-white leading-none mb-1">2,374</span>
                  <span className="text-[10px] font-bold text-[#5865F2] uppercase tracking-[0.3em]">{lang === 'en' ? 'TOTAL GIANTS' : 'عضو بالسرير'}</span>
               </div>
               
               <div className="relative group/btn w-full md:w-auto overflow-hidden rounded-2xl">
                  <div className="absolute inset-0 bg-[#5865F2] translate-y-[100%] group-hover/btn:translate-y-0 transition-transform duration-500"></div>
                  <div className="relative px-10 py-4 bg-[#5865F2]/10 border border-[#5865F2]/30 rounded-2xl group-hover/btn:border-transparent flex items-center justify-center gap-3 transition-all shadow-xl">
                     <span className={`text-[13px] font-black text-[#5865F2] group-hover/btn:text-white transition-colors uppercase tracking-[0.2em] ${isRTL ? 'font-arabic' : ''}`}>
                        {lang === 'en' ? 'DEPLOY SQUAD' : 'انـضـم الآن'}
                     </span>
                     <svg className={`w-4 h-4 text-[#5865F2] group-hover/btn:text-white transition-all group-hover/btn:translate-x-1 ${isRTL ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                     </svg>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export const YoutubeWidget: React.FC<CommunityWidgetsProps> = ({ lang }) => {
   const [video, setVideo] = useState<YoutubeData | null>(null);
   const [subs, setSubs] = useState<string>('--');
   const [loading, setLoading] = useState(true);
   const channelUrl = 'https://www.youtube.com/@vilon45';

   useEffect(() => {
      const fetchVideo = async () => {
         const activeChannelId = 'UCarKxFdTOwury7d9OCj5kZQ';
         try {
            const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${activeChannelId}`;
            const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.items && data.items.length > 0) {
               const latest = data.items[0];
               setVideo({
                  title: latest.title,
                  link: latest.link,
                  date: new Date(latest.pubDate).toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
                  thumbnail: latest.thumbnail.replace('hqdefault.jpg', 'maxresdefault.jpg')
               });
            }
         } catch (err) {
            console.error('YouTube fetch error:', err);
            setVideo({
               title: lang === 'en' ? 'ULTRA ELITE GAMING CONTENT' : 'أقـوى مـحـتوى ألعاب - Vilon',
               link: channelUrl,
               date: 'LATEST',
               thumbnail: 'https://github.com/himedz116-hue/PNG/blob/main/%D8%AA%D8%B5%D9%85%D9%8A%D9%85%20%D8%A8%D8%AF%D9%88%D9%86%20%D8%B9%D9%86%D9%88%D8%A7%D9%86%20(3)%20(1).png?raw=true'
            });
         }
         
         try {
            const statsRes = await fetch(`https://api.socialcounts.org/youtube-live-subscriber-count/${activeChannelId}`);
            const statsData = await statsRes.json();
            const count = statsData?.counters?.api?.subscriberCount || statsData?.counters?.estimation?.subscriberCount;
            if (count) {
               let formatted = new Intl.NumberFormat('en-US', { notation: "compact", maximumFractionDigits: 1 }).format(count);
               setSubs(formatted);
            }
         } catch (err) {
            console.error('YouTube stats fetch error:', err);
         } finally {
            setLoading(false);
         }
      };
      fetchVideo();
   }, [lang]);

   if (loading && !video) {
      return (
         <div className="h-[260px] w-full bg-[#050000] rounded-[32px] animate-pulse border border-white/5" />
      );
   }

   const isRTL = lang === 'ar';

   return (
      <div className="group relative flex flex-col h-auto min-h-[260px] w-full bg-[#050000]/95 backdrop-blur-3xl border border-white/10 rounded-[32px] overflow-hidden transition-all duration-700 hover:border-[#FF0000]/50 hover:shadow-[0_0_80px_rgba(255,0,0,0.2)]">
         {/* BACKGROUND LINK */}
         <a
            href={video?.link || channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 z-40"
            aria-label="Visit Channel"
         />

         {/* Decorative Background Subtle Gradient */}
         <div className="absolute inset-0 z-0">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(255,0,0,0.08),transparent_40%)]"></div>
            <div className="absolute inset-0 opacity-[0.03] bg-[size:20px_20px] bg-[radial-gradient(circle,white_1px,transparent_1px)]"></div>
         </div>

         {/* TOP ACCENT LINE */}
         <div className="absolute top-0 inset-x-0 h-[4px] bg-gradient-to-r from-transparent via-[#FF0000] to-transparent z-20"></div>

         <div className="relative z-10 flex flex-col h-full p-6 md:p-8">
            {/* Header: Identity Compact */}
            <div className={`flex items-center gap-5 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
               <div className="relative shrink-0">
                  <div className="absolute -inset-2 bg-[#FF0000] blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                  <div className="relative w-16 h-16 rounded-2xl p-0.5 bg-[#050000] border border-white/15 shadow-2xl overflow-hidden transform group-hover:scale-105 transition-transform duration-500">
<img src="https://github.com/himedz116-hue/PNG/blob/main/%D8%AA%D8%B5%D9%85%D9%8A%D9%85%20%D8%A8%D8%AF%D9%88%D9%86%20%D8%B9%D9%86%D9%88%D8%A7%D9%86%20(3)%20(1).png?raw=true" className="w-full h-full object-cover rounded-[14px]" alt="Vilon" loading="lazy" decoding="async" />
                   </div>
                </div>

                <div className={`flex-1 min-w-0 ${isRTL ? 'text-right' : 'text-left'}`}>
                   <h2 className="text-xl md:text-2xl font-black text-white tracking-widest leading-none mb-2 uppercase transition-colors group-hover:text-red-500">
                     VILON
                  </h2>
                  <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                     <div className="px-3 py-1 bg-[#FF0000]/20 border border-[#FF0000]/30 rounded-full flex items-center gap-2">
                        <YoutubeIcon className="w-3.5 h-3.5 text-[#FF0000]" />
                        <span className="text-[10px] font-black text-[#FF0000] uppercase tracking-widest">{subs} {lang === 'en' ? 'SUBS' : 'مشترك'}</span>
                     </div>
                  </div>
               </div>
            </div>

            {/* Content: Compact Video Row */}
            <div className={`flex items-center gap-5 py-5 border-y border-white/5 ${isRTL ? 'flex-row-reverse' : ''}`}>
               {/* Thumbnail */}
               <div className="relative w-28 md:w-36 aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-xl group/video shrink-0 bg-[#0f0f0f]">
                  <img
                     src={video?.thumbnail}
                     className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                     alt="Video"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors">
                     <div className="w-8 h-8 rounded-full bg-[#FF0000] border border-white/20 flex items-center justify-center transform group-hover/video:scale-110 shadow-lg transition-transform">
                        <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                     </div>
                  </div>
               </div>

               {/* Video Mini Details */}
               <div className={`flex-1 min-w-0 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <p className="text-[10px] font-black text-[#FF0000] uppercase tracking-[0.3em] mb-1.5">{lang === 'en' ? 'LATEST CONTENT' : 'الأحدث'}</p>
                  <h3 className="text-sm md:text-base font-black text-white/90 leading-snug line-clamp-2 mb-2 group-hover:text-white transition-colors">
                     {video?.title}
                  </h3>
                  <div className="flex items-center gap-2">
                     <span className="px-2 py-0.5 bg-white/5 rounded text-[8px] font-black text-white/40 uppercase tracking-widest">4K-HDR</span>
                     <span className="text-[10px] font-bold text-white/20 uppercase tracking-wider">{video?.date}</span>
                  </div>
               </div>
            </div>

            {/* Footer Action Area */}
            <div className={`mt-auto pt-6 flex items-center justify-between gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
               <div className={`hidden md:flex flex-col ${isRTL ? 'items-end text-right' : 'items-start text-left'}`}>
                  <span className="text-2xl font-black text-white leading-none mb-1 uppercase tracking-tighter">WATCH</span>
                  <span className="text-[10px] font-bold text-[#FF0000] uppercase tracking-[0.4em] leading-none">{lang === 'en' ? 'CREATOR HUB' : 'صانع محتوى'}</span>
               </div>
               
               <div className="relative group/btn w-full md:w-auto overflow-hidden rounded-xl">
                  <div className="absolute inset-0 bg-[#FF0000] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500"></div>
                  <div className="relative flex items-center justify-center gap-3 px-10 py-4 bg-[#FF0000]/10 border border-[#FF0000]/30 rounded-2xl group-hover/btn:border-transparent transition-all shadow-xl">
                     <span className={`text-[13px] font-black text-[#FF0000] group-hover/btn:text-white transition-colors uppercase tracking-[0.2em] ${isRTL ? 'font-arabic' : ''}`}>
                        {lang === 'en' ? 'EXPLORE CHANNEL' : 'شـاهـد الآن'}
                     </span>
                     <div className="w-5 h-5 rounded-full bg-white/10 backdrop-blur-md text-white flex items-center justify-center shrink-0 border border-white/20 group-hover/btn:bg-white group-hover/btn:text-[#FF0000]">
                        <svg className={`w-3 h-3 ${isRTL ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};




