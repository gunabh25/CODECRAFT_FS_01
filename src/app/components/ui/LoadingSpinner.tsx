'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <motion.div
      className={cn(
        'border-2 border-gray-300 border-t-blue-500 rounded-full',
        sizes[size],
        className
      )}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    />
  );
}