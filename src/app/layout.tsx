import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Marcelino M. Turangan — AI Systems Integrator, Full-Stack Web/PWA & Linux Ops',
  description:
    'Portofolio Marcelino M. Turangan: Pengembang sistem AI otonom (Hermes Cockpit, Antigravity Discord Gateway, WA/TG bots), full-stack Next.js/PWA, dan infrastruktur Linux ARM64 di Nusantara (IKN).',
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
    <html lang="id" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-white text-[#171717] dark:bg-dark-bg dark:text-dark-text min-h-screen selection:bg-brand-indigo/30`}
      >
        {children}
      </body>
    </html>
  );
}
