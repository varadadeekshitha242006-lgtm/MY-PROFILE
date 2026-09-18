import React, { useEffect, useRef, useState } from 'react'

export default function About() {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: .12 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <style>{`
        .ab-sec {
          padding:8rem 2rem; background:var(--bg2);
          position:relative; overflow:hidden;
        }
        .ab-sec::before {
          content:''; position:absolute; inset:0;
          background:radial-gradient(ellipse 60% 40% at 80% 20%, rgba(124,111,255,.07) 0%, transparent 60%);
          pointer-events:none;
        }

        .ab-grid {
          display:grid; grid-template-columns:1fr 1.45fr;
          gap:5.5rem; align-items:center;
        }

        /* avatar column */
        .av-col { display:flex; flex-direction:column; align-items:center; gap:1.6rem; }
        .av-frame { position:relative; width:255px; height:315px; }
        .av-glow {
          position:absolute; inset:-2px; border-radius:28px;
          background:var(--grad); opacity:.6; filter:blur(12px); z-index:0;
          animation:glowPulse 3s ease-in-out infinite;
        }
        @keyframes glowPulse { 0%,100%{opacity:.4} 50%{opacity:.75} }
        /* float the whole frame */
        .av-frame { animation: float 5s ease-in-out infinite; }
        .av-border {
          position:absolute; inset:-2px; border-radius:28px;
          background:var(--grad); z-index:1;
        }
        .av-inner {
          position:absolute; inset:2px; border-radius:26px;
          overflow:hidden; background:var(--surface); z-index:2;
        }
        .av-inner img {
          width:100%; height:100%; object-fit:cover;
          object-position:top center; display:block;
        }
        .av-tag {
          position:absolute; bottom:14px; left:14px; z-index:3;
          background:rgba(13,13,20,.88); backdrop-filter:blur(12px);
          border:1px solid var(--border2); border-radius:10px;
          padding:.4rem .85rem; box-shadow:var(--shadow);
        }
        .av-tag .n { font-size:.73rem; font-weight:700; color:var(--t1); }
        .av-tag .r { font-size:.6rem; color:var(--a); margin-top:2px; font-weight:600; }
        .av-badge {
          position:absolute; top:-12px; right:-12px; z-index:4;
          width:64px; height:64px; border-radius:50%;
          background:var(--grad); border:3px solid var(--bg2);
          display:flex; flex-direction:column; align-items:center;
          justify-content:center; box-shadow:0 4px 20px var(--p-glow);
        }
        .av-badge .bn { font-size:.88rem; font-weight:900; color:#fff; line-height:1; }
        .av-badge .bl { font-size:.42rem; color:rgba(255,255,255,.8); font-weight:700; text-align:center; }

        .av-chips { display:flex; gap:.5rem; flex-wrap:wrap; justify-content:center; }
        .av-chip {
          padding:.3rem .9rem; border-radius:50px;
          font-size:.72rem; font-weight:600;
          background:rgba(124,111,255,.1);
          border:1px solid rgba(124,111,255,.2);
          color:var(--p2); transition:all .2s; cursor:default;
        }
        .av-chip:hover { background:rgba(124,111,255,.18); border-color:var(--p); }

        /* info column */
        .ab-p { font-size:.93rem; line-height:1.92; color:var(--t2); margin-bottom:1.1rem; }
        .ab-p strong { color:var(--t1); font-weight:600; }

        .ab-details { display:grid; grid-template-columns:1fr 1fr; gap:.75rem; margin-bottom:1.8rem; }
        .ab-d {
          background:var(--surface); border:1px solid var(--border);
          border-radius:10px; padding:.75rem 1rem;
          transition:border-color .2s, box-shadow .2s;
        }
        .ab-d:hover { border-color:rgba(124,111,255,.3); box-shadow:0 0 12px rgba(124,111,255,.08); }
        .ab-d .lbl {
          font-size:.58rem; font-weight:700; text-transform:uppercase;
          letter-spacing:1.5px; color:var(--a);
        }
        .ab-d .val { font-size:.82rem; color:var(--t1); font-weight:600; margin-top:3px; }

        .ab-actions { display:flex; gap:.9rem; flex-wrap:wrap; }
        .ab-btn-main {
          background:var(--grad); border:none; color:#fff;
          padding:.75rem 1.9rem; border-radius:10px; font-weight:700;
          font-size:.88rem; cursor:pointer;
          box-shadow:0 4px 20px var(--p-glow);
          font-family:'Inter',sans-serif; transition:all .25s;
          text-decoration:none; display:inline-block;
        }
        .ab-btn-main:hover { transform:translateY(-2px); box-shadow:0 8px 28px var(--p-glow); }
        .ab-btn-ghost {
          background:transparent; border:1.5px solid var(--border2); color:var(--t2);
          padding:.75rem 1.9rem; border-radius:10px; font-weight:600;
          font-size:.88rem; cursor:pointer; font-family:'Inter',sans-serif;
          transition:all .25s;
        }
        .ab-btn-ghost:hover { border-color:var(--a); color:var(--a); transform:translateY(-2px); }

        /* animations */
        .sl { opacity:0; transform:translateX(-28px); transition:opacity .7s .1s, transform .7s .1s; }
        .sr { opacity:0; transform:translateX(28px);  transition:opacity .7s .2s, transform .7s .2s; }
        .sl.v, .sr.v { opacity:1; transform:none; }

        @media(max-width:820px) {
          .ab-grid { grid-template-columns:1fr; gap:3rem; }
          .av-frame { width:215px; height:265px; }
        }
      `}</style>

      <section className="ab-sec" id="about" ref={ref}>
        <div style={{ maxWidth: '1080px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <h2 className="sec-title">About <span>Me</span></h2>
          <div className="sec-line" />

          <div className="ab-grid">
            {/* Avatar */}
            <div className={`av-col sl ${vis ? 'v' : ''}`}>
              <div className="av-frame">
                <div className="av-glow" />
                <div className="av-border" />
                <div className="av-inner">
                  <img src="/profile.jpeg" alt="Varada Deekshitha"
                    onError={e => { e.target.style.display = 'none' }} />
                </div>
                <div className="av-tag">
                  <div className="n">Varada Deekshitha</div>
                  <div className="r">Full Stack Developer</div>
                </div>
                <div className="av-badge">
                  <div className="bn">1K+</div>
                  <div className="bl">Code<br />Chef</div>
                </div>
              </div>
              <div className="av-chips">
                {['B.Tech CSE', 'React.js', 'Django', 'Python', 'DSA'].map(x => (
                  <div key={x} className="av-chip">{x}</div>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className={`sr ${vis ? 'v' : ''}`}>
              <p className="ab-p">
                I am <strong>Varada Deekshitha</strong>, a detail-oriented <strong>Computer Science and Engineering</strong> student
                with strong technical expertise in Frontend Development, <strong>Python</strong>, <strong>SQL</strong>, and
                AI-assisted development. I have a proven track record of building scalable full-stack web applications and
                AI-driven solutions across the software development lifecycle.
              </p>
              <p className="ab-p">
                Highly proficient in <strong>data structures</strong>, teamwork, communication, and systematic problem-solving.
                I have solved <strong>1000+ coding problems on CodeChef</strong> (Diamond Badge) and hold{' '}
                <strong>NPTEL Silver Medals</strong> in Cloud Computing and Python, demonstrating solid software engineering fundamentals.
              </p>

              <div className="ab-details">
                {[
                  { l: 'Name',   v: 'Varada Deekshitha' },
                  { l: 'Degree', v: 'B.Tech CSE · CGPA 8.54' },
                  { l: 'Email',  v: 'varadadeekshitha@gmail.com', sm: true },
                  { l: 'Phone',  v: '+91 8019107794' },
                  { l: 'Focus',  v: 'Full Stack + DSA' },
                  { l: 'Status', v: '🟢 Open to work' },
                ].map(d => (
                  <div className="ab-d" key={d.l}>
                    <div className="lbl">{d.l}</div>
                    <div className="val" style={{ fontSize: d.sm ? '.71rem' : '.82rem' }}>{d.v}</div>
                  </div>
                ))}
              </div>

              <div className="ab-actions">
                <a href="/Varada_Deekshitha_Resume.pdf" target="_blank" rel="noreferrer" className="ab-btn-main">
                  Download Resume
                </a>
                <button className="ab-btn-ghost"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                  Let's Connect →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
