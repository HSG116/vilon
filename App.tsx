import React, { useState, useEffect } from 'react';
import { KickIcon, XIcon, SnapchatIcon, DiscordIcon, TikTokIcon, WhatsAppIcon, InstagramIcon, YoutubeIcon, FacebookIcon, MailIcon } from './components/Icons';
import { SocialLink, Language } from './types';
import { StreamPlayer } from './components/StreamPlayer';
import { ChatWidget } from './components/Chat';
import { StatsSection } from './components/StatsSection';
import { DiscordWidget, YoutubeWidget } from './components/CommunityWidgets';
import { AnimeHQPromo } from './components/AnimeHQPromo';

// --- Constants ---
const DEFAULT_PROFILE_IMAGE = "https://github.com/himedz116-hue/PNG/blob/main/%D8%AA%D8%B5%D9%85%D9%8A%D9%85%20%D8%A8%D8%AF%D9%88%D9%86%20%D8%B9%D9%86%D9%88%D8%A7%D9%86%20(3)%20(1).png?raw=true";
import { kickFetch } from './utils/kickApi';

// Updated to Vilon backgrounds
const PC_BACKGROUND = "https://github.com/himedz116-hue/PNG/blob/main/2026051113557.jpeg?raw=true";
const MOBILE_BACKGROUND = "https://github.com/himedz116-hue/PNG/blob/main/202605111507.jpeg?raw=true";
const CHANNEL_SLUG = 'vilon';

// Helper to construct full social object
const createSocialLink = (key: string, value: string, followerCount?: string, specialDetail?: string): SocialLink | null => {
    if (!value) return null;
    const handle = value.replace(/^https?:\/\/(www\.)?(twitter|x|instagram|youtube|discord|tiktok|facebook|snapchat|whatsapp)\.com\//i, '')
        .replace(/\/channel\//i, '') // Clean up whatsapp channel part if simple regex
        .replace(/^@/, '')
        .replace(/\/$/, ''); // Remove trailing slash

    switch (key) {
        case 'twitter': return { name: 'X', url: value.startsWith('http') ? value : `https://x.com/${handle}`, icon: <XIcon className="w-8 h-8" />, color: '', username: `@${handle}`, hex: '#FFFFFF', followerCount, specialDetail };
        case 'instagram': return { name: 'Instagram', url: value.startsWith('http') ? value : `https://instagram.com/${handle}`, icon: <InstagramIcon className="w-8 h-8" />, color: '', username: `@${handle}`, hex: '#E1306C', followerCount, specialDetail };
        case 'youtube': return { name: 'YouTube', url: value.startsWith('http') ? value : `https://youtube.com/@${handle}`, icon: <YoutubeIcon className="w-8 h-8" />, color: '', username: 'Channel', hex: '#FF0000', followerCount, specialDetail };
        case 'discord': return { name: 'Discord', url: value.startsWith('http') ? value : `https://discord.gg/${handle}`, icon: <DiscordIcon className="w-8 h-8" />, color: '', username: 'Community', hex: '#5865F2', followerCount, specialDetail };
        case 'tiktok': return { name: 'TikTok', url: value.startsWith('http') ? value : `https://tiktok.com/@${handle}`, icon: <TikTokIcon className="w-8 h-8" />, color: '', username: `@${handle}`, hex: '#FE2C55', followerCount, specialDetail };
        case 'facebook': return { name: 'Facebook', url: value.startsWith('http') ? value : `https://facebook.com/${handle}`, icon: <FacebookIcon className="w-8 h-8" />, color: '', username: 'Page', hex: '#1877F2', followerCount, specialDetail };
        case 'snapchat': return { name: 'Snapchat', url: value.startsWith('http') ? value : `https://snapchat.com/add/${handle}`, icon: <SnapchatIcon className="w-8 h-8" />, color: '', username: 'vilon', hex: '#FFFC00', followerCount, specialDetail };
        case 'whatsapp': return { name: 'WhatsApp', url: value, icon: <WhatsAppIcon className="w-8 h-8" />, color: '', username: 'Group', hex: '#25D366', followerCount, specialDetail };
        default: return null;
    }
};

const KICK_SOCIAL: SocialLink = {
    name: 'KICK',
    url: 'https://kick.com/vilon',
    icon: <KickIcon className="w-8 h-8" />,
    color: '',
    username: 'Vilon',
    hex: '#53FC18', // Restored to Green
    followerCount: '121.1K',
    specialDetail: 'البث الأساسي والتفاعل المباشر'
};

const EMAIL_ADDRESS = ""; // Removed as not specified for Vilon

// Define Static Socials with specific requested order
const STATIC_SOCIALS = [
    KICK_SOCIAL,
    createSocialLink('youtube', 'https://youtube.com/@vilon45', '47.1K', 'أرشيف البثوث ومقاطع مميزة'),
    createSocialLink('twitter', 'https://x.com/vilon45', '19.2K', 'أخبار وتحديثات سريعة'),
    createSocialLink('discord', 'https://discord.gg/H8ujXwHkHT', '2.3K', 'أكبر تجمع للأساطير'),
    createSocialLink('snapchat', 'https://snapchat.com/add/vilon', '1.2M+', 'يوميات حصرية وتغطيات خاصة'),
].filter(Boolean) as SocialLink[];

const TRANSLATIONS = {
    en: {
        status: 'Online',
        statusOffline: 'Offline',
        headerTitle: 'VILON STREAM HUB',
        bio: 'Welcome to the official Vilon hub! Catch the best gaming streams and live content here daily.👑',
        tags: ['🎮 Gaming', '💬 Just Chatting', '🚀 Live'],
        defaultStreamTitle: 'CHECK OUT THE VODS | FOLLOW NOW',
        defaultCategory: 'Offline',
        footer: '© 2026 Vilon. All Rights Reserved.',
        poweredBy: 'POWERED BY VILON',
        subOnly: 'SUB ONLY',
        dropsEnabled: 'DROPS ENABLED',
        noTags: 'No tags',
        shareTitle: 'Vilon Stream Hub',
        shareText: 'Check out Vilon live on Kick!',
        copied: 'Link copied!',
        contact: 'Contact & Business',
        lastSessionReport: 'LAST SESSION REPORT',
        ago: 'AGO',
        duration: 'DURATION',
        categoriesSpent: 'CATEGORIES SPENT IN STREAM',
        highlights: 'STREAM HIGHLIGHTS',
        lastStreamTitle: 'أقوى تحديات فيلون في كود | العودة للمنافسة 🔥',
        lastStreamDesc: 'شكرًا لكل من حضر البث! كانت جلسة أسطورية مليئة باللقطات الحماسية والتفاعل. لا تنسوا المتابعة ليصلكم كل جديد. 👑'
    },
    ar: {
        status: 'متصل الآن',
        statusOffline: 'غير متصل',
        headerTitle: 'مركز Vilon للبث المباشر',
        bio: 'يا هلا فيكم في المركز الرسمي لـ Vilon! تابع أقوى البثوث والتحديات يوميا.👑',
        tags: ['🎮 ألعاب', '💬 سوالف', '🚀 بث مباشر'],
        defaultStreamTitle: 'تابع البثوث السابقة | تابعني الآن',
        defaultCategory: 'غير متصل',
        footer: '© 2026 Vilon. جميع الحقوق محفوظة.',
        poweredBy: 'بدعم من فيلون',
        subOnly: 'للمشتركين فقط',
        dropsEnabled: 'الجوائز مفعلة',
        noTags: 'لا يوجد وسوم',
        shareTitle: 'مركز بث Vilon',
        shareText: 'تابع بث Vilon المباشر على كيك!',
        copied: 'تم نسخ الرابط!',
        contact: 'للتواصل والإعلان',
        lastSessionReport: 'تقرير الجلسة الأخيرة',
        ago: 'منذ',
        duration: 'المدة',
        categoriesSpent: 'الفئات التي تم بثها',
        highlights: 'لقطات ممتعة من البث',
        lastStreamTitle: 'أقوى تحديات فيلون في كود | العودة للمنافسة 🔥',
        lastStreamDesc: 'شكرًا لكل من حضر البث! كانت جلسة أسطورية مليئة باللقطات الحماسية والتفاعل. لا تنسوا المتابعة ليصلكم كل جديد. 👑'
    }
};

// --- Vilon Custom Fallbacks ---
const VILON_DEFAULT_LAST_SESSION = {
    session_title: "أقوى تحديات فيلون في كود | العودة للمنافسة 🔥",
    created_at: new Date(Date.now() - 86400000).toISOString(),
    duration: 14400,
    categories: [{ name: "Call of Duty" }, { name: "Just Chatting" }],
    thumbnail: { url: "https://github.com/himedz116-hue/PNG/blob/main/2026051113557.jpeg?raw=true" }
};

const VILON_DEFAULT_CLIPS = [
    { id: 'v1', title: 'فيلون ضد الكل! 🔥', view_count: 15400, thumbnail_url: 'https://github.com/himedz116-hue/PNG/blob/main/2026051113557.jpeg?raw=true' },
    { id: 'v2', title: 'لحظة غدر غير متوقعة 😂', view_count: 12200, thumbnail_url: 'https://github.com/himedz116-hue/PNG/blob/main/2026051113557.jpeg?raw=true' },
    { id: 'v3', title: 'فيلون ينهي الجولة باحتراف 👑', view_count: 18900, thumbnail_url: 'https://github.com/himedz116-hue/PNG/blob/main/2026051113557.jpeg?raw=true' }
];

// --- Last Session Report Component ---
const LastSessionReport: React.FC<{ lang: Language, data: any, clips: any[] }> = ({ lang, data, clips }) => {
    if (!data && (!clips || clips.length === 0)) return null;

    const isRTL = lang === 'ar';

    const timeAgo = (date: string) => {
        if (!date) return '---';
        const now = new Date();
        const past = new Date(date);

        // Check if date is valid
        if (isNaN(past.getTime())) return '---';

        const diff = Math.floor((now.getTime() - past.getTime()) / 1000);

        if (diff < 60) return lang === 'en' ? `${diff}s ago` : `منذ ${diff} ثانية`;
        if (diff < 3600) return lang === 'en' ? `${Math.floor(diff / 60)}m ago` : `منذ ${Math.floor(diff / 60)} دقيقة`;
        if (diff < 86400) return lang === 'en' ? `${Math.floor(diff / 3600)}h ago` : `منذ ${Math.floor(diff / 3600)} ساعة`;
        return lang === 'en' ? `${Math.floor(diff / 86400)}d ago` : `منذ ${Math.floor(diff / 86400)} يوم`;
    };

    const formatDuration = (val: number) => {
        if (!val) return '0h 0m';
        // Kick durations are usually in milliseconds
        // If it's suspiciously large (e.g. > 1000000), it's definitely ms
        const totalSeconds = val > 1000000 ? Math.floor(val / 1000) : val;
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        return `${h}h ${m}m`;
    };

    const t = TRANSLATIONS[lang] as any;
    const thumbnail = data.thumbnail?.url || data.thumbnail?.src || (typeof data.thumbnail === 'string' ? data.thumbnail : '') || (data.responsive_url) || PC_BACKGROUND;

    return (
        <div className="w-full max-w-5xl mx-auto mt-24 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-[#0a0a0a]/70 backdrop-blur-2xl border border-white/15 rounded-[40px] p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative overflow-hidden group hover:bg-[#0a0a0a]/80 transition-colors duration-500">

                {/* Subtle Glow Backdrop */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF2D2D]/5 blur-[120px] -translate-y-1/2 translate-x-1/2 opacity-50 z-0"></div>

                <div className="relative z-10">
                    {/* Header Tag */}
                    <div className={`flex items-center gap-3 mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FF2D2D] shadow-[0_0_15px_#FF2D2D] animate-pulse"></div>
                        <span className="text-[11px] font-black tracking-[0.4em] text-white/40 uppercase">{t.lastSessionReport}</span>
                    </div>

                    {/* Main Content Body */}
                    <div className={`flex flex-col lg:flex-row gap-8 items-start ${isRTL ? 'lg:flex-row-reverse' : ''}`}>

                        {/* Thumbnail Image - Now Explicitly Beside Title */}
                        <div className="w-full lg:w-[320px] md:w-[400px] shrink-0 aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative group/img">
                            <img
                                src={thumbnail}
                                alt="Last Session"
                                loading="lazy"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        </div>

                        {/* Title and stats area */}
                        <div className="flex-1 flex flex-col w-full min-w-0">
                            <h2 className={`text-2xl md:text-3xl font-black text-white tracking-tight leading-tight w-full mb-3 ${isRTL ? 'text-right' : 'text-left'} drop-shadow-2xl`}>
                                {data.session_title || data.title || t.lastStreamTitle}
                            </h2>
                            <p className={`text-white/60 text-sm mb-8 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
                                {data.description || t.lastStreamDesc}
                            </p>

                            <div className={`grid grid-cols-2 md:grid-cols-3 gap-4 w-full ${isRTL ? 'flex-row-reverse' : ''}`}>
                                <div className="bg-white/5 border border-white/10 rounded-3xl px-4 py-5 text-center backdrop-blur-md hover:bg-white/10 transition-colors">
                                    <p className="text-[10px] font-bold text-white/30 uppercase mb-2 tracking-widest">{t.ago}</p>
                                    <p className="text-lg md:text-xl font-black text-white">{timeAgo(data.created_at)}</p>
                                </div>
                                <div className="bg-white/5 border border-white/10 rounded-3xl px-4 py-5 text-center backdrop-blur-md hover:bg-white/10 transition-colors">
                                    <p className="text-[10px] font-bold text-white/30 uppercase mb-2 tracking-widest">{t.duration}</p>
                                    <p className="text-lg md:text-xl font-black text-kick">{formatDuration(data.duration)}</p>
                                </div>
                                <div className="col-span-2 md:col-span-1 bg-white/5 border border-white/10 rounded-3xl px-4 py-5 text-center backdrop-blur-md hover:bg-white/10 transition-colors">
                                    <p className="text-[10px] font-bold text-white/30 uppercase mb-2 tracking-widest">{t.categoriesSpent}</p>
                                    <div className="flex justify-center -space-x-2">
                                        {data.categories?.slice(0, 3).map((cat: any, i: number) => (
                                            <div key={i} className="w-8 h-8 rounded-full border border-white/20 overflow-hidden bg-black">
                                                <img 
                                                    src={cat.banner?.url || cat.thumbnail?.url || `https://files.kick.com/categories/${cat.slug || 'just-chatting'}/fullsize.png`} 
                                                    className="w-full h-full object-cover" 
                                                    alt={cat.name} 
                                                    onError={(e) => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${cat.name}/100/100`; }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Highlights Section - Last 3 Clips */}
                    {clips && clips.length > 0 && (
                        <div className="mt-12 pt-8 border-t border-white/5">
                            <div className={`flex items-center gap-3 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                <div className="w-2 h-2 rounded-full bg-kick shadow-[0_0_10px_#53FC18]"></div>
                                <span className="text-[12px] font-black tracking-[0.2em] text-white/40 uppercase">{t.highlights}</span>
                            </div>

                            <div className="grid grid-cols-3 gap-2 md:gap-4">
                                {clips.slice(0, 3).map((clip: any, i: number) => (
                                    <a
                                        key={clip.id || i}
                                        href={`https://kick.com/${CHANNEL_SLUG}?clip=${clip.id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative aspect-video rounded-xl md:rounded-2xl overflow-hidden border border-white/5 bg-black/40 hover:border-kick/50 transition-all duration-500 shadow-lg"
                                        style={{ animationDelay: `${0.4 + i * 0.1}s` }}
                                    >
                                        <img
                                            src={clip.thumbnail_url || (clip.thumbnail?.url) || PC_BACKGROUND}
                                            alt={clip.title}
                                            loading="lazy"
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent"></div>

                                        {/* Play Icon Overlay */}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-kick/20 backdrop-blur-md border border-kick/50 flex items-center justify-center">
                                                <svg className="w-4 h-4 md:w-5 md:h-5 text-kick fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                            </div>
                                        </div>

                                        <div className={`absolute bottom-0 left-0 right-0 p-1.5 md:p-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                                            <p className="text-[7px] md:text-[11px] font-bold text-white truncate drop-shadow-md">{clip.title}</p>
                                            <div className={`flex items-center gap-1 md:gap-2 mt-0.5 md:mt-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                                <span className="text-[6px] md:text-[9px] text-white/40 font-medium whitespace-nowrap">
                                                    {clip.view_count || 0} {lang === 'en' ? 'views' : 'مشاهدة'}
                                                </span>
                                            </div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- Custom ABN Icon ---
const AbnIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M22 2H2v20l20-20z" />
    </svg>
);

const SocialCard: React.FC<{ social: SocialLink, index: number, className?: string }> = ({ social, index, className = '' }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isRedirecting, setIsRedirecting] = useState(false);
    const brandColor = social.hex || '#ffffff';

    // Determine text color based on background brightness (for Snapchat/Kick primarily)
    const isBrightBrand = social.name === 'Snapchat' || social.name === 'KICK';

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (isRedirecting) return;

        setIsRedirecting(true);

        // Reduce lag feeling: 400ms instead of 2000ms
        setTimeout(() => {
            window.open(social.url, '_blank');
            setTimeout(() => setIsRedirecting(false), 500);
        }, 400);
    };

    // Adjusted mobile height to h-36 (was h-32) to prevent text clipping after adding icon margins
    const containerClass = className.includes('h-') ? className : `h-36 md:h-32 ${className}`;

    return (
        <a
            href={social.url}
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ animationDelay: `${index * 100}ms` }}
            className={`group relative w-full animate-fade-in-up select-none ${isRedirecting ? 'z-50' : 'z-auto'} ${containerClass}`}
            title={`${social.name} - Vilon Official`}
            aria-label={`Visit Vilon on ${social.name}`}
        >
            {/* === BLACK INNER VIGNETTE EFFECT === */}
            <div className={`absolute inset-0 rounded-2xl bg-black/20 shadow-[inset_0_0_40px_rgba(0,0,0,0.7)] z-0`}></div>
            {/* === ACTIVE LAUNCH EFFECT (FULL SCREEN BLOOM) === */}
            {isRedirecting && (
                <div className="absolute inset-0 z-50 rounded-2xl animate-pulse" style={{ boxShadow: `0 0 50px ${brandColor}, inset 0 0 30px ${brandColor}` }}></div>
            )}

            {/* === SHADOW/GLOW BACKDROP === */}
            <div
                className={`absolute inset-0 rounded-2xl transition-all duration-500 blur-xl ${isRedirecting ? 'opacity-80 scale-105' : 'opacity-0 group-hover:opacity-100'}`}
                style={{ backgroundColor: brandColor }}
            ></div>

            {/* === PERIODIC SHINE ANIMATION LAYER === */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none z-20">
                {/* Wide sheen for unified wave effect */}
                <div
                    className="absolute top-[-100%] left-[-100%] w-[300%] h-[300%] bg-gradient-to-br from-transparent via-white/10 to-transparent animate-shine-periodic"
                    style={{ animationDelay: `${index * 0.08}s` }}
                ></div>
            </div>

            {/* === MAIN CARD CONTAINER === */}
            <div
                className={`
                relative h-full w-full rounded-2xl bg-black/40 backdrop-blur-2xl border overflow-hidden transition-all duration-500
                flex flex-col justify-center shadow-xl
                ${isRedirecting ? 'glitch-active border-transparent scale-95' : 'border-white/10 group-hover:border-white/30 group-hover:-translate-y-2 group-hover:bg-[#111111]/90 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)]'}
            `}
                style={{
                    borderColor: isRedirecting ? brandColor : (isHovered ? brandColor : 'rgba(255,255,255,0.1)'),
                }}
            >
                {/* BRAND BACKGROUND PATTERN (Added per user request) */}
                <div 
                    className="absolute inset-0 opacity-15 pointer-events-none group-hover:opacity-40 transition-all duration-1000 mix-blend-screen scale-100 group-hover:scale-110"
                    style={{ 
                        backgroundImage: "url('https://raw.githubusercontent.com/himedz116-hue/PNG/refs/heads/main/%D8%AA%D8%B5%D9%85%D9%8A%D9%85%20%D8%A8%D8%AF%D9%88%D9%86%20%D8%B9%D9%86%D9%88%D8%A7%D9%86%20(3)%20(1).png')", 
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}
                ></div>

                {/* === PROGRESS BAR (LAUNCHING) === */}
                {isRedirecting && (
                    <div className="absolute bottom-0 left-0 h-1.5 bg-white z-40 animate-charge" style={{ backgroundColor: brandColor, boxShadow: `0 0 10px ${brandColor}` }}></div>
                )}

                {/* === ANIMATED BACKGROUND GRADIENT === */}
                <div
                    className={`absolute inset-0 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/5 to-transparent bg-size-200 animate-gradient-x pointer-events-none ${isHovered || isRedirecting ? 'opacity-100' : 'opacity-0'}`}
                    style={{
                        backgroundImage: `linear-gradient(45deg, ${brandColor}10, transparent, ${brandColor}20)`
                    }}
                ></div>

                {/* === HOVER SHINE EFFECT === */}
                <div className={`absolute inset-0 -translate-x-full ${isHovered && !isRedirecting ? 'translate-x-full' : ''} transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12`}></div>

                {/* === CONTENT === */}
                <div className="relative h-full flex flex-col md:flex-row items-center px-4 md:px-6 justify-center md:justify-between z-10 gap-2 md:gap-0">

                    {/* LEFT: ICON + TEXT */}
                    <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-3 md:gap-5 min-w-0 w-full md:w-auto md:flex-1">
                        {/* Icon Container with 3D Rotate */}
                        <div
                            className={`
                            relative w-12 h-12 md:w-16 md:h-16 mt-3 md:mt-0 flex items-center justify-center rounded-2xl bg-[#151515] border shadow-2xl transition-all duration-500 shrink-0
                            ${isRedirecting ? 'rotate-12 scale-110' : 'group-hover:scale-110 group-hover:rotate-6'}
                        `}
                            style={{
                                color: (isHovered || isRedirecting) && isBrightBrand ? '#000' : brandColor,
                                backgroundColor: (isHovered || isRedirecting) && isBrightBrand ? brandColor : undefined,
                                borderColor: (isHovered || isRedirecting) ? brandColor : 'rgba(255,255,255,0.1)',
                                boxShadow: (isHovered || isRedirecting) ? `0 0 20px ${brandColor}40` : 'none'
                            }}
                        >
                            {/* Inner Scanner Shine (Mini HUD Effect) */}
                            <div className={`absolute inset-0 overflow-hidden rounded-xl opacity-0 ${isHovered ? 'opacity-100' : ''} transition-opacity duration-700 pointer-events-none`}>
                                <div className="absolute inset-x-0 h-1/3 bg-white/10 blur-md -top-1/3 profile-scanner bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
                            </div>
                            <div className="transition-colors duration-300">
                                {social.icon}
                            </div>
                        </div>

                        {/* Text Details */}
                        <div className="flex flex-col gap-0.5 items-center md:items-start text-center md:text-left min-w-0">
                            <div className="flex items-center gap-2">
                                <span
                                    className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-300"
                                    style={{ color: isRedirecting ? brandColor : (isHovered ? brandColor : 'rgba(255,255,255,0.4)') }}
                                >
                                    {isRedirecting ? 'LAUNCHING...' : social.name}
                                </span>
                                {social.followerCount && (
                                    <span className={`text-[8px] md:text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-white/10 text-white/60 border border-white/5 ${social.name === 'Snapchat' ? 'blur-[3px]' : ''}`}>
                                        {social.followerCount}
                                    </span>
                                )}
                            </div>
                            <span className={`text-sm md:text-lg font-black tracking-tighter transition-all duration-300 truncate max-w-[200px] md:max-w-none ${isRedirecting ? 'text-white scale-105' : 'text-white group-hover:text-white'}`}>
                                {social.username}
                            </span>
                            {/* Special Detail - Added as requested */}
                            {social.specialDetail && (
                                <span className={`text-[9px] md:text-[10px] font-medium transition-colors duration-300 ${isHovered ? 'text-white/80' : 'text-white/40'}`}>
                                    {social.specialDetail}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* RIGHT: ACTION ARROW (Hidden on mobile for cleaner 2-col look) */}
                    <div
                        className={`
                        hidden md:flex w-12 h-12 rounded-full items-center justify-center border transition-all duration-300 shrink-0 ml-2
                        ${isRedirecting ? 'opacity-100 scale-110 bg-white text-black' : 'opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 bg-white/5'}
                    `}
                        style={{
                            borderColor: isRedirecting ? 'white' : (isHovered ? brandColor : 'rgba(255,255,255,0.1)'),
                            backgroundColor: isRedirecting ? brandColor : undefined,
                            color: isRedirecting ? (isBrightBrand ? 'black' : 'white') : (isHovered && isBrightBrand ? brandColor : 'white')
                        }}
                    >
                        {isRedirecting ? (
                            <svg className="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        ) : (
                            <svg className="w-6 h-6 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        )}
                    </div>
                </div>

                {/* Mobile-only subtitle (rendered outside main flex flow if needed, but here simple flow works) */}
                {social.subtitle && (
                    <div className="md:hidden absolute bottom-2 left-0 right-0 flex justify-center">
                        <span className="text-[8px] text-white/60 font-medium leading-tight bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/5 max-w-[90%] text-center truncate">
                            {social.subtitle}
                        </span>
                    </div>
                )}
            </div>
        </a>
    );
};

// --- Multi-Provider Support Card Component ---
const PaymentCard: React.FC<{
    lang: Language,
    title: string,
    url: string,
    color: string,
    labelEn: string,
    labelAr: string,
    iconImg?: string,
    icon?: React.ReactNode, // Added to support custom SVG components
    className?: string
}> = ({ lang, title, url, color, labelEn, labelAr, iconImg, icon, className = '' }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isRedirecting, setIsRedirecting] = useState(false);

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (isRedirecting) return;

        // Reduce lag feeling: 400ms
        setTimeout(() => {
            window.open(url, '_blank');
            setTimeout(() => setIsRedirecting(false), 500);
        }, 400);
    };

    const label = lang === 'en' ? labelEn : labelAr;
    const opening = lang === 'en' ? 'OPENING...' : 'جاري الفتح...';

    return (
        <a
            href={url}
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`
        group relative block w-full select-none overflow-hidden rounded-[24px] transition-all duration-300 transform border border-white/10 bg-[#0a0a0a]/60 backdrop-blur-xl
        ${isRedirecting ? 'scale-[1.02] z-50' : 'hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(0,0,0,0.6)] hover:bg-[#111111]/80 hover:border-white/20'}
        ${className}
      `}
            style={{
                boxShadow: isHovered && !isRedirecting ? `0 20px 40px -15px ${color}50` : ''
            }}
        >
            {/* === BACKGROUND GLOW === */}
            <div
                className="absolute inset-0 opacity-20 transition-opacity duration-500"
                style={{
                    background: `linear-gradient(135deg, ${color} 0%, transparent 100%)`,
                    opacity: isHovered ? 0.4 : 0.1
                }}
            ></div>

            {/* === LUXURY OVERLAYS === */}
            {/* BRAND BACKGROUND PATTERN */}
            <div 
                className="absolute inset-0 opacity-10 pointer-events-none group-hover:opacity-30 transition-all duration-1000 mix-blend-screen scale-100 group-hover:scale-110"
                style={{ 
                    backgroundImage: "url('https://raw.githubusercontent.com/himedz116-hue/PNG/refs/heads/main/%D8%AA%D8%B5%D9%85%D9%8A%D9%85%20%D8%A8%D8%AF%D9%88%D9%86%20%D8%B9%D9%86%D9%88%D8%A7%D9%86%20(3)%20(1).png')", 
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            ></div>


            {/* === CONTENT === */}
            <div className="relative z-10 p-4 md:p-6 flex flex-col justify-between h-full min-h-[120px]">
                <div className="flex items-center justify-between">
                    <div className={`p-2.5 md:p-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 ${isRedirecting ? 'animate-spin' : ''}`}>
                        {icon ? (
                            icon
                        ) : iconImg ? (
                            <img src={iconImg} alt={title} className="w-5 h-5 md:w-6 md:h-6 object-contain" />
                        ) : (
                            <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        )}
                    </div>
                    <div
                        className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${isHovered ? 'bg-white text-black border-white' : 'border-white/20 text-white/50'}`}
                    >
                        <svg className={`w-4 h-4 ${lang === 'ar' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </div>
                </div>

                <div className="mt-2 md:mt-4">
                    <p className={`text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase mb-1 opacity-70`} style={{ color: color }}>
                        {isRedirecting ? opening : label}
                    </p>
                    <h3 className={`text-xl md:text-2xl font-black text-white tracking-tight ${lang === 'ar' ? 'font-arabic' : ''}`}>
                        {title}
                    </h3>
                </div>
            </div>
        </a>
    );
};

// --- Support Links Section ---
const SupportLinks: React.FC<{ lang: Language }> = ({ lang }) => {
    return (
        <div className="w-full max-w-5xl mx-auto mt-32 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-4 mb-6 px-2 opacity-80">
                <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></span>
                <span className={`text-xs font-bold uppercase tracking-[0.3em] text-white/60 ${lang === 'ar' ? 'font-arabic' : ''}`}>{lang === 'en' ? 'SUPPORT & DONATION' : 'الدعم المادي'}</span>
                <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></span>
            </div>

            {/* Layout: PayPal & Dokan Side-by-Side */}
            <div className="grid grid-cols-2 gap-3 md:gap-4 w-full">
                <PaymentCard
                    lang={lang}
                    title="PAYPAL"
                    url="https://creators.sa/vilon"
                    color="#3B82F6" // Blue
                    labelEn="CREATORS"
                    labelAr="كريتورز"
                    className="h-32 md:h-40"
                />
                <PaymentCard
                    lang={lang}
                    title="DOKAN"
                    url="https://tip.dokan.sa/vilon45"
                    color="#FDE047" // Yellow
                    labelEn="SEND TIP"
                    labelAr="دعم دكان"
                    iconImg="https://i.postimg.cc/Y0pfrW58/dokan-logo-white.png"
                    className="h-32 md:h-40"
                />
            </div>

            {/* Special Alert Section (Compact & Beautiful) */}
            <div className="mt-8 w-full flex flex-col items-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center gap-3 mb-5">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/50"></div>
                    <h3 className="text-[10px] md:text-xs font-black text-white/70 tracking-[0.3em] uppercase drop-shadow-md">
                        {lang === 'en' ? 'Special Alerts' : 'تنبيهات الدعم الخاصة'}
                    </h3>
                    <div className="w-1.5 h-1.5 rounded-full bg-white/50"></div>
                </div>

                <div className="flex flex-wrap justify-center gap-3 px-2">
                    {[
                        { amount: '50$', bg: 'from-[#CD7F32]/20 to-[#CD7F32]/5', border: 'border-[#CD7F32]/30', text: 'from-[#CD7F32] to-[#FFE0C2]', glow: 'group-hover:shadow-[0_0_15px_rgba(205,127,50,0.4)]' }, // Bronze
                        { amount: '100$', bg: 'from-[#C0C0C0]/20 to-[#C0C0C0]/5', border: 'border-[#C0C0C0]/30', text: 'from-[#C0C0C0] to-[#FFFFFF]', glow: 'group-hover:shadow-[0_0_15px_rgba(192,192,192,0.4)]' }, // Silver
                        { amount: '200$', bg: 'from-[#FFD700]/20 to-[#FFD700]/5', border: 'border-[#FFD700]/30', text: 'from-[#FFD700] to-[#FFF8DC]', glow: 'group-hover:shadow-[0_0_15px_rgba(255,215,0,0.4)]' }, // Gold
                        { amount: '300$', bg: 'from-[#00FF7F]/20 to-[#00FF7F]/5', border: 'border-[#00FF7F]/30', text: 'from-[#00FF7F] to-[#98FB98]', glow: 'group-hover:shadow-[0_0_15px_rgba(0,255,127,0.4)]' }, // Emerald
                        { amount: '400$', bg: 'from-[#00BFFF]/20 to-[#00BFFF]/5', border: 'border-[#00BFFF]/30', text: 'from-[#00BFFF] to-[#E0FFFF]', glow: 'group-hover:shadow-[0_0_15px_rgba(0,191,255,0.4)]' }, // Diamond
                        { amount: '500$', bg: 'from-[#8A2BE2]/20 to-[#8A2BE2]/5', border: 'border-[#8A2BE2]/30', text: 'from-[#8A2BE2] to-[#E6E6FA]', glow: 'group-hover:shadow-[0_0_15px_rgba(138,43,226,0.4)]' }, // Amethyst
                        { amount: '1000$', bg: 'from-[#FF2D2D]/30 to-[#FF2D2D]/10', border: 'border-[#FF2D2D]/50', text: 'from-[#FF2D2D] to-[#FFC0CB]', glow: 'group-hover:shadow-[0_0_20px_rgba(255,45,45,0.6)]' }, // Ruby
                    ].map((item, idx) => (
                        <div key={idx} className="relative group cursor-default">
                            <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${item.bg} blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                            <div className={`relative px-4 py-2 md:px-5 md:py-2.5 bg-[#050505]/90 backdrop-blur-md border ${item.border} rounded-xl transition-all duration-300 transform group-hover:-translate-y-1 ${item.glow} overflow-hidden`}>
                                <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"></div>
                                <span className={`relative z-10 text-[13px] md:text-sm font-black bg-clip-text text-transparent bg-gradient-to-b ${item.text} tracking-widest drop-shadow-lg`}>
                                    {item.amount}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-6 flex justify-center">
                <p className={`text-[9px] uppercase tracking-[0.2em] text-white/30 text-center ${lang === 'ar' ? 'font-arabic' : ''}`}>
                    {lang === 'en' ? 'Donations are non-refundable' : 'التبرعات غير قابلة للاسترداد'}
                </p>
            </div>
        </div>
    );
}

import { CelebrationOverlay } from './components/CelebrationOverlay';

export default function App() {
    const [isHoveringProfile, setIsHoveringProfile] = useState(false);
    const [lang, setLang] = useState<Language>('en'); // Default to English as per request
    const [showCelebration, setShowCelebration] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('celebration_shown')) return;

        const timer = setTimeout(() => {
            setShowCelebration(true);
            localStorage.setItem('celebration_shown', 'true');
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    const [branding] = useState({
        profileImage: DEFAULT_PROFILE_IMAGE,
        bannerImage: PC_BACKGROUND // Keep this for poster, but main bg uses CSS
    });

    const [socialStats, setSocialStats] = useState<Record<string, string>>({
        'KICK': '121,100',
        'YouTube': '47,100',
        'X': '19,214',
        'Discord': '2,374',
        'Snapchat': '1.2M+'
    });

    const [socials, setSocials] = useState<SocialLink[]>([]);
    const [lastSession, setLastSession] = useState<any>(null);
    const [clips, setClips] = useState<any[]>([]);

    // Re-generate socials when stats change
    useEffect(() => {
        const updatedSocials = [
            { ...KICK_SOCIAL, followerCount: socialStats['KICK'] },
            createSocialLink('youtube', 'https://youtube.com/@vilon45', socialStats['YouTube'], 'أرشيف البثوث ومقاطع مميزة'),
            createSocialLink('twitter', 'https://x.com/vilon45', socialStats['X'], 'أخبار وتحديثات سريعة'),
            createSocialLink('discord', 'https://discord.gg/H8ujXwHkHT', socialStats['Discord'], 'أكبر تجمع للأساطير'),
            createSocialLink('snapchat', 'https://snapchat.com/t/nIjL135U', socialStats['Snapchat'], 'يوميات حصرية وتغطيات خاصة'),
        ].filter(Boolean) as SocialLink[];
        setSocials(updatedSocials);
    }, [socialStats]);

    const [streamInfo, setStreamInfo] = useState({
        isLive: false,
        viewers: 0,
        title: '',
        category: '',
        tags: [] as string[]
    });

    const t = TRANSLATIONS[lang];
    const isRTL = lang === 'ar';

    const [isDemo, setIsDemo] = useState(false);

    const fetchYouTubeStats = React.useCallback(async () => {
        try {
            const res = await fetch('https://api.socialcounts.org/youtube-live-subscriber-count/UCarKxFdTOwury7d9OCj5kZQ');
            const data = await res.json();
            const count = data?.counters?.api?.subscriberCount || data?.counters?.estimation?.subscriberCount;
            if (count) {
                const formatted = count >= 1000 ? `${(count / 1000).toFixed(1)}K` : count.toString();
                setSocialStats(prev => ({ ...prev, 'YouTube': formatted }));
            }
        } catch (e) {
            console.warn("Failed to fetch YouTube stats");
        }
    }, []);

    const fetchKickStatus = React.useCallback(async () => {
        // الكود الحقيقي والسريع باستخدام kickFetch
        try {
            const data = await kickFetch(`https://kick.com/api/v2/channels/${CHANNEL_SLUG}`);

            if (data) {
                const livestreamData = data.livestream || data.live_stream;
                const isLive = livestreamData && (livestreamData.is_live === true || livestreamData.is_live === 1);

                if (isLive) {
                    setStreamInfo({
                        isLive: true,
                        viewers: livestreamData.viewer_count || 0,
                        title: livestreamData.session_title || livestreamData.title || 'Live Stream',
                        category: livestreamData.categories?.[0]?.name || 'Just Chatting',
                        tags: livestreamData.tags ? livestreamData.tags.map((t: any) => t.name || t) : []
                    });
                } else {
                    setStreamInfo(prev => ({ ...prev, isLive: false }));
                }

                // Update real Kick follower count (keeping this important detail from previous code)
                if (data.followers_count !== undefined) {
                    const count = data.followers_count;
                    const formattedCount = count >= 1000 ? `${(count / 1000).toFixed(1)}K` : count.toString();
                    setSocialStats(prev => ({ ...prev, 'KICK': formattedCount }));
                }

                // Update last session (fetching from videos endpoint for better reliability)
                const videosRawData = await kickFetch(`https://kick.com/api/v2/channels/${CHANNEL_SLUG}/videos`);
                const videosArray = videosRawData?.videos || (Array.isArray(videosRawData) ? videosRawData : []);
                if (videosArray && videosArray.length > 0) {
                    setLastSession(videosArray[0]);
                } else {
                    const streams = data.previous_livestreams || data.recent_streams || [];
                    if (streams && streams.length > 0) {
                        setLastSession(streams[0]);
                    }
                }

                // Fetch clips (last 3 for the report)
                const clipsRawData = await kickFetch(`https://kick.com/api/v2/channels/${CHANNEL_SLUG}/clips?limit=5`);
                const clipsData = clipsRawData?.data || clipsRawData;
                const clipsArray = clipsData?.clips || (Array.isArray(clipsData) ? clipsData : (clipsData?.data && Array.isArray(clipsData.data) ? clipsData.data : []));
                setClips(clipsArray.slice(0, 3));
            }
        } catch (e) {
            console.warn("Failed to fetch status");
        }
    }, [CHANNEL_SLUG]);

    useEffect(() => {
        fetchKickStatus();
        fetchYouTubeStats();
        const kickInterval = setInterval(fetchKickStatus, 60000);
        const ytInterval = setInterval(fetchYouTubeStats, 60000);
        return () => {
            clearInterval(kickInterval);
            clearInterval(ytInterval);
        };
    }, [fetchKickStatus, fetchYouTubeStats]);

    const handleShare = async () => {
        const shareUrl = "https://kick.com/vilon";
        if (navigator.share) {
            try {
                await navigator.share({ title: t.shareTitle, text: t.shareText, url: shareUrl });
            } catch (err) { console.error('Share failed:', err); }
        } else {
            navigator.clipboard.writeText(shareUrl);
            alert(t.copied);
        }
    };

    const displayTitle = streamInfo.isLive ? streamInfo.title : t.defaultStreamTitle;
    const displayCategory = streamInfo.isLive ? streamInfo.category : t.defaultCategory;

    // Split socials: 
    // 1. General: Kick, Snap, Insta, TikTok, Twitter, WhatsApp (Replaces Email)
    // 2. Community: Discord, YouTube (To be side-by-side)
    const generalSocials = socials.filter(s => !['Discord', 'YouTube'].includes(s.name));
    const communitySocials = socials.filter(s => ['Discord', 'YouTube'].includes(s.name));

    return (
        <div className={`relative min-h-screen w-full selection:bg-[#FF2D2D] selection:text-black overflow-x-hidden ${isRTL ? 'font-arabic' : 'font-sans'}`} dir={isRTL ? 'rtl' : 'ltr'}>
            <AnimeHQPromo lang={lang} />
            <div className="fixed inset-0 z-0 bg-[#050505] overflow-hidden">
                <div className="absolute inset-0 pointer-events-none w-full h-full opacity-90 transition-opacity duration-1000">
                    <img src={PC_BACKGROUND} className="hidden md:block w-full h-full object-cover" alt="Background" />
                    <img src={MOBILE_BACKGROUND} className="block md:hidden w-full h-full object-cover" alt="Background" />
                </div>
                
                {/* Less aggressive gradients to let the video shine */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_120%)] opacity-80 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-[#050505]"></div>
                
                {/* Powerful Cinematic Glows */}
                <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[50%] bg-[#FF2D2D]/20 blur-[180px] opacity-40 animate-pulse-slow"></div>
                <div className="absolute bottom-[-10%] right-[-5%] w-[60%] h-[50%] bg-[#FF2D2D]/15 blur-[180px] opacity-30 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-white/10 blur-[140px] animate-float opacity-50"></div>
            </div>

            <div className="relative z-10 w-full max-w-[1800px] mx-auto p-4 md:p-6 min-h-screen flex flex-col perspective-1000">
                <header className="flex justify-between items-center mb-8 bg-[#0a0a0a]/60 backdrop-blur-2xl px-6 py-4 rounded-full border border-white/15 shadow-[0_10px_40px_rgba(0,0,0,0.8)] border-b-4 border-black/80">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className={`w-3 h-3 rounded-full shadow-[0_0_10px_#FF2D2D] ${streamInfo.isLive ? 'bg-[#FF2D2D] animate-pulse' : 'bg-gray-500'}`}></div>
                            {streamInfo.isLive && <div className="absolute inset-0 bg-[#FF2D2D] rounded-full animate-ping opacity-50"></div>}
                        </div>
                        <span className={`font-black tracking-widest text-[10px] uppercase ${streamInfo.isLive ? 'text-white text-shadow-glow' : 'text-white/40'}`}>{streamInfo.isLive ? t.status : t.statusOffline}</span>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden md:block text-white/30 text-[10px] font-mono tracking-[0.2em] uppercase drop-shadow-md">{t.headerTitle}</div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => fetchKickStatus()}
                                className="p-2 rounded-full bg-[#1a1a1a] hover:bg-[#252525] border-t border-l border-white/10 border-b-4 border-black/80 text-white/40 hover:text-kick transition-all hover:-translate-y-1 active:translate-y-0.5 active:border-b-0 shadow-lg"
                                title="Refresh Data"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                            </button>
                            <button
                                onClick={() => setLang(prev => prev === 'en' ? 'ar' : 'en')}
                                className="px-5 py-2 rounded-full bg-[#1a1a1a] hover:bg-[#252525] border-t border-l border-white/10 border-b-4 border-black/80 text-xs font-bold text-white transition-all hover:-translate-y-1 active:translate-y-0.5 active:border-b-0 shadow-lg flex items-center gap-2"
                            >
                                <span>{lang === 'en' ? '🇺🇸 EN' : '🇸🇦 AR'}</span>
                            </button>
                        </div>
                    </div>
                </header>

                <div className="flex flex-col items-center gap-12 w-full transition-all duration-700">
                    <div className="w-full max-w-5xl flex flex-col justify-center space-y-4 py-4">
                        {/* 
              PROFILE HEADER SECTION
              Alignment logic fixed using explicit conditionals instead of unsupported ltr:/rtl: variants.
            */}
                        <div className={`flex flex-col md:flex-row items-center md:items-start text-center ${isRTL ? 'md:text-right' : 'md:text-left'} gap-8 lg:gap-12 mb-8`}>
                            <div className="relative group cursor-pointer shrink-0 z-20 mx-auto md:mx-0 -mt-2" onMouseEnter={() => setIsHoveringProfile(true)} onMouseLeave={() => setIsHoveringProfile(false)}>
                                {/* Base Powerful Glow */}
                                <div className="absolute inset-[-40%] bg-[#FF2D2D] blur-[40px] rounded-full opacity-30 group-hover:opacity-70 group-hover:scale-110 transition-all duration-700 animate-pulse"></div>

                                {/* Subtle background ring */}
                                <div className="absolute inset-[-15px] rounded-full border border-[#FF2D2D]/20 group-hover:border-[#FF2D2D]/50 transition-all duration-700"></div>
                                
                                {/* Outer Spinning Orbit */}
                                <div className="absolute inset-[-15px] border-[2px] border-transparent border-t-[#FF2D2D]/80 rounded-full animate-spin-slow group-hover:inset-[-20px] transition-all duration-500"></div>
                                
                                {/* Inner Reverse Orbit */}
                                <div className="absolute inset-[-8px] border-[3px] border-transparent border-b-[#FF2D2D] border-l-[#FF2D2D] rounded-full animate-[spin_3s_linear_infinite_reverse] opacity-80 group-hover:opacity-100 group-hover:inset-[-12px] group-hover:shadow-[0_0_15px_#FF2D2D] transition-all duration-500"></div>

                                {/* Bold Solid Frame Container */}
                                <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full overflow-visible z-20 transition-transform duration-500 group-hover:scale-[1.03] mx-auto">
                                    
                                    {/* Glowing Edge */}
                                    <div className="absolute inset-0 rounded-full ring-2 ring-[#FF2D2D]/60 group-hover:ring-[#FF2D2D] group-hover:shadow-[0_0_25px_#FF2D2D] z-30 transition-all duration-500 pointer-events-none"></div>

                                    {/* Image Wrapper */}
                                    <div className="absolute inset-0 rounded-full overflow-hidden z-20 bg-black">
                                        {/* Shine/Scan Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent h-[150%] -translate-y-full group-hover:animate-[scan_2s_ease-in-out_infinite] z-30 pointer-events-none mix-blend-overlay"></div>

                                        {/* Profile Image - Perfect Circle */}
                                        <img
                                            src={branding.profileImage}
                                            alt="Vilon - Official Profile Identity"
                                            loading="eager"
                                            className="relative z-10 w-full h-full object-cover transition-all duration-[1500ms] ease-out group-hover:scale-[1.15] group-hover:-rotate-3"
                                        />
                                        
                                        {/* Deep Inner Shadow */}
                                        <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.9)] group-hover:shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] transition-shadow duration-500 pointer-events-none z-20"></div>
                                    </div>
                                </div>

                                {/* Strong Kick Badge Component */}
                                <div className="absolute -bottom-1 -right-1 md:-bottom-1 md:-right-1 z-30 scale-[0.8] md:scale-90 group-hover:-translate-y-1 group-hover:scale-100 transition-transform duration-500">
                                    <div className="relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center">
                                        {/* Badge Aura */}
                                        <div className="absolute inset-0 bg-kick rounded-full blur-[10px] opacity-40 group-hover:opacity-70 group-hover:blur-[15px] transition-all"></div>
                                        {/* Badge Rings */}
                                        <div className="absolute inset-[-5px] border-2 border-transparent border-t-kick border-l-kick rounded-full animate-spin-slow"></div>
                                        {/* Badge Base */}
                                        <div className="relative z-10 w-full h-full rounded-full flex items-center justify-center bg-[#0a0a0a] border-2 border-kick/80 shadow-[inset_0_0_10px_rgba(83,252,24,0.2)]">
                                            <KickIcon className="w-7 h-7 text-kick drop-shadow-[0_0_10px_rgba(83,252,24,0.8)]" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4 pt-2 relative z-10 flex-1 min-w-0">
                                <h1 className="relative text-7xl md:text-9xl font-heading font-black tracking-tighter leading-none select-none group/name" dir="ltr">
                                    <span className="sr-only">Vilon Official Hub - Professional Streamer and Gaming Content Creator</span>
                                    {/* Combined Cracked Text Container */}
                                    <div className="relative inline-block hover:scale-110 transition-transform duration-700 cursor-default">

                                        <div className="absolute inset-[-60%] bg-gradient-to-r from-[#cc0000]/0 via-[#cc0000]/10 to-[#cc0000]/0 blur-[150px] opacity-0 group-hover/name:opacity-100 transition-opacity duration-1000"></div>
                                        <div className="absolute inset-[-50%] [background:radial-gradient(circle,rgba(255,100,100,0.05),transparent)] blur-[130px] opacity-0 group-hover/name:opacity-100 transition-opacity duration-1000 animate-pulse"></div>

                                        {/* Layer 2: Top Half (Split Upwards) */}
                                        <div className="relative z-10 -translate-y-1 -translate-x-1 group-hover/name:animate-glitch group-hover/name:-translate-y-4 group-hover/name:-translate-x-2 transition-transform duration-500"
                                            style={{ clipPath: 'polygon(-10% -10%, 110% -10%, 110% 35%, 90% 48%, 82% 52%, 75% 38%, 68% 32%, 60% 42%, 52% 38%, 45% 45%, 38% 42%, 30% 58%, 22% 55%, 15% 62%, 10% 60%, -10% 65%)' }}>

                                            {/* Main Text with Heavy Stroke Container */}
                                            <span className="relative inline-block drop-shadow-[0_0_20px_rgba(204,0,0,0.4)]">
                                                <span className="absolute top-0 left-0 text-transparent [-webkit-text-stroke:3px_black] md:[-webkit-text-stroke:8px_black]" aria-hidden="true">Vilon</span>
                                                <span className="relative bg-gradient-to-b from-[#ff4d4d] via-[#cc0000] to-[#660000] text-transparent bg-clip-text">Vilon</span>
                                            </span>

                                            {/* Inner Sheen Effect */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent opacity-0 group-hover/name:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                                        </div>

                                        {/* Layer 3: Bottom Half (Split Downwards) */}
                                        <div className="absolute inset-0 z-10 translate-y-1 translate-x-1 group-hover/name:animate-glitch [animation-delay:0.1s] group-hover/name:translate-y-4 group-hover/name:translate-x-2 transition-transform duration-500"
                                            style={{ clipPath: 'polygon(-10% 65%, 10% 60%, 15% 62%, 22% 55%, 30% 58%, 38% 42%, 45% 45%, 52% 38%, 60% 42%, 68% 32%, 75% 38%, 82% 52%, 90% 48%, 110% 35%, 110% 110%, -10% 110%)' }}>

                                            {/* Main Text with Heavy Stroke Container */}
                                            <span className="relative inline-block drop-shadow-[0_0_20px_rgba(204,0,0,0.4)]">
                                                <span className="absolute top-0 left-0 text-transparent [-webkit-text-stroke:2px_black] md:[-webkit-text-stroke:5px_black]" aria-hidden="true">Vilon</span>
                                                <span className="relative bg-gradient-to-b from-[#ff4d4d] via-[#cc0000] to-[#660000] text-transparent bg-clip-text">Vilon</span>
                                            </span>
                                        </div>

                                        {/* Layer 4: The Crack Line (Connecting them) */}
                                        <svg className="absolute inset-0 w-full h-full z-20 pointer-events-none overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                                            <defs>
                                                <filter id="crack-glow-heavy">
                                                    <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
                                                    <feMerge>
                                                        <feMergeNode in="coloredBlur" />
                                                        <feMergeNode in="SourceGraphic" />
                                                    </feMerge>
                                                </filter>
                                                <linearGradient id="crack-gradient-v2" x1="0%" y1="0%" x2="100%" y2="0%">
                                                    <stop offset="0%" stopColor="#ff4d4d" stopOpacity="0" />
                                                    <stop offset="10%" stopColor="#cc0000" stopOpacity="1" />
                                                    <stop offset="50%" stopColor="#ff3333" stopOpacity="1" />
                                                    <stop offset="90%" stopColor="#cc0000" stopOpacity="1" />
                                                    <stop offset="100%" stopColor="#ff4d4d" stopOpacity="0" />
                                                </linearGradient>
                                                <mask id="crack-mask">
                                                    <linearGradient id="mask-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                                                        <stop offset="0%" stopColor="black" />
                                                        <stop offset="15%" stopColor="white" />
                                                        <stop offset="85%" stopColor="white" />
                                                        <stop offset="100%" stopColor="black" />
                                                    </linearGradient>
                                                    <rect width="100" height="100" fill="url(#mask-grad)" />
                                                </mask>
                                            </defs>

                                            <g mask="url(#crack-mask)">
                                                {/* Outer Glow Path */}
                                                <path d="M0 65 L10 60 L15 62 L22 55 L30 58 L38 42 L45 45 L52 38 L60 42 L68 32 L75 38 L82 52 L90 48 L100 35"
                                                    stroke="#cc0000" strokeWidth="4" fill="none" opacity="0.3" filter="url(#crack-glow-heavy)" />

                                                {/* Main Realistic Jagged Crack */}
                                                <path d="M0 65 L10 60 L15 62 L22 55 L30 58 L38 42 L45 45 L52 38 L60 42 L68 32 L75 38 L82 52 L90 48 L100 35"
                                                    stroke="url(#crack-gradient-v2)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"
                                                    className="animate-pulse" filter="url(#crack-glow-heavy)" />

                                                {/* Black Crack Core - Emerging from the red 'i' */}
                                                <path d="M0 65 L8 62 L12 64 L18 58 L25 61 L32 48 L40 52 L45 45"
                                                    stroke="black" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round"
                                                    className="animate-pulse" opacity="0.8" />

                                                {/* Inner Energy Core - Hot White */}
                                                <path d="M0 65 L10 60 L15 62 L22 55 L30 58 L38 42 L45 45 L52 38 L60 42 L68 32 L75 38 L82 52 L90 48 L100 35"
                                                    stroke="white" strokeWidth="0.3" fill="none" strokeLinecap="round" strokeLinejoin="round"
                                                    className="animate-pulse [animation-delay:0.2s]" />

                                                {/* Traveling Energy Bolt */}
                                                <circle r="1.2" fill="white" className="shadow-[0_0_15px_white]">
                                                    <animateMotion
                                                        path="M0 65 L10 60 L15 62 L22 55 L30 58 L38 42 L45 45 L52 38 L60 42 L68 32 L75 38 L82 52 L90 48 L100 35"
                                                        dur="2.5s" repeatCount="indefinite" />
                                                </circle>
                                            </g>

                                            {/* Energy Sparks - Responsive */}
                                            <circle cx="38" cy="42" r="1.5" fill="#cc0000" className="animate-ping shadow-[0_0_20px_#cc0000]" />
                                            <circle cx="68" cy="32" r="1" fill="white" className="animate-ping [animation-delay:0.4s] shadow-[0_0_20px_white]" />
                                        </svg>

                                        {/* Floating Tech Particles */}
                                        <div className="absolute inset-0 pointer-events-none overflow-visible">
                                            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#cc0000] opacity-0 group-hover/name:opacity-100 transition-all duration-500 translate-x-4 -translate-y-4"></div>
                                            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-white opacity-0 group-hover/name:opacity-100 transition-all duration-500 -translate-x-4 translate-y-4"></div>

                                            {/* Animated Shards */}
                                            <div className="absolute top-1/4 -right-8 w-8 h-[2px] bg-gradient-to-r from-transparent to-[#cc0000] rotate-45 opacity-0 group-hover/name:opacity-100 transition-all duration-700 delay-100"></div>
                                            <div className="absolute bottom-1/4 -left-8 w-8 h-[2px] bg-gradient-to-l from-transparent to-white -rotate-45 opacity-0 group-hover/name:opacity-100 transition-all duration-700 delay-200"></div>
                                        </div>
                                    </div>
                                </h1>
                                <p className="text-xl text-white/70 font-light drop-shadow-md max-w-lg mx-auto md:mx-0">{t.bio}</p>
                                {!streamInfo.isLive && (
                                    <div className={`flex flex-wrap justify-center ${isRTL ? 'md:justify-start' : 'md:justify-start'} gap-3`}>
                                        {t.tags.map((tag, i) => <span key={i} className="px-4 py-2 rounded-xl bg-white/5 border-b-2 border-white/10 text-xs font-bold text-white/80">{tag}</span>)}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* General Grid: Kick, Snap, Insta, TikTok, Twitter, WhatsApp */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 w-full">
                            {generalSocials.map((social, index) => (
                                <SocialCard
                                    key={social.name}
                                    social={social}
                                    index={index}
                                    className=""
                                />
                            ))}
                        </div>

                        {/* Community Grid: Discord, YouTube (Side by Side) */}
                        <div className="flex flex-col gap-4 w-full">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 w-full">
                                <DiscordWidget lang={lang} />
                                <YoutubeWidget lang={lang} />
                            </div>
                        </div>

                        {/* Support Section (Dokan, PayPal, ABN) */}
                        <SupportLinks lang={lang} />

                        {/* Last Session Report Section - Moved to be more prominent when offline */}
                        {!streamInfo.isLive && (
                            <div className="w-full animate-fade-in-up">
                                <LastSessionReport 
                                    lang={lang} 
                                    data={lastSession || VILON_DEFAULT_LAST_SESSION} 
                                    clips={clips && clips.length > 0 ? clips : VILON_DEFAULT_CLIPS} 
                                />
                            </div>
                        )}
                    </div>

                    {streamInfo.isLive && (
                        <div className="w-full animate-slide-down border-t border-white/5 pt-12">
                            <div className="flex flex-col lg:flex-row gap-6 lg:h-[700px]">
                                <div className="flex-1 flex flex-col gap-4 min-w-0 lg:h-full">
                                    <div className="w-full aspect-video lg:aspect-auto lg:flex-1 rounded-3xl overflow-hidden shadow-2xl relative bg-black">
                                        <StreamPlayer
                                            lang={lang}
                                            isLive={streamInfo.isLive}
                                            viewers={streamInfo.viewers}
                                            channelSlug={CHANNEL_SLUG}
                                            poster={branding.bannerImage}
                                        />
                                    </div>
                                    <div className="shrink-0 p-5 rounded-2xl bg-[#0e0e0e]/90 backdrop-blur-xl border border-white/10 border-b-4 border-black/50 shadow-xl flex flex-col gap-4">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className={`flex-1 min-w-0 ${isRTL ? 'text-right' : 'text-left'}`}>
                                                <h2 className={`text-xl md:text-2xl font-bold text-white truncate leading-snug ${isRTL ? 'font-arabic' : ''}`} title={displayTitle}>{displayTitle}</h2>
                                                <div className="flex items-center gap-3 mt-2">
                                                    <span className="font-bold text-sm tracking-wide">
                                                        <span className="text-white">Vilon</span>
                                                    </span>
                                                    <span className="w-1 h-1 rounded-full bg-white/30"></span>
                                                    <span className="text-white/60 text-sm font-bold">{displayCategory}</span>
                                                </div>
                                            </div>
                                            <button onClick={handleShare} className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-white transition-all">
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                                            </button>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/5">
                                            <div className="flex items-center gap-2">
                                                <div className="px-2 py-1 rounded bg-[#e72a18]/10 border border-[#e72a18]/20 text-[#e72a18] text-[10px] font-bold uppercase tracking-wider">{t.dropsEnabled}</div>
                                            </div>
                                            <div className="w-px h-4 bg-white/10 mx-2"></div>
                                            <div className="flex flex-wrap gap-2">
                                                {streamInfo.tags.length > 0 ? streamInfo.tags.map((tag, i) => <span key={i} className="px-2 py-1 rounded-lg bg-white/5 text-white/50 text-[10px] font-medium hover:bg-white/10 transition-colors cursor-default">#{tag}</span>) : <span className="text-white/30 text-xs italic">{t.noTags}</span>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full lg:w-[380px] h-[500px] lg:h-full shrink-0 flex flex-col">
                                    <div className="h-full w-full rounded-3xl overflow-hidden shadow-2xl border-b-4 border-black/50">
                                        <ChatWidget lang={lang} isDemo={isDemo} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-20 w-full max-w-6xl mx-auto space-y-20">
                  <StatsSection lang={lang} />
                </div>

                <footer className="mt-24 py-10 border-t border-white/5 flex flex-col items-center justify-center gap-6">
                    {/* Email Section - Subtle */}
                    {EMAIL_ADDRESS && (
                        <a href={`mailto:${EMAIL_ADDRESS}`} className="flex items-center gap-2 opacity-40 hover:opacity-80 transition-opacity duration-300 group">
                            <MailIcon className="w-4 h-4 text-white" />
                            <span className="text-[10px] font-mono uppercase tracking-widest text-white group-hover:text-kick transition-colors">
                                {t.contact}: {EMAIL_ADDRESS}
                            </span>
                        </a>
                    )}

                    <div className="flex flex-col items-center gap-3 opacity-40 hover:opacity-100 transition-opacity duration-500">
                        <div className="flex items-center gap-2"><span className="text-xs font-bold tracking-[0.3em] text-white">{t.poweredBy}</span></div>
                        <p className="text-[10px] text-white/60">{t.footer}</p>
                    </div>
                </footer>
            </div>
            {showCelebration && (
                <CelebrationOverlay 
                    lang={lang} 
                    onClose={() => setShowCelebration(false)} 
                />
            )}
        </div>
    );
}