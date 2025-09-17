import { createAuthClient } from "better-auth/react";
import { convexClient } from "@convex-dev/better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [convexClient()],
});

const signIn = async () => {
  const data = await authClient.signIn.social({
    provider: "google",
  });
};