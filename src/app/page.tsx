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
  Server,
  Smartphone,
  Download,
  AtSign,
  Briefcase,
  GraduationCap,
  Globe,
  Layers,
  Monitor,
  Box,
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
  capabilityCards,
  type Lang,
  type TabKey,
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
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    if (!lightboxImage) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxImage(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxImage]);

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
      await navigator.clipboard.writeText('marcel.mux@gmail.com');
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    }
  };

  const t = translations[lang];

  const filteredProjects =
    activeTab === 'all' ? projectItems : projectItems.filter((p) => p.categories.includes(activeTab));

  return (
    <div className="min-h-screen bg-white text-[#171717] dark:bg-[#08090a] dark:text-[#f7f8f8] transition-colors duration-200">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[#171717] focus:text-white dark:focus:bg-[#5e6ad2] focus:text-xs focus:font-medium focus:shadow-lg"
      >
        {t.hero.skipToContent}
      </a>

      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/85 dark:bg-[#08090a]/85 backdrop-blur-md border-b border-black/5 dark:border-white/10">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-black/10 dark:border-white/20 shadow-sm bg-black">
              <Image
                src="/logo.png"
                alt="MT Logo — Marcelino M. Turangan"
                fill
                sizes="36px"
                className="object-cover object-center"
              />
            </div>
            <div>
              <span className="font-medium text-sm tracking-tight block">Marcelino M. Turangan</span>
              <span className="text-[11px] text-black/50 dark:text-white/40 font-mono block -mt-0.5">
                {t.hero.location}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <nav
              aria-label="Primary"
              className="hidden md:flex items-center gap-5 text-xs font-medium text-black/60 dark:text-white/60 mr-2"
            >
              <a href="#projects" className="hover:text-black dark:hover:text-white transition-colors">
                {t.nav.projects}
              </a>
              <a href="#infra" className="hover:text-black dark:hover:text-white transition-colors">
                {t.nav.infra}
              </a>
              <a href="#background" className="hover:text-black dark:hover:text-white transition-colors">
                {t.nav.experience}
              </a>
              <a href="#skills" className="hover:text-black dark:hover:text-white transition-colors">
                {t.nav.capabilities}
              </a>
              <a href="#contact" className="hover:text-black dark:hover:text-white transition-colors">
                {t.nav.contact}
              </a>
            </nav>

            {/* Language Switcher */}
            <button
              type="button"
              onClick={toggleLang}
              aria-label={t.nav.switchLang}
              className="px-2.5 py-1.5 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-mono font-medium text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition-all inline-flex items-center gap-1.5"
            >
              <Globe size={14} aria-hidden="true" />
              <span>{lang === 'id' ? 'EN' : 'ID'}</span>
            </button>

            {/* Theme Toggle */}
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
              {t.nav.cv}
            </a>

            <a
              href="https://wa.me/628979360724?text=Halo%20Marcelino,%20saya%20tertarik%20dengan%20portofolio%20Anda"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium px-3.5 py-1.5 rounded-md bg-[#171717] text-white dark:bg-[#5e6ad2] dark:hover:bg-[#7170ff] hover:bg-black transition-all shadow-sm"
            >
              {t.nav.hireMe}
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 pt-12 pb-24">
        {/* Hero Section */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black/70 dark:text-white/70 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
            {t.hero.badge}
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
                {t.hero.titlePart1}
                <span className="text-black/40 dark:text-white/40">
                  {t.hero.titlePart2}
                </span>
              </h1>
              <p className="text-base sm:text-lg text-black/70 dark:text-white/70 leading-relaxed max-w-xl mb-8">
                {t.hero.description}
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href="/CV_Marcelino_M_Turangan.pdf"
                  download="CV_Marcelino_M_Turangan.pdf"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-[#171717] text-white dark:bg-[#5e6ad2] dark:hover:bg-[#7170ff] hover:bg-black transition-all shadow-sm"
                >
                  <Download size={16} aria-hidden="true" />
                  {t.hero.downloadCv}
                </a>
                <a
                  href="https://github.com/Marcel-mux"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black/80 dark:text-white/80 hover:bg-black/10 dark:hover:bg-white/10 transition-all"
                >
                  <Code2 size={16} aria-hidden="true" />
                  {t.hero.github}
                  <ArrowUpRight size={14} className="opacity-60" aria-hidden="true" />
                </a>
                <a
                  href="https://www.threads.net/@marcelt_0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black/80 dark:text-white/80 hover:bg-black/10 dark:hover:bg-white/10 transition-all"
                >
                  <AtSign size={16} aria-hidden="true" />
                  {t.hero.threads}
                  <ArrowUpRight size={14} className="opacity-60" aria-hidden="true" />
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
                sizes="(max-width: 768px) 280px, 280px"
                priority
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
              <div className="text-xs text-black/50 dark:text-white/40">{t.hero.metrics.m1Label}</div>
            </div>
            <div className="p-3.5 rounded-lg bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
              <div className="font-mono text-xl font-medium text-emerald-500">{t.hero.metrics.m2Value}</div>
              <div className="text-xs text-black/50 dark:text-white/40">{t.hero.metrics.m2Label}</div>
            </div>
            <div className="p-3.5 rounded-lg bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
              <div className="font-mono text-xl font-medium">{t.hero.metrics.m3Value}</div>
              <div className="text-xs text-black/50 dark:text-white/40">{t.hero.metrics.m3Label}</div>
            </div>
            <div className="p-3.5 rounded-lg bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
              <div className="font-mono text-xl font-medium">{t.hero.metrics.m4Value}</div>
              <div className="text-xs text-black/50 dark:text-white/40">{t.hero.metrics.m4Label}</div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-black/40 dark:text-brand-glow block mb-1">
                {t.projects.sectionPre}
              </span>
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight">{t.projects.sectionTitle}</h2>
            </div>

            {/* Filter Buttons */}
            <div
              role="group"
              aria-label={t.projects.filterAria}
              className="inline-flex p-1 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-medium"
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

          {/* Project Cards */}
          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-2xl p-6 sm:p-8 bg-black/[0.02] dark:bg-[#0f1011] border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all group"
                >
                  <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
                    {/* Media Gallery */}
                    {project.mediaLayout === 'portrait-pair' ? (
                      <div className="w-full lg:w-[340px] shrink-0 grid grid-cols-2 gap-2.5">
                        {[
                          { src: project.image, alt: project.title[lang] },
                          { src: project.imageSecondary, alt: `${project.title[lang]} - Detail` },
                        ].map((media) => (
                          <button
                            key={media.src}
                            type="button"
                            onClick={() => setLightboxImage(media)}
                            aria-label={`Zoom ${media.alt}`}
                            className="relative aspect-[9/20] w-full rounded-xl overflow-hidden border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-black/40 group/img cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-[#5e6ad2]"
                          >
                            <Image
                              src={media.src}
                              alt={media.alt}
                              fill
                              sizes="(max-width: 1024px) 50vw, 170px"
                              className="object-contain p-0.5 group-hover/img:scale-[1.03] transition-transform duration-300"
                            />
                            <span className="absolute bottom-2 right-2 p-1.5 rounded-md bg-black/60 text-white opacity-0 group-hover/img:opacity-100 transition-opacity">
                              <ZoomIn size={12} aria-hidden="true" />
                            </span>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="w-full lg:w-[340px] shrink-0 space-y-3">
                        <button
                          type="button"
                          onClick={() => setLightboxImage({ src: project.image, alt: project.title[lang] })}
                          aria-label={`Zoom ${project.title[lang]}`}
                          className="relative aspect-[4/3] w-full rounded-xl overflow-hidden border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-black/40 group/img cursor-zoom-in block focus:outline-none focus:ring-2 focus:ring-[#5e6ad2]"
                        >
                          <Image
                            src={project.image}
                            alt={project.title[lang]}
                            fill
                            sizes="(max-width: 1024px) 100vw, 340px"
                            className="object-contain p-1 group-hover/img:scale-[1.02] transition-transform duration-300"
                          />
                          <span className="absolute bottom-2 right-2 p-1.5 rounded-md bg-black/60 text-white opacity-0 group-hover/img:opacity-100 transition-opacity">
                            <ZoomIn size={13} aria-hidden="true" />
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setLightboxImage({
                              src: project.imageSecondary,
                              alt: `${project.title[lang]} - Detail`,
                            })
                          }
                          aria-label={`Zoom ${project.title[lang]} detail`}
                          className="relative aspect-[4/3] w-full rounded-xl overflow-hidden border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-black/40 opacity-90 hover:opacity-100 group/img cursor-zoom-in block transition-opacity focus:outline-none focus:ring-2 focus:ring-[#5e6ad2]"
                        >
                          <Image
                            src={project.imageSecondary}
                            alt={`${project.title[lang]} - Detail`}
                            fill
                            sizes="(max-width: 1024px) 100vw, 340px"
                            className="object-contain p-1 group-hover/img:scale-[1.02] transition-transform duration-300"
                          />
                          <span className="absolute bottom-2 right-2 p-1.5 rounded-md bg-black/60 text-white opacity-0 group-hover/img:opacity-100 transition-opacity">
                            <ZoomIn size={13} aria-hidden="true" />
                          </span>
                        </button>
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] font-mono tracking-wider text-black/40 dark:text-brand-glow uppercase mb-2">
                        {project.tag[lang]}
                      </div>

                      <h3 className="text-xl sm:text-2xl font-medium tracking-tight mb-3 group-hover:text-indigo-600 dark:group-hover:text-brand-glow transition-colors">
                        {project.title[lang]}
                      </h3>

                      <p className="text-sm text-black/70 dark:text-white/70 leading-relaxed mb-4">
                        {project.desc[lang]}
                      </p>

                      <div className="mb-4 py-2 px-3 rounded-md bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-xs font-mono text-black/60 dark:text-white/60">
                        {project.metrics[lang]}
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.chips.map((chip) => (
                          <span
                            key={chip}
                            className="text-xs font-mono px-2.5 py-1 rounded-md bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-black/70 dark:text-white/70"
                          >
                            {chip}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-3 pt-2">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-medium px-3.5 py-2 rounded-lg bg-[#171717] text-white dark:bg-[#5e6ad2] dark:hover:bg-[#7170ff] hover:bg-black transition-all"
                        >
                          <Code2 size={14} aria-hidden="true" />
                          {t.projects.viewCode}
                          <ArrowUpRight size={13} className="opacity-70" aria-hidden="true" />
                        </a>
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-medium px-3.5 py-2 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black/80 dark:text-white/80 hover:bg-black/10 dark:hover:bg-white/10 transition-all"
                          >
                            {t.projects.livePreview}
                            <ArrowUpRight size={13} className="opacity-70" aria-hidden="true" />
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

        {/* Live Infrastructure Section */}
        <section id="infra" className="mb-20">
          <div className="mb-8">
            <span className="text-xs font-mono uppercase tracking-wider text-black/40 dark:text-brand-glow block mb-1">
              {t.infra.sectionPre}
            </span>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight mb-2">{t.infra.sectionTitle}</h2>
            <p className="text-sm text-black/60 dark:text-white/60 max-w-2xl leading-relaxed">
              {t.infra.sectionDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* 10 Services List */}
            <div className="lg:col-span-7 rounded-2xl bg-black/[0.02] dark:bg-[#0f1011] border border-black/10 dark:border-white/10 p-6 sm:p-7">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <Server size={16} className="text-emerald-500" aria-hidden="true" />
                  <h3 className="text-sm font-medium tracking-tight">Systemd Production Daemons</h3>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  {t.infra.activeServicesBadge}
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
                      <div className="text-[11px] text-black/50 dark:text-white/40 mt-0.5">{s.desc[lang]}</div>
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
                  <h3 className="text-sm font-medium tracking-tight">Tailscale Mesh Nodes</h3>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-brand-glow/10 text-brand-glow border border-brand-glow/20">
                  {t.infra.meshNodesBadge}
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
                        {n.role[lang]}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-black/5 dark:border-white/10">
                <div className="flex items-center gap-2 text-[11px] font-mono text-black/50 dark:text-white/40">
                  <Terminal size={12} aria-hidden="true" />
                  <span>{t.infra.cronSummary}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cloud & MicroVM Fleet Grid */}
          <div className="mt-6 rounded-2xl bg-black/[0.02] dark:bg-[#0f1011] border border-black/10 dark:border-white/10 p-6 sm:p-7">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <div className="flex items-center gap-2.5">
                  <Layers size={17} className="text-brand-glow" aria-hidden="true" />
                  <h3 className="text-base font-medium tracking-tight">{t.infra.fleetTitle}</h3>
                </div>
                <p className="text-xs text-black/50 dark:text-white/40 mt-1 max-w-xl">
                  {t.infra.fleetDesc}
                </p>
              </div>
              <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-brand-glow/10 text-brand-glow border border-brand-glow/20 shrink-0 self-start sm:self-auto font-medium">
                {t.infra.fleetBadge}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cloudFleetNodes.map((node) => (
                <div
                  key={node.id}
                  className="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 hover:border-black/15 dark:hover:border-white/15 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2.5">
                      <div className="flex items-center gap-2 min-w-0">
                        {node.iconType === 'server' && <Server size={15} className="text-emerald-500 shrink-0" aria-hidden="true" />}
                        {node.iconType === 'cpu' && <Cpu size={15} className="text-indigo-400 shrink-0" aria-hidden="true" />}
                        {node.iconType === 'browser' && <Globe size={15} className="text-amber-500 shrink-0" aria-hidden="true" />}
                        {node.iconType === 'terminal' && <Terminal size={15} className="text-cyan-400 shrink-0" aria-hidden="true" />}
                        {node.iconType === 'monitor' && <Monitor size={15} className="text-brand-glow shrink-0" aria-hidden="true" />}
                        {node.iconType === 'box' && <Box size={15} className="text-blue-400 shrink-0" aria-hidden="true" />}
                        <span className="text-xs font-semibold text-black/90 dark:text-white/90 truncate">
                          {node.name}
                        </span>
                      </div>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full inline-flex items-center gap-1.5 shrink-0 ${
                          node.statusType === 'online'
                            ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                            : node.statusType === 'watchdog'
                              ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                              : node.statusType === 'autowake'
                                ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                                : 'bg-black/5 dark:bg-white/5 text-black/50 dark:text-white/40 border border-black/10 dark:border-white/10'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            node.statusType === 'online'
                              ? 'bg-emerald-500 animate-pulse'
                              : node.statusType === 'watchdog'
                                ? 'bg-indigo-400 animate-pulse'
                                : node.statusType === 'autowake'
                                  ? 'bg-amber-500'
                                  : 'bg-black/40 dark:bg-white/40'
                          }`}
                          aria-hidden="true"
                        />
                        {node.statusLabel[lang]}
                      </span>
                    </div>

                    <div className="font-mono text-[11px] text-black/70 dark:text-white/70 mb-1">
                      {node.spec}
                    </div>
                    <div className="text-[10px] font-mono text-black/40 dark:text-white/35 mb-2.5">
                      {node.provider} · {node.os}
                    </div>
                  </div>

                  <p className="text-[11px] text-black/65 dark:text-white/65 leading-relaxed pt-2.5 border-t border-black/5 dark:border-white/5">
                    {node.role[lang]}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* AI Gateway strip */}
          <div className="mt-4 rounded-2xl bg-black/[0.02] dark:bg-[#0f1011] border border-black/10 dark:border-white/10 p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2.5">
                <Cpu size={16} className="text-emerald-500" aria-hidden="true" />
                <h3 className="text-sm font-medium tracking-tight">{t.infra.aiGatewayTitle}</h3>
              </div>
              <span className="text-[11px] font-mono text-black/50 dark:text-white/40">
                {t.infra.aiGatewayDesc}
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
              ].map((textTag) => (
                <span
                  key={textTag}
                  className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-black/60 dark:text-white/60"
                >
                  {textTag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Experience & Education Section */}
        <section id="background" className="mb-20">
          <div className="mb-8">
            <span className="text-xs font-mono uppercase tracking-wider text-black/40 dark:text-brand-glow block mb-1">
              {t.experience.sectionPre}
            </span>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight">{t.experience.sectionTitle}</h2>
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
                    <span className="text-[11px] font-mono text-black/50 dark:text-white/40">{exp.period[lang]}</span>
                  </div>
                  <div className="text-xs font-mono text-black/50 dark:text-white/50 mb-3">{exp.org}</div>
                  <p className="text-sm text-black/70 dark:text-white/70 leading-relaxed">{exp.summary[lang]}</p>
                </div>
              ))}
            </div>

            <div className="lg:col-span-4 rounded-2xl bg-black/[0.02] dark:bg-[#0f1011] border border-black/10 dark:border-white/10 p-6 flex flex-col justify-between gap-6">
              <div>
                <div className="flex items-center gap-2.5 mb-4">
                  <GraduationCap size={18} className="text-emerald-500" aria-hidden="true" />
                  <h3 className="text-base font-medium tracking-tight">{t.experience.educationTitle}</h3>
                </div>
                <div className="text-sm font-medium text-black/90 dark:text-white/90">{t.experience.school}</div>
                <div className="text-xs text-black/60 dark:text-white/50 mt-1">
                  {t.experience.schoolDetail}
                </div>
              </div>

              <div className="pt-5 border-t border-black/5 dark:border-white/10">
                <div className="text-xs text-black/60 dark:text-white/50 mb-3">
                  {t.experience.cvPrompt}
                </div>
                <a
                  href="/CV_Marcelino_M_Turangan.pdf"
                  download="CV_Marcelino_M_Turangan.pdf"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium bg-[#171717] text-white dark:bg-[#5e6ad2] dark:hover:bg-[#7170ff] hover:bg-black transition-all"
                >
                  <Download size={14} aria-hidden="true" />
                  {t.experience.downloadFullCv}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Capabilities Section */}
        <section id="skills" className="mb-20">
          <div className="mb-8">
            <span className="text-xs font-mono uppercase tracking-wider text-black/40 dark:text-brand-glow block mb-1">
              {t.capabilities.sectionPre}
            </span>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight">{t.capabilities.sectionTitle}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {capabilityCards.map((card, idx) => (
              <div
                key={card.title}
                className="p-6 rounded-2xl bg-black/[0.02] dark:bg-[#0f1011] border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center mb-5">
                  {idx === 0 ? (
                    <Cpu size={20} className="text-brand-glow" aria-hidden="true" />
                  ) : idx === 1 ? (
                    <Smartphone size={20} className="text-emerald-500" aria-hidden="true" />
                  ) : (
                    <Server size={20} className="text-blue-500" aria-hidden="true" />
                  )}
                </div>
                <h3 className="text-lg font-medium tracking-tight mb-2">{card.title}</h3>
                <p className="text-xs text-black/60 dark:text-white/60 leading-relaxed mb-4">
                  {card.desc[lang]}
                </p>
                <ul className="space-y-2 text-xs text-black/70 dark:text-white/70 font-mono">
                  {card.items.map((it) => (
                    <li key={it} className="flex items-center gap-2">
                      <span className="text-emerald-500">✓</span> {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Banner */}
        <section
          id="contact"
          className="rounded-2xl p-8 sm:p-12 bg-black/[0.03] dark:bg-[#0f1011] border border-black/10 dark:border-white/10 text-center relative overflow-hidden"
        >
          <div className="max-w-xl mx-auto relative z-10">
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight mb-3">{t.contact.title}</h2>
            <p className="text-sm text-black/60 dark:text-white/60 leading-relaxed mb-6">
              {t.contact.description}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://wa.me/628979360724?text=Halo%20Marcelino,%20saya%20tertarik%20bekerjasama%20untuk%20proyek"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium bg-[#171717] text-white dark:bg-[#5e6ad2] dark:hover:bg-[#7170ff] hover:bg-black transition-all shadow-sm"
              >
                <MessageSquare size={15} aria-hidden="true" />
                {t.contact.chatWa}
              </a>
              <a
                href="/CV_Marcelino_M_Turangan.pdf"
                download="CV_Marcelino_M_Turangan.pdf"
                className="px-4 py-2.5 rounded-lg text-sm font-medium bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black/80 dark:text-white/80 hover:bg-black/10 dark:hover:bg-white/10 transition-all inline-flex items-center gap-2"
              >
                <Download size={15} aria-hidden="true" />
                {t.contact.downloadCv}
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
                {copiedEmail ? t.contact.emailCopied : t.contact.copyEmail}
              </button>
              <span aria-live="polite" className="sr-only">
                {copiedEmail ? t.contact.emailAriaCopied : ''}
              </span>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-black/5 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-black/50 dark:text-white/40 gap-4">
          <div className="flex items-center gap-2.5">
            <div className="relative w-6 h-6 rounded-md overflow-hidden border border-black/10 dark:border-white/15 bg-black shrink-0">
              <Image
                src="/logo.png"
                alt="MT Logo"
                fill
                sizes="24px"
                className="object-cover object-center"
              />
            </div>
            <span>{t.footer.copyright}</span>
          </div>
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

      {/* Image Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 cursor-zoom-out"
            role="dialog"
            aria-modal="true"
            aria-label={lightboxImage.alt}
          >
            <button
              type="button"
              onClick={() => setLightboxImage(null)}
              aria-label="Close image preview"
              className="fixed top-4 right-4 z-[110] p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
            >
              <X size={20} aria-hidden="true" />
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl h-[85vh] cursor-default"
            >
              <Image
                src={lightboxImage.src}
                alt={lightboxImage.alt}
                fill
                sizes="95vw"
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
