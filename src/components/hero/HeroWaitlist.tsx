import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import Image from "next/image";

export function HeroWaitlist() {
    const [email, setEmail] = useState("");
    const [joined, setJoined] = useState(false);
    const addToWaitlist = useMutation(api.users.addToWaitlist);

    const handleJoinWaitlist = async () => {
        if (email) {
            await addToWaitlist({ email });
            setJoined(true);
        }
    }

    return (
        <div className="max-w-lg mx-auto">
            {joined ? (
                <div className="text-center font-medium py-4">
                    Thanks for joining, we will keep you posted!
                </div>
            ) : (
                <div className="flex flex-col items-center gap-4">
                    <Image 
                        src="/assets/waitlist_img.png" 
                        alt="Riot" 
                        width={1000} 
                        height={1000} 
                        className="rounded-lg"
                    />
                    <div className="flex justify-center gap-2 w-full">
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                        />
                        <Button
                            onClick={handleJoinWaitlist}
                        >
                            Join Waitlist
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}