"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { EncodeDecodeToggle } from "@/components/encode-decode"

export default function Base64Tool() {
  const [mode, setMode] = useState<"encode" | "decode">("encode")
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")

  const handleConvert = () => {
    try {
      if (mode === "encode") {
        setOutput(btoa(input))
      } else {
        setOutput(atob(input))
      }
    } catch (e) {
      setOutput("Invalid input.")
    }
  }

  return (
    <Card className="space-y-4">
      <CardHeader>
        <CardTitle>Base64 {mode === "encode" ? "Encoder" : "Decoder"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <EncodeDecodeToggle mode={mode} setMode={setMode} />
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Enter text to ${mode}`}
        />
        <Button onClick={handleConvert}>Convert</Button>
        <Textarea readOnly value={output} placeholder="Result will appear here..." />
      </CardContent>
    </Card>
  )
}
