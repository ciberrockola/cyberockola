import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowLeft, Calendar, Tag, Sparkles, Disc } from 'lucide-react'
import { marked } from 'marked'

import { allPosts } from 'content-collections'

export const Route = createFileRoute('/posts/$slug')({
  loader: async ({ params }) => {
    const post = allPosts.find((post) => post.slug === params.slug)
    if (!post) {
      throw new Error('Post not found')
    }
    return post
  },
  component: RouteComponent,
})

function RouteComponent() {
  const post = Route.useLoaderData()

  // Find up to 2 related posts
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug && p.categories.some(cat => post.categories.includes(cat)))
    .slice(0, 2)

  return (
    <div className="stripe-bg min-h-screen pb-12">
      
      {/* Article Hero Header */}
      <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[65vh] overflow-hidden border-b border-pink-500/20 bg-black">
        {/* Background Image */}
        <img 
          src={post.image} 
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover opacity-60 filter saturate-120"
        />
        {/* Color Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a070f] via-transparent to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-[#0a070f]/40 to-transparent" />
        
        {/* Hero Content */}
        <div className="absolute bottom-0 inset-x-0">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 pt-20">
            
            {/* Back Button */}
            <Link 
              to="/" 
              className="inline-flex items-center space-x-2 font-mono font-bold text-xs text-[#00f0ff] hover:text-[#ff2a85] bg-black/50 hover:bg-[#ff2a85]/10 px-4 py-2 rounded-full border border-cyan-500/20 hover:border-pink-500/40 transition-all duration-300 mb-6 group shadow-[0_0_15px_rgba(0,240,255,0.05)]"
            >
              <ArrowLeft className="w-3.5 h-3.5 transform group-hover:-translate-x-1 transition-transform" />
              <span>VOLVER A LA ROCKOLA</span>
            </Link>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.map((cat) => (
                <span 
                  key={cat} 
                  className={`font-mono text-[10px] font-bold px-3 py-1 rounded-full uppercase border tracking-wider flex items-center gap-1.5 ${
                    cat === 'Weekend Beach' 
                      ? 'border-pink-500/30 text-neon-pink bg-pink-500/5' 
                      : cat === 'Agenda'
                        ? 'border-yellow-500/30 text-yellow-300 bg-yellow-500/5'
                        : 'border-cyan-500/30 text-cyan-300 bg-cyan-500/5'
                  }`}
                >
                  <Tag className="w-2.5 h-2.5" />
                  {cat}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-['Syne'] leading-tight mb-4 uppercase">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center space-x-6 text-xs text-gray-400 font-mono">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-400" />
                {new Date(post.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              <span className="flex items-center gap-2 text-cyan-400">
                <Sparkles className="w-4 h-4" />
                Lectura Recomendada
              </span>
            </div>

          </div>
        </div>
      </div>

      {/* Main Content & Article Body */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Article column */}
          <article className="lg:col-span-8">
            <div className="glass-panel p-6 sm:p-10 rounded-2xl border border-purple-500/10 shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
              
              {/* Summary / Lead Paragraph */}
              <p className="text-base sm:text-lg font-mono text-pink-300 border-l-2 border-pink-500/50 pl-4 py-1 mb-8 leading-relaxed italic">
                {post.summary}
              </p>

              {/* Rendered HTML */}
              <div 
                className="markdown-content"
                dangerouslySetInnerHTML={{ __html: marked(post.content) }}
              />

            </div>
          </article>

          {/* Sidebar column with details/actions */}
          <aside className="lg:col-span-4 space-y-6">
            
            {/* Jukebox interactive widget */}
            <div className="glass-panel p-6 rounded-xl border border-[#00f0ff]/10 relative overflow-hidden stripe-bg">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#00f0ff]/5 rounded-full -mr-8 -mt-8 blur-xl" />
              
              <h3 className="font-['Syne'] uppercase font-bold text-sm text-[#00f0ff] mb-4 flex items-center gap-2 tracking-wider">
                <Disc className="w-4 h-4 animate-spin text-neon-cyan" />
                CYBER-ROCKOLA PLAYER
              </h3>
              
              <div className="border border-purple-500/20 bg-black/40 p-4 rounded-lg text-center font-mono">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">// SONANDO AHORA</p>
                <p className="text-xs text-white font-bold truncate">Radio Rockola: Summer Vibe Mix</p>
                <p className="text-[9px] text-neon-pink mt-1 animate-pulse">// 128 KBPS SYNCED //</p>
              </div>
              
              <div className="mt-4 flex flex-col gap-2 font-mono text-[10px]">
                <button className="w-full py-2 bg-[#ff2a85]/10 hover:bg-[#ff2a85]/20 border border-pink-500/30 text-neon-pink font-bold rounded tracking-wider uppercase transition-colors duration-200">
                  ⚡ SOLICITAR CANCIÓN
                </button>
                <button className="w-full py-2 bg-cyan-500/5 hover:bg-cyan-500/10 border border-cyan-500/20 text-[#00f0ff] font-bold rounded tracking-wider uppercase transition-colors duration-200">
                  🎧 ABRIR EN SPOTIFY
                </button>
              </div>
            </div>

            {/* Newsletter Side widget */}
            <div className="glass-panel p-6 rounded-xl border border-pink-500/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/5 rounded-full -mr-8 -mt-8 blur-xl" />
              
              <h3 className="font-['Syne'] uppercase font-bold text-sm text-neon-pink mb-2 tracking-wider">
                ¿TE GUSTA EL RUIDO?
              </h3>
              <p className="font-mono text-xs text-gray-400 leading-relaxed mb-4">
                Recibe crónicas de conciertos y primicias de festivales directamente en tu inbox encriptado.
              </p>
              <a 
                href="#club-rockola" 
                className="block text-center font-mono font-bold text-xs py-2 bg-gradient-to-r from-[#ff2a85] to-[#8b5cf6] text-white rounded hover:opacity-90 transition-all duration-300"
              >
                UNIRSE AL BOLETÍN
              </a>
            </div>

          </aside>

        </div>

        {/* Related articles footer list */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 pt-10 border-t border-purple-500/10">
            <h2 className="font-['Syne'] uppercase text-xl sm:text-2xl font-bold text-white mb-8 tracking-wider flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              Otros Artículos Sónicos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((rel) => (
                <Link 
                  key={rel.slug} 
                  to="/posts/$slug" 
                  params={{ slug: rel.slug }}
                  className="group flex flex-col glass-panel rounded-xl overflow-hidden border border-purple-500/10 hover:border-pink-500/30 transition-all duration-300 hover:-translate-y-1 shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
                >
                  <div className="relative h-40 overflow-hidden">
                    <img 
                      src={rel.image} 
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <span className="absolute top-3 left-3 font-mono text-[9px] font-bold px-2 py-1 bg-black/60 border border-purple-500/20 text-gray-300 rounded uppercase">
                      {rel.categories[0]}
                    </span>
                  </div>
                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-base text-white group-hover:text-neon-pink transition-colors line-clamp-1 mb-2 uppercase">
                        {rel.title}
                      </h3>
                      <p className="font-mono text-xs text-gray-400 line-clamp-2 leading-relaxed mb-4">
                        {rel.summary}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-gray-500 font-mono">
                      <span>{rel.date}</span>
                      <span className="text-[#00f0ff] group-hover:underline font-bold">LEER ARTÍCULO &gt;</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  )
}
