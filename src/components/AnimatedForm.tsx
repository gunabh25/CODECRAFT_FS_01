// src/components/AnimatedForm.tsx
'use client';

import { ReactNode, useState } from 'react';
import { motion } from 'framer-motion';

interface AnimatedFormProps {
  children: ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  className?: string;
  submitText?: string;
  isLoading?: boolean;
  error?: string;
}

export const AnimatedForm = ({ 
  children, 
  onSubmit, 
  className = '', 
  submitText = 'Submit', 
  isLoading = false, 
  error 
}: AnimatedFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const showLoading = isLoading || isSubmitting;

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`space-y-6 ${className}`}
    >
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg"
        >
          {error}
        </motion.div>
      )}
      
      {children}
      
      <AnimatedButton 
        type="submit" 
        disabled={showLoading}
        className={showLoading ? 'opacity-50 cursor-not-allowed' : ''}
      >
        {showLoading ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <span>Loading...</span>
          </div>
        ) : (
          submitText
        )}
      </AnimatedButton>
    </motion.form>
  );
};

interface AnimatedInputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
}

export const AnimatedInput = ({ 
  type, 
  placeholder, 
  value, 
  onChange, 
  required = false, 
  className = '' 
}: AnimatedInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      className="relative"
      whileFocus={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
          isFocused ? 'border-blue-500 shadow-md' : 'border-gray-300'
        } ${className}`}
      />
      {isFocused && (
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          className="absolute bottom-0 left-0 h-0.5 bg-blue-500"
        />
      )}
    </motion.div>
  );
};

interface AnimatedButtonProps {
  type?: 'button' | 'submit' | 'reset';
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export const AnimatedButton = ({ 
  type = 'submit', 
  children, 
  onClick, 
  disabled = false, 
  className = '' 
}: AnimatedButtonProps) => {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
        disabled 
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
          : 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700'
      } ${className}`}
    >
      {children}
    </motion.button>
  );
};

export default AnimatedForm;