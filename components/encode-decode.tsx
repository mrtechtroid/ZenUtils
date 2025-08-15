"use client"

import clsx from "clsx"

export function EncodeDecodeToggle({
  mode,
  setMode,
}: {
  mode: "encode" | "decode"
  setMode: (val: "encode" | "decode") => void
}) {
  return (
    <div className="flex justify-center mb-6">
      <div className="relative inline-flex items-center rounded-full border p-1 transition-colors min-w-[200px]">
        {/* Sliding highlight */}
        <div
          className={clsx(
            "absolute top-1 left-1 h-8 w-[calc(50%-4px)] rounded-full bg-primary transition-all duration-300",
            mode === "decode" && "translate-x-full"
          )}
        />

        {/* Buttons with flex grow to auto-size evenly */}
        <button
          onClick={() => setMode("encode")}
          className={clsx(
            "relative z-10 flex-1 text-sm font-medium rounded-full h-8 transition-colors duration-300",
            mode === "encode"
              ? "text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Encode
        </button>
        <button
          onClick={() => setMode("decode")}
          className={clsx(
            "relative z-10 flex-1 text-sm font-medium rounded-full h-8 transition-colors duration-300",
            mode === "decode"
              ? "text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Decode
        </button>
      </div>
    </div>
  )
}
