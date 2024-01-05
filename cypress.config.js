const { defineConfig } = require("cypress");

const {addCucumberPreprocessorPlugin,} = require("@badeball/cypress-cucumber-preprocessor");
const {preprocessor,} = require("@badeball/cypress-cucumber-preprocessor/browserify");

async function setupNodeEvents(on, config) {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await addCucumberPreprocessorPlugin(on, config);

  on("file:preprocessor", preprocessor(config));

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

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
    setupNodeEvents,
    specPattern: 'cypress/integration/examples/BDD/*.feature'   // to avoid BDD triggering and running, replace the line by: specPattern: 'cypress/integration/examples/*.js'
    
  },
});


/* On Cypress Test Runner, go to Settings, Project Settings, scroll down and pick any defaults settings & change and paste it in cypress.config.js on VS Code to modify that setting.
*/
