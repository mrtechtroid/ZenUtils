"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import Webcam from "react-webcam"
import jsQR from "jsqr"
import { useDropzone } from "react-dropzone"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const detectType = (data: string) => {
  if (data.startsWith("http://") || data.startsWith("https://")) return "url"
  if (data.startsWith("mailto:")) return "email"
  if (data.startsWith("BEGIN:VCARD")) return "vcard"
  if (data.startsWith("SMSTO:")) return "sms"
  if (data.startsWith("TEL:")) return "tel"
  if (data.startsWith("geo:")) return "geo"
  if (data.startsWith("WIFI:")) return "wifi"
  if (data.startsWith("BEGIN:VEVENT")) return "event"
  return "text"
}

export default function QRScanner() {
  const [scannedData, setScannedData] = useState<string | null>(null)
  const [qrType, setQrType] = useState<string>("")
  const [filePreview, setFilePreview] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const webcamRef = useRef<Webcam>(null)
  const [scanning, setScanning] = useState(false)

  const processImage = (img: HTMLImageElement | HTMLCanvasElement) => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    canvas.width = img.width
    canvas.height = img.height
    ctx?.drawImage(img, 0, 0, img.width, img.height)
    const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height)
    const code = imageData ? jsQR(imageData.data, canvas.width, canvas.height) : null
    if (code?.data) {
      setScannedData(code.data)
      setQrType(detectType(code.data))
    }
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    const reader = new FileReader()
    reader.onload = () => {
      const img = new Image()
      img.onload = () => processImage(img)
      img.src = reader.result as string
      setFilePreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }, [])

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: { "image/*": [] } })

  const captureFromWebcam = () => {
    if (!webcamRef.current) return
    const video = webcamRef.current.video
    if (!video) return

    const canvas = document.createElement("canvas")
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext("2d")
    ctx?.drawImage(video, 0, 0, canvas.width, canvas.height)
    const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height)
    const code = imageData ? jsQR(imageData.data, canvas.width, canvas.height) : null

    if (code?.data) {
      setScannedData(code.data)
      setQrType(detectType(code.data))
      setScanning(false)
    }
  }

  useEffect(() => {
    let interval: any
    if (scanning) {
      interval = setInterval(captureFromWebcam, 1000)
    } else {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [scanning])

  const renderAction = () => {
    if (!scannedData) return null
    switch (qrType) {
      case "url":
        return (
          <a href={scannedData} target="_blank" rel="noopener noreferrer">
            <Button>Open URL</Button>
          </a>
        )
      case "email":
        return <a href={scannedData}><Button>Send Email</Button></a>
      case "tel":
        return <a href={scannedData}><Button>Call Number</Button></a>
      case "sms":
        return <a href={scannedData}><Button>Send SMS</Button></a>
      case "geo":
        return <a href={`https://maps.google.com/?q=${scannedData.slice(4)}`} target="_blank"><Button>Open Map</Button></a>
      default:
        return <Button onClick={() => navigator.clipboard.writeText(scannedData)}>Copy to Clipboard</Button>
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <Card>
  <CardHeader>
    <CardTitle>Scan from Camera</CardTitle>
    <CardDescription>Use webcam to scan QR codes</CardDescription>
  </CardHeader>
  <CardContent>
    {scanning ? (
      <>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/png"
          width={320}
          height={240}
          className="rounded"
          videoConstraints={{ facingMode: "environment" }} // Prefer back camera on mobile
        />
        <Button className="mt-2" onClick={() => setScanning(false)}>
          Stop Scanning
        </Button>
      </>
    ) : (
      <Button onClick={() => setScanning(true)}>Start Scanning</Button>
    )}
  </CardContent>
</Card>


        <Card>
          <CardHeader>
            <CardTitle>Upload or Drop QR Image</CardTitle>
            <CardDescription>Select or drag a QR image</CardDescription>
          </CardHeader>
          <CardContent>
            <div
              {...getRootProps()}
              className="border-dashed border-2 border-gray-400 rounded p-4 cursor-pointer text-center"
            >
              <input {...getInputProps()} />
              <p>Click or drag and drop image here</p>
            </div>
            {filePreview && (
              <img src={filePreview} alt="Uploaded QR" className="mt-4 max-w-xs rounded" />
            )}
          </CardContent>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Scanned QR Data</CardTitle>
            <CardDescription>Type: {qrType || "N/A"}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {scannedData ? (
              <>
                <pre className="p-2 bg-muted text-sm rounded overflow-x-auto">{scannedData}</pre>
                {renderAction()}
              </>
            ) : (
              <p>No QR code scanned yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
