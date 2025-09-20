"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";
import { RiotApi, Constants, LolApi } from 'twisted'

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


export const getMatchIds = action({
    args: {
        PUUID: v.string(),
    },
    handler: async (_, args) => {
        const lApi = new LolApi(process.env.RIOT_API_KEY as string)
        const matches = await lApi.MatchV5.list(args.PUUID, Constants.RegionGroups.EUROPE);
        return matches.response;
    },
});
