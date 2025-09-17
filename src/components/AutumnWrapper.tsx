"use client";
import { AutumnProvider } from "autumn-js/react";
import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";

export function AutumnWrapper({ children }: { children: React.ReactNode }) {
  const convex = useConvex();

  return (
    <AutumnProvider convex={convex} betterAuthUrl={process.env.NEXT_PUBLIC_BETTER_AUTH_URL} convexApi={(api as any).autumn}>
      {children}
    </AutumnProvider>
  );
}
