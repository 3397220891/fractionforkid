import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        {/* 多玩家架构UI示例 */}
        <div style={{position: 'fixed', left: 16, top: 16, zIndex: 1000, background: '#fff', borderRadius: 8, padding: '8px 18px', boxShadow: '0 2px 8px #0002', minWidth: 220}}>
          <div style={{fontWeight: 'bold', fontSize: 15, color: '#222'}}>Room: <span id="room-id">DEMO1</span></div>
          <div style={{margin: '6px 0 2px 0', fontSize: 13, color: '#666'}}>Playerlist:</div>
          <ul id="player-list" style={{margin: 0, padding: 0, listStyle: 'none'}}>
            <li style={{color: '#1a7', fontWeight: 500}}>You</li>
            <li style={{color: '#888'}}>Prof Anand</li>
            <li style={{color: '#888'}}>Lin</li>
          </ul>
          <div style={{marginTop: 6, fontSize: 12, color: '#888'}}>status: <span style={{color: '#1a7'}}>connected</span></div>
        </div>
      </body>
    </html>
  )
}
