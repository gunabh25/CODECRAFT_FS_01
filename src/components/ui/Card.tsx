'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface CardProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'outlined' | 'elevated'
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  variant = 'default' 
}) => {
  const baseStyles = 'rounded-lg overflow-hidden'
  const variantStyles = {
    default: 'bg-white shadow-md',
    outlined: 'bg-white border border-gray-200',
    elevated: 'bg-white shadow-lg'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </motion.div>
  )
}

export default Card
