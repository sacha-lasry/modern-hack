import { UserButton } from "@daveyplate/better-auth-ui"
import Link from "next/link"

export function NavBar() {
    return (
        <header className="sticky top-0 z-50 flex h-12 justify-between border-b bg-background/60 px-safe-or-4 backdrop-blur md:h-14 md:px-safe-or-6">
            NICE APP

            <div className="flex items-center gap-2">
                <Link
                    href="https://github.com/daveyplate/better-auth-nextjs-starter"
                    target="_blank"
                >
                </Link>

                <UserButton size="icon" />
            </div>
        </header>
    )
}