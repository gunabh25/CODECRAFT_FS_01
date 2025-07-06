'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AnimatedForm } from '@/components/AnimatedForm';
import { Mail, Lock } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const fields = [
    {
      name: 'email',
      type: 'email',
      placeholder: 'Enter your email',
      icon: <Mail size={20} />,
      required: true
    },
    {
      name: 'password',
      type: 'password',
      placeholder: 'Enter your password',
      icon: <Lock size={20} />,
      required: true
    }
  ];

  const handleSubmit = async (data: Record<string, string>) => {
    setIsLoading(true);
    setError('');
    
    try {
      await login(data.email, data.password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatedForm
      title="Welcome Back"
      fields={fields}
      onSubmit={handleSubmit}
      submitText="Sign In"
      isLoading={isLoading}
      error={error}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
          <span>Don't have an account?</span>
          <Link
            href="/register"
            className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
          >
            Sign up
          </Link>
        </div>
        
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
          <span>Forgot your password?</span>
          <Link
            href="/forgot-password"
            className="text-purple-400 hover:text-purple-300 transition-colors font-medium"
          >
            Reset it
          </Link>
        </div>
      </motion.div>
    </AnimatedForm>
  );
}