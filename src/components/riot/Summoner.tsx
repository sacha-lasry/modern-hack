"use client"

import { Input } from "@/components/ui/input";
import { getAccount } from "@/lib/riot";
import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

export default function Summoner() {
    const [summonerName, setSummonerName] = useState("");
    const [summonerData, setSummonerData] = useState<any | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFindSummoner = async () => {
        setError(null);
        setSummonerData(null);
        try {
            const summoner = await getAccount(summonerName);
            setSummonerData(summoner);
        } catch (err: any) {
            setError("Summoner not found or error occurred.");
        }
    };

    return (
        <>
            <Card className="w-full max-w-xl">
                <Input
                    value={summonerName}
                    onChange={(e) => setSummonerName(e.target.value)}
                    placeholder="Enter summoner name"
                />
                <Button onClick={handleFindSummoner}>Find Summoner</Button>
                {error && (
                    <CardContent className="mt-4 text-red-500">
                        {error}
                    </CardContent>
                )}
                {summonerData && (
                    <CardContent className="mt-4">
                        <pre className="whitespace-pre-wrap break-all text-xs">
                            {JSON.stringify(summonerData, null, 2)}
                        </pre>
                    </CardContent>
                )}
            </Card>
        </>
    );
}
