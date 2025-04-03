import mongoose from "mongoose";

// Extend globalThis to include mongoose cache
declare global {
  var mongooseCache: { conn: mongoose.Connection | null; promise: Promise<mongoose.Connection> | null };
}

// Ensure global cache is preserved across hot reloads in development
global.mongooseCache = global.mongooseCache || { conn: null, promise: null };

export async function connectDatabase() {
  if (global.mongooseCache.conn) return global.mongooseCache.conn;

  if (!global.mongooseCache.promise) {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    global.mongooseCache.promise = mongoose.connect(process.env.MONGO_URI)
    .then((mongooseInstance) => mongooseInstance.connection);
  }

  global.mongooseCache.conn = await global.mongooseCache.promise;
  return global.mongooseCache.conn;
}