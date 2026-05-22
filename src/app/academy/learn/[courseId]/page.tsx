import { ImmersivePlayer } from "@/components/organisms/academy/ImmersivePlayer";

interface PageProps {
  params: Promise<{ courseId: string }>;
}

export default async function LearnPage({ params }: PageProps) {
  const { courseId } = await params;
  
  return (
    <div className="w-full">
      <ImmersivePlayer courseId={courseId} />
    </div>
  );
}
