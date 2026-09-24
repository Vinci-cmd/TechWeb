import { defineConfig, devices } from "@playwright/test";
import { getE2EDatabaseUrl, loadRootEnvIfNeeded } from "./env.js";
loadRootEnvIfNeeded();
const webPort = Number(process.env.WEB_PORT ?? 5173);
const apiPort = Number(process.env.API_PORT ?? 4000);
const webBaseURL = `http://127.0.0.1:${webPort}`;
const apiBaseURL = `http://127.0.0.1:${apiPort}`;
const e2eDatabaseUrl = getE2EDatabaseUrl();
export default defineConfig({
  testDir: "./tests",
  workers: 1,
  timeout: 30_000,
  expect: {
    timeout: 5_000
  },
  use: {
    baseURL: 'http://localhost:5174',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] }
    }
  ],
  reporter: [["list"]]
});