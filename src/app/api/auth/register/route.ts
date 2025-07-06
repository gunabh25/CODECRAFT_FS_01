/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextRequest, NextResponse } from 'next/server';
import { registerSchema } from 'src/lib/validations/auth';
import { generateToken } from 'src/lib/auth';
import User from 'src/lib/models/User';
import connectDB from 'src/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body
    const validatedData = registerSchema.parse(body);
    
    await connectDB();
    
    // Check if user already exists
    const existingUser = await User.findOne({ email: validatedData.email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists with this email' },
        { status: 400 }
      );
    }
    
    // Create new user
    const user = await User.create({
      name: validatedData.name,
      email: validatedData.email,
      password: validatedData.password,
    });
    
    // Generate JWT token
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });
    
    // Create response
    const response = NextResponse.json(
      {
        message: 'User registered successfully',
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          isVerified: user.isVerified,
        },
      },
      { status: 201 }
    );
    
    // Set HTTP-only cookie
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
    console.error('Registration error:', error);
    
    if (error && typeof error === 'object' && 'name' in error && (error as any).name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid input data', details: (error as any).errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}