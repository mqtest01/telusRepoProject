const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {

    baseUrl: 'https://www.telusinternational.ai',
    defaultCommandTimeout: 8000,
    reporter: 'cypress-mochawesome-reporter',
    "reporterOptions": {
      "reportDir": "cypress/run_result_reports",
      "charts": true,
      "reportPageTitle": "My Test Suite",
      "embeddedScreenshots": true,
      "inlineAssets": true,
      "html": true
    },
    
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
