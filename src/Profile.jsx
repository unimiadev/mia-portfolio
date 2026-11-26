import React from 'react'

const profile = {
  en: {
    about: 'About me', skills: 'Skills', experience: 'Experience', education: 'Education',
    name: 'I’m Mia Abreu e Lima.',
    bio: 'I’m a front-end developer based in Soledade, Brazil. I started building educational software at the University of Passo Fundo in 2018. Since then, I’ve built internal tools for operations teams and web and mobile products used by more than 100,000 people.',
    groups: ['Web & mobile', 'APIs & data', 'Quality & delivery'],
    jobs: [
      ['ExpertVision', 'Front-end developer, web and mobile', 'Jan 2025 – May 2026', 'I led the front-end architecture for web and mobile products serving over 100,000 active users. I built web interfaces with React and mobile apps with Flutter, integrating them with PHP backends and Firebase services.'],
      ['Automasul', 'Software engineer', 'Jul 2022 – Aug 2024', 'I used C# and .NET to modernize internal processes, saving the team ten hours a week. Alongside that work, I built React and Flutter applications for more than 50 employees across three departments.'],
      ['University of Passo Fundo', 'Full-stack developer, web and mobile', 'Mar 2018 – Feb 2022', 'I developed educational platforms with JavaScript and Flutter across five academic and institutional projects, focusing on making the tools easier for students to use.'],
    ],
    degree: 'Bachelor’s degree in Computer Science', school: 'University of Passo Fundo', languages: 'Languages', fluency: 'Brazilian Portuguese (native) · English (advanced)',
  },
  pt: {
    about: 'Sobre mim', skills: 'Habilidades', experience: 'Experiência', education: 'Formação',
    name: 'Sou Mia Abreu e Lima.',
    bio: 'Sou desenvolvedora front-end e moro em Soledade, no Rio Grande do Sul. Comecei a desenvolver plataformas educacionais na Universidade de Passo Fundo em 2018. Desde então, criei ferramentas internas para equipes de operações e produtos web e mobile usados por mais de 100 mil pessoas.',
    groups: ['Web e mobile', 'APIs e dados', 'Qualidade e entrega'],
    jobs: [
      ['ExpertVision', 'Desenvolvedora front-end web e mobile', 'Jan 2025 – Mai 2026', 'Liderei a arquitetura front-end de produtos web e mobile usados por mais de 100 mil pessoas ativas. Desenvolvi interfaces web com React e aplicativos com Flutter e integrei essas aplicações a backends em PHP e a serviços do Firebase.'],
      ['Automasul', 'Engenheira de software', 'Jul 2022 – Ago 2024', 'Usei C# e .NET para modernizar processos internos e economizar dez horas de trabalho da equipe por semana. Em paralelo, desenvolvi aplicações em React e Flutter para mais de 50 pessoas em três departamentos.'],
      ['Universidade de Passo Fundo', 'Desenvolvedora full-stack web e mobile', 'Mar 2018 – Fev 2022', 'Desenvolvi plataformas educacionais com JavaScript e Flutter em cinco projetos acadêmicos e institucionais, com foco na usabilidade para estudantes.'],
    ],
    degree: 'Bacharelado em Ciência da Computação', school: 'Universidade de Passo Fundo', languages: 'Idiomas', fluency: 'Português brasileiro (nativo) · Inglês (avançado)',
  },
}

const tools = [
  'React, Next.js, TypeScript, JavaScript, Flutter, Redux, Tailwind CSS',
  'REST, GraphQL, Axios, Firebase, Django, SQL Server, PostgreSQL',
  'Git, GitHub Actions, Docker, CI/CD, Clean Architecture, SOLID',
]

export default function Profile({ language }) {
  const p = profile[language]
  return (
    <>
      <section className="profile-band" id="experience">
        <h2>{p.experience}</h2>
        <div className="job-list">{p.jobs.map(([company, role, dates, detail]) => (
          <article key={company}>
            <div className="job-heading"><h3>{company}</h3><span>{dates}</span></div>
            <p className="role">{role}</p><p>{detail}</p>
          </article>
        ))}</div>
      </section>
      <section className="profile-band" id="about">
        <h2>{p.about}</h2>
        <div>
          <h3>{p.name}</h3><p>{p.bio}</p>
          <dl className="profile-facts">
            <div><dt>{p.education}</dt><dd>{p.degree}<br />{p.school} · 2018–2023</dd></div>
            <div><dt>{p.languages}</dt><dd>{p.fluency}</dd></div>
          </dl>
        </div>
      </section>
      <section className="profile-band" id="skills">
        <h2>{p.skills}</h2>
        <dl className="skill-list">{tools.map((group, i) => (
          <div key={group}><dt>{p.groups[i]}</dt><dd>{group}</dd></div>
        ))}</dl>
      </section>
    </>
  )
}
