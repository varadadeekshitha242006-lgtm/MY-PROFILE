import React from 'react'

const socials = [
  {
    label: 'GitHub', href: 'https://github.com/Varada-Deekshitha',
    svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.03c-3.34.72-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" /></svg>,
  },
  {
    label: 'LinkedIn', href: 'https://www.linkedin.com/in/varada-deekshitha-7b071b309',
    svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>,
  },
  {
    label: 'Email', href: 'mailto:varadadeekshitha@gmail.com',
    svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" /></svg>,
  },
]

export default function Footer() {
  return (
    <>
      <style>{`
        .ft {
          background:var(--bg2);
          border-top:1px solid var(--border);
          padding:3rem 2rem 2rem;
          position:relative; overflow:hidden;
        }
        .ft::before {
          content:''; position:absolute; top:0; left:0; right:0; height:1px;
          background:var(--grad);
        }
        .ft-in { max-width:1080px; margin:0 auto; display:flex; flex-direction:column; align-items:center; gap:1.4rem; }

        .ft-logo {
          font-family:'Playfair Display',serif;
          font-size:1.5rem; font-weight:900;
          background:var(--grad); -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          letter-spacing:-.5px;
        }

        .ft-nav { display:flex; gap:2rem; flex-wrap:wrap; justify-content:center; }
        .ft-nav a {
          color:var(--t3); text-decoration:none;
          font-size:.82rem; font-weight:500; text-transform:capitalize;
          transition:color .2s;
        }
        .ft-nav a:hover { color:var(--p2); }

        .ft-socials { display:flex; gap:.65rem; }
        .ft-sb {
          width:38px; height:38px; border-radius:10px;
          background:var(--surface); border:1px solid var(--border);
          display:flex; align-items:center; justify-content:center;
          color:var(--t3); transition:all .22s; text-decoration:none;
        }
        .ft-sb:hover {
          background:rgba(124,111,255,.15); border-color:var(--p);
          color:var(--p2); transform:translateY(-2px);
          box-shadow:0 4px 16px var(--p-glow);
        }

        .ft-copy {
          color:var(--t3); font-size:.72rem; text-align:center;
          border-top:1px solid var(--border); padding-top:1.4rem; width:100%;
        }
        .ft-copy strong { color:var(--t2); font-weight:600; }
        .ft-copy a { color:var(--p2); text-decoration:none; }
        .ft-copy a:hover { text-decoration:underline; }
      `}</style>

      <footer className="ft">
        <div className="ft-in">
          <div className="ft-logo">VD.</div>
          <nav className="ft-nav">
            {['about', 'skills', 'projects', 'experience', 'contact'].map(l => (
              <a key={l} href={`#${l}`}>{l}</a>
            ))}
          </nav>
          <div className="ft-socials">
            {socials.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="ft-sb" title={s.label}>
                {s.svg}
              </a>
            ))}
          </div>
          <div className="ft-copy">
            <div style={{marginBottom:'.5rem'}}>
              <strong>B.Tech CSE</strong> &nbsp;·&nbsp; Batch <strong>2023 – 2027</strong>
              &nbsp;·&nbsp; <strong>Satya Institute of Technology and Management (SITAM)</strong> &nbsp;·&nbsp; CGPA <strong>8.54</strong>
            </div>
            <div>
              &copy; {new Date().getFullYear()} <strong>Varada Deekshitha</strong>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
