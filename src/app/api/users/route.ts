import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest, isAdmin } from '@/lib/auth';
import User from '@/lib/models/User';
import connectDB from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    if (!isAdmin(user)) {
      return NextResponse.json(
        { error: 'Access denied. Admin role required.' },
        { status: 403 }
      );
    }
    
    await connectDB();
    
    const users = await User.find({})
      .select('-password')
      .sort({ createdAt: -1 });
    
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error('Get users error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}