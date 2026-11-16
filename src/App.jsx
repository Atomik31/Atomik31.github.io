import { useEffect, useState } from 'react'
import data from './data/portfolio.json'
import Splash from './components/Splash.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Section from './components/Section.jsx'
import Timeline from './components/Timeline.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import ContactSection from './components/ContactSection.jsx'
import Sheet from './components/Sheet.jsx'
import Detail from './components/Detail.jsx'
import Icon from './components/Icons.jsx'

// Textes de l'interface (le contenu du CV vient de data/portfolio.json).
const UI = {
  fr: {
    role: "Ingénierie & Solutions d'IA en Production",
    contactCta: 'Me contacter',
    contactText: "Une mission, un projet IoT / IA, une question sur l'un de mes projets : écris-moi, je réponds vite.",
    about: 'À propos',
    journey: 'Parcours',
    experience: 'Expérience',
    education: 'Formation',
    skills: 'Compétences',
    projects: 'Projets',
    contact: 'Contact',
    profile: 'Profil',
    featured: 'À la une',
    current: 'En cours',
    planned: 'Visée',
    all: 'Tous',
    filterLabel: 'Filtrer les projets par famille',
    close: 'Fermer',
    statYears: "ans d'expérience terrain",
    statProjects: 'projets',
    statTools: 'outils maîtrisés',
    statCerts: 'certifs RNCP',
    highlights: ['Applications sur mesure', 'IA agentique sur mesure', 'Automatisation (n8n)', 'Du capteur au dashboard et à l\'IA', 'Double compétence OT / IT', 'Certifié AWS Cloud & AI Practitioner'],
  },
  en: {
    role: 'Engineering & AI Solutions in Production',
    contactCta: 'Get in touch',
    contactText: 'A contract, an IoT / AI project, a question about one of my projects: drop me a line, I reply fast.',
    about: 'About',
    journey: 'Journey',
    experience: 'Experience',
    education: 'Education',
    skills: 'Skills',
    projects: 'Projects',
    contact: 'Contact',
    profile: 'Profile',
    featured: 'Featured',
    current: 'Ongoing',
    planned: 'Targeted',
    all: 'All',
    filterLabel: 'Filter projects by family',
    close: 'Close',
    statYears: 'years in the field',
    statProjects: 'projects',
    statTools: 'tools',
    statCerts: 'RNCP certs',
    highlights: ['Custom applications', 'Custom agentic AI', 'Automation (n8n)', 'From sensor to dashboard and AI', 'OT / IT dual expertise', 'AWS Certified Cloud & AI Practitioner'],
  },
}

// Ordre de la page : Projets, Expérience, Formation, Compétences. « Parcours » regroupe Expérience et Formation dans la navigation.
const SECTIONS = [
  { id: 'profile', icon: 'user' },
  { id: 'projects', icon: 'layers' },
  { id: 'experience', icon: 'briefcase' },
  { id: 'skills', icon: 'chip' },
  { id: 'contact', icon: 'mail' },
]
const OBSERVED = ['profile', 'projects', 'experience', 'education', 'skills', 'contact']

export default function App() {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('codaix-lang') || (navigator.language?.startsWith('en') ? 'en' : 'fr')
    } catch {
      return 'fr'
    }
  })
  const [active, setActive] = useState('profile')
  const [filter, setFilter] = useState(null)
  const [open, setOpen] = useState(null) // projet ouvert dans la feuille

  const t = { ...UI[lang], ...Object.fromEntries(Object.entries(data.labels).map(([k, v]) => [k, v[lang]])) }
  const nav = SECTIONS.map((s) => ({ ...s, label: t[s.id === 'experience' ? 'journey' : s.id] }))

  const changeLang = (l) => {
    setLang(l)
    document.documentElement.lang = l
    try {
      localStorage.setItem('codaix-lang', l)
    } catch {
      /* stockage indisponible : sans conséquence */
    }
  }

  const go = (id) => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  }

  // Met en avant la section visible dans la navigation.
  useEffect(() => {
    const els = OBSERVED.map((id) => document.getElementById(id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id === 'education' ? 'experience' : visible.target.id)
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.1, 0.5] },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const toolCount = data.skills.reduce((n, s) => n + (s.category.en === 'Languages' ? 0 : s.items.length), 0)
  const stats = [
    { label: t.statProjects, value: data.projects.length },
    { label: t.statTools, value: toolCount },
    { label: t.statCerts, value: 2 },
  ]

  return (
    <>
      <Splash />
      <Nav items={nav} active={active} onGo={go} lang={lang} onLang={changeLang} />

      <main className="page">
        <Hero profile={data.profile} lang={lang} t={t} stats={stats} onContact={() => go('contact')} />

        <Section id="about" title={t.about}>
          <p className="about">{data.about[lang]}</p>
          <ul className="highlights">
            {t.highlights.map((h) => (
              <li key={h}>
                <Icon name="check" /> {h}
              </li>
            ))}
          </ul>
        </Section>

        <Section id="projects" title={t.projects} count={data.projects.length}>
          <Projects projects={data.projects} filter={filter} onFilter={setFilter} lang={lang} t={t} onOpen={setOpen} />
        </Section>

        <Section id="experience" title={t.experience} count={data.experience.length}>
          <Timeline entries={data.experience} kind="experience" lang={lang} t={t} />
        </Section>

        <Section id="education" title={t.education} count={data.education.length}>
          <Timeline entries={data.education} kind="education" lang={lang} t={t} />
        </Section>

        <Section id="skills" title={t.skills}>
          <Skills skills={data.skills} lang={lang} />
        </Section>

        <Section id="contact" title={t.contact}>
          <ContactSection profile={data.profile} t={t} />
        </Section>

        <footer className="foot muted">
          © {new Date().getFullYear()} {data.profile.name} · Codaix · {t.rights}
        </footer>
      </main>

      {open && (
        <Sheet title={open.title[lang]} closeLabel={t.close} onClose={() => setOpen(null)}>
          <Detail project={open} lang={lang} t={t} />
        </Sheet>
      )}
    </>
  )
}
