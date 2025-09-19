"use client"

import {
  Authenticated,
  Unauthenticated,
  AuthLoading,
} from "convex/react";
import { PricingTable } from "autumn-js/react";
import { HeroNavbar } from "@/components/hero/HeroNavbar";
import { HeroFooter } from "@/components/hero/HeroFooter";
import { HeroSection } from "@/components/hero/HeroSection";
import { HeroSignInButton } from "@/components/hero/HeroSignInButton";
import Cal from "@calcom/embed-react";

export default function Home() {
  return (
    <div className="relative w-full min-h-screen">
      <div className="relative z-10 w-full">
        <HeroNavbar />
        {/* Hero Section */}

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
