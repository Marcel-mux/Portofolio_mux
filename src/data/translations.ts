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
      infra: 'Ops Console',
      experience: 'Latar Belakang',
      contact: 'Kontak',
      hireMe: 'Hubungi',
      cv: 'CV',
      switchLang: 'Switch to English',
    },
    hero: {
      skipToContent: 'Lewati ke konten utama',
      location: 'IKN, Indonesia (WITA)',
      badge: 'Terbuka untuk Remote Engineering, Integrasi AI, Web/PWA & Linux Ops',
      titlePart1: 'Merakit Agen AI Otonom, ',
      titlePart2: 'Aplikasi Web/PWA, dan Sistem Linux Self-Hosted.',
      description:
        'Praktisi Linux (3+ tahun) & AI Systems Integrator di Nusantara (IKN). Menghubungkan agen AI ke WhatsApp, Discord & Telegram, membangun aplikasi Web/PWA, dan menjalankan armada server Linux ARM64 24/7 tanpa ketergantungan SaaS pihak ketiga.',
      downloadCv: 'Unduh CV (PDF)',
      github: 'GitHub',
      threads: 'Threads',
      metaStrip: [
        'IKN Nusantara (UTC+8)',
        '3+ Tahun Linux Harian',
        'Armada Cloud 24 vCPU / 72 GB RAM',
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
      viewCode: 'Source Code',
      livePreview: 'Buka Web',
    },
    infra: {
      sectionPre: '02 / INFRASTRUKTUR PRODUKSI',
      sectionTitle: 'Ops Console & Armada Cloud',
      sectionDesc:
        'Infrastruktur hybrid yang saya operasikan sendiri: Oracle Cloud ARM64 24/7 sebagai pusat kendali, terhubung ke 6 node Tailscale mesh, 6 VM/microVM sandbox, dan 17 cronjob monitoring.',
      consoleHost: 'muxoracle@oci-arm64 · 140.245.50.98',
      consoleSummary: '24 vCPU/OCPU · 72 GB RAM · 10 Daemons · 6 Mesh Nodes · 17 Cronjobs',
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
      cronSummary: 'Otomasi: 17 cronjobs · laporan kesehatan 09:00 & 21:00 · audit keamanan 07:00 WITA',
      aiGatewayTitle: '9Router — Self-Hosted Multi-Provider AI Gateway',
      aiGatewayDesc: '22 koneksi aktif · 7 keluarga provider · 5 fallback combos (:20128)',
    },
    experience: {
      sectionPre: '03 / PENGALAMAN & STACK',
      sectionTitle: 'Latar Belakang & Tech Stack',
      stackTitle: 'Tech Stack Utama',
      educationTitle: 'Pendidikan',
      school: 'Politeknik Negeri Manado',
      schoolDetail: 'Manado State Polytechnic · Sulawesi Utara',
      cvPrompt: 'Versi ringkas siap cetak / ATS:',
      downloadFullCv: 'Unduh CV (PDF)',
    },
    contact: {
      sectionPre: '04 / KONTAK',
      title: 'Butuh bantuan integrasi AI, Web/PWA, atau Linux?',
      description:
        'Tersedia untuk kerja remote, proyek integrasi bot/agen AI (WhatsApp, Discord, Telegram), pengembangan Web/PWA, atau setup infrastruktur Linux self-hosted.',
      chatWa: 'WhatsApp (+62 897-9360-724)',
      downloadCv: 'Unduh CV (PDF)',
      copyEmail: 'Salin marcel.mux@gmail.com',
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
      infra: 'Ops Console',
      experience: 'Background',
      contact: 'Contact',
      hireMe: 'Contact',
      cv: 'CV',
      switchLang: 'Ganti ke Bahasa Indonesia',
    },
    hero: {
      skipToContent: 'Skip to main content',
      location: 'IKN, Indonesia (WITA / UTC+8)',
      badge: 'Available for Remote Engineering, AI Integrations, Web/PWA & Linux Ops',
      titlePart1: 'Building Autonomous AI Agents, ',
      titlePart2: 'Web/PWA Apps, and Self-Hosted Linux Systems.',
      description:
        'Linux practitioner (3+ years) & AI Systems Integrator in Nusantara (IKN). I wire autonomous AI agents into WhatsApp, Discord & Telegram, ship fast Web/PWA apps, and operate a 24/7 ARM64 Linux fleet without third-party SaaS lock-in.',
      downloadCv: 'Download CV (PDF)',
      github: 'GitHub',
      threads: 'Threads',
      metaStrip: [
        'IKN Nusantara (UTC+8)',
        '3+ Yrs Daily-Driver Linux',
        '24 vCPU / 72 GB Cloud Fleet',
        '10 Live systemd Daemons',
      ],
    },
    projects: {
      sectionPre: '01 / SELECTED WORKS',
      sectionTitle: 'Real-World Builds & Deployments',
      filterAria: 'Filter projects by category',
      tabs: {
        all: 'All',
        ai: 'AI & Agents',
        web: 'Web & PWA',
        linux: 'Linux & Cloud',
      },
      viewCode: 'Source Code',
      livePreview: 'Live Demo',
    },
    infra: {
      sectionPre: '02 / PRODUCTION INFRASTRUCTURE',
      sectionTitle: 'Ops Console & Cloud Fleet',
      sectionDesc:
        'Self-hosted hybrid infrastructure I operate daily: a 24/7 Oracle Cloud ARM64 host bridged to a 6-node Tailscale mesh, 6 cloud VMs/microVMs, and 17 automated monitoring cronjobs.',
      consoleHost: 'muxoracle@oci-arm64 · 140.245.50.98',
      consoleSummary: '24 vCPU/OCPU · 72 GB RAM · 10 Daemons · 6 Mesh Nodes · 17 Cronjobs',
      tabs: {
        fleet: 'Cloud Fleet (6)',
        services: 'Systemd (10)',
        mesh: 'Tailscale Mesh (6)',
        gateway: '9Router Gateway',
      },
      headers: {
        node: 'Node / Provider',
        spec: 'Specs & OS',
        role: 'Workload & Purpose',
        status: 'Status',
        service: 'Systemd Unit',
        desc: 'Purpose',
        bind: 'Port / Bind',
        host: 'Hostname',
        hardware: 'Hardware & OS',
      },
      cronSummary: 'Automation: 17 cronjobs · health checks 09:00 & 21:00 · security audit 07:00 WITA',
      aiGatewayTitle: '9Router — Self-Hosted Multi-Provider AI Gateway',
      aiGatewayDesc: '22 active connections · 7 provider families · 5 fallback combos (:20128)',
    },
    experience: {
      sectionPre: '03 / BACKGROUND & STACK',
      sectionTitle: 'Experience & Tech Stack',
      stackTitle: 'Core Stack',
      educationTitle: 'Education',
      school: 'Manado State Polytechnic',
      schoolDetail: 'Politeknik Negeri Manado · North Sulawesi',
      cvPrompt: 'Print-ready ATS resume:',
      downloadFullCv: 'Download CV (PDF)',
    },
    contact: {
      sectionPre: '04 / CONTACT',
      title: 'Available for remote engineering & AI systems work.',
      description:
        'Open to remote roles, AI agent integrations (WhatsApp, Discord, Telegram), Web/PWA builds, and self-hosted Linux/cloud architecture.',
      chatWa: 'WhatsApp (+62 897-9360-724)',
      downloadCv: 'Download CV (PDF)',
      copyEmail: 'Copy marcel.mux@gmail.com',
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
      id: 'Client PWA mobile-first open-source untuk Nous Research Hermes Agent. Menyajikan token streaming real-time via WebSocket, thought-process accordion interaktif, isolasi profil, reverse proxy Node.js tanpa dependensi (server.mjs) dengan kompresi Brotli/Gzip, audio cues, serta konfigurasi Docker Compose.',
      en: 'Open-source mobile-first PWA client for Nous Research Hermes Agent. Streams tokens in real time over WebSockets with an interactive thought-process accordion, isolated profiles, a zero-dependency Node.js reverse proxy (server.mjs) with Brotli/Gzip compression, audio cues, and Docker Compose support.',
    },
    chips: ['React Native / Expo Web', 'TypeScript', 'Tailwind CSS', 'Node.js Proxy', 'WebSockets', 'Docker'],
    image: '/projects/hermes-cockpit-chat-dark.png',
    imageSecondary: '/projects/hermes-cockpit-settings-dark.png',
    mediaLayout: 'portrait-pair',
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
      id: 'Gateway Discord berbasis Python & systemd untuk mengendalikan Google Antigravity CLI (agy) langsung dari HP maupun desktop. Mendukung sesi persisten per channel, multi-server @mention gating + backfill pesan terlewat, konteks lintas-channel, pencarian histori SQLite FTS5, live streaming dengan pemecah blok kode otomatis, dan kontrol model/kuota.',
      en: 'Python & systemd Discord bridge that runs Google Antigravity CLI (agy) remotely from phone or desktop. Supports persistent per-channel sessions, multi-server @mention gating with missed-message backfill, cross-channel #mention context, SQLite FTS5 history search, live code-safe message streaming, and interactive model/quota switching.',
    },
    chips: ['Python 3', 'discord.py', 'systemd', 'SQLite FTS5', 'Multi-Server Gating', 'Live Streaming'],
    image: '/projects/antigravity-gateway-arch.png',
    imageSecondary: '/projects/antigravity-gateway-cli.png',
    mediaLayout: 'stack',
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
      id: 'Mesin bot multi-agen otonom (Sipuki & Cobra) di atas Baileys WebSocket & Hermes Gateway. Terhubung ke 9Router LLM Gateway self-hosted dengan pipeline transkripsi audio/TTS, analisis gambar (Vision), routing multi-persona, dan pencarian web paralel tanpa langganan SaaS pihak ketiga.',
      en: 'Autonomous multi-agent bot engine (Sipuki & Cobra) built on Baileys WebSocket & Hermes Gateway. Connects directly to a self-hosted 9Router LLM Gateway with audio transcription/TTS pipelines, Vision analysis, multi-persona routing, and parallel web search with zero SaaS fees.',
    },
    chips: ['Node.js', 'Baileys WS', 'Hermes Gateway', '9Router / Gemini', 'systemd Daemons', 'Parallel Search'],
    image: '/projects/whatsapp-cobra.jpg',
    imageSecondary: '/projects/telegram-agents.jpg',
    mediaLayout: 'portrait-pair',
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
      id: 'Daemon Python & systemd yang memantau kesehatan sesi OAuth Antigravity di dalam 9Router. Mendeteksi token kadaluarsa lewat SQLite/API probe, memulihkan sesi macet otomatis, serta dilengkapi proxy bridge lokal anti-WAF (agentrouter-proxy & gemini-web2api).',
      en: 'Python & systemd watchdog monitoring Antigravity OAuth health inside 9Router. Detects expired tokens via SQLite/API probes, auto-recovers stuck sessions, and pairs with local anti-WAF bridge proxies (agentrouter-proxy & gemini-web2api).',
    },
    chips: ['Python 3', 'Node.js Proxy', 'OAuth Lifecycle', 'systemd Watchdog', '9Router API', 'SQLite Probes'],
    image: '/projects/system-architecture.png',
    imageSecondary: '/projects/vps-infra-map.png',
    mediaLayout: 'stack',
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
      id: 'FINANCIAL TRACKER & ANALYTICS',
      en: 'FINANCIAL TRACKER & ANALYTICS',
    },
    title: {
      id: 'FinPulse — Personal Financial Tracker & Analytics Platform',
      en: 'FinPulse — Personal Financial Tracker & Analytics Platform',
    },
    desc: {
      id: 'Aplikasi pencatat Net Worth, saldo multi-rekening, serta pelacakan limit kredit dan cicilan secara real-time. Dilengkapi chatbot tanya-jawab keuangan, grafik interaktif, dan notifikasi otomatis ke bot Telegram.',
      en: 'Net worth tracker managing multi-account balances, credit utilization, and installment schedules in real time. Includes an AI financial Q&A chat, interactive charts, and automated Telegram alert webhooks.',
    },
    chips: ['Next.js 14', 'TypeScript', 'Prisma ORM', 'PostgreSQL', 'Tailwind CSS', 'Vercel'],
    image: '/projects/finpulse-charts.jpg',
    imageSecondary: '/projects/finpulse.jpg',
    mediaLayout: 'portrait-pair',
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
      id: 'MULTI-NODE CLOUD MESH & DEVOPS',
      en: 'MULTI-NODE CLOUD MESH & DEVOPS',
    },
    title: {
      id: 'Distributed 6-Node Zero-Trust Mesh & Self-Hosted AI Gateway Fleet',
      en: 'Distributed 6-Node Zero-Trust Mesh & Self-Hosted AI Gateway Fleet',
    },
    desc: {
      id: 'Arsitektur hybrid di atas Oracle Cloud Ampere A1 (4 OCPU / 24 GB RAM ARM64 / 200 GB NVMe), laptop edge (CachyOS & EndeavourOS), Android/Termux, serta cloud sandboxes (Cue, InstaBox, Freestyle, Simular). Tersambung lewat Tailscale Zero-Trust mesh dengan Fail2ban & SSH hardening.',
      en: 'Hybrid fleet anchored on Oracle Cloud Ampere A1 (4 OCPU / 24 GB RAM ARM64 / 200 GB NVMe), edge laptops (CachyOS & EndeavourOS), Android/Termux, and cloud sandboxes (Cue, InstaBox, Freestyle, Simular) over a Tailscale Zero-Trust mesh with Fail2ban & hardened SSH.',
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
    role: { id: 'Core Host (24/7 Production)', en: 'Core Host (24/7 Production)' },
    status: 'online',
  },
  {
    host: 'muxcue',
    spec: 'Manus Cloud VM · 8 vCPU / 24 GB x86_64',
    role: { id: 'Heavy Compute & Build Sandbox', en: 'Heavy Compute & Build Sandbox' },
    status: 'online',
  },
  {
    host: 'cachyos-ltx13g1',
    spec: 'ThinkPad X13 Gen 1 AMD · CachyOS',
    role: { id: 'Daily Driver Laptop', en: 'Daily Driver Laptop' },
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
      id: 'Host produksi 24/7: 9Router, Hermes Gateway, Bot WA Sipuki/Cobra, Cockpit PWA, 17 cronjobs.',
      en: '24/7 production host: 9Router, Hermes Gateway, Sipuki/Cobra WA bots, Cockpit PWA, 17 cronjobs.',
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
      id: 'Komputasi berat x86_64, Next.js builds, DeepSeek harness, keepalive watchdog aktif.',
      en: 'Heavy x86_64 compute, Next.js builds, DeepSeek harness, active keepalive watchdog.',
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
      id: 'Otomasi headless browser cepat & web scraping JS berat di lingkungan terisolasi.',
      en: 'Fast headless browser automation & dynamic JS scraping in an isolated MicroVM.',
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
      id: 'Disposable sandbox untuk uji coba kode & build runner on-demand via direct CLI.',
      en: 'Disposable testing sandbox & on-demand build runner over direct CLI.',
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
      id: 'Otomasi GUI desktop Linux & pengujian agen computer-use via MCP + Live View.',
      en: 'Linux desktop GUI automation & computer-use agent runs over MCP + Live View.',
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
      id: 'Otomasi aplikasi native Windows (.exe & desktop UI) untuk workflow lintas OS.',
      en: 'Native Windows app automation (.exe & desktop UI) for cross-OS workflows.',
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
      id: 'Membangun dan mengoperasikan sistem agen AI otonom, aplikasi Web/PWA, serta server Linux self-hosted secara end-to-end hingga produksi 24/7.',
      en: 'Building and operating autonomous AI agent systems, Web/PWA applications, and self-hosted Linux servers end-to-end in 24/7 production.',
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
      id: 'Menjalankan operasional kafe seorang diri setiap hari — kontrol stok, racik minuman, quality check, dan layanan pelanggan langsung. Terbiasa kerja di bawah tekanan dan pegang tanggung jawab penuh.',
      en: 'Ran daily cafe operations solo — inventory control, beverage prep, quality checks, and direct customer service. Built steady execution under rush hours and full accountability.',
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
      'WebSocket Token Streaming',
      'Vision & Audio/TTS Pipelines',
    ],
  },
  {
    area: { id: 'Web & Mobile PWA', en: 'Web & Mobile PWA' },
    items: [
      'Next.js App Router & React',
      'React Native / Expo Web',
      'TypeScript & Tailwind CSS',
      'Prisma, PostgreSQL & SQLite FTS5',
      'Zero-Dep Node.js Reverse Proxy',
    ],
  },
  {
    area: { id: 'Linux & Cloud', en: 'Linux & Cloud' },
    items: [
      'EndeavourOS / CachyOS / Ubuntu',
      'Oracle Cloud ARM64 (4 OCPU / 24GB)',
      '6-Node Tailscale Mesh',
      '10 systemd Services + Watchdogs',
      'Fail2ban, SSH Hardening & 17 Cronjobs',
    ],
  },
];
