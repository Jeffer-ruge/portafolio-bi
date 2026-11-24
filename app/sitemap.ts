import type { MetadataRoute } from "next";
import { projects } from "../content/profile";
import { sitePath } from "../content/site-path";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const site = process.env.NEXT_PUBLIC_SITE_URL;
  return site ? [sitePath("/"), ...projects.map(p => sitePath(`/proyectos/${p.slug}/`))].map(url => ({ url: new URL(url, site).href })) : [];
}
