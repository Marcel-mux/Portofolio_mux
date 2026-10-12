'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sun, Moon, ArrowUpRight, Terminal, Cpu, ShieldCheck, 
  Layers, MessageSquare, ExternalLink, Code2, CheckCircle2, ChevronRight, Copy, Check
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
      id: 'finpulse',
      category: 'web',
      tag: 'FINANCIAL SAAS & CHATBOT',
      title: 'FinPulse — Personal Financial Tracker & Analytics',
      desc: 'Platform pencatat dan analisis kekayaan bersih (Net Worth), multi-rekening (Kas, Bank BRI, DANA), hingga pelacakan limit kredit & cicilan PayLater real-time. Dilengkapi fitur Chatbot QA pintar dan notifikasi Telegram.',
      chips: ['Next.js 14', 'TypeScript', 'Prisma ORM', 'PostgreSQL', 'Tailwind CSS', 'Vercel'],
      image: '/projects/finpulse-charts.jpg',
      imageSecondary: '/projects/finpulse.jpg',
      github: 'https://github.com/Marcel-mux/FInPulse-Project',
      metrics: 'Net Worth Rp 18,6M+ Tracked · Real-Time Chart Analytics',
      accent: 'border-emerald-500/30'
    },
    {
      id: 'wa-engine',
      category: 'ai',
      tag: 'MULTI-AGENT ORCHESTRATION',
      title: 'Autonomous WhatsApp & Telegram Multi-Agent Business Engine',
      desc: 'Arsitektur bot otonom bisnis (Sipuki & Cobra Engine) berbasis Baileys WebSocket & Hermes Gateway. Terhubung langsung ke self-hosted 9Router LLM Gateway, pipeline transkripsi audio/voice, analisis gambar (Vision), dan live web search tanpa biaya langganan SaaS mahal.',
      chips: ['Node.js', 'Baileys WS', 'Hermes Gateway', '9Router / Gemini', 'Parallel MCP', 'Systemd'],
      image: '/projects/whatsapp-cobra.jpg',
      imageSecondary: '/projects/telegram-agents.jpg',
      github: 'https://github.com/Marcel-mux',
      metrics: 'Save 80% Token Cost · Sub-2s Response · Multi-Role Logic',
      accent: 'border-brand-glow/30'
    },
    {
      id: 'linux-infra',
      category: 'linux',
      tag: 'LINUX CLOUD & HARDWARE',
      title: 'Hardened Linux Infrastructure & Celeron Warrior Setup',
      desc: 'Pengalaman 3+ tahun mengoperasikan Linux (EndeavourOS/Arch) di perangkat hemat daya (Zyrex Celeron N3350) hingga sukses men-deploy VPS Cloud mandiri. Diperkuat Tailscale Mesh VPN, SSH Hardening, Fail2ban, mitigasi KVM ballooning, dan automated health reporting.',
      chips: ['EndeavourOS / Arch', 'Debian VPS', 'Tailscale Mesh', 'Fail2ban', 'Cronjobs', 'Systemd'],
      image: '/projects/endeavour-neofetch.jpg',
      imageSecondary: '/projects/battlestation-setup.jpg',
      github: 'https://github.com/Marcel-mux',
      metrics: '3+ Years Linux Survivor · Zero-Trust VPN · 99.9% Server Uptime',
      accent: 'border-blue-500/30'
    }
  ];

  const filteredProjects = activeTab === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeTab);

  return (
    <div className="min-h-screen bg-white text-[#171717] dark:bg-[#08090a] dark:text-[#f7f8f8] transition-colors duration-200">
      
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#08090a]/80 backdrop-blur-md border-b border-black/5 dark:border-white/10">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-black/10 dark:border-white/20">
              <Image 
                src="/projects/profile.jpg" 
                alt="Marcel Avatar" 
                fill 
                className="object-cover object-top"
              />
            </div>
            <div>
              <span className="font-medium text-sm tracking-tight block">Marcel / Ndrong</span>
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
              href="https://wa.me/628979360724?text=Halo%20Marcel,%20saya%20tertarik%20dengan%20portofolio%20Anda"
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
            Available for Remote Roles & AI Integrations
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mb-8">
            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="md:col-span-2"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.08] mb-6">
                Membangun Solusi AI Otomasi, <span className="text-black/40 dark:text-white/40">Full-Stack Web, dan Sistem Linux Andal.</span>
              </h1>
              <p className="text-base sm:text-lg text-black/70 dark:text-white/70 leading-relaxed max-w-xl mb-8">
                Saya mengintegrasikan agen AI otonom ke proses bisnis nyata, membangun aplikasi SaaS modern bertenaga Next.js, dan mengelola infrastruktur server cloud berbiaya efisien dengan presisi tinggi.
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href="https://wa.me/628979360724?text=Halo%20Marcel,%20saya%20ingin%20berdiskusi%20proyek"
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
                  GitHub Repositories
                  <ArrowUpRight size={14} className="opacity-60" />
                </a>
              </div>
            </motion.div>

            {/* Profile Photo Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative aspect-square max-w-[280px] mx-auto md:ml-auto w-full rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 shadow-lg dark:shadow-2xl bg-black/5 dark:bg-white/5"
            >
              <Image 
                src="/projects/profile.jpg" 
                alt="Marcel di IKN" 
                fill 
                className="object-cover object-top hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                <span className="text-white text-xs font-mono">Marcel (Ndrong) • IKN Nusantara</span>
              </div>
            </motion.div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-black/5 dark:border-white/10">
            <div className="p-3.5 rounded-lg bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
              <div className="font-mono text-xl font-medium">3+ Years</div>
              <div className="text-xs text-black/50 dark:text-white/40">Linux Daily Drive</div>
            </div>
            <div className="p-3.5 rounded-lg bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
              <div className="font-mono text-xl font-medium">80% Save</div>
              <div className="text-xs text-black/50 dark:text-white/40">Self-Hosted AI Token</div>
            </div>
            <div className="p-3.5 rounded-lg bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
              <div className="font-mono text-xl font-medium">99.9%</div>
              <div className="text-xs text-black/50 dark:text-white/40">Micro-VPS Uptime</div>
            </div>
            <div className="p-3.5 rounded-lg bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
              <div className="font-mono text-xl font-medium">Full-Stack</div>
              <div className="text-xs text-black/50 dark:text-white/40">Next.js & Systems</div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-black/40 dark:text-brand-glow block mb-1">
                // Authenticated Case Studies
              </span>
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight">Karya & Produk Terverifikasi</h2>
            </div>

            {/* Filter Tabs */}
            <div className="inline-flex p-1 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-medium">
              {(['all', 'web', 'ai', 'linux'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-md transition-all uppercase tracking-wider text-[11px] font-mono ${
                    activeTab === tab 
                      ? 'bg-white text-black dark:bg-white/10 dark:text-white shadow-sm' 
                      : 'text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white'
                  }`}
                >
                  {tab === 'all' ? 'Semua' : tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-12">
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
                        <div className="relative aspect-[9/16] sm:aspect-auto sm:h-72 rounded-xl overflow-hidden border border-black/10 dark:border-white/10 shadow-md bg-black/5 dark:bg-white/5">
                          <Image 
                            src={p.image} 
                            alt={`${p.title} Preview 1`} 
                            fill 
                            className="object-cover object-top hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="relative aspect-[9/16] sm:aspect-auto sm:h-72 rounded-xl overflow-hidden border border-black/10 dark:border-white/10 shadow-md bg-black/5 dark:bg-white/5 hidden sm:block">
                          <Image 
                            src={p.imageSecondary} 
                            alt={`${p.title} Preview 2`} 
                            fill 
                            className="object-cover object-top hover:scale-105 transition-transform duration-500"
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
                        <h3 className="text-xl sm:text-2xl font-medium tracking-tight mb-4">
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
                          Request Demo
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
              // Core Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight">Keahlian & Spesialisasi</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-black/[0.02] dark:bg-[#0f1011] border border-black/10 dark:border-white/10">
              <div className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center mb-5">
                <Cpu size={20} className="text-brand-glow" />
              </div>
              <h3 className="text-lg font-medium tracking-tight mb-2">AI Systems & Agents</h3>
              <p className="text-xs text-black/60 dark:text-white/60 leading-relaxed mb-4">
                Membangun agen AI otonom mandiri yang hemat token, terhubung ke WhatsApp/Telegram, dan memiliki kapabilitas live search serta tools.
              </p>
              <ul className="space-y-2 text-xs text-black/70 dark:text-white/70 font-mono">
                <li className="flex items-center gap-2">✓ Multi-Agent Orchestration</li>
                <li className="flex items-center gap-2">✓ WhatsApp Baileys Automation</li>
                <li className="flex items-center gap-2">✓ Self-Hosted LLM Gateway (9Router)</li>
                <li className="flex items-center gap-2">✓ MCP Tools & Parallel Web Search</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-black/[0.02] dark:bg-[#0f1011] border border-black/10 dark:border-white/10">
              <div className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center mb-5">
                <Layers size={20} className="text-emerald-500" />
              </div>
              <h3 className="text-lg font-medium tracking-tight mb-2">Full-Stack Web MVP</h3>
              <p className="text-xs text-black/60 dark:text-white/60 leading-relaxed mb-4">
                Mengembangkan aplikasi web responsif berstandar modern dalam waktu singkat dengan arsitektur terstruktur dan database andal.
              </p>
              <ul className="space-y-2 text-xs text-black/70 dark:text-white/70 font-mono">
                <li className="flex items-center gap-2">✓ Next.js 14/15 App Router</li>
                <li className="flex items-center gap-2">✓ TypeScript & Strict Typing</li>
                <li className="flex items-center gap-2">✓ Prisma ORM & Relational DB</li>
                <li className="flex items-center gap-2">✓ Clean UI (Linear / Vercel Aesthetic)</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-black/[0.02] dark:bg-[#0f1011] border border-black/10 dark:border-white/10">
              <div className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center mb-5">
                <Terminal size={20} className="text-blue-500" />
              </div>
              <h3 className="text-lg font-medium tracking-tight mb-2">Linux & Cloud Ops</h3>
              <p className="text-xs text-black/60 dark:text-white/60 leading-relaxed mb-4">
                Troubleshooting mendalam sistem operasi Linux dan setup server VPS cloud mandiri dengan keamanan serta efisiensi resource tinggi.
              </p>
              <ul className="space-y-2 text-xs text-black/70 dark:text-white/70 font-mono">
                <li className="flex items-center gap-2">✓ 3+ Years Linux Arch/EndeavourOS</li>
                <li className="flex items-center gap-2">✓ Tailscale Zero-Trust Mesh VPN</li>
                <li className="flex items-center gap-2">✓ Systemd Daemon & Memory Tuning</li>
                <li className="flex items-center gap-2">✓ Fail2ban & SSH Hardening</li>
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
              Tersedia untuk proyek freelance integrasi bot WhatsApp bisnis, pembuatan webapp MVP, konsultasi Linux/server, atau peluang remote engineering.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://wa.me/628979360724?text=Halo%20Marcel,%20saya%20tertarik%20bekerjasama%20untuk%20proyek"
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
                {copiedEmail ? 'Email Tersalin!' : 'Copy Email'}
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-black/5 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-black/50 dark:text-white/40 gap-4">
          <div>© 2026 Marcel / Ndrong. Built with Next.js & Tailwind CSS.</div>
          <div className="flex items-center gap-4 font-mono">
            <span>IKN Nusantara, ID</span>
            <span>•</span>
            <span>EndeavourOS & Debian</span>
          </div>
        </footer>

      </main>
    </div>
  );
}
