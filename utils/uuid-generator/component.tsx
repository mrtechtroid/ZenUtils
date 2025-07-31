"use client"

import { useState, useCallback } from "react"
import { Copy, RefreshCw } from "lucide-react"
import {
  v1 as uuidv1,
  v3 as uuidv3,
  v4 as uuidv4,
  v5 as uuidv5,
  v6 as uuidv6,
  v7 as uuidv7,
  validate as uuidValidate,
} from "uuid"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

const generateUUID = (
  version: string,
  namespace?: string,
  name?: string
): string => {
  switch (version) {
    case "v1":
      return uuidv1()
    case "v3":
      if (!namespace || !name) return "Missing namespace or name"
      if (!uuidValidate(namespace)) return "Invalid namespace UUID"
      return uuidv3(name, namespace)
    case "v4":
      return uuidv4()
    case "v5":
      if (!namespace || !name) return "Missing namespace or name"
      if (!uuidValidate(namespace)) return "Invalid namespace UUID"
      return uuidv5(name, namespace)
    case "v6":
      return uuidv6()
    case "v7":
      return uuidv7()
    default:
      return uuidv4()
  }
}

export default function UUIDGenerator() {
  const [uuid, setUuid] = useState<string>("")
  const [version, setVersion] = useState<string>("v4")
  const [namespace, setNamespace] = useState<string>("")
  const [name, setName] = useState<string>("")
  const { toast } = useToast()

  const handleGenerate = useCallback(() => {
    const newUuid = generateUUID(version, namespace, name)
    setUuid(newUuid)
  }, [version, namespace, name])

  const copyUuid = async () => {
    await navigator.clipboard.writeText(uuid)
    toast({
      title: "Copied!",
      description: `UUID ${uuid} copied to clipboard`,
    })
  }

  const showNamespaceFields = version === "v3" || version === "v5"

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="uuidVersion">UUID Version</Label>
          <Select value={version} onValueChange={setVersion}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select UUID Version" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="v1">v1 (timestamp-based)</SelectItem>
              <SelectItem value="v3">v3 (namespace + name, MD5)</SelectItem>
              <SelectItem value="v4">v4 (random)</SelectItem>
              <SelectItem value="v5">v5 (namespace + name, SHA-1)</SelectItem>
              <SelectItem value="v6">v6 (time-ordered)</SelectItem>
              <SelectItem value="v7">v7 (time-ordered)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-end space-x-2">
          <Button onClick={handleGenerate} className="flex-1">
            <RefreshCw className="h-4 w-4 mr-2" />
            Generate UUID
          </Button>
        </div>
      </div>

      {showNamespaceFields && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="namespace">Namespace (UUID)</Label>
            <Input
              id="namespace"
              value={namespace}
              onChange={(e) => setNamespace(e.target.value)}
              placeholder="e.g. 6ba7b810-9dad-11d1-80b4-00c04fd430c8"
            />
          </div>
          <div>
            <Label htmlFor="name">Name (string)</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. example.com"
            />
          </div>
        </div>
      )}

      {uuid && (
        <Card>
          <CardHeader>
            <CardTitle>Generated UUID</CardTitle>
            <CardDescription>Click to copy the generated UUID</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between space-x-2">
              <Input value={uuid} readOnly className="font-mono" />
              <Button onClick={copyUuid} variant="ghost">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
