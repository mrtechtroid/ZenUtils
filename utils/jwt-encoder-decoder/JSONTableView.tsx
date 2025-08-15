"use client"

import React from "react"

export function JSONTableView({ data }: { data: object | null }) {
  if (!data) return <div className="text-red-600">Invalid or empty JSON</div>
  return (
    <div className="flex space-x-4">
      <pre className="bg-muted p-2 rounded text-sm overflow-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
      <table className="table-auto bg-muted rounded p-2 text-sm">
        <tbody>
          {Object.entries(data).map(([k, v]) => (
            <tr key={k}>
              <td className="border px-2 py-1 font-mono">{k}</td>
              <td className="border px-2 py-1 font-mono">{String(v)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
