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
  line: string;
}

export const translations = {
  id: {
    nav: {
      brandShort: 'Marcelino T.',
      brandFull: 'Marcelino M. Turangan',
      projects: 'Sistem',
      infra: 'Console',
      experience: 'Pengalaman',
      contact: 'Kontak',
      hireMe: 'Chat WhatsApp',
      switchLang: 'Switch to English',
    },
    hero: {
      skipToContent: 'Skip to content',
      badge: 'Terbuka untuk Remote Engineering, Integrasi AI & Linux Ops',
      titlePart1: 'Agen AI, Web PWA ',
      titlePart2: '& Sistem Linux.',
      description:
        'Praktisi Linux 6+ tahun dan AI Systems Integrator di Nusantara (IKN). Merakit bot AI multi-kanal, aplikasi Web/PWA, serta server ARM64 aktif penuh.',
      downloadCv: 'Unduh CV',
      whatsapp: 'Chat WhatsApp',
      copyEmail: 'Salin Email',
      emailCopied: 'Email Tersalin',
      github: 'GitHub @Marcel-mux',
      threads: 'Threads @marcelt_0',
      photoAlt: 'Potret Marcelino M. Turangan di depan setup kerja',
      facts: [
        { label: 'Lokasi & Zona', value: 'IKN Nusantara (UTC+8)' },
        { label: 'Sistem Linux', value: '6+ Tahun Harian' },
        { label: 'Armada Cloud', value: '24 vCPU · 72 GB RAM' },
        { label: 'Produksi Aktif', value: '10 Daemon Systemd' },
      ],
    },
    projects: {
      sectionPre: '01 / KARYA TERPILIH',
      sectionTitle: 'Sistem AI, Web PWA & Deployment',
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
        'Infrastruktur hybrid 24/7 di Oracle Cloud ARM64, mesh 6 node Tailscale, dan 17 cronjob otomatis.',
      consoleHost: 'muxoracle@oci-arm64 · ap-singapore-1',
      consoleSummary: '24\u00a0vCPU · 72\u00a0GB RAM · 10\u00a0Daemons · 6\u00a0Mesh',
      mapCaption: 'Topologi Mesh & Cloud Fleet',
      mapAlt: 'Peta topologi infrastruktur VPS, sandbox cloud, dan Tailscale mesh',
      tabs: {
        fleet: 'Cloud Fleet (6)',
        services: 'Systemd (10)',
        mesh: 'Tailscale (6)',
        gateway: '9Router',
      },
      cronSummary: '17 cronjobs · health check 09:00 & 21:00 · audit keamanan 07:00 WITA',
      aiGatewayTitle: 'Gateway AI Multi-Provider 9Router',
      aiGatewayDesc: '22 koneksi aktif · 7 provider family · 5 fallback combo (:20128)',
    },
    experience: {
      sectionPre: '03 / PENGALAMAN & STACK',
      sectionTitle: 'Pengalaman AI, Web & Stack Linux',
      stackTitle: 'Stack Utama',
      school: 'Politeknik Negeri Manado',
      schoolDetail: 'Manado State Polytechnic · Sulawesi Utara',
      setupAlt: 'Workstation Linux dual-monitor EndeavourOS dan laptop ThinkPad X13 CachyOS',
    },
    contact: {
      sectionPre: '04 / KONTAK',
      title: 'Kontak & Kolaborasi Teknis',
      description:
        'Terbuka untuk kerja remote, integrasi bot AI (WhatsApp, Discord, Telegram), Web/PWA, dan administrasi server Linux.',
      chatWa: 'Chat WhatsApp',
      downloadCv: 'Unduh CV',
      copyEmail: 'Salin Email (marcelturangan2@gmail.com)',
      emailCopied: 'Email Tersalin',
      emailAriaCopied: 'Email marcelturangan2@gmail.com berhasil disalin ke clipboard',
      previewAlt: 'Antarmuka web Hermes Cockpit Mobile PWA',
    },
    footer: {
      copyright: '© 2026 Marcelino M. Turangan · IKN Nusantara',
    },
  },
  en: {
    nav: {
      brandShort: 'Marcelino T.',
      brandFull: 'Marcelino M. Turangan',
      projects: 'Systems',
      infra: 'Console',
      experience: 'Experience',
      contact: 'Contact',
      hireMe: 'Chat WhatsApp',
      switchLang: 'Ganti ke Bahasa Indonesia',
    },
    hero: {
      skipToContent: 'Skip to content',
      badge: 'Open for Remote Engineering, AI Systems & Linux Ops',
      titlePart1: 'AI Agents, Web PWA ',
      titlePart2: '& Linux Ops.',
      description:
        '6+ year Linux practitioner & AI Systems Integrator in Nusantara (IKN). Building multi-channel AI bots, Web/PWA apps, and 24/7 ARM64 Linux infrastructure.',
      downloadCv: 'Download CV',
      whatsapp: 'Chat WhatsApp',
      copyEmail: 'Copy Email',
      emailCopied: 'Email Copied',
      github: 'GitHub @Marcel-mux',
      threads: 'Threads @marcelt_0',
      photoAlt: 'Portrait of Marcelino M. Turangan at his desk',
      facts: [
        { label: 'Location & Zone', value: 'IKN Nusantara (UTC+8)' },
        { label: 'Linux Practice', value: '6+ Years Daily-Driver' },
        { label: 'Cloud Fleet', value: '24 vCPU · 72 GB RAM' },
        { label: 'Production', value: '10 Live Daemons' },
      ],
    },
    projects: {
      sectionPre: '01 / SELECTED WORKS',
      sectionTitle: 'AI Systems, Web PWA & Deployments',
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
        'Self-hosted hybrid stack running 24/7 on Oracle Cloud ARM64, linked across 6 Tailscale nodes and 17 cronjobs.',
      consoleHost: 'muxoracle@oci-arm64 · ap-singapore-1',
      consoleSummary: '24\u00a0vCPU · 72\u00a0GB RAM · 10\u00a0Daemons · 6\u00a0Mesh',
      mapCaption: 'Mesh & Cloud Fleet Topology',
      mapAlt: 'Infrastructure topology diagram across Oracle VPS, cloud sandboxes, and Tailscale mesh',
      tabs: {
        fleet: 'Cloud Fleet (6)',
        services: 'Systemd (10)',
        mesh: 'Tailscale (6)',
        gateway: '9Router',
      },
      cronSummary: '17 cronjobs · health checks 09:00 & 21:00 · security audit 07:00 WITA',
      aiGatewayTitle: '9Router Multi-Provider AI Gateway',
      aiGatewayDesc: '22 active connections · 7 provider families · 5 fallback combos (:20128)',
    },
    experience: {
      sectionPre: '03 / BACKGROUND & STACK',
      sectionTitle: 'Experience in AI, Web & Linux Stack',
      stackTitle: 'Core Stack',
      school: 'Manado State Polytechnic',
      schoolDetail: 'Politeknik Negeri Manado · North Sulawesi',
      setupAlt: 'Dual-monitor EndeavourOS workstation and ThinkPad X13 CachyOS setup',
    },
    contact: {
      sectionPre: '04 / CONTACT',
      title: 'Contact & Engineering Availability',
      description:
        'Available for remote engineering roles, AI bot integration (WhatsApp, Discord, Telegram), Web/PWA apps, and Linux server setups.',
      chatWa: 'Chat WhatsApp',
      downloadCv: 'Download CV',
      copyEmail: 'Copy Email (marcelturangan2@gmail.com)',
      emailCopied: 'Email Copied',
      emailAriaCopied: 'Email marcelturangan2@gmail.com copied to clipboard',
      previewAlt: 'Hermes Cockpit Mobile PWA preview interface',
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
      id: 'MOBILE PWA & PROXY',
      en: 'MOBILE PWA & PROXY',
    },
    title: {
      id: 'Client PWA Hermes Cockpit',
      en: 'Hermes Cockpit PWA Client',
    },
    desc: {
      id: 'Client PWA mobile-first untuk agen Hermes dengan WebSocket streaming, isolasi profil, dan proxy Brotli Node.js.',
      en: 'Mobile-first PWA for Hermes Agent featuring WebSocket streaming, isolated profiles, and a zero-dep Node.js Brotli proxy.',
    },
    chips: ['Expo Web', 'TypeScript', 'Node.js Proxy', 'WebSockets'],
    image: '/projects/hermes-cockpit-chat-dark.png',
    imageSecondary: '/projects/hermes-cockpit-settings-dark.png',
    github: 'https://github.com/Marcel-mux/hermes-cockpit',
    metrics: {
      id: 'Zero-Dep Proxy · Real-Time WS Streaming',
      en: 'Zero-Dep Proxy · Real-Time WS Streaming',
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
      id: 'Gateway Discord Antigravity CLI',
      en: 'Antigravity CLI Discord Gateway',
    },
    desc: {
      id: 'Bridge Python & systemd mengendalikan Antigravity CLI dari Discord dengan sesi persisten dan index SQLite FTS5.',
      en: 'Python & systemd bridge controlling Antigravity CLI via Discord with persistent sessions and SQLite FTS5 indexing.',
    },
    chips: ['Python 3', 'discord.py', 'systemd', 'SQLite FTS5'],
    image: '/projects/antigravity-gateway-cli.png',
    imageSecondary: '/projects/antigravity-gateway-arch.png',
    github: 'https://github.com/Marcel-mux',
    metrics: {
      id: 'Sesi Persisten · Multi-Server @mention · FTS5',
      en: 'Persistent Sessions · Multi-Server · FTS5 Search',
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
      id: 'Mesin Bot WhatsApp & Telegram',
      en: 'WhatsApp & Telegram Bot Engine',
    },
    desc: {
      id: 'Bot Sipuki & Cobra di atas Baileys WebSocket & 9Router LLM Gateway dengan transkripsi audio/TTS serta Vision.',
      en: 'Sipuki & Cobra bots built on Baileys WebSocket & 9Router LLM Gateway with audio/TTS and Vision tooling.',
    },
    chips: ['Node.js', 'Baileys WS', '9Router', 'Hermes Gateway'],
    image: '/projects/whatsapp-cobra.jpg',
    imageSecondary: '/projects/telegram-agents.jpg',
    github: 'https://github.com/Marcel-mux',
    metrics: {
      id: 'Routing Multi-Persona · Vision & Audio/TTS',
      en: 'Multi-Persona Routing · Vision & Audio/TTS',
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
      id: 'Daemon Auto-Heal OAuth 9Router',
      en: '9Router OAuth Auto-Heal Daemon',
    },
    desc: {
      id: 'Watchdog Python & systemd untuk probe token OAuth 9Router, pemulihan sesi otomatis, dan bridge proxy anti-WAF.',
      en: 'Python & systemd watchdog probing 9Router OAuth tokens with automated session recovery and WAF bridge proxies.',
    },
    chips: ['Python 3', 'Node.js Proxy', 'OAuth', 'systemd'],
    image: '/projects/system-architecture.png',
    imageSecondary: '/projects/antigravity-gateway-arch.png',
    github: 'https://github.com/Marcel-mux/antigravity-guard-9router',
    metrics: {
      id: 'Pemulihan Zero-Touch · Refresh Token Otomatis',
      en: 'Zero-Touch Recovery · Automated Token Refresh',
    },
  },
  {
    id: 'finpulse',
    categories: ['web'],
    tag: {
      id: 'WEB ANALITIK KEUANGAN',
      en: 'FINANCIAL ANALYTICS WEB',
    },
    title: {
      id: 'Web App Keuangan FinPulse',
      en: 'FinPulse Web App Tracker',
    },
    desc: {
      id: 'Aplikasi Next.js & PostgreSQL untuk melacak Net Worth multi-rekening, limit kredit, grafik, serta alert Telegram.',
      en: 'Next.js & PostgreSQL app tracking multi-account Net Worth, credit utilization charts, AI Q&A, and Telegram alerts.',
    },
    chips: ['Next.js 14', 'TypeScript', 'Prisma ORM', 'PostgreSQL'],
    image: '/projects/finpulse-charts.jpg',
    imageSecondary: '/projects/finpulse.jpg',
    github: 'https://github.com/Marcel-mux/FInPulse-Project',
    metrics: {
      id: 'Multi-Account Net Worth · AI Q&A · Telegram',
      en: 'Multi-Account Net Worth · AI Q&A · Telegram',
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
      id: 'Armada Cloud & Mesh Tailscale',
      en: 'Cloud Fleet & Tailscale Mesh',
    },
    desc: {
      id: 'Infrastruktur hybrid Oracle ARM64, workstation Linux CachyOS/EndeavourOS, Termux, dan cloud sandboxes terenkripsi.',
      en: 'Hybrid fleet uniting Oracle ARM64, CachyOS/EndeavourOS workstations, Termux, and cloud sandboxes over Tailscale.',
    },
    chips: ['Oracle ARM64', 'Ubuntu 26.04', 'Tailscale Mesh', 'Fail2ban'],
    image: '/projects/endeavour-neofetch.jpg',
    imageSecondary: '/projects/vps-infra-map.png',
    github: 'https://github.com/Marcel-mux',
    metrics: {
      id: '4\u00a0OCPU / 24\u00a0GB RAM · 6\u00a0Node Mesh · 10\u00a0Daemon',
      en: '4\u00a0OCPU / 24\u00a0GB RAM · 6\u00a0Mesh Nodes · 10\u00a0Daemons',
    },
  },
];

export const liveServices: LiveService[] = [
  {
    name: '9router.service',
    desc: { id: 'AI Gateway (22 koneksi / 7 family)', en: 'AI Gateway (22 connections / 7 families)' },
    port: ':20128',
  },
  {
    name: 'agy-gateway.service',
    desc: { id: 'Discord Gateway & FTS5 search', en: 'Discord Gateway & FTS5 search' },
    port: 'Discord WS',
  },
  {
    name: 'hermes-gateway.service',
    desc: { id: 'Router agen TG / Discord / WA', en: 'TG / Discord / WA agent router' },
    port: 'internal',
  },
  {
    name: 'hermes-dashboard.service',
    desc: { id: 'Web dashboard & telemetri sesi', en: 'Web dashboard & session telemetry' },
    port: ':9119',
  },
  {
    name: 'hermes-mobile.service',
    desc: { id: 'Hermes Cockpit PWA Brotli proxy', en: 'Hermes Cockpit PWA Brotli proxy' },
    port: ':8088',
  },
  {
    name: 'wa-ai-bot.service',
    desc: { id: 'Bot Baileys (Sipuki & Cobra)', en: 'Baileys WA bots (Sipuki & Cobra)' },
    port: 'WA WS',
  },
  {
    name: 'agentrouter-proxy.service',
    desc: { id: 'Proxy bridge & header anti-WAF', en: 'Local proxy bridge & anti-WAF' },
    port: ':8318',
  },
  {
    name: 'gemini-web2api.service',
    desc: { id: 'Bridge Gemini ke API OpenAI', en: 'Gemini web-to-OpenAI bridge' },
    port: 'internal',
  },
  {
    name: 'tailscaled.service',
    desc: { id: 'Zero-Trust mesh VPN (6 node)', en: 'Zero-Trust mesh VPN (6 nodes)' },
    port: 'mesh',
  },
  {
    name: 'fail2ban.service',
    desc: { id: 'Proteksi brute-force SSH', en: 'SSH brute-force protection' },
    port: 'security',
  },
];

export const meshNodes: MeshNode[] = [
  {
    host: 'muxoracle',
    spec: 'Oracle Cloud · 4\u00a0OCPU / 24\u00a0GB ARM64',
    role: { id: 'Host Produksi 24/7', en: '24/7 Core Host' },
    status: 'online',
  },
  {
    host: 'muxcue',
    spec: 'Manus VM · 8\u00a0vCPU / 24\u00a0GB x86_64',
    role: { id: 'Compute & Build', en: 'Compute & Build' },
    status: 'online',
  },
  {
    host: 'cachyos-ltx13g1',
    spec: 'ThinkPad X13 Gen 1 · CachyOS',
    role: { id: 'Laptop Harian', en: 'Daily Laptop' },
    status: 'edge',
  },
  {
    host: 'zendeavour-sky232',
    spec: 'Workstation PC · EndeavourOS',
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
    spec: 'Cloud VM · Tagged Sandbox',
    role: { id: 'Node Keamanan Agen', en: 'Agent Security Node' },
    status: 'ephemeral',
  },
];

export const cloudFleetNodes: CloudFleetNode[] = [
  {
    id: 'oracle',
    name: 'Oracle Cloud (muxoracle)',
    provider: 'OCI Always Free A1',
    spec: '4\u00a0OCPU ARM64 · 24\u00a0GB · 200\u00a0GB',
    os: 'Ubuntu 26.04',
    role: {
      id: 'Host produksi 24/7: 9Router, Hermes, Bot WA, Cockpit, 17 cron.',
      en: '24/7 core host: 9Router, Hermes, WA bots, Cockpit, 17 cronjobs.',
    },
    statusLabel: { id: 'Online 24/7', en: '24/7 Online' },
    statusType: 'online',
  },
  {
    id: 'cue',
    name: 'Manus Cue (muxcue)',
    provider: 'Manus Sandbox',
    spec: '8\u00a0vCPU x86_64 · 24\u00a0GB · 70\u00a0GB',
    os: 'Ubuntu 24.04',
    role: {
      id: 'Komputasi x86_64, build Next.js, test harness, watchdog.',
      en: 'x86_64 compute, Next.js builds, test harness, watchdog.',
    },
    statusLabel: { id: 'Watchdog', en: 'Watchdog' },
    statusType: 'watchdog',
  },
  {
    id: 'instabox',
    name: 'InstaBox (agent-browser)',
    provider: 'Firecracker MicroVM',
    spec: '4\u00a0vCPU · 8\u00a0GB · 36\u00a0GB',
    os: 'Linux MicroVM',
    role: {
      id: 'Otomasi headless browser & scraping JS terisolasi.',
      en: 'Headless browser automation & isolated scraping.',
    },
    statusLabel: { id: 'Auto-Wake', en: 'Auto-Wake' },
    statusType: 'autowake',
  },
  {
    id: 'freestyle',
    name: 'Freestyle.sh (mux-fssh)',
    provider: 'Freestyle MicroVM',
    spec: '4\u00a0vCPU · 8\u00a0GB · 32\u00a0GB',
    os: 'Ubuntu 24.04',
    role: {
      id: 'Sandbox uji kode cepat & build runner via CLI.',
      en: 'Disposable testing sandbox & CLI build runner.',
    },
    statusLabel: { id: 'Auto-Wake', en: 'Auto-Wake' },
    statusType: 'autowake',
  },
  {
    id: 'simularbox',
    name: 'Simular Box (main)',
    provider: 'Cloud Desktop',
    spec: '2\u00a0vCPU · 4\u00a0GB · 20\u00a0GB',
    os: 'Ubuntu XFCE',
    role: {
      id: 'Otomasi GUI Linux desktop & computer-use MCP.',
      en: 'Linux GUI desktop automation & computer-use MCP.',
    },
    statusLabel: { id: 'Hibernate', en: 'Hibernate' },
    statusType: 'standby',
  },
  {
    id: 'simularai',
    name: 'Simular Sai (simularai)',
    provider: 'Cloud Windows',
    spec: '2\u00a0vCPU · 4\u00a0GB · 40\u00a0GB',
    os: 'Windows 10 Pro',
    role: {
      id: 'Otomasi aplikasi native Windows (.exe & GUI) via API.',
      en: 'Native Windows GUI automation (.exe) via API.',
    },
    statusLabel: { id: 'Standby', en: 'Standby' },
    statusType: 'standby',
  },
];

export const experienceItems: ExperienceItem[] = [
  {
    role: 'Arsitek Sistem AI & Full-Stack Builder (3+ Tahun)',
    org: 'Independen / Open Source · IKN Nusantara',
    period: {
      id: '3+ Tahun – Sekarang',
      en: '3+ Years – Present',
    },
    summary: {
      id: 'Merakit sistem agen AI, Web/PWA, dan server Linux ARM64 self-hosted hingga produksi 24/7.',
      en: 'Building AI agent systems, Web/PWA apps, and 24/7 self-hosted ARM64 Linux servers.',
    },
  },
  {
    role: 'Operasional Kafe & Layanan Mandiri (3 Tahun)',
    org: 'Operasional Mandiri · Ring IKN',
    period: {
      id: '3 Tahun – Sekarang',
      en: '3 Years – Present',
    },
    summary: {
      id: 'Mengelola operasional kafe seorang diri setiap hari: stok, produksi minuman, kontrol kualitas, dan layanan pelanggan.',
      en: 'Running solo daily cafe operations: inventory, beverage prep, quality checks, and customer service.',
    },
  },
];

export const stackRows: StackRow[] = [
  {
    area: { id: 'AI & Agents', en: 'AI & Agents' },
    line: 'Hermes CLI · Antigravity CLI · 9Router Gateway · Baileys WS · discord.py · Vision & TTS',
  },
  {
    area: { id: 'Web & PWA', en: 'Web & PWA' },
    line: 'Next.js 14 · React · Expo Web · TypeScript · Tailwind CSS · PostgreSQL & SQLite FTS5',
  },
  {
    area: { id: 'Linux & Cloud', en: 'Linux & Cloud' },
    line: 'EndeavourOS · CachyOS · Ubuntu 26.04 ARM64 · Tailscale Mesh · systemd · Fail2ban',
  },
];
