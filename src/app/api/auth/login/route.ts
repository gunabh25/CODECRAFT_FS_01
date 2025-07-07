/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { loginSchema } from '@/lib/validations/auth';
import { generateToken } from '@/lib/auth';
import User from '@/lib/models/User';
import connectDB from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // ✅ Validate request body
    const validatedData = loginSchema.parse(body);

    // ✅ Connect to MongoDB
    await connectDB();

    // ✅ Find user and include password field explicitly
    const user = await User.findOne({ email: validatedData.email }).select('+password');
    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // ✅ Compare hashed password
    const isMatch = await user.comparePassword(validatedData.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // ✅ Generate JWT token
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    // ✅ Construct secure response
    const response = NextResponse.json(
      {
        message: 'Login successful',
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          username: user.username,
          role: user.role,
          createdAt: user.createdAt,
        },
        token,
      },
      { status: 200 }
    );

    // ✅ Set secure auth token in cookie
    response.cookies.set({
      name: 'auth-token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      {
        error: 'Invalid input or internal error',
        details: (error as any)?.errors || [],
      },
      { status: 400 }
    );
  }
}
