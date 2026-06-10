import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Provide a fallback for the API key so the build doesn't break
const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key');

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, interest, message } = body;

    // Basic validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // If no real API key is set, log and return success (Mock Mode)
    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY is not set. Mocking email send for:', { name, email, subject });
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return NextResponse.json({ success: true, mock: true });
    }

    const { data, error } = await resend.emails.send({
      from: 'Sarvadharani Website <onboarding@resend.dev>', // Should be verified domain in production
      to: 'sarvadharaniseeds024@gmail.com',
      replyTo: email,
      subject: `Website Inquiry: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Interest:</strong> ${interest || 'Not specified'}</p>
        <hr />
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, '<br />')}</p>
      `,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
