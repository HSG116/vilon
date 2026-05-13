import React, { useState, useEffect, useRef } from 'react';
import { Language, ChatMessage } from '../types';
import { chatService } from '../services/chatService';

interface ChatWidgetProps {
  lang: Language;
  isDemo?: boolean;
}

// --- Icons for Badges ---
const OwnerBadge = () => (
  <div className="flex items-center justify-center w-4 h-4 rounded bg-[#FF2D2D] text-black shrink-0 shadow-[0_0_10px_rgba(255,45,45,0.4)]" title="Broadcaster">
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
      <path d="M12 2L2 9l10 13 10-13-10-7z" />
      <path d="M12 6l6 4.5L12 15l-6-4.5L12 6z" />
    </svg>
  </div>
);

const ModBadge = () => (
  <div className="flex items-center justify-center w-4 h-4 rounded bg-[#FF2D2D]/80 text-black shrink-0 shadow-[0_0_8px_rgba(255,45,45,0.4)]" title="Moderator">
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
    </svg>
  </div>
);

const VipBadge = () => (
  <div className="flex items-center justify-center w-4 h-4 rounded bg-[#F542A8] text-black shrink-0 shadow-[0_0_8px_rgba(245,66,168,0.4)]" title="VIP">
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  </div>
);

const SubBadge = ({ months }: { months: number }) => (
  <div className="flex items-center justify-center w-4 h-4 rounded bg-gradient-to-br from-[#53FC18] to-[#2ea80c] text-black shrink-0 shadow-[0_0_8px_rgba(83,252,24,0.4)]" title={`${months} month${months > 1 ? 's' : ''} subscriber`}>
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
      <path d="M5 9.2h3V19H5V9.2zM10.6 5h2.8v14h-2.8V5zm5.6 8H19v6h-2.8v-6z" />
    </svg>
  </div>
);

const INITIAL_MESSAGES: ChatMessage[] = [];

export const ChatWidget: React.FC<ChatWidgetProps> = ({ lang, isDemo }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  const [statusText, setStatusText] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const t = {
    title: lang === 'en' ? 'Live Chat' : 'شات البث',
    connecting: lang === 'en' ? 'Connecting...' : 'جارِ الاتصال...',
    connected: lang === 'en' ? 'Live' : 'متصل',
    error: lang === 'en' ? 'Connection Issue' : 'مشكلة اتصال',
    retry: lang === 'en' ? 'Retry' : 'إعادة المحاولة'
  };

  useEffect(() => {
    // 1. Listen for new messages
    const unbindMessage = chatService.onMessage((msg) => {
      setMessages(prev => {
        const newArr = [...prev, msg];
        return newArr.slice(-75);
      });
    });

    // 2. Listen for deleted messages
    const unbindDelete = chatService.onDeleteMessage((msgId) => {
      setMessages(prev => prev.filter(m => m.id !== msgId));
    });

    // 3. Listen for status changes
    const unbindStatus = chatService.onStatusChange((connected, error, details) => {
      setIsConnected(connected);
      setConnectionError(error);
      setStatusText(details || '');
    });

    // 4. Connect to Vilon channel
    chatService.connect('vilon');

    // 5. Cleanup
    return () => {
      unbindMessage();
      unbindDelete();
      unbindStatus();
      chatService.disconnect();
    };
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  const getBadge = (msg: ChatMessage) => {
    switch (msg.role) {
      case 'owner': return <OwnerBadge />;
      case 'moderator': return <ModBadge />;
      case 'vip': return <VipBadge />;
      case 'subscriber': return <SubBadge months={msg.subscriberMonths || 0} />;
      default: return null;
    }
  };

  const renderMessage = (content: string) => {
    if (!content) return null;

    // Regex to match Kick emotes: [emote:ID:NAME]
    const emoteRegex = /\[emote:(\d+):([\w\s\-]+)\]/gi;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = emoteRegex.exec(content)) !== null) {
      // Add text before the emote
      if (match.index > lastIndex) {
        parts.push(content.substring(lastIndex, match.index));
      }

      const emoteId = match[1];
      const emoteName = match[2];
      const emoteUrl = `https://files.kick.com/emotes/${emoteId}/fullsize`;

      parts.push(
        <img
          key={`${match.index}-${emoteId}`}
          src={emoteUrl}
          alt={emoteName}
          title={emoteName}
          className="inline-block w-8 h-8 md:w-10 md:h-10 mx-0.5 align-middle object-contain hover:scale-125 transition-transform"
        />
      );

      lastIndex = emoteRegex.lastIndex;
    }

    // Add remaining text
    if (lastIndex < content.length) {
      parts.push(content.substring(lastIndex));
    }

    return parts.length > 0 ? parts : content;
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#0b0e0f]/90 backdrop-blur-2xl rounded-3xl overflow-hidden border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] relative isolate">

      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-kick/5 rounded-full blur-3xl -z-10"></div>

      {/* --- Header --- */}
      <div className="h-14 shrink-0 bg-gradient-to-r from-[#FF2D2D]/10 to-transparent border-b border-white/5 flex items-center justify-between px-4 z-20 shadow-lg backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className={`flex items-center justify-center w-8 h-8 rounded-lg bg-black/30 border border-white/10 transition-all ${isConnected ? 'text-[#FF2D2D] shadow-[0_0_12px_rgba(255,45,45,0.3)]' : connectionError ? 'text-red-500' : 'text-white/50'}`}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className={`text-white font-bold tracking-wide text-sm uppercase ${lang === 'ar' ? 'font-arabic' : ''}`}>{t.title}</span>
            <div className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-[#FF2D2D] shadow-[0_0_8px_#FF2D2D] animate-pulse' : connectionError ? 'bg-red-500' : 'bg-yellow-500 animate-pulse'}`}></span>
              <span className="text-[10px] text-white/40 font-mono uppercase">
                {isConnected ? t.connected : connectionError ? t.error : (statusText || t.connecting)}
              </span>
            </div>
          </div>
        </div>

        {/* Connection Info & Retry */}
        <div className="flex items-center gap-2">
          {!connectionError && isConnected && messages.length > 0 && (
            <span className="text-[10px] text-white/30 font-mono">{messages.length}</span>
          )}
          {connectionError && (
            <button
              onClick={() => chatService.connect('vilon')}
              className="px-2.5 py-1.5 rounded-md bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 border border-red-500/20"
              title={t.retry}
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {t.retry}
            </button>
          )}
        </div>
      </div>

      {/* --- Chat List --- */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent bg-gradient-to-b from-[#0b0e0f]/30 to-transparent"
      >

        {messages.map((msg) => (
          <div key={msg.id} className="group flex items-start gap-2 py-1.5 px-2.5 rounded-xl hover:bg-white/[0.03] transition-all duration-150 border border-transparent hover:border-white/5">

            {/* Badge Area */}
            {msg.role !== 'user' && (
              <div className="mt-0.5 shrink-0 transform group-hover:scale-110 transition-transform">
                {getBadge(msg)}
              </div>
            )}

            {/* Message Content */}
            <div className="flex flex-wrap items-baseline gap-x-2 text-[13px] md:text-sm leading-relaxed w-full min-w-0">

              {/* Username */}
              <span
                className="font-bold hover:underline cursor-pointer transition-opacity shrink-0 drop-shadow-sm"
                style={{ color: msg.user.color || '#fff' }}
              >
                {msg.user.username}
              </span>

              {/* Text / Emotes */}
              <span className={`text-white/80 font-medium group-hover:text-white transition-colors flex flex-wrap items-center gap-x-1 ${lang === 'ar' ? 'font-arabic' : ''}`}
                style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
                {renderMessage(msg.content)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Decorative Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#0b0e0f] to-transparent pointer-events-none z-10"></div>
    </div>
  );
};