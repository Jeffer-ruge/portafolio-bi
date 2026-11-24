import { ArrowDown, ArrowDownToLine, ArrowUpRight, Bot, Database, FileText, Layers, Linkedin, MapPin, Waypoints } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { DashboardStage } from "../components/dashboard-stage";
import { CaseArt } from "../components/geometry";
import { HeroVisual } from "../components/hero-visual";
import { ProcessChapter } from "../components/process-chapter";
import { Reveal } from "../components/reveal";
import { SiteNav } from "../components/site-nav";
import { WhatsAppButton } from "../components/whatsapp-button";
import { courses, degrees, virtualTopics } from "../content/education.json";
import { experience, profile, projects, skills } from "../content/profile";
import { sitePath } from "../content/site-path";

const icons = { bi: Database, automation: Waypoints, web: Layers, ai: Bot } as const;

export default function Home() {
  const schema = {
    "@context": "https://schema.org", "@type": "Person", name: profile.fullName,
    jobTitle: profile.title, sameAs: [profile.linkedin],
    address: { "@type": "PostalAddress", addressLocality: "Bogotá", addressCountry: "CO" },
    knowsAbout: ["Business Intelligence", "Excel", "Automatización de procesos", "Reporting operativo"],
  };
  return <>
    <a className="skip" href="#contenido">Saltar al contenido</a>
    <SiteNav />
    <main id="contenido">
      <section id="inicio" className="hero">
        <div className="shell hero-inner">
          <div className="hero-copy">
            <h1>Jefferson Zambrano<span className="accent">.</span></h1>
            <p className="hero-role">{profile.title.split(" | ").map((title, index) => <span key={title}>
              {index > 0 && <span aria-hidden="true" className="role-divider"> | </span>}{title}
            </span>)}</p>
            <p className="hero-lead">{profile.summary}</p>
            <div className="actions">
              <a href="#proyectos" className="button primary">Ver proyectos <ArrowDown size={16} /></a>
              <WhatsAppButton compact />
            </div>
            <div className="hero-meta">
              <p className="hero-location"><MapPin size={15} aria-hidden="true" /> {profile.location}</p>
              <a className="hero-linkedin" href={profile.linkedin} aria-label="LinkedIn de Jefferson Zambrano" target="_blank" rel="noreferrer"><Linkedin size={17} /></a>
            </div>
          </div>
          <HeroVisual />
        </div>
        <div className="shell hero-bottom" aria-hidden="true"><span /><span /><span /></div>
      </section>

      <DashboardStage />

      <section id="proyectos" className="section section-tint" aria-labelledby="projects-title">
        <div className="shell">
          <Reveal className="section-title"><h2 id="projects-title">Casos de estudio</h2></Reveal>
          <div className="project-grid">
            {projects.map(project => <Link className="project-card" href={`/proyectos/${project.slug}/`} key={project.slug}>
              <CaseArt type={project.visual} />
              <div className="project-copy">
                <p className="eyebrow">{project.label}</p>
                <h3>{project.title}</h3>
                <p>{project.intro}</p>
                <span className="project-link">Ver caso de estudio <ArrowUpRight size={16} /></span>
              </div>
            </Link>)}
          </div>
        </div>
      </section>

      <ProcessChapter />

      <section id="sobre-mi" className="band shell section">
        <Reveal className="about-layout">
          <div><h2>Sobre mí</h2></div>
          <div className="about-copy">
            <p>Tengo más de cuatro años de experiencia en proyectos de telecomunicaciones de Telefónica y Movistar. Optimizo procesos de captura, consolidación y validación de datos, y construyo tableros para seguir el avance de las implementaciones.</p>
            <p>Soy tecnólogo en Gestión Administrativa y curso octavo semestre de Ingeniería de Sistemas. Aplico metodologías ágiles y mejora continua al seguimiento de entregas y a la coordinación de equipos.</p>
          </div>
        </Reveal>
      </section>

      <section id="experiencia" className="section section-tint">
        <div className="shell split">
          <div className="section-title"><h2>Experiencia</h2></div>
          <div className="timeline">
            {experience.map((job, index) => <details key={job.role + job.company} name="trayectoria" open={index === 0}>
              <summary><span><span className="job-period">{job.period}</span><strong>{job.role}</strong><span className="job-company">{job.company}</span></span><span className="expand" aria-hidden="true" /></summary>
              <div className="job-body"><p>{job.detail}</p><ul className="tags">{job.tools.map(tool => <li key={tool}>{tool}</li>)}</ul></div>
            </details>)}
          </div>
        </div>
      </section>

      <section id="habilidades" className="shell section">
        <Reveal className="section-title"><h2>Habilidades técnicas</h2></Reveal>
        <div className="skill-grid">{skills.map((skill) => {
          const Icon = icons[skill.kind];
          return <article className="skill-card skill-card--illustrated" key={skill.kind}>
            <div className="skill-visual">
              <Image src={sitePath(skill.image)} alt="" width={720} height={430} loading="lazy" unoptimized />
            </div>
            <div className="skill-content">
              <h3><Icon size={20} strokeWidth={1.65} aria-hidden="true" />{skill.title}</h3><p>{skill.summary}</p>
              <ul className="tags">{skill.items.map(item => <li key={item}>{item}</li>)}</ul>
            </div>
          </article>;
        })}</div>
      </section>

      <section id="formacion" className="shell section split">
        <div className="section-title"><h2>Formación</h2></div>
        <div className="education">
          <div className="education-group">
            <h3>Formación académica</h3>
            {degrees.map(item => <article key={item.title}><div><h4>{item.title}</h4><p>{item.org}</p></div><span>{item.date}</span></article>)}
          </div>
          <div className="education-group">
            <h3>Cursos y diplomados</h3>
            {courses.map(item => <article key={item.title}>
              <div><h4>{item.title}</h4>{item.org && <p>{item.org}</p>}</div>
              {item.date && <span>{item.date}</span>}
            </article>)}
            <article><div><h4>Otros cursos virtuales</h4><p>{virtualTopics.join(" · ")}</p></div></article>
          </div>
        </div>
      </section>

      <section id="cv" className="section cv-section">
        <div className="shell"><div className="cv-card"><span className="skill-icon"><FileText size={25} /></span><div><p className="eyebrow">Currículum</p><h2>Hoja de vida.</h2><p>Experiencia, competencias y formación en el PDF actualizado.</p></div>
          <div className="actions"><a className="button secondary" href={sitePath("/cv-jefferson-zambrano.pdf")} target="_blank" rel="noreferrer">Ver PDF <ArrowUpRight size={17} /></a><a className="button primary" href={sitePath("/cv-jefferson-zambrano.pdf")} download>Descargar <ArrowDownToLine size={17} /></a></div>
        </div></div>
      </section>

      <section id="contacto" className="section contact-section">
        <div className="shell contact-inner"><h2>Oportunidades profesionales<span className="accent">.</span></h2><p>Busco oportunidades en análisis de datos, inteligencia de negocios (BI) y ciencia de datos. Si buscas un analista de datos para tu equipo o quieres colaborar en un proyecto basado en datos, me encantará conversar contigo.</p>
          <div className="actions"><WhatsAppButton /><a className="button secondary" href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn</a></div>
          <a className="email-link" href={`mailto:${profile.email}`}>{profile.email}</a>
        </div>
      </section>
    </main>
    <footer className="page-footer"><div className="shell"><a className="wordmark" href="#inicio" aria-label="J.Z · Volver al inicio">J<span className="accent">.</span>Z</a><span>Jefferson Zambrano · Bogotá, Colombia</span></div></footer>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
  </>;
}
