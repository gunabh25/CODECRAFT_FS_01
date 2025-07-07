/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError('Please enter your email');
      return;
    }

    try {
      // TODO: Replace this with real API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSent(true);
    } catch (err) {
      setError('Something went wrong. Try again later.');
    }
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="w-full max-w-md p-8 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg text-white"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <motion.h1
          className="text-3xl font-bold text-center mb-6"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Forgot Your Password?
        </motion.h1>

        {isSent ? (
          <motion.p
            className="text-green-400 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            ✅ Reset link sent to your email.
          </motion.p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-white/20 text-white border border-white/20 px-4 py-3 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
              />
              <Mail className="absolute left-3 top-3.5 text-white/50" size={20} />
            </div>

            {error && (
              <motion.p
                className="text-red-400 text-sm text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {error}
              </motion.p>
            )}

            <motion.button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-all"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
            >
              Send Reset Link
            </motion.button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}
