"use client"

import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { UserButton } from "@daveyplate/better-auth-ui"

export function HeroSignInButton({ buttonText }: { buttonText: string }) {
    const router = useRouter();

    return (
        <>
            <Authenticated>
                <UserButton size="icon"/>
            </Authenticated>
            <AuthLoading>
                 <Button className="transition-all duration-200 disabled:opacity-100" disabled>
                 {buttonText}
             </Button>
            </AuthLoading>
            <Unauthenticated>
                <Button
                    className="transition-all duration-200"
                    onClick={() => {
                        router.push("/auth/sign-in");
                    }}
                >
                    {buttonText}
                </Button>
            </Unauthenticated>
        </>
    )
}