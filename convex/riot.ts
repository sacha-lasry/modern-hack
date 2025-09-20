"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";
import { RiotApi, Constants } from 'twisted'

export const getAccount = action({
    args: {
        summonerName: v.string(),
    },
    handler: async (ctx, args) => {
        const rApi = new RiotApi(process.env.RIOT_API_KEY as string)
        const account = await rApi.Account.getByRiotId(args.summonerName, "EUW", Constants.RegionGroups.EUROPE);
        return account.response;
    },
});