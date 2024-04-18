import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },

  e2e: {
    specPattern: "src/components/**/*.e2e.cy.{js,jsx,ts,tsx}",
    setupNodeEvents(on, config) {},
    baseUrl: "http://localhost:3000/",
  },
});
