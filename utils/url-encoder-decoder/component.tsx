"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { EncodeDecodeToggle } from "@/components/encode-decode"

export default function UrlTool() {
  const [mode, setMode] = useState<"encode" | "decode">("encode")
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")

  const handleConvert = () => {
    try {
      if (mode === "encode") {
        setOutput(encodeURIComponent(input))
      } else {
        setOutput(decodeURIComponent(input))
      }
    } catch (e) {
      setOutput("Invalid input.")
    }
  }

  return (
    <Card className="space-y-4">
      <CardContent className="space-y-4 p-2">
        <EncodeDecodeToggle mode={mode} setMode={setMode} />
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Enter URL or text to ${mode}`}
        />
        <Button onClick={handleConvert}>Convert</Button>
        <Textarea readOnly value={output} placeholder="Result will appear here..." />
      </CardContent>
    </Card>
  )
}
