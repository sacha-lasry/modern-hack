import { action, mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { createAuth, authComponent } from "./auth";
import { internal } from "./_generated/api";
import { getAuthenticatedUserId } from "./utils";

export const getMatchPlayers = query({
  args: {
    riotMatchId: v.optional(v.string()),
    riotPUUID: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let matchPlayers = await ctx.db.query("matchPlayers").collect();
    if (args.riotMatchId) {
      matchPlayers = matchPlayers.filter((matchPlayer) => matchPlayer.riotMatchId === args.riotMatchId);
    }
    if (args.riotPUUID) {
      matchPlayers = matchPlayers.filter((matchPlayer) => matchPlayer.riotPUUID === args.riotPUUID);
    }
    return matchPlayers;
  },
});


export const addMatches = mutation({
  args: {
    riotPUUID: v.string(),
    riotMatchId: v.string(),
    matchInfo: v.optional(v.record(v.string(), v.any())),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("matchPlayers", { riotMatchId: args.riotMatchId, riotPUUID: args.riotPUUID });
    await ctx.db.insert("matches", { riotMatchId: args.riotMatchId, matchInfo: args.matchInfo });
  },
});