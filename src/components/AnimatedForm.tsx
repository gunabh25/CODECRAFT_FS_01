'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
  className?: string;
  onSubmit?: (data: Record<string, string>) => void;
  submitText?: string;
  isLoading?: boolean;
  error?: string;
  children?: React.ReactNode;
}

const AnimatedForm: React.FC<AnimatedFormProps> = ({
  title,
  fields = [],
  className = '',
  onSubmit,
  submitText = 'Submit',
  isLoading = false,
  error = '',
  children
}) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={`space-y-6 max-w-md mx-auto p-6 bg-white shadow-md rounded-md ${className}`}
          onSubmit={handleSubmit}
        >
          {title && (
            <h2 className="text-2xl font-bold text-center text-gray-700">
              {title}
            </h2>
          )}

          {fields.map((field) => (
            <div key={field.name} className="flex items-center border rounded px-3 py-2 space-x-2">
              {field.icon}
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                required={field.required}
                onChange={handleChange}
                className="w-full outline-none"
              />
            </div>
          ))}

          {children}

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

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
