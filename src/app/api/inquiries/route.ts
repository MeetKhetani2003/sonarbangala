import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { getDatabase } from '@/lib/mongodb';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name = 'Valued Guest',
      phone = 'Not provided',
      email = '',
      checkIn = '',
      checkOut = '',
      guests = '2 Adults (Couple)',
      roomType = 'Couple / Duo Executive Room',
      specialRequest = '',
      romanticDecor = false,
      source = 'website_inquiry',
    } = body;

    const createdAt = new Date();

    // 1. Save Inquiry in MongoDB
    let insertedId: string | null = null;
    try {
      const db = await getDatabase();
      const result = await db.collection('inquiries').insertOne({
        name,
        phone,
        email,
        checkIn,
        checkOut,
        guests,
        roomType,
        specialRequest: romanticDecor
          ? `${specialRequest ? specialRequest + ' · ' : ''}Requested Honeymoon / Romantic Bed Decoration (Fresh Rose Petals & Candlelight)`
          : specialRequest,
        romanticDecor: Boolean(romanticDecor),
        source,
        status: 'new',
        createdAt,
      });
      insertedId = result.insertedId.toString();
    } catch (dbErr) {
      console.error('Failed to store inquiry in MongoDB:', dbErr);
      // Non-blocking: proceed with email and WhatsApp delivery
    }

    // 2. Send Notification Email via Gmail SMTP from user's mail to client's mail
    const senderGmail = process.env.GMAIL;
    const appPassword = process.env.APP_PASSWORD?.replace(/\s+/g, '');
    const clientMail = process.env.CLIENT_MAIL;

    let emailSent = false;
    let emailError: string | null = null;

    if (senderGmail && appPassword && clientMail) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: senderGmail,
            pass: appPassword,
          },
        });

        const guestCleanPhone = phone ? phone.replace(/[^\d+]/g, '') : '';
        const guestWhatsAppHref = guestCleanPhone
          ? `https://wa.me/${guestCleanPhone.replace('+', '')}?text=${encodeURIComponent(
              `Hello ${name}, thank you for contacting Hotel Sonar Bangla Calangute Goa! We received your booking inquiry for ${roomType} (${checkIn} to ${checkOut}). We'd love to confirm your stay.`
            )}`
          : '#';

        const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>New Booking Inquiry</title>
</head>
<body style="margin: 0; padding: 24px; background-color: #f6f5f1; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1c1917;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #e7e5e4;">
    <!-- Header Banner -->
    <div style="background-color: #0F2C59; padding: 28px 24px; text-align: center;">
      <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-family: Georgia, serif; letter-spacing: 0.5px;">Hotel Sonar Bangla Goa</h1>
      <p style="margin: 6px 0 0; color: #E5A93C; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">New Direct Guest Inquiry Received</p>
    </div>

    <!-- Content Body -->
    <div style="padding: 24px;">
      <div style="background-color: #fef9ee; border-left: 4px solid #E5A93C; padding: 12px 16px; border-radius: 4px; margin-bottom: 20px;">
        <p style="margin: 0; font-size: 14px; color: #854d0e; font-weight: 600;">
          ⚡ Urgent Guest Lead: Customer submitted direct reservation inquiry on website.
        </p>
      </div>

      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tbody>
          <tr style="border-bottom: 1px solid #f5f5f4;">
            <td style="padding: 10px 0; color: #78716c; width: 140px;">Guest Name:</td>
            <td style="padding: 10px 0; font-weight: 600; color: #0F2C59; font-size: 15px;">${name}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f5f5f4;">
            <td style="padding: 10px 0; color: #78716c;">Phone Number:</td>
            <td style="padding: 10px 0; font-weight: 600; color: #0c0a09;">
              ${phone} ${phone !== 'Not provided' ? `(<a href="tel:${phone}" style="color: #2563eb; text-decoration: none;">Call Now</a>)` : ''}
            </td>
          </tr>
          ${email ? `
          <tr style="border-bottom: 1px solid #f5f5f4;">
            <td style="padding: 10px 0; color: #78716c;">Email:</td>
            <td style="padding: 10px 0; font-weight: 500;"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></td>
          </tr>` : ''}
          <tr style="border-bottom: 1px solid #f5f5f4;">
            <td style="padding: 10px 0; color: #78716c;">Room Preference:</td>
            <td style="padding: 10px 0; font-weight: 600; color: #0F2C59;">${roomType}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f5f5f4;">
            <td style="padding: 10px 0; color: #78716c;">Dates of Stay:</td>
            <td style="padding: 10px 0; font-weight: 600;">${checkIn || 'Flexible'} → ${checkOut || 'Flexible'}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f5f5f4;">
            <td style="padding: 10px 0; color: #78716c;">Total Guests:</td>
            <td style="padding: 10px 0; font-weight: 500;">${guests}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f5f5f4;">
            <td style="padding: 10px 0; color: #78716c;">Romantic Setup:</td>
            <td style="padding: 10px 0; font-weight: 600; color: ${romanticDecor ? '#e11d48' : '#78716c'};">
              ${romanticDecor ? '🌹 Yes, Honeymoon Bed Decoration with Rose Petals & Candlelight' : 'Standard Stay'}
            </td>
          </tr>
          ${specialRequest ? `
          <tr style="border-bottom: 1px solid #f5f5f4;">
            <td style="padding: 10px 0; color: #78716c; vertical-align: top;">Special Requests:</td>
            <td style="padding: 10px 0; font-style: italic; color: #44403c;">&ldquo;${specialRequest}&rdquo;</td>
          </tr>` : ''}
          <tr>
            <td style="padding: 10px 0; color: #78716c;">Source:</td>
            <td style="padding: 10px 0; font-size: 12px; color: #a8a29e;">${source} · ${createdAt.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</td>
          </tr>
        </tbody>
      </table>

      <!-- Quick Action Buttons -->
      <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid #e7e5e4; text-align: center;">
        ${guestCleanPhone ? `
        <a href="${guestWhatsAppHref}" target="_blank" style="display: inline-block; background-color: #25D366; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 14px; padding: 12px 24px; border-radius: 9999px; margin-right: 8px; box-shadow: 0 2px 6px rgba(37,211,102,0.4);">
          💬 Reply Guest on WhatsApp
        </a>` : ''}
        ${phone !== 'Not provided' ? `
        <a href="tel:${phone}" style="display: inline-block; background-color: #0F2C59; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 14px; padding: 12px 20px; border-radius: 9999px;">
          📞 Call Guest Now
        </a>` : ''}
      </div>
    </div>

    <!-- Footer -->
    <div style="background-color: #fafaf9; border-top: 1px solid #e7e5e4; padding: 16px 24px; text-align: center; font-size: 12px; color: #78716c;">
      <p style="margin: 0;">Hotel Sonar Bangla · Calangute Beach, North Goa</p>
      <p style="margin: 4px 0 0; color: #a8a29e;">This lead was sent via Hotel Sonar Bangla's Direct Concierge System.</p>
    </div>
  </div>
</body>
</html>
        `;

        await transporter.sendMail({
          from: `"Hotel Sonar Bangla Goa" <${senderGmail}>`,
          to: clientMail,
          replyTo: email || senderGmail,
          subject: `✨ New Inquiry: ${roomType} · ${name} (${checkIn || 'Dates TBD'})`,
          html: emailHtml,
        });

        emailSent = true;
      } catch (mailErr: any) {
        console.error('Failed to send email via nodemailer:', mailErr);
        emailError = mailErr?.message || 'Email delivery failed';
      }
    } else {
      console.warn('Mail config missing: GMAIL, APP_PASSWORD or CLIENT_MAIL');
    }

    // 3. Generate WhatsApp redirect URL for the user
    const formattedSpecialRequest = [
      specialRequest,
      romanticDecor ? '🌹 Please add Romantic/Honeymoon Bed Decoration (Fresh Rose Petals & Candlelight)' : null,
      name && name !== 'Valued Guest' ? `Guest Name: ${name}` : null,
      phone && phone !== 'Not provided' ? `Contact: ${phone}` : null,
    ]
      .filter(Boolean)
      .join(' · ');

    const whatsappUrl = buildWhatsAppUrl({
      roomType,
      checkIn,
      checkOut,
      guests,
      specialRequest: formattedSpecialRequest,
      source,
    });

    return NextResponse.json({
      success: true,
      emailSent,
      emailError,
      insertedId,
      whatsappUrl,
      message: 'Inquiry processed successfully',
    });
  } catch (error: any) {
    console.error('Error handling inquiry submission:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Server error' },
      { status: 500 }
    );
  }
}

// GET endpoint to fetch inquiries for Admin Panel
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    const db = await getDatabase();
    const query = status && status !== 'all' ? { status } : {};
    const inquiries = await db
      .collection('inquiries')
      .find(query)
      .sort({ createdAt: -1 })
      .limit(100)
      .toArray();

    return NextResponse.json({ success: true, inquiries });
  } catch (error: any) {
    console.error('Error fetching inquiries from MongoDB:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Server error' },
      { status: 500 }
    );
  }
}

// PATCH endpoint to update inquiry status (e.g., mark as 'contacted', 'booked', 'archived')
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status, notes } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Missing inquiry id' }, { status: 400 });
    }

    const { ObjectId } = await import('mongodb');
    const db = await getDatabase();

    const updateFields: Record<string, any> = { updatedAt: new Date() };
    if (status) updateFields.status = status;
    if (notes !== undefined) updateFields.notes = notes;

    await db.collection('inquiries').updateOne(
      { _id: new ObjectId(id) },
      { $set: updateFields }
    );

    return NextResponse.json({ success: true, message: 'Inquiry updated' });
  } catch (error: any) {
    console.error('Error updating inquiry in MongoDB:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Server error' },
      { status: 500 }
    );
  }
}

