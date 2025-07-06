'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface AuthGuardProps {
  children: React.ReactNode
  redirectTo?: string
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ 
  children, 
  redirectTo = '/login' 
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check for authentication token or session
        const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null
        const sessionId = typeof window !== 'undefined' ? localStorage.getItem('session_id') : null
        
        if (!token && !sessionId) {
          setIsAuthenticated(false)
          setIsLoading(false)
          return
        }

        // Verify token/session with your API
        const response = await fetch('/api/auth/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ sessionId }),
        })

        if (response.ok) {
          setIsAuthenticated(true)
        } else {
          setIsAuthenticated(false)
          // Clear invalid tokens
          if (typeof window !== 'undefined') {
            localStorage.removeItem('auth_token')
            localStorage.removeItem('session_id')
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error)
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  useEffect(() => {
    if (isAuthenticated === false && !isLoading) {
      router.push(redirectTo)
    }
  }, [isAuthenticated, isLoading, router, redirectTo])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}

export default AuthGuard