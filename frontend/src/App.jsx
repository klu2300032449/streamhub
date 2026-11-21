import { useEffect, useMemo, useState } from 'react'
import { Search, Play, Plus, Check, Menu, X, Clapperboard, Film, Tv, Sparkles } from 'lucide-react'
import { getMovies } from './services/api'


const demo = [
 {
  id: 1,
  title: 'John Wick: Chapter 4',
  category: 'Action',
  year: 2023,
  rating: '8.2',
  description: 'John Wick fights against powerful enemies in his quest for freedom.',
  poster: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=900',
  videoUrl: 'https://www.youtube.com/embed/qEVUtrk8_B4',
  featured: true
 },
 {
  id: 2,
  title: 'Avengers: Endgame',
  category: 'Sci-Fi',
  year: 2019,
  rating: '8.4',
  description: 'The Avengers unite for one final mission to restore the universe.',
  poster: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=900',
  videoUrl: 'https://www.youtube.com/embed/TcMBFSGVi1c'
 },
 {
  id: 3,
  title: 'Top Gun: Maverick',
  category: 'Action',
  year: 2022,
  rating: '8.2',
  description: 'An experienced pilot trains a new generation for a dangerous mission.',
  poster: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=900',
  videoUrl: 'https://www.youtube.com/embed/g4U4BQW9OEk'
 },
 {
  id: 4,
  title: 'Oppenheimer',
  category: 'Drama',
  year: 2023,
  rating: '8.3',
  description: 'The story of the scientist behind the development of the atomic bomb.',
  poster: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=900',
  videoUrl: 'https://www.youtube.com/embed/bK6ldnjE3Y0'
 }
]

const categories = ['All','Action','Drama','Sci-Fi','Documentary','Thriller']
export default function App() {
 const [movies,setMovies] = useState(demo), [query,setQuery] = useState(''), [category,setCategory] = useState('All')
 const [selected,setSelected] = useState(null), [watchlist,setWatchlist] = useState(()=>JSON.parse(localStorage.getItem('streamhub-watchlist')||'[]'))
 const [mobileOpen,setMobileOpen] = useState(false)
 useEffect(()=>{getMovies().then(data=>{if(data?.length)setMovies(data)})},[])
 useEffect(()=>localStorage.setItem('streamhub-watchlist',JSON.stringify(watchlist)),[watchlist])
 const filtered = useMemo(()=>movies.filter(m=>(category==='All'||m.category===category)&&m.title.toLowerCase().includes(query.toLowerCase())),[movies,category,query])
 const featured = movies.find(m=>m.featured)||movies[0]
 const toggle = id => setWatchlist(old=>old.includes(id)?old.filter(x=>x!==id):[...old,id])
 const play = movie => setSelected(movie)
 return <div className="app">
  <header className="nav"><a className="brand" href="#"><span className="brand-icon"><Play size={17} fill="currentColor"/></span>STREAM<span>HUB</span></a>
   <nav className={mobileOpen?'nav-links open':'nav-links'}><a href="#home" onClick={()=>setMobileOpen(false)}>Home</a><a href="#browse" onClick={()=>setMobileOpen(false)}>Explore</a><a href="#watchlist" onClick={()=>setMobileOpen(false)}>My List</a></nav>
   <div className="nav-right"><div className="search"><Search size={17}/><input placeholder="Search titles..." value={query} onChange={e=>setQuery(e.target.value)}/></div><button className="menu-btn" onClick={()=>setMobileOpen(!mobileOpen)} aria-label="Toggle menu">{mobileOpen?<X/>:<Menu/>}</button><div className="avatar">S</div></div>
  </header>
  <main>
   <section className="hero" id="home" style={{backgroundImage:`linear-gradient(90deg,#080b14 5%,rgba(8,11,20,.88) 38%,rgba(8,11,20,.12) 100%),linear-gradient(0deg,#080b14,transparent 55%),url(${featured?.poster})`}}>
    <div className="hero-content"><div className="eyebrow"><Sparkles size={14}/> STREAMHUB ORIGINAL</div><h1>{featured?.title||'Discover your next story'}</h1><div className="meta"><span className="rating">★ {featured?.rating}</span><span>{featured?.year}</span><span className="tag">{featured?.category}</span><span>HD</span></div><p>{featured?.description}</p><div className="hero-actions"><button className="primary" onClick={()=>play(featured)}><Play size={17} fill="currentColor"/> Play now</button><button className="secondary" onClick={()=>toggle(featured.id)}>{watchlist.includes(featured.id)?<Check size={17}/>:<Plus size={17}/>} My List</button></div></div>
    <div className="hero-label">FEATURED THIS WEEK</div>
   </section>
   <section className="browse section" id="browse"><div className="section-heading"><div><div className="eyebrow">YOUR NEXT FAVORITE</div><h2>Explore titles</h2></div><div className="filters">{categories.map(c=><button key={c} className={category===c?'filter active':'filter'} onClick={()=>setCategory(c)}>{c}</button>)}</div></div>
    <div className="movie-grid">{filtered.map(m=><article className="movie-card" key={m.id}><button className="poster" onClick={()=>play(m)} style={{backgroundImage:`url(${m.poster})`}} aria-label={`Play ${m.title}`}><span className="play-overlay"><Play fill="currentColor"/></span><span className="poster-rating">★ {m.rating}</span></button><div className="movie-info"><div><h3>{m.title}</h3><p>{m.year} · {m.category}</p></div><button className="add-btn" onClick={()=>toggle(m.id)} aria-label="Toggle watchlist">{watchlist.includes(m.id)?<Check size={18}/>:<Plus size={18}/>}</button></div></article>)}</div>
    {!filtered.length&&<div className="empty">No titles found. Try another search.</div>}
   </section>
   <section className="watchlist section" id="watchlist"><div className="section-heading"><div><div className="eyebrow">SAVED FOR LATER</div><h2>My watchlist <span className="count">{watchlist.length}</span></h2></div></div>
    {watchlist.length?<div className="movie-grid">{movies.filter(m=>watchlist.includes(m.id)).map(m=><article className="movie-card" key={m.id}><button className="poster" onClick={()=>play(m)} style={{backgroundImage:`url(${m.poster})`}}><span className="play-overlay"><Play fill="currentColor"/></span></button><div className="movie-info"><div><h3>{m.title}</h3><p>{m.year} · {m.category}</p></div><button className="add-btn" onClick={()=>toggle(m.id)}><X size={17}/></button></div></article>)}</div>:<p className="empty">Your list is empty. Add titles you want to watch.</p>}
   </section>
  </main>
  <footer><a className="brand" href="#"><span className="brand-icon"><Play size={15} fill="currentColor"/></span>STREAM<span>HUB</span></a><p>Discover stories worth watching.</p><small>Demo project · Use licensed video content for production.</small></footer>
  
  {selected && (
    <div className="modal-backdrop" onClick={() => setSelected(null)}>
      <div className="player-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-head">
          <div>
            <span className="eyebrow">NOW PLAYING</span>
            <h2>{selected.title}</h2>
          </div>
          <button className="close" onClick={() => setSelected(null)}>
            <X />
          </button>
        </div>

        <iframe
          key={selected.id}
          src={selected.videoUrl}
          title={`${selected.title} Official Trailer`}
          width="100%"
          style={{
            aspectRatio: '16 / 9',
            border: 'none',
            display: 'block',
            borderRadius: '10px'
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />

        <p>{selected.description}</p>
      </div>
    </div>
  )}
 </div>
}
