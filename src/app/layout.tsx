import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ClientProviders } from './ClientProviders'; 

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SecureAuth - Advanced Authentication System',
  description: 'A modern, secure authentication system with advanced UI/UX',
  keywords: ['authentication', 'nextjs', 'framer-motion', 'security'],
  authors: [{ name: 'SecureAuth Team' }],
};

// ✅ Move viewport out of metadata
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

// ✅ Move themeColor out of metadata
export const themeColor = '#000000';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
