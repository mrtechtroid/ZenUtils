"use client"

import { useState } from "react"
import { Search, Zap } from "lucide-react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { utilities } from "@/data/utils"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Link from "next/link"
import { Github } from "lucide-react"

export default function HomePage() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleUtilSelect = (utilityId: string) => {
    setOpen(false)
    router.push(`/utils/${utilityId}`)
  }
  useEffect(() => {
      const down = (e: KeyboardEvent) => {
        if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
          e.preventDefault()
          setOpen((open) => !open)
        }
      }
      document.addEventListener("keydown", down)
      return () => document.removeEventListener("keydown", down)
    }, [])
  

  return (
    <div className="min-h-screen">
      {/* Theme toggle for homepage */}
      <div className="absolute top-4 right-4 z-10">
        <Button
      variant="outline"
      asChild
      className="gap-2"
    >
      <a
        href="https://github.com/mrtechtroid/zenutils"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Github className="h-4 w-4" />
        Contribute
      </a>
    </Button>
    <ThemeToggle />
      </div>

      <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-16">
        <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-6 sm:space-y-8">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="bg-primary dark:bg-primary-foreground rounded-2xl">
              <img src="/logo.png" alt="Logo" className="w-[100px] h-[100px]" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
              ZenUtils
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 text-center max-w-2xl px-4 leading-relaxed">
            Open, fast, ad-free utilities for developers and creators
          </p>

          {/* Search Button */}
          <Button
            variant="outline"
            className="w-full max-w-md h-11 sm:h-12 justify-start text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 mx-4"
            onClick={() => setOpen(true)}
          >
            <Search className="mr-2 h-4 w-4" />
            Search utilities...
            <kbd className="ml-auto pointer-events-none hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>

          {/* Quick Stats */}
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm text-slate-500 dark:text-slate-400 px-4 text-center">
            <span>{utilities.length} utilities available</span>
            <span className="hidden sm:inline">•</span>
            <span>100% client-side</span>
            <span className="hidden sm:inline">•</span>
            <span>No ads, forever.</span>
          </div>
        </div>

        {/* Command Dialog */}
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Search utilities..." />
          <CommandList>
            <CommandEmpty>No utilities found.</CommandEmpty>
            <CommandGroup heading="Utilities">
              {utilities.map((utility) => (
                <CommandItem
                  key={utility.utilityId}
                  value={`${utility.name} ${utility.description} ${utility.tags.join(" ")}`}
                  onSelect={() => handleUtilSelect(utility.utilityId)}
                  className="cursor-pointer"
                >
                  <div className="flex items-center space-x-3 w-full">
                    <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                      <utility.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium">{utility.name}</div>
                      <div className="text-sm text-muted-foreground truncate">{utility.description}</div>
                    </div>
                    <div className="hidden sm:flex flex-wrap gap-1">
                      {utility.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </div>
    </div>
  )
}
