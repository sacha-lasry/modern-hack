import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { createAuth, authComponent } from "./auth";
import { getAuthenticatedUserId } from "./utils";

export const updateUserPassword = mutation({
  args: {
    currentPassword: v.string(),
    newPassword: v.string(),
  },
  handler: async (ctx, args) => {
    await createAuth(ctx).api.changePassword({
      body: {
        currentPassword: args.currentPassword,
        newPassword: args.newPassword,
      },
      headers: await authComponent.getHeaders(ctx),
    });
  },
});

export const addToWaitlist = mutation({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const existingWaitlist = await ctx.db.query("waitlist").withIndex("by_email", (q) => q.eq("email", args.email)).first();
    if (existingWaitlist) {
      return;
    }
    return await ctx.db.insert("waitlist", { email: args.email });
  },
});

export const updateRiotInfo = mutation({
  args: {
    riotPUUID: v.string(),
    riotSummonerName: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthenticatedUserId(ctx);
    return await ctx.db.patch(userId, { riotPUUID: args.riotPUUID, riotSummonerName: args.riotSummonerName });
  },
});

export const getRiotInfo = query({
  handler: async (ctx) => {
      const userId = await getAuthenticatedUserId(ctx);
      const user = await ctx.db.get(userId);
      return {
      riotPUUID: user?.riotPUUID,
      riotSummonerName: user?.riotSummonerName,
      };
  },
});
