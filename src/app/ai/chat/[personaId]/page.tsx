import { AIChatInterface } from "@/components/organisms/ai/AIChatInterface";

export default async function ChatSessionPage({ params }: { params: Promise<{ personaId: string }> }) {
  const resolvedParams = await params;
  return <AIChatInterface personaId={resolvedParams.personaId} />;
}

