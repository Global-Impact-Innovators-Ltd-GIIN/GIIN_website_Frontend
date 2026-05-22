import { EventCalendar } from "@/components/organisms/leadership/EventCalendar";
import { eventsData } from "@/data/leadership";
import { FooterSection } from "@/components/organisms/home/FooterSection";

export default function EventsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-black">
      <div className="w-full pt-20">
        <EventCalendar 
          title="Global Summits & Events" 
          description="Join us at our exclusive summits, virtual webinars, and global innovation hackathons."
          items={eventsData}
        />
      </div>
      <FooterSection />
    </main>
  );
}
