export type Lang = 'id' | 'en';
export type TabKey = 'all' | 'ai' | 'web' | 'linux';
export type InfraTabKey = 'fleet' | 'services' | 'mesh' | 'gateway';

export interface ProjectItem {
  id: string;
  categories: TabKey[];
  tag: { id: string; en: string };
  title: { id: string; en: string };
  desc: { id: string; en: string };
  chips: string[];
  image: string;
  imageSecondary: string;
  mediaLayout: 'portrait-pair' | 'stack';
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
}

export interface ExperienceItem {
  role: string;
  org: string;
  period: { id: string; en: string };
  summary: { id: string; en: string };
}

export interface StackRow {
  area: { id: string; en: string };
  items: string[];
}

export const translations = {
  id: {
    nav: {
      projects: 'Proyek',
      infra: 'Server',
      experience: 'Pengalaman',
      contact: 'Kontak',
      hireMe: 'Chat WhatsApp',
      cv: 'Unduh CV',
      switchLang: 'Switch to English',
    },
    hero: {
      skipToContent: 'Lewati ke konten utama',
      location: 'IKN, Indonesia (WITA)',
      badge: 'Terbuka untuk Remote Engineering, Integrasi AI & Linux Ops',
      titlePart1: 'Agen AI Otonom, ',
      titlePart2: 'Web/PWA & Sistem Linux Self-Hosted.',
      description:
        'Praktisi Linux (6+ tahun) & AI Systems Integrator di Nusantara (IKN). Merakit bot AI di WhatsApp, Discord & Telegram, aplikasi Web/PWA, serta server Linux ARM64 24/7.',
      downloadCv: 'Unduh CV',
      whatsapp: 'Chat WhatsApp',
      copyEmail: 'Salin Email',
      emailCopied: 'Email Tersalin',
      github: 'GitHub @Marcel-mux',
      threads: 'Threads @marcelt_0',
      metaStrip: [
        'IKN Nusantara (UTC+8)',
        '6+ Tahun Linux Harian',
        'Armada 24 vCPU / 72 GB RAM',
        '10 Daemon Systemd Aktif',
      ],
    },
    projects: {
      sectionPre: '01 / KARYA TERPILIH',
      sectionTitle: 'Proyek & Deployment Nyata',
      filterAria: 'Filter proyek berdasarkan kategori',
      tabs: {
        all: 'Semua',
        ai: 'AI & Agents',
        web: 'Web & PWA',
        linux: 'Linux & Cloud',
      },
      viewCode: 'Lihat Kode',
      livePreview: 'Buka Web',
    },
    infra: {
      sectionPre: '02 / INFRASTRUKTUR PRODUKSI',
      sectionTitle: 'Ops Console & Armada Cloud',
      sectionDesc:
        'Infrastruktur hybrid yang berjalan 24/7 di Oracle Cloud ARM64, terhubung ke 6 node Tailscale, 6 sandbox cloud, dan 17 cronjob.',
      consoleHost: 'muxoracle@oci-arm64 · ap-singapore-1',
      consoleSummary: '24 vCPU · 72 GB RAM · 10 Daemons · 6 Mesh Nodes · 17 Cronjobs',
      tabs: {
        fleet: 'Cloud Fleet (6)',
        services: 'Systemd (10)',
        mesh: 'Tailscale Mesh (6)',
        gateway: '9Router Gateway',
      },
      headers: {
        node: 'Node / Provider',
        spec: 'Spesifikasi & OS',
        role: 'Peran & Fungsi',
        status: 'Status',
        service: 'Unit Systemd',
        desc: 'Fungsi',
        bind: 'Port / Bind',
        host: 'Hostname',
        hardware: 'Perangkat & OS',
      },
      cronSummary: '17 cronjobs · health check 09:00 & 21:00 · audit keamanan 07:00 WITA',
      aiGatewayTitle: '9Router Multi-Provider AI Gateway',
      aiGatewayDesc: '22 koneksi aktif · 7 provider family · 5 fallback combo (:20128)',
    },
    experience: {
      sectionPre: '03 / PENGALAMAN & STACK',
      sectionTitle: 'Latar Belakang & Tech Stack',
      stackTitle: 'Tech Stack Utama',
      educationTitle: 'Pendidikan',
      school: 'Politeknik Negeri Manado',
      schoolDetail: 'Manado State Polytechnic, Sulawesi Utara',
      cvPrompt: 'Versi ringkas siap cetak / ATS:',
      downloadFullCv: 'Unduh CV (PDF)',
    },
    contact: {
      sectionPre: '04 / KONTAK',
      title: 'Butuh bantuan integrasi AI, Web/PWA, atau Linux?',
      description:
        'Terbuka untuk kerja remote, integrasi bot AI (WhatsApp, Discord, Telegram), pembuatan Web/PWA, atau setup Linux self-hosted.',
      chatWa: 'Chat WhatsApp',
      downloadCv: 'Unduh CV',
      copyEmail: 'Salin Email (marcelturangan2@gmail.com)',
      emailCopied: 'Email Tersalin',
      emailAriaCopied: 'Email marcelturangan2@gmail.com berhasil disalin ke clipboard',
    },
    footer: {
      copyright: '© 2026 Marcelino M. Turangan · IKN Nusantara',
    },
  },
  en: {
    nav: {
      projects: 'Projects',
      infra: 'Console',
      experience: 'Background',
      contact: 'Contact',
      hireMe: 'Chat WhatsApp',
      cv: 'Download CV',
      switchLang: 'Ganti ke Bahasa Indonesia',
    },
    hero: {
      skipToContent: 'Skip to main content',
      location: 'IKN, Indonesia (WITA)',
      badge: 'Open for Remote Engineering, AI Systems & Linux Ops',
      titlePart1: 'Autonomous AI Agents, ',
      titlePart2: 'Web/PWA Apps & Self-Hosted Linux.',
      description:
        'Linux practitioner (6+ years) & AI Systems Integrator in Nusantara (IKN). I build AI bots on WhatsApp, Discord & Telegram, Web/PWA apps, and 24/7 ARM64 Linux servers.',
      downloadCv: 'Download CV',
      whatsapp: 'Chat WhatsApp',
      copyEmail: 'Copy Email',
      emailCopied: 'Email Copied',
      github: 'GitHub @Marcel-mux',
      threads: 'Threads @marcelt_0',
      metaStrip: [
        'IKN Nusantara (UTC+8)',
        '6+ Yrs Daily-Driver Linux',
        '24 vCPU / 72 GB Cloud Fleet',
        '10 Live systemd Daemons',
      ],
    },
    projects: {
      sectionPre: '01 / SELECTED WORKS',
      sectionTitle: 'Production Builds & Deployments',
      filterAria: 'Filter projects by category',
      tabs: {
        all: 'All',
        ai: 'AI & Agents',
        web: 'Web & PWA',
        linux: 'Linux & Cloud',
      },
      viewCode: 'View Code',
      livePreview: 'Open Demo',
    },
    infra: {
      sectionPre: '02 / PRODUCTION INFRASTRUCTURE',
      sectionTitle: 'Ops Console & Cloud Fleet',
      sectionDesc:
        'Self-hosted hybrid stack running 24/7 on Oracle Cloud ARM64, linked across 6 Tailscale nodes, 6 cloud sandboxes, and 17 automated cronjobs.',
      consoleHost: 'muxoracle@oci-arm64 · ap-singapore-1',
      consoleSummary: '24 vCPU · 72 GB RAM · 10 Daemons · 6 Mesh Nodes · 17 Cronjobs',
      tabs: {
        fleet: 'Cloud Fleet (6)',
        services: 'Systemd (10)',
        mesh: 'Tailscale Mesh (6)',
        gateway: '9Router Gateway',
      },
      headers: {
        node: 'Node / Provider',
        spec: 'Specs & OS',
        role: 'Workload',
        status: 'Status',
        service: 'Systemd Unit',
        desc: 'Purpose',
        bind: 'Port / Bind',
        host: 'Hostname',
        hardware: 'Hardware & OS',
      },
      cronSummary: '17 cronjobs · health checks 09:00 & 21:00 · security audit 07:00 WITA',
      aiGatewayTitle: '9Router Multi-Provider AI Gateway',
      aiGatewayDesc: '22 active connections · 7 provider families · 5 fallback combos (:20128)',
    },
    experience: {
      sectionPre: '03 / BACKGROUND & STACK',
      sectionTitle: 'Experience & Tech Stack',
      stackTitle: 'Core Stack',
      educationTitle: 'Education',
      school: 'Manado State Polytechnic',
      schoolDetail: 'Politeknik Negeri Manado, North Sulawesi',
      cvPrompt: 'Print-ready ATS resume:',
      downloadFullCv: 'Download CV',
    },
    contact: {
      sectionPre: '04 / CONTACT',
      title: 'Open for remote engineering & AI systems work.',
      description:
        'Available for remote roles, AI bot integrations (WhatsApp, Discord, Telegram), Web/PWA builds, and self-hosted Linux infrastructure.',
      chatWa: 'Chat WhatsApp',
      downloadCv: 'Download CV',
      copyEmail: 'Copy Email (marcelturangan2@gmail.com)',
      emailCopied: 'Email Copied',
      emailAriaCopied: 'Email marcelturangan2@gmail.com copied to clipboard',
    },
    footer: {
      copyright: '© 2026 Marcelino M. Turangan · IKN Nusantara',
    },
  },
};

export const projectItems: ProjectItem[] = [
  {
    id: 'hermes-cockpit',
    categories: ['web', 'ai'],
    tag: {
      id: 'OPEN SOURCE · MOBILE PWA & PROXY',
      en: 'OPEN SOURCE · MOBILE PWA & PROXY',
    },
    title: {
      id: 'Hermes Cockpit (Mobile PWA)',
      en: 'Hermes Cockpit (Mobile PWA)',
    },
    desc: {
      id: 'Client PWA mobile-first untuk Nous Research Hermes Agent. Mendukung WebSocket token streaming, thought-process accordion, isolasi profil, dan reverse proxy Node.js (server.mjs) dengan kompresi Brotli.',
      en: 'Mobile-first PWA client for Nous Research Hermes Agent. Streams tokens over WebSockets with a collapsible thought trace, isolated profiles, and a zero-dependency Node.js Brotli proxy.',
    },
    chips: ['Expo Web', 'TypeScript', 'Tailwind CSS', 'Node.js Proxy', 'WebSockets', 'Docker'],
    image: '/projects/hermes-cockpit-chat-dark.png',
    imageSecondary: '/projects/hermes-cockpit-settings-dark.png',
    mediaLayout: 'portrait-pair',
    github: 'https://github.com/Marcel-mux/hermes-cockpit',
    metrics: {
      id: 'Zero-Dep Proxy · Real-Time WS Streaming · Standalone PWA',
      en: 'Zero-Dep Proxy · Real-Time WS Streaming · Standalone PWA',
    },
  },
  {
    id: 'antigravity-gateway',
    categories: ['ai', 'linux'],
    tag: {
      id: 'CLI-TO-DISCORD GATEWAY',
      en: 'CLI-TO-DISCORD GATEWAY',
    },
    title: {
      id: 'Antigravity Discord Gateway',
      en: 'Antigravity Discord Gateway',
    },
    desc: {
      id: 'Bridge Discord berbasis Python & systemd untuk menjalankan Google Antigravity CLI (agy) secara remote. Punya sesi persisten per channel, multi-server @mention gating, dan pencarian histori SQLite FTS5.',
      en: 'Python & systemd Discord bridge controlling Google Antigravity CLI (agy) remotely. Supports persistent per-channel sessions, multi-server @mention gating, and SQLite FTS5 history search.',
    },
    chips: ['Python 3', 'discord.py', 'systemd', 'SQLite FTS5', 'Live Streaming'],
    image: '/projects/antigravity-gateway-arch.png',
    imageSecondary: '/projects/antigravity-gateway-cli.png',
    mediaLayout: 'stack',
    github: 'https://github.com/Marcel-mux',
    metrics: {
      id: 'Sesi Persisten · Multi-Server @mention · SQLite FTS5 Search',
      en: 'Persistent Sessions · Multi-Server @mention · SQLite FTS5 Search',
    },
  },
  {
    id: 'wa-engine',
    categories: ['ai'],
    tag: {
      id: 'MULTI-AGENT BOT ENGINE',
      en: 'MULTI-AGENT BOT ENGINE',
    },
    title: {
      id: 'WhatsApp & Telegram Multi-Agent Engine',
      en: 'WhatsApp & Telegram Multi-Agent Engine',
    },
    desc: {
      id: 'Mesin bot Sipuki & Cobra di atas Baileys WebSocket & Hermes Gateway. Terhubung ke 9Router LLM Gateway dengan transkripsi audio/TTS, analisis Vision, routing multi-persona, dan pencarian web paralel.',
      en: 'Autonomous Sipuki & Cobra bots built on Baileys WebSocket & Hermes Gateway. Wired into a self-hosted 9Router LLM Gateway with audio/TTS, Vision analysis, and parallel web search.',
    },
    chips: ['Node.js', 'Baileys WS', 'Hermes Gateway', '9Router', 'systemd'],
    image: '/projects/whatsapp-cobra.jpg',
    imageSecondary: '/projects/telegram-agents.jpg',
    mediaLayout: 'portrait-pair',
    github: 'https://github.com/Marcel-mux',
    metrics: {
      id: 'Self-Hosted Routing · Multi-Persona · Vision & Audio/TTS',
      en: 'Self-Hosted Routing · Multi-Persona · Vision & Audio/TTS',
    },
  },
  {
    id: 'antigravity-guard',
    categories: ['ai', 'linux'],
    tag: {
      id: 'OAUTH AUTO-HEAL DAEMON',
      en: 'OAUTH AUTO-HEAL DAEMON',
    },
    title: {
      id: 'Antigravity Guard (9Router OAuth Healer)',
      en: 'Antigravity Guard (9Router OAuth Healer)',
    },
    desc: {
      id: 'Daemon Python & systemd yang mengecek token OAuth Antigravity di 9Router lewat SQLite/API probe, memulihkan sesi macet otomatis, serta menyediakan proxy lokal anti-WAF.',
      en: 'Python & systemd watchdog probing Antigravity OAuth tokens inside 9Router via SQLite and API checks, auto-recovering stuck sessions alongside local anti-WAF bridge proxies.',
    },
    chips: ['Python 3', 'Node.js Proxy', 'OAuth Lifecycle', 'systemd', 'SQLite'],
    image: '/projects/system-architecture.png',
    imageSecondary: '/projects/vps-infra-map.png',
    mediaLayout: 'stack',
    github: 'https://github.com/Marcel-mux/antigravity-guard-9router',
    metrics: {
      id: 'Zero-Touch Recovery · Automated Token Refresh · WAF Proxy',
      en: 'Zero-Touch Recovery · Automated Token Refresh · WAF Proxy',
    },
  },
  {
    id: 'finpulse',
    categories: ['web'],
    tag: {
      id: 'FINANCIAL ANALYTICS APP',
      en: 'FINANCIAL ANALYTICS APP',
    },
    title: {
      id: 'FinPulse Personal Financial Tracker',
      en: 'FinPulse Personal Financial Tracker',
    },
    desc: {
      id: 'Pelacak Net Worth, saldo multi-rekening, limit kredit, dan jadwal cicilan. Dilengkapi grafik interaktif, AI Q&A keuangan, dan notifikasi tagihan otomatis ke bot Telegram.',
      en: 'Tracks multi-account Net Worth, credit utilization, and installment schedules in real time. Includes interactive charts, AI financial Q&A, and automated Telegram alerts.',
    },
    chips: ['Next.js 14', 'TypeScript', 'Prisma ORM', 'PostgreSQL', 'Tailwind CSS'],
    image: '/projects/finpulse-charts.jpg',
    imageSecondary: '/projects/finpulse.jpg',
    mediaLayout: 'portrait-pair',
    github: 'https://github.com/Marcel-mux/FInPulse-Project',
    metrics: {
      id: 'Multi-Account Net Worth · AI Q&A · Telegram Alerts',
      en: 'Multi-Account Net Worth · AI Q&A · Telegram Alerts',
    },
  },
  {
    id: 'linux-infra',
    categories: ['linux'],
    tag: {
      id: 'CLOUD MESH & DEVOPS',
      en: 'CLOUD MESH & DEVOPS',
    },
    title: {
      id: '6-Node Tailscale Mesh & Cloud Fleet',
      en: '6-Node Tailscale Mesh & Cloud Fleet',
    },
    desc: {
      id: 'Armada hybrid di atas Oracle Cloud ARM64 (4 OCPU / 24 GB RAM), laptop CachyOS & EndeavourOS, Android/Termux, serta cloud sandboxes (Cue, InstaBox, Freestyle, Simular) dalam mesh Tailscale.',
      en: 'Hybrid fleet combining Oracle Cloud ARM64 (4 OCPU / 24 GB RAM), CachyOS & EndeavourOS laptops, Android/Termux, and cloud sandboxes (Cue, InstaBox, Freestyle, Simular) over Tailscale.',
    },
    chips: ['Oracle ARM64', 'Ubuntu 26.04', 'Tailscale Mesh', 'systemd', 'Fail2ban'],
    image: '/projects/vps-infra-map.png',
    imageSecondary: '/projects/endeavour-neofetch.jpg',
    mediaLayout: 'stack',
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
    desc: { id: 'AI Gateway (22 koneksi / 7 provider family)', en: 'AI Gateway (22 connections / 7 provider families)' },
    port: ':20128',
  },
  {
    name: 'agy-gateway.service',
    desc: { id: 'Antigravity Discord Gateway & FTS5 search', en: 'Antigravity Discord Gateway & FTS5 search' },
    port: 'Discord WS',
  },
  {
    name: 'hermes-gateway.service',
    desc: { id: 'Orkestrator agen Telegram / Discord / WhatsApp', en: 'Telegram / Discord / WhatsApp agent router' },
    port: 'internal',
  },
  {
    name: 'hermes-dashboard.service',
    desc: { id: 'Web dashboard & telemetri sesi', en: 'Agent web dashboard & telemetry' },
    port: ':9119',
  },
  {
    name: 'hermes-mobile.service',
    desc: { id: 'Hermes Cockpit PWA Brotli proxy', en: 'Hermes Cockpit PWA Brotli proxy' },
    port: ':8088',
  },
  {
    name: 'wa-ai-bot.service',
    desc: { id: 'Baileys WhatsApp bots (Sipuki & Cobra)', en: 'Baileys WhatsApp bots (Sipuki & Cobra)' },
    port: 'WA WS',
  },
  {
    name: 'agentrouter-proxy.service',
    desc: { id: 'Local bridge proxy & header injection anti-WAF', en: 'Local bridge proxy & anti-WAF headers' },
    port: ':8318',
  },
  {
    name: 'gemini-web2api.service',
    desc: { id: 'Gemini web-to-OpenAI API bridge', en: 'Gemini web-to-OpenAI API bridge' },
    port: 'internal',
  },
  {
    name: 'tailscaled.service',
    desc: { id: 'Zero-Trust mesh VPN (6 node)', en: 'Zero-Trust mesh VPN (6 nodes)' },
    port: 'mesh',
  },
  {
    name: 'fail2ban.service',
    desc: { id: 'SSH brute-force protection', en: 'SSH brute-force protection' },
    port: 'security',
  },
];

export const meshNodes: MeshNode[] = [
  {
    host: 'muxoracle',
    spec: 'Oracle Cloud · 4 OCPU / 24 GB ARM64',
    role: { id: 'Core Host (24/7)', en: 'Core Host (24/7)' },
    status: 'online',
  },
  {
    host: 'muxcue',
    spec: 'Manus Cloud VM · 8 vCPU / 24 GB x86_64',
    role: { id: 'Compute & Build Sandbox', en: 'Compute & Build Sandbox' },
    status: 'online',
  },
  {
    host: 'cachyos-ltx13g1',
    spec: 'ThinkPad X13 Gen 1 AMD · CachyOS',
    role: { id: 'Laptop Harian', en: 'Daily Laptop' },
    status: 'edge',
  },
  {
    host: 'zendeavour-sky232',
    spec: 'PC Workstation · EndeavourOS',
    role: { id: 'Dev & Backup', en: 'Dev & Backup' },
    status: 'edge',
  },
  {
    host: 'infinix-gt-30-pro',
    spec: 'Infinix GT 30 Pro · Termux SSH',
    role: { id: 'Mobile Ops Node', en: 'Mobile Ops Node' },
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
      id: 'Host produksi 24/7: 9Router, Hermes, Bot WA, Cockpit PWA, 17 cronjobs.',
      en: '24/7 core host: 9Router, Hermes, WA bots, Cockpit PWA, 17 cronjobs.',
    },
    statusLabel: { id: 'Online 24/7', en: '24/7 Online' },
    statusType: 'online',
  },
  {
    id: 'cue',
    name: 'Manus Cue (muxcue)',
    provider: 'Manus Long Sandbox',
    spec: '8 vCPU x86_64 · 24 GB RAM · 70 GB SSD',
    os: 'Ubuntu 24.04 LTS',
    role: {
      id: 'Komputasi x86_64, build Next.js, test harness, keepalive watchdog.',
      en: 'Heavy x86_64 compute, Next.js builds, test harness, watchdog.',
    },
    statusLabel: { id: 'Watchdog', en: 'Watchdog' },
    statusType: 'watchdog',
  },
  {
    id: 'instabox',
    name: 'InstaBox (agent-browser)',
    provider: 'Firecracker MicroVM',
    spec: '4 vCPU · 8 GB RAM · 36 GB Storage',
    os: 'Linux MicroVM',
    role: {
      id: 'Otomasi headless browser cepat & scraping JS terisolasi.',
      en: 'Fast headless browser automation & isolated JS scraping.',
    },
    statusLabel: { id: 'Auto-Wake API', en: 'Auto-Wake API' },
    statusType: 'autowake',
  },
  {
    id: 'freestyle',
    name: 'Freestyle.sh (mux-fssh)',
    provider: 'Freestyle MicroVM',
    spec: '4 vCPU · 8 GB RAM · 32 GB NVMe',
    os: 'Ubuntu 24.04 LTS',
    role: {
      id: 'Disposable sandbox uji coba kode & build runner via CLI.',
      en: 'Disposable testing sandbox & on-demand CLI build runner.',
    },
    statusLabel: { id: 'Auto-Wake CLI', en: 'Auto-Wake CLI' },
    statusType: 'autowake',
  },
  {
    id: 'simularbox',
    name: 'Simular Box (main)',
    provider: 'Simular Cloud Desktop',
    spec: '2 vCPU AMD EPYC · 4 GB RAM · 20 GB SSD',
    os: 'Ubuntu 24.04 XFCE',
    role: {
      id: 'Otomasi GUI Linux desktop & computer-use via MCP.',
      en: 'Linux desktop GUI automation & computer-use via MCP.',
    },
    statusLabel: { id: 'Hibernate / MCP', en: 'Hibernate / MCP' },
    statusType: 'standby',
  },
  {
    id: 'simularai',
    name: 'Simular Sai (simularai)',
    provider: 'Simular Cloud Windows',
    spec: '2 vCPU · 4 GB RAM · ~40 GB Ephemeral',
    os: 'Windows 10 Pro',
    role: {
      id: 'Otomasi aplikasi native Windows (.exe & GUI) via API.',
      en: 'Native Windows app automation (.exe & desktop UI) via API.',
    },
    statusLabel: { id: 'Standby / API', en: 'Standby / API' },
    statusType: 'standby',
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
      id: 'Merakit dan mengoperasikan sistem agen AI, aplikasi Web/PWA, dan server Linux self-hosted hingga produksi 24/7.',
      en: 'Building and running AI agent systems, Web/PWA apps, and self-hosted Linux servers in 24/7 production.',
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
      id: 'Mengelola operasional kafe seorang diri setiap hari: stok, produksi minuman, quality check, dan layanan pelanggan.',
      en: 'Running daily cafe operations solo: inventory control, drink prep, quality checks, and direct customer service.',
    },
  },
];

export const stackRows: StackRow[] = [
  {
    area: { id: 'AI & Agents', en: 'AI & Agents' },
    items: [
      'Hermes & Antigravity CLI',
      '9Router LLM Gateway',
      'Baileys WA / discord.py / Telegram',
      'WebSocket Streaming',
      'Vision & Audio/TTS',
    ],
  },
  {
    area: { id: 'Web & Mobile PWA', en: 'Web & Mobile PWA' },
    items: [
      'Next.js App Router & React',
      'Expo Web',
      'TypeScript & Tailwind CSS',
      'Prisma, PostgreSQL & SQLite FTS5',
      'Node.js Proxy',
    ],
  },
  {
    area: { id: 'Linux & Cloud', en: 'Linux & Cloud' },
    items: [
      'EndeavourOS / CachyOS / Ubuntu',
      'Oracle Cloud ARM64',
      'Tailscale Mesh',
      'systemd & Cron',
      'Fail2ban & SSH Hardening',
    ],
  },
];
