"use client";

import React from "react";
import { HeroSection } from "./components/sections/HeroSection";
import { ExperienceSection } from "./components/sections/ExperienceSection";
import { SkillsSection } from "./components/sections/SkillsSection";
import { ProjectsSection } from "./components/sections/ProjectsSection";
import { ContactSection } from "./components/sections/ContactSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-4 sm:px-6 lg:px-8 pb-8 overflow-hidden">
      <div className="w-full max-w-6xl mx-auto">
        <HeroSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </div>
    </main>
  );
}