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
  title: 'Marcel / Ndrong — AI Systems Integrator & Full-Stack Builder',
  description: 'Portofolio Marcel: Pengembang sistem AI otonom, bot WhatsApp bisnis, full-stack Next.js, dan infrastruktur Linux mandiri di Nusantara (IKN).',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="dark scroll-smooth">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-dark-bg text-dark-text dark:bg-dark-bg dark:text-dark-text min-h-screen selection:bg-brand-indigo/30`}>
        {children}
      </body>
    </html>
  );
}
