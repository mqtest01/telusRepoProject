const { defineConfig } = require("cypress");

module.exports = defineConfig({

  reporter: 'cypress-mochawesome-reporter',
  e2e: {

    baseUrl: 'https://www.telusinternational.ai',
    defaultCommandTimeout: 8000,
    "reporterOptions": {
      "reportDir": "cypress/run_result_reports",
      "charts": true,
      "reportPageTitle": "My Test Suite",
      "embeddedScreenshots": true,
      "inlineAssets": true,
      "html": true,
      "overwrite": false
    },
    
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
