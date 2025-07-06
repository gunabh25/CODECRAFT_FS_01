'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/contexts/AuthContext';
import AnimatedForm from '@/components/AnimatedForm';
import { User, Mail, Lock } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ModalWrapper from 'src/components/ModalWrapper'; // ✅ modal component

export default function RegisterPage() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true); // ✅ modal state
  const [success, setSuccess] = useState(false); // ✅ success animation
  const { register } = useAuth();

  const fields = [
    {
      name: 'username',
      type: 'text',
      placeholder: 'Choose a username',
      icon: <User size={20} />,
      required: true,
    },
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
      placeholder: 'Create a password',
      icon: <Lock size={20} />,
      required: true,
    },
    {
      name: 'confirmPassword',
      type: 'password',
      placeholder: 'Confirm your password',
      icon: <Lock size={20} />,
      required: true,
    },
  ];

  const handleSubmit = async (data: Record<string, string>) => {
    setIsLoading(true);
    setError('');

    if (data.password !== data.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (!data.password || data.password.length < 8) {
      setError('Password must be at least 8 characters long');
      setIsLoading(false);
      return;
    }

    try {
      await register(data.username, data.email, data.password);
      setSuccess(true); // ✅ trigger success animation
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Show nothing if modal is closed
  if (!isOpen) return null;

  return (
    <ModalWrapper isOpen={isOpen} onClose={() => setIsOpen(false)}>
      {success ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center justify-center space-y-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1.2 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="text-green-500 text-5xl"
          >
            ✅
          </motion.div>
          <h2 className="text-xl font-semibold text-green-600">
            Account created successfully!
          </h2>
          <Link
            href="/login"
            className="text-blue-500 underline text-sm hover:text-blue-400"
          >
            Go to Login
          </Link>
        </motion.div>
      ) : (
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
              <Link
                href="/privacy"
                className="text-blue-400 hover:text-blue-300"
              >
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
      )}
    </ModalWrapper>
  );
}
