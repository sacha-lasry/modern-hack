import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";

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
                    Thanks for joining, we'll keep in touch
                </div>
            ) : (
                <div className="flex justify-center gap-2">
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
            )}
        </div>
    )
}