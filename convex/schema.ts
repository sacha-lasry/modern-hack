import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const applicationTables = {
    users: defineTable({
        name: v.string(),
        email: v.string(),
        riotSummonerName: v.optional(v.string()),
        riotPUUID: v.optional(v.string()),
    }).index("by_email", ["email"]).index("by_name", ["name"]).index("by_riotPUUID", ["riotPUUID"]),
    waitlist: defineTable({
        email: v.string(),
    }).index("by_email", ["email"]),
}

export default defineSchema({
  ...applicationTables,
});
