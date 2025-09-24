"use node";

import { action, internalAction } from "./_generated/server";
import { v } from "convex/values";
import { RiotApi, Constants, LolApi } from 'twisted'
import { Id } from "./_generated/dataModel";

export const getAccount = action({
    args: {
        summonerName: v.string(),
    },
    handler: async (_, args) => {
        const rApi = new RiotApi(process.env.RIOT_API_KEY as string)
        const account = await rApi.Account.getByRiotId(args.summonerName, "EUW", Constants.RegionGroups.EUROPE);
        return account.response;
    },
});


export const getRiotMatchIds = action({
    args: {
        PUUID: v.string(),
    },
    handler: async (_, args) => {
        const lApi = new LolApi(process.env.RIOT_API_KEY as string)
        const matches = await lApi.MatchV5.list(args.PUUID, Constants.RegionGroups.EUROPE);
        return matches.response;
    },
});


export const getMatchInfo = action({
    args: {
        riotMatchId: v.string(),
    },
    handler: async (ctx, args) => {
        const lApi = new LolApi(process.env.RIOT_API_KEY as string)
        const matchInfo = await lApi.MatchV5.get(args.riotMatchId, Constants.RegionGroups.EUROPE);
        // Convert the response to a blob explicitly
        const jsonString = JSON.stringify(matchInfo.response);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const storageId: Id<"_storage"> = await ctx.storage.store(blob);
        return storageId;
    },
});

export const getMatchTimeline = action({
    args: {
        riotMatchId: v.string(),
    },
    handler: async (ctx, args) => {
        const lApi = new LolApi(process.env.RIOT_API_KEY as string)
        const matchTimeline = await lApi.MatchV5.timeline(args.riotMatchId, Constants.RegionGroups.EUROPE);
        // Convert the response to a blob explicitly
        const jsonString = JSON.stringify(matchTimeline.response);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const storageId: Id<"_storage"> = await ctx.storage.store(blob);
        return storageId;
    },
});