import { RiotApi, Constants } from 'twisted'
const api = new RiotApi(process.env.NEXT_PUBLIC_RIOT_API_KEY as string)

export async function getAccount (summonerName: string) {
    // Recommended to use the nearest routing value to your server: americas, asia, europe
    return (await api.Account.getByRiotId(summonerName, "EUW", Constants.RegionGroups.EUROPE)).response
  }