'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/contexts/AuthContext';
import AnimatedForm from '@/components/AnimatedForm'; 
import { Mail, Lock } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (data: Record<string, string>) => {
    setIsLoading(true);
    setError('');

    try {
      await login(data.email, data.password);
      // Optionally redirect here after login
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const fields = [
    {
      name: 'email',
      type: 'email',
      placeholder: 'Enter your email',
      icon: <Mail size={20} />,
      required: true,
    },
    {
      name: 'password',
      type: 'password',
      placeholder: 'Enter your password',
      icon: <Lock size={20} />,
      required: true,
    },
  ];

  return (
    <div className="space-y-6">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-center text-white"
      >
        Welcome Back
      </motion.h1>
      
      <AnimatedForm
        onSubmit={handleSubmit}
        fields={fields}
        submitText="Sign In"
        isLoading={isLoading}
        error={error}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center space-y-4 mt-6"
        >
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
            <span>Don&apos;t have an account?</span>
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
    </div>
  );
}
