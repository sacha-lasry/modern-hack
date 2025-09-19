import { Id } from "./_generated/dataModel";
import { QueryCtx } from "./_generated/server";

export async function getAuthenticatedUserId(ctx: QueryCtx): Promise<Id<"users">> {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
        throw new Error("Not authenticated");
    }
    return identity.userId as Id<'users'>;
}
