import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const applicationTables = {
    users: defineTable({
        name: v.string(),
        email: v.string(),
    }).index("by_email", ["email"]).index("by_name", ["name"]),
}

export default defineSchema({
  ...applicationTables,
});
