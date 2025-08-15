import { Hash, Palette, FileText, ImageIcon, Code, Calculator, Clock, QrCode, Scissors, User,Lock,ScanQrCode, Shield, Link2 } from "lucide-react"
import { LucideProps } from "lucide-react"
export interface Utility {
  utilityId: string
  name: string
  description: string
  category: string
  tags: string[]
  icon: React.FC<LucideProps>
  features: string[]
  customContent?: string // HTML/Markdown content for custom sections
  externalLinks?: {
    title: string
    url: string
  }[]
  dependencies?: string[] // Libraries that will be dynamically loaded
}

export const utilities: Utility[] = [
  {
  utilityId: "uuid-generator",
  name: "UUID Generator",
  description: "Generate UUIDs across versions with optional namespace and name input.",
  category: "Security",
  tags: ["uuid", "generator", "identifier", "crypto", "unique"],
  icon: User,
  features: [
    "Supports v1, v3, v4, v5, v6, and v7 UUID versions",
    "Namespace and name input for v3/v5",
    "Copy to clipboard",
    "UUID validation and error handling",
    "User-friendly UI with version selector"
  ],
  customContent: `
    <h5>Supported Versions</h5>
    <ul>
      <li><strong>v1:</strong> Time-based UUIDs with timestamp and MAC address</li>
      <li><strong>v3:</strong> Namespace & name-based UUIDs using MD5 hashing</li>
      <li><strong>v4:</strong> Randomly generated UUIDs (default)</li>
      <li><strong>v5:</strong> Namespace & name-based UUIDs using SHA-1 hashing</li>
      <li><strong>v6:</strong> Time-ordered UUIDs optimized for database indexes</li>
      <li><strong>v7:</strong> Time-ordered UUIDs optimized for database indexes</li>
    </ul>
    <h5>Use Cases</h5>
    <p>Ideal for generating unique identifiers for sessions, database entries, distributed systems, and more.</p>
  `,
  dependencies: ["uuid"]
  },
  {
    utilityId: "file-encryption",
    name: "File Encryption",
    description: "Encrypt and decrypt files using Hatsmith",
    category: "Security",
    tags: ["encryption", "file", "security"],
    icon: Lock,
    features: [
      "Encrypt and decrypt files using Hatsmith",
      "Chunked AEAD stream encryption/decryption",
      "Fast and secure",
    ],
    customContent: `
      Hatsmith is a web app that provides secure local file encryption in the browser. 
      It's fast, secure, and uses modern cryptographic algorithms with chunked AEAD stream encryption/decryption.
      Hatsmith is a fork of Hat.sh, created by sh-dv, and other contributors.
    `,
    dependencies: []
  },
  {
  utilityId: "qr-code-generator",
  name: "QR Code Generator",
  description: "Generate QR codes for various data types including text, URL, vCard, and more",
  category: "Productivity",
  tags: ["qr", "code", "generator", "productivity"],
  icon: QrCode, // Assume QrCode is an imported icon from an icon library like lucide-react
  features: [
    "Generate QR codes for URLs, text, emails, events, and more",
    "Support for logo embedding in the center of QR codes",
    "Live preview and QR style customization",
    "Downloadable high-resolution PNG output",
  ],
  customContent: `
    The QR Code Generator is a flexible and fast utility for generating customized QR codes directly in your browser. 
    It supports a wide variety of data types including URLs, plain text, emails, vCards, WiFi credentials, and geolocations.
    You can preview the QR code live, apply visual styles, and optionally embed a logo at the center of the code. 
    Built with modern React tools, the QR Generator ensures high-quality, downloadable QR outputs with optional templates.
  `,
  dependencies: ["qrcode.react", "html-to-image", "file-saver"]
},
{
  utilityId: "qr-scanner",
  name: "QR Code Scanner",
  description: "Scan QR codes using webcam, image upload, or drag & drop",
  category: "Productivity",
  tags: ["qr", "scanner", "camera", "upload", "dragdrop"],
  icon: ScanQrCode, 
  features: [
    "Scan QR codes using real-time webcam feed",
    "Upload or drag and drop images containing QR codes",
    "Supports image pasting and file drop",
    "Auto-detects QR code type: URL, email, vCard, phone, WiFi, etc.",
    "Context-aware actions like Open URL, Call, Send Email, Copy, Map, etc.",
    "Fully offline and secure"
  ],
  customContent: `
    The QR Code Scanner allows you to easily scan QR codes directly in the browser.
    Choose between webcam scanning, uploading a QR image, or dragging & dropping/pasting one.
    The tool detects the type of data encoded in the QR — whether it's a URL, contact, WiFi info, email, or plain text —
    and shows context-specific actions for each.
    
    Everything is processed locally, so your data never leaves your device.
  `,
  dependencies: [
    "jsqr",
    "react-dropzone",
    "react-webcam"
  ]
},
{
  utilityId: "base64-encoder-decoder",
  name: "Base64 Encoder/Decoder",
  description: "Convert plain text to/from Base64 format",
  category: "Encoding",
  tags: ["base64", "encode", "decode", "text", "binary"],
  icon: Shield, // Assume imported from lucide-react
  features: [
    "Encode plain text into Base64 format",
    "Decode Base64 into plain text",
    "Live, client-side conversion",
    "Supports UTF-8 characters"
  ],
  customContent: `
    Use the Base64 Tool to encode or decode data in Base64 format — a common way to safely transmit binary or text data.
    This tool works entirely in your browser, preserving your privacy.
  `,
  dependencies: []
},
{
  utilityId: "url-encoder-decoder",
  name: "URL Encoder/Decoder",
  description: "Encode or decode URL-safe strings for web compatibility",
  category: "Encoding",
  tags: ["url", "encode", "decode", "web", "uri"],
  icon: Link2, // Assume imported from lucide-react
  features: [
    "Encode special characters for URLs",
    "Decode percent-encoded URLs into human-readable form",
    "Useful for web development, APIs, and redirects",
    "Safe, client-side utility"
  ],
  customContent: `
    This tool allows you to encode or decode text to be safely included in URLs.
    Whether you’re preparing query strings, redirect parameters, or working with APIs,
    URL encoding ensures that special characters are interpreted correctly.
  `,
  dependencies: []
},
{
  utilityId: "jwt-encoder-decoder",
  name: "JWT Encoder & Decoder",
  description: "Encode and decode JSON Web Tokens with full algorithm support and signature verification.",
  category: "Security",
  tags: ["jwt", "token", "decode", "encode", "security", "authentication"],
  icon: Shield, 
  features: [
    "Switch between Encode and Decode modes",
    "Live JWT validation and decoding",
    "Supports HS256, HS384, HS512",
    "Signature verification",
    "JSON and table view for payload and header",
    "Copy and clear actions",
    "Example token generator"
  ],
  customContent: "This tool allows you to securely test, debug, and inspect JWTs in both development and production environments.",
  dependencies: [
    "jsonwebtoken",
  ]
}
]


