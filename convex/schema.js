import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const fileType = v.union(
    v.literal("image"),
    v.literal("csv"),
    v.literal("pdf"),
)

export default defineSchema({
    files: defineTable({
        fileId: v.id("_storage"),
        title: v.string(),
        userId: v.string(),
        type: fileType,
    }),
});