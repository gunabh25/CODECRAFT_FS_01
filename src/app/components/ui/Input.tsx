'use client';

import { forwardRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  showPasswordToggle?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, type, showPasswordToggle, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const inputType = showPasswordToggle ? (showPassword ? 'text' : 'password') : type;

    return (
      <div className="space-y-2">
        {label && (
          <motion.label
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            {label}
          </motion.label>
        )}
        <div className="relative">
          <motion.input
            ref={ref}
            type={inputType}
            className={cn(
              'w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400',
              error
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500',
              showPasswordToggle && 'pr-12',
              className
            )}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            {...props}
          />
          {showPasswordToggle && (
            <motion.button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              onClick={() => setShowPassword(!showPassword)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </motion.button>
          )}
          {isFocused && (
            <motion.div
              className="absolute inset-0 rounded-xl border-2 border-blue-500 pointer-events-none"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </div>
        {error && (
          <motion.p
            className="text-sm text-red-500 mt-1"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.2 }}
          >
            {error}
          </motion.p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };