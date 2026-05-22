import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const runtime = 'edge';

// Define different personas for the GIIN ecosystem
const systemPrompts: Record<string, string> = {
  cyber: 'You are the GIIN SOC Analyst AI. You specialize in analyzing cyber threats, providing incident response strategies, and predicting vulnerabilities in enterprise environments.',
  innovation: 'You are the GIIN Startup Mentor. You specialize in climate tech, EdTech, and MedTech. You provide guidance on fundraising, scaling, and operational efficiency.',
  investor: 'You are the GIIN Investment Analyst. You specialize in analyzing portfolio performance, evaluating pitch decks, and summarizing market trends for venture capitalists.',
  default: 'You are the GIIN Master AI Assistant. You are knowledgeable about the entire Global Impact Innovators Network ecosystem, including cyber defense, innovation, and education.',
};

export async function POST(req: Request) {
  try {
    const { messages, personaId } = await req.json();

    // Select the appropriate persona, fallback to default
    const systemPrompt = systemPrompts[personaId as string] || systemPrompts['default'];

    const result = streamText({
      model: openai('gpt-4o-mini'),
      system: systemPrompt,
      messages,
      temperature: 0.7,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('AI Chat Error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
