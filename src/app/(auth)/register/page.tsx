'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AnimatedForm } from '@/components/AnimatedForm';
import { User, Mail, Lock } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function RegisterPage() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();

  const fields = [
    {
      name: 'username',
      type: 'text',
      placeholder: 'Choose a username',
      icon: <User size={20} />,
      required: true
    },
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
      placeholder: 'Create a password',
      icon: <Lock size={20} />,
      required: true
    },
    {
      name: 'confirmPassword',
      type: 'password',
      placeholder: 'Confirm your password',
      icon: <Lock size={20} />,
      required: true
    }
  ];

  const handleSubmit = async (data: Record<string, string>) => {
    setIsLoading(true);
    setError('');
    
    // Validate passwords match
    if (data.password !== data.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    // Validate password strength
    if (data.password.length < 8) {
      setError('Password must be at least 8 characters long');
      setIsLoading(false);
      return;
    }

    try {
      await register(data.username, data.email, data.password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatedForm
      title="Create Account"
      fields={fields}
      onSubmit={handleSubmit}
      submitText="Sign Up"
      isLoading={isLoading}
      error={error}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center space-y-4"
      >
        <div className="text-xs text-gray-500 leading-relaxed">
          By creating an account, you agree to our{' '}
          <Link href="/terms" className="text-blue-400 hover:text-blue-300">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="text-blue-400 hover:text-blue-300">
            Privacy Policy
          </Link>
        </div>
        
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
          <span>Already have an account?</span>
          <Link
            href="/login"
            className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
          >
            Sign in
          </Link>
        </div>
      </motion.div>
    </AnimatedForm>
  );
}