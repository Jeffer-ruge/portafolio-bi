"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { sitePath } from "../content/site-path";
import { Box, Pause, Play } from "lucide-react";
import { Component, useCallback, useEffect, useRef, useState, type ReactNode } from "react";

const Core = dynamic(() => import("./neon-core"), { ssr: false });

class SceneBoundary extends Component<{ children: ReactNode; onFailure: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onFailure(); }
  render() { return this.state.failed ? null : this.props.children; }
}

export function HeroVisual() {
  const area = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [available, setAvailable] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const showStaticView = useCallback(() => setFailed(true), []);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 851px) and (pointer: fine)");
    const update = () => {
      const supports = typeof window.WebGL2RenderingContext !== "undefined";
      setAvailable(supports);
      setEnabled(supports && desktop.matches && !preference.matches &&
        !(navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);
    };
    update();
    preference.addEventListener("change", update);
    desktop.addEventListener("change", update);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (area.current) observer.observe(area.current);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", update);
      desktop.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled || !visible || failed) return;
    if (typeof window.requestIdleCallback === "function") {
      const frame = window.requestIdleCallback(() => setReady(true), { timeout: 1200 });
      return () => window.cancelIdleCallback(frame);
    }
    const timer = window.setTimeout(() => setReady(true), 200);
    return () => window.clearTimeout(timer);
  }, [enabled, visible, failed]);

  const live = ready && enabled && visible && !failed;
  return <div ref={area} className="hero-visual">
    <div aria-hidden="true" className={live ? "hero-art live" : "hero-art"}>
      <div className="hero-grid" />
      <div className="hero-orbit" aria-hidden="true"><i /><i /><i /><b /><em /></div>
      <picture className="hero-image">
        <source media="(max-width: 620px)" srcSet={sitePath("/core-small.webp")} />
        <Image src={sitePath("/core.webp")} alt="" width={1200} height={800} unoptimized fetchPriority="high" loading="eager"
          onError={(event) => { event.currentTarget.closest("picture")?.classList.add("image-unavailable"); }} />
      </picture>
      {live && (
        <div className="hero-canvas">
          <SceneBoundary onFailure={showStaticView}>
            <Core onError={showStaticView} />
          </SceneBoundary>
        </div>
      )}
    </div>
    {available && !failed && <button className="visual-toggle" type="button" aria-pressed={enabled}
      onClick={() => setEnabled(!enabled)}>
      {enabled ? <Pause size={14} /> : <Box size={15} />} {enabled ? "Pausar 3D" : "Explorar en 3D"}
    </button>}
    {failed && <span className="visual-toggle" role="status"><Play size={14} /> Vista estática</span>}
  </div>;
}
