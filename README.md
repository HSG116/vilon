<div align="center">
  <img src="https://raw.githubusercontent.com/himedz116-hue/PNG/main/%D8%AA%D8%B5%D9%85%D9%8A%D9%85%20%D8%A8%D8%AF%D9%88%D9%86%20%D8%B9%D9%86%D9%88%D8%A7%D9%86%20(3)%20(1).png" alt="Vilon Stream Hub" width="120" height="120" style="border-radius: 50%;" />
  <h1 align="center">🎮 Vilon Stream Hub</h1>
  <p align="center">
    <strong>Official streaming dashboard for Kick streamer <a href="https://kick.com/vilon">Vilon</a></strong>
    <br />
    Bilingual (EN/AR) · Real-time stats · Live stream player · Community hub
  </p>
  <p align="center">
    <a href="#"><img src="https://img.shields.io/badge/build-passing-brightgreen?style=flat-square" alt="Build Status" /></a>
    <a href="#"><img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" alt="License" /></a>
    <a href="https://react.dev"><img src="https://img.shields.io/badge/react-19.2-61DAFB?style=flat-square&logo=react" alt="React 19" /></a>
    <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/typescript-5.8-3178C6?style=flat-square&logo=typescript" alt="TypeScript 5.8" /></a>
    <a href="https://vite.dev"><img src="https://img.shields.io/badge/vite-6.2-646CFF?style=flat-square&logo=vite" alt="Vite 6" /></a>
    <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/tailwind_css-3-06B6D4?style=flat-square&logo=tailwindcss" alt="Tailwind CSS" /></a>
    <a href="https://vercel.com"><img src="https://img.shields.io/badge/hosted_on-vercel-000000?style=flat-square&logo=vercel" alt="Vercel" /></a>
    <a href="https://kick.com/vilon"><img src="https://img.shields.io/badge/kick-vilon-53FC18?style=flat-square&logo=kick" alt="Kick" /></a>
  </p>
</div>

---

## 📋 Table of Contents

- [About](#-about)
- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📸 Screenshots](#-screenshots)
- [🚀 Getting Started](#-getting-started)
- [📜 Available Scripts](#-available-scripts)
- [📁 Project Structure](#-project-structure)
- [🌐 Social Links](#-social-links)
- [📄 License](#-license)

---

## 💡 About

**Vilon Stream Hub** is a premium, feature-rich streaming dashboard built for the Kick streamer **Vilon**. It provides a centralized hub where fans can watch live streams, view real-time statistics, interact via chat, explore community platforms, and support the streamer — all within a beautifully designed bilingual (English/Arabic) interface.

The app integrates directly with the **Kick API** to fetch live status, viewer counts, follower analytics, recent VODs, clips, and more. It also pulls YouTube subscriber counts for a complete cross-platform snapshot.

---

## ✨ Features

| Feature | Description |
|---|---|
| 📺 **Live Stream Player** | Embedded Kick stream with HLS playback via `hls.js` |
| 💬 **Real-time Chat** | Live chat widget powered by Pusher with role-based styling (owner, mod, VIP, subscriber) |
| 📊 **Live Statistics** | Real-time viewer count, follower count, stream uptime & category |
| 🔗 **Social Hub** | Animated social link cards for Kick, YouTube, X (Twitter), Discord, Snapchat, TikTok, Instagram, Facebook, WhatsApp |
| 🌍 **Bilingual Support** | Full English & Arabic (RTL) interface with instant toggle |
| 📼 **Last Session Report** | Auto-fetches the most recent VOD with duration, time ago, categories, and clips |
| 🏆 **Leaderboards** | Top gifters (all-time, monthly, weekly) via Supabase |
| 🎴 **Community Widgets** | Embedded Discord widget & latest YouTube video |
| 💰 **Support & Donations** | PayPal & Dokan integration with tiered special alert pricing ($50–$1000) |
| 🎬 **Stream Highlights** | Thumbnail grid of the latest 3 clips from recent streams |
| 🌙 **Cinematic UI** | Dark theme with glassmorphism, animated gradients, glow effects, and smooth transitions |
| 📱 **Fully Responsive** | Optimized for mobile, tablet, and desktop with separate mobile/desktop backgrounds |
| 🔄 **Auto-refresh** | Automatic stats refresh every 60 seconds |
| 🔗 **Share Link** | One-click share/copy of the stream URL |

---

## 🛠️ Tech Stack

<table>
  <tr>
    <th>Category</th>
    <th>Technology</th>
  </tr>
  <tr>
    <td>**Framework**</td>
    <td><a href="https://react.dev">React 19</a> · <a href="https://www.typescriptlang.org">TypeScript 5.8</a></td>
  </tr>
  <tr>
    <td>**Bundler**</td>
    <td><a href="https://vite.dev">Vite 6</a></td>
  </tr>
  <tr>
    <td>**Styling**</td>
    <td><a href="https://tailwindcss.com">Tailwind CSS</a> · CSS custom properties</td>
  </tr>
  <tr>
    <td>**Streaming**</td>
    <td><a href="https://github.com/video-dev/hls.js">HLS.js</a> · <a href="https://github.com/cookpete/react-player">React Player</a></td>
  </tr>
  <tr>
    <td>**Real-time**</td>
    <td><a href="https://pusher.com">Pusher JS</a> · <a href="https://supabase.com">Supabase</a></td>
  </tr>
  <tr>
    <td>**Icons**</td>
    <td><a href="https://lucide.dev">Lucide React</a> · Custom SVG icons</td>
  </tr>
  <tr>
    <td>**Animation**</td>
    <td><a href="https://motion.dev">Motion</a> · <a href="https://github.com/catdad/canvas-confetti">canvas-confetti</a> · CSS animations</td>
  </tr>
  <tr>
    <td>**Deployment**</td>
    <td><a href="https://vercel.com">Vercel</a> · <a href="https://pages.github.com">GitHub Pages</a></td>
  </tr>
  <tr>
    <td>**API Integration**</td>
    <td>Kick API v2 · SocialCounts API · Supabase</td>
  </tr>
</table>

---

## 📸 Screenshots

<div align="center">
  <table>
    <tr>
      <td align="center">
        <img src="https://via.placeholder.com/800x450/1a1a2e/FF2D2D?text=Desktop+View" alt="Desktop View" width="400" />
        <br /><em>Desktop Dashboard</em>
      </td>
      <td align="center">
        <img src="https://via.placeholder.com/800x450/1a1a2e/53FC18?text=Live+Stream+Player" alt="Live Stream" width="400" />
        <br /><em>Live Stream Player</em>
      </td>
    </tr>
    <tr>
      <td align="center">
        <img src="https://via.placeholder.com/800x450/1a1a2e/5865F2?text=Mobile+View" alt="Mobile View" width="400" />
        <br /><em>Mobile Responsive</em>
      </td>
      <td align="center">
        <img src="https://via.placeholder.com/800x450/1a1a2e/FE2C55?text=Chat+%26+Stats" alt="Chat & Stats" width="400" />
        <br /><em>Chat & Statistics</em>
      </td>
    </tr>
    <tr>
      <td align="center" colspan="2">
        <img src="https://via.placeholder.com/800x200/1a1a2e/FFD700?text=Social+Links+Animated+Cards" alt="Social Links" width="800" />
        <br /><em>Animated Social Link Cards</em>
      </td>
    </tr>
  </table>
</div>

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ (recommended: 20 LTS)
- **npm** 9+ or **yarn** 1.22+
- A **Gemini API key** (optional, for AI features)
- **Supabase** credentials (optional, for leaderboard features)

### Installation

```bash
# Clone the repository
git clone https://github.com/vilon45/vilon-stream-hub.git
cd vilon-stream-hub

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local and add your API keys:
#   GEMINI_API_KEY=your_key_here
#   VITE_SUPABASE_URL=your_supabase_url
#   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Start the development server
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

> **Note:** The app works without API keys — Kick API integration, chat, and core features run without configuration. API keys are only needed for Supabase leaderboards and Gemini AI features.

---

## 📜 Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start Vite development server on port 3000 |
| `npm run build` | Type-check & build for production into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run deploy` | Build & deploy to GitHub Pages via `gh-pages` |

---

## 📁 Project Structure

```
vilon-stream-hub/
├── api/                  # Serverless API functions (Vercel)
├── components/           # React components
│   ├── AnimeHQPromo.tsx  # Anime HQ promotional banner
│   ├── Chat.tsx          # Real-time chat widget
│   ├── CommunityWidgets.tsx  # Discord & YouTube embeds
│   ├── Icons.tsx         # Custom SVG icon library
│   ├── LatestYoutube.tsx # Latest YouTube video embed
│   ├── StatsSection.tsx  # Live statistics & leaderboards
│   └── StreamPlayer.tsx  # HLS stream player
├── database/             # Supabase schema & migrations
├── public/               # Static assets
│   ├── robots.txt        # Search engine crawling rules
│   ├── sitemap.xml       # SEO sitemap
│   └── *.png             # OG images & branding
├── services/             # API service layer
├── utils/                # Utility functions
│   └── kickApi.ts        # Kick API wrapper
├── App.tsx               # Main application component
├── index.tsx             # Application entry point
├── types.ts              # TypeScript type definitions
├── vite.config.ts        # Vite configuration
├── vercel.json           # Vercel deployment config
├── tsconfig.json         # TypeScript configuration
├── package.json          # Dependencies & scripts
└── tailwind.config.*     # Tailwind CSS configuration
```

---

## 🌐 Social Links

Stay connected with **Vilon** across all platforms:

| Platform | Handle/Link | Followers |
|---|---|---|
| <img src="https://via.placeholder.com/16/53FC18/000000?text=+" width="16" /> **Kick** | [kick.com/vilon](https://kick.com/vilon) | **121.1K** |
| <img src="https://via.placeholder.com/16/FF0000/ffffff?text=+" width="16" /> **YouTube** | [@vilon45](https://youtube.com/@vilon45) | **47.1K** |
| <img src="https://via.placeholder.com/16/000000/ffffff?text=+" width="16" /> **X (Twitter)** | [@vilon45](https://x.com/vilon45) | **19.2K** |
| <img src="https://via.placeholder.com/16/5865F2/ffffff?text=+" width="16" /> **Discord** | [discord.gg/H8ujXwHkHT](https://discord.gg/H8ujXwHkHT) | **2.3K** |
| <img src="https://via.placeholder.com/16/FFFC00/000000?text=+" width="16" /> **Snapchat** | [@vilon](https://snapchat.com/add/vilon) | **1.2M+** |
| <img src="https://via.placeholder.com/16/FE2C55/ffffff?text=+" width="16" /> **TikTok** | [@vln45_](https://tiktok.com/@vln45_) | **1.5K** |
| <img src="https://via.placeholder.com/16/E1306C/ffffff?text=+" width="16" /> **Instagram** | [@vilon45](https://instagram.com/vilon45) | — |
| <img src="https://via.placeholder.com/16/1877F2/ffffff?text=+" width="16" /> **Facebook** | Vilon Page | — |
| <img src="https://via.placeholder.com/16/25D366/ffffff?text=+" width="16" /> **WhatsApp** | Vilon Group | — |

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>
    Built with ❤️ by <strong>HSG</strong> for the Vilon community
  </p>
  <p>
    <a href="https://kick.com/vilon">🎮 Watch Live on Kick</a> ·
    <a href="https://discord.gg/H8ujXwHkHT">💬 Join Discord</a> ·
    <a href="https://x.com/vilon45">🐦 Follow on X</a>
  </p>
  <p>
    <sub>© 2026 Vilon. All rights reserved.</sub>
  </p>
</div>
