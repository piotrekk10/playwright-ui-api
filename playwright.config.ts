import dotenv from "dotenv";

import { defineConfig, devices } from "@playwright/test";

dotenv.config({ path: "./.env.local" });

export default defineConfig({
  testDir: "./tests/",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: process.env.UI_TESTS_URL,

    trace: "on-first-retry",

    testIdAttribute: "data-test",
  },
  projects: [
    // Setup
    {
      name: "auth setup",
      testMatch: "**/auth.setup.ts",
    },
    // Tests
    {
      name: "UI chromium",
      dependencies: ["auth setup"],
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1920, height: 1080 },
      },
      testMatch: /.*ui.spec.ts/,
    },
    {
      name: "UI firefox",
      dependencies: ["auth setup"],
      use: {
        ...devices["Desktop Firefox"],
        viewport: { width: 1920, height: 1080 },
      },
      testMatch: /.*ui.spec.ts/,
    },
    {
      name: "UI mobile_safari",
      dependencies: ["auth setup"],
      use: {
        ...devices["iPhone 13 Pro"],
        viewport: { width: 390, height: 844 },
      },
      testMatch: /.*ui.spec.ts/,
    },
    {
      name: "API chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1920, height: 1080 },
        headless: true,
      },
      testMatch: /.*api.spec.ts/,
    },
  ],
});
