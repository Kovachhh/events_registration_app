/** @type {import('next').NextConfig} */
import mongoose from 'mongoose';

let cachedConnection = null;

export async function connectMongoDB() {
  if (cachedConnection) {
    console.log('Using cached db connection');
    return cachedConnection;
  }
  try {
    const cnx = await mongoose.connect(process.env.MONGODB_URI);
    cachedConnection = cnx.connection;
    console.log('New mongodb connection established');

    return cachedConnection;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

connectMongoDB();

const nextConfig = {
  reactStrictMode: false,
};

export default nextConfig;
