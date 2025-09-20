"use client"

import { useAction, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { useState } from "react";

export default function Matches() {
    const riotInfo = useQuery(api.users.getRiotInfo);
    const getMatchIdsAction = useAction(api.riot.getMatchIds);
    const [matchIds, setMatchIds] = useState<string[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGetMatchHistory = async () => {
        if (!riotInfo?.riotPUUID) {
            setError("Please link your Riot account first");
            return;
        }
        
        setLoading(true);
        setError(null);
        try {
            const ids = await getMatchIdsAction({ PUUID: riotInfo.riotPUUID });
            setMatchIds(ids);
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
                    {loading ? "Loading..." : "Get Match History"}
                </Button>
                
                {error && (
                    <div className="text-red-500 text-sm">
                        {error}
                    </div>
                )}
                
                {!riotInfo?.riotPUUID && !loading && (
                    <p className="text-gray-600 text-sm">Link your Riot account to view match history</p>
                )}
                
                {matchIds && matchIds.length > 0 && (
                    <div className="space-y-2">
                        <p className="text-sm text-gray-600">
                            Found {matchIds.length} recent matches:
                        </p>
                        <div className="grid gap-2 max-h-96 overflow-y-auto">
                            {matchIds.map((matchId, index) => (
                                <div 
                                    key={matchId} 
                                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <span className="font-mono text-sm">{matchId}</span>
                                    <span className="text-xs text-gray-500">#{index + 1}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                {matchIds && matchIds.length === 0 && (
                    <p className="text-gray-600 text-sm">No recent matches found</p>
                )}
            </CardContent>
        </Card>
    );
}