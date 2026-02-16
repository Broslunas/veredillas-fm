import type { APIRoute } from 'astro';
import mongoose from 'mongoose';
import { getUserFromCookie } from '../../../lib/auth';
import User from '../../../models/User';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    // Get user from token
    const cookieHeader = request.headers.get('cookie');
    const userPayload = getUserFromCookie(cookieHeader);

    if (!userPayload) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Connect to MongoDB
    if (mongoose.connection.readyState !== 1) {
      const MONGODB_URI = import.meta.env.MONGODB_URI;
      if (!MONGODB_URI) {
        throw new Error('MONGODB_URI not configured');
      }
      await mongoose.connect(MONGODB_URI);
    }

    // Get clip ID from body
    const body = await request.json();
    const { clipId } = body; // This is the YouTube video ID

    if (!clipId || typeof clipId !== 'string') {
      return new Response(JSON.stringify({ error: 'Clip ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Find user
    const user = await User.findById(userPayload.userId);

    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Initialize likedClips if not exists
    const currentLikedClips = user.likedClips || [];
    
    // Check if already liked
    const index = currentLikedClips.indexOf(clipId);
    let newLikedClips: string[];
    let isLiked: boolean;

    if (index > -1) {
      // Unlike
      newLikedClips = currentLikedClips.filter(id => id !== clipId);
      isLiked = false;
    } else {
      // Like
      newLikedClips = [...currentLikedClips, clipId];
      isLiked = true;
    }

    // Atomic update
    const updatedUser = await User.findByIdAndUpdate(
      userPayload.userId,
      { $set: { likedClips: newLikedClips } },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error('Failed to update user');
    }

    return new Response(JSON.stringify({ 
      success: true,
      isLiked,
      likedClipsCount: newLikedClips.length
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error toggling clip like:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
