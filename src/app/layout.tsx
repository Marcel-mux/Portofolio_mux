import type { Metadata } from 'next';
import { Space_Grotesk, IBM_Plex_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://portofolio-mux-one.vercel.app'),
  title: 'Marcelino M. Turangan: AI Systems, Web/PWA & Linux Ops',
  description:
    'Portofolio Marcelino M. Turangan: agen AI otonom (Hermes Cockpit, Antigravity Discord Gateway, WA/TG bots), aplikasi Web/PWA, dan armada Linux ARM64 di Nusantara (IKN).',
  openGraph: {
    type: 'website',
    title: 'Marcelino M. Turangan: AI Systems, Web/PWA & Linux Ops',
    description:
      'Agen AI otonom, aplikasi Web/PWA, dan infrastruktur Linux self-hosted ARM64 berjalan 24/7 di Nusantara (IKN).',
    images: [
      {
        url: '/projects/system-architecture.png',
        alt: 'Arsitektur Sistem Hybrid Marcelino M. Turangan',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marcelino M. Turangan: AI Systems, Web/PWA & Linux Ops',
    description:
      'Agen AI otonom, aplikasi Web/PWA, dan infrastruktur Linux self-hosted ARM64.',
    images: ['/projects/system-architecture.png'],
  },
};

const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('color-scheme');
    var meta = document.querySelector('meta[name="color-scheme"]');
    var valid = stored === 'dark' || stored === 'light' ? stored : null;
    if (meta) meta.setAttribute('content', valid || 'light dark');
    var isDark = valid ? valid === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.classList.toggle('light', !isDark);
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" data-type="software" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
        <meta name="theme-color" content="#08090a" />
        <meta name="page-type" content="software" />
        <meta name="site-kind" content="software" />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${ibmPlexSans.variable} ${jetbrainsMono.variable} font-sans text-base bg-white text-[#111214] dark:bg-dark-bg dark:text-dark-text min-h-screen selection:bg-[#0066ff]/25`}
      >
        {children}
      </body>
    </html>
  );
}
