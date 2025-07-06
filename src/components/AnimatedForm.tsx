'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimatedFormProps {
  children: React.ReactNode;
  className?: string;
  onSubmit?: (e: React.FormEvent) => void;
}

const AnimatedForm: React.FC<AnimatedFormProps> = ({
  children,
  className = '',
  onSubmit,
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
        </motion.form>
      )}
    </AnimatePresence>
  );
};

export default AnimatedForm;
