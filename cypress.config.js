const { defineConfig } = require("cypress");

const environments = {
  staging: "https://staging.bankofcanada.ca/valet/",
  production: "https://www.bankofcanada.ca/valet/",
  default: "https://www.bankofcanada.ca/valet/",
};

module.exports = defineConfig({
  e2e: {
    baseUrl: environments[process.env.test_env] || environments.default,
    setupNodeEvents(on, config) {
      config.baseUrl =
        environments[process.env.test_env] || environments.default;
      return config;
    },
  },
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: true,
    json: true,
    timestamp: "mmddyyyy_HHMMss",
  },
});
