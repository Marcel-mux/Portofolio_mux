'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import {
  Sun,
  Moon,
  ArrowUpRight,
  Terminal,
  Cpu,
  MessageSquare,
  Code2,
  Check,
  Copy,
  Download,
  AtSign,
  Globe,
  X,
  ZoomIn,
} from 'lucide-react';
import {
  translations,
  projectItems,
  liveServices,
  meshNodes,
  cloudFleetNodes,
  cronJobs,
  experienceItems,
  stackRows,
  type Lang,
  type TabKey,
  type InfraTabKey,
  type ProjectItem,
} from '../data/translations';

type Scheme = 'dark' | 'light';
type CronFilterKey = 'all' | 'active' | 'agent' | 'paused';
type SectionId = 'projects' | 'infra' | 'background' | 'contact';

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

function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="64"
        height="64"
        rx="14"
        className="fill-[#F4F6FA] dark:fill-[#0E1116]"
      />
      <rect
        x="0.75"
        y="0.75"
        width="62.5"
        height="62.5"
        rx="13.25"
        strokeWidth="1.5"
        className="stroke-black/15 dark:stroke-white/15"
      />
      <path
        d="M11 43V21L21 33L31 21V43"
        strokeWidth="4.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-[#111214] dark:stroke-[#F5F6F8]"
      />
      <path
        d="M31 21H53"
        strokeWidth="4.6"
        strokeLinecap="round"
        className="stroke-[#111214] dark:stroke-[#F5F6F8]"
      />
      <path
        d="M44 21V43"
        strokeWidth="4.6"
        strokeLinecap="round"
        className="stroke-[#111214] dark:stroke-[#F5F6F8]"
      />
      <circle
        cx="31"
        cy="21"
        r="3.6"
        strokeWidth="1.2"
        className="fill-[#0066FF] stroke-[#F4F6FA] dark:fill-[#2585FF] dark:stroke-[#0E1116]"
      />
      <circle
        cx="53"
        cy="21"
        r="3.7"
        className="fill-[#0066FF] dark:fill-[#2585FF]"
      />
    </svg>
  );
}

function ProjectMedia({
  project,
  lang,
  onZoom,
}: {
  project: ProjectItem;
  lang: Lang;
  onZoom: (img: { src: string; alt: string }) => void;
}) {
  const [mediaIdx, setMediaIdx] = useState<0 | 1>(0);

  if (project.mediaLayout === 'portrait-pair') {
    return (
      <div className="w-full lg:w-[376px] shrink-0 grid grid-cols-2 gap-2.5">
        {[
          { src: project.image, alt: project.title[lang] },
          { src: project.imageSecondary, alt: `${project.title[lang]} Detail` },
        ].map((media) => (
          <button
            key={media.src}
            type="button"
            onClick={() => onZoom(media)}
            aria-label={`Zoom ${media.alt}`}
            className="relative aspect-[9/20] w-full rounded-lg overflow-hidden border border-black/15 dark:border-white/15 bg-[#0b0d10] group/img cursor-zoom-in focus:outline-none"
          >
            <Image
              src={media.src}
              alt={media.alt}
              fill
              loading="eager"
              sizes="(max-width: 1024px) 46vw, 184px"
              className="object-contain group-hover/img:scale-[1.03] transition-transform duration-300"
            />
            <span className="absolute bottom-2 right-2 p-1.5 rounded-md bg-black/75 text-white border border-white/15 opacity-85 sm:opacity-0 sm:group-hover/img:opacity-100 transition-opacity">
              <ZoomIn size={13} aria-hidden="true" />
            </span>
          </button>
        ))}
      </div>
    );
  }

  if (project.mediaLayout === 'square-pair') {
    const items = [
      {
        src: project.image,
        alt: project.title[lang],
        label: project.imageLabels?.[0][lang],
      },
      {
        src: project.imageSecondary,
        alt: `${project.title[lang]} Detail`,
        label: project.imageLabels?.[1][lang],
      },
    ];
    return (
      <div className="w-full lg:w-[376px] shrink-0 grid grid-cols-2 gap-2.5">
        {items.map((media) => (
          <button
            key={media.src}
            type="button"
            onClick={() => onZoom({ src: media.src, alt: media.alt })}
            aria-label={`Zoom ${media.alt}`}
            className="relative aspect-square w-full rounded-lg overflow-hidden border border-black/15 dark:border-white/15 bg-[#0b0d10] group/img cursor-zoom-in focus:outline-none"
          >
            <Image
              src={media.src}
              alt={media.alt}
              fill
              sizes="(max-width: 1024px) 46vw, 184px"
              className="object-cover group-hover/img:scale-[1.03] transition-transform duration-300"
            />
            {media.label && (
              <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/75 text-[11px] font-mono text-white/90 border border-white/10">
                {media.label}
              </span>
            )}
            <span className="absolute bottom-2 right-2 p-1.5 rounded-md bg-black/75 text-white border border-white/15 opacity-85 sm:opacity-0 sm:group-hover/img:opacity-100 transition-opacity">
              <ZoomIn size={13} aria-hidden="true" />
            </span>
          </button>
        ))}
      </div>
    );
  }

  const activeSrc = mediaIdx === 0 ? project.image : project.imageSecondary;
  const activeLabel =
    mediaIdx === 0
      ? project.imageLabels?.[0][lang] ?? 'View 1'
      : project.imageLabels?.[1][lang] ?? 'View 2';
  const activeAlt = `${project.title[lang]} — ${activeLabel}`;
  const isPhotoSlide = activeSrc.endsWith('.jpg');

  return (
    <div className="w-full lg:w-[376px] shrink-0 space-y-2">
      <button
        type="button"
        onClick={() => onZoom({ src: activeSrc, alt: activeAlt })}
        aria-label={`Zoom ${activeAlt}`}
        className="relative aspect-[4/3] w-full rounded-lg overflow-hidden border border-black/15 dark:border-white/15 bg-[#0b0d10] group/img cursor-zoom-in block focus:outline-none"
      >
        <Image
          src={activeSrc}
          alt={activeAlt}
          fill
          loading="eager"
          sizes="(max-width: 1024px) 92vw, 376px"
          className={`${
            isPhotoSlide ? 'object-cover object-center' : 'object-contain p-1'
          } group-hover/img:scale-[1.02] transition-transform duration-300`}
        />
        <span className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-black/80 text-white text-[11px] font-mono border border-white/15 opacity-90 sm:opacity-0 sm:group-hover/img:opacity-100 transition-opacity">
          <ZoomIn size={12} aria-hidden="true" />
          <span>Zoom</span>
        </span>
      </button>

      <div
        role="group"
        aria-label={`${project.title[lang]} views`}
        className="grid grid-cols-2 gap-1.5 p-1 rounded-lg bg-black/[0.04] dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.1]"
      >
        {([0, 1] as const).map((idx) => {
          const label =
            idx === 0
              ? project.imageLabels?.[0][lang] ?? '01'
              : project.imageLabels?.[1][lang] ?? '02';
          const selected = mediaIdx === idx;
          return (
            <button
              key={idx}
              type="button"
              aria-pressed={selected}
              onClick={() => setMediaIdx(idx)}
              className={`min-h-[34px] px-2.5 py-1 rounded-md text-[12px] font-mono transition-colors ${
                selected
                  ? 'bg-[#111214] text-white dark:bg-white dark:text-[#08090a] font-medium'
                  : 'text-black/65 dark:text-white/65 hover:text-black dark:hover:text-white'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function Home() {
  const [resolvedTheme, setResolvedTheme] = useState<Scheme>('dark');
  const [lang, setLang] = useState<Lang>('id');
  const [activeTab, setActiveTab] = useState<TabKey>('all');
  const [infraTab, setInfraTab] = useState<InfraTabKey>('fleet');
  const [cronFilter, setCronFilter] = useState<CronFilterKey>('all');
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null);

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

    mq.addEventListener('change', handleMediaChange);
    window.addEventListener('storage', handleStorage);
    return () => {
      mq.removeEventListener('change', handleMediaChange);
      window.removeEventListener('storage', handleStorage);
    };
  }, [syncFromPreference]);

  useEffect(() => {
    const ids: SectionId[] = ['projects', 'infra', 'background', 'contact'];
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => Boolean(el));
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id as SectionId);
        } else if (window.scrollY < 300) {
          setActiveSection(null);
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (lightboxImage) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else if (dialog.open) {
      dialog.close();
    }
  }, [lightboxImage]);

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

  const t = translations[lang];

  const filteredProjects =
    activeTab === 'all' ? projectItems : projectItems.filter((p) => p.categories.includes(activeTab));

  const filteredCrons = cronJobs.filter((job) => {
    if (cronFilter === 'active') return job.status === 'active';
    if (cronFilter === 'paused') return job.status === 'paused';
    if (cronFilter === 'agent') return job.mode === 'agent';
    return true;
  });

  const btnPrimaryClass =
    'inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-lg text-sm font-medium bg-[#0066ff] text-white hover:bg-[#0052cc] dark:hover:bg-[#2585ff] transition-all duration-150 hover:-translate-y-px active:translate-y-px active:scale-[0.985]';

  const btnSecondaryClass =
    'inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-lg text-sm font-medium bg-black/[0.04] dark:bg-white/[0.05] border border-black/[0.12] dark:border-white/[0.14] text-black/85 dark:text-white/90 hover:border-black/30 dark:hover:border-white/30 hover:bg-black/[0.07] dark:hover:bg-white/[0.09] transition-all duration-150 hover:-translate-y-px active:translate-y-px active:scale-[0.985]';

  const navItems: { id: SectionId; href: string; label: string }[] = [
    { id: 'projects', href: '#projects', label: t.nav.projects },
    { id: 'infra', href: '#infra', label: t.nav.infra },
    { id: 'background', href: '#background', label: t.nav.experience },
    { id: 'contact', href: '#contact', label: t.nav.contact },
  ];

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen overflow-x-clip bg-white text-[#111214] dark:bg-[#08090a] dark:text-[#f5f6f8] transition-colors duration-200">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[#0066ff] focus:text-white focus:text-sm focus:font-medium focus:shadow-lg"
        >
          {t.hero.skipToContent}
        </a>

        {/* Solid Opaque Navbar */}
        <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#08090a]/95 backdrop-blur-sm border-b border-black/[0.08] dark:border-white/[0.08]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
            <a href="#" className="flex items-center gap-3 min-w-0 group">
              <BrandMark className="w-9 h-9 shrink-0 transition-transform duration-150 group-hover:scale-[1.03]" />
              <div className="min-w-0">
                <span className="font-display font-semibold text-sm tracking-tight block truncate text-black/95 dark:text-white group-hover:text-[#0066ff] dark:group-hover:text-[#2585ff] transition-colors">
                  Marcelino M. Turangan
                </span>
                <span className="text-[12.5px] sm:text-[13px] text-black/60 dark:text-white/60 font-mono block -mt-0.5 truncate">
                  <span className="sm:hidden">{t.hero.locationShort}</span>
                  <span className="hidden sm:inline">{t.hero.location}</span>
                </span>
              </div>
            </a>

            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              <nav aria-label="Primary" className="hidden md:flex items-center gap-5 text-sm font-medium">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      className={`transition-colors underline-offset-[6px] hover:underline ${
                        isActive
                          ? 'text-[#0066ff] dark:text-[#2585ff] font-semibold underline decoration-2'
                          : 'text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white'
                      }`}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </nav>

              <span
                className="hidden md:block w-px h-4 bg-black/[0.12] dark:bg-white/[0.12] mx-1.5"
                aria-hidden="true"
              />

              <button
                type="button"
                onClick={toggleLang}
                title={t.nav.switchLang}
                aria-label={t.nav.switchLang}
                className="min-h-[40px] px-2.5 py-1.5 rounded-md bg-black/[0.04] dark:bg-white/[0.05] border border-black/[0.1] dark:border-white/[0.12] text-[13px] font-mono font-medium text-black/80 dark:text-white/85 hover:border-black/25 dark:hover:border-white/25 transition-all duration-150 active:scale-[0.985] inline-flex items-center gap-1.5"
              >
                <Globe size={14} aria-hidden="true" />
                <span>{lang === 'id' ? 'EN' : 'ID'}</span>
              </button>

              <button
                type="button"
                onClick={toggleTheme}
                aria-label={resolvedTheme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
                className="min-h-[40px] min-w-[40px] p-2 rounded-md bg-black/[0.04] dark:bg-white/[0.05] border border-black/[0.1] dark:border-white/[0.12] text-black/80 dark:text-white/85 hover:border-black/25 dark:hover:border-white/25 transition-all duration-150 active:scale-[0.985] inline-flex items-center justify-center"
              >
                <Sun size={16} className="hidden dark:block" aria-hidden="true" />
                <Moon size={16} className="block dark:hidden" aria-hidden="true" />
              </button>

              <a
                href="https://wa.me/628979360724?text=Halo%20Marcelino,%20saya%20tertarik%20dengan%20portofolio%20Anda"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center justify-center gap-1.5 min-h-[40px] text-sm font-medium px-3.5 py-1.5 rounded-md bg-[#111214] text-white dark:bg-white dark:text-[#08090a] hover:opacity-90 transition-all duration-150 hover:-translate-y-px active:translate-y-px active:scale-[0.985]"
              >
                <MessageSquare size={14} aria-hidden="true" />
                <span>{t.nav.hireMe}</span>
              </a>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10 lg:pt-12 pb-16 sm:pb-20">
          {/* Hero Section — rendered immediately at opacity 1 on SSR/first-paint */}
          <section className="mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[12.5px] sm:text-[13px] font-mono bg-black/[0.04] dark:bg-white/[0.05] border border-black/[0.1] dark:border-white/[0.12] text-black/80 dark:text-white/85 mb-5 sm:mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" aria-hidden="true" />
              <span>{t.hero.badge}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-7 lg:gap-10 items-center mb-8 sm:mb-10">
              <div className="md:col-span-8">
                <h1
                  id="main-content"
                  tabIndex={-1}
                  className="font-display text-[32px] sm:text-5xl lg:text-[50px] font-semibold tracking-[-0.035em] leading-[1.1] mb-4 sm:mb-5"
                >
                  {t.hero.titlePart1}
                  <span className="text-black/65 dark:text-white/70">
                    {t.hero.titlePart2}
                    <span className="whitespace-nowrap">{t.hero.titlePart3}</span>
                  </span>
                </h1>
                <p className="text-base sm:text-[17px] text-black/75 dark:text-white/75 leading-relaxed max-w-2xl mb-6">
                  {t.hero.description}
                </p>

                {/* Max 2 Primary Hero Buttons */}
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-3 mb-4 sm:mb-5">
                  <a
                    href="/CV_Marcelino_M_Turangan.pdf"
                    download="CV_Marcelino_M_Turangan.pdf"
                    className={btnPrimaryClass}
                  >
                    <Download size={16} aria-hidden="true" />
                    <span>{t.hero.downloadCv}</span>
                  </a>
                  <a
                    href="https://wa.me/628979360724?text=Halo%20Marcelino,%20saya%20tertarik%20dengan%20portofolio%20Anda"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={btnSecondaryClass}
                  >
                    <MessageSquare size={16} aria-hidden="true" />
                    <span>{t.hero.whatsapp}</span>
                    <ArrowUpRight size={14} className="opacity-60 hidden sm:inline" aria-hidden="true" />
                  </a>
                </div>

                {/* Secondary Plain Text Links */}
                <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-5 gap-y-1 text-[13px] sm:text-sm font-mono text-black/75 dark:text-white/75">
                  <button
                    type="button"
                    onClick={copyEmail}
                    aria-label={t.contact.copyEmail}
                    className="inline-flex items-center gap-1.5 min-h-[40px] hover:text-[#0066ff] dark:hover:text-[#2585ff] hover:underline underline-offset-4 transition-colors"
                  >
                    {copiedEmail ? (
                      <Check size={14} className="text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                    ) : (
                      <Copy size={14} aria-hidden="true" />
                    )}
                    <span>{copiedEmail ? t.hero.emailCopied : t.hero.copyEmail}</span>
                  </button>
                  <a
                    href="https://github.com/Marcel-mux"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 min-h-[40px] hover:text-[#0066ff] dark:hover:text-[#2585ff] hover:underline underline-offset-4 transition-colors"
                  >
                    <Code2 size={14} aria-hidden="true" />
                    <span>{t.hero.github}</span>
                    <ArrowUpRight size={13} className="opacity-60" aria-hidden="true" />
                  </a>
                  <a
                    href="https://www.threads.net/@marcelt_0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 min-h-[40px] hover:text-[#0066ff] dark:hover:text-[#2585ff] hover:underline underline-offset-4 transition-colors"
                  >
                    <AtSign size={14} aria-hidden="true" />
                    <span>{t.hero.threads}</span>
                    <ArrowUpRight size={13} className="opacity-60" aria-hidden="true" />
                  </a>
                </div>
              </div>

              {/* Profile Photo */}
              <div className="md:col-span-4 relative aspect-square max-w-[280px] md:max-w-[330px] w-full mx-auto md:ml-auto md:mr-0 rounded-xl overflow-hidden border border-black/[0.12] dark:border-white/[0.14] bg-[#0b0d10] group">
                <Image
                  src="/projects/profile.jpg"
                  alt="Marcelino M. Turangan"
                  fill
                  sizes="(max-width: 768px) 280px, 330px"
                  priority
                  className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                />
              </div>
            </div>

            {/* Single-line Hairline Metadata Strip */}
            <div className="pt-4 border-t border-black/[0.08] dark:border-white/[0.08] grid grid-cols-2 gap-x-4 gap-y-2 sm:flex sm:flex-wrap sm:items-center sm:gap-x-4 sm:gap-y-2 text-[13px] font-mono text-black/70 dark:text-white/65">
              {t.hero.metaStrip.map((item, idx) => (
                <span key={item} className="inline-flex items-center gap-3">
                  {idx > 0 && (
                    <span className="hidden sm:inline text-black/30 dark:text-white/30" aria-hidden="true">
                      ·
                    </span>
                  )}
                  <span>{item}</span>
                </span>
              ))}
            </div>
          </section>

          {/* 01 / Projects Section */}
          <section id="projects" className="mb-20 sm:mb-24">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7 pb-4 border-b border-black/[0.08] dark:border-white/[0.08]">
              <div>
                <span className="text-[13px] font-mono uppercase tracking-wider text-[#0066ff] dark:text-[#2585ff] block mb-1.5">
                  {t.projects.sectionPre}
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-[-0.025em]">
                  {t.projects.sectionTitle}
                </h2>
              </div>

              {/* Filter Buttons */}
              <div
                role="group"
                aria-label={t.projects.filterAria}
                className="grid grid-cols-2 sm:inline-flex p-1 rounded-lg bg-black/[0.04] dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.1] text-[13px] font-medium w-full sm:w-auto gap-1"
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
                    className={`min-h-[38px] px-3 py-1.5 rounded-md transition-all duration-150 active:scale-[0.985] text-[13px] font-mono whitespace-nowrap ${
                      activeTab === tab.key
                        ? 'bg-[#0066ff] text-white shadow-sm'
                        : 'text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Project Rows */}
            <div className="space-y-6">
              <AnimatePresence mode="popLayout" initial={false}>
                {filteredProjects.map((project) => (
                  <motion.article
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.99 }}
                    transition={{ duration: 0.22 }}
                    className="rounded-xl p-4 sm:p-6 lg:p-7 bg-[#f8f9fb] dark:bg-[#0e1013] border border-black/[0.09] dark:border-white/[0.11] hover:border-black/20 dark:hover:border-white/20 transition-all duration-200 hover:-translate-y-0.5 group"
                  >
                    {/* Mobile Header (shown above media on < lg so user sees title immediately) */}
                    <div className="lg:hidden mb-4">
                      <div className="text-[12.5px] font-mono tracking-wide text-[#0066ff] dark:text-[#2585ff] uppercase mb-1">
                        {project.tag[lang]}
                      </div>
                      <h3 className="font-display text-xl font-semibold tracking-tight">
                        {project.title[lang]}
                      </h3>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
                      <ProjectMedia
                        project={project}
                        lang={lang}
                        onZoom={(img) => setLightboxImage(img)}
                      />

                      {/* Content */}
                      <div className="w-full flex-1 min-w-0">
                        <div className="hidden lg:block">
                          <div className="text-[13px] font-mono tracking-wide text-[#0066ff] dark:text-[#2585ff] uppercase mb-1.5">
                            {project.tag[lang]}
                          </div>

                          <h3 className="font-display text-2xl font-semibold tracking-tight mb-2.5">
                            {project.title[lang]}
                          </h3>
                        </div>

                        <p className="text-base text-black/80 dark:text-white/80 leading-relaxed mb-4">
                          {project.desc[lang]}
                        </p>

                        <div className="py-2.5 border-y border-black/[0.08] dark:border-white/[0.08] text-[13.5px] font-medium text-black/75 dark:text-white/80 mb-4">
                          {project.metrics[lang]}
                        </div>

                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {project.chips.map((chip) => (
                            <span
                              key={chip}
                              className="text-[12.5px] font-mono px-2 py-0.5 rounded bg-black/[0.04] dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/[0.1] text-black/75 dark:text-white/80"
                            >
                              {chip}
                            </span>
                          ))}
                        </div>

                        <div className="flex flex-wrap gap-3">
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={btnPrimaryClass}
                          >
                            <Code2 size={15} aria-hidden="true" />
                            <span>{t.projects.viewCode}</span>
                            <ArrowUpRight size={14} className="opacity-70" aria-hidden="true" />
                          </a>
                          {project.live && (
                            <a
                              href={project.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={btnSecondaryClass}
                            >
                              <span>{t.projects.livePreview}</span>
                              <ArrowUpRight size={14} className="opacity-70" aria-hidden="true" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>
          </section>

          {/* 02 / Ops Console & Infrastructure */}
          <section id="infra" className="mb-20 sm:mb-24">
            <div className="mb-7">
              <span className="text-[13px] font-mono uppercase tracking-wider text-[#0066ff] dark:text-[#2585ff] block mb-1.5">
                {t.infra.sectionPre}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-[-0.025em] mb-2">
                {t.infra.sectionTitle}
              </h2>
              <p className="text-base text-black/75 dark:text-white/75 max-w-2xl leading-relaxed">
                {t.infra.sectionDesc}
              </p>
            </div>

            {/* Unified Ops Console Panel */}
            <div className="rounded-xl border border-black/[0.1] dark:border-white/[0.12] bg-[#f8f9fb] dark:bg-[#0e1013] overflow-hidden">
              {/* Top Console Status Bar */}
              <div className="px-4 sm:px-5 py-3 border-b border-black/[0.08] dark:border-white/[0.08] bg-black/[0.025] dark:bg-white/[0.025] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 text-[13px] font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" aria-hidden="true" />
                  <span className="text-black/90 dark:text-white/95 font-medium">{t.infra.consoleHost}</span>
                </div>
                <div className="text-[13px] font-mono text-black/65 dark:text-white/65 tabular-nums">
                  {t.infra.consoleSummary}
                </div>
              </div>

              {/* Console Navigation Tabs */}
              <div
                role="tablist"
                aria-label="Infrastructure views"
                className="flex flex-wrap border-b border-black/[0.08] dark:border-white/[0.08] bg-white/60 dark:bg-black/20 px-2 sm:px-4 gap-1 max-w-full"
              >
                {(
                  [
                    { key: 'fleet', label: t.infra.tabs.fleet },
                    { key: 'services', label: t.infra.tabs.services },
                    { key: 'mesh', label: t.infra.tabs.mesh },
                    { key: 'cron', label: t.infra.tabs.cron },
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
                      className={`min-h-[44px] px-3 sm:px-3.5 py-2.5 text-[13px] font-mono whitespace-nowrap border-b-2 transition-colors ${
                        active
                          ? 'border-[#0066ff] dark:border-[#2585ff] text-black dark:text-white font-medium'
                          : 'border-transparent text-black/65 dark:text-white/60 hover:text-black dark:hover:text-white'
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Console Tab Content */}
              <div role="tabpanel" className="p-0">
                {infraTab === 'fleet' && (
                  <div className="divide-y divide-black/[0.06] dark:divide-white/[0.06]">
                    <div className="hidden md:grid md:grid-cols-[minmax(190px,1.1fr)_minmax(250px,1.45fr)_minmax(260px,1.65fr)_135px] gap-4 px-5 py-2.5 text-[13px] font-mono font-medium text-black/65 dark:text-white/60 bg-black/[0.02] dark:bg-white/[0.02]">
                      <div>{t.infra.headers.node}</div>
                      <div>{t.infra.headers.spec}</div>
                      <div>{t.infra.headers.role}</div>
                      <div className="text-right">{t.infra.headers.status}</div>
                    </div>
                    {cloudFleetNodes.map((node) => {
                      const specChunks = node.spec.split(' · ');
                      return (
                        <div
                          key={node.id}
                          className="grid grid-cols-1 md:grid-cols-[minmax(190px,1.1fr)_minmax(250px,1.45fr)_minmax(260px,1.65fr)_135px] gap-2 md:gap-4 px-4 sm:px-5 py-3.5 items-start hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
                        >
                          <div className="min-w-0">
                            <div className="text-sm font-medium text-black/90 dark:text-white/95">
                              {node.name}
                            </div>
                            <div className="text-[13px] font-mono text-black/60 dark:text-white/60 mt-0.5">
                              {node.provider}
                            </div>
                          </div>
                          <div className="min-w-0">
                            <div className="text-[13px] font-mono text-black/85 dark:text-white/85 tabular-nums flex flex-wrap gap-x-1.5 gap-y-0.5">
                              {specChunks.map((chunk, i) => (
                                <span key={chunk} className="whitespace-nowrap">
                                  {i > 0 && (
                                    <span className="text-black/35 dark:text-white/35 mr-1.5" aria-hidden="true">
                                      ·
                                    </span>
                                  )}
                                  {chunk}
                                </span>
                              ))}
                            </div>
                            <div className="text-[13px] font-mono text-black/60 dark:text-white/55 mt-1">
                              {node.os}
                            </div>
                          </div>
                          <div className="text-sm text-black/75 dark:text-white/75 leading-relaxed">
                            {node.role[lang]}
                          </div>
                          <div className="md:text-right">
                            <span
                              className={`text-[12.5px] font-mono px-2.5 py-0.5 rounded inline-flex items-center gap-1.5 whitespace-nowrap ${
                                node.statusType === 'online'
                                  ? 'bg-emerald-500/12 text-emerald-800 dark:text-emerald-300 border border-emerald-500/25'
                                  : node.statusType === 'watchdog'
                                    ? 'bg-[#0066ff]/12 text-[#0052cc] dark:text-[#60a5fa] border border-[#0066ff]/25'
                                    : node.statusType === 'autowake'
                                      ? 'bg-amber-500/15 text-amber-900 dark:text-amber-200 border border-amber-500/30'
                                      : 'bg-black/[0.05] dark:bg-white/[0.06] text-black/75 dark:text-white/70 border border-black/10 dark:border-white/15'
                              }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                                  node.statusType === 'online'
                                    ? 'bg-emerald-500'
                                    : node.statusType === 'watchdog'
                                      ? 'bg-[#0066ff] dark:bg-[#60a5fa]'
                                      : node.statusType === 'autowake'
                                        ? 'bg-amber-500'
                                        : 'bg-black/45 dark:bg-white/45'
                                }`}
                                aria-hidden="true"
                              />
                              {node.statusLabel[lang]}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {infraTab === 'services' && (
                  <div className="divide-y divide-black/[0.06] dark:divide-white/[0.06]">
                    <div className="hidden sm:grid sm:grid-cols-12 gap-4 px-5 py-2.5 text-[13px] font-mono font-medium text-black/65 dark:text-white/60 bg-black/[0.02] dark:bg-white/[0.02]">
                      <div className="col-span-4">{t.infra.headers.service}</div>
                      <div className="col-span-6">{t.infra.headers.desc}</div>
                      <div className="col-span-2 text-right">{t.infra.headers.bind}</div>
                    </div>
                    {liveServices.map((s) => (
                      <div
                        key={s.name}
                        className="grid grid-cols-1 sm:grid-cols-12 gap-1.5 sm:gap-4 px-4 sm:px-5 py-3 items-start hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
                      >
                        <div className="sm:col-span-4 font-mono text-[13px] text-black/90 dark:text-white/95 flex items-center gap-2 min-w-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" aria-hidden="true" />
                          <span className="truncate">{s.name}</span>
                        </div>
                        <div className="sm:col-span-6 text-sm text-black/75 dark:text-white/75">{s.desc[lang]}</div>
                        <div className="sm:col-span-2 sm:text-right">
                          <span className="font-mono text-[13px] px-2 py-0.5 rounded bg-black/[0.04] dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/[0.1] text-black/75 dark:text-white/75 tabular-nums">
                            {s.port}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {infraTab === 'mesh' && (
                  <div>
                    <div className="divide-y divide-black/[0.06] dark:divide-white/[0.06]">
                      <div className="hidden sm:grid sm:grid-cols-12 gap-4 px-5 py-2.5 text-[13px] font-mono font-medium text-black/65 dark:text-white/60 bg-black/[0.02] dark:bg-white/[0.02]">
                        <div className="col-span-3">{t.infra.headers.host}</div>
                        <div className="col-span-5">{t.infra.headers.hardware}</div>
                        <div className="col-span-4">{t.infra.headers.role}</div>
                      </div>
                      {meshNodes.map((n) => (
                        <div
                          key={n.host}
                          className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 px-4 sm:px-5 py-3 items-start hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
                        >
                          <div className="sm:col-span-3 flex items-center gap-2 font-mono text-[13px] text-black/90 dark:text-white/95">
                            <span
                              aria-hidden="true"
                              className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                                n.status === 'online'
                                  ? 'bg-emerald-500'
                                  : n.status === 'edge'
                                    ? 'bg-amber-500/80'
                                    : 'bg-black/40 dark:bg-white/40'
                              }`}
                            />
                            {n.host}
                          </div>
                          <div className="sm:col-span-5 text-[13px] font-mono text-black/70 dark:text-white/70">{n.spec}</div>
                          <div className="sm:col-span-4 text-sm text-black/75 dark:text-white/75">{n.role[lang]}</div>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 sm:px-5 py-3 border-t border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.02] flex items-center gap-2 text-[13px] font-mono text-black/70 dark:text-white/65">
                      <Terminal size={14} aria-hidden="true" />
                      <span>{t.infra.cronSummary}</span>
                    </div>
                  </div>
                )}

                {infraTab === 'cron' && (
                  <div>
                    {/* Quick Cronjob Filter Bar */}
                    <div className="px-4 sm:px-5 py-2.5 border-b border-black/[0.06] dark:border-white/[0.06] bg-black/[0.015] dark:bg-white/[0.015] flex flex-wrap items-center gap-1.5">
                      {(
                        [
                          { key: 'all', label: t.infra.cronFilters.all },
                          { key: 'active', label: t.infra.cronFilters.active },
                          { key: 'agent', label: t.infra.cronFilters.agent },
                          { key: 'paused', label: t.infra.cronFilters.paused },
                        ] as const
                      ).map((f) => {
                        const selected = cronFilter === f.key;
                        return (
                          <button
                            key={f.key}
                            type="button"
                            aria-pressed={selected}
                            onClick={() => setCronFilter(f.key)}
                            className={`min-h-[32px] px-2.5 py-1 rounded-md text-[12px] font-mono transition-colors ${
                              selected
                                ? 'bg-[#111214] text-white dark:bg-white dark:text-[#08090a] font-medium'
                                : 'bg-black/[0.04] dark:bg-white/[0.05] text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white border border-black/[0.08] dark:border-white/[0.1]'
                            }`}
                          >
                            {f.label}
                          </button>
                        );
                      })}
                    </div>

                    <div className="divide-y divide-black/[0.06] dark:divide-white/[0.06]">
                      <div className="hidden md:grid md:grid-cols-[minmax(250px,1.45fr)_125px_minmax(280px,1.8fr)_155px] gap-4 px-5 py-2.5 text-[13px] font-mono font-medium text-black/65 dark:text-white/60 bg-black/[0.02] dark:bg-white/[0.02]">
                        <div>{t.infra.headers.job}</div>
                        <div>{t.infra.headers.schedule}</div>
                        <div>{t.infra.headers.desc}</div>
                        <div className="text-right">{t.infra.headers.target}</div>
                      </div>
                      {filteredCrons.map((job) => (
                        <div
                          key={job.id}
                          className="grid grid-cols-1 md:grid-cols-[minmax(250px,1.45fr)_125px_minmax(280px,1.8fr)_155px] gap-2 md:gap-4 px-4 sm:px-5 py-3 items-start hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
                        >
                          <div className="min-w-0">
                            <div className="flex items-start gap-2 text-sm font-medium text-black/90 dark:text-white/95">
                              <span
                                aria-hidden="true"
                                className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${
                                  job.status === 'active' ? 'bg-emerald-500' : 'bg-amber-500'
                                }`}
                              />
                              <span>{job.name[lang]}</span>
                            </div>
                            <div className="pl-3.5 mt-1">
                              <span
                                className={`text-[11.5px] font-mono px-1.5 py-0.5 rounded inline-block ${
                                  job.mode === 'agent'
                                    ? 'bg-[#0066ff]/10 text-[#0052cc] dark:text-[#60a5fa] border border-[#0066ff]/20'
                                    : 'bg-black/[0.04] dark:bg-white/[0.06] text-black/65 dark:text-white/65 border border-black/[0.08] dark:border-white/[0.1]'
                                }`}
                              >
                                {job.mode === 'agent' ? 'AI Agent' : 'Script · No-Token'}
                              </span>
                            </div>
                          </div>
                          <div>
                            <span className="font-mono text-[13px] px-2 py-0.5 rounded bg-black/[0.04] dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/[0.1] text-black/80 dark:text-white/85 tabular-nums inline-block whitespace-nowrap">
                              {job.schedule}
                            </span>
                          </div>
                          <div className="text-sm text-black/75 dark:text-white/75 leading-relaxed">
                            {job.desc[lang]}
                          </div>
                          <div className="md:text-right flex flex-wrap md:flex-col md:items-end gap-1.5">
                            <span className="text-[12.5px] font-mono text-black/70 dark:text-white/65">
                              {job.target}
                            </span>
                            <span
                              className={`text-[12px] font-mono px-2 py-0.5 rounded inline-flex items-center ${
                                job.status === 'active'
                                  ? 'bg-emerald-500/15 text-emerald-900 dark:text-emerald-200 border border-emerald-500/30'
                                  : 'bg-amber-500/15 text-amber-900 dark:text-amber-200 border border-amber-500/30'
                              }`}
                            >
                              {job.status === 'active' ? 'Active' : 'Paused'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 sm:px-5 py-3 border-t border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.02] flex items-center gap-2 text-[13px] font-mono text-black/70 dark:text-white/65">
                      <Terminal size={14} aria-hidden="true" />
                      <span>{t.infra.cronFooter}</span>
                    </div>
                  </div>
                )}

                {infraTab === 'gateway' && (
                  <div className="p-5 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                      <div className="flex items-center gap-2">
                        <Cpu size={16} className="text-[#0066ff] dark:text-[#2585ff]" aria-hidden="true" />
                        <h3 className="text-base font-medium">{t.infra.aiGatewayTitle}</h3>
                      </div>
                      <span className="text-[13px] font-mono text-black/65 dark:text-white/65">
                        {t.infra.aiGatewayDesc}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {[
                        'Antigravity OAuth ×8',
                        'OpenAI-Compatible ×7',
                        'CodeBuddy ×2',
                        'Qoder ×2',
                        'Cloudflare AI',
                        'OpenRouter',
                        'TokenHarbor',
                        'Combos: MODELSPAN · Hydrogen · 3.8F_GG · Bansos_men · Argon',
                      ].map((textTag) => (
                        <span
                          key={textTag}
                          className="text-[13px] font-mono px-2.5 py-1 rounded bg-black/[0.04] dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/[0.1] text-black/80 dark:text-white/80"
                        >
                          {textTag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* 03 / Background & Core Stack Matrix */}
          <section id="background" className="mb-16 sm:mb-20">
            <div className="mb-8 pb-4 border-b border-black/[0.08] dark:border-white/[0.08]">
              <span className="text-[13px] font-mono uppercase tracking-wider text-[#0066ff] dark:text-[#2585ff] block mb-1.5">
                {t.experience.sectionPre}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-[-0.025em]">
                {t.experience.sectionTitle}
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
              <div className="lg:col-span-8">
                <div className="divide-y divide-black/[0.08] dark:divide-white/[0.08]">
                  {experienceItems.map((exp, idx) => (
                    <div key={exp.role} className={idx === 0 ? 'pb-6' : 'pt-6'}>
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                        <h3 className="font-display text-lg font-semibold tracking-tight">{exp.role}</h3>
                        <span className="text-[13px] font-mono text-black/65 dark:text-white/60">
                          {exp.period[lang]}
                        </span>
                      </div>
                      <div className="text-[13px] font-mono text-black/65 dark:text-white/60 mb-2.5">
                        {exp.org}
                      </div>
                      <p className="text-base text-black/75 dark:text-white/75 leading-relaxed">
                        {exp.summary[lang]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education & ATS CV Sidebar */}
              <div className="lg:col-span-4">
                <div className="rounded-xl bg-[#f8f9fb] dark:bg-[#0e1013] border border-black/[0.09] dark:border-white/[0.11] p-6 flex flex-col justify-between gap-5">
                  <div>
                    <div className="text-[12.5px] font-mono uppercase tracking-wider text-black/60 dark:text-white/55 mb-1.5">
                      {t.experience.educationTitle}
                    </div>
                    <div className="font-display text-lg font-semibold text-black/90 dark:text-white/95">
                      {t.experience.school}
                    </div>
                    <div className="text-sm text-black/65 dark:text-white/65 mt-1">
                      {t.experience.schoolDetail}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-black/[0.08] dark:border-white/[0.08]">
                    <div className="text-sm text-black/65 dark:text-white/65 mb-3">{t.experience.cvPrompt}</div>
                    <a
                      href="/CV_Marcelino_M_Turangan.pdf"
                      download="CV_Marcelino_M_Turangan.pdf"
                      className={`w-full ${btnSecondaryClass}`}
                    >
                      <Download size={15} aria-hidden="true" />
                      <span>{t.experience.downloadFullCv}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Full-Width Compact Stack Spec Matrix */}
            <div>
              <h3 className="font-display text-lg sm:text-xl font-semibold tracking-tight mb-4">
                {t.experience.stackTitle}
              </h3>
              <div className="divide-y divide-black/[0.06] dark:divide-white/[0.06] border-t border-black/[0.08] dark:border-white/[0.08]">
                {stackRows.map((row) => (
                  <div
                    key={row.area.en}
                    className="py-3.5 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6"
                  >
                    <div className="sm:w-48 shrink-0 text-[13px] font-mono font-medium text-black/85 dark:text-white/90">
                      {row.area[lang]}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {row.items.map((item) => (
                        <span
                          key={item}
                          className="text-[13px] font-mono px-2.5 py-0.5 rounded bg-black/[0.04] dark:bg-white/[0.05] border border-black/[0.07] dark:border-white/[0.09] text-black/80 dark:text-white/80"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 04 / Editorial Split Contact */}
          <section
            id="contact"
            className="py-12 sm:py-14 border-t border-black/[0.08] dark:border-white/[0.08] grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            <div className="lg:col-span-7">
              <span className="text-[13px] font-mono uppercase tracking-wider text-[#0066ff] dark:text-[#2585ff] block mb-2">
                {t.contact.sectionPre}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-[-0.025em] mb-3">
                {t.contact.title}
              </h2>
              <p className="text-base text-black/75 dark:text-white/75 leading-relaxed max-w-xl">
                {t.contact.description}
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-2.5 lg:items-stretch">
              <a
                href="https://wa.me/628979360724?text=Halo%20Marcelino,%20saya%20tertarik%20bekerjasama%20untuk%20proyek"
                target="_blank"
                rel="noopener noreferrer"
                className={`${btnPrimaryClass} justify-between`}
              >
                <span className="inline-flex items-center gap-2">
                  <MessageSquare size={16} aria-hidden="true" />
                  <span>{t.contact.chatWa}</span>
                </span>
                <ArrowUpRight size={15} className="opacity-75" aria-hidden="true" />
              </a>

              <button
                type="button"
                onClick={copyEmail}
                className={`${btnSecondaryClass} justify-between`}
              >
                <span className="inline-flex items-center gap-2 min-w-0 truncate">
                  {copiedEmail ? (
                    <Check size={16} className="text-emerald-600 dark:text-emerald-400 shrink-0" aria-hidden="true" />
                  ) : (
                    <Copy size={16} className="shrink-0" aria-hidden="true" />
                  )}
                  <span className="truncate">{copiedEmail ? t.contact.emailCopied : t.contact.copyEmail}</span>
                </span>
              </button>
              <span aria-live="polite" className="sr-only">
                {copiedEmail ? t.contact.emailAriaCopied : ''}
              </span>

              <a
                href="/CV_Marcelino_M_Turangan.pdf"
                download="CV_Marcelino_M_Turangan.pdf"
                className={`${btnSecondaryClass} justify-between`}
              >
                <span className="inline-flex items-center gap-2">
                  <Download size={16} aria-hidden="true" />
                  <span>{t.contact.downloadCv}</span>
                </span>
              </a>
            </div>
          </section>

          {/* Footer */}
          <footer className="pt-8 border-t border-black/[0.08] dark:border-white/[0.08] flex flex-col sm:flex-row items-center justify-between text-[13px] text-black/65 dark:text-white/60 gap-4">
            <div className="flex items-center gap-3">
              <BrandMark className="w-7 h-7 shrink-0" />
              <span>{t.footer.copyright}</span>
            </div>
            <div className="flex items-center gap-4 font-mono">
              <a
                href="https://github.com/Marcel-mux"
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] inline-flex items-center hover:text-black dark:hover:text-white hover:underline underline-offset-4 transition-colors"
              >
                GitHub
              </a>
              <span aria-hidden="true">·</span>
              <a
                href="https://www.threads.net/@marcelt_0"
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] inline-flex items-center hover:text-black dark:hover:text-white hover:underline underline-offset-4 transition-colors"
              >
                Threads
              </a>
              <span aria-hidden="true">·</span>
              <a
                href="/CV_Marcelino_M_Turangan.pdf"
                download="CV_Marcelino_M_Turangan.pdf"
                className="min-h-[44px] inline-flex items-center hover:text-black dark:hover:text-white hover:underline underline-offset-4 transition-colors"
              >
                CV (PDF)
              </a>
            </div>
          </footer>
        </main>

        {/* Native <dialog> Image Lightbox Modal */}
        <dialog
          ref={dialogRef}
          aria-label={lightboxImage?.alt ?? 'Image preview'}
          onClose={() => setLightboxImage(null)}
          onPointerDown={(e) => {
            pressedOutsideRef.current = isOutsideDialogContent(e);
          }}
          onPointerUp={(e) => {
            if (pressedOutsideRef.current && isOutsideDialogContent(e)) {
              setLightboxImage(null);
            }
          }}
          className="bg-transparent p-4 sm:p-8 max-w-none max-h-none w-full h-full m-0 open:flex items-center justify-center"
        >
          {lightboxImage && (
            <div ref={dialogContentRef} className="relative w-full max-w-5xl h-[85vh]">
              <button
                type="button"
                autoFocus
                onClick={() => setLightboxImage(null)}
                aria-label="Close image preview"
                className="fixed top-4 right-4 z-[110] p-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
              >
                <X size={20} aria-hidden="true" />
              </button>
              <Image
                src={lightboxImage.src}
                alt={lightboxImage.alt}
                fill
                sizes="95vw"
                className="object-contain"
              />
            </div>
          )}
        </dialog>
      </div>
    </MotionConfig>
  );
}
