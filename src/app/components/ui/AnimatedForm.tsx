'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Card } from './ui/Card';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { FloatingParticles } from './ui/FloatingParticles';
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';

interface FormField {
  name: string;
  type: string;
  placeholder: string;
  icon: React.ReactNode;
  required?: boolean;
}

interface AnimatedFormProps {
  title: string;
  fields: FormField[];
  onSubmit: (data: Record<string, string>) => Promise<void>;
  submitText: string;
  isLoading?: boolean;
  error?: string;
  children?: React.ReactNode;
}

export const AnimatedForm = ({
  title,
  fields,
  onSubmit,
  submitText,
  isLoading = false,
  error,
  children
}: AnimatedFormProps) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = (fieldName: string) => {
    setShowPassword(prev => ({ ...prev, [fieldName]: !prev[fieldName] }));
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  const fieldVariants = {
    focused: {
      scale: 1.02,
      transition: { duration: 0.2 }
    },
    unfocused: {
      scale: 1,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4 relative overflow-hidden">
      <FloatingParticles />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md relative z-10"
      >
        <motion.div
          variants={itemVariants}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent mb-2">
            {title}
          </h1>
          <p className="text-gray-400">Welcome to the future of authentication</p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="p-8 bg-gray-900/50 backdrop-blur-xl border-gray-800">
            <form onSubmit={handleSubmit} className="space-y-6">
              {fields.map((field, index) => (
                <motion.div
                  key={field.name}
                  variants={fieldVariants}
                  animate={focusedField === field.name ? "focused" : "unfocused"}
                  className="relative"
                >
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-400">{field.icon}</span>
                    </div>
                    
                    <Input
                      type={field.type === 'password' && showPassword[field.name] ? 'text' : field.type}
                      placeholder={field.placeholder}
                      value={formData[field.name] || ''}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      onFocus={() => setFocusedField(field.name)}
                      onBlur={() => setFocusedField(null)}
                      className="pl-10 pr-10 bg-gray-800/50 border-gray-700 focus:border-blue-500 focus:ring-blue-500/20"
                      required={field.required}
                    />
                    
                    {field.type === 'password' && (
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility(field.name)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-200 transition-colors"
                      >
                        {showPassword[field.name] ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    )}
                  </div>
                  
                  {focusedField === field.name && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 origin-left"
                    />
                  )}
                </motion.div>
              ))}

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm"
                >
                  {error}
                </motion.div>
              )}

              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:shadow-lg hover:shadow-blue-500/25"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    submitText
                  )}
                </Button>
              </motion.div>

              {children}
            </form>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};