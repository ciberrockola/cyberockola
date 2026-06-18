import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { 
  Disc, Music, Calendar, MapPin, Sparkles, Send, 
  SlidersHorizontal, ArrowUpRight, Flame, Volume2, 
  HelpCircle, CheckCircle, AlertCircle, Info, ChevronRight, Tag
} from 'lucide-react'

import { allPosts } from 'content-collections'

export const Route = createFileRoute('/')({
  component: CyberRockolaHome,
})

// Static list of Spanish festivals for the interactive agenda table
const FESTIVAL_AGENDA_DATA = [
  {
    id: 'primavera-sound',
    name: 'Primavera Sound',
    city: 'Barcelona (Parc del Fòrum)',
    dates: '28 - 31 de Mayo, 2026',
    genres: ['Indie', 'Experimental', 'Pop', 'Electronic'],
    link: '/posts/primavera_sound_2026_cr_nica_y_agenda',
    status: 'Cartel Cerrado',
    highlight: 'Radiohead + Charli XCX'
  },
  {
    id: 'resurrection-fest',
    name: 'Resurrection Fest',
    city: 'Viveiro, Lugo (Galicia)',
    dates: '24 - 27 de Junio, 2026',
    genres: ['Metal', 'Hardcore', 'Punk'],
    link: '/posts/resurrection_fest_2026_el_templo_del_metal',
    status: 'Últimos Abonos',
    highlight: 'System of a Down + Iron Maiden'
  },
  {
    id: 'weekend-beach',
    name: 'Weekend Beach Festival',
    city: 'Torre del Mar, Málaga',
    dates: '01 - 04 de Julio, 2026',
    genres: ['Rock', 'Indie', 'Electronic', 'Urban', 'Mestizaje'],
    link: '/posts/weekend_beach_festival_2026',
    status: 'Entradas Disponibles',
    highlight: 'The Chemical Brothers + Justice'
  },
  {
    id: 'mad-cool',
    name: 'Mad Cool Festival',
    city: 'Villaverde Alto, Madrid',
    dates: '08 - 11 de Julio, 2026',
    genres: ['Rock', 'Pop', 'Indie', 'Electronic'],
    link: '/posts/mad_cool_festival_madrid_2026_el_gigante_metropolitano',
    status: 'Abonos en Venta',
    highlight: 'Foo Fighters + Dua Lipa'
  },
  {
    id: 'sonar',
    name: 'Sónar Barcelona',
    city: 'Fira Montjuïc & Gran Via',
    dates: '18 - 20 de Junio, 2026',
    genres: ['Electronic', 'Techno', 'Experimental'],
    link: '#',
    status: 'Cartel en Progreso',
    highlight: 'Artistas Digitales Mundiales'
  },
  {
    id: 'bilbao-bbk',
    name: 'Bilbao BBK Live',
    city: 'Monte Kobetamendi, Bilbao',
    dates: '09 - 11 de Julio, 2026',
    genres: ['Indie', 'Rock', 'Pop'],
    link: '#',
    status: 'Abonos en Venta',
    highlight: 'Bandas Alternativas de Culto'
  }
]

function CyberRockolaHome() {
  // Main Tab State: 'weekend-beach' | 'articulos' | 'agenda'
  const [activeTab, setActiveTab] = useState('weekend-beach')

  // Selected Year for the Weekend Beach Festival Interactive Explorer
  const [selectedWbfYear, setSelectedWbfYear] = useState('2026')

  // Agenda Genre Filter State
  const [agendaGenreFilter, setAgendaGenreFilter] = useState('Todos')

  // Form Submission State
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({ name: '', email: '', interest: 'Rock & Indie' })

  // Segment posts by category
  const wbfPosts = allPosts.filter(p => p.categories.includes('Weekend Beach'))
  const articlePosts = allPosts.filter(p => p.categories.includes('Artículos'))
  const agendaPosts = allPosts.filter(p => p.categories.includes('Agenda'))

  // Find current active post for the Weekend Beach interactive section
  // Map selected year to slug
  const currentWbfPost = wbfPosts.find(p => p.slug === `weekend_beach_festival_${selectedWbfYear}`) || wbfPosts[0]

  // Filtered Agenda data
  const filteredFestivals = FESTIVAL_AGENDA_DATA.filter((fest) => {
    if (agendaGenreFilter === 'Todos') return true
    return fest.genres.includes(agendaGenreFilter)
  })

  // Netlify Forms AJAX handler
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email) {
      setFormStatus('error')
      return
    }

    setFormStatus('submitting')

    try {
      const submissionData = new URLSearchParams()
      submissionData.append('form-name', 'newsletter')
      submissionData.append('name', formData.name)
      submissionData.append('email', formData.email)
      submissionData.append('interest', formData.interest)

      const response = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: submissionData.toString(),
      })

      if (response.ok) {
        setFormStatus('success')
        setFormData({ name: '', email: '', interest: 'Rock & Indie' })
      } else {
        setFormStatus('error')
      }
    } catch (err) {
      console.error(err)
      setFormStatus('error')
    }
  }

  // Auto-scroll target checks for hash anchors
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      const element = document.querySelector(hash)
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    }
  }, [])

  return (
    <div className="stripe-bg min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-24 md:py-32 border-b border-purple-500/10 bg-black/30">
        
        {/* Glow ambient lights */}
        <div className="absolute top-1/4 left-1/3 w-[300px] h-[300px] rounded-full bg-pink-500/10 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-[350px] h-[350px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Col: Hero Text */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Hot tag */}
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-pink-500/20 bg-pink-500/5 font-mono text-[10px] text-neon-pink font-bold uppercase tracking-widest animate-pulse-neon">
                <Flame className="w-3 h-3 text-[#ff2a85] fill-current" />
                <span>EL PULSO DEL ROCK Y DEL NEÓN</span>
              </div>

              {/* Bold Title */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-wider leading-none text-white font-['Syne'] uppercase">
                Bienvenido a <br />
                <span className="text-neon-pink text-transparent bg-clip-text bg-gradient-to-r from-[#ff2a85] via-[#8b5cf6] to-[#00f0ff]">
                  CyberRockola
                </span>
              </h1>

              {/* Subtext */}
              <p className="text-base sm:text-lg font-mono text-gray-400 max-w-xl leading-relaxed">
                Descubre crónicas definitivas, fotografías espectaculares y la agenda de festivales en España. Desde el histórico <span className="text-[#00f0ff] font-bold">Weekend Beach Festival</span> de Torre del Mar hasta los clubes analógicos del mañana.
              </p>

              {/* Badges/Metrics */}
              <div className="grid grid-cols-3 gap-4 pt-4 max-w-md border-t border-purple-500/10 font-mono text-left">
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-[#ff2a85]">11</p>
                  <p className="text-[9px] text-gray-500 tracking-widest uppercase">// EDICIONES</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-[#00f0ff]">120K</p>
                  <p className="text-[9px] text-gray-500 tracking-widest uppercase">// ALMAS</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-yellow-400">100%</p>
                  <p className="text-[9px] text-gray-500 tracking-widest uppercase">// ACTITUD</p>
                </div>
              </div>

              {/* Action Links */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <a 
                  href="#weekend-beach-timeline" 
                  className="font-mono font-bold text-xs text-center px-6 py-4 bg-gradient-to-r from-[#ff2a85] to-[#8b5cf6] hover:opacity-90 rounded text-white tracking-widest uppercase transition-all shadow-[0_4px_20px_rgba(255,42,133,0.2)]"
                >
                  🌴 Weekend Beach Archivo
                </a>
                <a 
                  href="#festival-radar" 
                  className="font-mono font-bold text-xs text-center px-6 py-4 border border-cyan-500/30 hover:border-cyan-400 bg-cyan-500/5 hover:bg-cyan-500/10 text-[#00f0ff] tracking-widest uppercase rounded transition-all"
                >
                  📅 Radar Festivales 2026
                </a>
              </div>

            </div>

            {/* Right Col: Hero Interactive Graphic (Vinyl / Synth style panel) */}
            <div className="lg:col-span-5 hidden lg:block">
              <div className="relative mx-auto max-w-sm rounded-3xl border border-purple-500/15 bg-gradient-to-b from-[#170e28] to-[#0d0718] p-6 shadow-[0_10px_50px_rgba(0,0,0,0.5)] overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-500/10 via-transparent to-transparent pointer-events-none" />
                
                {/* Vintage tape panel header */}
                <div className="flex items-center justify-between border-b border-purple-500/10 pb-4 mb-6 font-mono text-[9px] text-gray-500">
                  <span>MODEL: CYBER-90 // STEREO</span>
                  <span className="text-[#ff2a85] animate-pulse">● RECORDING ON</span>
                </div>

                {/* Spinning vinyl design */}
                <div className="flex items-center justify-center py-6 relative">
                  <div className="w-56 h-56 rounded-full border-4 border-black bg-gradient-to-r from-gray-900 via-zinc-800 to-gray-900 relative shadow-2xl flex items-center justify-center">
                    {/* Vinyl grooves */}
                    <div className="absolute inset-2 rounded-full border border-zinc-700/40" />
                    <div className="absolute inset-6 rounded-full border border-zinc-700/30" />
                    <div className="absolute inset-10 rounded-full border border-zinc-700/20" />
                    <div className="absolute inset-16 rounded-full border border-zinc-700/10" />
                    
                    {/* Vinyl label */}
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#ff2a85] to-[#00f0ff] p-1 flex items-center justify-center animate-[spin_10s_linear_infinite]">
                      <div className="w-full h-full rounded-full bg-black flex flex-col items-center justify-center text-center font-mono">
                        <span className="text-[7px] text-[#ff2a85] font-bold tracking-widest">CYBER</span>
                        <span className="text-[6px] text-[#00f0ff] tracking-widest -mt-1">ROCKOLA</span>
                        <div className="w-2 h-2 rounded-full bg-zinc-900 border border-zinc-700 mt-1" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Simulated digital sound wave */}
                <div className="space-y-1 mt-6 font-mono">
                  <div className="flex justify-between items-center text-[10px] text-gray-400">
                    <span className="flex items-center gap-1.5"><Volume2 className="w-3.5 h-3.5 text-neon-pink" /> MASTER LEVEL</span>
                    <span className="text-[#00f0ff]">+1.2dB</span>
                  </div>
                  <div className="flex gap-1 h-8 items-end bg-black/40 p-1.5 rounded border border-purple-500/10">
                    {[15, 30, 75, 45, 85, 95, 60, 20, 50, 40, 80, 70, 90, 35, 15].map((h, i) => (
                      <div 
                        key={i} 
                        style={{ height: `${h}%` }}
                        className={`flex-grow rounded-sm transition-all duration-300 ${
                          h > 75 
                            ? 'bg-[#ff2a85]' 
                            : h > 45 
                              ? 'bg-purple-500' 
                              : 'bg-[#00f0ff]'
                        }`}
                      />
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. DYNAMIC CONTENT FILTER TABS */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Selector Tabs */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 md:gap-4 border-b border-purple-500/10 pb-6 mb-12">
          <button 
            onClick={() => setActiveTab('weekend-beach')}
            className={`w-full sm:w-auto font-mono text-xs font-bold px-6 py-3.5 rounded border tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${
              activeTab === 'weekend-beach'
                ? 'border-pink-500 bg-[#ff2a85]/10 text-neon-pink shadow-[0_0_15px_rgba(255,42,133,0.15)]'
                : 'border-purple-500/10 hover:border-pink-500/30 text-gray-400 hover:text-white bg-pink-500/5'
            }`}
          >
            <Music className="w-4 h-4" />
            🌴 WEEKEND BEACH (11 EDICIONES)
          </button>
          <button 
            onClick={() => setActiveTab('articulos')}
            className={`w-full sm:w-auto font-mono text-xs font-bold px-6 py-3.5 rounded border tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${
              activeTab === 'articulos'
                ? 'border-pink-500 bg-[#ff2a85]/10 text-neon-pink shadow-[0_0_15px_rgba(255,42,133,0.15)]'
                : 'border-purple-500/10 hover:border-pink-500/30 text-gray-400 hover:text-white bg-pink-500/5'
            }`}
          >
            <Newspaper className="w-4 h-4" />
            📰 ARTÍCULOS MUSICALES
          </button>
          <button 
            onClick={() => setActiveTab('agenda')}
            className={`w-full sm:w-auto font-mono text-xs font-bold px-6 py-3.5 rounded border tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${
              activeTab === 'agenda'
                ? 'border-pink-500 bg-[#ff2a85]/10 text-neon-pink shadow-[0_0_15px_rgba(255,42,133,0.15)]'
                : 'border-purple-500/10 hover:border-pink-500/30 text-gray-400 hover:text-white bg-pink-500/5'
            }`}
          >
            <Calendar className="w-4 h-4" />
            🗓️ AGENDA DE FESTIVALES 2026
          </button>
        </div>

        {/* TAB 1: WEEKEND BEACH TIMELINE EXPLORER */}
        {activeTab === 'weekend-beach' && (
          <div id="weekend-beach-timeline" className="space-y-8 animate-fadeIn">
            
            <div className="text-center max-w-xl mx-auto mb-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold font-['Syne'] text-white uppercase">
                🌴 ARCHIVO HISTÓRICO WEEKEND BEACH
              </h2>
              <p className="font-mono text-xs text-gray-400 mt-2">
                Selecciona una edición para revivir sus carteles oficiales, momentos cumbres y fotografías espectaculares a pie de playa.
              </p>
            </div>

            {/* Horizontally scrolling interactive timeline buttons */}
            <div className="flex overflow-x-auto pb-4 gap-2 scrollbar-thin scrollbar-thumb-pink-500">
              {['2026', '2025', '2024', '2023', '2022', '2019', '2018', '2017', '2016', '2015', '2014'].map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedWbfYear(year)}
                  className={`flex-shrink-0 font-mono text-xs font-bold px-5 py-3 rounded-md border transition-all duration-200 ${
                    selectedWbfYear === year
                      ? 'bg-gradient-to-r from-[#ff2a85] to-[#8b5cf6] border-[#ff2a85] text-white shadow-[0_0_15px_rgba(255,42,133,0.3)] scale-105'
                      : 'border-purple-500/15 bg-black/40 text-gray-400 hover:text-white hover:border-pink-500/30'
                  }`}
                >
                  Edición {year} {year === '2026' ? '🔥' : year === '2014' ? '🆕' : ''}
                </button>
              ))}
            </div>

            {/* Dynamic Card Display */}
            {currentWbfPost ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-4">
                
                {/* Col 1: Cover Image & Quick stats */}
                <div className="lg:col-span-5 relative rounded-2xl overflow-hidden min-h-[300px] lg:min-h-full border border-purple-500/10">
                  <img 
                    src={currentWbfPost.image} 
                    alt={currentWbfPost.title}
                    className="absolute inset-0 w-full h-full object-cover saturate-110 brightness-90 filter hover:scale-102 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  
                  {/* Floating tag */}
                  <span className="absolute top-4 left-4 font-mono text-[9px] font-bold px-3 py-1 bg-[#ff2a85] text-white rounded-full uppercase tracking-wider">
                    EDICIÓN {selectedWbfYear}
                  </span>

                  {/* Absolute positioning of details */}
                  <div className="absolute bottom-6 left-6 right-6 font-mono text-xs text-gray-300 space-y-3">
                    <p className="text-xl font-bold font-['Syne'] text-white uppercase">{currentWbfPost.title}</p>
                    <div className="flex flex-col gap-1.5 border-t border-white/10 pt-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-pink-500" />
                        <span>Julio de {selectedWbfYear}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-cyan-400" />
                        <span>Torre del Mar, Málaga (Playa Poniente)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Col 2: Text summary and content snippet */}
                <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-2xl border border-purple-500/10 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-4 h-4 text-yellow-400" />
                      <span className="font-mono text-[10px] text-yellow-300 font-bold tracking-widest uppercase">// RESUMEN CRÓNICA</span>
                    </div>
                    <h3 className="text-2xl font-bold font-['Syne'] text-[#00f0ff] uppercase">{currentWbfPost.title}</h3>
                    <p className="font-mono text-sm text-gray-300 leading-relaxed">
                      {currentWbfPost.summary}
                    </p>
                    <p className="text-xs text-gray-400 leading-relaxed font-mono line-clamp-4">
                      El Weekend Beach Festival {selectedWbfYear} reunió a miles de weekeners a orillas de la costa malagueña en Torre del Mar. Con un recinto dotado de cuatro escenarios simultáneos, se consagró como uno de los mayores hitos culturales de Andalucía del año.
                    </p>
                  </div>

                  <div className="pt-6 border-t border-purple-500/10 flex items-center justify-between">
                    <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">// CATEGORY: WEEKEND BEACH</span>
                    <Link 
                      to={`/posts/${currentWbfPost.slug}`}
                      className="font-mono text-xs font-bold px-4 py-2.5 bg-[#ff2a85]/10 hover:bg-[#ff2a85]/20 border border-pink-500/30 text-neon-pink rounded uppercase tracking-wider flex items-center gap-2 transition-colors duration-200"
                    >
                      <span>LEER CRÓNICA COMPLETA</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

              </div>
            ) : (
              <div className="p-12 text-center font-mono text-gray-500 border border-dashed border-purple-500/20 rounded">
                Cargando datos de la edición...
              </div>
            )}

          </div>
        )}

        {/* TAB 2: ARTICLES GRID */}
        {activeTab === 'articulos' && (
          <div id="articulos-musicales" className="space-y-8 animate-fadeIn">
            
            <div className="text-center max-w-xl mx-auto mb-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold font-['Syne'] text-white uppercase">
                📰 ARTÍCULOS Y ANÁLISIS MUSICALES
              </h2>
              <p className="font-mono text-xs text-gray-400 mt-2">
                Opinión, crónicas de género, guías y tendencias analizadas por nuestros expertos sónicos.
              </p>
            </div>

            {/* Asymmetric Grid layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              {articlePosts.map((post, index) => (
                <Link 
                  key={post.slug} 
                  to={`/posts/${post.slug}`}
                  className={`group flex flex-col glass-panel rounded-2xl overflow-hidden border border-purple-500/10 hover:border-pink-500/30 transition-all duration-300 hover:-translate-y-1 shadow-[0_4px_30px_rgba(0,0,0,0.3)] ${
                    index === 0 ? 'md:col-span-2 lg:col-span-2 flex-row' : ''
                  }`}
                >
                  {/* Card Image */}
                  <div className={`relative overflow-hidden bg-black ${
                    index === 0 ? 'w-2/5 min-h-[320px] hidden sm:block' : 'h-48 w-full'
                  }`}>
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter saturate-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[9px] font-bold px-2 py-0.5 bg-pink-500/10 text-neon-pink border border-pink-500/20 rounded uppercase">
                          {post.categories[0]}
                        </span>
                        <span className="font-mono text-[9px] text-gray-500">{post.date}</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-neon-pink transition-colors leading-snug uppercase font-mono">
                        {post.title}
                      </h3>
                      <p className="font-mono text-xs text-gray-400 leading-relaxed line-clamp-3">
                        {post.summary}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-purple-500/10 flex items-center justify-between text-xs font-mono">
                      <span className="text-[#00f0ff] font-bold uppercase tracking-wider flex items-center gap-1">
                        LEER ARTÍCULO <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

          </div>
        )}

        {/* TAB 3: SPAIN FESTIVAL AGENDA */}
        {activeTab === 'agenda' && (
          <div id="festival-agenda" className="space-y-8 animate-fadeIn">
            
            <div className="text-center max-w-xl mx-auto mb-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold font-['Syne'] text-white uppercase">
                🗓️ CALENDARIO DE FESTIVALES EN ESPAÑA 2026
              </h2>
              <p className="font-mono text-xs text-gray-400 mt-2">
                Consulta los artículos informativos detallados de los festivales que están en agenda próximamente.
              </p>
            </div>

            {/* List agenda posts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              {agendaPosts.map((post) => (
                <Link 
                  key={post.slug} 
                  to={`/posts/${post.slug}`}
                  className="group flex flex-col glass-panel rounded-xl overflow-hidden border border-purple-500/10 hover:border-pink-500/30 transition-all duration-300 hover:-translate-y-1 shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
                >
                  <div className="relative h-44 bg-black">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 filter brightness-90 saturate-115"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <span className="absolute top-3 left-3 font-mono text-[9px] font-bold px-2 py-1 bg-[#ff2a85] text-white border border-pink-500/20 rounded uppercase">
                      AGENDA 2026
                    </span>
                  </div>
                  <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <span className="font-mono text-[9px] text-gray-500">{post.date}</span>
                      <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-neon-pink transition-colors uppercase font-mono line-clamp-1">
                        {post.title}
                      </h3>
                      <p className="font-mono text-xs text-gray-400 line-clamp-2 leading-relaxed">
                        {post.summary}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-purple-500/10 text-xs font-mono text-[#00f0ff] font-bold flex items-center justify-between">
                      <span>VER DETALLES FESTIVAL</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

          </div>
        )}

      </section>

      {/* 3. INTERACTIVE AGENDA RADAR & FILTER */}
      <section id="festival-radar" className="py-16 border-t border-b border-purple-500/10 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <div className="inline-flex items-center gap-1 text-neon-pink font-mono text-[10px] font-bold uppercase tracking-widest mb-1">// DOCK DE CONEXIÓN CRÓNICAS</div>
              <h2 className="text-3xl font-extrabold font-['Syne'] text-white uppercase tracking-wider">
                radar de festivales 2026
              </h2>
            </div>
            
            {/* Horizontal inline filtering bar */}
            <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
              <span className="text-gray-500 mr-2 flex items-center gap-1"><SlidersHorizontal className="w-3.5 h-3.5" /> FILTRO:</span>
              {['Todos', 'Rock', 'Indie', 'Electronic', 'Metal', 'Pop'].map((genre) => (
                <button
                  key={genre}
                  onClick={() => setAgendaGenreFilter(genre)}
                  className={`px-3 py-1.5 rounded-md border text-[10px] font-bold uppercase tracking-wider transition-colors duration-200 ${
                    agendaGenreFilter === genre
                      ? 'bg-[#ff2a85] border-pink-500 text-white shadow-[0_0_10px_rgba(255,42,133,0.25)]'
                      : 'border-purple-500/10 bg-black/40 text-gray-400 hover:text-white hover:border-pink-500/30'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* Styled Terminal list view */}
          <div className="glass-panel rounded-2xl overflow-hidden border border-purple-500/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
            
            {/* Header / Table top bar */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-purple-950/25 border-b border-purple-500/10 text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest">
              <div className="col-span-3">FESTIVAL</div>
              <div className="col-span-3">FECHAS & LUGAR</div>
              <div className="col-span-2">HIGHLIGHT</div>
              <div className="col-span-2">ESTILO PRINCIPAL</div>
              <div className="col-span-2 text-right">ACCIONES</div>
            </div>

            {/* List items */}
            {filteredFestivals.length > 0 ? (
              <div className="divide-y divide-purple-500/10 font-mono text-xs">
                {filteredFestivals.map((fest) => (
                  <div 
                    key={fest.id} 
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-5 items-center hover:bg-pink-500/[0.02] transition-colors duration-200"
                  >
                    
                    {/* Col 1: Name */}
                    <div className="col-span-1 md:col-span-3">
                      <p className="text-sm font-bold text-white font-['Syne'] uppercase tracking-wider">{fest.name}</p>
                      <span className={`inline-block text-[8px] font-bold px-1.5 py-0.5 rounded mt-1 uppercase ${
                        fest.status.includes('Disponibles') || fest.status.includes('Venta')
                          ? 'bg-green-500/15 text-green-400 border border-green-500/20'
                          : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/15'
                      }`}>
                        [ {fest.status} ]
                      </span>
                    </div>

                    {/* Col 2: Dates/Place */}
                    <div className="col-span-1 md:col-span-3 text-gray-300">
                      <p className="font-bold flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-[#ff2a85]" /> {fest.dates}</p>
                      <p className="text-[11px] text-gray-500 flex items-center gap-1.5 mt-0.5"><MapPin className="w-3.5 h-3.5 text-cyan-400" /> {fest.city}</p>
                    </div>

                    {/* Col 3: Highlight */}
                    <div className="col-span-1 md:col-span-2">
                      <p className="text-[10px] text-gray-500 uppercase md:hidden font-bold">// DESTACADOS:</p>
                      <p className="text-[#ffee00] font-bold text-[11px]">{fest.highlight}</p>
                    </div>

                    {/* Col 4: Style/Genres */}
                    <div className="col-span-1 md:col-span-2 flex flex-wrap gap-1">
                      {fest.genres.slice(0, 3).map((g) => (
                        <span key={g} className="text-[9px] px-2 py-0.5 bg-purple-500/5 text-purple-300 border border-purple-500/20 rounded">
                          {g}
                        </span>
                      ))}
                    </div>

                    {/* Col 5: Actions */}
                    <div className="col-span-1 md:col-span-2 text-right">
                      {fest.link !== '#' ? (
                        <Link 
                          to={fest.link}
                          className="inline-flex w-full md:w-auto items-center justify-center gap-1.5 text-center px-4 py-2 bg-cyan-500/10 hover:bg-[#ff2a85]/15 border border-cyan-500/30 hover:border-[#ff2a85]/50 text-cyan-400 hover:text-neon-pink font-bold text-[10px] rounded transition-all duration-300 uppercase tracking-wider shadow-[0_0_10px_rgba(0,240,255,0.05)]"
                        >
                          <span>CRÓNICA</span>
                          <ChevronRight className="w-3 h-3" />
                        </Link>
                      ) : (
                        <span className="text-[10px] text-gray-500 italic block pr-4">Por Anunciar</span>
                      )}
                    </div>

                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center text-gray-500 font-mono flex flex-col items-center justify-center gap-3">
                <Info className="w-8 h-8 text-pink-500 animate-pulse" />
                <p>No se encontraron festivales para el filtro seleccionado.</p>
                <button 
                  onClick={() => setAgendaGenreFilter('Todos')}
                  className="font-bold text-xs underline text-[#ff2a85]"
                >
                  Restaurar Filtros
                </button>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* 4. NETLIFY FORM SIGNUP */}
      <section id="club-rockola" className="py-20 relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel border-2 border-pink-500/15 p-8 sm:p-12 rounded-3xl shadow-[0_10px_40px_rgba(255,42,133,0.1)] relative overflow-hidden stripe-bg">
          
          {/* Ambient lighting inside form card */}
          <div className="absolute bottom-0 right-0 w-44 h-44 bg-cyan-500/10 rounded-full filter blur-3xl pointer-events-none" />
          <div className="absolute top-0 left-0 w-44 h-44 bg-pink-500/10 rounded-full filter blur-3xl pointer-events-none" />

          {/* Form Header */}
          <div className="text-center space-y-3 mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-black/40 border border-purple-500/20 font-mono text-[9px] text-[#00f0ff] font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>boletín encriptado de neón</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-['Syne'] text-white uppercase tracking-wider">
              ÚNETE AL CLUB CYBERROCKOLA
            </h2>
            <p className="font-mono text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
              Consigue preventas exclusivas, carteles filtrados antes que nadie y crónicas detalladas del Weekend Beach y la escena nacional.
            </p>
          </div>

          {/* Main Netlify Form */}
          {formStatus === 'success' ? (
            <div className="p-8 text-center bg-green-500/10 border border-green-500/30 rounded-xl space-y-4 font-mono animate-fadeIn">
              <CheckCircle className="w-12 h-12 text-green-400 mx-auto animate-bounce" />
              <h3 className="text-lg font-bold text-white uppercase">// CONEXIÓN ESTABLECIDA</h3>
              <p className="text-sm text-gray-300 leading-relaxed max-w-md mx-auto">
                ¡Registro completado con éxito, weekener! Tu correo ha sido encriptado y registrado en el canal de CyberRockola Music. Mantente alerta de las señales.
              </p>
              <button 
                onClick={() => setFormStatus('idle')}
                className="text-xs font-bold px-4 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/40 text-green-300 rounded"
              >
                Volver a registrar
              </button>
            </div>
          ) : (
            <form 
              name="newsletter" 
              method="POST" 
              data-netlify="true" 
              netlify-honeypot="bot-field"
              onSubmit={handleFormSubmit}
              className="space-y-6 font-mono text-xs text-left"
            >
              {/* Hidden honeypot form elements for AJAX */}
              <input type="hidden" name="form-name" value="newsletter" />
              <p className="hidden">
                <label>
                  Don't fill this out if you're human: <input name="bot-field" />
                </label>
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-gray-400 font-bold uppercase tracking-widest">
                    // TU NOMBRE EN CLAVE
                  </label>
                  <input 
                    type="text" 
                    id="name"
                    name="name"
                    required
                    placeholder="Ej. Alex Rockero"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-black/40 border border-purple-500/20 focus:border-pink-500 focus:outline-none p-3.5 rounded text-white transition-all text-xs font-mono placeholder-gray-600"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-gray-400 font-bold uppercase tracking-widest">
                    // TU CORREO ENCRIPTADO
                  </label>
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    required
                    placeholder="Ej. weekener@cyber.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-black/40 border border-purple-500/20 focus:border-pink-500 focus:outline-none p-3.5 rounded text-white transition-all text-xs font-mono placeholder-gray-600"
                  />
                </div>
              </div>

              {/* Interest Selector */}
              <div className="space-y-2">
                <label htmlFor="interest" className="block text-gray-400 font-bold uppercase tracking-widest">
                  // TU GÉNERO SONORO FAVORITO
                </label>
                <select 
                  id="interest"
                  name="interest"
                  value={formData.interest}
                  onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                  className="w-full bg-black/40 border border-purple-500/20 focus:border-pink-500 focus:outline-none p-3.5 rounded text-white transition-all text-xs font-mono cursor-pointer"
                >
                  <option value="Rock & Indie" className="bg-[#0a070f] text-white">Rock & Indie Alternativo</option>
                  <option value="Electronic & Techno" className="bg-[#0a070f] text-white">Electronic & Techno (Sunrise)</option>
                  <option value="Metal & Extreme" className="bg-[#0a070f] text-white">Heavy Metal & Hardcore</option>
                  <option value="Pop & Urban" className="bg-[#0a070f] text-white">Pop Urbano & Mestizaje</option>
                </select>
              </div>

              {/* Error indicator */}
              {formStatus === 'error' && (
                <div className="p-3.5 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg flex items-center gap-2 font-mono">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span>Error: Por favor introduce datos válidos para registrar tu firma.</span>
                </div>
              )}

              {/* Submit button */}
              <div className="pt-2">
                <button 
                  type="submit" 
                  disabled={formStatus === 'submitting'}
                  className="w-full font-mono font-bold text-xs py-4 rounded border border-pink-500 hover:border-pink-400 bg-gradient-to-r from-[#ff2a85] to-[#8b5cf6] text-white tracking-widest uppercase transition-all shadow-[0_4px_15px_rgba(255,42,133,0.15)] hover:shadow-[0_4px_25px_rgba(255,42,133,0.3)] disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  {formStatus === 'submitting' ? 'SINCRO-ENCRIPTANDO...' : 'REGISTRAR FIRMA DE NEÓN'}
                </button>
              </div>

            </form>
          )}

        </div>
      </section>

    </div>
  )
}
