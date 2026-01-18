import type { APIRoute } from 'astro';
import dbConnect from '../../../../lib/mongodb';
import ChatBan from '../../../../models/ChatBan';
import User from '../../../../models/User';
import { verifyToken } from '../../../../lib/auth';

export const POST: APIRoute = async ({ request, params }) => {
    const { slug } = params;
    if (!slug) return new Response('Slug required', { status: 400 });

    try {
        const token = request.headers.get('cookie')?.split('; ').find(row => row.startsWith('auth-token='))?.split('=')[1];
         // Basic Auth Check
         if (!token) return new Response(JSON.stringify({ success: false, error: 'Unauthorized' }), { status: 401 });
         const payload = verifyToken(token);
         if (!payload) return new Response(JSON.stringify({ success: false, error: 'Invalid Token' }), { status: 401 });
         
         await dbConnect();
         
         // Verify Admin
         const adminUser = await User.findById(payload.userId);
         if (!adminUser || adminUser.role !== 'admin') {
             return new Response(JSON.stringify({ success: false, error: 'Forbidden' }), { status: 403 });
         }

         const body = await request.json();
         const { targetValue, targetType } = body; // targetValue = userId or name

         if (!targetValue || !targetType) {
             return new Response(JSON.stringify({ success: false, error: 'Missing ban details' }), { status: 400 });
         }

         await ChatBan.create({
             room: slug,
             value: targetValue,
             type: targetType
         });

         return new Response(JSON.stringify({ success: true }), { status: 200 });

    } catch (e: any) {
        if(e.code === 11000) {
            // Duplicate key error - already banned
            return new Response(JSON.stringify({ success: true, message: 'Already banned' }), { status: 200 });
        }
        console.error(e);
        return new Response(JSON.stringify({ success: false, error: 'Server Error' }), { status: 500 });
    }
}
