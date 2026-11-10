'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sun, Moon, ArrowUpRight, Terminal, Cpu, ShieldCheck, 
  Layers, MessageSquare, ExternalLink, Code2, CheckCircle2, 
  ChevronRight, Copy, Check, Sparkles, Activity, Server, Smartphone
} from 'lucide-react';

export default function Home() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeTab, setActiveTab] = useState<'all' | 'ai' | 'web' | 'linux'>('all');
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('marcel.mux@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const projects = [
    {
      id: 'hermes-cockpit',
      categories: ['web', 'ai'],
      tag: 'OPEN SOURCE · MOBILE PWA & REVERSE PROXY',
      title: 'Hermes Cockpit — Retro-Tech Mobile PWA for Hermes Agent',
      desc: 'Progressive Web App (PWA) client mobile-first open-source untuk Nous Research Hermes Agent. Dilengkapi token streaming real-time via WebSocket, interactive thought-process accordion, dedicated profile isolation, zero-dependency reverse proxy (server.mjs) dengan kompresi Brotli/Gzip, audio cues, dan tipografi otentik Nous Research.',
      chips: ['React Native / Expo Web', 'TypeScript', 'Tailwind CSS', 'Node.js Proxy', 'WebSockets', 'PWA / WebAPK'],
      image: '/projects/hermes-cockpit-preview.png',
      imageSecondary: '/projects/hermes-cockpit-icon.png',
      github: 'https://github.com/Marcel-mux/hermes-cockpit',
      metrics: 'Zero-Dependency Proxy · Real-Time WS Streaming · Standalone PWA',
      accent: 'border-indigo-500/30'
    },
    {
      id: 'wa-engine',
      categories: ['ai'],
      tag: 'AUTONOMOUS AI & MULTI-AGENT ORCHESTRATION',
      title: 'Autonomous WhatsApp & Telegram Multi-Agent Engine',
      desc: 'Arsitektur agen bot otonom bisnis (Sipuki & Cobra Engine) berbasis Baileys WebSocket & Hermes Gateway. Terhubung langsung ke self-hosted 9Router LLM Gateway, pipeline transkripsi audio/voice, analisis gambar (Vision), multi-personality routing, dan live parallel web search tanpa ketergantungan langganan SaaS pihak ketiga.',
      chips: ['Node.js', 'Baileys WS', 'Hermes Gateway', '9Router / Gemini', 'Systemd Daemons', 'Parallel Web Search'],
      image: '/projects/whatsapp-cobra.jpg',
      imageSecondary: '/projects/telegram-agents.jpg',
      github: 'https://github.com/Marcel-mux',
      metrics: 'Save 80%+ Token Cost · Sub-2s Response · Multi-Role Reasoning',
      accent: 'border-purple-500/30'
    },
    {
      id: 'antigravity-guard',
      categories: ['ai', 'linux'],
      tag: 'RESILIENCE & AUTO-HEAL DAEMON',
      title: 'Antigravity Guard — Automated OAuth Session Healer for 9Router',
      desc: 'Sistem daemon pengawas otomatis berbasis Python & systemd untuk menjaga reliabilitas akun OAuth Antigravity di dalam 9Router LLM Gateway. Mendeteksi token kadaluarsa, memulihkan session macet secara instan dari gangguan jaringan, dan mengeliminasi downtime inferensi model tanpa intervensi manual.',
      chips: ['Python 3', 'OAuth Lifecycle', 'Systemd Watchdog', '9Router API', 'SQLite Health Check'],
      image: '/projects/system-architecture.png',
      imageSecondary: '/projects/vps-infra-map.png',
      github: 'https://github.com/Marcel-mux/antigravity-guard-9router',
      metrics: '100% Zero-Touch Recovery · Automated Token Refresh · Sub-second Probe',
      accent: 'border-emerald-500/30'
    },
    {
      id: 'finpulse',
      categories: ['web'],
      tag: 'FINANCIAL SAAS & DATA ANALYTICS',
      title: 'FinPulse — Personal Financial Tracker & Analytics Platform',
      desc: 'Platform pencatat dan analisis kekayaan bersih (Net Worth), multi-rekening (Kas, Bank BRI, DANA), hingga pelacakan limit kredit & cicilan PayLater secara real-time. Dilengkapi fitur Chatbot QA pintar, visualisasi grafik interaktif, dan integrasi notifikasi Telegram bot.',
      chips: ['Next.js 14', 'TypeScript', 'Prisma ORM', 'PostgreSQL', 'Tailwind CSS', 'Vercel'],
      image: '/projects/finpulse-charts.jpg',
      imageSecondary: '/projects/finpulse.jpg',
      github: 'https://github.com/Marcel-mux/FInPulse-Project',
      metrics: 'Rp 18,6M+ Net Worth Tracked · Real-Time Chart Analytics',
      accent: 'border-emerald-500/30'
    },
    {
      id: 'linux-infra',
      categories: ['linux'],
      tag: 'HIGH-PERFORMANCE CLOUD & LINUX SYSTEMS',
      title: 'Hardened Oracle Cloud ARM64 (24GB RAM) & EndeavourOS Battle Station',
      desc: 'Pengalaman 3+ tahun mengoperasikan Linux (EndeavourOS/Arch) di laptop daily driver hingga mengelola infrastruktur cloud Oracle Always Free Ampere A1 (4 OCPU / 24 GB RAM ARM64). Diperkuat Tailscale Zero-Trust mesh VPN, proteksi Fail2ban, SSH hardening, alokasi swap teroptimasi, dan automated health reporting dua kali sehari.',
      chips: ['Oracle Cloud A1 ARM64', 'Ubuntu 26.04', 'EndeavourOS (Arch)', 'Tailscale Mesh', 'Fail2ban', 'Cronjobs'],
      image: '/projects/vps-infra-map.png',
      imageSecondary: '/projects/endeavour-neofetch.jpg',
      github: 'https://github.com/Marcel-mux',
      metrics: '4 OCPU / 24 GB RAM · Zero-Trust Mesh · 99.9% Server Uptime',
      accent: 'border-blue-500/30'
    }
  ];

  const filteredProjects = activeTab === 'all' 
    ? projects 
    : projects.filter(p => p.categories.includes(activeTab));

  return (
    <div className="min-h-screen bg-white text-[#171717] dark:bg-[#08090a] dark:text-[#f7f8f8] transition-colors duration-200">
      
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/85 dark:bg-[#08090a]/85 backdrop-blur-md border-b border-black/5 dark:border-white/10">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-full overflow-hidden border border-black/10 dark:border-white/20 shadow-sm">
              <Image 
                src="/projects/profile.jpg" 
                alt="Marcelino M. Turangan" 
                fill 
                className="object-cover object-center"
                priority
              />
            </div>
            <div>
              <span className="font-medium text-sm tracking-tight block">Marcelino M. Turangan</span>
              <span className="text-[11px] text-black/50 dark:text-white/40 font-mono block -mt-0.5">IKN, Indonesia (WITA)</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <nav className="hidden sm:flex items-center gap-5 text-xs font-medium text-black/60 dark:text-white/60">
              <a href="#projects" className="hover:text-black dark:hover:text-white transition-colors">Projects</a>
              <a href="#skills" className="hover:text-black dark:hover:text-white transition-colors">Capabilities</a>
              <a href="#contact" className="hover:text-black dark:hover:text-white transition-colors">Contact</a>
            </nav>

            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition-all"
            >
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>

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
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Available for Remote Roles, AI Integrations & Linux Ops
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mb-8">
            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="md:col-span-2"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.08] mb-6">
                Membangun Solusi AI Otomasi, <span className="text-black/40 dark:text-white/40">Full-Stack Web & PWA, dan Sistem Linux Tangguh.</span>
              </h1>
              <p className="text-base sm:text-lg text-black/70 dark:text-white/70 leading-relaxed max-w-xl mb-8">
                Praktisi Linux & AI Systems Integrator dari Nusantara (IKN). Berpengalaman mengintegrasikan agen AI otonom ke platform bisnis nyata, merancang aplikasi Web/PWA modern, dan mengelola infrastruktur cloud ARM64 mandiri dengan keandalan tinggi.
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href="https://wa.me/628979360724?text=Halo%20Marcelino,%20saya%20ingin%20berdiskusi%20proyek"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-[#171717] text-white dark:bg-[#5e6ad2] dark:hover:bg-[#7170ff] hover:bg-black transition-all shadow-sm"
                >
                  <MessageSquare size={16} />
                  Diskusi Proyek via WhatsApp
                </a>
                <a
                  href="https://github.com/Marcel-mux"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black/80 dark:text-white/80 hover:bg-black/10 dark:hover:bg-white/10 transition-all"
                >
                  <Code2 size={16} />
                  GitHub @Marcel-mux
                  <ArrowUpRight size={14} className="opacity-60" />
                </a>
              </div>
            </motion.div>

            {/* Profile Photo Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative aspect-square max-w-[280px] mx-auto md:ml-auto w-full rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 shadow-lg dark:shadow-2xl bg-black/5 dark:bg-white/5 group"
            >
              <Image 
                src="/projects/profile.jpg" 
                alt="Marcelino M. Turangan" 
                fill 
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
              <div className="font-mono text-xl font-medium text-emerald-500">80%+ Save</div>
              <div className="text-xs text-black/50 dark:text-white/40">Self-Hosted AI Token Cost</div>
            </div>
            <div className="p-3.5 rounded-lg bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
              <div className="font-mono text-xl font-medium">3+ Years</div>
              <div className="text-xs text-black/50 dark:text-white/40">Linux Daily Driver (Arch)</div>
            </div>
            <div className="p-3.5 rounded-lg bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
              <div className="font-mono text-xl font-medium">Open Source</div>
              <div className="text-xs text-black/50 dark:text-white/40">Hermes Cockpit & Tools</div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-black/40 dark:text-brand-glow block mb-1">
                // Selected Works & Case Studies
              </span>
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight">Karya & Produk Terverifikasi</h2>
            </div>

            {/* Filter Tabs */}
            <div className="inline-flex p-1 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-medium">
              {[
                { key: 'all', label: 'Semua' },
                { key: 'ai', label: 'AI & Agents' },
                { key: 'web', label: 'Web & PWA' },
                { key: 'linux', label: 'Linux & Cloud' },
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
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
                            alt={`${p.title} Preview 1`} 
                            fill 
                            className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="relative aspect-[9/16] sm:aspect-auto sm:h-72 rounded-xl overflow-hidden border border-black/10 dark:border-white/10 shadow-md bg-black/5 dark:bg-white/5 hidden sm:block group">
                          <Image 
                            src={p.imageSecondary} 
                            alt={`${p.title} Preview 2`} 
                            fill 
                            className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-black/50 dark:text-white/40">
                        <span>● Authenticated Screenshot</span>
                        <span>{p.metrics}</span>
                      </div>
                    </div>

                    {/* Details Info */}
                    <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
                      <div>
                        <span className="text-[11px] font-mono font-medium text-black/50 dark:text-brand-glow uppercase tracking-wider block mb-2">
                          {p.tag}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-medium tracking-tight mb-3">
                          {p.title}
                        </h3>
                        <p className="text-sm text-black/70 dark:text-white/70 leading-relaxed mb-6">
                          {p.desc}
                        </p>

                        <div className="flex flex-wrap gap-1.5 mb-8">
                          {p.chips.map(chip => (
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
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-black dark:text-white hover:text-brand-glow transition-colors"
                        >
                          Lihat Source & Detail
                          <ArrowUpRight size={13} />
                        </a>

                        <a
                          href="https://wa.me/628979360724?text=Halo%20Marcel,%20saya%20tertarik%20dengan%20proyek%20"
                          target="_blank"
                          rel="noopener noreferrer"
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

        {/* Capabilities Section */}
        <section id="skills" className="mb-20">
          <div className="mb-8">
            <span className="text-xs font-mono uppercase tracking-wider text-black/40 dark:text-brand-glow block mb-1">
              // Core Capabilities & Tech Stack
            </span>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight">Keahlian & Spesialisasi</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-black/[0.02] dark:bg-[#0f1011] border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all">
              <div className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center mb-5">
                <Cpu size={20} className="text-brand-glow" />
              </div>
              <h3 className="text-lg font-medium tracking-tight mb-2">AI Systems & Agents</h3>
              <p className="text-xs text-black/60 dark:text-white/60 leading-relaxed mb-4">
                Membangun agen AI otonom mandiri yang hemat token, terhubung ke WhatsApp/Telegram, memiliki kapabilitas live parallel search, vision, dan tools integration.
              </p>
              <ul className="space-y-2 text-xs text-black/70 dark:text-white/70 font-mono">
                <li className="flex items-center gap-2">✓ Multi-Agent Orchestration & Debate</li>
                <li className="flex items-center gap-2">✓ WhatsApp Baileys & Telegram Bots</li>
                <li className="flex items-center gap-2">✓ Self-Hosted LLM Gateway (9Router)</li>
                <li className="flex items-center gap-2">✓ WebSocket Real-Time Token Streaming</li>
                <li className="flex items-center gap-2">✓ Vision & Speech-to-Text Pipeline</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-black/[0.02] dark:bg-[#0f1011] border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all">
              <div className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center mb-5">
                <Smartphone size={20} className="text-emerald-500" />
              </div>
              <h3 className="text-lg font-medium tracking-tight mb-2">Modern Web & Mobile PWA</h3>
              <p className="text-xs text-black/60 dark:text-white/60 leading-relaxed mb-4">
                Mengembangkan aplikasi web dan Progressive Web Apps (PWA) responsif berstandar modern dalam waktu singkat dengan arsitektur terstruktur dan performa tinggi.
              </p>
              <ul className="space-y-2 text-xs text-black/70 dark:text-white/70 font-mono">
                <li className="flex items-center gap-2">✓ Next.js 14/15 App Router & React</li>
                <li className="flex items-center gap-2">✓ React Native / Expo Web PWA</li>
                <li className="flex items-center gap-2">✓ TypeScript & Strict System Design</li>
                <li className="flex items-center gap-2">✓ Prisma ORM & Relational DBs</li>
                <li className="flex items-center gap-2">✓ Precision Dark/Light UI (Linear Style)</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-black/[0.02] dark:bg-[#0f1011] border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all">
              <div className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center mb-5">
                <Server size={20} className="text-blue-500" />
              </div>
              <h3 className="text-lg font-medium tracking-tight mb-2">Linux & Cloud Systems</h3>
              <p className="text-xs text-black/60 dark:text-white/60 leading-relaxed mb-4">
                Pengalaman mendalam konfigurasi Linux daily-driver dan manajemen server cloud ARM64 mandiri dengan keamanan tinggi dan efisiensi resource teruji.
              </p>
              <ul className="space-y-2 text-xs text-black/70 dark:text-white/70 font-mono">
                <li className="flex items-center gap-2">✓ 3+ Years Linux Arch/EndeavourOS</li>
                <li className="flex items-center gap-2">✓ Oracle Cloud ARM64 (4 OCPU / 24GB RAM)</li>
                <li className="flex items-center gap-2">✓ Tailscale Zero-Trust Mesh VPN</li>
                <li className="flex items-center gap-2">✓ Systemd Daemons & Python Auto-Healers</li>
                <li className="flex items-center gap-2">✓ Fail2ban, SSH Hardening & Cron Alerts</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contact Banner */}
        <section id="contact" className="rounded-2xl p-8 sm:p-12 bg-black/[0.03] dark:bg-[#0f1011] border border-black/10 dark:border-white/10 text-center relative overflow-hidden">
          <div className="max-w-xl mx-auto relative z-10">
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight mb-3">
              Mari Membangun Solusi Bersama
            </h2>
            <p className="text-sm text-black/60 dark:text-white/60 leading-relaxed mb-6">
              Tersedia untuk proyek integrasi agen AI bisnis (WhatsApp/Telegram), pembuatan webapp SaaS & PWA MVP, konsultasi infrastruktur Linux/Cloud, atau peluang remote engineering.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://wa.me/628979360724?text=Halo%20Marcelino,%20saya%20tertarik%20bekerjasama%20untuk%20proyek"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-lg text-sm font-medium bg-[#171717] text-white dark:bg-[#5e6ad2] dark:hover:bg-[#7170ff] hover:bg-black transition-all shadow-sm"
              >
                Chat WhatsApp (+62 897-9360-724)
              </a>
              <button
                onClick={copyEmail}
                className="px-4 py-2.5 rounded-lg text-sm font-medium bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black/80 dark:text-white/80 hover:bg-black/10 dark:hover:bg-white/10 transition-all inline-flex items-center gap-2"
              >
                {copiedEmail ? <Check size={15} className="text-emerald-500" /> : <Copy size={15} />}
                {copiedEmail ? 'Email Tersalin!' : 'Copy Email (marcel.mux@gmail.com)'}
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-black/5 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-black/50 dark:text-white/40 gap-4">
          <div>© 2026 Marcelino M. Turangan. Built with Next.js, TypeScript & Tailwind CSS.</div>
          <div className="flex items-center gap-4 font-mono">
            <span>IKN Nusantara, Indonesia</span>
            <span>•</span>
            <span>EndeavourOS & Oracle Cloud ARM64</span>
          </div>
        </footer>

      </main>
    </div>
  );
}
