"use client"

export function ThemeStyles() {
  return (
    <style jsx global>{`
      @keyframes float {
        0%, 100% { transform: translateY(0px) translateX(-50%); }
        50% { transform: translateY(-15px) translateX(-50%); }
      }
      
      @keyframes sway {
        0%, 100% { transform: rotate(-2deg); }
        50% { transform: rotate(2deg); }
      }
      
      @keyframes ripple {
        0% { transform: scale(1); opacity: 1; }
        100% { transform: scale(1.5); opacity: 0; }
      }
      
      @keyframes sparkle {
        0%, 100% { opacity: 0; transform: scale(0); }
        50% { opacity: 1; transform: scale(1); }
      }
      
      @keyframes swim {
        0% { transform: translateX(0px) rotate(0deg); }
        25% { transform: translateX(10px) rotate(5deg); }
        50% { transform: translateX(0px) rotate(0deg); }
        75% { transform: translateX(-10px) rotate(-5deg); }
        100% { transform: translateX(0px) rotate(0deg); }
      }

      @keyframes rubber-bounce {
        0%, 100% { transform: scale(1) rotate(0deg); }
        25% { transform: scale(1.1) rotate(-2deg); }
        50% { transform: scale(1.05) rotate(0deg); }
        75% { transform: scale(1.1) rotate(2deg); }
      }

      @keyframes bubble-float {
        0% { transform: translateY(0px) scale(0); opacity: 0; }
        10% { transform: translateY(-10px) scale(1); opacity: 1; }
        90% { transform: translateY(-100px) scale(1); opacity: 1; }
        100% { transform: translateY(-120px) scale(0); opacity: 0; }
      }
      
      .animate-float {
        animation: float 4s ease-in-out infinite;
      }

      .duck-theme {
        animation: rubber-bounce 3s ease-in-out infinite;
        position: relative;
      }
      
      .animate-sway {
        animation: sway 4s ease-in-out infinite;
        transform-origin: bottom center;
      }
      
      .animate-swim {
        animation: swim 8s ease-in-out infinite;
      }
      
      .pond-theme {
        animation: float 6s ease-in-out infinite;
        position: relative;
      }
      
      .forest-theme {
        position: relative;
      }
      
      .forest-theme::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(circle at 20% 30%, rgba(34,139,34,0.1) 2px, transparent 2px),
                    radial-gradient(circle at 80% 70%, rgba(139,69,19,0.1) 3px, transparent 3px);
        animation: sparkle 4s ease-in-out infinite;
        pointer-events: none;
      }
      
      .boat-theme {
        position: relative;
        overflow: hidden;
      }
      
      .boat-theme::after {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        animation: wave 3s ease-in-out infinite;
      }
      
      @keyframes wave {
        0% { left: -100%; }
        100% { left: 100%; }
      }
      
      .garden-theme {
        position: relative;
      }
      
      .garden-theme::before {
        content: '🌸';
        position: absolute;
        top: 10%;
        left: 10%;
        font-size: 2rem;
        animation: float 4s ease-in-out infinite;
        pointer-events: none;
      }
      
      .garden-theme::after {
        content: '🦋';
        position: absolute;
        top: 20%;
        right: 15%;
        font-size: 1.5rem;
        animation: float 3s ease-in-out infinite reverse;
        pointer-events: none;
      }
      
      .sunset-theme {
        position: relative;
      }
      
      .sunset-theme::before {
        content: '';
        position: absolute;
        top: 10%;
        left: 50%;
        width: 100px;
        height: 100px;
        background: radial-gradient(circle, rgba(255,215,0,0.3) 0%, transparent 70%);
        border-radius: 50%;
        transform: translateX(-50%);
        animation: pulse 2s ease-in-out infinite;
        pointer-events: none;
      }
      
      @keyframes pulse {
        0%, 100% { opacity: 0.3; transform: translateX(-50%) scale(1); }
        50% { opacity: 0.6; transform: translateX(-50%) scale(1.1); }
      }
      
      /* Pixel hover effects */
      .pixel-button:hover {
        transform: scale(1.1);
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        z-index: 10;
      }
      
      /* Glass morphism effect */
      .glass-card {
        backdrop-filter: blur(10px);
        background: rgba(255, 255, 255, 0.9);
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      }
      
      /* Theme transition */
      .theme-transition {
        transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
      }

      /* Water effect */
      .water-surface {
        background: linear-gradient(45deg, 
          rgba(135, 206, 235, 0.3) 0%, 
          rgba(70, 130, 180, 0.4) 25%, 
          rgba(135, 206, 235, 0.3) 50%, 
          rgba(70, 130, 180, 0.4) 75%, 
          rgba(135, 206, 235, 0.3) 100%);
        background-size: 40px 40px;
        animation: water-flow 4s linear infinite;
      }

      @keyframes water-flow {
        0% { background-position: 0 0; }
        100% { background-position: 40px 40px; }
      }

      /* Duck theme specific */
      .duck-bath-surface {
        background: linear-gradient(45deg, 
          rgba(255, 223, 0, 0.2) 0%, 
          rgba(135, 206, 235, 0.3) 25%, 
          rgba(255, 223, 0, 0.2) 50%, 
          rgba(135, 206, 235, 0.3) 75%, 
          rgba(255, 223, 0, 0.2) 100%);
        background-size: 30px 30px;
        animation: duck-water-flow 3s linear infinite;
      }

      @keyframes duck-water-flow {
        0% { background-position: 0 0; }
        100% { background-position: 30px 30px; }
      }
    `}</style>
  )
}
