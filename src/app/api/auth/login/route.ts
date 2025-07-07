// src/app/api/auth/login/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { loginSchema } from '@/lib/validations/auth';
import { generateToken } from '@/lib/auth';
import User from '@/lib/models/User';
import connectDB from '@/lib/db';
import { ZodError } from 'zod';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Login body:', body); // ✅ See what data is sent

    const validatedData = loginSchema.parse(body);

    await connectDB();

    const user = await User.findOne({ email: validatedData.email }).select('+password');
    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const isMatch = await user.comparePassword(validatedData.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

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

    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal error' },
      { status: 400 }
    );
  }
}
// This code handles the login route for a Next.js application.
// It validates the incoming request data using a Zod schema, connects to the database,
// checks the user's credentials, generates a JWT token, and sets it as an HTTP-only cookie.
// If validation fails, it returns a 400 error with details. If the user is not found or the password is incorrect,
// it returns a 401 error. On successful login, it returns a 200 response with user details and the token.