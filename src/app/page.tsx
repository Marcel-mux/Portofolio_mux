'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sun,
  Moon,
  ArrowUpRight,
  Terminal,
  Cpu,
  ShieldCheck,
  MessageSquare,
  Code2,
  Copy,
  Check,
  Activity,
  Server,
  Smartphone,
  Download,
  AtSign,
  Briefcase,
  GraduationCap,
} from 'lucide-react';

type TabKey = 'all' | 'ai' | 'web' | 'linux';
type Scheme = 'dark' | 'light';

function getStoredOverride(): Scheme | null {
  try {
    const val = localStorage.getItem('color-scheme');
    return val === 'dark' || val === 'light' ? val : null;
  } catch {
    return null;
  }
}

function getSystemScheme(): Scheme {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applySchemeToDom(override: Scheme | null, resolved: Scheme): void {
  const meta = document.querySelector('meta[name="color-scheme"]');
  if (meta) {
    meta.setAttribute('content', override ?? 'light dark');
  }
  const root = document.documentElement;
  root.classList.toggle('dark', resolved === 'dark');
  root.classList.toggle('light', resolved === 'light');
}

export default function Home() {
  const [resolvedTheme, setResolvedTheme] = useState<Scheme>('dark');
  const [activeTab, setActiveTab] = useState<TabKey>('all');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const syncFromPreference = useCallback(() => {
    const override = getStoredOverride();
    const resolved = override ?? getSystemScheme();
    setResolvedTheme(resolved);
    applySchemeToDom(override, resolved);
  }, []);

  useEffect(() => {
    syncFromPreference();

    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handleMediaChange = () => {
      // Only react when following system default; never erase an explicit stored override.
      const override = getStoredOverride();
      if (!override) {
        const next = mq.matches ? 'dark' : 'light';
        setResolvedTheme(next);
        applySchemeToDom(null, next);
      }
    };
    const handleStorage = (e: StorageEvent) => {
      if (e.key === null || e.key === 'color-scheme') {
        syncFromPreference();
      }
    };

    mq.addEventListener('change', handleMediaChange);
    window.addEventListener('storage', handleStorage);
    return () => {
      mq.removeEventListener('change', handleMediaChange);
      window.removeEventListener('storage', handleStorage);
    };
  }, [syncFromPreference]);

  const toggleTheme = () => {
    const system = getSystemScheme();
    const target: Scheme = resolvedTheme === 'dark' ? 'light' : 'dark';
    const nextOverride: Scheme | null = target === system ? null : target;

    try {
      if (nextOverride) {
        localStorage.setItem('color-scheme', nextOverride);
      } else {
        localStorage.removeItem('color-scheme');
      }
    } catch {
      // Still apply theme visually even when storage is blocked.
    }

    setResolvedTheme(target);
    applySchemeToDom(nextOverride, target);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('marcel.mux@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const projects = [
    {
      id: 'hermes-cockpit',
      categories: ['web', 'ai'] as TabKey[],
      tag: 'OPEN SOURCE · MOBILE PWA & REVERSE PROXY',
      title: 'Hermes Cockpit — Retro-Tech Mobile PWA for Hermes Agent',
      desc: 'Progressive Web App (PWA) client mobile-first open-source untuk Nous Research Hermes Agent. Dilengkapi token streaming real-time via WebSocket, interactive thought-process accordion, dedicated profile isolation, zero-dependency reverse proxy (server.mjs) dengan kompresi Brotli/Gzip, audio cues, dan Docker Compose ready.',
      chips: ['React Native / Expo Web', 'TypeScript', 'Tailwind CSS', 'Node.js Proxy', 'WebSockets', 'Docker'],
      image: '/projects/hermes-cockpit-preview.png',
      imageSecondary: '/projects/hermes-cockpit-icon.png',
      github: 'https://github.com/Marcel-mux/hermes-cockpit',
      metrics: 'Zero-Dependency Proxy · Real-Time WS Streaming · Standalone PWA',
    },
    {
      id: 'antigravity-gateway',
      categories: ['ai', 'linux'] as TabKey[],
      tag: 'PRODUCTION CLI-TO-DISCORD GATEWAY',
      title: 'Antigravity Discord Gateway — Persistent Multi-Server Agent Bridge',
      desc: 'Gateway Discord berbasis Python & systemd untuk mengendalikan Google Antigravity CLI (agy) secara remote dari HP maupun desktop. Mendukung sesi persisten per channel, multi-server @mention gating + missed-message backfill, cross-channel #mention context, pencarian histori SQLite FTS5, live streaming dengan auto-split aman blok kode, dan kontrol model/kuota interaktif.',
      chips: ['Python 3', 'discord.py', 'systemd', 'SQLite FTS5', 'Multi-Server Gating', 'Live Streaming'],
      image: '/projects/antigravity-gateway-arch.png',
      imageSecondary: '/projects/antigravity-gateway-cli.png',
      github: 'https://github.com/Marcel-mux',
      metrics: 'Persistent Sessions · Multi-Server @mention · SQLite FTS5 Search',
    },
    {
      id: 'wa-engine',
      categories: ['ai'] as TabKey[],
      tag: 'AUTONOMOUS AI & MULTI-AGENT ORCHESTRATION',
      title: 'Autonomous WhatsApp & Telegram Multi-Agent Engine',
      desc: 'Arsitektur agen bot otonom (Sipuki & Cobra Engine) berbasis Baileys WebSocket & Hermes Gateway. Terhubung langsung ke self-hosted 9Router LLM Gateway, pipeline transkripsi audio/TTS, analisis gambar (Vision), multi-personality routing, dan live parallel web search tanpa ketergantungan langganan SaaS pihak ketiga.',
      chips: ['Node.js', 'Baileys WS', 'Hermes Gateway', '9Router / Gemini', 'systemd Daemons', 'Parallel Search'],
      image: '/projects/whatsapp-cobra.jpg',
      imageSecondary: '/projects/telegram-agents.jpg',
      github: 'https://github.com/Marcel-mux',
      metrics: 'Self-Hosted Routing · Multi-Persona Agents · Vision & Audio/TTS',
    },
    {
      id: 'antigravity-guard',
      categories: ['ai', 'linux'] as TabKey[],
      tag: 'RESILIENCE & AUTO-HEAL DAEMON',
      title: 'Antigravity Guard — Automated OAuth Session Healer for 9Router',
      desc: 'Sistem daemon pengawas otomatis berbasis Python & systemd untuk menjaga reliabilitas akun OAuth Antigravity di dalam 9Router LLM Gateway. Mendeteksi token kadaluarsa lewat SQLite/API probe, memulihkan sesi macet otomatis, dilengkapi proxy lokal anti-WAF (agentrouter-proxy & gemini-web2api).',
      chips: ['Python 3', 'Node.js Proxy', 'OAuth Lifecycle', 'systemd Watchdog', '9Router API', 'SQLite Probes'],
      image: '/projects/system-architecture.png',
      imageSecondary: '/projects/vps-infra-map.png',
      github: 'https://github.com/Marcel-mux/antigravity-guard-9router',
      metrics: 'Zero-Touch Recovery · Automated Token Refresh · WAF Mitigation',
    },
    {
      id: 'finpulse',
      categories: ['web'] as TabKey[],
      tag: 'FINANCIAL SAAS & DATA ANALYTICS',
      title: 'FinPulse — Personal Financial Tracker & Analytics Platform',
      desc: 'Platform pencatat dan analisis kekayaan bersih (Net Worth), multi-rekening, hingga pelacakan limit kredit & cicilan secara real-time. Dilengkapi fitur Chatbot QA pintar, visualisasi grafik interaktif, dan integrasi notifikasi bot Telegram.',
      chips: ['Next.js 14', 'TypeScript', 'Prisma ORM', 'PostgreSQL', 'Tailwind CSS', 'Vercel'],
      image: '/projects/finpulse-charts.jpg',
      imageSecondary: '/projects/finpulse.jpg',
      github: 'https://github.com/Marcel-mux/FInPulse-Project',
      metrics: 'Multi-Account Net Worth · AI Q&A Chatbot · Telegram Alerts',
    },
    {
      id: 'linux-infra',
      categories: ['linux'] as TabKey[],
      tag: 'MULTI-NODE CLOUD MESH & DEVOPS AUTOMATION',
      title: 'Distributed 6-Node Zero-Trust Mesh & Self-Hosted AI Gateway Fleet',
      desc: 'Infrastruktur hybrid di atas Oracle Cloud Always Free Ampere A1 (4 OCPU / 24 GB RAM ARM64 / 200 GB NVMe) plus perangkat edge (ThinkPad CachyOS, EndeavourOS, Android/Termux) dan ephemeral sandboxes. Terhubung lewat Tailscale Zero-Trust mesh, menjalankan 10 service systemd produksi, gateway AI multi-provider, dan 17 cronjob pemantauan serta audit keamanan.',
      chips: ['Oracle Cloud A1 ARM64', 'Ubuntu 26.04 LTS', 'Tailscale Mesh (6 nodes)', 'systemd (10 services)', 'Fail2ban + SSH Hardening', '17 Cronjobs'],
      image: '/projects/vps-infra-map.png',
      imageSecondary: '/projects/endeavour-neofetch.jpg',
      github: 'https://github.com/Marcel-mux',
      metrics: '4 OCPU / 24 GB RAM · 6 Mesh Nodes · 10 Live Services',
    },
  ];

  const filteredProjects =
    activeTab === 'all' ? projects : projects.filter((p) => p.categories.includes(activeTab));

  const liveServices = [
    { name: '9router.service', desc: 'AI Multi-Provider Gateway · 22 koneksi / 7 provider family', port: ':20128' },
    { name: 'agy-gateway.service', desc: 'Antigravity Discord Gateway · CLI bridge, FTS5 search & live stream', port: 'Discord WS' },
    { name: 'hermes-gateway.service', desc: 'Orkestrator agen Hermes (Telegram / Discord / WhatsApp)', port: 'internal' },
    { name: 'hermes-dashboard.service', desc: 'Web dashboard agent · realtime session & tool telemetry', port: ':9119' },
    { name: 'hermes-mobile.service', desc: 'Hermes Cockpit PWA reverse proxy + Brotli compression', port: ':8088' },
    { name: 'wa-ai-bot.service', desc: 'Baileys WhatsApp multi-agent engine (Sipuki & Cobra)', port: 'WA WS' },
    { name: 'agentrouter-proxy.service', desc: 'Local bridge proxy + header injection anti-WAF', port: ':8318' },
    { name: 'gemini-web2api.service', desc: 'Gemini web-to-OpenAI API bridge', port: 'internal' },
    { name: 'tailscaled.service', desc: 'Zero-Trust mesh VPN · 6 node terdaftar', port: 'mesh' },
    { name: 'fail2ban.service', desc: 'Intrusion prevention + SSH brute-force banning', port: 'security' },
  ];

  const meshNodes = [
    { host: 'muxoracle', spec: 'Oracle Cloud · 4 OCPU / 24 GB ARM64', role: 'Core / Primary', status: 'online' },
    { host: 'cachyos-ltx13g1', spec: 'ThinkPad X13 · CachyOS', role: 'Daily driver', status: 'edge' },
    { host: 'zendeavour-sky232', spec: 'EndeavourOS · Sky 232', role: 'Dev / backup', status: 'edge' },
    { host: 'infinix-gt-30-pro', spec: 'Android · Termux SSH', role: 'Mobile ops node', status: 'edge' },
    { host: 'cue-* · muse', spec: '2 Tagged cloud sandboxes', role: 'Ephemeral compute', status: 'ephemeral' },
  ];

  const experienceItems = [
    {
      role: 'Independent AI Systems & Full-Stack Builder',
      org: 'Self-Employed / Open Source · Nusantara (IKN)',
      period: '3+ Years – Present',
      summary:
        'Merancang, membangun, dan mengoperasikan sistem agen AI otonom, aplikasi Web/PWA modern, serta infrastruktur Linux & cloud self-hosted secara end-to-end hingga produksi 24/7.',
    },
    {
      role: 'Solo Barista & Cafe Operations',
      org: 'Independent Cafe Operations · Ring IKN',
      period: '3 Years – Present',
      summary:
        'Mengelola operasional kafe harian secara mandiri penuh — manajemen stok/restock, produksi minuman, quality control, dan layanan pelanggan — melatih disiplin operasional, konsistensi, dan ownership tinggi.',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-[#171717] dark:bg-[#08090a] dark:text-[#f7f8f8] transition-colors duration-200">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[#171717] focus:text-white dark:focus:bg-[#5e6ad2] focus:text-xs focus:font-medium focus:shadow-lg"
      >
        Lewati ke konten utama
      </a>

      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/85 dark:bg-[#08090a]/85 backdrop-blur-md border-b border-black/5 dark:border-white/10">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-full overflow-hidden border border-black/10 dark:border-white/20 shadow-sm">
              <Image
                src="/projects/profile.jpg"
                alt="Marcelino M. Turangan"
                fill
                sizes="36px"
                className="object-cover object-center"
              />
            </div>
            <div>
              <span className="font-medium text-sm tracking-tight block">Marcelino M. Turangan</span>
              <span className="text-[11px] text-black/50 dark:text-white/40 font-mono block -mt-0.5">
                IKN, Indonesia (WITA)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <nav
              aria-label="Primary"
              className="hidden md:flex items-center gap-5 text-xs font-medium text-black/60 dark:text-white/60"
            >
              <a href="#projects" className="hover:text-black dark:hover:text-white transition-colors">
                Projects
              </a>
              <a href="#infra" className="hover:text-black dark:hover:text-white transition-colors">
                Infra
              </a>
              <a href="#background" className="hover:text-black dark:hover:text-white transition-colors">
                Experience
              </a>
              <a href="#skills" className="hover:text-black dark:hover:text-white transition-colors">
                Capabilities
              </a>
              <a href="#contact" className="hover:text-black dark:hover:text-white transition-colors">
                Contact
              </a>
            </nav>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label={resolvedTheme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              className="p-2 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition-all"
            >
              {resolvedTheme === 'dark' ? (
                <Sun size={15} aria-hidden="true" />
              ) : (
                <Moon size={15} aria-hidden="true" />
              )}
            </button>

            <a
              href="/CV_Marcelino_M_Turangan.pdf"
              download="CV_Marcelino_M_Turangan.pdf"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black/80 dark:text-white/80 hover:bg-black/10 dark:hover:bg-white/10 transition-all"
            >
              <Download size={13} aria-hidden="true" />
              CV
            </a>

            <a
              href="https://wa.me/628979360724?text=Halo%20Marcelino,%20saya%20tertarik%20dengan%20portofolio%20Anda"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium px-3.5 py-1.5 rounded-md bg-[#171717] text-white dark:bg-[#5e6ad2] dark:hover:bg-[#7170ff] hover:bg-black transition-all shadow-sm"
            >
              Hire Me
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-6 pt-16 pb-24">
        {/* Hero Section */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black/70 dark:text-white/70 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
            Available for Remote Roles, AI Integrations, Web/PWA & Linux Ops
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="md:col-span-2"
            >
              <h1
                id="main-content"
                tabIndex={-1}
                className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.08] mb-6"
              >
                Membangun Solusi AI Otomasi,{' '}
                <span className="text-black/40 dark:text-white/40">
                  Full-Stack Web & PWA, dan Sistem Linux Tangguh.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-black/70 dark:text-white/70 leading-relaxed max-w-xl mb-8">
                Praktisi Linux (3+ tahun) & AI Systems Integrator dari Nusantara (IKN). Berpengalaman
                mengintegrasikan agen AI otonom ke WhatsApp, Discord & Telegram, membangun aplikasi Web/PWA modern, dan
                mengoperasikan fleet Linux ARM64 multi-node dengan otomasi penuh.
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href="/CV_Marcelino_M_Turangan.pdf"
                  download="CV_Marcelino_M_Turangan.pdf"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-[#171717] text-white dark:bg-[#5e6ad2] dark:hover:bg-[#7170ff] hover:bg-black transition-all shadow-sm"
                >
                  <Download size={16} aria-hidden="true" />
                  Download CV (PDF)
                </a>
                <a
                  href="https://github.com/Marcel-mux"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black/80 dark:text-white/80 hover:bg-black/10 dark:hover:bg-white/10 transition-all"
                >
                  <Code2 size={16} aria-hidden="true" />
                  GitHub @Marcel-mux
                  <ArrowUpRight size={14} className="opacity-60" aria-hidden="true" />
                </a>
                <a
                  href="https://www.threads.net/@marcelt_0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black/80 dark:text-white/80 hover:bg-black/10 dark:hover:bg-white/10 transition-all"
                >
                  <AtSign size={16} aria-hidden="true" />
                  Threads @marcelt_0
                  <ArrowUpRight size={14} className="opacity-60" aria-hidden="true" />
                </a>
              </div>
            </motion.div>

            {/* Profile Photo Card (Primary LCP Image) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative aspect-square max-w-[280px] mx-auto md:ml-auto w-full rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 shadow-lg dark:shadow-2xl bg-black/5 dark:bg-white/5 group"
            >
              <Image
                src="/projects/profile.jpg"
                alt="Marcelino M. Turangan — AI Systems Integrator di Nusantara (IKN)"
                fill
                sizes="(max-width: 768px) 280px, 280px"
                priority
                fetchPriority="high"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                <span className="text-white text-xs font-mono">Marcelino M. Turangan • IKN</span>
              </div>
            </motion.div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-black/5 dark:border-white/10">
            <div className="p-3.5 rounded-lg bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
              <div className="font-mono text-xl font-medium text-indigo-500 dark:text-brand-glow">4 OCPU / 24GB</div>
              <div className="text-xs text-black/50 dark:text-white/40">Oracle Cloud ARM64</div>
            </div>
            <div className="p-3.5 rounded-lg bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
              <div className="font-mono text-xl font-medium text-emerald-500">10 Services</div>
              <div className="text-xs text-black/50 dark:text-white/40">Live systemd Daemons</div>
            </div>
            <div className="p-3.5 rounded-lg bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
              <div className="font-mono text-xl font-medium">6 Nodes</div>
              <div className="text-xs text-black/50 dark:text-white/40">Tailscale Zero-Trust Mesh</div>
            </div>
            <div className="p-3.5 rounded-lg bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
              <div className="font-mono text-xl font-medium">17 Cronjobs</div>
              <div className="text-xs text-black/50 dark:text-white/40">Automated Ops & Monitoring</div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-black/40 dark:text-brand-glow block mb-1">
                {'// Selected Works & Case Studies'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight">Karya & Produk Terverifikasi</h2>
            </div>

            {/* Filter Buttons */}
            <div
              role="group"
              aria-label="Filter proyek berdasarkan kategori"
              className="inline-flex p-1 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-medium"
            >
              {(
                [
                  { key: 'all', label: 'Semua' },
                  { key: 'ai', label: 'AI & Agents' },
                  { key: 'web', label: 'Web & PWA' },
                  { key: 'linux', label: 'Linux & Cloud' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  aria-pressed={activeTab === tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-3 py-1.5 rounded-md transition-all uppercase tracking-wider text-[11px] font-mono ${
                    activeTab === tab.key
                      ? 'bg-white text-black dark:bg-white/10 dark:text-white shadow-sm'
                      : 'text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-10">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((p, idx) => (
                <motion.article
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  className="rounded-2xl bg-black/[0.02] dark:bg-[#0f1011] border border-black/10 dark:border-white/10 overflow-hidden hover:border-black/20 dark:hover:border-white/20 transition-all shadow-sm"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                    {/* Visual Media Showcase */}
                    <div className="lg:col-span-7 p-6 sm:p-8 bg-black/[0.03] dark:bg-black/30 border-b lg:border-b-0 lg:border-r border-black/5 dark:border-white/5 flex flex-col justify-center">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="relative aspect-[9/16] sm:aspect-auto sm:h-72 rounded-xl overflow-hidden border border-black/10 dark:border-white/10 shadow-md bg-black/5 dark:bg-white/5 group">
                          <Image
                            src={p.image}
                            alt={`${p.title} — Tampilan utama`}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 28vw"
                            className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="relative aspect-[9/16] sm:aspect-auto sm:h-72 rounded-xl overflow-hidden border border-black/10 dark:border-white/10 shadow-md bg-black/5 dark:bg-white/5 hidden sm:block group">
                          <Image
                            src={p.imageSecondary}
                            alt={`${p.title} — Tampilan arsitektur atau detail`}
                            fill
                            sizes="(max-width: 1024px) 50vw, 28vw"
                            className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-black/50 dark:text-white/40 gap-2">
                        <span>● Verified Build</span>
                        <span className="truncate">{p.metrics}</span>
                      </div>
                    </div>

                    {/* Details Info */}
                    <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
                      <div>
                        <span className="text-[11px] font-mono font-medium text-black/50 dark:text-brand-glow uppercase tracking-wider block mb-2">
                          {p.tag}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-medium tracking-tight mb-3">{p.title}</h3>
                        <p className="text-sm text-black/70 dark:text-white/70 leading-relaxed mb-6">{p.desc}</p>

                        <div className="flex flex-wrap gap-1.5 mb-8">
                          {p.chips.map((chip) => (
                            <span
                              key={chip}
                              className="text-xs font-mono px-2.5 py-1 rounded-md bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-black/70 dark:text-white/70"
                            >
                              {chip}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-black/5 dark:border-white/10 flex items-center justify-between">
                        <a
                          href={p.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Lihat Source & Detail — ${p.title}`}
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-black dark:text-white hover:text-brand-glow transition-colors"
                        >
                          Lihat Source & Detail
                          <ArrowUpRight size={13} aria-hidden="true" />
                        </a>

                        <a
                          href={`https://wa.me/628979360724?text=${encodeURIComponent(
                            `Halo Marcel, saya tertarik dengan proyek ${p.title}`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Request Demo — ${p.title}`}
                          className="text-xs font-medium text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
                        >
                          Request Demo ↗
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* Infrastructure Section */}
        <section id="infra" className="mb-20">
          <div className="mb-8">
            <span className="text-xs font-mono uppercase tracking-wider text-black/40 dark:text-brand-glow block mb-1">
              {'// Live Infrastructure & Fleet'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight">Infrastruktur yang Berjalan Sekarang</h2>
            <p className="text-sm text-black/60 dark:text-white/60 mt-2 max-w-2xl">
              Bukan mockup — ini daftar service dan node yang aktif melayani trafik produksi, diambil langsung dari{' '}
              <span className="font-mono text-black/80 dark:text-white/80">systemctl</span> dan{' '}
              <span className="font-mono text-black/80 dark:text-white/80">tailscale status</span>.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Live services */}
            <div className="lg:col-span-7 rounded-2xl bg-black/[0.02] dark:bg-[#0f1011] border border-black/10 dark:border-white/10 p-6 sm:p-7">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <Activity size={16} className="text-emerald-500" aria-hidden="true" />
                  <h3 className="text-sm font-medium tracking-tight">Live systemd Services</h3>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  10 ACTIVE
                </span>
              </div>

              <div className="space-y-2.5">
                {liveServices.map((s) => (
                  <div
                    key={s.name}
                    className="flex items-start justify-between gap-4 py-2 border-b border-black/5 dark:border-white/5 last:border-0 last:pb-0"
                  >
                    <div className="min-w-0">
                      <div className="font-mono text-xs text-black/90 dark:text-white/90 truncate">{s.name}</div>
                      <div className="text-[11px] text-black/50 dark:text-white/40 mt-0.5">{s.desc}</div>
                    </div>
                    <span className="font-mono text-[10px] shrink-0 px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-black/50 dark:text-white/50">
                      {s.port}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mesh nodes */}
            <div className="lg:col-span-5 rounded-2xl bg-black/[0.02] dark:bg-[#0f1011] border border-black/10 dark:border-white/10 p-6 sm:p-7 flex flex-col">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck size={16} className="text-brand-glow" aria-hidden="true" />
                  <h3 className="text-sm font-medium tracking-tight">Tailscale Mesh</h3>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-brand-glow/10 text-brand-glow border border-brand-glow/20">
                  6 NODES
                </span>
              </div>

              <div className="space-y-3 flex-1">
                {meshNodes.map((n) => (
                  <div key={n.host} className="flex items-start gap-2.5">
                    <span
                      aria-hidden="true"
                      className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${
                        n.status === 'online'
                          ? 'bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.6)]'
                          : n.status === 'edge'
                            ? 'bg-amber-500/70'
                            : 'bg-black/30 dark:bg-white/30'
                      }`}
                    />
                    <div className="min-w-0">
                      <div className="text-xs font-medium text-black/90 dark:text-white/90">{n.host}</div>
                      <div className="text-[11px] text-black/50 dark:text-white/40 leading-relaxed">{n.spec}</div>
                      <div className="text-[10px] font-mono text-black/40 dark:text-white/35 mt-0.5 uppercase tracking-wide">
                        {n.role}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-black/5 dark:border-white/10">
                <div className="flex items-center gap-2 text-[11px] font-mono text-black/50 dark:text-white/40">
                  <Terminal size={12} aria-hidden="true" />
                  <span>17 cronjobs · health report 2×/hari · audit keamanan 07:00</span>
                </div>
              </div>
            </div>
          </div>

          {/* AI Gateway strip */}
          <div className="mt-4 rounded-2xl bg-black/[0.02] dark:bg-[#0f1011] border border-black/10 dark:border-white/10 p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2.5">
                <Cpu size={16} className="text-emerald-500" aria-hidden="true" />
                <h3 className="text-sm font-medium tracking-tight">9Router — Multi-Provider AI Gateway</h3>
              </div>
              <span className="text-[11px] font-mono text-black/50 dark:text-white/40">
                22 connections · 7 provider families · 5 fallback combos
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {[
                'Antigravity OAuth ×8',
                'OpenAI-Compatible ×7',
                'CodeBuddy ×2',
                'Qoder ×2',
                'Cloudflare AI',
                'OpenRouter',
                'TokenHarbor',
                'Combos: MODELSPAN · Hydrogen · 3.8F_GG · Bansos_men · Argon',
              ].map((t) => (
                <span
                  key={t}
                  className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-black/60 dark:text-white/60"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Experience & Education Section */}
        <section id="background" className="mb-20">
          <div className="mb-8">
            <span className="text-xs font-mono uppercase tracking-wider text-black/40 dark:text-brand-glow block mb-1">
              {'// Experience & Education'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight">Pengalaman & Latar Belakang</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 space-y-4">
              {experienceItems.map((exp) => (
                <div
                  key={exp.role}
                  className="p-6 rounded-2xl bg-black/[0.02] dark:bg-[#0f1011] border border-black/10 dark:border-white/10"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2.5">
                      <Briefcase size={16} className="text-brand-glow shrink-0" aria-hidden="true" />
                      <h3 className="text-base font-medium tracking-tight">{exp.role}</h3>
                    </div>
                    <span className="text-[11px] font-mono text-black/50 dark:text-white/40">{exp.period}</span>
                  </div>
                  <div className="text-xs font-mono text-black/50 dark:text-white/50 mb-3">{exp.org}</div>
                  <p className="text-sm text-black/70 dark:text-white/70 leading-relaxed">{exp.summary}</p>
                </div>
              ))}
            </div>

            <div className="lg:col-span-4 rounded-2xl bg-black/[0.02] dark:bg-[#0f1011] border border-black/10 dark:border-white/10 p-6 flex flex-col justify-between gap-6">
              <div>
                <div className="flex items-center gap-2.5 mb-4">
                  <GraduationCap size={18} className="text-emerald-500" aria-hidden="true" />
                  <h3 className="text-base font-medium tracking-tight">Education</h3>
                </div>
                <div className="text-sm font-medium text-black/90 dark:text-white/90">Manado State Polytechnic</div>
                <div className="text-xs text-black/60 dark:text-white/50 mt-1">
                  Politeknik Negeri Manado · North Sulawesi, Indonesia
                </div>
              </div>

              <div className="pt-5 border-t border-black/5 dark:border-white/10">
                <div className="text-xs text-black/60 dark:text-white/50 mb-3">
                  Ingin versi ringkas siap cetak / ATS?
                </div>
                <a
                  href="/CV_Marcelino_M_Turangan.pdf"
                  download="CV_Marcelino_M_Turangan.pdf"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium bg-[#171717] text-white dark:bg-[#5e6ad2] dark:hover:bg-[#7170ff] hover:bg-black transition-all"
                >
                  <Download size={14} aria-hidden="true" />
                  Download CV Lengkap (PDF)
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Capabilities Section */}
        <section id="skills" className="mb-20">
          <div className="mb-8">
            <span className="text-xs font-mono uppercase tracking-wider text-black/40 dark:text-brand-glow block mb-1">
              {'// Core Capabilities & Tech Stack'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight">Keahlian & Spesialisasi</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-black/[0.02] dark:bg-[#0f1011] border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all">
              <div className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center mb-5">
                <Cpu size={20} className="text-brand-glow" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-medium tracking-tight mb-2">AI Systems & Agents</h3>
              <p className="text-xs text-black/60 dark:text-white/60 leading-relaxed mb-4">
                Membangun agen AI otonom mandiri yang hemat biaya, terhubung ke WhatsApp, Discord & Telegram, dengan
                live parallel search, vision, dan integrasi tools.
              </p>
              <ul className="space-y-2 text-xs text-black/70 dark:text-white/70 font-mono">
                <li className="flex items-center gap-2">✓ Multi-Agent Orchestration (Hermes & Agy)</li>
                <li className="flex items-center gap-2">✓ WhatsApp Baileys, Discord & Telegram Bots</li>
                <li className="flex items-center gap-2">✓ Self-Hosted LLM Gateway (9Router)</li>
                <li className="flex items-center gap-2">✓ WebSocket Real-Time Token Streaming</li>
                <li className="flex items-center gap-2">✓ Vision & Audio/TTS Pipeline</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-black/[0.02] dark:bg-[#0f1011] border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all">
              <div className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center mb-5">
                <Smartphone size={20} className="text-emerald-500" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-medium tracking-tight mb-2">Modern Web & Mobile PWA</h3>
              <p className="text-xs text-black/60 dark:text-white/60 leading-relaxed mb-4">
                Mengembangkan aplikasi web dan Progressive Web Apps (PWA) responsif berstandar modern dengan arsitektur
                terstruktur dan performa tinggi.
              </p>
              <ul className="space-y-2 text-xs text-black/70 dark:text-white/70 font-mono">
                <li className="flex items-center gap-2">✓ Next.js App Router & React</li>
                <li className="flex items-center gap-2">✓ React Native / Expo Web PWA</li>
                <li className="flex items-center gap-2">✓ TypeScript & Strict System Design</li>
                <li className="flex items-center gap-2">✓ Prisma ORM, PostgreSQL & SQLite FTS5</li>
                <li className="flex items-center gap-2">✓ Zero-Dependency Node.js Reverse Proxy</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-black/[0.02] dark:bg-[#0f1011] border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all">
              <div className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center mb-5">
                <Server size={20} className="text-blue-500" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-medium tracking-tight mb-2">Linux & Cloud Systems</h3>
              <p className="text-xs text-black/60 dark:text-white/60 leading-relaxed mb-4">
                Mengelola fleet Linux hybrid multi-node: cloud ARM64, laptop Arch-based, dan node Android — semuanya
                tersambung mesh terenkripsi dengan otomasi penuh.
              </p>
              <ul className="space-y-2 text-xs text-black/70 dark:text-white/70 font-mono">
                <li className="flex items-center gap-2">✓ 3+ Years Linux (EndeavourOS / CachyOS)</li>
                <li className="flex items-center gap-2">✓ Oracle Cloud ARM64 (4 OCPU / 24GB)</li>
                <li className="flex items-center gap-2">✓ 6-Node Tailscale Zero-Trust Mesh</li>
                <li className="flex items-center gap-2">✓ 10 systemd Services + Python Auto-Healers</li>
                <li className="flex items-center gap-2">✓ Fail2ban, SSH Hardening & 17 Cronjobs</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contact Banner */}
        <section
          id="contact"
          className="rounded-2xl p-8 sm:p-12 bg-black/[0.03] dark:bg-[#0f1011] border border-black/10 dark:border-white/10 text-center relative overflow-hidden"
        >
          <div className="max-w-xl mx-auto relative z-10">
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight mb-3">Mari Membangun Solusi Bersama</h2>
            <p className="text-sm text-black/60 dark:text-white/60 leading-relaxed mb-6">
              Tersedia untuk proyek integrasi agen AI (WhatsApp/Discord/Telegram), pembuatan webapp & PWA, konsultasi
              infrastruktur Linux/Cloud, atau peluang remote engineering.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://wa.me/628979360724?text=Halo%20Marcelino,%20saya%20tertarik%20bekerjasama%20untuk%20proyek"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium bg-[#171717] text-white dark:bg-[#5e6ad2] dark:hover:bg-[#7170ff] hover:bg-black transition-all shadow-sm"
              >
                <MessageSquare size={15} aria-hidden="true" />
                Chat WhatsApp (+62 897-9360-724)
              </a>
              <a
                href="/CV_Marcelino_M_Turangan.pdf"
                download="CV_Marcelino_M_Turangan.pdf"
                className="px-4 py-2.5 rounded-lg text-sm font-medium bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black/80 dark:text-white/80 hover:bg-black/10 dark:hover:bg-white/10 transition-all inline-flex items-center gap-2"
              >
                <Download size={15} aria-hidden="true" />
                Download CV (PDF)
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="px-4 py-2.5 rounded-lg text-sm font-medium bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black/80 dark:text-white/80 hover:bg-black/10 dark:hover:bg-white/10 transition-all inline-flex items-center gap-2"
              >
                {copiedEmail ? (
                  <Check size={15} className="text-emerald-500" aria-hidden="true" />
                ) : (
                  <Copy size={15} aria-hidden="true" />
                )}
                {copiedEmail ? 'Email Tersalin!' : 'Copy Email (marcel.mux@gmail.com)'}
              </button>
              <span aria-live="polite" className="sr-only">
                {copiedEmail ? 'Email marcel.mux@gmail.com berhasil disalin ke clipboard' : ''}
              </span>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-black/5 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-black/50 dark:text-white/40 gap-4">
          <div>© 2026 Marcelino M. Turangan · IKN Nusantara, Indonesia</div>
          <div className="flex items-center gap-4 font-mono">
            <a
              href="https://github.com/Marcel-mux"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              GitHub
            </a>
            <span aria-hidden="true">•</span>
            <a
              href="https://www.threads.net/@marcelt_0"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              Threads
            </a>
            <span aria-hidden="true">•</span>
            <a
              href="/CV_Marcelino_M_Turangan.pdf"
              download="CV_Marcelino_M_Turangan.pdf"
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              CV (PDF)
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
