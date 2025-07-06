'use client';

import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={path}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -40 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen flex items-center justify-center p-6"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
