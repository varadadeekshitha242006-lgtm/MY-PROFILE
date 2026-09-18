import React, { useEffect, useRef, useState } from 'react'

const experiences = [
  {
    role: 'Artificial Intelligence & Cyber Security Intern',
    company: 'Indian Servers Pvt. Ltd.',
    period: '2026', exp_type: 'work', color: '#2dd4bf', order: 1,
    points: [
      'Acquired hands-on experience in Machine Learning algorithms, Cyber Security mitigation, and script-based automation through deployment-ready tasks',
      'Developed localized automation scripts and executed threat detection workflows to enhance system security protocols',
      'Utilized problem-solving and communication skills to collaborate with senior engineers on security assessments and workflow updates',
    ],
  },
  {
    role: 'Virtual Internship 7.0 — Selected',
    company: 'Infosys Springboard',
    period: '2026', exp_type: 'work', color: '#f472b6', order: 2,
    points: [
      'Selected for Infosys Springboard Virtual Internship 7.0 — Batch 5',
      'Completed professional training in Python, web development and software engineering fundamentals',
      'Strengthened core competencies in Data Structures, Algorithms and Agile methodologies',
    ],
  },
  {
    role: 'Web Development Intern',
    company: 'CodeAlpha',
    period: '2025', exp_type: 'work', color: '#7c6fff', order: 3,
    points: [
      'Built responsive web pages using HTML5, CSS3, JavaScript and Bootstrap',
      'Developed Django-based backend features and REST API endpoints',
      'Collaborated on React frontend components, state management and interactive UI',
    ],
  },
]

const certs = [
  { name: 'Cloud Computing (2026)',                   org: 'NPTEL', icon: '☁️', badge: 'Silver Medal · 82%', color: '#a594ff' },
  { name: 'The Joy of Computing using Python (2024)', org: 'NPTEL', icon: '🐍', badge: 'Silver Medal · 77%', color: '#7c6fff' },
  { name: 'Diamond Badge — 1000+ Problems',           org: 'CodeChef', icon: '💎', color: '#2dd4bf' },
  { name: 'Smart India Hackathon (SIH)',              org: 'Lead Participant · National Level', icon: '🏆', color: '#f472b6' },
  { name: 'Academic Excellence Scholarship',         org: 'SITAM · ₹5,000', icon: '🎓', color: '#5eead4' },
]

const typeColors = { work: '#7c6fff', edu: '#2dd4bf' }

export default function Experience() {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: .08 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <style>{`
        .ex-sec {
          padding:8rem 2rem; background:var(--bg2);
          position:relative; overflow:hidden;
        }
        .ex-sec::before {
          content:''; position:absolute; inset:0;
          background:radial-gradient(ellipse 50% 60% at 90% 40%, rgba(124,111,255,.06) 0%, transparent 60%);
          pointer-events:none;
        }

        .ex-layout { display:grid; grid-template-columns:1.2fr 1fr; gap:4.5rem; align-items:start; }

        /* timeline */
        .tl { position:relative; }
        .tl::before {
          content:''; position:absolute; left:22px; top:6px; bottom:0;
          width:1.5px;
          background:linear-gradient(to bottom, var(--p), rgba(124,111,255,.08));
        }
        .tl-it {
          position:relative; padding:0 0 2.2rem 3.6rem;
          opacity:0; transform:translateX(-16px);
          transition:opacity .55s, transform .55s;
        }
        .tl-it.v { opacity:1; transform:none; }
        .tl-dot {
          position:absolute; left:8px; top:4px;
          width:28px; height:28px; border-radius:50%;
          background:var(--bg2); border:2px solid;
          display:flex; align-items:center; justify-content:center;
          font-size:.82rem; z-index:1;
          box-shadow:0 0 12px rgba(124,111,255,.3);
          animation:borderGlow 2.5s ease-in-out infinite;
        }
        .ex-card {
          background:var(--surface); border:1px solid var(--border);
          border-radius:14px; padding:1.3rem 1.4rem;
          transition:border-color .25s, box-shadow .25s;
        }
        .ex-card:hover { border-color:var(--border2); box-shadow:var(--shadow-lg); }
        .ex-top {
          display:flex; justify-content:space-between;
          align-items:flex-start; gap:.5rem; flex-wrap:wrap; margin-bottom:.2rem;
        }
        .ex-role { font-size:.9rem; font-weight:700; color:var(--t1); }
        .ex-period {
          font-size:.67rem; color:var(--t3); font-family:'Fira Code',monospace;
          white-space:nowrap; background:var(--bg3);
          padding:.18rem .55rem; border-radius:5px;
          border:1px solid var(--border);
        }
        .ex-company { font-size:.78rem; font-weight:700; margin-bottom:.8rem; }
        .ex-pts { list-style:none; display:flex; flex-direction:column; gap:.42rem; }
        .ex-pts li { display:flex; gap:.55rem; font-size:.8rem; color:var(--t2); line-height:1.6; }
        .ex-pts li::before { content:'›'; flex-shrink:0; font-weight:700; }

        /* certs */
        .cert-t { font-size:.88rem; font-weight:700; color:var(--t1); margin-bottom:1.1rem; letter-spacing:.3px; }
        .cert-it {
          background:var(--surface); border:1px solid var(--border);
          border-radius:12px; padding:.85rem 1.1rem;
          display:flex; align-items:center; gap:.85rem; margin-bottom:.65rem;
          opacity:0; transform:translateX(14px);
          transition:opacity .5s, transform .5s, box-shadow .22s, border-color .22s;
        }
        .cert-it.v { opacity:1; transform:none; }
        .cert-it:hover { box-shadow:var(--shadow-lg); border-color:var(--border2); }
        .cert-ico { font-size:1.25rem; flex-shrink:0; }
        .cert-nm { font-size:.82rem; font-weight:600; color:var(--t1); }
        .cert-org { font-size:.65rem; color:var(--t3); margin-top:2px; }
        .cert-b {
          margin-left:auto; padding:.18rem .58rem; border-radius:50px;
          font-size:.6rem; font-weight:700; flex-shrink:0;
          white-space:nowrap;
        }

        .cc-box {
          margin-top:1.4rem; background:var(--surface);
          border:1px solid rgba(124,111,255,.25); border-radius:14px;
          padding:1.5rem; text-align:center;
          box-shadow:0 0 20px rgba(124,111,255,.08);
          opacity:0; transform:translateY(14px);
          transition:opacity .6s .45s, transform .6s .45s;
        }
        .cc-box.v { opacity:1; transform:none; }
        .cc-num {
          font-size:2.4rem; font-weight:900; letter-spacing:-2px;
          background:var(--grad); -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
        }
        .cc-lbl { font-size:.75rem; color:var(--t2); margin-top:.25rem; }
        .cc-tag {
          display:inline-block; margin-top:.8rem;
          padding:.24rem .85rem; border-radius:50px;
          font-size:.68rem; font-weight:600;
          background:rgba(124,111,255,.1); border:1px solid rgba(124,111,255,.2);
          color:var(--p2);
        }

        @media(max-width:880px) { .ex-layout { grid-template-columns:1fr; gap:3rem; } }
      `}</style>

      <section className="ex-sec" id="experience" ref={ref}>
        <div style={{ maxWidth: '1080px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <h2 className="sec-title">Experience &amp; <span>Certifications</span></h2>
          <div className="sec-line" />

          <div className="ex-layout">
            {/* Timeline */}
            <div className="tl">
              {experiences.map((e, i) => (
                <div key={i} className={`tl-it ${vis ? 'v' : ''}`} style={{ transitionDelay: `${i * .13}s` }}>
                  <div className="tl-dot" style={{ borderColor: typeColors[e.exp_type] }}>
                    {e.exp_type === 'edu' ? '🎓' : '💼'}
                  </div>
                  <div className="ex-card">
                    <div className="ex-top">
                      <span className="ex-role">{e.role}</span>
                      <span className="ex-period">{e.period}</span>
                    </div>
                    <div className="ex-company" style={{ color: typeColors[e.exp_type] }}>{e.company}</div>
                    <ul className="ex-pts">
                      {e.points.map((p, j) => (
                        <li key={j} style={{ '--dot-color': typeColors[e.exp_type] }}>
                          <span style={{ color: typeColors[e.exp_type] }}>›</span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Certs */}
            <div>
              <div className="cert-t">🏆 Certifications &amp; Achievements</div>
              {certs.map((c, i) => (
                <div key={i} className={`cert-it ${vis ? 'v' : ''}`} style={{ transitionDelay: `${i * .09}s` }}>
                  <span className="cert-ico">{c.icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="cert-nm">{c.name}</div>
                    <div className="cert-org">{c.org}</div>
                  </div>
                  {c.badge && (
                    <span className="cert-b" style={{ color: c.color, background: `${c.color}12`, border: `1px solid ${c.color}35` }}>
                      {c.badge}
                    </span>
                  )}
                </div>
              ))}

              <div className={`cc-box ${vis ? 'v' : ''}`}>
                <div className="cc-num">1000+</div>
                <div className="cc-lbl">Coding Problems Solved</div>
                <a
                  href="https://www.codechef.com/users/varadadeekshi"
                  target="_blank"
                  rel="noreferrer"
                  className="cc-tag"
                  style={{ textDecoration: 'none', cursor: 'pointer' }}
                >
                  CodeChef · Diamond Badge ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
