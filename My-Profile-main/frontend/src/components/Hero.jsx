import React, { useEffect, useState } from 'react'

const roles = ['Full Stack Developer', 'React JS Developer', 'Django Engineer', 'DSA Problem Solver', 'Python Developer']

const stats = [
  { ico: '💻', num: '1000+', lbl: 'Problems Solved',       sub: 'CodeChef Diamond',          link: 'https://www.codechef.com/users/varadadeekshi' },
  { ico: '🏢', num: '3',     lbl: 'Internships',          sub: 'Indian Servers · CodeAlpha · Infosys', link: null },
  { ico: '🏅', num: '2',     lbl: 'NPTEL Certifications',  sub: 'Silver Medals · 82% & 77%',  link: null },
  { ico: '🎓', num: 'B.Tech',lbl: 'Computer Science Engg.',sub: 'CGPA 8.54 · 2023 – 2027',    link: null },
]

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0)
  const [text, setText] = useState('')
  const [del, setDel] = useState(false)

  useEffect(() => {
    const cur = roles[roleIdx]; let t
    if (!del && text.length < cur.length)
      t = setTimeout(() => setText(cur.slice(0, text.length + 1)), 75)
    else if (!del && text.length === cur.length)
      t = setTimeout(() => setDel(true), 2000)
    else if (del && text.length > 0)
      t = setTimeout(() => setText(text.slice(0, -1)), 38)
    else { setDel(false); setRoleIdx((roleIdx + 1) % roles.length) }
    return () => clearTimeout(t)
  }, [text, del, roleIdx])

  return (
    <>
      <style>{`
        .hero {
          min-height:100vh; display:flex; align-items:center; justify-content:center;
          position:relative; overflow:hidden; padding:7rem 2rem 4rem;
          background:var(--bg);
        }
        .hero::before {
          content:''; position:absolute; inset:0;
          background-image:
            linear-gradient(rgba(124,111,255,.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124,111,255,.04) 1px, transparent 1px);
          background-size:50px 50px; pointer-events:none;
        }
        .h-orb1 {
          position:absolute; top:-120px; right:-80px;
          width:500px; height:500px; border-radius:50%;
          background:radial-gradient(circle, rgba(124,111,255,.18) 0%, transparent 65%);
          pointer-events:none; animation:pulse1 6s ease-in-out infinite;
        }
        .h-orb2 {
          position:absolute; bottom:-100px; left:-100px;
          width:400px; height:400px; border-radius:50%;
          background:radial-gradient(circle, rgba(45,212,191,.12) 0%, transparent 65%);
          pointer-events:none; animation:pulse2 8s ease-in-out infinite;
        }
        @keyframes pulse1 { 0%,100%{opacity:.7;transform:scale(1)} 50%{opacity:1;transform:scale(1.05)} }
        @keyframes pulse2 { 0%,100%{opacity:.5;transform:scale(1)} 50%{opacity:.9;transform:scale(1.08)} }

        .h-wrap {
          position:relative; z-index:1;
          display:grid; grid-template-columns:1.15fr 1fr;
          gap:5rem; max-width:1080px; width:100%; align-items:center;
        }
        .h-left { display:flex; flex-direction:column; }
        .h-badge {
          display:inline-flex; align-items:center; gap:.55rem; width:fit-content;
          background:rgba(124,111,255,.1); border:1px solid rgba(124,111,255,.25);
          border-radius:50px; padding:.32rem .9rem;
          font-size:.68rem; font-weight:600; letter-spacing:1.5px;
          text-transform:uppercase; color:var(--p2); margin-bottom:1.4rem;
          animation:fadeUp .5s ease both;
        }
        .h-badge-dot {
          width:6px; height:6px; border-radius:50%;
          background:var(--a); box-shadow:0 0 6px var(--a);
          animation:blink 1.5s ease-in-out infinite;
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.3} }
        .h-name {
          font-family:'Playfair Display',serif;
          font-size:clamp(2.8rem,5.5vw,4.4rem);
          font-weight:900; letter-spacing:-2px; line-height:1.05;
          margin-bottom:.9rem; color:var(--t1);
          animation:fadeUp .6s .08s ease both;
        }
        .h-name .hl {
          background:var(--grad); -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
        }
        .h-role {
          font-family:'Fira Code',monospace;
          font-size:clamp(.88rem,1.7vw,1.05rem);
          color:var(--a); min-height:1.8rem; margin-bottom:1.4rem;
          animation:fadeUp .6s .16s ease both;
        }
        .h-role .cur {
          display:inline-block; width:2px; height:.95em;
          background:var(--a); margin-left:2px; vertical-align:middle;
          animation:cur .8s step-end infinite;
        }
        @keyframes cur { 0%,100%{opacity:1} 50%{opacity:0} }
        .h-desc {
          font-size:.93rem; color:var(--t2); line-height:1.9;
          margin-bottom:2.2rem; max-width:430px;
          animation:fadeUp .6s .24s ease both;
        }
        .h-btns { display:flex; gap:.9rem; flex-wrap:wrap; animation:fadeUp .6s .32s ease both; }
        .h-btn-fill {
          background:var(--grad); border:none; color:#fff;
          padding:.8rem 2rem; border-radius:10px; font-weight:700; font-size:.88rem;
          cursor:pointer; transition:all .25s; font-family:'Inter',sans-serif;
          box-shadow:0 4px 20px var(--p-glow); position:relative; overflow:hidden;
        }
        .h-btn-fill::after { content:''; position:absolute; inset:0; background:rgba(255,255,255,.12); opacity:0; transition:opacity .2s; }
        .h-btn-fill:hover::after { opacity:1; }
        .h-btn-fill:hover { transform:translateY(-2px); box-shadow:0 8px 28px var(--p-glow); }
        .h-btn-resume {
          background:transparent; border:1.5px solid rgba(124,111,255,.4);
          color:var(--p2); padding:.8rem 1.8rem; border-radius:10px;
          font-weight:600; font-size:.88rem; cursor:pointer;
          transition:all .25s; font-family:'Inter',sans-serif;
          text-decoration:none; display:inline-flex; align-items:center; gap:.5rem;
        }
        .h-btn-resume:hover { background:rgba(124,111,255,.12); border-color:var(--p); color:var(--p2); transform:translateY(-2px); }

        .h-btn-ghost {
          background:transparent; border:1.5px solid var(--border2); color:var(--t2);
          padding:.8rem 2rem; border-radius:10px; font-weight:600; font-size:.88rem;
          cursor:pointer; transition:all .25s; font-family:'Inter',sans-serif;
        }
        .h-btn-ghost:hover { border-color:var(--p); color:var(--p); transform:translateY(-2px); }
        .h-card {
          background:var(--surface); border:1px solid var(--border);
          border-radius:14px; padding:1.15rem 1.4rem;
          display:flex; align-items:center; gap:1.2rem;
          box-shadow:var(--shadow);
          transition:transform .28s, box-shadow .28s, border-color .28s;
          position:relative; overflow:hidden; text-decoration:none;
        }
        .h-card::before {
          content:''; position:absolute; left:0; top:0; bottom:0;
          width:2.5px; background:var(--grad); border-radius:14px 0 0 14px;
        }
        .h-card:hover { transform:translateX(5px); box-shadow:var(--shadow-lg); border-color:var(--border2); }
        .h-card-ico {
          width:44px; height:44px; border-radius:12px;
          background:rgba(124,111,255,.1); border:1px solid rgba(124,111,255,.2);
          display:flex; align-items:center; justify-content:center;
          font-size:1.15rem; flex-shrink:0;
        }
        .h-card-num {
          font-size:1.45rem; font-weight:900; letter-spacing:-1px;
          background:var(--grad); -webkit-background-clip:text;
          -webkit-text-fill-color:transparent; line-height:1;
        }
        .h-card-lbl { font-size:.74rem; color:var(--t2); font-weight:500; margin-top:3px; }
        .h-card-sub { font-size:.65rem; color:var(--t3); margin-top:2px; }
        .h-card-ext { position:absolute; right:1rem; top:50%; transform:translateY(-50%); font-size:.65rem; color:var(--t3); opacity:0; transition:opacity .2s; }
        .h-card:hover .h-card-ext { opacity:1; }

        .scroll-ind {
          position:absolute; bottom:2rem; left:50%; transform:translateX(-50%);
          display:flex; flex-direction:column; align-items:center; gap:.4rem;
          color:var(--t3); font-size:.6rem; letter-spacing:2.5px; text-transform:uppercase;
          animation:fadeUp 1s 1.2s ease both;
        }
        .scroll-line {
          width:1px; height:42px;
          background:linear-gradient(to bottom, var(--p), transparent);
          animation:scrollAnim 1.8s ease-in-out infinite;
        }
        @keyframes scrollAnim { 0%,100%{opacity:.2} 50%{opacity:.8} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }

        @media(max-width:760px) {
          .h-wrap { grid-template-columns:1fr; gap:3rem; }
          .h-right { flex-direction:row; flex-wrap:wrap; }
          .h-card  { flex:1; min-width:150px; }
        }
      `}</style>

      <section className="hero" id="hero">
        <div className="h-orb1" /><div className="h-orb2" />
        <div className="h-wrap">

          {/* Left */}
          <div className="h-left">
            <div className="h-badge">
              <span className="h-badge-dot" />
              Open to Work
            </div>
            <h1 className="h-name">
              Varada<br /><span className="hl">Deekshitha</span>
            </h1>
            <div className="h-role">{text}<span className="cur" /></div>
            <p className="h-desc">
              Detail-oriented CSE student building scalable full-stack apps with React.js &amp; Django.
              1000+ problems solved on CodeChef · Diamond Badge.
            </p>
            <div className="h-btns">
              <button className="h-btn-fill"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
                View Projects →
              </button>
              <button className="h-btn-ghost"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                Contact Me
              </button>
            </div>
          </div>

          {/* Right — stat cards */}
          <div className="h-right">
            {stats.map((s, i) => {
              const content = (
                <>
                  <div className="h-card-ico">{s.ico}</div>
                  <div>
                    <div className="h-card-num">{s.num}</div>
                    <div className="h-card-lbl">{s.lbl}</div>
                    <div className="h-card-sub">{s.sub}</div>
                  </div>
                  {s.link && <span className="h-card-ext">↗</span>}
                </>
              )
              return s.link
                ? <a key={i} className="h-card" href={s.link} target="_blank" rel="noreferrer">{content}</a>
                : <div key={i} className="h-card">{content}</div>
            })}
          </div>

        </div>
        <div className="scroll-ind"><div className="scroll-line" />scroll</div>
      </section>
    </>
  )
}
