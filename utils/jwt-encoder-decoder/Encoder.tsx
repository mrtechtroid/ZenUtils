"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { decodeTokenParts, encodeJWT } from "@/lib/jwt-encoder-decoder/jwtUtils"
import { JSONTableView } from "./JSONTableView"
import { getExampleToken } from "@/lib/jwt-encoder-decoder/exampleTokens"

export function Encoder() {
  const [headerText, setHeaderText] = useState(`{"alg":"HS256","typ":"JWT"}`)
  const [payloadText, setPayloadText] = useState(`{"sub":"1234567890"}`)
  const [secret, setSecret] = useState("")
  const [algorithm, setAlgorithm] = useState("HS256")
  const [output, setOutput] = useState("")
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => {
    try {
      const header = JSON.parse(headerText)
      const payload = JSON.parse(payloadText)
      const tok = encodeJWT(header, payload, secret, algorithm)
      setOutput(tok)
      setErr(null)
    } catch (e: any) {
      setErr(e.message)
      setOutput("")
    }
  }, [headerText, payloadText, secret, algorithm])

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label>Header (JSON):</label>
          <Textarea
            value={headerText}
            onChange={(e) => setHeaderText(e.target.value)}
            className="font-mono min-h-[120px]"
          />
        </div>
        <div>
          <label>Payload (JSON):</label>
          <Textarea
            value={payloadText}
            onChange={(e) => setPayloadText(e.target.value)}
            className="font-mono min-h-[120px]"
          />
        </div>
      </div>
      <div className="space-y-2">
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
        <label>Secret / Private Key:</label>
        <Textarea
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          className="font-mono min-h-[80px]"
        />
      </div>
      {err && <div className="text-red-600">Error: {err}</div>}
      <div>
        <label>Encoded JWT:</label>
        <Textarea value={output} readOnly className="font-mono min-h-[80px]" />
        <div className="mt-2 flex gap-2">
          <Button onClick={() => navigator.clipboard.writeText(output)}>
            Copy
          </Button>
          <Button onClick={() => setHeaderText("")}>
            Clear Inputs
          </Button>
          <Button onClick={() => setHeaderText(getExampleToken(algorithm))}>
            Generate Example
          </Button>
        </div>
      </div>
    </div>
  )
}
