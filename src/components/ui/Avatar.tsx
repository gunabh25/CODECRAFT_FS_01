'use client'

import React from 'react'
import Image from 'next/image'

interface AvatarProps {
  src?: string
  alt?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  fallback?: string
  className?: string
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  size = 'md',
  fallback,
  className = ''
}) => {
  const sizeStyles = {
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg',
    xl: 'h-16 w-16 text-xl'
  }

  const sizePixels = {
    sm: 32,
    md: 40,
    lg: 48,
    xl: 64
  }

  return (
    <div className={`${sizeStyles[size]} rounded-full overflow-hidden bg-gray-200 flex items-center justify-center relative ${className}`}>
      {src ? (
        <Image 
          src={src} 
          alt={alt} 
          width={sizePixels[size]} 
          height={sizePixels[size]} 
          className="object-cover"
        />
      ) : (
        <span className="text-gray-600 font-medium">
          {fallback || alt.charAt(0).toUpperCase()}
        </span>
      )}
    </div>
  )
}

export default Avatar