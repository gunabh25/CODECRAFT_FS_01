import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/db';
import User from '@/lib/models/User';
import { sendResetEmail } from '@/lib/email/sendResetEmail';

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email) return NextResponse.json({ error: 'Email is required' }, { status: 400 });

  await connectDB();
  const user = await User.findOne({ email });
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.RESET_PASSWORD_SECRET!,
    { expiresIn: '15m' }
  );

  const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;

  await sendResetEmail(user.email, resetLink);

  return NextResponse.json({ message: 'Reset link sent to email' });
}
