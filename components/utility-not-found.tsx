"use client"

import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function UtilNotFound() {
  return (
    <Alert>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Util Not Available</AlertTitle>
      <AlertDescription>This utility is currently under development. Please check back later.</AlertDescription>
    </Alert>
  )
}
