import { createPageMetadata } from "@/lib/site";
import PestLibrary from "@/components/PestLibrary/PestLibrary";

export const metadata = createPageMetadata({
  title: "Pest Library | Squito Pest Control",
  description: "Identify and learn about 30+ pest species on Long Island. Expert treatment profiles, warning signs, and prevention tips for Nassau and Suffolk County.",
  path: "/pest-library",
});

export default function PestLibraryPage() {
  return (
    <main className="min-h-screen pt-24 bg-background relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-[700px] h-[500px] bg-green-500/8 blur-[140px] rounded-full pointer-events-none" />
      <PestLibrary />
    </main>
  );
}
