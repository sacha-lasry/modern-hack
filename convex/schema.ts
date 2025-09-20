import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const applicationTables = {
    users: defineTable({
        name: v.string(),
        email: v.string(),
        riotSummonerName: v.optional(v.string()),
        riotPUUID: v.optional(v.string()),
    }).index("by_email", ["email"]).index("by_name", ["name"]).index("by_riotPUUID", ["riotPUUID"]),

    matchPlayers: defineTable({
        matchId: v.string(),
        riotPUUID: v.string(),
    }).index("by_matchId", ["matchId"]).index("by_riotPUUID", ["riotPUUID"]),

    matches: defineTable({
        matchId: v.string(),
    }).index("by_matchId", ["matchId"]),

    waitlist: defineTable({
        email: v.string(),
    }).index("by_email", ["email"]),
}

export default defineSchema({
  ...applicationTables,
});
