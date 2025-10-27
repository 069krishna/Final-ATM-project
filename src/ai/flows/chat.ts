'use server';
/**
 * @fileOverview A simple AI chat flow.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Define the schema for a single chat message
const ChatMessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});
export type ChatMessage = z.infer<typeof ChatMessageSchema>;

// Define the input schema for the chat flow
const ChatInputSchema = z.object({
  history: z.array(ChatMessageSchema),
  prompt: z.string(),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

// Define the output schema for the chat flow (a simple string response)
const ChatOutputSchema = z.string();
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

// The main exported function that clients will call
export async function chat(input: ChatInput): Promise<ChatOutput> {
  return financialChatFlow(input);
}

// Define the Genkit flow
const financialChatFlow = ai.defineFlow(
  {
    name: 'financialChatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async ({ history, prompt }) => {
    // Map the history to the format expected by the generate call
    const mappedHistory = history.map((msg) => ({
        role: msg.role,
        content: [{ text: msg.content }],
    }));

    // Generate a response using the model
    const llmResponse = await ai.generate({
      // Prepend a system prompt to give the AI its persona
      system: 'You are a helpful and friendly financial assistant. Your name is Fin. You provide clear, concise, and easy-to-understand explanations of financial topics. Do not provide investment advice.',
      history: mappedHistory,
      prompt: prompt,
    });

    return llmResponse.text;
  }
);
