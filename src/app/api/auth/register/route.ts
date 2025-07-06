/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { registerSchema } from '@/lib/validations/auth';
import { generateToken } from '@/lib/auth';
import User from '@/lib/models/User';
import connectDB from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input using Zod
    const validatedData = registerSchema.parse(body);

    await connectDB();

    const existing = await User.findOne({ email: validatedData.email });
    if (existing) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    const newUser = await User.create({
      name: validatedData.name,
      email: validatedData.email,
      password: validatedData.password,
    });

    const token = generateToken({
      userId: newUser._id.toString(),
      email: newUser.email,
      role: newUser.role,
    });

    const response = NextResponse.json(
      {
        message: 'Registration successful',
        user: {
          id: newUser._id.toString(),
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
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
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Invalid input or internal error', details: error?.errors || [] },
      { status: 400 }
    );
  }
}
