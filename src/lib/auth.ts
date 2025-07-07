/* eslint-disable @typescript-eslint/no-unused-vars */
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import User from './models/User';
import connectDB from './db';

const JWT_SECRET = 'process.env.JWT_SECRET';

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  isVerified: boolean;
}

export function generateToken(payload: { userId: string; email: string; role: string }) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (error) {
    return null;
  }
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('auth-token')?.value;

    if (!token) {
      return null;
    }

    const payload = verifyToken(token);
    if (!payload) {
      return null;
    }

    await connectDB();
    const user = await User.findById(payload.userId).select('-password');

    if (!user) {
      return null;
    }

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
    };
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

export async function getUserFromRequest(request: NextRequest): Promise<AuthUser | null> {
  try {
    const token = request.cookies.get('auth-token')?.value;

    if (!token) {
      return null;
    }

    const payload = verifyToken(token);
    if (!payload) {
      return null;
    }

    await connectDB();
    const user = await User.findById(payload.userId).select('-password');

    if (!user) {
      return null;
    }

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
    };
  } catch (error) {
    console.error('Error getting user from request:', error);
    return null;
  }
}

export function isAdmin(user: AuthUser | null): boolean {
  return user?.role === 'admin';
}

export function isAuthenticated(user: AuthUser | null): boolean {
  return user !== null;
}