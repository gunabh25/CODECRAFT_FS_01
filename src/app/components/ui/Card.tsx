'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  children: React.ReactNode;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = false, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          'bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden',
          hover && 'transition-all duration-200 hover:shadow-xl hover:-translate-y-1',
          className
        )}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={hover ? { scale: 1.02 } : {}}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';

const CardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pb-4', className)} {...props} />
  )
);
CardHeader.displayName = 'CardHeader';

const CardTitle = forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn('text-2xl font-bold text-gray-900 dark:text-white', className)} {...props} />
  )
);
CardTitle.displayName = 'CardTitle';

const CardDescription = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-gray-600 dark:text-gray-400', className)} {...props} />
  )
);
CardDescription.displayName = 'CardDescription';

const CardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';

const CardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  )
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };