"use client"

export function EnhancedStyles() {
  return (
    <style jsx global>{`
      /* Enhanced animations */
      @keyframes gradient-shift {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
      }
      
      @keyframes float-gentle {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-8px); }
      }
      
      @keyframes pulse-glow {
        0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
        50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.6); }
      }
      
      /* Enhanced card styles */
      .enhanced-card {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.3);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .enhanced-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
      }
      
      /* Enhanced theme cards */
      .theme-card {
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7));
        backdrop-filter: blur(15px);
        border: 2px solid rgba(255, 255, 255, 0.2);
        transition: all 0.4s ease;
      }
      
      .theme-card:hover {
        transform: translateY(-8px) scale(1.02);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        border-color: rgba(59, 130, 246, 0.4);
      }
      
      .theme-card.selected {
        background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 197, 253, 0.1));
        border-color: rgba(59, 130, 246, 0.6);
        box-shadow: 0 15px 35px rgba(59, 130, 246, 0.2);
      }
      
      /* Enhanced header */
      .main-header {
        background: linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #f5576c);
        background-size: 400% 400%;
        animation: gradient-shift 15s ease infinite;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      
      /* Enhanced pixel grid */
      .pixel-grid {
        background: rgba(255, 255, 255, 0.98);
        border: 3px solid rgba(255, 255, 255, 0.5);
        box-shadow: 
          inset 0 0 20px rgba(0, 0, 0, 0.05),
          0 10px 30px rgba(0, 0, 0, 0.1);
        border-radius: 16px;
      }
      
      .pixel-button {
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        border-radius: 4px;
      }
      
      .pixel-button:hover {
        transform: scale(1.15);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 10;
      }
      
      /* Enhanced progress bars */
      .progress-bar {
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
        background-size: 200% 100%;
        animation: shimmer 2s infinite;
      }
      
      @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
      
      /* Clean button styles */
      .clean-button {
        background: linear-gradient(135deg, #667eea, #764ba2);
        border: none;
        color: white;
        font-weight: 600;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
      }
      
      .clean-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
      }
    `}</style>
  )
}
