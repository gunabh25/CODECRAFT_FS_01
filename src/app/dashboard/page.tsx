'use client';

import { useAuth } from '@/contexts/AuthContext';
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
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
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

            {/* User Profile Card */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
            >
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className="lg:col-span-1"
              >
                <Card className="p-6 bg-gray-900/50 backdrop-blur-xl border-gray-800 h-full">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <Avatar
                      src=""
                      alt={user?.username || 'User'}
                      fallback={user?.username?.charAt(0).toUpperCase() || 'U'}
                      className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 text-white text-2xl font-bold"
                    />
                    <div>
                      <h3 className="text-xl font-semibold text-white">{user?.username}</h3>
                      <p className="text-gray-400 text-sm">{user?.email}</p>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <Calendar size={16} />
                      <span>Joined {new Date(user?.createdAt || '').toLocaleDateString()}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Stats Cards */}
              <motion.div
                variants={itemVariants}
                className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    variants={cardVariants}
                    whileHover="hover"
                    custom={index}
                  >
                    <Card className="p-4 bg-gray-900/50 backdrop-blur-xl border-gray-800">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-400 text-sm">{stat.label}</p>
                          <p className="text-white font-semibold">{stat.value}</p>
                        </div>
                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <motion.div
                variants={cardVariants}
                whileHover="hover"
              >
                <Card className="p-6 bg-gray-900/50 backdrop-blur-xl border-gray-800">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">Account Settings</h3>
                    <Settings className="w-5 h-5 text-gray-400" />
                  </div>
                  <p className="text-gray-400 text-sm mb-4">
                    Manage your profile, security settings, and preferences
                  </p>
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center text-blue-400 hover:text-blue-300 cursor-pointer"
                  >
                    <span className="text-sm">Open Settings</span>
                    <ChevronRight size={16} className="ml-1" />
                  </motion.div>
                </Card>
              </motion.div>

              <motion.div
                variants={cardVariants}
                whileHover="hover"
              >
                <Card className="p-6 bg-gray-900/50 backdrop-blur-xl border-gray-800">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">Security</h3>
                    <Shield className="w-5 h-5 text-gray-400" />
                  </div>
                  <p className="text-gray-400 text-sm mb-4">
                    View security logs, manage sessions, and update password
                  </p>
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center text-purple-400 hover:text-purple-300 cursor-pointer"
                  >
                    <span className="text-sm">View Security</span>
                    <ChevronRight size={16} className="ml-1" />
                  </motion.div>
                </Card>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </AuthGuard>
  );
}