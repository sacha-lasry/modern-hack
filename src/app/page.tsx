"use client"

import { HeroNavbar } from "@/components/hero/HeroNavbar";
import { HeroFooter } from "@/components/hero/HeroFooter";
import { HeroSection } from "@/components/hero/HeroSection";
import Cal from "@calcom/embed-react";
import { HeroWaitlist } from "@/components/hero/HeroWaitlist";

export default function Home() {
  return (
    <div className="relative w-full min-h-screen">
      <div className="relative z-10 w-full">
        <HeroNavbar />

        <HeroSection
          id="waitlist"
          title="Waitlist" 
          description="Join the waitlist to get notified when we launch." 
          content={<HeroWaitlist />}
        />

        <HeroSection
          id="intro"
          title="Contact Us" 
          description="Have questions? We would love to hear from you." 
          content={<Cal calLink="sacha-lasry/30min" config={{ theme: "light" }}/>}
        />

        {/* Footer */}
        <HeroFooter />
      </div>
    </div>
  );
};
