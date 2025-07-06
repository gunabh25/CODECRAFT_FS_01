/* eslint-disable @typescript-eslint/no-unused-vars */
// app/page.tsx
'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { FloatingParticles } from '@/components/ui/FloatingParticles';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { 
  Shield,
  Zap, 
  ArrowRight, 
  CheckCircle,
  Globe,
  Smartphone
} from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const { user } = useAuth();
  const router = useRouter();

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const features = [
    {
      icon: Shield,
      title: 'Advanced Security',
      description: 'Bank-level encryption and multi-factor authentication',
      color: 'text-blue-400'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized performance with instant authentication',
      color: 'text-yellow-400'
    },
    {
      icon: Globe,
      title: 'Global Scale',
      description: 'Built to handle millions of users worldwide',
      color: 'text-green-400'
    },
    {
      icon: Smartphone,
      title: 'Mobile First',
      description: 'Responsive design that works on all devices',
      color: 'text-purple-400'
    }
  ];

  const stats = [
    { value: '99.9%', label: 'Uptime' },
    { value: '2M+', label: 'Users' },
    { value: '256-bit', label: 'Encryption' },
    { value: '<100ms', label: 'Response Time' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      <FloatingParticles />
      
      <div className="relative z-10">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="p-6"
        >
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Shield className="w-8 h-8 text-blue-400" />
              </motion.div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                SecureAuth
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {user ? (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={() => router.push('/dashboard')}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  >
                    Dashboard
                  </Button>
                </motion.div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link href="/login">
                    <Button
                      variant="outline"
                      className="border-gray-700 text-gray-300 hover:bg-gray-800"
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </motion.header>

        {/* Hero Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="px-6 py-20"
        >
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              variants={itemVariants}
              className="mb-8"
            >
              <h2 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-6">
                The Future of
              </h2>
              <h3 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Authentication
              </h3>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Experience next-generation security with our advanced authentication system. 
                Built with cutting-edge technology and designed for the modern web.
              </p>
            </motion.div>

            {!user && (
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12"
              >
                <Link href="/register">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold flex items-center space-x-2"
                    >
                      <span>Start Free Trial</span>
                      <ArrowRight size={20} />
                    </Button>
                  </motion.div>
                </Link>
                <Link href="/login">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-gray-700 text-gray-300 hover:bg-gray-800 px-8 py-4 text-lg font-semibold"
                    >
                      Sign In
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
            )}

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
            >
              {stats.map((stat, _index) => (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="px-6 py-20"
        >
          <div className="max-w-6xl mx-auto">
            <motion.div
              variants={itemVariants}
              className="text-center mb-16"
            >
              <h3 className="text-4xl font-bold text-white mb-4">
                Why Choose SecureAuth?
              </h3>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Built with the latest security standards and modern design principles
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, _index) => (
                <motion.div
                  key={feature.title}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="relative group"
                >
                  <Card className="p-6 bg-gray-900/50 backdrop-blur-xl border-gray-800 h-full group-hover:border-gray-700 transition-all duration-300">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className={`p-3 rounded-full bg-gray-800/50 ${feature.color}`}>
                        <feature.icon size={32} />
                      </div>
                      <h4 className="text-xl font-semibold text-black">{feature.title}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        {!user && (
          <motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="px-6 py-20"
          >
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                variants={itemVariants}
                className="p-8 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl border border-gray-800 backdrop-blur-xl"
              >
                <h3 className="text-3xl font-bold text-white mb-4">
                  Ready to Get Started?
                </h3>
                <p className="text-lg text-gray-400 mb-8">
                  Join thousands of developers who trust SecureAuth for their authentication needs
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link href="/register">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold"
                      >
                        Create Account
                      </Button>
                    </motion.div>
                  </Link>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <CheckCircle size={16} className="text-green-400" />
                    <span>Free forever • No credit card required</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.section>
        )}

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="px-6 py-12 border-t border-gray-800"
        >
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Shield className="w-6 h-6 text-blue-400" />
              <span className="text-lg font-semibold text-white">SecureAuth</span>
            </div>
            <p className="text-gray-400 text-sm">
              © 2025 SecureAuth. Built by Gunabh Sharan.
            </p>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}