import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { CaseArt } from "../../../components/geometry";
import { projects } from "../../../content/profile";
import { siteUrl } from "../../../content/site-path";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  const origin = process.env.NEXT_PUBLIC_SITE_URL;
  return project ? {
    title: project.title,
    description: project.intro,
    alternates: origin ? { canonical: siteUrl(`/proyectos/${slug}/`, origin) } : undefined,
  } : {};
}

export default async function CaseStudy({ params }: Props) {
  const { slug } = await params;
  const project = projects.find(item => item.slug === slug);
  if (!project) notFound();
  return <main className="case-page shell">
    <Link href="/#proyectos" className="case-back"><ArrowLeft size={18} /> Volver a proyectos</Link>
    <p className="eyebrow">{project.label}</p><h1>{project.title}</h1><p className="case-intro">{project.intro}</p>
    <CaseArt type={project.visual} />
    <ul className="tags">{project.tools.map(tool => <li key={tool}>{tool}</li>)}</ul>
    <div className="case-body">
      <section><h2>El reto</h2><p>{project.challenge}</p></section>
      <section><h2>Mi contribución</h2><p>{project.contribution}</p></section>
      <section><h2>Resultado</h2><p>{project.outcome}</p></section>
    </div>
    <Link className="button primary" href="/#contacto">Hablemos de un proyecto</Link>
  </main>;
}
