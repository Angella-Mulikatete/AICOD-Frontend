'use server';

import { z } from 'zod';
import { aicodChatbot } from '@/ai/flows/aicod-chatbot-flow';
import { contactFormSchema } from './schemas';

/**
 * Server action to handle contact form submission.
 * In a real app, this would use a service like Resend or Nodemailer to send an email.
 * For this project, it logs the data to the console.
 */
export async function submitContactForm(data: z.infer<typeof contactFormSchema>) {
  try {
    const validatedData = contactFormSchema.parse(data);

    // Simulate sending an email
    console.log('New Contact Form Submission:');
    console.log('Name:', validatedData.name);
    console.log('Email:', validatedData.email);
    console.log('Message:', validatedData.message);

    return { success: true, message: 'Thank you! Your message has been sent successfully.' };
  } catch (error) {
    console.error('Contact form submission error:', error);
    return { success: false, message: 'An error occurred. Please try again later.' };
  }
}


/**
 * Server action to get a response from the AI chatbot.
 * It calls the Genkit flow and returns the response.
 */
export async function getChatbotResponse(message: string, history?: { role: 'user' | 'model'; content: string }[]): Promise<{ success: boolean; response: string }> {
  if (!message || message.trim().length === 0) {
    return { success: false, response: 'Please enter a message.' };
  }

  try {
    const result = await aicodChatbot({ message, history });
    return { success: true, response: result.response };
  } catch (error) {
    console.error('Error getting chatbot response:', error);
    return { success: false, response: 'Sorry, I am unable to respond at the moment. Please try again later.' };
  }
}
