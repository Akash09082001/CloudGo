import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const fileType = v.union(
    v.literal("image"),
    v.literal("csv"),
    v.literal("pdf"),
)

export default defineSchema({
    favorites: defineTable({
        fileId: v.id("_storage"),
        userId: v.string(),
    }),
    files: defineTable({
        fileId: v.id("_storage"),
        title: v.string(),
        type: v.string(),
        userId: v.string(),
    }),
});