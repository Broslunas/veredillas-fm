import type { APIRoute } from 'astro';
import dbConnect from '../../../lib/mongodb';
import ChatMessage from '../../../models/ChatMessage';
import ChatReaction from '../../../models/ChatReaction';
import DeletedMessageLog from '../../../models/DeletedMessageLog';
import ChatBan from '../../../models/ChatBan';
import { getUserFromCookie } from '../../../lib/auth';
import crypto from 'node:crypto';

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
  const { slug } = params;
  if (!slug) return new Response('Slug required', { status: 400 });

  const url = new URL(request.url);
  const since = url.searchParams.get('since');
  
  try {
    await dbConnect();
    
    // Messages Logic
    let query: any = { room: slug };
    if (since) {
        query.createdAt = { $gt: new Date(parseInt(since)) };
    }

    // Optimization: if 'since' is present, we likely don't need the last 50, just the new ones.
    // But if it's the first load (no since), we want last 50.
    let messages;
    if(since) {
        messages = await ChatMessage.find(query).sort({ createdAt: 1 }).lean();
    } else {
        const last50 = await ChatMessage.find({ room: slug }).sort({ createdAt: -1 }).limit(50).lean();
        messages = last50.reverse();
    }

    // Reactions & Deletions Logic
    let reactionCounts = {};
    let deletedIds: string[] = [];

    if (since) {
        const sinceDate = new Date(parseInt(since));
        
        // REACTION AGGREGATION
        const stats = await ChatReaction.aggregate([
            { $match: { room: slug, createdAt: { $gt: sinceDate } } },
            { $group: { _id: "$type", count: { $sum: 1 } } }
        ]);
        
        reactionCounts = stats.reduce((acc, curr) => {
            acc[curr._id] = curr.count;
            return acc;
        }, {} as Record<string, number>);
        
        // DELETED MESSAGES FETCH
        const deletedLogs = await DeletedMessageLog.find({ room: slug, deletedAt: { $gt: sinceDate } }).lean();
        deletedIds = deletedLogs.map(log => log.messageId);
    }

    const serverTime = Date.now();

    return new Response(JSON.stringify({ 
        success: true, 
        messages, 
        reactions: reactionCounts,
        deletedIds,
        timestamp: serverTime 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ success: false, error: 'Failed to fetch messages' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const POST: APIRoute = async ({ params, request }) => {
  const { slug } = params;
  if (!slug) return new Response('Slug required', { status: 400 });

  try {
    const body = await request.json();
    const { message, guestName } = body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return new Response(JSON.stringify({ success: false, error: 'Message empty' }), { status: 400 });
    }

    // Check Auth
    const cookieHeader = request.headers.get('cookie');
    const userPayload = getUserFromCookie(cookieHeader);

    let userField;

    if (userPayload) {
      // Authenticated
      const emailHash = crypto.createHash('md5').update(userPayload.email.trim().toLowerCase()).digest('hex');
      userField = {
        name: userPayload.name,
        userId: userPayload.userId,
        avatar: `https://www.gravatar.com/avatar/${emailHash}?d=retro&s=50`,
        isVerified: true
      };
    } else {
      // Guest
      if (!guestName) {
        return new Response(JSON.stringify({ success: false, error: 'Guest name required' }), { status: 400 });
      }
      userField = {
        name: guestName,
        isVerified: false,
        // Generate random or deterministic avatar based on name
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(guestName)}&background=random`
      };
    }

    await dbConnect();
    
    // Check for Bans
    const potentialBanValues = [userField.userId, userField.name].filter(Boolean);
    const isBanned = await ChatBan.exists({ 
        room: slug, 
        value: { $in: potentialBanValues } 
    });
    
    if (isBanned) {
        return new Response(JSON.stringify({ success: false, error: 'You are banned from this chat' }), { status: 403 });
    }

    const newMessage = await ChatMessage.create({
      room: slug,
      user: userField,
      content: message.trim()
    });

    return new Response(JSON.stringify({ success: true, message: newMessage }), { status: 201 });

  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ success: false, error: 'Failed to post message' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
