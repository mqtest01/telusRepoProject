const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {

    baseUrl: 'https://www.telusinternational.ai',
    defaultCommandTimeout: 5000,
    

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
