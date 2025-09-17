import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const applicationTables = {
    users: defineTable({
        name: v.string(),
        email: v.string(),
    }),
}

export default defineSchema({
  ...applicationTables,
});
