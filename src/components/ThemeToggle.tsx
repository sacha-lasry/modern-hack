"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MoonIcon, SunIcon } from "lucide-react"

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (savedTheme === "dark" || (savedTheme === null && systemPrefersDark)) {
      setIsDark(true)
      document.documentElement.classList.add("dark")
    } else {
      setIsDark(false)
      document.documentElement.classList.remove("dark")
    }
  }, [])

  // Update theme when toggle changes
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }, [isDark])

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setIsDark((prev) => !prev)}
      className="scale-75 sm:scale-90 md:scale-100 bg-muted hover:bg-primary-foreground border-none"
    >
      {isDark ? <SunIcon className="h-[1.2rem] w-[1.2rem]" /> : <MoonIcon className="h-[1.2rem] w-[1.2rem]" /> }
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
