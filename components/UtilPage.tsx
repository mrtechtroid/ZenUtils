import { use,useState, useEffect, useMemo } from "react"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { UtilLoader } from "@/components/utility-loader"
// import { useParams } from "next/navigation"
import { utilities, Utility } from "@/data/utils"


export default function UtilPage({ utility }: { utility: Utility }) {
  // Find similar utilities based on shared tags
  const similarUtilities = useMemo(() => {
    if (!utility) return []

    const otherUtilities = utilities.filter((t) => t.utilityId !== utility.utilityId)
    const utilitiesWithScore = otherUtilities.map((otherUtil) => {
      const sharedTags = utility.tags.filter((tag) => otherUtil.tags.includes(tag))
      return {
        utility: otherUtil,
        score: sharedTags.length,
        sharedTags,
      }
    })

    // Sort by score and get top 3
    return utilitiesWithScore
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((item) => item.utility)
  }, [utility])

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link href="/utils">
              <Button variant="ghost" size="sm" className="h-8 sm:h-9">
                <ArrowLeft className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Back to utilities</span>
                <span className="sm:hidden">Back</span>
              </Button>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="p-3 bg-primary/10 rounded-xl flex-shrink-0 self-start">
              <utility.icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold mb-2 leading-tight">{utility.name}</h1>
              <p className="text-muted-foreground text-base sm:text-lg mb-4 leading-relaxed">{utility.description}</p>
            </div>
          </div>
        </div>

        <Separator className="mb-6 sm:mb-8" />

        {/* Util Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Main Util Area */}
          <div className="lg:col-span-3 order-1 lg:order-1">
            <Card>
              <CardContent className="p-4 sm:p-6">
                <UtilLoader utilityId={utility.utilityId} />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6 order-2 lg:order-2">
            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-base sm:text-lg">About This Utility</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <h4 className="font-medium mb-2">Category</h4>
                  <p className="text-muted-foreground">{utility.category}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-1">
                    {utility.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Features</h4>
                  <ul className="text-muted-foreground space-y-1">
                    {utility.features.map((feature, index) => (
                      <li key={index} className="text-xs sm:text-sm">
                        • {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {utility.customContent && (
                  <div>
                    <h4 className="font-medium mb-2">Additional Info</h4>
                    <div className="text-muted-foreground text-xs sm:text-sm prose prose-sm max-w-none dark:prose-invert">
                      <div dangerouslySetInnerHTML={{ __html: utility.customContent }} />
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="font-medium mb-2">Privacy</h4>
                  <p className="text-muted-foreground text-xs sm:text-sm">
                    All processing happens locally in your browser. No data is sent to our servers.
                  </p>
                </div>
              </CardContent>
            </Card>

            {utility.externalLinks && utility.externalLinks.length > 0 && (
              <Card>
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="text-base sm:text-lg">Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {utility.externalLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-xs sm:text-sm text-primary hover:underline"
                      >
                        <ExternalLink className="h-3 w-3 flex-shrink-0" />
                        <span className="truncate">{link.title}</span>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {similarUtilities.length > 0 && (
              <Card>
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="text-base sm:text-lg">Similar Utilities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {similarUtilities.map((similarUtil) => (
                      <Link key={similarUtil.utilityId} href={`/utils/${similarUtil.utilityId}`}>
                        <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted transition-colors cursor-pointer">
                          <div className="p-1.5 bg-primary/10 rounded-md flex-shrink-0">
                            <similarUtil.icon className="h-3 w-3 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-xs sm:text-sm truncate">{similarUtil.name}</div>
                            <div className="text-xs text-muted-foreground truncate">{similarUtil.category}</div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
