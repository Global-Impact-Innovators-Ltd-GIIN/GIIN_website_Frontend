import { AIChatInterface } from "@/components/organisms/ai/AIChatInterface";

export default function ChatSessionPage({ params }: { params: { personaId: string } }) {
  return <AIChatInterface personaId={params.personaId} />;
}
