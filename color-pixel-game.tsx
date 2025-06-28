"use client"

import * as React from "react"
import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Palette, RotateCcw, Target, Sparkles } from "lucide-react"
import { ThemeStyles } from "./theme-styles"
import { DuckThemeDecorations } from "./duck-theme-decorations"
import { EnhancedStyles } from "./enhanced-styles"

interface ColorPlayer {
  id: string
  name: string
  color: string
  targetRatio: number
  currentRatio: number
  status: "below" | "target" | "above"
}

interface GameTheme {
  id: string
  name: string
  description: string
  emoji: string
}

const GRID_SIZE = 20
const TOTAL_PIXELS = GRID_SIZE * GRID_SIZE

const GAME_THEMES: GameTheme[] = [
  { id: "duck", name: "Big Yellow Duck", description: "Create the famous giant rubber duck!", emoji: "🦆" },
  { id: "pond", name: "Pond Scene", description: "Paint a peaceful pond with nature", emoji: "🌊" },
  { id: "forest", name: "Mountain Forest", description: "Design a lush forest landscape", emoji: "🌲" },
  { id: "boat", name: "Sailing Adventure", description: "Draw a boat on windy waters", emoji: "⛵" },
  { id: "garden", name: "Flower Garden", description: "Create a colorful blooming garden", emoji: "🌸" },
  { id: "sunset", name: "Golden Sunset", description: "Capture a beautiful sunset sky", emoji: "🌅" },
]

const DUCK_THEME_PLAYERS: ColorPlayer[] = [
  { id: "yellow", name: "Duck Body", color: "#FFD700", targetRatio: 0.4, currentRatio: 0, status: "below" },
  { id: "orange", name: "Duck Beak", color: "#FF8C00", targetRatio: 0.1, currentRatio: 0, status: "below" },
  { id: "blue", name: "Water", color: "#4682B4", targetRatio: 0.3, currentRatio: 0, status: "below" },
  { id: "white", name: "White", color: "#e0e0e0", targetRatio: 0.15, currentRatio: 0, status: "below" },
  { id: "gray", name: "Shadows", color: "#708090", targetRatio: 0.05, currentRatio: 0, status: "below" },
]

const DEFAULT_PLAYERS: ColorPlayer[] = [
  { id: "blue", name: "Blue", color: "#3B82F6", targetRatio: 0.3, currentRatio: 0, status: "below" },
  { id: "green", name: "Green", color: "#10B981", targetRatio: 0.25, currentRatio: 0, status: "below" },
  { id: "brown", name: "Brown", color: "#A16207", targetRatio: 0.2, currentRatio: 0, status: "below" },
  { id: "red", name: "Red", color: "#EF4444", targetRatio: 0.15, currentRatio: 0, status: "below" },
  { id: "yellow", name: "Yellow", color: "#F59E0B", targetRatio: 0.1, currentRatio: 0, status: "below" },
]

const THEME_BACKGROUNDS = {
  duck: {
    background: "linear-gradient(135deg, #FFE4B5 0%, #FFD700 20%, #87CEEB 40%, #4682B4 70%, #B0C4DE 100%)",
    className: "duck-theme",
  },
  pond: {
    background: "linear-gradient(135deg, #87CEEB 0%, #4682B4 50%, #2E8B57 70%, #228B22 100%)",
    className: "pond-theme",
  },
  forest: {
    background: "linear-gradient(135deg, #87CEEB 0%, #98FB98 30%, #228B22 60%, #006400 100%)",
    className: "forest-theme",
  },
  boat: {
    background: "linear-gradient(135deg, #87CEEB 0%, #4682B4 50%, #191970 100%)",
    className: "boat-theme",
  },
  garden: {
    background: "linear-gradient(135deg, #FFB6C1 0%, #98FB98 40%, #90EE90 70%, #228B22 100%)",
    className: "garden-theme",
  },
  sunset: {
    background: "linear-gradient(135deg, #FF6347 0%, #FF8C00 30%, #FFD700 60%, #FFA500 80%, #FF4500 100%)",
    className: "sunset-theme",
  },
}

// 颜色查找表，支持数字和 id
const COLOR_LOOKUP: Record<string, string> = {
  yellow: "#FFD700",
  orange: "#FF8C00",
  blue: "#4682B4",
  white: "#e0e0e0",
  gray: "#708090",
  // 兼容模板数字
  "1": "#FFD700",
  "2": "#FF8C00",
  "3": "#4682B4",
  "4": "#e0e0e0",
  "5": "#708090",
  "0": "",
}

// 主题像素模板（可扩展更多主题）
const DUCK_IMAGE = [
  "0000100000100000000",
  "0001410001410000000",
  "0001441114410000000",
  "0012223232221000000",
  "0012112221121000000",
  "0122222422222100110",
  "0122221212222101321",
  "0132522222523112310",
  "1222252225222213100",
  "1332255555223312100",
  "1222225552222213100",
  "1333225552233312100",
  "1322122522122313100",
  "1222131213122211000",
  "0122121212122100000",
  "0011131113111000000",
  "0000111011100000000",
]

function parseImage(image: string[], colorMap: Record<string, string>): string[][] {
  return image.map(row => row.split("").map(cell => {
    switch (cell) {
      case "1": return "yellow"
      case "2": return "orange"
      case "3": return "blue"
      case "4": return "white"
      case "5": return "gray"
      default: return "0"
    }
  }))
}

const getPlayersWithErase = (players: ColorPlayer[]) => [
  ...players,
  { id: "erase", name: "Erase", color: null, targetRatio: 0, currentRatio: 0, status: "below" },
]

export default function ColorPixelGame() {
  const [grid, setGrid] = useState<string[][]>(() => {
    // 默认主题为 duck 时用模板，否则全白
    if (GAME_THEMES[0].id === "duck") {
      return parseImage(DUCK_IMAGE, COLOR_LOOKUP)
    }
    return Array(GRID_SIZE)
      .fill(null)
      .map(() => Array(GRID_SIZE).fill("white"))
  })
  const [selectedColor, setSelectedColor] = useState<string>("")
  const [players, setPlayers] = useState<ColorPlayer[]>(DEFAULT_PLAYERS)
  const [selectedTheme, setSelectedTheme] = useState<GameTheme>(GAME_THEMES[0])
  const [gameStarted, setGameStarted] = useState(false)
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle")
  const [history, setHistory] = useState<string[][][]>([])
  const [replayIndex, setReplayIndex] = useState(0)

  // Update players when theme changes
  useEffect(() => {
    if (selectedTheme.id === "duck") {
      setPlayers(DUCK_THEME_PLAYERS)
      setSelectedColor(DUCK_THEME_PLAYERS[0].id)
      setGrid(parseImage(DUCK_IMAGE, COLOR_LOOKUP))
    } else {
      setPlayers(DEFAULT_PLAYERS)
      setSelectedColor(DEFAULT_PLAYERS[0].id)
      setGrid(
        Array(GRID_SIZE)
          .fill(null)
          .map(() => Array(GRID_SIZE).fill("white")),
      )
    }
  }, [selectedTheme])

  // Calculate color ratios and update player status
  const colorStats = useMemo(() => {
    const colorCounts: Record<string, number> = {}
    let totalColoredPixels = 0

    grid.forEach((row) => {
      row.forEach((cell) => {
        if (cell !== "0" && cell !== "erase") {
          colorCounts[cell] = (colorCounts[cell] || 0) + 1
          totalColoredPixels++
        }
      })
    })

    return { colorCounts, totalColoredPixels }
  }, [grid])

  // Update player ratios and status
  useEffect(() => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) => {
        const pixelCount = colorStats.colorCounts[player.id] || 0
        const currentRatio = colorStats.totalColoredPixels > 0 ? pixelCount / colorStats.totalColoredPixels : 0

        let status: "below" | "target" | "above" = "below"
        const tolerance = 0.02

        if (Math.abs(currentRatio - player.targetRatio) <= tolerance) {
          status = "target"
        } else if (currentRatio > player.targetRatio + tolerance) {
          status = "above"
        }

        return {
          ...player,
          currentRatio,
          status,
        }
      }),
    )
  }, [colorStats])

  const handlePixelClick = (row: number, col: number) => {
    if (!gameStarted) return

    setGrid((prevGrid) => {
      const newGrid = [...prevGrid]
      newGrid[row] = [...newGrid[row]]

      if (selectedColor === "erase") {
        newGrid[row][col] = "0"
      } else {
        newGrid[row][col] = selectedColor
      }

      return newGrid
    })
  }

  const resetGrid = () => {
    setGrid(
      Array(GRID_SIZE)
        .fill(null)
        .map(() => Array(GRID_SIZE).fill("white")),
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "below":
        return "bg-red-100 text-red-800 border-red-200"
      case "target":
        return "bg-green-100 text-green-800 border-green-200"
      case "above":
        return "bg-orange-100 text-orange-800 border-orange-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "below":
        return "Need More"
      case "target":
        return "Perfect!"
      case "above":
        return "Too Much"
      default:
        return "Unknown"
    }
  }

  // 新增：像素渲染函数，ELM 风格
  function renderPixelGrid(
    grid: string[][],
    players: ColorPlayer[],
    onPixelClick: (row: number, col: number) => void
  ): React.ReactElement {
    return (
      <div className="pixel-grid p-6 inline-block">
        <div className="grid gap-1">
          {grid.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-1">
              {row.map((cell, colIndex) => {
                let bg = "";
                if (cell === "0" || cell === "erase") {
                  bg = "transparent";
                } else if (cell === "white") {
                  bg = "#e0e0e0";
                } else {
                  bg = players.find((p) => p.id === cell)?.color || COLOR_LOOKUP[cell] || "#e0e0e0";
                }
                return (
                  <button
                    key={`${rowIndex}-${colIndex}`}
                    className="pixel-button w-7 h-7 border border-gray-300"
                    style={{
                      backgroundColor: bg,
                      boxShadow: cell !== "0" && cell !== "erase" ? "inset 0 1px 3px rgba(0,0,0,0.1)" : "none",
                    }}
                    onClick={() => onPixelClick(rowIndex, colIndex)}
                  />
                )
              })}
            </div>
          ))}
        </div>
      </div>
    )
  }

  const saveArtwork = async () => {
    setSaveStatus("saving")
    try {
      const res = await fetch("/api/pixel-art", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          theme: selectedTheme.id,
          pixels: grid,
          user: "guest",
          createdAt: new Date().toISOString(),
        }),
      })
      if (res.ok) {
        setSaveStatus("success")
      } else {
        setSaveStatus("error")
      }
    } catch {
      setSaveStatus("error")
    }
  }

  const fetchArtworkHistory = async (id: string) => {
    const res = await fetch(`/api/pixel-art/${id}`)
    const data = await res.json()
    setHistory(data.history || [data.pixels])
    setReplayIndex(0)
  }

  return (
    <>
      <ThemeStyles />
      <EnhancedStyles />
      <div
        className="min-h-screen p-6 transition-all duration-1000"
        style={{
          background: gameStarted
            ? THEME_BACKGROUNDS[selectedTheme.id as keyof typeof THEME_BACKGROUNDS].background
            : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header */}
          <div className="text-center mb-8">
            <h1 className="main-header text-5xl font-bold mb-4 flex items-center justify-center gap-3">
              <Sparkles className="w-10 h-10 text-purple-600" />
              Pixel Art Challenge
            </h1>
            {gameStarted && (
              <div className="text-center mb-6">
                <div className="text-6xl mb-2 animate-bounce">{selectedTheme.emoji}</div>
                <p className="text-white font-semibold text-xl drop-shadow-lg bg-black/20 rounded-full px-6 py-2 inline-block backdrop-blur-sm">
                  {selectedTheme.name}
                </p>
              </div>
            )}
            <p className="text-white/90 text-lg font-medium">
              Create beautiful art while managing color ratios together!
            </p>
          </div>

          {!gameStarted ? (
            <Card className="enhanced-card mb-8 max-w-4xl mx-auto">
              <CardHeader className="text-center pb-4">
                <CardTitle className="flex items-center justify-center gap-3 text-2xl">
                  <Target className="w-6 h-6" />
                  Choose Your Creative Theme
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {GAME_THEMES.map((theme) => (
                    <Card
                      key={theme.id}
                      className={`theme-card cursor-pointer ${selectedTheme.id === theme.id ? "selected" : ""}`}
                      onClick={() => setSelectedTheme(theme)}
                    >
                      <CardContent className="p-6 text-center">
                        <div className="text-4xl mb-3">{theme.emoji}</div>
                        <h3 className="font-bold text-lg mb-2">{theme.name}</h3>
                        <p className="text-gray-600 text-sm">{theme.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <Button onClick={() => setGameStarted(true)} className="clean-button w-full py-4 text-lg" size="lg">
                  Start Creating: {selectedTheme.name} {selectedTheme.emoji}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
              {/* Game Canvas - Takes more space */}
              <div className="xl:col-span-3">
                <Card className="enhanced-card relative overflow-hidden">
                  {selectedTheme.id === "duck" && <DuckThemeDecorations />}

                  <CardHeader className="flex flex-row items-center justify-between bg-white/60 backdrop-blur-sm relative z-10">
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <span className="text-3xl">{selectedTheme.emoji}</span>
                      {selectedTheme.name}
                    </CardTitle>
                    <Button
                      onClick={resetGrid}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 bg-white/80 hover:bg-white"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Reset
                    </Button>
                  </CardHeader>
                  <CardContent className="bg-white/70 backdrop-blur-sm relative z-10 p-8">
                    <div className="flex justify-center">
                      {renderPixelGrid(history.length ? history[replayIndex] : grid, players, handlePixelClick)}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Controls Sidebar */}
              <div className="xl:col-span-1 space-y-6">
                {/* Color Selector */}
                <Card className="enhanced-card">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Palette className="w-5 h-5" />
                      Colors
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {getPlayersWithErase(players).map((player) => (
                        <button
                          key={player.id}
                          onClick={() => setSelectedColor(player.id)}
                          className={`w-full p-3 rounded-xl border-2 transition-all flex items-center gap-3 ${
                            selectedColor === player.id
                              ? "border-gray-800 bg-gray-50 shadow-md"
                              : "border-gray-200 hover:border-gray-400 hover:shadow-sm"
                          }`}
                        >
                          <div
                            className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                            style={{ backgroundColor: player.color || "#fff", border: player.id === "erase" ? "2px dashed #aaa" : undefined }}
                          />
                          <span className="font-medium">{player.name}</span>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Progress Tracking */}
                <Card className="enhanced-card">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg">Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {players.map((player) => (
                        <div key={player.id} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: player.color }} />
                              <span className="font-medium text-sm">{player.name}</span>
                            </div>
                            <Badge className={`${getStatusColor(player.status)} text-xs px-2 py-1`}>
                              {getStatusText(player.status)}
                            </Badge>
                          </div>
                          <div className="text-xs text-gray-600 mb-1">
                            {(player.targetRatio * 100).toFixed(0)}% target • {(player.currentRatio * 100).toFixed(1)}%
                            current
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                            <div
                              className="h-2 rounded-full transition-all duration-500 progress-bar"
                              style={{
                                backgroundColor: player.color,
                                width: `${Math.min((player.currentRatio / player.targetRatio) * 100, 100)}%`,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Game Stats */}
                <Card className="enhanced-card">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg">Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Pixels Colored</span>
                        <span className="font-bold text-lg">{colorStats.totalColoredPixels}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Coverage</span>
                        <span className="font-bold text-lg">
                          {((colorStats.totalColoredPixels / TOTAL_PIXELS) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Perfect Colors</span>
                        <span className="font-bold text-lg text-green-600">
                          {players.filter((p) => p.status === "target").length}/{players.length}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="enhanced-card">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg">Save Artwork</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button onClick={saveArtwork} disabled={saveStatus === "saving"}>
                      {saveStatus === "saving" ? "Saving..." : "Save Artwork"}
                    </Button>
                    {saveStatus === "success" && <span className="text-green-600 ml-2">Saved!</span>}
                    {saveStatus === "error" && <span className="text-red-600 ml-2">Error!</span>}
                  </CardContent>
                </Card>

                {/* History Controls */}
                <Card className="enhanced-card">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg">History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {history.map((_, i) => (
                        <Button
                          key={i}
                          onClick={() => setReplayIndex(i)}
                          disabled={i === replayIndex}
                        >
                          Step {i + 1}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
