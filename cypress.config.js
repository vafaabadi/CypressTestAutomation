const { defineConfig } = require("cypress");

const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const browserify = require("@badeball/cypress-cucumber-preprocessor/browserify");
const sqlServer = require('cypress-sql-server');

const excelToJson = require('convert-excel-to-json');
const fs = require('fs');

async function setupNodeEvents(on, config) {

  config.db = {
    userName: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    server: "cypresstestautomationportfolio.database.windows.net",
    options: {
        database: "CypressTestAutomation",
        encrypt: true,
        rowCollectionOnRequestCompletion : true
    }
}
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await preprocessor.addCucumberPreprocessorPlugin(on, config);
  on("file:preprocessor", browserify.default(config));

  tasks = sqlServer.loadDBPlugin(config.db);
  on('task', tasks);

  // cy.Task to parse and read Excel file
  on('task',{
      excelToJsonConverter(excelFilePath)
      {
        const result = excelToJson
        ({
        source: fs.readFileSync(excelFilePath)
        });
        return result
      }


  })

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

module.exports = defineConfig({

  viewportHeight: 1080,
  viewportWidth: 1920,
  requestTimeout: 10000,        // globally applied to the current project across all the test cases listed under CypressTestAutomation
  defaultCommandTimeout: 20000, // globally applied to the current project across all the test cases listed under CypressTestAutomation
  env:{
    url: "https://www.rahulshettyacademy.com",
    baseURLAPIs: "https://conduit.bondaracademy.com/",
    username: "student",
    password: process.env.LOGIN_PASSWORD,
    CsvUrl: "https://wsform.com/knowledgebase/sample-csv-files/",
    LoginUrl: "https://practicetestautomation.com/practice-test-login/",
    ExcelUrl: "https://www.wisdomaxis.com/technology/software/data/for-reports/",
  },
  projectId: "9c692s",    // ProjectID is unique to the current project open in VSCode: CypressTestAutomation
  video: true,
  retries: {
    runMode: 2,           // rerun the failed test cases two more time in headless or in CICD.
    openMode: 1,          // rerun the failed test cases one more time in visual mode (test runner is open).
  },
  e2e: {
    setupNodeEvents,
  // excludeSpecPattern: ['**/nameOfFolder','**/nameOfAnotherFolder'],     <-- excludes folders from cypress/e2e path if such a setup exist.
    specPattern: 'cypress/integration/examples/BDD/*.feature'
    // to avoid BDD triggering and running, replace the line by:
    // specPattern: 'cypress/integration/examples/*.js'
    // specPattern: 'cypress/integration/examples/BDD/*.feature'
    // specPattern: 'cypress/integration/examples/WebUiElements.js'

  },
});

/* On Cypress Test Runner, go to Settings, Project Settings, scroll down and pick any defaults settings & change and paste it in cypress.config.js on VS Code to modify that setting.
*/   



/* how to change remote repo from Terminal:
first type in Terminal: git remote -v
to find out remote origin url. for example it is on GitHub https://github.com/vafaabadi/CypressTestAutomation.git and you would like to change it to Azure repos https://vafaabadi12@dev.azure.com/vafaabadi12/CypressTestAutomation/_git/CypressTestAutomation
then type in Terminal: git remote set-url origin https://vafaabadi12@dev.azure.com/vafaabadi12/CypressTestAutomation/_git/CypressTestAutomation
then type in again in Terminal: git remote -v
now, you see that the remote origin url changed from GitHub to Azure. 
*/

// branch UpNorth

/*
To implement Github secrets:
Add process.env.EXAMPLE to the variable in cypress.config.js file. password: process.env.LOGIN_PASSWORD  userName: process.env.DB_USERNAME  password: process.env.DB_PASSWORD,
Then add the env variable key and value to the Yaml file. LOGIN_PASSWORD: ${{ secrets.LOGIN_PASSWORD }}  DB_USERNAME: ${{ secrets.DB_USERNAME }}  DB_PASSWORD: ${{ secrets.DB_PASSWORD }}
Then set up Repo secrets on GitHub settings. DB_PASSWORD   DB_USERNAME    LOGIN_PASSWORD
Look at three examples: password, DB username and DB password.
*/                          