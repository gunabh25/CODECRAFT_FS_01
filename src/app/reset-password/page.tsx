/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!password || !confirmPassword) return setError('All fields are required.');
    if (password !== confirmPassword) return setError('Passwords do not match.');

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setSuccess('Password reset successfully! Redirecting to login...');
      setTimeout(() => router.push('/login'), 3000);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    }
  };

  if (!token) return <p className="text-red-400 text-center mt-20">❌ Invalid or missing token.</p>;

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-black text-white px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg space-y-6"
      >
        <h1 className="text-2xl font-bold text-center">Reset Your Password</h1>

        <input
          type="password"
          placeholder="New Password"
          className="w-full px-4 py-2 rounded bg-white/20 border border-white/30 text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          className="w-full px-4 py-2 rounded bg-white/20 border border-white/30 text-white"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        {success && <p className="text-green-400 text-sm text-center">{success}</p>}

        <motion.button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 transition-colors py-2 rounded font-semibold"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
        >
          Reset Password
        </motion.button>
      </form>
    </motion.div>
  );
}
