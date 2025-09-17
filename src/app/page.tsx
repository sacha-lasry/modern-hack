"use client"

import {
  Authenticated,
  Unauthenticated,
  AuthLoading,
} from "convex/react";


export default function Home() {
  return (
    <main>
      <Unauthenticated>Logged out</Unauthenticated>
      <Authenticated> Logged in!</Authenticated>
      <AuthLoading>Loading...</AuthLoading>
    </main>
  );
}
