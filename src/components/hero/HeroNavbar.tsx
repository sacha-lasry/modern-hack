"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { HeroSignInButton } from "@/components/hero/HeroSignInButton";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import Link from "next/link";

const HeroNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // const scrollToSection = (sectionId: string) => {
  //   document.getElementById(sectionId)?.scrollIntoView({ 
  //     behavior: 'smooth' 
  //   });
  // };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-4 sm:px-6 lg:px-8">
      <div className={cn(
        "max-w-6xl mx-auto transition-all duration-300 ease-in-out",
        isScrolled 
          ? "max-w-5xl mt-4 rounded-4xl bg-background/10 backdrop-blur-md shadow-lg" 
          : "bg-transparent"
      )}>
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/">LEAGUE AI COACH</Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Authenticated><Link href="/chat">Chat</Link></Authenticated>
            <ThemeToggle />
            <HeroSignInButton buttonText="Sign In" />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <HeroSignInButton buttonText="Sign In" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export { HeroNavbar };