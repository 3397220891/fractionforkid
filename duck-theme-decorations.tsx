"use client"

export function DuckThemeDecorations() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Main big yellow duck */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 animate-float">
        <div className="relative">
          {/* Duck body */}
          <div className="w-24 h-20 bg-yellow-400 rounded-full border-4 border-yellow-500 shadow-lg relative">
            {/* Duck head */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-yellow-400 rounded-full border-4 border-yellow-500">
              {/* Eyes */}
              <div className="absolute top-3 left-3 w-3 h-3 bg-black rounded-full"></div>
              <div className="absolute top-3 right-3 w-3 h-3 bg-black rounded-full"></div>
              {/* Beak */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-orange-400 rounded-sm"></div>
            </div>
            {/* Wing */}
            <div className="absolute top-2 right-2 w-6 h-8 bg-yellow-500 rounded-full opacity-80"></div>
          </div>
        </div>
      </div>

      {/* Smaller rubber ducks */}
      <div className="absolute top-16 left-8 animate-bounce" style={{ animationDelay: "0.5s" }}>
        <div className="w-8 h-6 bg-yellow-400 rounded-full border-2 border-yellow-500 relative">
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-yellow-400 rounded-full border-2 border-yellow-500">
            <div className="absolute top-1 left-1 w-1 h-1 bg-black rounded-full"></div>
            <div className="absolute top-1 right-1 w-1 h-1 bg-black rounded-full"></div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-orange-400"></div>
          </div>
        </div>
      </div>

      <div className="absolute top-20 right-12 animate-bounce" style={{ animationDelay: "1s" }}>
        <div className="w-6 h-5 bg-yellow-400 rounded-full border-2 border-yellow-500 relative">
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-yellow-400 rounded-full border-2 border-yellow-500">
            <div className="absolute top-0.5 left-0.5 w-0.5 h-0.5 bg-black rounded-full"></div>
            <div className="absolute top-0.5 right-0.5 w-0.5 h-0.5 bg-black rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Bubbles */}
      <div className="absolute bottom-16 left-1/4 w-4 h-4 bg-white bg-opacity-60 rounded-full animate-ping"></div>
      <div
        className="absolute bottom-20 left-1/3 w-3 h-3 bg-white bg-opacity-50 rounded-full animate-ping"
        style={{ animationDelay: "0.5s" }}
      ></div>
      <div
        className="absolute bottom-12 right-1/4 w-5 h-5 bg-white bg-opacity-40 rounded-full animate-ping"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute bottom-24 right-1/3 w-2 h-2 bg-white bg-opacity-70 rounded-full animate-ping"
        style={{ animationDelay: "1.5s" }}
      ></div>

      {/* Water splashes */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-1">
          <div className="w-1 h-3 bg-blue-300 rounded animate-pulse"></div>
          <div className="w-1 h-4 bg-blue-300 rounded animate-pulse" style={{ animationDelay: "0.2s" }}></div>
          <div className="w-1 h-2 bg-blue-300 rounded animate-pulse" style={{ animationDelay: "0.4s" }}></div>
        </div>
      </div>

      {/* Floating text */}
      <div className="absolute top-4 right-4 text-yellow-500 font-bold text-lg animate-pulse">🛁 Bath Time! 🛁</div>
    </div>
  )
}
