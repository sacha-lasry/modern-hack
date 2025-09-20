"use client"

import { useAction, useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { useState } from "react";

export default function Matches() {
    const riotInfo = useQuery(api.users.getRiotInfo);
    const getRiotMatchIdsAction = useAction(api.riotAPI.getRiotMatchIds);
    const getMatchInfoAction = useAction(api.riotAPI.getMatchInfo);
    const addMatchesMutation = useMutation(api.matches.addMatches);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const matchPlayers = useQuery(api.matches.getMatchPlayers, { riotPUUID: riotInfo?.riotPUUID });
    const riotMatchIds = matchPlayers?.map((matchPlayer) => matchPlayer.riotMatchId);

    const handleRefreshtMatchHistory = async () => {
        if (!riotInfo?.riotPUUID) {
            setError("Please link your Riot account first");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const riotMatchIds = await getRiotMatchIdsAction({ PUUID: riotInfo.riotPUUID });
            const newRiotMatchIds = riotMatchIds.filter((riotMatchId) => !matchPlayers?.some((matchPlayer) => matchPlayer.riotMatchId === riotMatchId));
            for (const riotMatchId of newRiotMatchIds) {
                const matchInfo = await getMatchInfoAction({ riotMatchId });
                await addMatchesMutation({ riotPUUID: riotInfo.riotPUUID, riotMatchId, matchInfo });
            }
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
                    onClick={handleRefreshtMatchHistory} 
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
                
                {riotMatchIds && riotMatchIds.length > 0 && (
                    <div className="space-y-2">
                        <p className="text-sm">
                            Recent {riotMatchIds.length} matches:
                        </p>
                        <div className="grid gap-2 max-h-96 overflow-y-auto">
                            {riotMatchIds.map((riotMatchId, index) => (
                                <div 
                                    key={riotMatchId} 
                                    className="flex items-center justify-between p-3 rounded-lg transition-colors"
                                >
                                    <span className="font-mono text-sm">{riotMatchId}</span>
                                    <span className="text-xs">#{index + 1}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                {riotMatchIds && riotMatchIds.length === 0 && (
                    <p className="text-sm">No recent matches found</p>
                )}
            </CardContent>
        </Card>
    );
}