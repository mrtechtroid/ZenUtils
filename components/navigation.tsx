"use client"

import { useState, useEffect } from "react"
import { Zap, Menu, X, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { ThemeToggle } from "@/components/theme-toggle"
import { utilities } from "@/data/utils"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { Github } from "lucide-react"

export function Navigation() {
  const [open, setOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // Keyboard shortcut for search
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

  const handleUtilSelect = (utilityId: string) => {
    setOpen(false)
    router.push(`/utils/${utilityId}`)
  }

  const isHomePage = pathname === "/"

  if (isHomePage) {
    return null // Don't show navigation on homepage
  }

  return (
    <>
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex h-12 sm:h-14 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="p-1 bg-primary dark:bg-primary-foreground rounded-lg">
                <img src="/logo.png" className="h-[25px] w-[25px] text-primary-foreground" />
              </div>
              <span className="font-bold text-base sm:text-lg">ZenUtils</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                href="/utils"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === "/utils" ? "text-primary" : "text-muted-foreground"
                }`}
              >
                All Utilities
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setOpen(true)}
                className="w-48 lg:w-64 justify-start text-muted-foreground"
              >
                <Search className="mr-2 h-4 w-4" />
                Search utilities...
                <kbd className="ml-auto pointer-events-none hidden lg:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </Button>
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

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-1">
              <Button variant="ghost" size="sm" onClick={() => setOpen(true)} className="h-8 w-8 px-0">
                <Search className="h-4 w-4" />
              </Button>
              <ThemeToggle />
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
      </a>
    </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="h-8 w-8 px-0"
              >
                {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t py-3">
              <div className="space-y-2">
                <Link
                  href="/utils"
                  className="block px-2 py-2 text-sm font-medium text-muted-foreground hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  All Utilities
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

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
                  <div className="p-1.5 bg-primary/10 rounded-md flex-shrink-0">
                    <utility.icon className="h-3 w-3 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{utility.name}</div>
                    <div className="text-xs text-muted-foreground truncate">{utility.description}</div>
                  </div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
