import React, { useEffect, useRef, useState } from 'react'

const projects = [
  {
    title: 'Skillora — AI Placement Platform',
    desc: 'Developed an AI-powered placement preparation platform with resume analysis, mock interviews, coding practice, aptitude tests, and personalized roadmaps. Built intelligent systems for resume evaluation and interview feedback using AI-based scoring.',
    tags: ['React.js', 'FastAPI', 'Python', 'AI/ML'],
    emoji: '🎯',
    github: 'https://github.com/Varada-Deekshitha',
    featured: true,
    color: '#7c6fff',
  },
  {
    title: 'Personal Portfolio Website',
    desc: 'Built a responsive full-stack portfolio website to showcase projects, skills, and professional experience dynamically. Developed REST APIs to manage dynamic content and implemented interactive UI features like project filtering and animated sections.',
    tags: ['React.js', 'Django', 'Django REST', 'SQL'],
    emoji: '💼',
    github: 'https://github.com/Varada-Deekshitha',
    featured: true,
    color: '#2dd4bf',
  },
  {
    title: 'Agentic AI System',
    desc: 'Intelligent agent-based AI system built during Indian Servers internship. Developed automation scripts and executed threat detection workflows to enhance system security protocols.',
    tags: ['Python', 'Agentic AI', 'ML', 'Automation'],
    emoji: '🤖',
    github: 'https://github.com/Varada-Deekshitha',
    featured: false,
    color: '#f472b6',
  },
  {
    title: 'Gaming Zone',
    desc: 'Interactive gaming zone with Sudoku, Number Guessing and Rock-Paper-Scissors mini-games with real-time score tracking.',
    tags: ['React', 'Django', 'JavaScript', 'CSS'],
    emoji: '🎮',
    github: 'https://github.com/Varada-Deekshitha',
    featured: false,
    color: '#a594ff',
  },
]

const GithubIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.03c-3.34.72-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
)

function Card({ p, i, vis }) {
  return (
    <div className={`pj-card ${vis ? 'v' : ''}`} style={{ transitionDelay: `${i * .09}s` }}>
      <div className="pj-top-bar" style={{ background: `linear-gradient(90deg, ${p.color}, transparent)` }} />
      <div className="pj-card-glow" style={{ background: p.color }} />
      <div className="pj-body">
        <div className="pj-head">
          <div className="pj-ico">{p.emoji}</div>
          {p.featured && <span className="pj-feat" style={{ color: p.color, borderColor: `${p.color}40`, background: `${p.color}12` }}>Featured</span>}
        </div>
        <h3 className="pj-title">{p.title}</h3>
        <p className="pj-desc">{p.desc}</p>
        <div className="pj-tags">
          {p.tags.map(t => (
            <span key={t} className="pj-tag" style={{ color: p.color, borderColor: `${p.color}30`, background: `${p.color}0d` }}>{t}</span>
          ))}
        </div>
        <a href={p.github} target="_blank" rel="noreferrer" className="pj-gh">
          <GithubIcon /> View on GitHub
        </a>
      </div>
    </div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  const [filter, setFilter] = useState('All')
  const filters = ['All', 'Featured', 'React', 'Django', 'AI', 'HTML/CSS']

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: .08 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const shown = projects.filter(p => {
    if (filter === 'All') return true
    if (filter === 'Featured') return p.featured
    if (filter === 'AI') return p.tags.some(t => t.toLowerCase().includes('ai') || t === 'LLM')
    if (filter === 'HTML/CSS') return p.tags.includes('HTML') || p.tags.includes('CSS')
    return p.tags.some(t => t.toLowerCase().includes(filter.toLowerCase()))
  })

  return (
    <>
      <style>{`
        .pj-sec {
          padding:8rem 2rem; background:var(--bg);
          position:relative; overflow:hidden;
        }
        .pj-sec::before {
          content:''; position:absolute; inset:0;
          background:radial-gradient(ellipse 55% 45% at 70% 60%, rgba(244,114,182,.05) 0%, transparent 60%);
          pointer-events:none;
        }

        .pj-filters { display:flex; gap:.5rem; flex-wrap:wrap; margin-bottom:2.4rem; animation:fadeUp .5s .1s ease both; }
        .pj-fb {
          background:var(--surface); border:1px solid var(--border);
          color:var(--t2); padding:.38rem 1rem; border-radius:50px;
          font-size:.76rem; font-weight:600; cursor:pointer;
          transition:all .22s; font-family:'Inter',sans-serif;
        }
        .pj-fb.act, .pj-fb:hover {
          background:var(--p); border-color:var(--p);
          color:#fff; box-shadow:0 4px 16px var(--p-glow);
          transform:translateY(-1px);
        }

        .pj-grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(295px,1fr)); gap:1.3rem; }

        .pj-card {
          background:var(--surface); border:1px solid var(--border);
          border-radius:18px; overflow:hidden; position:relative;
          opacity:0; transform:translateY(20px);
          transition:opacity .5s, transform .5s, box-shadow .28s, border-color .28s;
          box-shadow:var(--shadow);
        }
        .pj-card.v { opacity:1; transform:none; animation:popIn .5s ease both; }
        .pj-card:hover { transform:translateY(-5px) !important; box-shadow:var(--shadow-lg) !important; border-color:var(--border2) !important; }
        /* shimmer on hover */
        .pj-card::after {
          content:''; position:absolute; inset:0;
          background:linear-gradient(135deg, transparent 40%, rgba(255,255,255,.03) 50%, transparent 60%);
          background-size:200% 200%;
          opacity:0; transition:opacity .3s;
          pointer-events:none;
        }
        .pj-card:hover::after { opacity:1; animation:shimmer 1.2s ease; }
        .pj-top-bar { height:2.5px; }
        .pj-card-glow {
          position:absolute; top:-20px; right:-20px;
          width:100px; height:100px; border-radius:50%;
          filter:blur(35px); opacity:.15; pointer-events:none;
        }

        .pj-body { padding:1.4rem; position:relative; z-index:1; }
        .pj-head { display:flex; align-items:center; justify-content:space-between; margin-bottom:.9rem; }
        .pj-ico { font-size:1.65rem; }
        .pj-feat { font-size:.61rem; font-weight:700; padding:.2rem .65rem; border-radius:50px; border:1px solid; }
        .pj-title { font-size:.97rem; font-weight:800; color:var(--t1); margin-bottom:.5rem; }
        .pj-desc { font-size:.81rem; color:var(--t2); line-height:1.75; margin-bottom:1.1rem; }
        .pj-tags { display:flex; flex-wrap:wrap; gap:.35rem; margin-bottom:1.1rem; }
        .pj-tag { font-size:.67rem; font-weight:600; padding:.2rem .65rem; border-radius:50px; border:1px solid; }
        .pj-gh {
          display:inline-flex; align-items:center; gap:.45rem;
          font-size:.77rem; font-weight:600; color:var(--t2);
          text-decoration:none; padding:.38rem .9rem; border-radius:8px;
          border:1px solid var(--border); transition:all .22s;
          background:var(--bg2);
        }
        .pj-gh:hover { border-color:var(--p2); color:var(--p2); background:rgba(124,111,255,.08); }
      `}</style>

      <section className="pj-sec" id="projects" ref={ref}>
        <div style={{ maxWidth: '1080px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <h2 className="sec-title">My <span>Projects</span></h2>
          <div className="sec-line" />
          <div className="pj-filters">
            {filters.map(f => (
              <button key={f} className={`pj-fb ${filter === f ? 'act' : ''}`} onClick={() => setFilter(f)}>{f}</button>
            ))}
          </div>
          <div className="pj-grid">
            {shown.map((p, i) => <Card key={p.title} p={p} i={i} vis={vis} />)}
          </div>
        </div>
      </section>
    </>
  )
}
