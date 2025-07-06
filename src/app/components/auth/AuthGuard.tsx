
'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { LoadingSpinner } from './ui/LoadingSpinner';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireRole?: 'user' | 'admin';
  fallback?: React.ReactNode;
}

export const AuthGuard = ({ 
  children, 
  requireAuth = true, 
  requireRole,
  fallback 
}: AuthGuardProps) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (requireAuth && !user) {
        router.push('/login');
        return;
      }
      
      if (requireRole && user?.role !== requireRole) {
        router.push('/unauthorized');
        return;
      }
    }
  }, [user, loading, requireAuth, requireRole, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (requireAuth && !user) {
    return fallback || null;
  }

  if (requireRole && user?.role !== requireRole) {
    return fallback || null;
  }

  return <>{children}</>;
};