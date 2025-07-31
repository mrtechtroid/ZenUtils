"use client"

import { lazy, Suspense } from "react"
import { utilities } from "@/data/utils"

interface UtilLoaderProps {
  utilityId: string
}

// Create a registry of all available utils
const utilityComponents = {
  "uuid-generator": lazy(() => import("@/utils/uuid-generator/component")),
} as const

export function UtilLoader({ utilityId }: UtilLoaderProps) {
  const utility = utilities.find((t) => t.utilityId === utilityId)

  if (!utility) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Utility not found</p>
      </div>
    )
  }

  const UtilComponent = utilityComponents[utilityId as keyof typeof utilityComponents]

  if (!UtilComponent) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground mb-2">This utility is currently under development.</p>
        <p className="text-sm text-muted-foreground">Please check back later!</p>
      </div>
    )
  }

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      }
    >
      <UtilComponent />
    </Suspense>
  )
}
