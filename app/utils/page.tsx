"use client"

import { useState, useMemo } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { utilities } from "@/data/utils"
import Link from "next/link"

export default function UtilitiesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [tagSearch, setTagSearch] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>()
    utilities.forEach((utility) => utility.tags.forEach((tag) => tags.add(tag)))
    return Array.from(tags).sort()
  }, [])

  // Filter tags based on search
  const filteredTags = useMemo(() => {
    if (!tagSearch) return []
    return allTags
      .filter((tag) => tag.toLowerCase().includes(tagSearch.toLowerCase()) && !selectedTags.includes(tag))
      .slice(0, 10) // Limit to 10 suggestions
  }, [tagSearch, allTags, selectedTags])

  // Filter utilities based on search and tags
  const filteredUtilities = useMemo(() => {
    return utilities.filter((utility) => {
      const matchesSearch =
        searchQuery === "" ||
        utility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        utility.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        utility.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => utility.tags.includes(tag))

      return matchesSearch && matchesTags
    })
  }, [searchQuery, selectedTags])

  const addTag = (tag: string) => {
    setSelectedTags((prev) => [...prev, tag])
    setTagSearch("")
  }

  const removeTag = (tag: string) => {
    setSelectedTags((prev) => prev.filter((t) => t !== tag))
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">All Utilities</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Browse our collection of {utilities.length} developer and creator utilities
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 sm:mb-8 space-y-4">
          {/* Main Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search utilities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-10 sm:h-11"
            />
          </div>

          {/* Tag Search */}
          <div className="space-y-3">
            <div className="relative">
              <Input
                placeholder="Search tags to filter..."
                value={tagSearch}
                onChange={(e) => setTagSearch(e.target.value)}
                className="h-9 sm:h-10"
              />
              {filteredTags.length > 0 && (
                <div className="absolute top-full left-0 right-0 z-10 mt-1 bg-background border rounded-md shadow-lg max-h-40 overflow-y-auto">
                  {filteredTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => addTag(tag)}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-muted transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Selected Tags */}
            {selectedTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <span className="text-xs sm:text-sm font-medium text-muted-foreground self-center">Filtering by:</span>
                {selectedTags.map((tag) => (
                  <Badge key={tag} variant="default" className="text-xs">
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="ml-1 hover:bg-primary-foreground/20 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedTags([])}
                  className="h-6 px-2 text-xs text-muted-foreground"
                >
                  Clear all
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 sm:mb-6">
          <p className="text-xs sm:text-sm text-muted-foreground">
            Showing {filteredUtilities.length} of {utilities.length} utilities
          </p>
        </div>

        {/* Utilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {filteredUtilities.map((utility) => (
            <Link key={utility.utilityId} href={`/utils/${utility.utilityId}`}>
              <Card className="h-full hover:shadow-lg transition-all duration-200 cursor-pointer group hover:scale-[1.02]">
                <CardHeader className="pb-3 sm:pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors flex-shrink-0">
                      <utility.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-base sm:text-lg leading-tight">{utility.name}</CardTitle>
                      <CardDescription className="text-xs sm:text-sm">{utility.category}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 line-clamp-2 leading-relaxed">
                    {utility.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {utility.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs px-2 py-0.5">
                        {tag}
                      </Badge>
                    ))}
                    {utility.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs px-2 py-0.5">
                        +{utility.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* No Results */}
        {filteredUtilities.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No utilities found matching your criteria</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("")
                setSelectedTags([])
                setTagSearch("")
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
