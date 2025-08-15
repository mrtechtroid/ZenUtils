"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Trash2 } from "lucide-react"
import { decodeTokenParts, verifyJWT } from "@/lib/jwt-encoder-decoder/jwtUtils"
import { JSONTableView } from "./JSONTableView"

export function Decoder() {
  const [jwtText, setJwtText] = useState("")
  const [header, setHeader] = useState<object | null>(null)
  const [payload, setPayload] = useState<object | null>(null)
  const [signature, setSignature] = useState("")
  const [isValid, setIsValid] = useState(false)
  const [isVerified, setIsVerified] = useState<boolean | null>(null)
  const [algorithm, setAlgorithm] = useState("HS256")
  const [secret, setSecret] = useState("")

  /* decode */
  useEffect(() => {
    try {
      const parts = decodeTokenParts(jwtText)
      setHeader(parts.header)
      setPayload(parts.payload)
      setSignature(parts.signature)
      setIsValid(true)
    } catch {
      setHeader(null)
      setPayload(null)
      setSignature("")
      setIsValid(false)
    }
    setIsVerified(null)
  }, [jwtText])

  /* verify */
  useEffect(() => {
    if (!isValid) return
    try {
      const ok = verifyJWT(jwtText, secret, algorithm)
      setIsVerified(ok)
    } catch {
      setIsVerified(false)
    }
  }, [jwtText, secret, algorithm, isValid])

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Left panel */}
      <div>
        {/* JWT Input */}
        <Textarea
          value={jwtText}
          onChange={(e) => setJwtText(e.target.value)}
          className="font-mono min-h-[160px]"
          placeholder="Paste your JWT"
        />
        <div className="mt-2 flex gap-2">
          <Button onClick={() => navigator.clipboard.writeText(jwtText)}>
            Copy
          </Button>
          <Button onClick={() => setJwtText("")}>Clear</Button>
        </div>
        {/* Status */}
        <div className="mt-4 space-y-1">
          <div>{isValid ? "✅ Valid JWT" : "❌ Invalid JWT"}</div>
          {isValid && (
            <div>{isVerified === true
              ? "✅ Signature Verified"
              : isVerified === false
              ? "❌ Signature Invalid"
              : "⚠️ Provide secret and select algorithm"}</div>
          )}
        </div>
        {isValid && (
          <div className="mt-4 space-y-2">
            <label>Algorithm:</label>
            <select
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
              className="border rounded px-2 py-1"
            >
              {["HS256", "HS384", "HS512"].map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>
            <label>Secret / Public Key:</label>
            <Textarea
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              className="font-mono min-h-[80px]"
              placeholder="Secret or public key"
            />
          </div>
        )}
      </div>

      {/* Right panel */}
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold">Header</h3>
          <JSONTableView data={header} />
        </div>
        <div>
          <h3 className="font-semibold">Payload</h3>
          <JSONTableView data={payload} />
        </div>
      </div>
    </div>
  )
}
