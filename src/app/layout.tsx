// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { AuthProvider } from '@/contexts/AuthContext';
import { ToastProvider } from '@/components/ui/Toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SecureAuth - Advanced Authentication System',
  description: 'A modern, secure authentication system with advanced UI/UX',
  keywords: ['authentication', 'nextjs', 'framer-motion', 'security'],
  authors: [{ name: 'SecureAuth Team' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
