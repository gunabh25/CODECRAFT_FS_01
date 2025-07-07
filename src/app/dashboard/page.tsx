/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useAuth } from '@/lib/contexts/AuthContext';
import { AuthGuard } from '@/components/AuthGuard';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { FloatingParticles } from '@/components/ui/FloatingParticles';
import {
  Calendar,
  Shield,
  Settings,
  LogOut,
  Activity,
  Clock,
  ChevronRight
} from 'lucide-react';

export default function DashboardPage() {
  const { user, logout } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 }
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  };

  const stats = [
    { label: 'Active Sessions', value: '2', icon: Activity, color: 'text-green-400' },
    { label: 'Last Login', value: '2 hours ago', icon: Clock, color: 'text-blue-400' },
    { label: 'Account Type', value: user?.role || 'user', icon: Shield, color: 'text-purple-400' },
  ];

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        <FloatingParticles />

        <div className="relative z-10 p-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-6xl mx-auto"
          >
            {/* Header */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-between mb-8"
            >
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                  Welcome back, {user?.username}!
                </h1>
                <p className="text-gray-400 mt-2">Manage your account and explore your dashboard</p>
              </div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={logout}
                  variant="outline"
                  className="flex items-center space-x-2 bg-gray-800/50 border-gray-700 hover:bg-red-600 hover:border-red-600 transition-all duration-300"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </Button>
              </motion.div>
            </motion.div>

            {/* Remaining UI same as before */}
            {/* Keep the rest of your component unchanged */}
          </motion.div>
        </div>
      </div>
    </AuthGuard>
  );
}
