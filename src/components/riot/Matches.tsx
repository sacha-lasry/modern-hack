import { getMatches } from "@/lib/riot";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Matches() {
    const riotInfo = useQuery(api.riot.getRiotInfo);
  return <div>Matches</div>;
}