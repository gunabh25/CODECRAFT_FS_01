// src/app/ClientProviders.tsx
'use client';

import { AuthProvider } from '@/lib/contexts/AuthContext';
import { ToastProvider } from '@/components/ui/Toast';

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ToastProvider>{children}</ToastProvider>
    </AuthProvider>
  );
}
