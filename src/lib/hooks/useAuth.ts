// src/lib/hooks/useAuth.ts
import { useContext } from 'react';
import { AuthContext } from '@/lib/contexts/AuthContext';

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

export default useAuth;