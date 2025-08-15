"use client"

import { useState, useRef } from "react"
import { QRCodeCanvas } from "qrcode.react"
import { toPng } from "html-to-image"
import { saveAs } from "file-saver"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

const dataTypes = [
  "url",
  "text",
  "vcard",
  "sms",
  "call",
  "geolocation",
  "event",
  "email",
  "wifi",
]

const qrTemplates = [
  { label: "Standard", value: "standard" },
  { label: "Rounded", value: "rounded" },
]

const getDataString = (type: string, fields: any) => {
  switch (type) {
    case "url":
      return fields.url
    case "text":
      return fields.text
    case "vcard":
      return `BEGIN:VCARD
VERSION:3.0
FN:${fields.fullName}
TEL:${fields.phone}
EMAIL:${fields.email}
END:VCARD`
    case "sms":
      return `SMSTO:${fields.phone}:${fields.message}`
    case "call":
      return `TEL:${fields.phone}`
    case "geolocation":
      return `geo:${fields.lat},${fields.lng}`
    case "event":
      return `BEGIN:VEVENT
SUMMARY:${fields.title}
DTSTART:${fields.start}
DTEND:${fields.end}
LOCATION:${fields.location}
DESCRIPTION:${fields.description}
END:VEVENT`
    case "email":
      return `mailto:${fields.email}?subject=${fields.subject}&body=${fields.body}`
    case "wifi":
      return `WIFI:S:${fields.ssid};T:${fields.security};P:${fields.password};;`
    default:
      return ""
  }
}

export default function QRGenerator() {
  const [type, setType] = useState("url")
  const [fields, setFields] = useState<any>({})
  const [template, setTemplate] = useState("standard")
  const [logo, setLogo] = useState<string | null>(null)
  const qrRef = useRef<HTMLDivElement>(null)

  const handleDownload = () => {
    if (!qrRef.current) return
    toPng(qrRef.current).then((dataUrl) => {
      saveAs(dataUrl, "qr-code.png")
    })
  }

  const handleFieldChange = (key: string, value: string) => {
    setFields((prev: any) => ({ ...prev, [key]: value }))
  }

  const renderInputs = () => {
    switch (type) {
      case "url":
        return (
          <Input placeholder="Enter URL" onChange={(e) => handleFieldChange("url", e.target.value)} />
        )
      case "text":
        return (
          <Input placeholder="Enter text" onChange={(e) => handleFieldChange("text", e.target.value)} />
        )
      case "vcard":
        return (
          <>
            <Input placeholder="Full Name" onChange={(e) => handleFieldChange("fullName", e.target.value)} />
            <Input placeholder="Phone" onChange={(e) => handleFieldChange("phone", e.target.value)} />
            <Input placeholder="Email" onChange={(e) => handleFieldChange("email", e.target.value)} />
          </>
        )
      case "sms":
        return (
          <>
            <Input placeholder="Phone" onChange={(e) => handleFieldChange("phone", e.target.value)} />
            <Input placeholder="Message" onChange={(e) => handleFieldChange("message", e.target.value)} />
          </>
        )
      case "call":
        return <Input placeholder="Phone" onChange={(e) => handleFieldChange("phone", e.target.value)} />
      case "geolocation":
        return (
          <>
            <Input placeholder="Latitude" onChange={(e) => handleFieldChange("lat", e.target.value)} />
            <Input placeholder="Longitude" onChange={(e) => handleFieldChange("lng", e.target.value)} />
          </>
        )
      case "event":
        return (
          <>
            <Input placeholder="Title" onChange={(e) => handleFieldChange("title", e.target.value)} />
            <Input placeholder="Start Date (YYYYMMDDTHHMMSS)" onChange={(e) => handleFieldChange("start", e.target.value)} />
            <Input placeholder="End Date (YYYYMMDDTHHMMSS)" onChange={(e) => handleFieldChange("end", e.target.value)} />
            <Input placeholder="Location" onChange={(e) => handleFieldChange("location", e.target.value)} />
            <Input placeholder="Description" onChange={(e) => handleFieldChange("description", e.target.value)} />
          </>
        )
      case "email":
        return (
          <>
            <Input placeholder="Email" onChange={(e) => handleFieldChange("email", e.target.value)} />
            <Input placeholder="Subject" onChange={(e) => handleFieldChange("subject", e.target.value)} />
            <Input placeholder="Body" onChange={(e) => handleFieldChange("body", e.target.value)} />
          </>
        )
      case "wifi":
        return (
          <>
            <Input placeholder="SSID" onChange={(e) => handleFieldChange("ssid", e.target.value)} />
            <Input placeholder="Password" onChange={(e) => handleFieldChange("password", e.target.value)} />
            <Input placeholder="Security (WPA/WEP)" onChange={(e) => handleFieldChange("security", e.target.value)} />
          </>
        )
      default:
        return null
    }
  }

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setLogo(reader.result as string)
    reader.readAsDataURL(file)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <div>
          <Label>QR Code Type</Label>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger>
              <SelectValue placeholder="Select data type" />
            </SelectTrigger>
            <SelectContent>
              {dataTypes.map((t) => (
                <SelectItem key={t} value={t}>
                  {t.toUpperCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">{renderInputs()}</div>

        <div>
          <Label>Template Style</Label>
          <Select value={template} onValueChange={setTemplate}>
            <SelectTrigger>
              <SelectValue placeholder="Select style" />
            </SelectTrigger>
            <SelectContent>
              {qrTemplates.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Add Logo (center of QR)</Label>
          <Input type="file" accept="image/*" onChange={handleLogoUpload} />
        </div>

        <Button onClick={handleDownload}>Download QR Code</Button>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>QR Code Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative w-fit mx-auto" ref={qrRef}>
              <QRCodeCanvas
                value={getDataString(type, fields)}
                size={256}
                level="H"
                bgColor="#ffffff"
                fgColor="#000000"
                includeMargin
                style={{
                  borderRadius: template === "rounded" ? "8px" : "0",
                }}
              />
              {logo && (
                <Image
                  src={logo}
                  alt="Logo"
                  width={60}
                  height={60}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded"
                />
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
