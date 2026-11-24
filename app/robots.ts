import type { MetadataRoute } from "next";
import { sitePath } from "../content/site-path";
export const dynamic = "force-static";
export default function robots(): MetadataRoute.Robots {
  const site = process.env.NEXT_PUBLIC_SITE_URL;
  return { rules: { userAgent: "*", ...(site ? { allow: sitePath("/") } : { disallow: "/" }) }, sitemap: site ? new URL(sitePath("/sitemap.xml"), site).href : undefined };
}
