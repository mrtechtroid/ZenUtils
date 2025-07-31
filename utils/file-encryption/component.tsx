"use client"

import { Button } from "@/components/ui/button"
import { useState, useCallback } from "react"

export default function FileEncryption() {
    return (
        <div className="space-y-6">
            <iframe 
                className="w-full border-0 rounded-lg"
                style={{height:"80vh"}}
                src="http://hatsmith.vercel.app/headless">
            </iframe>
            <div className="flex justify-center">
            <Button variant="outline" className="mt-4">
                <a href="http://hatsmith.vercel.app/" target="_blank" rel="noopener">
                    Open Hatsmith in a new tab
                </a>
            </Button>
            </div>
        </div>
    )
}