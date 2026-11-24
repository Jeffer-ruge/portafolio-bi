import { defineConfig } from "@playwright/test";

const port = process.env.PORT || "4389";
const baseURL = `http://127.0.0.1:${port}`;

export default defineConfig({
  testDir: "./tests",
  workers: 2,
  use: {
    baseURL,
    channel: "chrome",
    launchOptions: { args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] },
  },
  webServer: {
    command: "node scripts/serve.mjs",
    url: baseURL,
    reuseExistingServer: Boolean(process.env.PORT),
    timeout: 15000,
  },
});
