"use client";

import dynamic from "next/dynamic";
import { sitePath } from "../content/site-path";
import { useEffect, useRef, useState } from "react";
import { Database, ScanLine, ChartNoAxesCombined } from "lucide-react";

const steps = [
  { title: "Captura", detail: "Estandarizo el ingreso de datos y automatizo tareas repetitivas con Excel y macros.", Icon: Database },
  { title: "Validación", detail: "Cruzo fuentes, compruebo consistencia y detecto registros que requieren revisión.", Icon: ScanLine },
  { title: "Visualización", detail: "Convierto registros validados en indicadores y tableros que el equipo puede consultar.", Icon: ChartNoAxesCombined },
] as const;
const Split = dynamic(() => import("./ui/scroll-split-card").then(module => module.ScrollSplitCard), { ssr: false });

export function ProcessChapter() {
  const chapter = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const preference = matchMedia("(min-width: 851px) and (min-height: 660px) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    let nearby = false;
    const update = () => setActive(preference.matches && nearby);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        nearby = true;
        update();
        observer.disconnect();
      }
    }, { rootMargin: "420px" });
    if (chapter.current) observer.observe(chapter.current);
    preference.addEventListener("change", update);
    return () => { preference.removeEventListener("change", update); observer.disconnect(); };
  }, []);

  return <section ref={chapter} id="metodo" aria-labelledby="process-title" className="process-chapter">
    <div className="process-stage shell">
      <header className="process-heading">
        <p className="eyebrow">Cómo trabajo</p>
        <h2 id="process-title">Del dato al tablero<span className="accent">.</span></h2>
      </header>
      {active ? <Split imageSrc={sitePath("/core.webp")} cards={[
        { title: steps[0].title, description: steps[0].detail, icon: <Database size={26} aria-hidden="true" /> },
        { title: steps[1].title, description: steps[1].detail, icon: <ScanLine size={26} aria-hidden="true" /> },
        { title: steps[2].title, description: steps[2].detail, icon: <ChartNoAxesCombined size={26} aria-hidden="true" /> },
      ]} /> : <div className="process-deck">
        <ol className="process-grid">
          {steps.map(({ title, detail, Icon }) => <li className="process-slice" key={title}>
            <div className="process-back">
              <Icon size={26} strokeWidth={1.55} aria-hidden="true" />
              <h3>{title}</h3>
              <p>{detail}</p>
            </div>
          </li>)}
        </ol>
      </div>}
    </div>
  </section>;
}
