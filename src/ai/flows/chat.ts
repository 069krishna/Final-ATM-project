'use server';
/**
 * @fileOverview A simple AI chat flow that simulates an FAQ bot.
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
  return faqBotFlow(input);
}

// A map of keywords to FAQ responses
const faqs: { [key: string]: string } = {
    'budget': 'Budgeting is key to financial health! A great place to start is the 50/30/20 rule: 50% of your income for needs, 30% for wants, and 20% for savings and debt repayment. Try tracking your expenses for a month to see where your money is going.',
    'savings': 'A good savings goal is to have an emergency fund with 3-6 months of living expenses. You can also save for long-term goals like a down payment or retirement. Automating your savings by setting up regular transfers to a separate savings account can be very effective!',
    'investment': 'Investing can help your money grow. Stocks are shares of ownership in a company, while bonds are like loans you give to a government or company. For beginners, a diversified index fund is often recommended as a good starting point. Remember, all investments carry some risk.',
    'credit score': 'Your credit score is a number that shows how reliable you are at paying back debts. It\'s important for getting loans, mortgages, and even some jobs. You can improve it by paying your bills on time, keeping your credit card balances low, and not opening too many new accounts at once.',
    'stocks': 'Stocks represent ownership in a publicly-traded company. When you buy a stock, you\'re buying a small piece of that company. The value of your stock can go up or down based on the company\'s performance and market conditions.',
    'bonds': 'Bonds are a type of loan made by an investor to a borrower (typically corporate or governmental). The borrower agrees to pay interest on the loan and to repay the principal at a later date. They are generally considered less risky than stocks.',
};


// Define the Genkit flow
const faqBotFlow = ai.defineFlow(
  {
    name: 'faqBotFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async ({ prompt }) => {
    const lowerCasePrompt = prompt.toLowerCase();

    // Check if any keyword from our FAQs is in the prompt
    for (const keyword in faqs) {
        if (lowerCasePrompt.includes(keyword)) {
            return faqs[keyword];
        }
    }
    
    // Default response if no keyword is found
    return "I am a simple FAQ bot and can answer questions about budgeting, savings, investment, credit score, stocks, and bonds. Please ask me about one of these topics!";
  }
);
