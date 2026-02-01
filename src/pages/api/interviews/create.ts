import type { APIRoute } from 'astro';
import dbConnect from '../../../lib/mongodb';
import InterviewRequest from '../../../models/InterviewRequest';
export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { name, email, topic, description, preferredDate } = data;

    // Validation
    const missingFields = [];
    if (!name) missingFields.push('nombre');
    if (!email) missingFields.push('email');
    if (!topic) missingFields.push('tema');

    if (missingFields.length > 0) {
      return new Response(
        JSON.stringify({ message: `Faltan campos obligatorios: ${missingFields.join(', ')}` }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Connect to DB
    await dbConnect();

    // Create Request
    const newRequest = await InterviewRequest.create({
      name,
      email,
      topic,
      description,
      preferredDate: preferredDate ? new Date(preferredDate) : undefined,
      status: 'pending'
    });

    // Send to n8n Webhook
    // We use a specific webhook for interviews or a generic one if configured
    const webhookUrl = "https://n8n.broslunas.com/webhook/veredillasfm-interview";
    // We reuse the CONTACT_WEBHOOK_SECRET if available, or just send without auth if that's how n8n is set up. 
    // Looking at contact.ts, it uses 'Authorization': `Bearer ${secret}`.
    // I will use importance of environment variable.
    const secret = import.meta.env.CONTACT_WEBHOOK_SECRET;

    if (webhookUrl && secret) {
        try {
            await fetch(webhookUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${secret}`
                },
                body: JSON.stringify({
                    requestId: newRequest._id,
                    name,
                    email,
                    topic,
                    description,
                    preferredDate,
                    timestamp: new Date().toISOString()
                })
            });
        } catch (webhookError) {
            console.error("Failed to send to n8n:", webhookError);
            // We don't fail the request if webhook fails, since we saved to DB.
        }
    }

    return new Response(
      JSON.stringify({ message: "Solicitud enviada correctamente", id: newRequest._id }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error("Server error:", error);
    return new Response(
      JSON.stringify({ message: "Error interno del servidor." }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
