/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/lib/models/User';
import bcrypt from 'bcryptjs';

const RESET_TOKEN_SECRET = process.env.RESET_TOKEN_SECRET || 'temp_secret';

const tokens: Record<string, string> = {}; // In-memory store (replace with Redis in prod)

export async function POST(req: NextRequest) {
  const { token, password } = await req.json();
  if (!token || !password) {
    return NextResponse.json({ error: 'Missing token or password' }, { status: 400 });
  }

  const email = tokens[token]; // Lookup email from token
  if (!email) {
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
  }

  await connectDB();
  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  user.password = await bcrypt.hash(password, 10);
  await user.save();

  delete tokens[token]; // Invalidate token

  return NextResponse.json({ message: 'Password reset successful' });
}

export function createResetToken(email: string): string {
  const token = Math.random().toString(36).substring(2);
  tokens[token] = email;
  setTimeout(() => delete tokens[token], 1000 * 60 * 10); // expire in 10 mins
  return token;
}
