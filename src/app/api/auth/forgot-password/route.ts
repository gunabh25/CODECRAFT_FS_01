import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/lib/models/User';
import { createResetToken } from '../reset-password/route';

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email) return NextResponse.json({ error: 'Email is required' }, { status: 400 });

  await connectDB();
  const user = await User.findOne({ email });
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  const token = createResetToken(email);
  const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;

  // ✅ Simulate sending email (print to console)
  console.log(`📧 Reset link for ${email}: ${resetUrl}`);

  return NextResponse.json({ message: 'Reset link sent (check console)' });
}
