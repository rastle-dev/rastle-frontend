import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "77qb41",
  env: {
    CYPRESS_API_HOST: process.env.NEXT_PUBLIC_BASE_URL,
    baseUrl: "http://localhost:3000",
    "cypress-react-selector": {
      root: "#root",
    },
  },
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
