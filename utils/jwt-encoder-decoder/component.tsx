"use client"

import { useState } from "react"
import { EncodeDecodeToggle } from "@/components/encode-decode"
import { Decoder } from "./Decoder"
import { Encoder } from "./Encoder"

export default function JWTTool() {
  const [mode, setMode] = useState<"encode" | "decode">("decode")
  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <EncodeDecodeToggle mode={mode} setMode={setMode} />
      {mode === "decode" ? <Decoder /> : <Encoder />}
    </div>
  )
}
