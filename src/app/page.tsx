'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Sun,
  Moon,
  ArrowUpRight,
  Terminal,
  Cpu,
  MessageSquare,
  Code2,
  Check,
  Download,
  AtSign,
  Globe,
  Mail,
  X,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {
  translations,
  projectItems,
  liveServices,
  meshNodes,
  cloudFleetNodes,
  experienceItems,
  stackRows,
  type Lang,
  type TabKey,
  type InfraTabKey,
  type ProjectItem,
} from '../data/translations';

type Scheme = 'dark' | 'light';

interface LightboxState {
  slides: { src: string; alt: string }[];
  index: number;
}

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
  const [lang, setLang] = useState<Lang>('id');
  const [activeTab, setActiveTab] = useState<TabKey>('all');
  const [infraTab, setInfraTab] = useState<InfraTabKey>('fleet');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('projects');
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const dialogContentRef = useRef<HTMLDivElement | null>(null);
  const pressedOutsideRef = useRef(false);

  const syncFromPreference = useCallback(() => {
    const override = getStoredOverride();
    const resolved = override ?? getSystemScheme();
    setResolvedTheme(resolved);
    applySchemeToDom(override, resolved);
  }, []);

  useEffect(() => {
    syncFromPreference();

    try {
      const savedLang = localStorage.getItem('portfolio-lang');
      if (savedLang === 'id' || savedLang === 'en') {
        setLang(savedLang);
      }
    } catch {}

    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handleMediaChange = () => {
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
      if (e.key === 'portfolio-lang') {
        const val = e.newValue;
        if (val === 'id' || val === 'en') setLang(val);
      }
    };

    const sectionIds = ['projects', 'infra', 'background', 'contact'];
    const handleScroll = () => {
      const probe = window.scrollY + window.innerHeight * 0.35;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= probe) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };
    handleScroll();

    mq.addEventListener('change', handleMediaChange);
    window.addEventListener('storage', handleStorage);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      mq.removeEventListener('change', handleMediaChange);
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [syncFromPreference]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (lightbox) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else if (dialog.open) {
      dialog.close();
    }
  }, [lightbox]);

  const isOutsideDialogContent = (e: React.PointerEvent<HTMLDialogElement>): boolean => {
    const content = dialogContentRef.current;
    if (!content) return true;
    const r = content.getBoundingClientRect();
    return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
  };

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
    } catch {}

    setResolvedTheme(target);
    applySchemeToDom(nextOverride, target);
  };

  const toggleLang = () => {
    const next: Lang = lang === 'id' ? 'en' : 'id';
    setLang(next);
    try {
      localStorage.setItem('portfolio-lang', next);
    } catch {}
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('marcelturangan2@gmail.com');
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const openProjectLightbox = (project: ProjectItem) => {
    setLightbox({
      slides: [
        { src: project.image, alt: project.title[lang] },
        { src: project.imageSecondary, alt: `${project.title[lang]} Detail` },
      ],
      index: 0,
    });
  };

  const openSingleLightbox = (src: string, alt: string) => {
    setLightbox({ slides: [{ src, alt }], index: 0 });
  };

  const t = translations[lang];

  const filteredProjects =
    activeTab === 'all' ? projectItems : projectItems.filter((p) => p.categories.includes(activeTab));

  const cardProjects = filteredProjects.slice(0, 3);
  const rowProjects = filteredProjects.slice(3);

  const btnPrimaryClass =
    'inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-lg text-[15px] font-medium bg-[#0052cc] text-white hover:bg-[#0044aa] dark:bg-[#0066ff] dark:hover:bg-[#2585ff] transition-[transform,background-color] duration-150 hover:-translate-y-px active:translate-y-px active:scale-[0.985]';

  const btnSecondaryClass =
    'inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-lg text-[15px] font-medium bg-[#f3f4f6] dark:bg-[#14161a] border border-black/15 dark:border-white/15 text-[#111214] dark:text-[#f3f4f6] hover:border-black/35 dark:hover:border-white/35 hover:bg-[#e5e7eb] dark:hover:bg-[#1b1e24] transition-[transform,background-color,border-color] duration-150 hover:-translate-y-px active:translate-y-px active:scale-[0.985]';

  const navLinks = [
    { id: 'projects', href: '#projects', label: t.nav.projects },
    { id: 'infra', href: '#infra', label: t.nav.infra },
    { id: 'background', href: '#background', label: t.nav.experience },
    { id: 'contact', href: '#contact', label: t.nav.contact },
  ];

  const activeSlide = lightbox ? lightbox.slides[lightbox.index] : null;

  return (
    <>
      {/* Fixed Solid Opaque Header */}
      <header className="nav fixed top-0 inset-x-0 z-40 h-[var(--nav)] bg-white dark:bg-[#08090a] border-b border-black/12 dark:border-white/12">
        <div className="wrap h-full flex items-center justify-between gap-3 relative">
          <a
            href="#top"
            className="skip-link sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-4 focus:z-[100] focus:px-4 focus:py-2.5 focus:rounded-lg focus:bg-[#0052cc] focus:text-white focus:text-sm focus:font-medium focus:min-h-[44px] focus:inline-flex focus:items-center"
          >
            {t.hero.skipToContent}
          </a>

          <a
            href="#top"
            className="nav__logo inline-flex items-center gap-2.5 min-h-[44px] shrink-0 font-display font-semibold text-[15px] sm:text-[16px] tracking-tight text-[#111214] dark:text-[#f3f4f6] whitespace-nowrap"
          >
            <img
              src="/logo.png"
              alt="MT"
              className="w-10 h-7 rounded object-contain border border-black/15 dark:border-white/15 bg-black shrink-0"
            />
            <span className="sm:hidden">{t.nav.brandShort}</span>
            <span className="hidden sm:inline">{t.nav.brandFull}</span>
          </a>

          <nav aria-label="Primary" className="hidden md:flex items-center gap-6 font-sans">
            {navLinks.map((item) => {
              const isCurrent = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  aria-current={isCurrent ? 'location' : undefined}
                  className={`min-h-[44px] inline-flex items-center text-[15px] font-medium transition-colors underline-offset-[6px] whitespace-nowrap ${
                    isCurrent
                      ? 'text-[#0052cc] dark:text-[#60a5fa] underline decoration-2'
                      : 'text-[#272a30] dark:text-[#d1d5db] hover:text-[#111214] dark:hover:text-white hover:underline'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 shrink-0 font-sans">
            <button
              type="button"
              onClick={toggleLang}
              aria-label={t.nav.switchLang}
              className="min-h-[44px] px-3 rounded-md bg-[#f3f4f6] dark:bg-[#14161a] border border-black/15 dark:border-white/15 text-[14px] font-medium text-[#111214] dark:text-[#f3f4f6] hover:border-black/35 dark:hover:border-white/35 transition-[transform,border-color] duration-150 active:scale-[0.985] inline-flex items-center gap-1.5"
            >
              <Globe size={14} aria-hidden="true" />
              <span>{lang === 'id' ? 'EN' : 'ID'}</span>
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label={resolvedTheme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              className="min-h-[44px] min-w-[44px] p-2 rounded-md bg-[#f3f4f6] dark:bg-[#14161a] border border-black/15 dark:border-white/15 text-[#111214] dark:text-[#f3f4f6] hover:border-black/35 dark:hover:border-white/35 transition-[transform,border-color] duration-150 active:scale-[0.985] inline-flex items-center justify-center"
            >
              {resolvedTheme === 'dark' ? (
                <Sun size={16} aria-hidden="true" />
              ) : (
                <Moon size={16} aria-hidden="true" />
              )}
            </button>

            <a
              href="https://wa.me/628979360724?text=Halo%20Marcelino,%20saya%20tertarik%20dengan%20portofolio%20Anda"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center justify-center min-h-[44px] text-[15px] font-medium px-4 rounded-md bg-[#0052cc] text-white hover:bg-[#0044aa] dark:bg-[#0066ff] dark:hover:bg-[#2585ff] transition-[transform,background-color] duration-150 hover:-translate-y-px active:translate-y-px active:scale-[0.985]"
            >
              {t.nav.hireMe}
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main id="top">
        {/* Screen 0: Hero (SR-1 full first viewport, .hero-text + .hero-facts) */}
        <section className="hero-section">
          <div className="wrap h-full flex flex-col justify-between gap-8">
            <div className="hero-text grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-6">
                <div className="text-[13px] font-mono text-[#272a30] dark:text-[#d1d5db] mb-4">
                  {t.hero.badge}
                </div>

                <h1 className="font-display text-[38px] sm:text-[46px] lg:text-[52px] font-semibold tracking-[-0.03em] leading-[1.08] mb-4 text-[#111214] dark:text-[#f3f4f6]">
                  {t.hero.titlePart1}
                  <span className="text-[#4a4e57] dark:text-[#9ca3af]">{t.hero.titlePart2}</span>
                </h1>

                <p className="text-base sm:text-[17px] text-[#272a30] dark:text-[#d1d5db] leading-relaxed text-pretty max-w-xl mb-6">
                  {t.hero.description}
                </p>

                {/* Max 2 Primary Hero Buttons */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <a
                    href="/CV_Marcelino_M_Turangan.pdf"
                    download="CV_Marcelino_M_Turangan.pdf"
                    className={btnPrimaryClass}
                  >
                    <Download size={16} aria-hidden="true" />
                    {t.hero.downloadCv}
                  </a>
                  <a
                    href="https://wa.me/628979360724?text=Halo%20Marcelino,%20saya%20tertarik%20dengan%20portofolio%20Anda"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={btnSecondaryClass}
                  >
                    <MessageSquare size={16} aria-hidden="true" />
                    {t.hero.whatsapp}
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                </div>

                {/* Inline Secondary Profile Actions */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[14px] font-mono text-[#272a30] dark:text-[#d1d5db]">
                  <button
                    type="button"
                    onClick={copyEmail}
                    aria-label={t.contact.copyEmail}
                    className="inline-flex items-center gap-1.5 min-h-[44px] hover:text-[#0052cc] dark:hover:text-[#60a5fa] hover:underline underline-offset-4 transition-colors"
                  >
                    {copiedEmail ? (
                      <Check size={14} className="text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                    ) : (
                      <Mail size={14} aria-hidden="true" />
                    )}
                    {copiedEmail ? t.hero.emailCopied : t.hero.copyEmail}
                  </button>
                  <a
                    href="https://github.com/Marcel-mux"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 min-h-[44px] hover:text-[#0052cc] dark:hover:text-[#60a5fa] hover:underline underline-offset-4 transition-colors"
                  >
                    <Code2 size={14} aria-hidden="true" />
                    {t.hero.github}
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                  <a
                    href="https://www.threads.net/@marcelt_0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 min-h-[44px] hover:text-[#0052cc] dark:hover:text-[#60a5fa] hover:underline underline-offset-4 transition-colors"
                  >
                    <AtSign size={14} aria-hidden="true" />
                    {t.hero.threads}
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                </div>
              </div>

              {/* Right Column Portrait Visual (top-aligned on k=6 split line) */}
              <div className="lg:col-span-6 w-full">
                <div className="relative aspect-[4/3] w-full max-h-[460px] rounded-xl overflow-hidden border border-black/15 dark:border-white/15 bg-[#f3f4f6] dark:bg-[#0f1115]">
                  <img
                    src="/projects/profile.jpg"
                    alt={t.hero.photoAlt}
                    className="w-full h-full object-cover object-[center_20%]"
                  />
                </div>
              </div>
            </div>

            {/* Docked 4-column Metadata Facts Row (edge-to-edge on .wrap) */}
            <dl className="hero-facts grid grid-cols-2 lg:grid-cols-4 gap-6 pt-5 border-t border-black/12 dark:border-white/12">
              {t.hero.facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-[13px] font-mono text-[#4a4e57] dark:text-[#9ca3af] mb-1">
                    {fact.label}
                  </dt>
                  <dd className="text-[15px] font-medium text-[#111214] dark:text-[#f3f4f6] tabular-nums m-0">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Screen 1-2: 01 / Systems & Deployments (--h: 2 screens: 3 cards top + 3 k=6 horizontal rows below) */}
        <section
          id="projects"
          className="screen-section bg-[#f6f7f9] dark:bg-[#0c0d10]"
          style={{ '--h': 2 } as React.CSSProperties}
        >
          <div className="wrap">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <span className="text-[13px] font-mono uppercase tracking-wider text-[#0052cc] dark:text-[#60a5fa] block mb-1.5">
                  {t.projects.sectionPre}
                </span>
                <h2 className="font-display text-[28px] lg:text-[34px] font-semibold tracking-[-0.025em] text-[#111214] dark:text-[#f3f4f6]">
                  {t.projects.sectionTitle}
                </h2>
              </div>

              {/* Filter Buttons (>=44px tap targets) */}
              <div
                role="group"
                aria-label={t.projects.filterAria}
                className="flex flex-wrap p-1 rounded-lg bg-white dark:bg-[#14161a] border border-black/12 dark:border-white/12 gap-1 self-start sm:self-auto"
              >
                {(
                  [
                    { key: 'all', label: t.projects.tabs.all },
                    { key: 'ai', label: t.projects.tabs.ai },
                    { key: 'web', label: t.projects.tabs.web },
                    { key: 'linux', label: t.projects.tabs.linux },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    aria-pressed={activeTab === tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`min-h-[44px] px-3.5 rounded-md transition-colors text-[13px] font-mono font-medium ${
                      activeTab === tab.key
                        ? 'bg-[#0052cc] dark:bg-[#0066ff] text-white'
                        : 'text-[#272a30] dark:text-[#d1d5db] hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Row 1: Featured 3-Card Grid (max 3 uniform panel cards) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {cardProjects.map((project) => (
                <article
                  key={project.id}
                  className="rounded-xl p-5 bg-white dark:bg-[#111318] border border-black/12 dark:border-white/12 hover:border-black/30 dark:hover:border-white/30 transition-[border-color,transform] duration-150 hover:-translate-y-0.5 flex flex-col justify-between gap-4"
                >
                  <div>
                    <button
                      type="button"
                      onClick={() => openProjectLightbox(project)}
                      aria-label={`Zoom ${project.title[lang]}`}
                      className="relative aspect-[16/10] w-full rounded-lg overflow-hidden border border-black/10 dark:border-white/10 bg-[#f3f4f6] dark:bg-[#08090a] mb-4 cursor-zoom-in group/img block"
                    >
                      <img
                        src={project.image}
                        alt={project.title[lang]}
                        className="w-full h-full object-contain p-1 group-hover/img:scale-[1.03] transition-transform duration-300"
                      />
                      <span className="absolute bottom-2 right-2 p-1.5 rounded bg-black/75 text-white">
                        <ZoomIn size={13} aria-hidden="true" />
                      </span>
                    </button>

                    <div className="text-[13px] font-mono tracking-wide text-[#0052cc] dark:text-[#60a5fa] uppercase mb-1">
                      {project.tag[lang]}
                    </div>

                    <h3 className="font-display text-[20px] font-semibold tracking-tight leading-snug mb-2 text-[#111214] dark:text-[#f3f4f6]">
                      {project.title[lang]}
                    </h3>

                    <p className="text-base text-[#272a30] dark:text-[#d1d5db] leading-relaxed">
                      {project.desc[lang]}
                    </p>
                  </div>

                  <div>
                    <div className="text-[13px] font-mono text-[#111214] dark:text-[#e5e7eb] mb-4">
                      {project.metrics[lang]}
                    </div>

                    <div className="flex flex-wrap gap-2.5">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={btnPrimaryClass}
                      >
                        <Code2 size={15} aria-hidden="true" />
                        {t.projects.viewCode}
                        <ArrowUpRight size={14} aria-hidden="true" />
                      </a>
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={btnSecondaryClass}
                        >
                          {t.projects.livePreview}
                          <ArrowUpRight size={14} aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Row 2: Secondary Builds as k=6 Split Rows (avoiding 4+ identical cards & matching page split line) */}
            {rowProjects.length > 0 && (
              <div className="space-y-8">
                {rowProjects.map((project) => (
                  <div
                    key={project.id}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pt-6 border-t border-black/10 dark:border-white/10"
                  >
                    <div className="lg:col-span-6">
                      <div className="text-[13px] font-mono tracking-wide text-[#0052cc] dark:text-[#60a5fa] uppercase mb-1">
                        {project.tag[lang]}
                      </div>
                      <h3 className="font-display text-[20px] font-semibold tracking-tight leading-snug mb-2 text-[#111214] dark:text-[#f3f4f6]">
                        {project.title[lang]}
                      </h3>
                      <p className="text-base text-[#272a30] dark:text-[#d1d5db] leading-relaxed mb-3">
                        {project.desc[lang]}
                      </p>
                      <div className="text-[13px] font-mono text-[#4a4e57] dark:text-[#9ca3af] mb-4">
                        {project.metrics[lang]} · {project.chips.join(' · ')}
                      </div>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={btnSecondaryClass}
                      >
                        <Code2 size={15} aria-hidden="true" />
                        {t.projects.viewCode}
                        <ArrowUpRight size={14} aria-hidden="true" />
                      </a>
                    </div>

                    <div className="lg:col-span-6 w-full">
                      <button
                        type="button"
                        onClick={() => openProjectLightbox(project)}
                        aria-label={`Zoom ${project.title[lang]}`}
                        className="relative h-[245px] w-full rounded-xl overflow-hidden border border-black/12 dark:border-white/12 bg-white dark:bg-[#111318] cursor-zoom-in group/img block"
                      >
                        <img
                          src={project.image}
                          alt={project.title[lang]}
                          className="w-full h-full object-contain p-2 group-hover/img:scale-[1.02] transition-transform duration-300"
                        />
                        <span className="absolute bottom-2.5 right-2.5 p-1.5 rounded bg-black/75 text-white">
                          <ZoomIn size={14} aria-hidden="true" />
                        </span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Screen 3: 02 / Ops Console & Armada Cloud (k=6 split) */}
        <section
          id="infra"
          className="screen-section bg-white dark:bg-[#08090a]"
          style={{ '--h': 1 } as React.CSSProperties}
        >
          <div className="wrap">
            <div className="mb-8">
              <span className="text-[13px] font-mono uppercase tracking-wider text-[#0052cc] dark:text-[#60a5fa] block mb-1.5">
                {t.infra.sectionPre}
              </span>
              <h2 className="font-display text-[28px] lg:text-[34px] font-semibold tracking-[-0.025em] mb-2 text-[#111214] dark:text-[#f3f4f6]">
                {t.infra.sectionTitle}
              </h2>
              <p className="text-base text-[#272a30] dark:text-[#d1d5db] max-w-2xl leading-relaxed">
                {t.infra.sectionDesc}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left 6 cols: Interactive Ops Console */}
              <div className="lg:col-span-6 rounded-xl border border-black/15 dark:border-white/15 bg-[#f6f7f9] dark:bg-[#0e1014] overflow-hidden">
                <div className="px-4 py-3 border-b border-black/10 dark:border-white/10 flex flex-wrap items-center justify-between gap-2">
                  <div className="text-[13px] font-mono font-medium text-[#111214] dark:text-[#f3f4f6]">
                    {t.infra.consoleHost}
                  </div>
                  <div className="text-[13px] font-mono text-[#272a30] dark:text-[#d1d5db] tabular-nums">
                    {t.infra.consoleSummary}
                  </div>
                </div>

                <div
                  role="tablist"
                  aria-label="Infrastructure views"
                  className="flex flex-wrap border-b border-black/10 dark:border-white/10 bg-white dark:bg-[#08090a] px-2 gap-1"
                >
                  {(
                    [
                      { key: 'fleet', label: t.infra.tabs.fleet },
                      { key: 'services', label: t.infra.tabs.services },
                      { key: 'mesh', label: t.infra.tabs.mesh },
                      { key: 'gateway', label: t.infra.tabs.gateway },
                    ] as const
                  ).map((tab) => {
                    const active = infraTab === tab.key;
                    return (
                      <button
                        key={tab.key}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => setInfraTab(tab.key)}
                        className={`min-h-[44px] px-3 text-[13px] font-mono whitespace-nowrap border-b-2 transition-colors ${
                          active
                            ? 'border-[#0052cc] dark:border-[#60a5fa] text-[#111214] dark:text-white font-semibold'
                            : 'border-transparent text-[#4a4e57] dark:text-[#9ca3af] hover:text-[#111214] dark:hover:text-white'
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                <div role="tabpanel" className="divide-y divide-black/10 dark:divide-white/10">
                  {infraTab === 'fleet' &&
                    cloudFleetNodes.map((node) => (
                      <div key={node.id} className="px-4 py-2.5 flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="text-[15px] font-medium text-[#111214] dark:text-[#f3f4f6]">
                            {node.name}
                          </div>
                          <div className="text-[13px] font-mono text-[#4a4e57] dark:text-[#9ca3af]">
                            {node.spec} · {node.os}
                          </div>
                        </div>
                        <span className="text-[13px] font-mono px-2 py-0.5 rounded bg-white dark:bg-[#1a1d24] border border-black/12 dark:border-white/12 text-[#111214] dark:text-[#e5e7eb] shrink-0">
                          {node.statusLabel[lang]}
                        </span>
                      </div>
                    ))}

                  {infraTab === 'services' &&
                    liveServices.map((s) => (
                      <div key={s.name} className="px-4 py-2 flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <div className="font-mono text-[13px] font-medium text-[#111214] dark:text-[#f3f4f6]">
                            {s.name}
                          </div>
                          <div className="text-[13px] text-[#4a4e57] dark:text-[#9ca3af]">
                            {s.desc[lang]}
                          </div>
                        </div>
                        <span className="font-mono text-[13px] px-2 py-0.5 rounded bg-white dark:bg-[#1a1d24] border border-black/12 dark:border-white/12 text-[#111214] dark:text-[#e5e7eb] tabular-nums shrink-0">
                          {s.port}
                        </span>
                      </div>
                    ))}

                  {infraTab === 'mesh' && (
                    <>
                      {meshNodes.map((n) => (
                        <div key={n.host} className="px-4 py-2.5 flex items-center justify-between gap-3">
                          <div className="min-w-0">
                            <div className="font-mono text-[14px] font-medium text-[#111214] dark:text-[#f3f4f6]">
                              {n.host}
                            </div>
                            <div className="text-[13px] font-mono text-[#4a4e57] dark:text-[#9ca3af]">
                              {n.spec}
                            </div>
                          </div>
                          <span className="text-[13px] font-mono text-[#272a30] dark:text-[#d1d5db] shrink-0">
                            {n.role[lang]}
                          </span>
                        </div>
                      ))}
                      <div className="px-4 py-2.5 flex items-center gap-2 text-[13px] font-mono text-[#272a30] dark:text-[#d1d5db]">
                        <Terminal size={14} aria-hidden="true" />
                        <span>{t.infra.cronSummary}</span>
                      </div>
                    </>
                  )}

                  {infraTab === 'gateway' && (
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Cpu size={16} className="text-[#0052cc] dark:text-[#60a5fa]" aria-hidden="true" />
                        <h3 className="font-display text-[20px] font-semibold text-[#111214] dark:text-[#f3f4f6]">
                          {t.infra.aiGatewayTitle}
                        </h3>
                      </div>
                      <p className="text-base text-[#272a30] dark:text-[#d1d5db] mb-4">
                        {t.infra.aiGatewayDesc}
                      </p>
                      <div className="text-[13px] font-mono text-[#272a30] dark:text-[#d1d5db]">
                        Antigravity OAuth ×8 · OpenAI-Compatible ×7 · CodeBuddy ×2 · Qoder ×2 · Cloudflare AI · OpenRouter
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right 6 cols: Clickable Infrastructure Topology Diagram */}
              <div className="lg:col-span-6 w-full">
                <button
                  type="button"
                  onClick={() => openSingleLightbox('/projects/vps-infra-map.png', t.infra.mapAlt)}
                  aria-label={`Zoom ${t.infra.mapCaption}`}
                  className="relative aspect-[4/3] w-full rounded-xl overflow-hidden border border-black/15 dark:border-white/15 bg-[#f6f7f9] dark:bg-[#0e1014] cursor-zoom-in group/img block"
                >
                  <img
                    src="/projects/vps-infra-map.png"
                    alt={t.infra.mapAlt}
                    className="w-full h-full object-contain p-2 group-hover/img:scale-[1.02] transition-transform duration-300"
                  />
                  <span className="absolute bottom-3 right-3 p-2 rounded bg-black/75 text-white">
                    <ZoomIn size={15} aria-hidden="true" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Screen 4: 03 / Experience & Stack Matrix (k=6 split, clean typography without off-grid flex chips) */}
        <section
          id="background"
          className="screen-section bg-[#f6f7f9] dark:bg-[#0c0d10]"
          style={{ '--h': 1 } as React.CSSProperties}
        >
          <div className="wrap">
            <div className="mb-8">
              <span className="text-[13px] font-mono uppercase tracking-wider text-[#0052cc] dark:text-[#60a5fa] block mb-1.5">
                {t.experience.sectionPre}
              </span>
              <h2 className="font-display text-[28px] lg:text-[34px] font-semibold tracking-[-0.025em] text-[#111214] dark:text-[#f3f4f6]">
                {t.experience.sectionTitle}
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left 6 cols: Experience, Stack Matrix & Education */}
              <div className="lg:col-span-6 space-y-6">
                <div className="space-y-5">
                  {experienceItems.map((exp) => (
                    <div key={exp.role}>
                      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                        <h3 className="font-display text-[20px] font-semibold tracking-tight text-[#111214] dark:text-[#f3f4f6]">
                          {exp.role}
                        </h3>
                        <span className="text-[13px] font-mono text-[#4a4e57] dark:text-[#9ca3af]">
                          {exp.period[lang]}
                        </span>
                      </div>
                      <div className="text-[13px] font-mono text-[#0052cc] dark:text-[#60a5fa] mb-1.5">
                        {exp.org}
                      </div>
                      <p className="text-base text-[#272a30] dark:text-[#d1d5db] leading-relaxed">
                        {exp.summary[lang]}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Flush-left Stack & Education List */}
                <dl className="space-y-3 pt-2">
                  {stackRows.map((row) => (
                    <div key={row.area.en}>
                      <dt className="text-[13px] font-mono font-semibold text-[#111214] dark:text-[#f3f4f6]">
                        {row.area[lang]}
                      </dt>
                      <dd className="text-[14px] font-mono text-[#272a30] dark:text-[#d1d5db] m-0">
                        {row.line}
                      </dd>
                    </div>
                  ))}
                  <div>
                    <dt className="text-[13px] font-mono font-semibold text-[#111214] dark:text-[#f3f4f6]">
                      {t.experience.school}
                    </dt>
                    <dd className="text-[14px] font-mono text-[#272a30] dark:text-[#d1d5db] m-0">
                      {t.experience.schoolDetail}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Right 6 cols: Real Workstation Setup Visual (>=25% visual coverage) */}
              <div className="lg:col-span-6 w-full">
                <button
                  type="button"
                  onClick={() => openSingleLightbox('/projects/battlestation-setup.jpg', t.experience.setupAlt)}
                  aria-label="Zoom workstation Linux setup"
                  className="relative aspect-[4/3] w-full max-h-[460px] rounded-xl overflow-hidden border border-black/15 dark:border-white/15 bg-white dark:bg-[#111318] cursor-zoom-in group/img block"
                >
                  <img
                    src="/projects/battlestation-setup.jpg"
                    alt={t.experience.setupAlt}
                    className="w-full h-full object-cover group-hover/img:scale-[1.02] transition-transform duration-300"
                  />
                  <span className="absolute bottom-3 right-3 p-2 rounded bg-black/75 text-white">
                    <ZoomIn size={15} aria-hidden="true" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Screen 5: Closing + Footer (unified footer.closing screen per layout-v4) */}
      <footer
        id="contact"
        className="closing screen-section bg-white dark:bg-[#08090a]"
        style={{ '--h': 1 } as React.CSSProperties}
      >
        <div className="wrap h-full flex flex-col justify-between gap-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left 6 cols: Contact Close CTA */}
            <div className="lg:col-span-6">
              <span className="text-[13px] font-mono uppercase tracking-wider text-[#0052cc] dark:text-[#60a5fa] block mb-2">
                {t.contact.sectionPre}
              </span>
              <h2 className="font-display text-[28px] lg:text-[34px] font-semibold tracking-[-0.025em] mb-3 text-[#111214] dark:text-[#f3f4f6]">
                {t.contact.title}
              </h2>
              <p className="text-base text-[#272a30] dark:text-[#d1d5db] leading-relaxed max-w-xl mb-6">
                {t.contact.description}
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href="https://wa.me/628979360724?text=Halo%20Marcelino,%20saya%20tertarik%20bekerjasama%20untuk%20proyek"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={btnPrimaryClass}
                >
                  <MessageSquare size={16} aria-hidden="true" />
                  {t.contact.chatWa}
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>

                <button type="button" onClick={copyEmail} className={btnSecondaryClass}>
                  {copiedEmail ? (
                    <Check size={16} className="text-emerald-600 dark:text-emerald-400 shrink-0" aria-hidden="true" />
                  ) : (
                    <Mail size={16} className="shrink-0" aria-hidden="true" />
                  )}
                  {copiedEmail ? t.contact.emailCopied : t.contact.copyEmail}
                </button>
                <span aria-live="polite" className="sr-only">
                  {copiedEmail ? t.contact.emailAriaCopied : ''}
                </span>

                <a
                  href="/CV_Marcelino_M_Turangan.pdf"
                  download="CV_Marcelino_M_Turangan.pdf"
                  className={btnSecondaryClass}
                >
                  <Download size={16} aria-hidden="true" />
                  {t.contact.downloadCv}
                </a>
              </div>
            </div>

            {/* Right 6 cols: Hermes Preview Visual */}
            <div className="lg:col-span-6 w-full">
              <button
                type="button"
                onClick={() => openSingleLightbox('/projects/hermes-cockpit-preview.png', t.contact.previewAlt)}
                aria-label={`Zoom ${t.contact.previewAlt}`}
                className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-black/15 dark:border-white/15 bg-[#f6f7f9] dark:bg-[#0e1014] cursor-zoom-in group/img block"
              >
                <img
                  src="/projects/hermes-cockpit-preview.png"
                  alt={t.contact.previewAlt}
                  className="w-full h-full object-contain p-2 group-hover/img:scale-[1.02] transition-transform duration-300"
                />
                <span className="absolute bottom-3 right-3 p-2 rounded bg-black/75 text-white">
                  <ZoomIn size={15} aria-hidden="true" />
                </span>
              </button>
            </div>
          </div>

          {/* Footer Directory Row (flush-left copyright, logo inside right links) */}
          <div className="pt-6 border-t border-black/12 dark:border-white/12 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[13px] text-[#4a4e57] dark:text-[#9ca3af] gap-4">
            <p className="font-mono text-[#272a30] dark:text-[#d1d5db] m-0">
              {t.footer.copyright}
            </p>

            <div className="flex flex-wrap items-center gap-5 font-mono">
              <a
                href="https://github.com/Marcel-mux"
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] inline-flex items-center text-[#272a30] dark:text-[#d1d5db] hover:text-[#0052cc] dark:hover:text-[#60a5fa] hover:underline underline-offset-4 transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://www.threads.net/@marcelt_0"
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] inline-flex items-center text-[#272a30] dark:text-[#d1d5db] hover:text-[#0052cc] dark:hover:text-[#60a5fa] hover:underline underline-offset-4 transition-colors"
              >
                Threads
              </a>
              <a
                href="/CV_Marcelino_M_Turangan.pdf"
                download="CV_Marcelino_M_Turangan.pdf"
                className="min-h-[44px] inline-flex items-center text-[#272a30] dark:text-[#d1d5db] hover:text-[#0052cc] dark:hover:text-[#60a5fa] hover:underline underline-offset-4 transition-colors"
              >
                {t.contact.downloadCv}
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Native <dialog> Lightbox Modal with Multi-Slide Switcher */}
      <dialog
        ref={dialogRef}
        aria-label={activeSlide?.alt ?? 'Image preview'}
        onClose={() => setLightbox(null)}
        onPointerDown={(e) => {
          pressedOutsideRef.current = isOutsideDialogContent(e);
        }}
        onPointerUp={(e) => {
          if (pressedOutsideRef.current && isOutsideDialogContent(e)) {
            setLightbox(null);
          }
        }}
        className="bg-transparent p-4 sm:p-8 max-w-none max-h-none w-full h-full m-0 open:flex items-center justify-center"
      >
        {lightbox && activeSlide && (
          <div ref={dialogContentRef} className="relative w-full max-w-5xl h-[85vh] flex items-center justify-center">
            <button
              type="button"
              autoFocus
              onClick={() => setLightbox(null)}
              aria-label="Close image preview"
              className="fixed top-4 right-4 z-[110] min-h-[44px] min-w-[44px] p-2.5 rounded-full bg-black/80 hover:bg-black text-white border border-white/25 inline-flex items-center justify-center"
            >
              <X size={20} aria-hidden="true" />
            </button>

            {lightbox.slides.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setLightbox((prev) =>
                      prev ? { ...prev, index: (prev.index - 1 + prev.slides.length) % prev.slides.length } : null
                    )
                  }
                  aria-label="Previous image"
                  className="fixed left-4 top-1/2 -translate-y-1/2 z-[110] min-h-[44px] min-w-[44px] p-2.5 rounded-full bg-black/80 hover:bg-black text-white border border-white/25 inline-flex items-center justify-center"
                >
                  <ChevronLeft size={20} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setLightbox((prev) =>
                      prev ? { ...prev, index: (prev.index + 1) % prev.slides.length } : null
                    )
                  }
                  aria-label="Next image"
                  className="fixed right-4 top-1/2 -translate-y-1/2 z-[110] min-h-[44px] min-w-[44px] p-2.5 rounded-full bg-black/80 hover:bg-black text-white border border-white/25 inline-flex items-center justify-center"
                >
                  <ChevronRight size={20} aria-hidden="true" />
                </button>
              </>
            )}

            <img
              src={activeSlide.src}
              alt={activeSlide.alt}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        )}
      </dialog>
    </>
  );
}
