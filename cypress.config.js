const { defineConfig } = require("cypress");

module.exports = defineConfig({

  requestTimeout: 10000,        // globally applied to the current project across all the test cases listed under CypressTestAutomation
  defaultCommandTimeout: 20000, // globally applied to the current project across all the test cases listed under CypressTestAutomation
  env:{
    url: "https://www.rahulshettyacademy.com",
    username: "ThisIsTest",
    password: "ThisIsTest",
  },
  projectId: "9c692s",    // ProjectID is unique to the current project open in VSCode: CypressTestAutomation
  video: true,
  retries: {
    runMode: 2,           // rerun the failed test cases one more time.
    },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'cypress/integration/examples/*.js'
    
  },
});


/* On Cypress Test Runner, go to Settings, Project Settings, scroll down and pick any defaults settings & change and paste it in cypress.config.js on VS Code to modify that setting.
*/
