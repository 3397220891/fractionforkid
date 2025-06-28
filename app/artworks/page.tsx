"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Artwork {
  id: string
  theme: string
  pixels: string[][]
  user: string
  createdAt: string
}

const COLOR_LOOKUP: Record<string, string> = {
  yellow: "#FFD700",
  orange: "#FF8C00",
  blue: "#4682B4",
  white: "#F0F8FF",
  gray: "#708090",
  green: "#10B981",
  brown: "#A16207",
  red: "#EF4444",
  "1": "#FFD700",
  "2": "#FF8C00",
  "3": "#4682B4",
  "4": "#F0F8FF",
  "5": "#708090",
  "0": "#FFFFFF",
}

function renderPixelGrid(grid: string[][], size = 6) {
  return (
    <div style={{ display: "inline-block", background: "#eee", padding: 2 }}>
      {grid.slice(0, 20).map((row, rowIdx) => (
        <div key={rowIdx} style={{ display: "flex" }}>
          {row.slice(0, 20).map((cell, colIdx) => (
            <div
              key={colIdx}
              style={{
                width: size,
                height: size,
                background:
                  cell === "white" || cell === "0"
                    ? "#fff"
                    : COLOR_LOOKUP[cell] || "#fff",
                border: "1px solid #eee",
              }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default function ArtworksPage() {
  const [artworks, setArtworks] = useState<Artwork[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/pixel-art")
      .then((res) => res.json())
      .then((data) => {
        setArtworks(data)
        setLoading(false)
      })
  }, [])

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Pixel Art Gallery</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artworks.map((art) => (
            <Card key={art.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{art.theme}</CardTitle>
                <div className="text-xs text-gray-500">By {art.user || "Anonymous"}</div>
                <div className="text-xs text-gray-400">{new Date(art.createdAt).toLocaleString()}</div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">{renderPixelGrid(art.pixels, 6)}</div>
                {/* 可扩展：点击进入详情/回放 */}
                {/* <Button>View</Button> */}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
} 