import { NextRequest, NextResponse } from 'next/server';
import { loginSchema } from '@/lib/validations/auth';
import { generateToken } from '@/lib/auth';
import User from '@/lib/models/User';
import connectDB from '@/lib/db';


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body
    const validatedData = loginSchema.parse(body);
    
    await connectDB();
    
    // Find user and include password for comparison
    const user = await User.findOne({ email: validatedData.email }).select('+password');
    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }
    
    // Check password
    const isPasswordValid = await user.comparePassword(validatedData.password);
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }
    
    // Generate JWT token
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });
    
    // Create response
    const response = NextResponse.json(
      {
        message: 'Login successful',
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          isVerified: user.isVerified,
        },
      },
      { status: 200 }
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
    console.error('Login error:', error);
    
    if (typeof error === 'object' && error !== null && 'name' in error && (error as any).name === 'ZodError') {
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