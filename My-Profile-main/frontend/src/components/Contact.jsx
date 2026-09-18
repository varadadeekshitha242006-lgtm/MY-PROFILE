import React, { useState, useRef, useEffect } from 'react'

const items = [
  { icon: '✉️', label: 'Email',    value: 'varadadeekshitha@gmail.com',       href: 'mailto:varadadeekshitha@gmail.com', color: '#7c6fff' },
  { icon: '📞', label: 'Phone',    value: '+91 8019107794',                    href: 'tel:+918019107794',                  color: '#2dd4bf' },
  { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/varada-deekshitha', href: 'https://www.linkedin.com/in/varada-deekshitha-7b071b309', color: '#f472b6' },
  { icon: '🐙', label: 'GitHub',   value: 'github.com/Varada-Deekshitha',      href: 'https://github.com/Varada-Deekshitha', color: '#a594ff' },
]

const API_BASE = import.meta.env.VITE_API_URL || 'https://my-profile-hyrl.onrender.com'

export default function Contact() {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: .08 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const ch = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submit = async e => {
    e.preventDefault()
    setStatus('sending')
    try {
      const r = await fetch(`${API_BASE}/api/contact/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (r.ok) {
        setStatus('sent')
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        const data = await r.json()
        // Show specific validation error if available
        const firstError = Object.values(data)[0]
        setStatus(Array.isArray(firstError) ? firstError[0] : 'error')
      }
    } catch {
      setStatus('error')
    }
    setTimeout(() => setStatus(null), 5000)
  }

  const inp = {
    width: '100%', background: 'var(--bg3)',
    border: '1.5px solid var(--border)', borderRadius: '10px',
    padding: '.78rem 1.1rem', color: 'var(--t1)',
    fontSize: '.88rem', outline: 'none',
    transition: 'border-color .2s, box-shadow .2s',
    fontFamily: 'Inter, sans-serif', boxSizing: 'border-box',
  }

  return (
    <>
      <style>{`
        .ct-sec {
          padding:8rem 2rem; background:var(--bg3);
          position:relative; overflow:hidden;
        }
        .ct-sec::before {
          content:''; position:absolute; inset:0;
          background:radial-gradient(ellipse 60% 50% at 50% 100%, rgba(124,111,255,.08) 0%, transparent 60%);
          pointer-events:none;
        }

        .ct-grid { display:grid; grid-template-columns:1fr 1.55fr; gap:4.5rem; align-items:start; }

        .ct-intro { font-size:.93rem; color:var(--t2); line-height:1.85; margin-bottom:2rem; }

        .ct-it {
          display:flex; align-items:center; gap:1rem;
          background:var(--surface); border:1px solid var(--border);
          border-radius:12px; padding:.9rem 1.2rem;
          text-decoration:none; color:inherit;
          transition:all .25s; margin-bottom:.7rem;
          opacity:0; transform:translateX(-14px);
        }
        .ct-it.v { opacity:1; transform:none; }
        .ct-it:hover { border-color:var(--border2); box-shadow:var(--shadow-lg); transform:translateX(4px) !important; }
        .ct-ico {
          width:42px; height:42px; border-radius:10px;
          display:flex; align-items:center; justify-content:center;
          font-size:1.1rem; flex-shrink:0;
        }
        .ct-lbl { font-size:.6rem; font-weight:700; text-transform:uppercase; letter-spacing:1.5px; color:var(--t3); }
        .ct-val { font-size:.82rem; color:var(--t1); font-weight:600; margin-top:2px; }

        .ct-form {
          background:var(--surface); border:1px solid var(--border);
          border-radius:18px; padding:2rem;
          opacity:0; transform:translateY(16px);
          transition:opacity .6s .2s, transform .6s .2s;
        }
        .ct-form.v { opacity:1; transform:none; }
        .ct-form-title { font-size:.95rem; font-weight:700; color:var(--t1); margin-bottom:1.5rem; }

        .ct-row { display:grid; grid-template-columns:1fr 1fr; gap:.9rem; margin-bottom:.9rem; }
        .ct-lbl2 {
          display:block; font-size:.62rem; font-weight:700;
          color:var(--t3); margin-bottom:.38rem;
          text-transform:uppercase; letter-spacing:.5px;
        }
        .ct-grp { margin-bottom:.9rem; }

        input:focus, textarea:focus {
          border-color:var(--p) !important;
          box-shadow:0 0 0 3px rgba(124,111,255,.12) !important;
        }
        input::placeholder, textarea::placeholder { color:var(--t3); }

        .ct-btn {
          width:100%; padding:.85rem; border:none; border-radius:10px;
          background:var(--grad); color:#fff; font-weight:700;
          font-size:.92rem; cursor:pointer; transition:all .25s;
          box-shadow:0 4px 20px var(--p-glow);
          font-family:'Inter',sans-serif; position:relative; overflow:hidden;
        }
        .ct-btn:hover { transform:translateY(-2px); box-shadow:0 8px 30px var(--p-glow); }
        .ct-btn:disabled { opacity:.6; cursor:not-allowed; transform:none; }
        .ct-msg {
          text-align:center; margin-top:.9rem; padding:.65rem;
          border-radius:8px; font-size:.83rem; font-weight:600;
          border:1px solid;
        }
        .cm-ok  { background:rgba(45,212,191,.08); color:var(--a2); border-color:rgba(45,212,191,.2); }
        .cm-err { background:rgba(244,114,182,.08); color:var(--rose); border-color:rgba(244,114,182,.2); }
        .cm-snd { background:var(--bg); color:var(--t3); border-color:var(--border); }

        @media(max-width:740px) {
          .ct-grid { grid-template-columns:1fr; gap:2.5rem; }
          .ct-row { grid-template-columns:1fr; }
        }
      `}</style>

      <section className="ct-sec" id="contact" ref={ref}>
        <div style={{ maxWidth: '1080px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                    <h2 className="sec-title">Get In <span>Touch</span></h2>
          <div className="sec-line" />

          <div className="ct-grid">
            <div>
              <p className="ct-intro">
                Have a project idea, internship opportunity, or want to collaborate?
                I'm always open to new opportunities. Let's build something amazing together!
              </p>
              {items.map((it, i) => (
                <a key={it.label} href={it.href} target="_blank" rel="noreferrer"
                  className={`ct-it ${vis ? 'v' : ''}`}
                  style={{ transitionDelay: `${i * .09}s` }}
                >
                  <div className="ct-ico" style={{ background: `${it.color}15`, border: `1px solid ${it.color}30` }}>
                    {it.icon}
                  </div>
                  <div>
                    <div className="ct-lbl">{it.label}</div>
                    <div className="ct-val">{it.value}</div>
                  </div>
                </a>
              ))}
            </div>

            <div className={`ct-form ${vis ? 'v' : ''}`}>
              <div className="ct-form-title">Send a Message 💬</div>
              <form onSubmit={submit}>
                <div className="ct-row">
                  <div>
                    <label className="ct-lbl2">Name</label>
                    <input style={inp} name="name" value={form.name} onChange={ch} placeholder="Your name" required />
                  </div>
                  <div>
                    <label className="ct-lbl2">Email</label>
                    <input style={inp} name="email" type="email" value={form.email} onChange={ch} placeholder="your@email.com" required />
                  </div>
                </div>
                <div className="ct-grp">
                  <label className="ct-lbl2">Subject</label>
                  <input style={inp} name="subject" value={form.subject} onChange={ch} placeholder="What's this about?" required />
                </div>
                <div className="ct-grp">
                  <label className="ct-lbl2">Message</label>
                  <textarea style={{ ...inp, resize: 'vertical', minHeight: '120px' }}
                    name="message" value={form.message} onChange={ch}
                    placeholder="Tell me about your project or idea..." required />
                </div>
                <button className="ct-btn" type="submit" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending...' : 'Send Message →'}
                </button>
                {status === 'sent'    && <div className="ct-msg cm-ok">✓ Message sent! I'll get back to you soon.</div>}
                {status === 'error'   && <div className="ct-msg cm-err">Something went wrong. Please try again.</div>}
                {status === 'sending' && <div className="ct-msg cm-snd">⏳ Sending... (may take a few seconds)</div>}
                {status && !['sent','error','sending'].includes(status) && <div className="ct-msg cm-err">{status}</div>}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
