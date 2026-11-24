"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navigation } from "../content/profile";

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("inicio");

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
    }, { rootMargin: "-20% 0px -62% 0px" });
    for (const [id] of navigation) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <header className="site-header">
      <div className="nav-wrap shell">
        <a className="wordmark" href="#inicio" aria-label="J.Z · Jefferson Zambrano, inicio" onClick={() => setOpen(false)}>
          <span>J<span className="accent">.</span>Z</span>
        </a>
        <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="main-nav"
          aria-label={open ? "Cerrar menú" : "Abrir menú"} onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav id="main-nav" aria-label="Principal" className={open ? "nav-links is-open" : "nav-links"}
          onKeyDown={(event) => { if (event.key === "Escape") { setOpen(false); document.querySelector<HTMLButtonElement>(".menu-toggle")?.focus(); } }}>
          {navigation.map(([id, label]) => (
            <a key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined}
              className={id === "contacto" ? "nav-contact" : undefined} onClick={() => setOpen(false)}>{label}</a>
          ))}
        </nav>
      </div>
    </header>
  );
}
