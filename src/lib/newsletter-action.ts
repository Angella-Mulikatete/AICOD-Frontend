'use server';

import nodemailer from 'nodemailer';

/**
 * Server action to handle newsletter subscription via Gmail.
 * It sends an email notification to the site owner about the new subscriber.
 */
export async function subscribeToNewsletter(email: string) {
    if (!email || !email.includes('@')) {
        return { success: false, message: 'Please provide a valid email address.' };
    }

    const gmailUser = process.env.GMAIL_USER;
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

    if (!gmailUser || !clientId || !clientSecret || !refreshToken) {
        console.error('Newsletter Error: Missing OAuth2 environment variables');
        return { success: false, message: 'Server configuration error. Please try again later.' };
    }

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: gmailUser,
                clientId: clientId,
                clientSecret: clientSecret,
                refreshToken: refreshToken,
            },
        });

        const mailOptions = {
            from: gmailUser,
            to: gmailUser, // Send to yourself
            subject: 'New Newsletter Subscriber - AICOD',
            text: `You have a new newsletter subscriber!\n\nEmail: ${email}\n\nDate: ${new Date().toLocaleString()}`,
            html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee;">
          <h2 style="color: #ea580c;">New Newsletter Subscriber</h2>
          <p>You have a new subscriber for the AICOD newsletter.</p>
          <hr />
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        </div>
      `,
        };

        await transporter.sendMail(mailOptions);

        console.log(`Newsletter subscription successful for: ${email}`);
        return { success: true, message: 'Thank you! You have been subscribed successfully.' };
    } catch (error) {
        console.error('Newsletter subscription error:', error);
        return { success: false, message: 'Failed to process subscription. Please try again later.' };
    }
}
