/* eslint-disable no-var */

import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('❌ Please define the MONGODB_URI environment variable in .env.local');
}

// Global cache interface
interface MongooseGlobalCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  // Avoid duplicate declaration errors
  // eslint-disable-next-line no-var
  var mongooseGlobal: MongooseGlobalCache | undefined;
}

// ✅ Always initialize (inline), so TS knows it's defined
const cached: MongooseGlobalCache = global.mongooseGlobal ??= {
  conn: null,
  promise: null,
};

async function connectDB(): Promise<Mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    console.log('📡 Connecting to MongoDB with URI:', MONGODB_URI);

    cached.promise = mongoose.connect(MONGODB_URI!, opts);
  }

  try {
    cached.conn = await cached.promise;
    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    cached.promise = null;
    console.error('❌ MongoDB connection failed:', err);
    throw err;
  }

  return cached.conn;
}

export default connectDB;
