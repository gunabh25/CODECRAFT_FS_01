'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ToastProps {
  id: string;
  title?: string;
  description?: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  onClose: (id: string) => void;
}

export function Toast({ id, title, description, type = 'info', duration = 5000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose(id), 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info,
    warning: AlertTriangle,
  };

  const colors = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  };

  const Icon = icons[type];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className={cn(
            'max-w-md w-full bg-white shadow-lg rounded-xl border-l-4 p-4',
            colors[type]
          )}
        >
          <div className="flex items-start">
            <Icon className="w-5 h-5 mt-0.5 mr-3 flex-shrink-0" />
            <div className="flex-1">
              {title && (
                <h4 className="font-medium text-sm">{title}</h4>
              )}
              {description && (
                <p className="text-sm opacity-90 mt-1">{description}</p>
              )}
            </div>
            <button
              onClick={() => {
                setIsVisible(false);
                setTimeout(() => onClose(id), 300);
              }}
              className="ml-3 flex-shrink-0 text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
