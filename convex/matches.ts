import { action, mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { createAuth, authComponent } from "./auth";
import { getAuthenticatedUserId } from "./utils";

export const getMatchPlayers = query({
  args: {
    matchId: v.optional(v.string()),
    riotPUUID: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let matchPlayers = await ctx.db.query("matchPlayers").collect();
    if (args.matchId) {
      matchPlayers = matchPlayers.filter((matchPlayer) => matchPlayer.matchId === args.matchId);
    }
    if (args.riotPUUID) {
      matchPlayers = matchPlayers.filter((matchPlayer) => matchPlayer.riotPUUID === args.riotPUUID);
    }
    return matchPlayers;
  },
});

export const upsertMatchPlayers = mutation({
  args: {
    riotPUUID: v.string(),
    matchIds: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const matchPlayers = await ctx.db.query("matchPlayers").withIndex("by_riotPUUID", (q) => q.eq("riotPUUID", args.riotPUUID)).collect();
    const newMatchIds = args.matchIds.filter((matchId) => !matchPlayers.some((matchPlayer) => matchPlayer.matchId === matchId));
    for (const matchId of newMatchIds) {
      await ctx.db.insert("matchPlayers", { matchId, riotPUUID: args.riotPUUID });
    }
  },
});
