import type { Metadata } from "next";
import type { ReactNode } from "react";
import { profile } from "../content/profile";
import { siteUrl } from "../content/site-path";
import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/geist";
import "./globals.css";

const origin = process.env.NEXT_PUBLIC_SITE_URL;
const socialImage = origin ? siteUrl("/social.png", origin) : "/social.png";
export const metadata: Metadata = {
  metadataBase: origin ? new URL(origin) : undefined,
  title: { default: `${profile.name} · Datos, BI y automatización`, template: `%s · ${profile.name}` },
  description: profile.summary,
  alternates: origin ? { canonical: siteUrl("/", origin) } : undefined,
  openGraph: { type: "website", locale: "es_CO", siteName: profile.name, title: profile.title, description: profile.summary, images: [socialImage] },
  twitter: { card: "summary_large_image", title: profile.title, description: profile.summary, images: [socialImage] },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="es-CO"><body>{children}</body></html>;
}
