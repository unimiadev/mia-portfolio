import React, { useEffect, useRef, useState } from 'react'
import './hero.css'

function ObjectPreview({ language }) {
  const button = useRef(null)
  const canvas = useRef(null)
  const [staticPose, setStaticPose] = useState(false)
  const [fallback, setFallback] = useState(false)
  const id = 'responsive'
  useEffect(() => {
    let active = true, dispose
    import('./objectViewer').then(({mountViewer}) => {
      if (active) dispose = mountViewer(button.current, canvas.current)
    }).catch(() => { if (active) setFallback(true) })
    return () => { active = false; dispose?.() }
  }, [])
  return <button ref={button} type="button" className="sculpture" data-turned={fallback && staticPose}
    onClick={() => { if(fallback) setStaticPose(!staticPose) }}
    aria-label={language === 'pt' ? 'Girar grid responsivo' : 'Turn responsive grid'}>
    <img className="studio-poster" src={import.meta.env.BASE_URL+'images/hero-'+id+'.webp'} alt="" />
    <canvas aria-hidden="true" ref={canvas} />
  </button>
}

export default function Hero({ language }) {
  const pt = language === 'pt'

  const hero = useRef(null)
  useEffect(() => {
    const header = document.querySelector('header.head')
    const measure = () => hero.current.style.setProperty('--nav-height', header.offsetHeight + 'px')
    const resize = new ResizeObserver(measure)
    resize.observe(header); measure()
    return () => resize.disconnect()
  }, [])
  return <section className="hero-cover" ref={hero} aria-labelledby="hero-name">
    <div className="studio-layout">
      <div className="greeting">
        <h1 id="hero-name">{pt ? 'Oi, eu sou a ' : "Hi, I'm "}<span>Mia</span>.</h1>
        <p>{pt ? 'Sou desenvolvedora front-end criativa e crio experiências para web e mobile.' : 'I’m a creative front-end developer building for web and mobile.'}</p>
      </div>
      <div className="studio"><ObjectPreview language={language} /></div>
    </div>
    <div className="studio-actions">
      <a className="hero-work" href="#work">{pt ? 'Ver projetos' : 'View my work'}
        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M10 2v15m-6-6 6 6 6-6"/></svg>
      </a>

    </div>
  </section>
}
