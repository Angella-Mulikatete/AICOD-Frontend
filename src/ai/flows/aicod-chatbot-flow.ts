'use server';

/**
 * @fileOverview An AI chatbot for quick interaction on the 'Contact Us' page.
 *
 * - aicodChatbot - A function that handles the chatbot interaction.
 * - AICODChatbotInput - The input type for the aicodChatbot function.
 * - AICODChatbotOutput - The return type for the aicodChatbot function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AICODChatbotInputSchema = z.object({
  message: z.string().describe('The user message to the chatbot.'),
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
  })).optional().describe('The conversation history.'),
});
export type AICODChatbotInput = z.infer<typeof AICODChatbotInputSchema>;

const AICODChatbotOutputSchema = z.object({
  response: z.string().describe('The chatbot response to the user message.'),
});
export type AICODChatbotOutput = z.infer<typeof AICODChatbotOutputSchema>;

export async function aicodChatbot(input: AICODChatbotInput): Promise<AICODChatbotOutput> {
  return aicodChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aicodChatbotPrompt',
  input: {
    schema: z.object({
      message: z.string(),
      historyString: z.string(),
    })
  },
  output: { schema: AICODChatbotOutputSchema },
  prompt: `You are a helpful AI chatbot for the Albertine Institute For Community Development (AICOD). AICOD focuses on Biodiversity, Human Rights, and Community & Livelihood.

  Conversation history:
  {{historyString}}

  Respond to the following user message:
  {{message}}
  `,
});

const aicodChatbotFlow = ai.defineFlow(
  {
    name: 'aicodChatbotFlow',
    inputSchema: AICODChatbotInputSchema,
    outputSchema: AICODChatbotOutputSchema,
  },
  async input => {
    const historyString = input.history && input.history.length > 0
      ? input.history.map(m => `${m.role}: ${m.content}`).join('\n')
      : 'No previous messages.';

    const { output } = await prompt({
      message: input.message,
      historyString: historyString
    });
    return output!;
  }
);
