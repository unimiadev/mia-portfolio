import React, { useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/inter'
import './styles.css'
import Profile from './Profile'
import Hero from './Hero'

const assets = import.meta.env.BASE_URL
const moreProjects = [
  ['STW Sports', 'Flutter', 'https://play.google.com/store/apps/details?id=com.stwsports.stw_sports&hl=pt_BR'],
  ['ExpertVision', 'React', 'https://www.expertvision.com.br/'],
  ['BotanicApp', 'Flutter', 'https://play.google.com/store/apps/details?id=tech.jobholding.botanic.app&hl=pt_BR'],
]
const educationStack = [
  ['Web', 'React · Tailwind CSS · Firebase'],
  ['Mobile', 'Flutter · PHP'],
]
const projects = [
  {
    id: 'hidden-gems', name: 'Hidden Gems Music', web: 'hiddengems.png',
    description: {
      en: 'Start with an artist you love and choose how small an audience you want to explore. Hidden Gems finds up to five lesser-known artists from the same scene, explains each match, and takes you straight to their music on Spotify.',
      pt: 'Escolha um artista de que você gosta e o tamanho do público que quer explorar. O Hidden Gems encontra até cinco nomes menos conhecidos da mesma cena, explica cada recomendação e leva você direto para ouvir no Spotify.',
    },
    stack: [['Web', 'React · Next.js · TypeScript'], ['APIs', 'Spotify · Deezer · Last.fm']],
    url: 'https://hiddengemsmusic.vercel.app/', repository: 'https://github.com/unimiadev/hidden-gems',
  },
  {
    id: 'beharv', name: 'Beharv', web: 'beharv-web.jpg', mobile: 'beharv-flutter.png',
    description: {
      en: 'An online learning platform where students can enroll in free courses and study at their own pace. Both the website and the app support ten languages. The app has over 100,000 registered users.',
      pt: 'Uma plataforma de ensino online para quem quer fazer cursos gratuitos e estudar no próprio ritmo. O site e o aplicativo estão disponíveis em dez idiomas. O app tem mais de 100 mil usuários cadastrados.',
    },
    stack: educationStack, url: 'https://beharv.com/cursos', app: 'https://play.google.com/store/apps/details?id=tech.jobholding.beharv',
  },
  {
    id: 'seu-curso', name: 'Seu Curso Digital', web: 'scd-web.jpg', mobile: 'scd-flutter.png',
    description: {
      en: 'A free online course platform built for Brazilian Portuguese speakers. Students can explore the catalog, study lessons, and take assessments on the web or on mobile. The app has over 100,000 registered users.',
      pt: 'Uma plataforma de cursos gratuitos inteiramente em português brasileiro. Pelo site ou pelo celular, os alunos podem explorar o catálogo, estudar os módulos e fazer avaliações. O app tem mais de 100 mil usuários cadastrados.',
    },
    stack: educationStack, url: 'https://cursos.seucursodigital.com/cursos', app: 'https://play.google.com/store/apps/details?id=tech.jobholding.seucursodigital',
  },
]
const copy = {
  en: {
    portfolio: 'Portfolio', work: 'Work', resume: 'Résumé', contact: 'Contact', skip: 'Skip to work',
    projectDetails: 'Project details', website: 'Visit website', webImage: 'Open web screenshot',
    phoneImage: 'Open mobile screenshot', webAlt: 'web interface', phoneAlt: 'mobile interface',
    contactTitle: 'Let’s talk.', resumeLabel: 'Résumé (English PDF)', language: 'Language',
    about: 'About', experience: 'Experience', more: 'More projects',
  },
  pt: {
    portfolio: 'Portfólio', work: 'Projetos', resume: 'Currículo', contact: 'Contato', skip: 'Ir para projetos',
    projectDetails: 'Detalhes do projeto', website: 'Visitar site', webImage: 'Abrir captura da versão web',
    phoneImage: 'Abrir captura da versão mobile', webAlt: 'interface web', phoneAlt: 'interface mobile',
    contactTitle: 'Vamos conversar.', resumeLabel: 'Currículo (PDF em português)', language: 'Idioma',
    about: 'Sobre', experience: 'Experiência', more: 'Outros projetos',
  },
}

function Arrow({ diagonal = false }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d={diagonal ? 'M4 20 20 4M7 4h13v13' : 'M3 12h17m-7-7 7 7-7 7'} />
    </svg>
  )
}

function Devices({ project, t, featured }) {
  return (
    <div className={project.mobile ? 'devices devices-paired' : 'devices'}>
      <div className="notebook">
        <div className="notebook-lid">
          <img src={assets + 'images/' + project.web} alt={project.name + ' — ' + t.webAlt} loading={featured ? 'eager' : 'lazy'} fetchPriority={featured ? 'high' : 'auto'} />
        </div>
        <div className="keyboard-deck" aria-hidden="true">
          <div className="keyboard-keys" />
          <div className="trackpad" />
        </div>
        <div className="notebook-base" aria-hidden="true" />
      </div>
      {project.mobile && (
        <div className="phone">
          <img src={assets + 'images/' + project.mobile} alt={project.name + ' — ' + t.phoneAlt} loading="lazy" />
        </div>
      )}
    </div>
  )
}

function Work({ language, t }) {
  const [active, setActive] = useState(null)
  const section = useRef(null)
  const pt = language === 'pt'

  function changeProject(next, animate) {
    const id = (next || active).id
    const region = section.current
    const selector = '[data-device="' + id + '"]'
    const moving = animate && !matchMedia('(prefers-reduced-motion: reduce)').matches
    const source = region.querySelector(selector)
    const title = source.closest('article').querySelector('.project-name')
    const before = moving && source.getBoundingClientRect()
    const titleBefore = moving && title.getBoundingClientRect()
    flushSync(() => setActive(next))
    const control = region.querySelector(next ? '.back-projects' : '#open-' + id)
    control.focus({preventScroll: true})
    if (control.getBoundingClientRect().top < 0 || control.getBoundingClientRect().top > innerHeight - 40) {
      control.scrollIntoView({block: 'start', behavior: 'instant'})
    }
    if (!moving) return
    const visual = region.querySelector(selector)
    const destinationTitle = visual.closest('article').querySelector('.project-name')
    const easing = 'cubic-bezier(.22,.78,.22,1)'
    function travel(element, from, duration, lift) {
      const to = element.getBoundingClientRect()
      const dx = from.left - to.left, dy = from.top - to.top
      const scale = from.width / Math.max(to.width, 1)
      const frames = [{transform: `translate(${dx}px,${dy}px) scale(${scale})`}]
      if (lift) {
        frames.push({
          offset: .54,
          transform: `translate(${dx * .23}px,${dy * .23 - 9}px) scale(${1 + (scale - 1) * .23}) rotate(-.65deg)`,
        })
      }
      frames.push({transform:'none'})
      element.animate(frames, {duration, easing})
    }
    travel(visual, before, next ? 400 : 240, Boolean(next))
    travel(destinationTitle, titleBefore, next ? 310 : 220, false)
    if (next) {
      region.querySelector('.case-study').classList.add('opening-proof')
    } else {
      region.querySelectorAll('.project').forEach(card => {
        if (!card.contains(visual)) card.animate([{opacity:.15},{opacity:1}], {duration:190})
      })
    }
  }

  return <section id="work" aria-label={t.work} ref={section} onKeyDown={e => {
    if (e.key === 'Escape' && active) { e.preventDefault(); changeProject(null,false) }
  }}>
    <h2 className="sr-only">{t.work}</h2>
    {active ? <article className="case-study">
      <button className="back-projects" onClick={e=>changeProject(null,e.detail>0)}><span aria-hidden="true">←</span> {pt ? 'Todos os projetos' : 'All projects'}</button>
      <h3><span className="project-name">{active.name}</span></h3>
      <div className="case-spread">
          <div data-device={active.id}><Devices project={active} t={t} featured /><span className="proof-corners" aria-hidden="true" /></div>
        <div className="case-copy">
          <p>{active.description[language]}</p>
          <h4>{pt ? 'Tecnologias' : 'Technologies'}</h4>
          <dl>{active.stack.map(([label, value])=><div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
          <div className="case-actions">
            <a href={active.url} target="_blank" rel="noreferrer">{t.website} <Arrow diagonal /></a>
            {active.app && <a href={active.app} target="_blank" rel="noreferrer">Google Play <Arrow diagonal /></a>}
            {active.repository && <a href={active.repository} target="_blank" rel="noreferrer">GitHub <Arrow diagonal /></a>}
          </div>
          <div className="screen-links">
            <a href={assets+'images/'+active.web} target="_blank" rel="noreferrer">{t.webImage}</a>
            {active.mobile && <a href={assets+'images/'+active.mobile} target="_blank" rel="noreferrer">{t.phoneImage}</a>}
          </div>
        </div>
      </div>
    </article> : <>
      <div className="contact-sheet grid">
        {projects.map((project,i)=><article key={project.id} className={'project'+(i===0?' project-featured':'')}>
          <div className="project-heading">
            <div><h3><button id={'open-'+project.id} onClick={e=>changeProject(project,e.detail>0)} aria-label={t.projectDetails+' — '+project.name}><span className="project-name">{project.name}</span></button></h3>
              <p>{project.mobile ? 'Web / Flutter · Mobile' : 'React · Web'}</p></div>
            <span className="project-arrow"><Arrow diagonal /></span>
          </div>
          <div data-device={project.id}><Devices project={project} t={t} featured={i===0} /></div>
        </article>)}
      </div>
      <div className="more-projects">
        <h3>{t.more}</h3><ul>{moreProjects.map(([name,stack,href])=><li key={name}><a href={href} target="_blank" rel="noreferrer">
          <strong>{name}</strong><span>{stack}</span><Arrow diagonal />
        </a></li>)}</ul>
      </div>
    </>}
  </section>
}

function initialLanguage() {
  try {
    return localStorage.getItem('portfolio-language') === 'pt' ? 'pt' : 'en'
  } catch {
    return 'en'
  }
}

function Header({ language, setLanguage, resume, t }) {
  const [open, setOpen] = useState(false)
  const header = useRef(null)
  const toggle = useRef(null)
  const pt = language === 'pt'

  useEffect(() => {
    if (!open) return
    const mobile = window.matchMedia('(max-width: 48rem)')
    const closeOnResize = () => { if (!mobile.matches) setOpen(false) }
    const closeOutside = event => {
      if (!header.current.contains(event.target)) setOpen(false)
    }
    const closeOnEscape = event => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggle.current.focus()
      }
    }
    document.addEventListener('pointerdown', closeOutside)
    document.addEventListener('focusin', closeOutside)
    document.addEventListener('keydown', closeOnEscape)
    mobile.addEventListener('change', closeOnResize)
    return () => {
      document.removeEventListener('pointerdown', closeOutside)
      document.removeEventListener('focusin', closeOutside)
      document.removeEventListener('keydown', closeOnEscape)
      mobile.removeEventListener('change', closeOnResize)
    }
  }, [open])

  return (
    <header ref={header} className="head flex flex-wrap items-center justify-between">
      <a className="wordmark" href="#top" onClick={() => setOpen(false)}>Mia</a>
      <button type="button" className="menu-toggle" ref={toggle} aria-expanded={open}
        aria-controls="site-navigation" onClick={() => setOpen(!open)}>
        {open ? (pt ? 'Fechar' : 'Close') : 'Menu'}
        <span className="menu-strokes" aria-hidden="true"><i /><i /><i /></span>
      </button>
      <nav id="site-navigation" className="navigation flex flex-wrap items-center" aria-label={t.portfolio}
        onClick={event => {
          const link = event.target.closest('a')
          if (open && link) {
            if (link.target === '_blank') toggle.current.focus()
            setOpen(false)
          }
        }}>
        <a href="#work">{t.work}</a>
        <a href="#experience">{t.experience}</a>
        <a href="#about">{t.about}</a>
        <a href={resume} target="_blank" rel="noreferrer" aria-label={t.resumeLabel}>{t.resume}</a>
        <div className="languages flex items-center" role="group" aria-label={t.language}>
          <button type="button" lang="pt-BR" aria-pressed={pt} onClick={() => setLanguage('pt')}>PT-BR</button>
          <span aria-hidden="true">/</span>
          <button type="button" lang="en" aria-pressed={!pt} onClick={() => setLanguage('en')}>EN</button>
        </div>
        <a className="contact-button inline-flex items-center" href="#contact">{t.contact} <Arrow /></a>
      </nav>
    </header>
  )
}

function App() {
  const [language, setLanguage] = useState(initialLanguage)
  const t = copy[language]
  const resume = assets + 'docs/curriculum%20-%20' + (language === 'pt' ? 'ptbr' : 'en') + '.pdf'
  useEffect(() => {
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en'
    document.title = t.portfolio + ' — Front-end'
    try {
      localStorage.setItem('portfolio-language', language)
    } catch {
      // The language switcher still works when browser storage is disabled.
    }
  }, [language, t.portfolio])

  return (
    <div className="site mx-auto">
      <a className="skip" href="#work">{t.skip}</a>
      <Header language={language} setLanguage={setLanguage} resume={resume} t={t} />
      <main id="top">
        <Hero language={language} />
        <Work language={language} t={t} />
        <Profile language={language} />
      </main>
      <footer id="contact" className="footer flex flex-wrap items-end justify-between">
        <div className="contact-heading">
          <h2>{t.contactTitle}</h2>
          <a className="return-key" href="mailto:miabreuelima@gmail.com" aria-label={language === 'pt' ? 'Enviar e-mail para Mia' : 'Email Mia'}>
            <img src={assets + 'images/returnkey.webp'} alt="" width="326" height="340" loading="lazy" />
          </a>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <a className="email" href="mailto:miabreuelima@gmail.com">miabreuelima@gmail.com <Arrow /></a>
          <a href="https://github.com/unimiadev/" target="_blank" rel="noreferrer">GitHub <Arrow diagonal /></a>
          <a href="https://linkedin.com/in/miabreuelima" target="_blank" rel="noreferrer">LinkedIn <Arrow diagonal /></a>
          <a href={resume} target="_blank" rel="noreferrer">{t.resumeLabel} <Arrow diagonal /></a>
        </div>
      </footer>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
