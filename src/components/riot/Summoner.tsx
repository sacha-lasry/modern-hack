"use client"

import { Input } from "@/components/ui/input";
import { getAccount } from "@/lib/riot";
import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery, useAction } from "convex/react";
import { toast } from "sonner";

export default function Summoner() {
    const [summonerName, setSummonerName] = useState("");
    const [summonerData, setSummonerData] = useState<any | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [showLinkingForm, setShowLinkingForm] = useState(false);
    const updateRiotInfo = useMutation(api.users.updateRiotInfo);
    const riotInfo = useQuery(api.users.getRiotInfo);
    const getAccount = useAction(api.riotAPI.getAccount);

    const handleFindSummoner = async () => {
        setError(null);
        setSummonerData(null);
        try {
            const summoner = await getAccount({ summonerName });
            setSummonerData(summoner);
        } catch (err: any) {
            toast.error("Summoner not found");
        }
    };

    const handleUpdateRiotInfo = async () => {
        try {
            await updateRiotInfo({ riotPUUID: summonerData.puuid, riotSummonerName: summonerData.gameName });
            toast.success("Riot PUUID updated successfully.");
            setShowLinkingForm(false); // Hide linking form after successful update
        } catch (err: any) {
            setError("Error updating Riot PUUID.");
        }
    };

    const handleShowLinkingForm = () => {
        setShowLinkingForm(true);
        setError(null);
        setSummonerData(null);
        setSummonerName("");
    };

    // Loading state - show skeleton
    if (riotInfo === undefined) {
        return (
            <Card className="w-full max-w-xl">
                <CardHeader>
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                </CardContent>
            </Card>
        );
    }

    // User has riot info - show the data with option to link new account
    if (riotInfo && riotInfo.riotPUUID && riotInfo.riotSummonerName && !showLinkingForm) {
        return (
            <Card className="w-full max-w-xl">
                <CardHeader>
                    <CardTitle>Your Riot Account</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <p className="text-sm text-gray-600">Summoner Name:</p>
                        <p className="font-medium">{riotInfo.riotSummonerName}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">PUUID:</p>
                        <p className="font-mono text-xs break-all">{riotInfo.riotPUUID}</p>
                    </div>
                    <Button onClick={handleShowLinkingForm} variant="outline">
                        Link Different Account
                    </Button>
                    {error && (
                        <div className="text-red-500 text-sm">
                            {error}
                        </div>
                    )}
                </CardContent>
            </Card>
        );
    }

    // No riot info or null data - show the original card
    return (
        <Card className="w-full max-w-xl">
            <CardHeader>
                <CardTitle>Link Your Riot Account</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <Input
                    value={summonerName}
                    onChange={(e) => setSummonerName(e.target.value)}
                    placeholder="Enter summoner name"
                />
                <Button onClick={handleFindSummoner}>Find Summoner</Button>
                {error && (
                    <div className="text-red-500 text-sm">
                        {error}
                    </div>
                )}
                {summonerData && (
                    <div className="mt-4 space-y-4">
                        <div>
                            <p className="text-sm mb-2">Found Summoner:</p>
                            <pre className="whitespace-pre-wrap break-all text-xs p-2 rounded">
                                {JSON.stringify(summonerData, null, 2)}
                            </pre>
                        </div>
                        <Button onClick={handleUpdateRiotInfo}>Update Riot PUUID</Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
