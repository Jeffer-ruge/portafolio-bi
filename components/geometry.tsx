import Image from "next/image";
import type { Project } from "../content/profile";
import { sitePath } from "../content/site-path";

export function CaseArt({ type }: { type: Project["visual"] }) {
  return <div className={`case-art case-art--${type}`} aria-hidden="true">
    {type === "dashboard" ? <div className="case-dashboard"><Image src={sitePath("/skills/tableros-bi.webp")} alt="" width={720} height={430} unoptimized /></div> :
      type === "orbit" ? <div className="case-orbit"><i /><i /><i /><b /></div> :
      <div className="case-grid">{Array.from({ length: 49 }, (_, index) => <i key={index} className={(index * 17 + Math.floor(index / 7) * 3) % 11 < 4 ? "lit" : ""} />)}</div>}
  </div>;
}
