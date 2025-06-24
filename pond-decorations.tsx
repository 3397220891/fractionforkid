"use client"

export function PondDecorations() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Background pond scene */}
      <div className="absolute top-0 left-0 w-full h-32 opacity-20">
        <img
          src="/placeholder.svg?height=128&width=800&text=Cartoon+Pond+Scene"
          alt="Cartoon pond background"
          className="w-full h-full object-cover rounded-t-lg"
          style={{ filter: "hue-rotate(200deg) saturate(0.8)" }}
        />
      </div>

      {/* Floating ducks */}
      <div className="absolute top-4 left-8 animate-bounce">
        <img
          src="/placeholder.svg?height=60&width=60&text=🦆"
          alt="Cartoon duck 1"
          className="w-12 h-12 rounded-full bg-yellow-200 p-1"
          style={{ animationDelay: "0s", animationDuration: "3s" }}
        />
      </div>

      <div className="absolute top-12 right-12 animate-bounce">
        <img
          src="/placeholder.svg?height=60&width=60&text=🦆"
          alt="Cartoon duck 2"
          className="w-10 h-10 rounded-full bg-yellow-200 p-1"
          style={{ animationDelay: "1s", animationDuration: "4s" }}
        />
      </div>

      <div className="absolute bottom-8 left-16 animate-bounce">
        <img
          src="/placeholder.svg?height=60&width=60&text=🦆"
          alt="Cartoon duck 3"
          className="w-14 h-14 rounded-full bg-yellow-200 p-1"
          style={{ animationDelay: "2s", animationDuration: "3.5s" }}
        />
      </div>

      {/* Water lilies */}
      <div className="absolute bottom-16 right-8">
        <img src="/placeholder.svg?height=40&width=40&text=🪷" alt="Water lily" className="w-8 h-8 animate-pulse" />
      </div>

      <div className="absolute bottom-24 left-24">
        <img
          src="/placeholder.svg?height=40&width=40&text=🪷"
          alt="Water lily"
          className="w-6 h-6 animate-pulse"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      {/* Cattails/reeds */}
      <div className="absolute top-8 right-4">
        <img src="/placeholder.svg?height=80&width=20&text=🌾" alt="Cattails" className="w-4 h-16 animate-sway" />
      </div>

      <div className="absolute top-16 left-4">
        <img
          src="/placeholder.svg?height=80&width=20&text=🌾"
          alt="Cattails"
          className="w-4 h-16 animate-sway"
          style={{ animationDelay: "0.5s" }}
        />
      </div>

      {/* Ripple effects */}
      <div className="absolute bottom-12 left-1/3 w-8 h-8 border-2 border-blue-300 rounded-full animate-ping opacity-30"></div>
      <div
        className="absolute bottom-20 right-1/3 w-6 h-6 border-2 border-blue-300 rounded-full animate-ping opacity-20"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute bottom-16 left-1/2 w-4 h-4 border-2 border-blue-300 rounded-full animate-ping opacity-25"
        style={{ animationDelay: "2s" }}
      ></div>
    </div>
  )
}
