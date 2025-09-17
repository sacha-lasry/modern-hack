"use client"

import {
  Authenticated,
  Unauthenticated,
  AuthLoading,
} from "convex/react";
import { PricingTable } from "autumn-js/react";


export default function Home() {
  return (
    <main>
      <Unauthenticated>Logged out</Unauthenticated>
      <Authenticated> Logged in! <PricingTable/></Authenticated>
      <AuthLoading>Loading...</AuthLoading>
    </main>
  );
}
