import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest, isAdmin } from '@/lib/auth';
import User from '@/lib/models/User';
import connectDB from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getUserFromRequest(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    // Users can only view their own profile, admins can view any profile
    if (user.id !== params.id && !isAdmin(user)) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }
    
    await connectDB();
    
    const targetUser = await User.findById(params.id).select('-password');
    
    if (!targetUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ user: targetUser }, { status: 200 });
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getUserFromRequest(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    // Users can only update their own profile, admins can update any profile
    if (user.id !== params.id && !isAdmin(user)) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }
    
    const body = await request.json();
    const { name, email, role } = body;
    
    await connectDB();
    
    const updateData: any = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    
    // Only admins can update roles
    if (role && isAdmin(user)) {
      updateData.role = role;
    }
    
    const updatedUser = await User.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!updatedUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { message: 'User updated successfully', user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error('Update user error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getUserFromRequest(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    // Only admins can delete users
    if (!isAdmin(user)) {
      return NextResponse.json(
        { error: 'Access denied. Admin role required.' },
        { status: 403 }
      );
    }
    
    await connectDB();
    
    const deletedUser = await User.findByIdAndDelete(params.id);
    
    if (!deletedUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { message: 'User deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete user error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}