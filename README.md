<div align="center">
  <img src="https://raw.githubusercontent.com/himedz116-hue/PNG/main/%D8%AA%D8%B5%D9%85%D9%8A%D9%85%20%D8%A8%D8%AF%D9%88%D9%86%20%D8%B9%D9%86%D9%88%D8%A7%D9%86%20(3)%20(1).png" alt="Vilon Stream Hub" width="120" height="120" style="border-radius: 50%;" />
  <h1 align="center">🎮 Vilon Stream Hub</h1>
  <p align="center">
    <strong>Official streaming dashboard for Kick streamer <a href="https://kick.com/vilon">Vilon</a></strong>
    <br />
    Bilingual (EN/AR) · Real-time stats · Live stream player · Community hub
  </p>
  <p align="center">
    <a href="#"><img src="https://img.shields.io/badge/build-passing-brightgreen?style=for-the-badge&logo=github" alt="Build" /></a>
    <a href="#"><img src="https://img.shields.io/badge/license-MIT-blue?style=for-the-badge" alt="License" /></a>
    <a href="https://react.dev"><img src="https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react" alt="React" /></a>
    <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" /></a>
    <a href="https://vite.dev"><img src="https://img.shields.io/badge/Vite-6.2-646CFF?style=for-the-badge&logo=vite" alt="Vite" /></a>
    <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss" alt="Tailwind" /></a>
    <a href="https://vercel.com"><img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel" alt="Vercel" /></a>
  </p>
</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Project Structure](#-project-structure)
- [Social Links](#-social-links)
- [License](#-license)

---

## 💡 About

**Vilon Stream Hub** is a premium streaming dashboard for Kick streamer **Vilon**. A centralized hub for live streams, real-time stats, chat, community platforms, and streamer support — all in a bilingual (English/Arabic) interface.

Integrates with **Kick API v2** for live status, viewer/follower analytics, VODs, clips, and pulls YouTube subscriber counts via SocialCounts API.

---

## ✨ Features

| # | Feature | Description |
|---|---------|-------------|
| 📺 | **Live Stream Player** | HLS playback via `hls.js` with offline poster |
| 💬 | **Real-time Chat** | Pusher-powered chat with role badges (owner, mod, VIP, subscriber) |
| 📊 | **Live Statistics** | Viewer count, followers, stream uptime & category |
| 🔗 | **Social Hub** | Animated cards for Kick, YouTube, X, Discord, Snapchat, TikTok & more |
| 🌍 | **Bilingual** | Full English & Arabic (RTL) with instant toggle |
| 📼 | **Session Reports** | Auto-fetched VOD with duration, categories & clips |
| 🏆 | **Leaderboards** | Top gifters via Supabase (all-time, monthly, weekly) |
| 🎴 | **Community Widgets** | Discord embed & latest YouTube video |
| 💰 | **Donations** | PayPal & Dokan with tiered alerts ($50–$1000) |
| 🎬 | **Highlights** | Thumbnail grid of latest 3 clips |
| 🌙 | **Cinematic UI** | Glassmorphism, gradients, glow effects |
| 📱 | **Responsive** | Mobile, tablet & desktop optimized |

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | <img src="https://img.shields.io/badge/React-19.2-61DAFB?logo=react" alt="React" /> <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript" alt="TS" /> |
| **Bundler** | <img src="https://img.shields.io/badge/Vite-6.2-646CFF?logo=vite" alt="Vite" /> |
| **Styling** | <img src="https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss" alt="Tailwind" /> |
| **Streaming** | HLS.js · React Player |
| **Real-time** | Pusher JS · Supabase |
| **Icons** | Lucide React · Custom SVGs |
| **Animation** | Motion · canvas-confetti · CSS |
| **Hosting** | <img src="https://img.shields.io/badge/Vercel-000000?logo=vercel" alt="Vercel" /> · GitHub Pages |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+ or yarn

### Installation

```bash
git clone https://github.com/HSG116/vilon.git
cd vilon
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> No API keys required for core features. Supabase keys optional for leaderboards.

---

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server on port 3000 |
| `npm run build` | Build for production → `dist/` |
| `npm run preview` | Preview production build |
| `npm run deploy` | Build + deploy to GitHub Pages |

---

## 📁 Project Structure

```
vilon-stream-hub/
├── components/        # React components
│   ├── Chat.tsx        # Live chat widget
│   ├── CommunityWidgets.tsx  # Discord & YouTube
│   ├── Icons.tsx       # SVG icon library
│   ├── LatestYoutube.tsx    # YouTube embed
│   ├── StatsSection.tsx     # Stats & leaderboards
│   └── StreamPlayer.tsx     # HLS player
├── services/          # API service layer
├── utils/             # Utility functions
│   └── kickApi.ts     # Kick API wrapper
├── public/            # Static assets
│   ├── robots.txt
│   ├── sitemap.xml
│   └── *.png          # OG images & branding
├── App.tsx            # Main app component
├── types.ts           # TypeScript definitions
├── vite.config.ts     # Vite configuration
├── vercel.json        # Vercel config
└── package.json       # Dependencies & scripts
```

---

## 🌐 Social Links

| Platform | Handle | Followers |
|----------|--------|----------|
| 🟢 **Kick** | [kick.com/vilon](https://kick.com/vilon) | **121.1K** |
| 🔴 **YouTube** | [@vilon45](https://youtube.com/@vilon45) | **47.1K** |
| ⚫ **X (Twitter)** | [@vilon45](https://x.com/vilon45) | **19.2K** |
| 🔵 **Discord** | [discord.gg/H8ujXwHkHT](https://discord.gg/H8ujXwHkHT) | **2.3K** |
| 🟡 **Snapchat** | [@vilon](https://snapchat.com/add/vilon) | **1.2M+** |
| 🩷 **TikTok** | [@vln45_](https://tiktok.com/@vln45_) | **1.5K** |
| 🩷 **Instagram** | [@vilon45](https://instagram.com/vilon45) | — |
| 🔵 **Facebook** | Vilon Page | — |
| 🟢 **WhatsApp** | Vilon Group | — |

---

## 📄 License

MIT © 2026 Vilon. All rights reserved.

---

<div align="center">
  <p>Built with ❤️ by <strong>HSG</strong> for the Vilon community</p>
  <p>
    <a href="https://kick.com/vilon">🎮 Watch Live</a> ·
    <a href="https://discord.gg/H8ujXwHkHT">💬 Discord</a> ·
    <a href="https://x.com/vilon45">🐦 X</a>
  </p>
</div>
