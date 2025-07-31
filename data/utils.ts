import { Hash, Palette, FileText, ImageIcon, Code, Calculator, Clock, QrCode, Scissors, User,Lock } from "lucide-react"
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
  }

]


