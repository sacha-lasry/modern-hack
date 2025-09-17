import { createClient, type GenericCtx, AuthFunctions } from "@convex-dev/better-auth";
import { convex } from "@convex-dev/better-auth/plugins";
import { components, internal } from "./_generated/api";
import { DataModel, Id } from "./_generated/dataModel";
import { query } from "./_generated/server";
import { betterAuth } from "better-auth";

const siteUrl = process.env.SITE_URL!;
const authFunctions: AuthFunctions = internal.auth;
// The component client has methods needed for integrating Convex with Better Auth,
// as well as helper methods for general use.
export const authComponent = createClient<DataModel>(
  components.betterAuth,
  {
    authFunctions,
    triggers: {
      user: {
        onCreate: async (ctx, authUser) => {
          // Any `onCreateUser` logic should be moved here
          const userId = await ctx.db.insert('users', {
            name: authUser.name,
            email: authUser.email,
          })
          // Instead of returning the user id, we set it to the component
          // user table manually. This is no longer required behavior, but
          // is necessary when migrating from previous versions to avoid
          // a required database migration.
          // This helper method exists solely to facilitate this migration.
          await authComponent.setUserId(ctx, authUser._id, userId)
        },
        onUpdate: async (ctx, oldUser, newUser) => {
          // Any `onUpdateUser` logic should be moved here
        },
        onDelete: async (ctx, authUser) => {
          await ctx.db.delete(authUser.userId as Id<'users'>)
        },
      },
    },
  });

export const { onCreate, onUpdate, onDelete } = authComponent.triggersApi() 

export const createAuth = (
  ctx: GenericCtx<DataModel>,
  { optionsOnly } = { optionsOnly: false },
) => {
  return betterAuth({
    // disable logging when createAuth is called just to generate options.
    // this is not required, but there's a lot of noise in logs without it.
    logger: {
      disabled: optionsOnly,
    },
    baseUrl: siteUrl,
    database: authComponent.adapter(ctx),
    account: {
      accountLinking: {
        enabled: true,
        allowDifferentEmails: true,
      },
    },
    // Configure simple, non-verified email/password to get started
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
    },
    plugins: [
      // The Convex plugin is required for Convex compatibility
      convex(),
    ],
    user: {
        deleteUser: { 
            enabled: true
        } 
    },
    socialProviders: {
      google: { 
          clientId: process.env.GOOGLE_CLIENT_ID as string, 
          clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
      },
  },
  });
};

// Example function for getting the current user
// Feel free to edit, omit, etc.
export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const userMetadata = await authComponent.safeGetAuthUser(ctx); 
    if (!userMetadata) {
      return null;
    }
    const user = await ctx.db.get(userMetadata.userId as Id<"users">);
    return {
      ...user,
      ...userMetadata,
    };
  },
});