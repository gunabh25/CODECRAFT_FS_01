/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/db';
import User from '@/lib/models/User';

export async function POST(req: NextRequest) {
  const { token, password } = await req.json();
  if (!token || !password) return NextResponse.json({ error: 'Missing token or password' }, { status: 400 });

  try {
    const decoded = jwt.verify(token, process.env.RESET_PASSWORD_SECRET!) as { userId: string };

    await connectDB();
    const user = await User.findById(decoded.userId);
    if (!user) return NextResponse.json({ error: 'Invalid user' }, { status: 404 });

    user.password = await bcrypt.hash(password, 10);
    await user.save();

    return NextResponse.json({ message: 'Password reset successful' });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
  }
}
