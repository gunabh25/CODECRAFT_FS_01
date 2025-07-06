'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Field {
  name: string;
  type: string;
  placeholder: string;
  icon?: React.ReactNode;
  required?: boolean;
}

interface AnimatedFormProps {
  title?: string;
  fields?: Field[];
  onSubmit: (data: Record<string, string>) => Promise<void>;
  className?: string;
  submitText?: string;
  isLoading?: boolean;
  error?: string;
  children?: React.ReactNode;
}

const AnimatedForm: React.FC<AnimatedFormProps> = ({
  title,
  fields = [],
  onSubmit,
  className = '',
  submitText = 'Submit',
  isLoading = false,
  error,
  children,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const data: Record<string, string> = Object.fromEntries(formData.entries()) as Record<string, string>;

    try {
      await onSubmit(data);
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
      className={`w-full max-w-md bg-white p-6 rounded-lg shadow-lg space-y-6 ${className}`}
    >
      {title && (
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-xl font-semibold text-center"
        >
          {title}
        </motion.h2>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm"
        >
          {error}
        </motion.div>
      )}

      {fields.map((field) => (
        <AnimatedInput
          key={field.name}
          type={field.type}
          placeholder={field.placeholder}
          name={field.name}
          required={field.required}
          icon={field.icon}
        />
      ))}

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
  name: string;
  required?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export const AnimatedInput: React.FC<AnimatedInputProps> = ({
  type,
  placeholder,
  name,
  required = false,
  icon,
  className = '',
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      className="relative flex items-center"
      whileFocus={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {icon && <span className="absolute left-3 text-gray-400">{icon}</span>}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`w-full px-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
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
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  type = 'submit',
  children,
  onClick,
  disabled = false,
  className = '',
}) => {
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
