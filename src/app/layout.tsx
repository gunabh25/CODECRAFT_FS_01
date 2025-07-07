import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/lib/contexts/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SecureAuth - Advanced Authentication System',
  description: 'A modern, secure authentication system with advanced UI/UX',
  keywords: ['authentication', 'nextjs', 'framer-motion', 'security'],
  authors: [{ name: 'SecureAuth Team' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const themeColor = '#000000';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
// This layout wraps the entire application, providing global context and styles.
// It includes metadata for SEO and viewport settings for responsive design.
// The AuthProvider context is used to manage user authentication state across the app.