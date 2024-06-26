import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { fileType } from "./schema";

export const createFile = mutation({
    args: {
        title: v.string(),
        fileId: v.id("_storage"),
        userId: v.string(),
        type: fileType,
        status: v.boolean()
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("files", {
            title: args.title,
            fileId: args.fileId,
            userId: args.userId,
            type: args.type,
            status: args.status,
        });
    }
});

export const generateUploadUrl = mutation(async (ctx) => {
    return await ctx.storage.generateUploadUrl();
});

export const getFiles = query({
    args: {
        userId: v.string(),
        query: v.optional(v.string()),
        favorites: v.optional(v.boolean()),
        trashes: v.optional(v.boolean()),
    },
    handler: async (ctx, args) => {
        let files = await ctx.db.query("files")
            .filter((q) => q.and(q.eq(q.field("userId"), args.userId), q.eq(q.field("status"), true)))
            .collect();

        if (args.query) {
            const res = files.filter((file) => file.title.toLowerCase().includes(args.query.toLowerCase()));
            return res
        }

        if (args.favorites) {

            const favorites = await ctx.db
                .query("favorites")
                .filter((q) => q.eq(q.field("userId"), args.userId))
                .collect()

            return files.filter((file) => favorites.some((favorite) => favorite.fileId === file.fileId))
        }

        if (args.trashes) {
            const trashes = await ctx.db
                .query("files")
                .filter((q) => q.and(q.eq(q.field("userId"), args.userId), q.eq(q.field("status"), false)))
                .collect()

            return trashes
        }

        return Promise.all(
            files.map(async (file) => {
                const url = await ctx.storage.getUrl(file.fileId);
                return {
                    ...file,
                    url,

                };
            })
        );
    }
});

export const deleteFileById = mutation({
    args: {
        fileId: v.id("files"),
    },
    handler: async (ctx, args) => {
        const file = await ctx.db.get(args.fileId)

        if (!file) {
            console.log("File not found");
        }

        await ctx.db.delete(file._id)
    },
});

export const getFileById = mutation({
    args: {
        fileId: v.id("files"),
    },
    handler: async (ctx, args) => {
        try {
            const file = await ctx.db.get(args.fileId)
            const singleFileId = file.fileId
            const url = await ctx.storage.getUrl(singleFileId)
            return { url, ...file };
        } catch (error) {
            console.error("Error fetching file:", error);
            throw error;
        }
    }
});

export const toggleFavorite = mutation({
    args: {
        userId: v.string(),
        fileId: v.id("files"),
    },
    handler: async (ctx, args) => {
        const file = await ctx.db.get(args.fileId)

        console.log(file);

        if (!file) console.log("file not found");

        const favorite = await ctx.db
            .query("favorites")
            .filter((q) => q.eq(q.field("fileId"), file.fileId))
            .first()

        if (!favorite) {
            await ctx.db.insert("favorites", {
                fileId: file.fileId,
                userId: file.userId,
            })
            return {
                success: true,
                message: "Added to favorites",
                isFavorite: true
            };
        }
        else {
            const favoriteFile = await ctx.db
                .query("favorites")
                .filter((q) => q.eq(q.field("fileId"), file.fileId))
                .collect()

            await ctx.db.delete(favoriteFile[0]._id)
            return {
                success: true,
                message: "Removed from favorites",
                isFavorite: false
            };
        }
    }
});

export const addToTrash = mutation({
    args: {
        userId: v.string(),
        fileId: v.id("files")
    },
    handler: async (ctx, args) => {
        const file = await ctx.db.get(args.fileId)

        if (!file) console.log("file not found");

        const isFileActive = file.status

        if (!isFileActive) {

            await ctx.db.patch(file._id, { status: true })
            return {
                success: true,
                message: "File is moved to Files",
            }
        }

        await ctx.db.patch(file._id, { status: false })

        return {
            success: true,
            message: "File is moved to Trash",
        }


    }
})

