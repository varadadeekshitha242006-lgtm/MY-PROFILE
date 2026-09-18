import React, { useEffect, useRef, useState } from 'react'

const tabs = [
  {
    key: 'frontend',
    label: 'Frontend',
    icon: '⚡',
    color: '#7c6fff',
    desc: 'Building responsive, interactive user interfaces',
    skills: [
      { name: 'React JS',   sub: 'Library',   icon: '⚛️' },
      { name: 'JavaScript', sub: 'Language',  icon: '𝐉𝐒' },
      { name: 'HTML5',      sub: 'Markup',    icon: '🌐' },
      { name: 'CSS3',       sub: 'Styling',   icon: '🎨' },
    ],
  },
  {
    key: 'backend',
    label: 'Backend',
    icon: '🔧',
    color: '#2dd4bf',
    desc: 'Scalable APIs and server-side logic',
    skills: [
      { name: 'Python',      sub: 'Language',  icon: '🐍' },
      { name: 'Django',      sub: 'Framework', icon: '🦄' },
      { name: 'Django REST', sub: 'Framework', icon: '🔗' },
      { name: 'REST APIs',   sub: 'Design',    icon: '⚡' },
    ],
  },
  {
    key: 'database',
    label: 'Database',
    icon: '🗄️',
    color: '#f472b6',
    desc: 'Data modeling and query optimization',
    skills: [
      { name: 'SQL',        sub: 'Language',  icon: '💾' },
    ],
  },
  {
    key: 'dsa',
    label: 'DSA & Tools',
    icon: '🧠',
    color: '#a594ff',
    desc: 'Problem solving and developer workflow',
    skills: [
      { name: 'Data Structures', sub: 'Core',     icon: '🏗️' },
      { name: 'Algorithms',      sub: 'Core',     icon: '🔄' },
      { name: 'Problem Solving', sub: 'Practice', icon: '💡' },
      { name: 'Git / GitHub',    sub: 'DevTool',  icon: '🐙' },
    ],
  },
]

const stats = [
  { value: '1000+', label: 'Problems Solved',  sub: 'CodeChef Diamond',    link: 'https://www.codechef.com/users/varadadeekshi', color: '#7c6fff' },
  { value: '2',     label: 'NPTEL Silver Medals', sub: 'Cloud + Python',   link: null, color: '#2dd4bf' },
  { value: '2',     label: 'Projects',          sub: 'Skillora · Portfolio', link: null, color: '#f472b6' },
  { value: '8.54',  label: 'CGPA',              sub: 'B.Tech CSE · SITAM',  link: null, color: '#a594ff' },
]

export default function Skills() {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  const [active, setActive] = useState('frontend')

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: .05 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const current = tabs.find(t => t.key === active)

  return (
    <>
      <style>{`
        .sk-sec {
          padding:8rem 2rem 6rem; background:var(--bg3);
          position:relative; overflow:hidden;
        }
        .sk-sec::before {
          content:''; position:absolute; inset:0;
          background:
            radial-gradient(ellipse 55% 65% at 5% 95%, rgba(45,212,191,.07) 0%, transparent 55%),
            radial-gradient(ellipse 50% 50% at 95% 5%, rgba(124,111,255,.06) 0%, transparent 55%);
          pointer-events:none;
        }

        /* ── stats ── */
        .sk-stats {
          display:grid; grid-template-columns:repeat(4,1fr);
          gap:1rem; margin-bottom:4rem;
        }
        .sk-stat {
          background:var(--surface); border:1px solid var(--border);
          border-radius:16px; padding:1.5rem 1rem 1.3rem;
          text-align:center; position:relative; overflow:hidden;
          opacity:0; transform:translateY(18px);
          transition:opacity .5s, transform .5s, box-shadow .28s, border-color .28s;
        }
        .sk-stat.v { opacity:1; transform:translateY(0); }
        .sk-stat:hover { box-shadow:var(--shadow-lg); border-color:var(--border2); transform:translateY(-4px) !important; }
        .sk-stat::after {
          content:''; position:absolute; top:0; left:0; right:0; height:2px;
          background:var(--grad); transform:scaleX(0); transform-origin:left;
          transition:transform .35s;
        }
        .sk-stat:hover::after { transform:scaleX(1); }
        .sk-stat-glow {
          position:absolute; bottom:-18px; left:50%; transform:translateX(-50%);
          width:90px; height:60px; border-radius:50%;
          filter:blur(26px); opacity:.38; pointer-events:none;
        }
        .sk-stat-val {
          font-size:2.1rem; font-weight:900; letter-spacing:-2px;
          line-height:1; margin-bottom:.32rem;
          font-family:'Playfair Display',serif;
        }
        .sk-stat-lbl { font-size:.74rem; font-weight:700; color:var(--t2); margin-bottom:.15rem; }
        .sk-stat-sub { font-size:.6rem; color:var(--t3); }
        .sk-stat-cta {
          display:inline-flex; align-items:center; gap:.3rem;
          margin-top:.6rem; font-size:.62rem; font-weight:700;
          padding:.22rem .72rem; border-radius:50px;
          text-decoration:none; transition:all .22s; border:1px solid;
        }
        .sk-stat-cta:hover { filter:brightness(1.2); transform:translateY(-1px); }

        /* ── tab switcher ── */
        .sk-tabs-wrap {
          display:flex; gap:.6rem; flex-wrap:wrap;
          margin-bottom:2.4rem;
          background:var(--surface); border:1px solid var(--border);
          border-radius:16px; padding:.6rem;
          width:fit-content;
        }
        .sk-tab {
          display:inline-flex; align-items:center; gap:.5rem;
          padding:.55rem 1.2rem; border-radius:10px;
          font-size:.82rem; font-weight:600; cursor:pointer;
          border:none; background:transparent; color:var(--t3);
          font-family:'Inter',sans-serif;
          transition:all .22s;
        }
        .sk-tab:hover { color:var(--t2); background:rgba(255,255,255,.04); }
        .sk-tab.active { color:#fff; box-shadow:0 4px 16px rgba(0,0,0,.3); }
        .sk-tab-icon { font-size:1rem; }

        /* ── panel ── */
        .sk-panel {
          background:var(--surface); border:1px solid var(--border);
          border-radius:22px; overflow:hidden;
          opacity:0; transform:translateY(20px);
          transition:opacity .5s .2s, transform .5s .2s;
        }
        .sk-panel.v { opacity:1; transform:none; }

        .sk-panel-top {
          padding:2rem 2.2rem 1.8rem;
          border-bottom:1px solid var(--border);
          display:flex; align-items:center; gap:1.4rem;
          position:relative; overflow:hidden;
        }
        .sk-panel-orb {
          position:absolute; top:-30px; right:-30px;
          width:130px; height:130px; border-radius:50%;
          filter:blur(40px); opacity:.22; pointer-events:none;
        }
        .sk-panel-icon {
          width:60px; height:60px; border-radius:16px;
          display:flex; align-items:center; justify-content:center;
          font-size:1.6rem; flex-shrink:0; position:relative; z-index:1;
        }
        .sk-panel-meta { position:relative; z-index:1; }
        .sk-panel-title {
          font-size:1.3rem; font-weight:900; color:var(--t1);
          letter-spacing:-.5px; margin-bottom:.25rem;
          font-family:'Playfair Display',serif;
        }
        .sk-panel-desc { font-size:.82rem; color:var(--t3); }

        /* ── skill items ── */
        .sk-items {
          display:grid;
          grid-template-columns:repeat(auto-fill, minmax(210px,1fr));
          gap:1px; background:var(--border);
        }
        .sk-item {
          background:var(--surface);
          padding:1.4rem 1.6rem;
          display:flex; align-items:center; gap:1rem;
          transition:background .22s, transform .22s;
          cursor:default; position:relative; overflow:hidden;
          opacity:0; animation:none;
        }
        .sk-item.v { opacity:1; }
        .sk-item:hover { background:var(--surface2); }
        .sk-item-shimmer {
          position:absolute; inset:0;
          background:linear-gradient(135deg,transparent 40%,rgba(255,255,255,.03) 50%,transparent 60%);
          transform:translateX(-100%); transition:transform .5s;
        }
        .sk-item:hover .sk-item-shimmer { transform:translateX(100%); }
        .sk-item-icon {
          width:44px; height:44px; border-radius:12px;
          display:flex; align-items:center; justify-content:center;
          font-size:1.25rem; flex-shrink:0;
        }
        .sk-item-name {
          font-size:.9rem; font-weight:700; color:var(--t1); margin-bottom:.18rem;
        }
        .sk-item-sub {
          font-size:.65rem; color:var(--t3); font-family:'Fira Code',monospace;
          letter-spacing:.5px;
        }
        .sk-item-arrow {
          margin-left:auto; font-size:.75rem; color:var(--t3);
          opacity:0; transform:translateX(-4px);
          transition:opacity .2s, transform .2s, color .2s;
        }
        .sk-item:hover .sk-item-arrow { opacity:1; transform:translateX(0); }

        /* ── bottom CTA ── */
        .sk-cta {
          margin-top:2.5rem;
          border-radius:20px; padding:2rem 2.4rem;
          background:var(--surface); border:1px solid var(--border);
          display:flex; align-items:center; justify-content:space-between;
          gap:1.5rem; flex-wrap:wrap; position:relative; overflow:hidden;
          opacity:0; transform:translateY(18px);
          transition:opacity .6s .5s, transform .6s .5s;
        }
        .sk-cta.v { opacity:1; transform:none; }
        .sk-cta::before {
          content:''; position:absolute; inset:0;
          background:linear-gradient(135deg,rgba(124,111,255,.05),rgba(45,212,191,.03));
          pointer-events:none;
        }
        .sk-cta-left h3 {
          font-size:1.05rem; font-weight:800; color:var(--t1);
          margin-bottom:.28rem; letter-spacing:-.3px;
        }
        .sk-cta-left p { font-size:.83rem; color:var(--t2); }
        .sk-cta-btns { display:flex; gap:.75rem; flex-wrap:wrap; position:relative; z-index:1; }
        .sk-cta-main {
          display:inline-flex; align-items:center; gap:.5rem;
          background:var(--grad); border:none; color:#fff;
          padding:.68rem 1.5rem; border-radius:10px; font-weight:700;
          font-size:.84rem; cursor:pointer; text-decoration:none;
          transition:all .25s; box-shadow:0 4px 18px var(--p-glow);
          font-family:'Inter',sans-serif;
        }
        .sk-cta-main:hover { transform:translateY(-2px); box-shadow:0 8px 26px var(--p-glow); }
        .sk-cta-ghost {
          display:inline-flex; align-items:center; gap:.5rem;
          background:transparent; border:1.5px solid var(--border2); color:var(--t2);
          padding:.68rem 1.5rem; border-radius:10px; font-weight:600;
          font-size:.84rem; cursor:pointer; text-decoration:none;
          transition:all .25s; font-family:'Inter',sans-serif;
        }
        .sk-cta-ghost:hover { border-color:var(--a); color:var(--a); transform:translateY(-2px); }

        @keyframes fadeSlide {
          from { opacity:0; transform:translateY(10px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .sk-item-anim { animation:fadeSlide .35s ease both; }

        @media(max-width:860px) { .sk-stats { grid-template-columns:repeat(2,1fr); } }
        @media(max-width:640px) {
          .sk-tabs-wrap { width:100%; }
          .sk-cta { flex-direction:column; text-align:center; }
          .sk-panel-top { flex-direction:column; align-items:flex-start; }
        }
      `}</style>

      <section className="sk-sec" id="skills" ref={ref}>
        <div style={{ maxWidth: '1060px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

          <h2 className="sec-title">My <span>Skills</span></h2>
          <div className="sec-line" />

          {/* Stats */}
          <div className="sk-stats">
            {stats.map((s, i) => (
              <div key={s.label} className={`sk-stat ${vis ? 'v' : ''}`} style={{ transitionDelay: `${i * .08}s` }}>
                <div className="sk-stat-glow" style={{ background: s.color }} />
                <div className="sk-stat-val" style={{ color: s.color }}>{s.value}</div>
                <div className="sk-stat-lbl">{s.label}</div>
                <div className="sk-stat-sub">{s.sub}</div>
                {s.link && (
                  <a href={s.link} target="_blank" rel="noreferrer"
                    className="sk-stat-cta"
                    style={{ color: s.color, borderColor: `${s.color}45`, background: `${s.color}0e` }}>
                    View Profile ↗
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Tab switcher */}
          <div className="sk-tabs-wrap">
            {tabs.map(t => (
              <button
                key={t.key}
                className={`sk-tab ${active === t.key ? 'active' : ''}`}
                style={active === t.key ? { background: t.color, boxShadow: `0 4px 16px ${t.color}44` } : {}}
                onClick={() => setActive(t.key)}
              >
                <span className="sk-tab-icon">{t.icon}</span>
                {t.label}
              </button>
            ))}
          </div>

          {/* Panel */}
          <div className={`sk-panel ${vis ? 'v' : ''}`}>
            {/* Panel header */}
            <div className="sk-panel-top">
              <div className="sk-panel-orb" style={{ background: current.color }} />
              <div className="sk-panel-icon"
                style={{ background: `${current.color}18`, border: `1.5px solid ${current.color}35` }}>
                {current.icon}
              </div>
              <div className="sk-panel-meta">
                <div className="sk-panel-title">{current.label}</div>
                <div className="sk-panel-desc">{current.desc}</div>
              </div>
              <div style={{
                marginLeft: 'auto', fontSize: '.65rem', fontWeight: '700',
                padding: '.28rem .85rem', borderRadius: '50px',
                color: current.color, background: `${current.color}12`,
                border: `1px solid ${current.color}30`, flexShrink: 0,
              }}>
                {current.skills.length} {current.skills.length === 1 ? 'skill' : 'skills'}
              </div>
            </div>

            {/* Skill grid */}
            <div className="sk-items">
              {current.skills.map((sk, si) => (
                <div
                  key={sk.name}
                  className={`sk-item sk-item-anim`}
                  style={{ animationDelay: `${si * .07}s` }}
                >
                  <div className="sk-item-shimmer" />
                  <div className="sk-item-icon"
                    style={{ background: `${current.color}13`, border: `1px solid ${current.color}28` }}>
                    {sk.icon}
                  </div>
                  <div>
                    <div className="sk-item-name">{sk.name}</div>
                    <div className="sk-item-sub">{sk.sub}</div>
                  </div>
                  <div className="sk-item-arrow" style={{ color: current.color }}>→</div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className={`sk-cta ${vis ? 'v' : ''}`}>
            <div className="sk-cta-left">
              <h3>Interested in working together?</h3>
              <p>Open to internships, collaborations and full-stack projects.</p>
            </div>
            <div className="sk-cta-btns">
              <a href="mailto:varadadeekshitha@gmail.com" className="sk-cta-ghost">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                Email Me
              </a>
            </div>
          </div>

        </div>
      </section>
    </>
  )
}
