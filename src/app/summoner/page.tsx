import Summoner from "@/components/riot/Summoner";
import Matches from "@/components/riot/Matches";

export default function SummonerPage() {
    return (
        <div className="flex justify-center p-4">
            <Summoner />
            <Matches />
        </div>
    )
}