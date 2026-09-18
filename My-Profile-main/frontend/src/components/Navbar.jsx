import React, { useState, useEffect } from 'react'

const links = ['about', 'skills', 'projects', 'experience', 'contact']

export default function Navbar({ activeSection }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const go = id => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <>
      <style>{`
        .nav {
          position:fixed; top:0; left:0; right:0; z-index:1000;
          padding:1.1rem 2.5rem;
          display:flex; align-items:center; justify-content:space-between;
          transition:all .35s;
        }
        .nav.sc {
          background:rgba(13,13,20,0.88);
          backdrop-filter:blur(20px);
          border-bottom:1px solid var(--border);
          padding:.75rem 2.5rem;
          box-shadow:0 4px 30px rgba(0,0,0,0.4);
        }
        .nav-logo {
          font-family:'Playfair Display',serif;
          font-size:1.35rem; font-weight:900;
          cursor:pointer; color:var(--t1); letter-spacing:-.5px;
          background:var(--grad); -webkit-background-clip:text; -webkit-text-fill-color:transparent;
        }
        .nav-links { display:flex; gap:2rem; list-style:none; }
        .nav-links li button {
          background:none; border:none; color:var(--t2);
          font-size:.83rem; font-weight:500;
          cursor:pointer; text-transform:capitalize; padding:.25rem 0;
          position:relative; transition:color .2s; font-family:'Inter',sans-serif;
        }
        .nav-links li button::after {
          content:''; position:absolute; bottom:-3px; left:0; right:0;
          height:1.5px; background:var(--grad);
          transform:scaleX(0); transition:transform .25s; border-radius:1px;
          transform-origin:left;
        }
        .nav-links li button:hover, .nav-links li button.act { color:var(--t1); }
        .nav-links li button.act::after, .nav-links li button:hover::after { transform:scaleX(1); }
        .hb {
          display:none; background:none; border:none;
          cursor:pointer; flex-direction:column; gap:5px; padding:3px;
        }
        .hb span { display:block; width:22px; height:1.5px; background:var(--t2); border-radius:1px; transition:background .2s; }
        .hb:hover span { background:var(--p); }
        .mob {
          display:none; position:fixed; top:56px; left:0; right:0;
          background:rgba(13,13,20,0.97); backdrop-filter:blur(20px);
          padding:1.5rem; flex-direction:column; gap:1rem;
          border-bottom:1px solid var(--border); z-index:999;
          box-shadow:0 10px 40px rgba(0,0,0,0.5);
        }
        .mob.op { display:flex; }
        .mob button {
          background:none; border:none; color:var(--t2);
          font-size:.95rem; text-transform:capitalize;
          cursor:pointer; padding:.45rem; text-align:left;
          font-family:'Inter',sans-serif; transition:color .2s;
        }
        .mob button:hover { color:var(--p); }
        @media(max-width:720px) {
          .nav-links { display:none; }
          .hb { display:flex; }
        }
      `}</style>

      <nav className={`nav ${scrolled ? 'sc' : ''}`}>
        <div className="nav-logo" onClick={() => go('hero')}>VD.</div>
        <ul className="nav-links">
          {links.map(l => (
            <li key={l}>
              <button className={activeSection === l ? 'act' : ''} onClick={() => go(l)}>{l}</button>
            </li>
          ))}
        </ul>
        <button className="hb" onClick={() => setMenuOpen(v => !v)}>
          <span /><span /><span />
        </button>
      </nav>

      <div className={`mob ${menuOpen ? 'op' : ''}`}>
        {links.map(l => <button key={l} onClick={() => go(l)}>{l}</button>)}
      </div>
    </>
  )
}
