'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimatedFormProps {
  children: React.ReactNode;
  className?: string;
  onSubmit?: (e: React.FormEvent) => void;
  submitText?: string;
  isLoading?: boolean;
  error?: string;
}

const AnimatedForm: React.FC<AnimatedFormProps> = ({
  children,
  className = '',
  onSubmit,
  submitText = 'Submit',
  isLoading = false,
  error = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={`space-y-6 ${className}`}
          onSubmit={onSubmit}
        >
          {children}

          {/* Error message */}
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-all disabled:opacity-50"
          >
            {isLoading ? 'Loading...' : submitText}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
};

export default AnimatedForm;
