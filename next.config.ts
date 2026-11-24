import type { NextConfig } from "next";

const site = process.env.NEXT_PUBLIC_SITE_URL;
const basePath = site ? new URL(site).pathname.replace(/\/+$/, "") : "";
const config: NextConfig = {
  output: "export",
  trailingSlash: true,
  reactStrictMode: true,
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default config;
