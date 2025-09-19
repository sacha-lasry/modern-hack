"use client"

import { HeroFooter } from "@/components/hero/HeroFooter";
import { HeroSection } from "@/components/hero/HeroSection";
import Cal from "@calcom/embed-react";
import { HeroWaitlist } from "@/components/hero/HeroWaitlist";

export default function Home() {
  return (
    <div className="relative w-full min-h-screen">
      <div className="relative z-10 w-full">
        <HeroSection
          id="waitlist"
          title="Waitlist" 
          description="Join the waitlist to get notified when we launch." 
          content={<HeroWaitlist />}
        />
      </div>
    </div>
  );
};
