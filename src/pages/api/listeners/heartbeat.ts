export const prerender = false;

import type { APIRoute } from 'astro';
import dbConnect from '../../../lib/mongodb';
import ActiveListener from '../../../models/ActiveListener';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { sessionId, path, onlyCurrentPath } = await request.json();

    if (!sessionId) {
      return new Response(JSON.stringify({ error: 'Missing sessionId' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    await dbConnect();

    // 1. Update or create the active listener entry
    // We update 'lastSeen' to now
    await ActiveListener.findOneAndUpdate(
      { sessionId },
      { 
        lastSeen: new Date(),
        path: path || '/',
        // We could store IP hash here if we wanted better uniqueness than client-generated ID
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    // 2. Count active listeners
    // If 'onlyCurrentPath' param is true, limit to this path

    const threshold = new Date(Date.now() - 1 * 60 * 1000);
    
    let query: any = { lastSeen: { $gt: threshold } };
    if (onlyCurrentPath && path) {
        query.path = path;
    }

    const count = await ActiveListener.countDocuments(query);

    // 3. Optional: Minimum count to avoid "1 listening" loneliness if site is new
    // For now, we return the real count, but ensure at least 1 (the user themselves)
    const displayCount = Math.max(1, count);

    return new Response(JSON.stringify({ count: displayCount }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Heartbeat Error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error', count: 0 }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
