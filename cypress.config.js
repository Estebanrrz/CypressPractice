const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'f11gqz',
  e2e: {
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
     
    },
  },
});
