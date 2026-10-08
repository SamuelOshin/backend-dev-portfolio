import { HeroSection } from "./components/sections/HeroSection";
import { SystemsSection } from "./components/sections/SystemsSection";
import { ProjectsSection } from "./components/sections/ProjectsSection";
import { ClientBuildsSection } from "./components/sections/ClientBuildsSection";
import { ExperienceSection } from "./components/sections/ExperienceSection";
import { SkillsSection } from "./components/sections/SkillsSection";
import { WritingSection } from "./components/sections/WritingSection";
import { ContactSection } from "./components/sections/ContactSection";
import { getAllPosts } from "@/lib/blog";

export default function Home() {
  const posts = getAllPosts().slice(0, 4);

  return (
    <main className="relative min-h-[100dvh] px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      <div aria-hidden className="backdrop-grid pointer-events-none absolute inset-x-0 top-0 h-[900px]" />
      <div className="relative w-full max-w-6xl mx-auto">
        <HeroSection />
        <SystemsSection />
        <ProjectsSection />
        <ClientBuildsSection />
        <ExperienceSection />
        <SkillsSection />
        <WritingSection posts={posts} />
        <ContactSection />
      </div>
    </main>
  );
}
