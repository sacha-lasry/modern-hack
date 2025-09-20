import { query } from '@/convex/autumn'
import { RiotApi, LolApi, Constants } from 'twisted'
const rApi = new RiotApi(process.env.NEXT_PUBLIC_RIOT_API_KEY as string)
const lApi = new LolApi(process.env.NEXT_PUBLIC_RIOT_API_KEY as string)

export async function getAccount (summonerName: string) {
  // Recommended to use the nearest routing value to your server: americas, asia, europe
  return (await rApi.Account.getByRiotId(summonerName, "EUW", Constants.RegionGroups.EUROPE)).response
}

export async function getMatches (
  PUUID: string,
  options?: { count?: number; startTime?: number; endTime?: number }
) {
  const query: any = {};
  if (options?.count !== undefined) query.count = options.count;
  if (options?.startTime !== undefined) query.startTime = options.startTime;
  if (options?.endTime !== undefined) query.endTime = options.endTime;

  return (
    await lApi.MatchV5.list(
      PUUID,
      Constants.RegionGroups.EUROPE,
      Object.keys(query).length > 0 ? query : undefined
    )
  ).response;
}