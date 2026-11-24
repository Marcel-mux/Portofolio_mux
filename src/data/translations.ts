export type Lang = 'id' | 'en';
export type TabKey = 'all' | 'ai' | 'web' | 'linux';

export interface ProjectItem {
  id: string;
  categories: TabKey[];
  tag: { id: string; en: string };
  title: { id: string; en: string };
  desc: { id: string; en: string };
  chips: string[];
  image: string;
  imageSecondary: string;
  github: string;
  live?: string;
  metrics: { id: string; en: string };
}

export interface LiveService {
  name: string;
  desc: { id: string; en: string };
  port: string;
}

export interface MeshNode {
  host: string;
  spec: string;
  role: { id: string; en: string };
  status: 'online' | 'edge' | 'ephemeral';
}

export interface CloudFleetNode {
  id: string;
  name: string;
  provider: string;
  spec: string;
  os: string;
  role: { id: string; en: string };
  statusLabel: { id: string; en: string };
  statusType: 'online' | 'watchdog' | 'autowake' | 'standby';
  iconType: 'server' | 'cpu' | 'browser' | 'terminal' | 'monitor' | 'box';
}

export interface ExperienceItem {
  role: string;
  org: string;
  period: { id: string; en: string };
  summary: { id: string; en: string };
}

export interface CapabilityCard {
  title: string;
  desc: { id: string; en: string };
  items: string[];
}

export const translations = {
  id: {
    nav: {
      projects: 'Proyek',
      infra: 'Infrastruktur',
      experience: 'Pengalaman',
      capabilities: 'Keahlian',
      contact: 'Kontak',
      hireMe: 'Rekrut Saya',
      cv: 'CV',
      switchLang: 'Ganti ke English',
    },
    hero: {
      skipToContent: 'Lewati ke konten utama',
      location: 'IKN, Indonesia (WITA)',
      badge: 'Tersedia untuk Peran Remote, Integrasi AI, Web/PWA & Operasional Linux',
      titlePart1: 'Membangun Solusi AI Otomasi, ',
      titlePart2: 'Full-Stack Web & PWA, dan Sistem Linux Tangguh.',
      description:
        'Praktisi Linux (3+ tahun) & AI Systems Integrator dari Nusantara (IKN). Berpengalaman mengintegrasikan agen AI otonom ke WhatsApp, Discord & Telegram, membangun aplikasi Web/PWA modern, dan mengoperasikan fleet Linux ARM64 multi-node dengan otomasi penuh.',
      downloadCv: 'Unduh CV (PDF)',
      github: 'GitHub @Marcel-mux',
      threads: 'Threads @marcelt_0',
      metrics: {
        m1Label: 'Oracle Cloud ARM64',
        m2Value: '10 Layanan',
        m2Label: 'Daemon systemd Aktif',
        m3Value: '6 Node',
        m3Label: 'Tailscale Zero-Trust Mesh',
        m4Value: '17 Cronjob',
        m4Label: 'Otomasi & Monitoring',
      },
    },
    projects: {
      sectionPre: '// Karya Terpilih & Studi Kasus',
      sectionTitle: 'Karya & Produk Terverifikasi',
      filterAria: 'Filter proyek berdasarkan kategori',
      tabs: {
        all: 'Semua',
        ai: 'AI & Agents',
        web: 'Web & PWA',
        linux: 'Linux & Cloud',
      },
      viewCode: 'Lihat Kode Sumber',
      livePreview: 'Buka Web',
    },
    infra: {
      sectionPre: '// Live Production Infrastructure',
      sectionTitle: 'Infrastruktur & Layanan Aktif',
      sectionDesc:
        'Arsitektur cloud hybrid mandiri yang berjalan 24/7 di atas Oracle Cloud ARM64, terhubung lewat Tailscale mesh terenkripsi, diamankan dengan fail2ban & SSH hardening, dan dipantau 17 cronjob otomatis.',
      activeServicesBadge: '10 AKTIF',
      meshNodesBadge: '6 NODE',
      cronSummary: '17 cronjob · laporan kesehatan 2×/hari · audit keamanan 07:00 WITA',
      fleetTitle: 'Armada Cloud VM & MicroVM Sandbox',
      fleetBadge: '24 vCPU / 72 GB RAM TOTAL',
      fleetDesc:
        'Kompilasi armada virtual terdistribusi: cloud ARM64 24/7, sandbox komputasi berat x86_64, microVM Firecracker, hingga lingkungan otomasi desktop GUI Windows & Linux.',
      aiGatewayTitle: '9Router — Multi-Provider AI Gateway',
      aiGatewayDesc: '22 koneksi · 7 keluarga provider · 5 fallback combo',
    },
    experience: {
      sectionPre: '// Pengalaman & Pendidikan',
      sectionTitle: 'Pengalaman & Latar Belakang',
      educationTitle: 'Pendidikan',
      school: 'Politeknik Negeri Manado',
      schoolDetail: 'Politeknik Negeri Manado · Sulawesi Utara, Indonesia',
      cvPrompt: 'Ingin versi ringkas siap cetak / ATS?',
      downloadFullCv: 'Unduh CV Lengkap (PDF)',
    },
    capabilities: {
      sectionPre: '// Keahlian Utama & Tech Stack',
      sectionTitle: 'Keahlian & Spesialisasi',
    },
    contact: {
      title: 'Mari Membangun Solusi Bersama',
      description:
        'Tersedia untuk proyek integrasi agen AI (WhatsApp/Discord/Telegram), pembuatan webapp & PWA, konsultasi infrastruktur Linux/Cloud, atau peluang remote engineering.',
      chatWa: 'Chat WhatsApp (+62 897-9360-724)',
      downloadCv: 'Unduh CV (PDF)',
      copyEmail: 'Salin Email (marcel.mux@gmail.com)',
      emailCopied: 'Email Tersalin!',
      emailAriaCopied: 'Email marcel.mux@gmail.com berhasil disalin ke clipboard',
    },
    footer: {
      copyright: '© 2026 Marcelino M. Turangan · IKN Nusantara, Indonesia',
    },
  },
  en: {
    nav: {
      projects: 'Projects',
      infra: 'Infrastructure',
      experience: 'Experience',
      capabilities: 'Capabilities',
      contact: 'Contact',
      hireMe: 'Hire Me',
      cv: 'CV',
      switchLang: 'Ganti ke Bahasa Indonesia',
    },
    hero: {
      skipToContent: 'Skip to main content',
      location: 'IKN, Indonesia (WITA / UTC+8)',
      badge: 'Available for Remote Roles, AI Integrations, Web/PWA & Linux Ops',
      titlePart1: 'Engineering Autonomous AI Solutions, ',
      titlePart2: 'Modern Full-Stack Web & PWA, and Resilient Linux Systems.',
      description:
        'Linux practitioner (3+ years) & AI Systems Integrator based in Nusantara (IKN). Experienced in orchestrating autonomous AI agents into WhatsApp, Discord & Telegram, building modern Web/PWA applications, and operating multi-node ARM64 Linux fleets with end-to-end automation.',
      downloadCv: 'Download CV (PDF)',
      github: 'GitHub @Marcel-mux',
      threads: 'Threads @marcelt_0',
      metrics: {
        m1Label: 'Oracle Cloud ARM64',
        m2Value: '10 Services',
        m2Label: 'Live systemd Daemons',
        m3Value: '6 Nodes',
        m3Label: 'Tailscale Zero-Trust Mesh',
        m4Value: '17 Cronjobs',
        m4Label: 'Automated Ops & Monitoring',
      },
    },
    projects: {
      sectionPre: '// Selected Works & Case Studies',
      sectionTitle: 'Featured Works & Real-World Deployments',
      filterAria: 'Filter projects by category',
      tabs: {
        all: 'All',
        ai: 'AI & Agents',
        web: 'Web & PWA',
        linux: 'Linux & Cloud',
      },
      viewCode: 'View Source Code',
      livePreview: 'Live Demo',
    },
    infra: {
      sectionPre: '// Live Production Infrastructure',
      sectionTitle: 'Infrastructure & Live Services',
      sectionDesc:
        'Self-hosted hybrid cloud architecture running 24/7 on Oracle Cloud ARM64, interconnected via encrypted Tailscale mesh, hardened with fail2ban & SSH security, and continuously monitored by 17 automated cronjobs.',
      activeServicesBadge: '10 ACTIVE',
      meshNodesBadge: '6 NODES',
      cronSummary: '17 cronjobs · health report 2×/day · security audit 07:00 WITA',
      fleetTitle: 'Cloud VM & MicroVM Sandbox Fleet',
      fleetBadge: '24 vCPU / 72 GB RAM TOTAL',
      fleetDesc:
        'Distributed multi-platform compute fleet: 24/7 ARM64 cloud host, heavy x86_64 compute sandbox, Firecracker microVMs, and full Linux/Windows desktop GUI agent environments.',
      aiGatewayTitle: '9Router — Multi-Provider AI Gateway',
      aiGatewayDesc: '22 connections · 7 provider families · 5 fallback combos',
    },
    experience: {
      sectionPre: '// Experience & Education',
      sectionTitle: 'Experience & Background',
      educationTitle: 'Education',
      school: 'Manado State Polytechnic',
      schoolDetail: 'Politeknik Negeri Manado · North Sulawesi, Indonesia',
      cvPrompt: 'Need a concise, ATS-friendly print copy?',
      downloadFullCv: 'Download Full CV (PDF)',
    },
    capabilities: {
      sectionPre: '// Core Capabilities & Tech Stack',
      sectionTitle: 'Core Capabilities & Specializations',
    },
    contact: {
      title: "Let's Build Something Great Together",
      description:
        'Available for AI agent integration projects (WhatsApp/Discord/Telegram), modern webapp & PWA development, Linux/Cloud infrastructure consulting, or remote engineering opportunities.',
      chatWa: 'Chat via WhatsApp (+62 897-9360-724)',
      downloadCv: 'Download CV (PDF)',
      copyEmail: 'Copy Email (marcel.mux@gmail.com)',
      emailCopied: 'Email Copied!',
      emailAriaCopied: 'Email marcel.mux@gmail.com copied to clipboard',
    },
    footer: {
      copyright: '© 2026 Marcelino M. Turangan · IKN Nusantara, Indonesia',
    },
  },
};

export const projectItems: ProjectItem[] = [
  {
    id: 'hermes-cockpit',
    categories: ['web', 'ai'],
    tag: {
      id: 'OPEN SOURCE · MOBILE PWA & REVERSE PROXY',
      en: 'OPEN SOURCE · MOBILE PWA & REVERSE PROXY',
    },
    title: {
      id: 'Hermes Cockpit — Retro-Tech Mobile PWA for Hermes Agent',
      en: 'Hermes Cockpit — Retro-Tech Mobile PWA for Hermes Agent',
    },
    desc: {
      id: 'Progressive Web App (PWA) client mobile-first open-source untuk Nous Research Hermes Agent. Dilengkapi token streaming real-time via WebSocket, interactive thought-process accordion, dedicated profile isolation, zero-dependency reverse proxy (server.mjs) dengan kompresi Brotli/Gzip, audio cues, dan Docker Compose ready.',
      en: 'Open-source mobile-first Progressive Web App (PWA) client for Nous Research Hermes Agent. Features real-time WebSocket token streaming, interactive thought-process accordion, dedicated profile isolation, zero-dependency reverse proxy (server.mjs) with Brotli/Gzip compression, audio cues, and Docker Compose readiness.',
    },
    chips: ['React Native / Expo Web', 'TypeScript', 'Tailwind CSS', 'Node.js Proxy', 'WebSockets', 'Docker'],
    image: '/projects/hermes-cockpit-preview.png',
    imageSecondary: '/projects/hermes-cockpit-icon.png',
    github: 'https://github.com/Marcel-mux/hermes-cockpit',
    metrics: {
      id: 'Zero-Dependency Proxy · Real-Time WS Streaming · Standalone PWA',
      en: 'Zero-Dependency Proxy · Real-Time WS Streaming · Standalone PWA',
    },
  },
  {
    id: 'antigravity-gateway',
    categories: ['ai', 'linux'],
    tag: {
      id: 'PRODUCTION CLI-TO-DISCORD GATEWAY',
      en: 'PRODUCTION CLI-TO-DISCORD GATEWAY',
    },
    title: {
      id: 'Antigravity Discord Gateway — Persistent Multi-Server Agent Bridge',
      en: 'Antigravity Discord Gateway — Persistent Multi-Server Agent Bridge',
    },
    desc: {
      id: 'Gateway Discord berbasis Python & systemd untuk mengendalikan Google Antigravity CLI (agy) secara remote dari HP maupun desktop. Mendukung sesi persisten per channel, multi-server @mention gating + missed-message backfill, cross-channel #mention context, pencarian histori SQLite FTS5, live streaming dengan auto-split aman blok kode, dan kontrol model/kuota interaktif.',
      en: 'Production Discord gateway powered by Python & systemd to control Google Antigravity CLI (agy) remotely from mobile or desktop. Supports persistent per-channel sessions, multi-server @mention gating + missed-message backfill, cross-channel #mention context, SQLite FTS5 history search, live streaming with safe code block splitting, and interactive model/quota controls.',
    },
    chips: ['Python 3', 'discord.py', 'systemd', 'SQLite FTS5', 'Multi-Server Gating', 'Live Streaming'],
    image: '/projects/antigravity-gateway-arch.png',
    imageSecondary: '/projects/antigravity-gateway-cli.png',
    github: 'https://github.com/Marcel-mux',
    metrics: {
      id: 'Sesi Persisten · Multi-Server @mention · Pencarian SQLite FTS5',
      en: 'Persistent Sessions · Multi-Server @mention · SQLite FTS5 Search',
    },
  },
  {
    id: 'wa-engine',
    categories: ['ai'],
    tag: {
      id: 'AUTONOMOUS AI & MULTI-AGENT ORCHESTRATION',
      en: 'AUTONOMOUS AI & MULTI-AGENT ORCHESTRATION',
    },
    title: {
      id: 'Autonomous WhatsApp & Telegram Multi-Agent Engine',
      en: 'Autonomous WhatsApp & Telegram Multi-Agent Engine',
    },
    desc: {
      id: 'Arsitektur agen bot otonom (Sipuki & Cobra Engine) berbasis Baileys WebSocket & Hermes Gateway. Terhubung langsung ke self-hosted 9Router LLM Gateway, pipeline transkripsi audio/TTS, analisis gambar (Vision), multi-personality routing, dan live parallel web search tanpa ketergantungan langganan SaaS pihak ketiga.',
      en: 'Autonomous multi-agent architecture (Sipuki & Cobra Engine) built on Baileys WebSocket & Hermes Gateway. Directly connected to self-hosted 9Router LLM Gateway, audio transcription/TTS pipeline, image vision analysis, multi-personality routing, and live parallel web search without third-party SaaS dependencies.',
    },
    chips: ['Node.js', 'Baileys WS', 'Hermes Gateway', '9Router / Gemini', 'systemd Daemons', 'Parallel Search'],
    image: '/projects/whatsapp-cobra.jpg',
    imageSecondary: '/projects/telegram-agents.jpg',
    github: 'https://github.com/Marcel-mux',
    metrics: {
      id: 'Routing Mandiri · Multi-Persona Agents · Vision & Audio/TTS',
      en: 'Self-Hosted Routing · Multi-Persona Agents · Vision & Audio/TTS',
    },
  },
  {
    id: 'antigravity-guard',
    categories: ['ai', 'linux'],
    tag: {
      id: 'RESILIENCE & AUTO-HEAL DAEMON',
      en: 'RESILIENCE & AUTO-HEAL DAEMON',
    },
    title: {
      id: 'Antigravity Guard — Automated OAuth Session Healer for 9Router',
      en: 'Antigravity Guard — Automated OAuth Session Healer for 9Router',
    },
    desc: {
      id: 'Sistem daemon pengawas otomatis berbasis Python & systemd untuk menjaga reliabilitas akun OAuth Antigravity di dalam 9Router LLM Gateway. Mendeteksi token kadaluarsa lewat SQLite/API probe, memulihkan sesi macet otomatis, dilengkapi proxy lokal anti-WAF (agentrouter-proxy & gemini-web2api).',
      en: 'Automated supervisory daemon in Python & systemd maintaining Antigravity OAuth session reliability inside 9Router LLM Gateway. Detects expired tokens via SQLite/API probes, auto-heals stale sessions, and features local anti-WAF proxies (agentrouter-proxy & gemini-web2api).',
    },
    chips: ['Python 3', 'Node.js Proxy', 'OAuth Lifecycle', 'systemd Watchdog', '9Router API', 'SQLite Probes'],
    image: '/projects/system-architecture.png',
    imageSecondary: '/projects/vps-infra-map.png',
    github: 'https://github.com/Marcel-mux/antigravity-guard-9router',
    metrics: {
      id: 'Zero-Touch Recovery · Automated Token Refresh · WAF Mitigation',
      en: 'Zero-Touch Recovery · Automated Token Refresh · WAF Mitigation',
    },
  },
  {
    id: 'finpulse',
    categories: ['web'],
    tag: {
      id: 'FINANCIAL SAAS & DATA ANALYTICS',
      en: 'FINANCIAL SAAS & DATA ANALYTICS',
    },
    title: {
      id: 'FinPulse — Personal Financial Tracker & Analytics Platform',
      en: 'FinPulse — Personal Financial Tracker & Analytics Platform',
    },
    desc: {
      id: 'Platform pencatat dan analisis kekayaan bersih (Net Worth), multi-rekening, hingga pelacakan limit kredit & cicilan secara real-time. Dilengkapi fitur Chatbot QA pintar, visualisasi grafik interaktif, dan integrasi notifikasi bot Telegram.',
      en: 'Personal net worth tracker and financial analytics platform managing multi-account balances, credit limit usage, and installment schedules. Features an intelligent AI Q&A chatbot, interactive data visualization charts, and automated Telegram bot alert integrations.',
    },
    chips: ['Next.js 14', 'TypeScript', 'Prisma ORM', 'PostgreSQL', 'Tailwind CSS', 'Vercel'],
    image: '/projects/finpulse-charts.jpg',
    imageSecondary: '/projects/finpulse.jpg',
    github: 'https://github.com/Marcel-mux/FInPulse-Project',
    metrics: {
      id: 'Multi-Account Net Worth · AI Q&A Chatbot · Telegram Alerts',
      en: 'Multi-Account Net Worth · AI Q&A Chatbot · Telegram Alerts',
    },
  },
  {
    id: 'linux-infra',
    categories: ['linux'],
    tag: {
      id: 'MULTI-NODE CLOUD MESH & DEVOPS AUTOMATION',
      en: 'MULTI-NODE CLOUD MESH & DEVOPS AUTOMATION',
    },
    title: {
      id: 'Distributed 6-Node Zero-Trust Mesh & Self-Hosted AI Gateway Fleet',
      en: 'Distributed 6-Node Zero-Trust Mesh & Self-Hosted AI Gateway Fleet',
    },
    desc: {
      id: 'Infrastruktur hybrid di atas Oracle Cloud Always Free Ampere A1 (4 OCPU / 24 GB RAM ARM64 / 200 GB NVMe) plus perangkat edge (ThinkPad CachyOS, EndeavourOS, Android/Termux) dan ephemeral sandboxes. Terhubung lewat Tailscale Zero-Trust mesh, menjalankan 10 service systemd produksi, gateway AI multi-provider, dan 17 cronjob pemantauan serta audit keamanan.',
      en: 'Hybrid infrastructure across Oracle Cloud Always Free Ampere A1 (4 OCPU / 24 GB RAM ARM64 / 200 GB NVMe) plus edge devices (ThinkPad on CachyOS, EndeavourOS, Android/Termux) and ephemeral sandboxes. Interconnected via Tailscale Zero-Trust mesh, running 10 production systemd services, multi-provider AI gateway, and 17 automated health/security cronjobs.',
    },
    chips: [
      'Oracle Cloud A1 ARM64',
      'Ubuntu 26.04 LTS',
      'Tailscale Mesh (6 nodes)',
      'systemd (10 services)',
      'Fail2ban + SSH Hardening',
      '17 Cronjobs',
    ],
    image: '/projects/vps-infra-map.png',
    imageSecondary: '/projects/endeavour-neofetch.jpg',
    github: 'https://github.com/Marcel-mux',
    metrics: {
      id: '4 OCPU / 24 GB RAM · 6 Mesh Nodes · 10 Live Services',
      en: '4 OCPU / 24 GB RAM · 6 Mesh Nodes · 10 Live Services',
    },
  },
];

export const liveServices: LiveService[] = [
  {
    name: '9router.service',
    desc: {
      id: 'AI Multi-Provider Gateway · 22 koneksi / 7 provider family',
      en: 'AI Multi-Provider Gateway · 22 connections / 7 provider families',
    },
    port: ':20128',
  },
  {
    name: 'agy-gateway.service',
    desc: {
      id: 'Antigravity Discord Gateway · CLI bridge, FTS5 search & live stream',
      en: 'Antigravity Discord Gateway · CLI bridge, FTS5 search & live streaming',
    },
    port: 'Discord WS',
  },
  {
    name: 'hermes-gateway.service',
    desc: {
      id: 'Orkestrator agen Hermes (Telegram / Discord / WhatsApp)',
      en: 'Hermes Agent Orchestrator (Telegram / Discord / WhatsApp)',
    },
    port: 'internal',
  },
  {
    name: 'hermes-dashboard.service',
    desc: {
      id: 'Web dashboard agent · realtime session & tool telemetry',
      en: 'Agent Web Dashboard · Real-time session & tool telemetry',
    },
    port: ':9119',
  },
  {
    name: 'hermes-mobile.service',
    desc: {
      id: 'Hermes Cockpit PWA reverse proxy + Brotli compression',
      en: 'Hermes Cockpit PWA reverse proxy + Brotli compression',
    },
    port: ':8088',
  },
  {
    name: 'wa-ai-bot.service',
    desc: {
      id: 'Baileys WhatsApp multi-agent engine (Sipuki & Cobra)',
      en: 'Baileys WhatsApp multi-agent engine (Sipuki & Cobra)',
    },
    port: 'WA WS',
  },
  {
    name: 'agentrouter-proxy.service',
    desc: {
      id: 'Local bridge proxy + header injection anti-WAF',
      en: 'Local bridge proxy + anti-WAF header injection',
    },
    port: ':8318',
  },
  {
    name: 'gemini-web2api.service',
    desc: {
      id: 'Gemini web-to-OpenAI API bridge',
      en: 'Gemini web-to-OpenAI API bridge',
    },
    port: 'internal',
  },
  {
    name: 'tailscaled.service',
    desc: {
      id: 'Zero-Trust mesh VPN · 6 node terdaftar',
      en: 'Zero-Trust mesh VPN · 6 registered nodes',
    },
    port: 'mesh',
  },
  {
    name: 'fail2ban.service',
    desc: {
      id: 'Intrusion prevention + SSH brute-force banning',
      en: 'Intrusion prevention + SSH brute-force banning',
    },
    port: 'security',
  },
];

export const meshNodes: MeshNode[] = [
  {
    host: 'muxoracle',
    spec: 'Oracle Cloud · 4 OCPU / 24 GB ARM64',
    role: { id: 'Core / Utama (24/7 Mothership)', en: 'Core / Primary (24/7 Mothership)' },
    status: 'online',
  },
  {
    host: 'muxcue',
    spec: 'Manus Cloud VM · 8 vCPU / 24 GB x86_64',
    role: { id: 'Heavy Compute & Dev Sandbox', en: 'Heavy Compute & Dev Sandbox' },
    status: 'online',
  },
  {
    host: 'cachyos-ltx13g1',
    spec: 'ThinkPad X13 Gen 1 AMD · CachyOS',
    role: { id: 'Laptop Harian (Daily Driver)', en: 'Daily Driver Laptop' },
    status: 'edge',
  },
  {
    host: 'zendeavour-sky232',
    spec: 'PC Workstation · EndeavourOS',
    role: { id: 'Dev & Storage Backup', en: 'Dev & Storage Backup' },
    status: 'edge',
  },
  {
    host: 'infinix-gt-30-pro',
    spec: 'Infinix GT 30 Pro · Termux SSH',
    role: { id: 'Node Operasi Mobile', en: 'Mobile Ops Node' },
    status: 'edge',
  },
  {
    host: 'muse',
    spec: 'Secure Cloud VM · Tagged Sandbox',
    role: { id: 'Agent Security Node', en: 'Agent Security Node' },
    status: 'ephemeral',
  },
];

export const cloudFleetNodes: CloudFleetNode[] = [
  {
    id: 'oracle',
    name: 'Oracle Cloud (muxoracle)',
    provider: 'OCI Always Free A1',
    spec: '4 OCPU ARM64 · 24 GB RAM · 200 GB NVMe',
    os: 'Ubuntu 26.04 LTS',
    role: {
      id: 'Pusat Kendali 24/7: Menjalankan 9Router, Hermes Gateway, Bot WA Sipuki/Cobra, PWA Cockpit, & 17 cronjob.',
      en: '24/7 Core Mothership: Runs 9Router AI Gateway, Hermes Gateway, Sipuki/Cobra WA bots, Cockpit PWA, & 17 cronjobs.',
    },
    statusLabel: { id: 'Aktif 24/7', en: '24/7 Online' },
    statusType: 'online',
    iconType: 'server',
  },
  {
    id: 'cue',
    name: 'Manus Cue (muxcue)',
    provider: 'Manus Long Sandbox',
    spec: '8 vCPU x86_64 · 24 GB RAM · 70 GB SSD',
    os: 'Ubuntu 24.04 LTS',
    role: {
      id: 'Sandbox komputasi berat, Next.js build, DeepSeek test harness, dengan keepalive watchdog Hermes.',
      en: 'Heavy compute sandbox, Next.js builds, DeepSeek test harness, with Hermes keepalive watchdog.',
    },
    statusLabel: { id: 'Siaga / Watchdog', en: 'Watchdog Active' },
    statusType: 'watchdog',
    iconType: 'cpu',
  },
  {
    id: 'instabox',
    name: 'InstaBox (agent-browser)',
    provider: 'Firecracker MicroVM',
    spec: '4 vCPU · 8 GB RAM · 36 GB Storage',
    os: 'Isolated Linux MicroVM',
    role: {
      id: 'Automasi web browser headless cepat, web scraping JavaScript berat, & eksekusi terisolasi.',
      en: 'Ultra-fast headless browser automation, dynamic JavaScript scraping, & sandboxed execution.',
    },
    statusLabel: { id: 'Auto-Wake API', en: 'Auto-Wake API' },
    statusType: 'autowake',
    iconType: 'browser',
  },
  {
    id: 'freestyle',
    name: 'Freestyle.sh (mux-fssh)',
    provider: 'Freestyle Cloud MicroVM',
    spec: '4 vCPU · 8 GB RAM · 32 GB NVMe',
    os: 'Ubuntu 24.04 LTS',
    role: {
      id: 'Disposable sandbox pengujian kode bebas & runner kompilasi on-demand via direct CLI.',
      en: 'Disposable testing sandbox & on-demand build runner with instant CLI access.',
    },
    statusLabel: { id: 'Auto-Wake CLI', en: 'Auto-Wake CLI' },
    statusType: 'autowake',
    iconType: 'terminal',
  },
  {
    id: 'simularbox',
    name: 'Simular Box (main)',
    provider: 'Simular Cloud Desktop',
    spec: '2 vCPU AMD EPYC · 4 GB RAM · 20 GB SSD',
    os: 'Ubuntu 24.04 XFCE Desktop',
    role: {
      id: 'Automasi GUI desktop Linux & pengujian agen interaktif computer-use via MCP + Live View.',
      en: 'Linux desktop GUI automation & computer-use interactive agent testing via MCP + Live View.',
    },
    statusLabel: { id: 'Hibernate / MCP', en: 'Hibernate / MCP' },
    statusType: 'standby',
    iconType: 'monitor',
  },
  {
    id: 'simularai',
    name: 'Simular Sai (simularai)',
    provider: 'Simular Cloud Windows',
    spec: '2 vCPU · 4 GB RAM · ~40 GB Ephemeral',
    os: 'Windows 10 Pro',
    role: {
      id: 'Automasi aplikasi Windows murni (.exe & native GUI) untuk workflow otomasi lintas OS.',
      en: 'Native Windows desktop automation (.exe & native UI) for cross-platform agent workflows.',
    },
    statusLabel: { id: 'Standby / Lease', en: 'Standby / Lease' },
    statusType: 'standby',
    iconType: 'box',
  },
];

export const experienceItems: ExperienceItem[] = [
  {
    role: 'Independent AI Systems & Full-Stack Builder',
    org: 'Self-Employed / Open Source · Nusantara (IKN)',
    period: {
      id: '3+ Tahun – Sekarang',
      en: '3+ Years – Present',
    },
    summary: {
      id: 'Merancang, membangun, dan mengoperasikan sistem agen AI otonom, aplikasi Web/PWA modern, serta infrastruktur Linux & cloud self-hosted secara end-to-end hingga produksi 24/7.',
      en: 'Architecting, building, and operating autonomous AI agent systems, modern Web/PWA applications, and self-hosted Linux & cloud infrastructure end-to-end in 24/7 production.',
    },
  },
  {
    role: 'Solo Barista & Cafe Operations',
    org: 'Independent Cafe Operations · Ring IKN',
    period: {
      id: '3 Tahun – Sekarang',
      en: '3 Years – Present',
    },
    summary: {
      id: 'Mengelola operasional kafe harian secara mandiri penuh — manajemen stok/restock, produksi minuman, quality control, dan layanan pelanggan — melatih disiplin operasional, konsistensi, dan ownership tinggi.',
      en: 'Independently managing full daily cafe operations — inventory/restock logistics, beverage production, quality control, and customer service — forging high operational discipline, consistency, and relentless ownership.',
    },
  },
];

export const capabilityCards: CapabilityCard[] = [
  {
    title: 'AI Systems & Agents',
    desc: {
      id: 'Membangun agen AI otonom mandiri yang hemat biaya, terhubung ke WhatsApp, Discord & Telegram, dengan live parallel search, vision, dan integrasi tools.',
      en: 'Building cost-effective autonomous AI agents connected to WhatsApp, Discord & Telegram, equipped with live parallel search, vision models, and robust tool calling.',
    },
    items: [
      'Multi-Agent Orchestration (Hermes & Agy)',
      'WhatsApp Baileys, Discord & Telegram Bots',
      'Self-Hosted LLM Gateway (9Router)',
      'WebSocket Real-Time Token Streaming',
      'Vision & Audio/TTS Pipeline',
    ],
  },
  {
    title: 'Modern Web & Mobile PWA',
    desc: {
      id: 'Mengembangkan aplikasi web dan Progressive Web Apps (PWA) responsif berstandar modern dengan arsitektur terstruktur dan performa tinggi.',
      en: 'Developing responsive web applications and Progressive Web Apps (PWAs) with modern production standards, clean architecture, and blazing performance.',
    },
    items: [
      'Next.js App Router & React',
      'React Native / Expo Web PWA',
      'TypeScript & Strict System Design',
      'Prisma ORM, PostgreSQL & SQLite FTS5',
      'Zero-Dependency Node.js Reverse Proxy',
    ],
  },
  {
    title: 'Linux & Cloud Systems',
    desc: {
      id: 'Mengelola fleet Linux hybrid multi-node: cloud ARM64, laptop Arch-based, dan node Android — semuanya tersambung mesh terenkripsi dengan otomasi penuh.',
      en: 'Operating a hybrid multi-node Linux fleet: ARM64 cloud, Arch-based laptops, and Android nodes — all connected over an encrypted mesh with full automation.',
    },
    items: [
      '3+ Years Linux (EndeavourOS / CachyOS)',
      'Oracle Cloud ARM64 (4 OCPU / 24GB)',
      '6-Node Tailscale Zero-Trust Mesh',
      '10 systemd Services + Python Auto-Healers',
      'Fail2ban, SSH Hardening & 17 Cronjobs',
    ],
  },
];
