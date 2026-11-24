'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
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
} from '../data/translations';

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
  const [lang, setLang] = useState<Lang>('id');
  const [activeTab, setActiveTab] = useState<TabKey>('all');
  const [infraTab, setInfraTab] = useState<InfraTabKey>('fleet');
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

  const btnPrimaryClass =
    'inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-lg text-sm font-medium bg-[#0066ff] text-white hover:bg-[#0052cc] dark:hover:bg-[#2585ff] transition-all duration-150 hover:-translate-y-px active:translate-y-px active:scale-[0.985]';

  const btnSecondaryClass =
    'inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-lg text-sm font-medium bg-black/[0.04] dark:bg-white/[0.04] border border-black/[0.1] dark:border-white/[0.1] text-black/85 dark:text-white/90 hover:border-black/25 dark:hover:border-white/25 hover:bg-black/[0.07] dark:hover:bg-white/[0.08] transition-all duration-150 hover:-translate-y-px active:translate-y-px active:scale-[0.985]';

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
        <header className="sticky top-0 z-50 bg-white dark:bg-[#08090a] border-b border-black/[0.08] dark:border-white/[0.08]">
          <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative w-14 h-9 rounded-lg overflow-hidden border border-black/10 dark:border-white/15 bg-black shrink-0">
                <Image
                  src="/logo.png"
                  alt="MT Logo"
                  fill
                  sizes="56px"
                  className="object-contain"
                />
              </div>
              <div className="min-w-0">
                <span className="font-display font-semibold text-sm tracking-tight block truncate">
                  Marcelino M. Turangan
                </span>
                <span className="text-[13px] text-black/60 dark:text-white/55 font-mono block -mt-0.5 truncate">
                  {t.hero.location}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <nav
                aria-label="Primary"
                className="hidden md:flex items-center gap-5 text-sm font-medium text-black/65 dark:text-white/65 mr-1"
              >
                <a href="#projects" className="hover:text-black dark:hover:text-white hover:underline underline-offset-4 transition-colors">
                  {t.nav.projects}
                </a>
                <a href="#infra" className="hover:text-black dark:hover:text-white hover:underline underline-offset-4 transition-colors">
                  {t.nav.infra}
                </a>
                <a href="#background" className="hover:text-black dark:hover:text-white hover:underline underline-offset-4 transition-colors">
                  {t.nav.experience}
                </a>
                <a href="#contact" className="hover:text-black dark:hover:text-white hover:underline underline-offset-4 transition-colors">
                  {t.nav.contact}
                </a>
              </nav>

              <button
                type="button"
                onClick={toggleLang}
                aria-label={t.nav.switchLang}
                className="min-h-[40px] px-2.5 py-1.5 rounded-md bg-black/[0.04] dark:bg-white/[0.05] border border-black/[0.1] dark:border-white/[0.1] text-[13px] font-mono font-medium text-black/80 dark:text-white/80 hover:border-black/25 dark:hover:border-white/25 transition-all duration-150 active:scale-[0.985] inline-flex items-center gap-1.5"
              >
                <Globe size={14} aria-hidden="true" />
                <span>{lang === 'id' ? 'EN' : 'ID'}</span>
              </button>

              <button
                type="button"
                onClick={toggleTheme}
                aria-label={resolvedTheme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
                className="min-h-[40px] min-w-[40px] p-2 rounded-md bg-black/[0.04] dark:bg-white/[0.05] border border-black/[0.1] dark:border-white/[0.1] text-black/80 dark:text-white/80 hover:border-black/25 dark:hover:border-white/25 transition-all duration-150 active:scale-[0.985] inline-flex items-center justify-center"
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
                className="hidden sm:inline-flex items-center justify-center min-h-[40px] text-sm font-medium px-4 py-1.5 rounded-md bg-[#0066ff] text-white hover:bg-[#0052cc] dark:hover:bg-[#2585ff] transition-all duration-150 hover:-translate-y-px active:translate-y-px active:scale-[0.985]"
              >
                {t.nav.hireMe}
              </a>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-5xl mx-auto px-6 pt-12 pb-20">
          {/* Hero Section (Decide Surface — at most 2 hero action buttons + inline profile links) */}
          <section className="mb-24">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[13px] font-mono bg-black/[0.04] dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/[0.08] text-black/75 dark:text-white/75 mb-7"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500" aria-hidden="true" />
              {t.hero.badge}
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center mb-10">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="md:col-span-8"
              >
                <h1
                  id="main-content"
                  tabIndex={-1}
                  className="font-display text-4xl sm:text-5xl lg:text-[52px] font-semibold tracking-[-0.035em] leading-[1.08] mb-5"
                >
                  {t.hero.titlePart1}
                  <span className="text-black/45 dark:text-white/45">{t.hero.titlePart2}</span>
                </h1>
                <p className="text-base sm:text-[17px] text-black/75 dark:text-white/75 leading-relaxed max-w-2xl mb-7">
                  {t.hero.description}
                </p>

                {/* Max 2 Primary Hero Buttons */}
                <div className="flex flex-wrap items-center gap-3 mb-5">
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
                    <ArrowUpRight size={14} className="opacity-60" aria-hidden="true" />
                  </a>
                </div>

                {/* Secondary Plain Text Links */}
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-mono text-black/70 dark:text-white/70">
                  <button
                    type="button"
                    onClick={copyEmail}
                    aria-label={t.contact.copyEmail}
                    className="inline-flex items-center gap-1.5 min-h-[44px] hover:text-[#0066ff] dark:hover:text-[#2585ff] hover:underline underline-offset-4 transition-colors"
                  >
                    {copiedEmail ? (
                      <Check size={14} className="text-emerald-500" aria-hidden="true" />
                    ) : (
                      <Mail size={14} aria-hidden="true" />
                    )}
                    <span>{copiedEmail ? t.hero.emailCopied : t.hero.copyEmail}</span>
                  </button>
                  <a
                    href="https://github.com/Marcel-mux"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 min-h-[44px] hover:text-[#0066ff] dark:hover:text-[#2585ff] hover:underline underline-offset-4 transition-colors"
                  >
                    <Code2 size={14} aria-hidden="true" />
                    <span>{t.hero.github}</span>
                    <ArrowUpRight size={13} className="opacity-60" aria-hidden="true" />
                  </a>
                  <a
                    href="https://www.threads.net/@marcelt_0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 min-h-[44px] hover:text-[#0066ff] dark:hover:text-[#2585ff] hover:underline underline-offset-4 transition-colors"
                  >
                    <AtSign size={14} aria-hidden="true" />
                    <span>{t.hero.threads}</span>
                    <ArrowUpRight size={13} className="opacity-60" aria-hidden="true" />
                  </a>
                </div>
              </motion.div>

              {/* Profile Photo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, delay: 0.1 }}
                className="md:col-span-4 relative aspect-square max-w-[260px] mx-auto md:ml-auto w-full rounded-xl overflow-hidden border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 group"
              >
                <Image
                  src="/projects/profile.jpg"
                  alt="Marcelino M. Turangan"
                  fill
                  sizes="(max-width: 768px) 260px, 260px"
                  priority
                  className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-500"
                />
                <div className="absolute inset-x-0 bottom-0 bg-[#08090a]/90 px-3.5 py-2.5 border-t border-white/10">
                  <span className="text-white text-[13px] font-mono tracking-tight block">
                    Marcelino M. Turangan · IKN
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Single-line Hairline Metadata Strip */}
            <div className="pt-4 border-t border-black/[0.08] dark:border-white/[0.08] flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] font-mono text-black/65 dark:text-white/60">
              {t.hero.metaStrip.map((item, idx) => (
                <span key={item} className="inline-flex items-center gap-2">
                  {idx > 0 && <span className="text-black/25 dark:text-white/25" aria-hidden="true">/</span>}
                  <span>{item}</span>
                </span>
              ))}
            </div>
          </section>

          {/* 01 / Projects Section */}
          <section id="projects" className="mb-24">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-black/[0.08] dark:border-white/[0.08]">
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
                className="flex flex-wrap p-1 rounded-lg bg-black/[0.04] dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08] text-[13px] font-medium self-start sm:self-auto max-w-full gap-1"
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
                    className={`min-h-[38px] px-3 py-1.5 rounded-md transition-all duration-150 active:scale-[0.985] text-[13px] font-mono ${
                      activeTab === tab.key
                        ? 'bg-[#0066ff] text-white shadow-sm'
                        : 'text-black/65 dark:text-white/65 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Project Rows */}
            <div className="space-y-6">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project) => (
                  <motion.article
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.99 }}
                    transition={{ duration: 0.25 }}
                    className="rounded-xl p-5 sm:p-7 bg-[#fafafa] dark:bg-[#0e0f11] border border-black/[0.08] dark:border-white/[0.08] hover:border-black/20 dark:hover:border-white/20 transition-all duration-200 hover:-translate-y-0.5 group"
                  >
                    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
                      {/* Uncropped Media Gallery */}
                      {project.mediaLayout === 'portrait-pair' ? (
                        <div className="w-full lg:w-[320px] shrink-0 grid grid-cols-2 gap-2.5">
                          {[
                            { src: project.image, alt: project.title[lang] },
                            { src: project.imageSecondary, alt: `${project.title[lang]} Detail` },
                          ].map((media) => (
                            <button
                              key={media.src}
                              type="button"
                              onClick={() => setLightboxImage(media)}
                              aria-label={`Zoom ${media.alt}`}
                              className="relative aspect-[9/20] w-full rounded-lg overflow-hidden border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-black/50 group/img cursor-zoom-in focus:outline-none"
                            >
                              <Image
                                src={media.src}
                                alt={media.alt}
                                fill
                                sizes="(max-width: 1024px) 50vw, 160px"
                                className="object-contain p-0.5 group-hover/img:scale-[1.03] transition-transform duration-300"
                              />
                              <span className="absolute bottom-2 right-2 p-1.5 rounded bg-black/70 text-white opacity-0 group-hover/img:opacity-100 transition-opacity">
                                <ZoomIn size={13} aria-hidden="true" />
                              </span>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="w-full lg:w-[320px] shrink-0 space-y-2.5">
                          <button
                            type="button"
                            onClick={() => setLightboxImage({ src: project.image, alt: project.title[lang] })}
                            aria-label={`Zoom ${project.title[lang]}`}
                            className="relative aspect-[4/3] w-full rounded-lg overflow-hidden border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-black/50 group/img cursor-zoom-in block focus:outline-none"
                          >
                            <Image
                              src={project.image}
                              alt={project.title[lang]}
                              fill
                              sizes="(max-width: 1024px) 100vw, 320px"
                              className="object-contain p-1 group-hover/img:scale-[1.03] transition-transform duration-300"
                            />
                            <span className="absolute bottom-2 right-2 p-1.5 rounded bg-black/70 text-white opacity-0 group-hover/img:opacity-100 transition-opacity">
                              <ZoomIn size={13} aria-hidden="true" />
                            </span>
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setLightboxImage({
                                src: project.imageSecondary,
                                alt: `${project.title[lang]} Detail`,
                              })
                            }
                            aria-label={`Zoom ${project.title[lang]} detail`}
                            className="relative aspect-[4/3] w-full rounded-lg overflow-hidden border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-black/50 opacity-90 hover:opacity-100 group/img cursor-zoom-in block transition-opacity focus:outline-none"
                          >
                            <Image
                              src={project.imageSecondary}
                              alt={`${project.title[lang]} Detail`}
                              fill
                              sizes="(max-width: 1024px) 100vw, 320px"
                              className="object-contain p-1 group-hover/img:scale-[1.03] transition-transform duration-300"
                            />
                            <span className="absolute bottom-2 right-2 p-1.5 rounded bg-black/70 text-white opacity-0 group-hover/img:opacity-100 transition-opacity">
                              <ZoomIn size={13} aria-hidden="true" />
                            </span>
                          </button>
                        </div>
                      )}

                      {/* Content */}
                      <div className="w-full flex-1 min-w-0">
                        <div className="text-[13px] font-mono tracking-wide text-[#0066ff] dark:text-[#2585ff] uppercase mb-1.5">
                          {project.tag[lang]}
                        </div>

                        <h3 className="font-display text-xl sm:text-2xl font-semibold tracking-tight mb-2.5">
                          {project.title[lang]}
                        </h3>

                        <p className="text-base text-black/80 dark:text-white/80 leading-relaxed mb-4">
                          {project.desc[lang]}
                        </p>

                        <div className="py-2 border-y border-black/[0.06] dark:border-white/[0.06] text-[13px] font-mono text-black/65 dark:text-white/60 mb-4">
                          {project.metrics[lang]}
                        </div>

                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {project.chips.map((chip) => (
                            <span
                              key={chip}
                              className="text-[13px] font-mono px-2.5 py-1 rounded bg-black/[0.04] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.08] text-black/75 dark:text-white/75"
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
                            {t.projects.viewCode}
                            <ArrowUpRight size={14} className="opacity-70" aria-hidden="true" />
                          </a>
                          {project.live && (
                            <a
                              href={project.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={btnSecondaryClass}
                            >
                              {t.projects.livePreview}
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

          {/* 02 / Ops Console & Infrastructure (Monitor Surface) */}
          <section id="infra" className="mb-24">
            <div className="mb-8">
              <span className="text-[13px] font-mono uppercase tracking-wider text-[#0066ff] dark:text-[#2585ff] block mb-1.5">
                {t.infra.sectionPre}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-[-0.025em] mb-2">
                {t.infra.sectionTitle}
              </h2>
              <p className="text-base text-black/70 dark:text-white/70 max-w-2xl leading-relaxed">
                {t.infra.sectionDesc}
              </p>
            </div>

            {/* Unified Ops Console Panel */}
            <div className="rounded-xl border border-black/[0.1] dark:border-white/[0.1] bg-[#fafafa] dark:bg-[#0e0f11] overflow-hidden">
              {/* Top Console Status Bar */}
              <div className="px-4 sm:px-5 py-3 border-b border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.02] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 text-[13px] font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" aria-hidden="true" />
                  <span className="text-black/90 dark:text-white/95 font-medium">{t.infra.consoleHost}</span>
                </div>
                <div className="text-[13px] font-mono text-black/60 dark:text-white/55 tabular-nums">
                  {t.infra.consoleSummary}
                </div>
              </div>

              {/* Console Navigation Tabs */}
              <div
                role="tablist"
                aria-label="Infrastructure views"
                className="flex flex-wrap sm:flex-nowrap border-b border-black/[0.08] dark:border-white/[0.08] bg-white/50 dark:bg-black/20 px-2 sm:px-4 gap-1 max-w-full"
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
                      className={`min-h-[44px] px-3.5 py-2.5 text-[13px] font-mono whitespace-nowrap border-b-2 transition-colors ${
                        active
                          ? 'border-[#0066ff] dark:border-[#2585ff] text-black dark:text-white font-medium'
                          : 'border-transparent text-black/60 dark:text-white/55 hover:text-black dark:hover:text-white'
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
                    <div className="hidden md:grid md:grid-cols-12 gap-4 px-5 py-2.5 text-[13px] font-mono font-medium text-black/55 dark:text-white/50 bg-black/[0.015] dark:bg-white/[0.015]">
                      <div className="col-span-3">{t.infra.headers.node}</div>
                      <div className="col-span-3">{t.infra.headers.spec}</div>
                      <div className="col-span-4">{t.infra.headers.role}</div>
                      <div className="col-span-2 text-right">{t.infra.headers.status}</div>
                    </div>
                    {cloudFleetNodes.map((node) => (
                      <div
                        key={node.id}
                        className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-4 sm:px-5 py-3.5 items-start md:items-center hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
                      >
                        <div className="md:col-span-3 min-w-0">
                          <div className="text-sm font-medium text-black/90 dark:text-white/95 truncate">
                            {node.name}
                          </div>
                          <div className="text-[13px] font-mono text-black/55 dark:text-white/50">{node.provider}</div>
                        </div>
                        <div className="md:col-span-3 min-w-0">
                          <div className="text-[13px] font-mono text-black/80 dark:text-white/80 tabular-nums">
                            {node.spec}
                          </div>
                          <div className="text-[13px] font-mono text-black/55 dark:text-white/50">{node.os}</div>
                        </div>
                        <div className="md:col-span-4 text-sm text-black/75 dark:text-white/75 leading-relaxed">
                          {node.role[lang]}
                        </div>
                        <div className="md:col-span-2 md:text-right">
                          <span
                            className={`text-[13px] font-mono px-2.5 py-0.5 rounded inline-flex items-center gap-1.5 ${
                              node.statusType === 'online'
                                ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20'
                                : node.statusType === 'watchdog'
                                  ? 'bg-[#0066ff]/10 text-[#0066ff] dark:text-[#2585ff] border border-[#0066ff]/20'
                                  : node.statusType === 'autowake'
                                    ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20'
                                    : 'bg-black/5 dark:bg-white/5 text-black/65 dark:text-white/55 border border-black/10 dark:border-white/10'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                node.statusType === 'online'
                                  ? 'bg-emerald-500'
                                  : node.statusType === 'watchdog'
                                    ? 'bg-[#0066ff] dark:bg-[#2585ff]'
                                    : node.statusType === 'autowake'
                                      ? 'bg-amber-500'
                                      : 'bg-black/40 dark:bg-white/40'
                              }`}
                              aria-hidden="true"
                            />
                            {node.statusLabel[lang]}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {infraTab === 'services' && (
                  <div className="divide-y divide-black/[0.06] dark:divide-white/[0.06]">
                    <div className="hidden sm:grid sm:grid-cols-12 gap-4 px-5 py-2.5 text-[13px] font-mono font-medium text-black/55 dark:text-white/50 bg-black/[0.015] dark:bg-white/[0.015]">
                      <div className="col-span-4">{t.infra.headers.service}</div>
                      <div className="col-span-6">{t.infra.headers.desc}</div>
                      <div className="col-span-2 text-right">{t.infra.headers.bind}</div>
                    </div>
                    {liveServices.map((s) => (
                      <div
                        key={s.name}
                        className="grid grid-cols-1 sm:grid-cols-12 gap-1.5 sm:gap-4 px-4 sm:px-5 py-3 items-start sm:items-center hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
                      >
                        <div className="sm:col-span-4 font-mono text-[13px] text-black/90 dark:text-white/95 flex items-center gap-2 min-w-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" aria-hidden="true" />
                          <span className="truncate">{s.name}</span>
                        </div>
                        <div className="sm:col-span-6 text-sm text-black/75 dark:text-white/75">{s.desc[lang]}</div>
                        <div className="sm:col-span-2 sm:text-right">
                          <span className="font-mono text-[13px] px-2 py-0.5 rounded bg-black/[0.04] dark:bg-white/[0.05] border border-black/[0.06] dark:border-white/[0.08] text-black/70 dark:text-white/70 tabular-nums">
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
                      <div className="hidden sm:grid sm:grid-cols-12 gap-4 px-5 py-2.5 text-[13px] font-mono font-medium text-black/55 dark:text-white/50 bg-black/[0.015] dark:bg-white/[0.015]">
                        <div className="col-span-3">{t.infra.headers.host}</div>
                        <div className="col-span-5">{t.infra.headers.hardware}</div>
                        <div className="col-span-4">{t.infra.headers.role}</div>
                      </div>
                      {meshNodes.map((n) => (
                        <div
                          key={n.host}
                          className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 px-4 sm:px-5 py-3 items-start sm:items-center hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
                        >
                          <div className="sm:col-span-3 flex items-center gap-2 font-mono text-[13px] text-black/90 dark:text-white/95">
                            <span
                              aria-hidden="true"
                              className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                                n.status === 'online'
                                  ? 'bg-emerald-500'
                                  : n.status === 'edge'
                                    ? 'bg-amber-500/80'
                                    : 'bg-black/35 dark:bg-white/35'
                              }`}
                            />
                            {n.host}
                          </div>
                          <div className="sm:col-span-5 text-[13px] font-mono text-black/65 dark:text-white/65">{n.spec}</div>
                          <div className="sm:col-span-4 text-sm text-black/75 dark:text-white/75">{n.role[lang]}</div>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 sm:px-5 py-3 border-t border-black/[0.08] dark:border-white/[0.08] bg-black/[0.015] dark:bg-white/[0.015] flex items-center gap-2 text-[13px] font-mono text-black/65 dark:text-white/60">
                      <Terminal size={14} aria-hidden="true" />
                      <span>{t.infra.cronSummary}</span>
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
                      <span className="text-[13px] font-mono text-black/65 dark:text-white/60">
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
                          className="text-[13px] font-mono px-2.5 py-1 rounded bg-black/[0.04] dark:bg-white/[0.05] border border-black/[0.06] dark:border-white/[0.08] text-black/75 dark:text-white/75"
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
          <section id="background" className="mb-24">
            <div className="mb-8 pb-4 border-b border-black/[0.08] dark:border-white/[0.08]">
              <span className="text-[13px] font-mono uppercase tracking-wider text-[#0066ff] dark:text-[#2585ff] block mb-1.5">
                {t.experience.sectionPre}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-[-0.025em]">
                {t.experience.sectionTitle}
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-8 space-y-10">
                <div className="divide-y divide-black/[0.08] dark:divide-white/[0.08]">
                  {experienceItems.map((exp, idx) => (
                    <div key={exp.role} className={idx === 0 ? 'pb-6' : 'pt-6'}>
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                        <h3 className="font-display text-lg font-semibold tracking-tight">{exp.role}</h3>
                        <span className="text-[13px] font-mono text-black/60 dark:text-white/55">{exp.period[lang]}</span>
                      </div>
                      <div className="text-[13px] font-mono text-[#0066ff] dark:text-[#2585ff] mb-2.5">{exp.org}</div>
                      <p className="text-base text-black/75 dark:text-white/75 leading-relaxed">{exp.summary[lang]}</p>
                    </div>
                  ))}
                </div>

                {/* Compact Stack Spec Matrix */}
                <div>
                  <h3 className="text-[13px] font-mono uppercase tracking-wider text-black/60 dark:text-white/55 mb-4">
                    {t.experience.stackTitle}
                  </h3>
                  <div className="divide-y divide-black/[0.06] dark:divide-white/[0.06] border-y border-black/[0.08] dark:border-white/[0.08]">
                    {stackRows.map((row) => (
                      <div
                        key={row.area.en}
                        className="py-3.5 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6"
                      >
                        <div className="sm:w-44 shrink-0 text-[13px] font-mono font-medium text-black/85 dark:text-white/85">
                          {row.area[lang]}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {row.items.map((item) => (
                            <span
                              key={item}
                              className="text-[13px] font-mono px-2.5 py-0.5 rounded bg-black/[0.04] dark:bg-white/[0.04] text-black/75 dark:text-white/75"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Education & ATS CV Sidebar */}
              <div className="lg:col-span-4">
                <div className="rounded-xl bg-[#fafafa] dark:bg-[#0e0f11] border border-black/[0.08] dark:border-white/[0.08] p-6 flex flex-col justify-between gap-6">
                  <div>
                    <div className="text-[13px] font-mono uppercase tracking-wider text-black/55 dark:text-white/50 mb-2">
                      {t.experience.educationTitle}
                    </div>
                    <div className="font-display text-lg font-semibold text-black/90 dark:text-white/95">
                      {t.experience.school}
                    </div>
                    <div className="text-sm text-black/65 dark:text-white/60 mt-1">{t.experience.schoolDetail}</div>
                  </div>

                  <div className="pt-5 border-t border-black/[0.08] dark:border-white/[0.08]">
                    <div className="text-sm text-black/65 dark:text-white/60 mb-3">{t.experience.cvPrompt}</div>
                    <a
                      href="/CV_Marcelino_M_Turangan.pdf"
                      download="CV_Marcelino_M_Turangan.pdf"
                      className={`w-full ${btnPrimaryClass}`}
                    >
                      <Download size={15} aria-hidden="true" />
                      {t.experience.downloadFullCv}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 04 / Editorial Split Contact */}
          <section
            id="contact"
            className="pt-12 border-t border-black/[0.08] dark:border-white/[0.08] grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            <div className="lg:col-span-7">
              <span className="text-[13px] font-mono uppercase tracking-wider text-[#0066ff] dark:text-[#2585ff] block mb-2">
                {t.contact.sectionPre}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-[-0.025em] mb-3">
                {t.contact.title}
              </h2>
              <p className="text-base text-black/70 dark:text-white/70 leading-relaxed max-w-xl">
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
                  {t.contact.chatWa}
                </span>
                <ArrowUpRight size={15} className="opacity-70" aria-hidden="true" />
              </a>

              <button
                type="button"
                onClick={copyEmail}
                className={`${btnSecondaryClass} justify-between`}
              >
                <span className="inline-flex items-center gap-2 min-w-0 truncate">
                  {copiedEmail ? (
                    <Check size={16} className="text-emerald-500 shrink-0" aria-hidden="true" />
                  ) : (
                    <Mail size={16} className="shrink-0" aria-hidden="true" />
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
                  {t.contact.downloadCv}
                </span>
              </a>
            </div>
          </section>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-black/[0.08] dark:border-white/[0.08] flex flex-col sm:flex-row items-center justify-between text-[13px] text-black/60 dark:text-white/55 gap-4">
            <div className="flex items-center gap-2.5">
              <div className="relative w-10 h-6 rounded overflow-hidden border border-black/10 dark:border-white/15 bg-black shrink-0">
                <Image src="/logo.png" alt="MT Logo" fill sizes="40px" className="object-contain" />
              </div>
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
              <span aria-hidden="true">•</span>
              <a
                href="https://www.threads.net/@marcelt_0"
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] inline-flex items-center hover:text-black dark:hover:text-white hover:underline underline-offset-4 transition-colors"
              >
                Threads
              </a>
              <span aria-hidden="true">•</span>
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
            <div ref={dialogContentRef} className="relative w-full max-w-4xl h-[85vh]">
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
