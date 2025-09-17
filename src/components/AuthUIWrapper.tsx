"use client"


import { authClient } from "@/lib/auth-client"
import { AuthUIProvider } from "@daveyplate/better-auth-ui"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function AuthUIWrapper({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    return (
        <AuthUIProvider
                authClient={authClient}
                navigate={router.push}
                replace={router.replace}
                onSessionChange={() => {
                    // Clear router cache (protected routes)
                    router.refresh()
                }}
                Link={Link}
            >
                {children}
        </AuthUIProvider>   
    )
}