import { HeadContent, Link, Scripts, createRootRoute } from '@tanstack/react-router'
import { Disc, Music, Heart } from 'lucide-react'
import * as React from 'react'

import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'CyberRockola Music - Rock y Festivales en España',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&family=Syne:wght@700;800&display=swap',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen text-gray-100 relative scanlines flex flex-col justify-between">
        
        {/* Navigation Header */}
        <header className="sticky top-0 z-50 glass-panel border-b border-purple-500/10 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              
              {/* Logo */}
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="relative flex items-center justify-center w-12 h-12 rounded-full border border-pink-500/30 group-hover:border-pink-500 bg-black/40 transition-all duration-300">
                  <Disc className="w-6 h-6 text-[#ff2a85] animate-[spin_6s_linear_infinite] group-hover:text-[#00f0ff] transition-all duration-300" />
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00f0ff]"></span>
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-xl sm:text-2xl tracking-wider text-neon-pink font-['Syne'] uppercase">
                    CyberRockola
                  </span>
                  <span className="text-[10px] tracking-widest text-[#00f0ff] uppercase -mt-1 font-mono font-bold">
                    Music & Fest
                  </span>
                </div>
              </Link>

              {/* Navigation Links */}
              <nav className="hidden md:flex items-center space-x-1 font-mono text-xs font-bold">
                <Link 
                  to="/" 
                  className="px-4 py-2 text-gray-300 hover:text-[#ff2a85] hover:bg-pink-500/5 rounded-md transition-all duration-200"
                  activeProps={{ className: 'text-neon-pink bg-pink-500/10 border border-pink-500/20' }}
                  activeOptions={{ exact: true }}
                >
                  ⚡ INICIO
                </Link>
                <Link 
                  to="/" 
                  hash="weekend-beach-timeline"
                  className="px-4 py-2 text-gray-300 hover:text-[#00f0ff] hover:bg-cyan-500/5 rounded-md transition-all duration-200"
                >
                  🌴 WEEKEND BEACH
                </Link>
                <Link 
                  to="/" 
                  hash="articulos-musicales"
                  className="px-4 py-2 text-gray-300 hover:text-[#ff2a85] hover:bg-pink-500/5 rounded-md transition-all duration-200"
                >
                  📰 ARTÍCULOS
                </Link>
                <Link 
                  to="/" 
                  hash="festival-radar"
                  className="px-4 py-2 text-gray-300 hover:text-[#ffee00] hover:bg-yellow-500/5 rounded-md transition-all duration-200"
                >
                  📅 AGENDA 2026
                </Link>
              </nav>

              {/* Action Button */}
              <div className="flex items-center space-x-3">
                <a 
                  href="#club-rockola" 
                  className="font-mono font-bold text-xs px-4 py-2.5 rounded border border-cyan-500/30 hover:border-cyan-400 bg-cyan-500/10 text-[#00f0ff] tracking-wider transition-all duration-300 shadow-[0_0_15px_rgba(0,240,255,0.1)] hover:shadow-[0_0_20px_rgba(0,240,255,0.25)]"
                >
                  ÚNETE AL CLUB
                </a>
              </div>
              
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-grow w-full relative z-10">
          {children}
        </main>

        {/* Global Footer */}
        <footer className="relative mt-20 border-t border-purple-500/10 bg-black/80 backdrop-blur-md pt-16 pb-8 stripe-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
              
              {/* Col 1: About */}
              <div className="md:col-span-2">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-full border border-pink-500/30 flex items-center justify-center bg-pink-500/5">
                    <Music className="w-5 h-5 text-neon-pink" />
                  </div>
                  <span className="font-bold text-xl tracking-wider text-neon-pink font-['Syne'] uppercase">
                    CyberRockola
                  </span>
                </div>
                <p className="text-sm text-gray-400 font-mono leading-relaxed max-w-md">
                  El sanctasanctórum digital del rock y la electrónica en España. Crónicas exhaustivas, nostalgia de vinilo y el radar de festivales más completo de la costa andaluza al norte gallego.
                </p>
                <div className="mt-6 flex space-x-3">
                  {['INSTAGRAM', 'TWITTER', 'YOUTUBE', 'SPOTIFY'].map((social) => (
                    <a 
                      key={social} 
                      href="#" 
                      className="font-mono text-[10px] px-3 py-1.5 rounded border border-purple-500/10 hover:border-pink-500/30 text-gray-400 hover:text-neon-pink transition-all duration-200"
                    >
                      {social}
                    </a>
                  ))}
                </div>
              </div>

              {/* Col 2: Navigation Links */}
              <div>
                <h3 className="text-[#00f0ff] font-mono font-bold text-xs tracking-widest uppercase mb-4">
                  // SECCIONES
                </h3>
                <ul className="font-mono text-xs space-y-2.5">
                  <li>
                    <Link to="/" className="text-gray-400 hover:text-white transition-colors duration-200">
                      &gt; Inicio
                    </Link>
                  </li>
                  <li>
                    <a href="#weekend-beach-timeline" className="text-gray-400 hover:text-white transition-colors duration-200">
                      &gt; Weekend Beach Festival
                    </a>
                  </li>
                  <li>
                    <a href="#articulos-musicales" className="text-gray-400 hover:text-white transition-colors duration-200">
                      &gt; Artículos Musicales
                    </a>
                  </li>
                  <li>
                    <a href="#festival-radar" className="text-gray-400 hover:text-white transition-colors duration-200">
                      &gt; Agenda España 2026
                    </a>
                  </li>
                </ul>
              </div>

              {/* Col 3: Legal & Netlify badge */}
              <div>
                <h3 className="text-neon-pink font-mono font-bold text-xs tracking-widest uppercase mb-4">
                  // SEDE CENTRAL
                </h3>
                <p className="font-mono text-xs text-gray-400 leading-relaxed mb-4">
                  Playa de Poniente<br />
                  Torre del Mar, Málaga<br />
                  España
                </p>
                <div className="inline-block p-1 border border-pink-500/20 bg-pink-500/5 rounded">
                  <span className="font-mono text-[9px] text-[#ff2a85] font-bold">
                    [ POWERED BY NETLIFY ]
                  </span>
                </div>
              </div>
              
            </div>

            <div className="border-t border-purple-500/10 pt-8 flex flex-col sm:flex-row items-center justify-between">
              <p className="font-mono text-xs text-gray-500 flex items-center">
                CyberRockola Music &copy; 2026. Todos los derechos reservados.
              </p>
              <p className="font-mono text-xs text-gray-500 mt-4 sm:mt-0 flex items-center">
                Hecho con <Heart className="w-3 h-3 text-[#ff2a85] mx-1 fill-current" /> para melómanos rebeldes.
              </p>
            </div>
          </div>
        </footer>

        <Scripts />
      </body>
    </html>
  )
}
