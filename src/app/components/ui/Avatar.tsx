'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, fallback, size = 'md', ...props }, ref) => {
    const sizes = {
      sm: 'w-8 h-8 text-xs',
      md: 'w-10 h-10 text-sm',
      lg: 'w-12 h-12 text-base',
      xl: 'w-16 h-16 text-lg',
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          'relative flex items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-white font-medium overflow-hidden',
          sizes[size],
          className
        )}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        whileHover={{ scale: 1.05 }}
        {...props}
      >
        {src ? (
          <img
            src={src}
            alt={alt || 'Avatar'}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="select-none">{fallback}</span>
        )}
      </motion.div>
    );
  }
);

Avatar.displayName = 'Avatar';

export { Avatar };