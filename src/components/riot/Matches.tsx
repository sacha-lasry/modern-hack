"use client"

import { useAction, useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { useState } from "react";

export default function Matches() {
    const riotInfo = useQuery(api.users.getRiotInfo);
    const getMatchIdsAction = useAction(api.riotAPI.getMatchIds);
    const upsertMatchPlayersAction = useMutation(api.matches.upsertMatchPlayers);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const matchPlayers = useQuery(api.matches.getMatchPlayers, { riotPUUID: riotInfo?.riotPUUID });
    const matchIds = matchPlayers?.map((matchPlayer) => matchPlayer.matchId);
    const handleGetMatchHistory = async () => {
        if (!riotInfo?.riotPUUID) {
            setError("Please link your Riot account first");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const matchIds = await getMatchIdsAction({ PUUID: riotInfo.riotPUUID });
            await upsertMatchPlayersAction({ riotPUUID: riotInfo.riotPUUID, matchIds: matchIds });
        } catch (err) {
            setError("Failed to fetch match history");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Match History</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <Button 
                    onClick={handleGetMatchHistory} 
                    disabled={loading || !riotInfo?.riotPUUID}
                    className="w-full"
                >
                    {loading ? "Loading..." : "Refresh Match History"}
                </Button>
                
                {error && (
                    <div className="text-sm">
                        {error}
                    </div>
                )}
                
                {!riotInfo?.riotPUUID && !loading && (
                    <p className="text-sm">Link your Riot account to view match history</p>
                )}
                
                {matchIds && matchIds.length > 0 && (
                    <div className="space-y-2">
                        <p className="text-sm">
                            Recent {matchIds.length} matches:
                        </p>
                        <div className="grid gap-2 max-h-96 overflow-y-auto">
                            {matchIds.map((matchId, index) => (
                                <div 
                                    key={matchId} 
                                    className="flex items-center justify-between p-3 rounded-lg transition-colors"
                                >
                                    <span className="font-mono text-sm">{matchId}</span>
                                    <span className="text-xs">#{index + 1}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                {matchIds && matchIds.length === 0 && (
                    <p className="text-sm">No recent matches found</p>
                )}
            </CardContent>
        </Card>
    );
}