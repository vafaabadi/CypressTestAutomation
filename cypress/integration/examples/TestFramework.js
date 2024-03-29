// describe = test suite. multiple test cases can be in test suite.
// describe has two arguments: description and function without any arguments.
/// <reference types="Cypress" />
/// <reference types="cypress-iframe" />

import 'cypress-iframe'
import HomePage from '../TestFramework_PageObjects/HomePage'
import PhonesPage from '../TestFramework_PageObjects/PhonesPage'
import CheckOutPage from '../TestFramework_PageObjects/CheckOutPage'
import LogInPage from '../TestFramework_PageObjects/LogInPage'
import { get } from 'cypress/types/lodash'



describe('Hooks', function() {
    // it = test case.

    beforeEach(function()
    {
        cy.fixture('TestFramework_DataDriven').then(function(data)
        {
            globalThis.data = data
        })

        cy.sqlServer("select * from Credentials").then(function(result)
        {
            globalThis.cred = result
        })
    })

    
    it('Download_Parse_Excel',()=>
    {

        // visit the web site to download the Excel file
        cy.visit('https://www.wisdomaxis.com/technology/software/data/for-reports/')
        cy.get('a[download*="Data Join vs Data Blending.xlsx"]').click()

        cy.wait(2000)
        // Parse and read Excel file
        const excelFilePath = Cypress.config("fileServerFolder")+"\\cypress\\downloads\\Data Join vs Data Blending.xlsx"
        cy.task('excelToJsonConverter',excelFilePath).then(function(result)
        {
            //cy.log(result);
            console.log(result);
            console.log(result.Department)
            console.log(result.Department[14].C)
            console.log(result.Department[14].A)
            // asserting specific cell in the excel file
            const employeeName = result.Department[14].C
            expect(globalThis.data.employeename).to.equal(employeeName)
            // asserting specific cell in the excel file
            const employeeDeptId = result.Department[14].A
            expect(globalThis.data.employeedeptid).to.equal(employeeDeptId)            
        })

        //// doesnt look for a specific cell and then assert the cell. it will search the whole excel file as a text and find the word you are asserting.
        //cy.readFile(excelFilePath).then(function(text)
        //{
        //    expect(text).to.include(globalThis.data.employeename)
        //    expect(text).to.include(globalThis.data.employeedeptid)
        //})

    })

    it('LogIn_By_Data_From_DB',()=>
    {
        const logInPage = new LogInPage()

        cy.visit(Cypress.env('LoginUrl'))
        console.log(globalThis.cred)
        logInPage.getUsernameBox().type(globalThis.cred[1])
        logInPage.getPasswordBox().type(globalThis.cred[2])
        logInPage.getSubmitBox().click()
        cy.get('p strong').then(function(ele)
        {
            ele = ele.text()
            console.log(ele)
            expect(ele.includes('Congratulations')).to.be.true
        })

    })

    it('Read_data_from_DB',()=>
    {
        cy.sqlServer("select * from People").then(function(records)
        {
            console.log(records[0][1])   // result[0] = first row of records (array).    // result[0][1] = second cell (first cell has index 0, second cel has index 1) in the first row.
            console.log(records[1][3])   // second row returned ( [1] ) and pick 4th cell ( [3] ) in the row.
        })
    })

    it('Download_Parse_CSV', ()=>
    {
        cy.visit('https://wsform.com/knowledgebase/sample-csv-files/')
        // download a dummy csv file
        cy.get('#post-2363 > section > table:nth-child(6) > tbody > tr:nth-child(1) > td:nth-child(1) > a').click()
        // THIS IS INCOMPLETE. GO TO 'BDD' FOLDER AND SEARCH FOR THE CSV FILE TEST CASE. THE TEST CASE UNDER BDD FILE IS COMPREHENSIVE.
        // THIS IS INCOMPLETE. GO TO 'BDD' FOLDER AND SEARCH FOR THE CSV FILE TEST CASE. THE TEST CASE UNDER BDD FILE IS COMPREHENSIVE.
    })

    it('BDD_POM_DataDriven_Command_Iteration', function() {
        
        /*
        **************************************************
        **************************************************
        **************************************************  
        BDD CUCUMBER: to run BBD, you need to run cucumber .feature file
        cypress run --spec cypress\integration\examples\BDD\ecommerce.feature --headed --browser chrome
        OR
        replace specPattern: 'cypress/integration/examples/*.js by specPattern: 'cypress/integration/examples/BDD/*.feature' and run the cypress as normal.

        to run BDD test cases by tag, run the following in Terminal: npx cypress run --env tags="@regression"  OR   npx cypress run --env tags="@smoke"   . The BDD test cases were given tags @regression and @smoke in ecommerce.feature file under BDD folder under this project.
        tags: no exist : npx cypress run --env tags="@DbIntegration" --headed --browser chrome --no-exit

        to trigger HTML report, run in the Terminal: node C:\Users\44741\CypressTestAutomation\cucumber-html-report.js
        Once you ran the line code above, then copy the path of C:\Users\44741\CypressTestAutomation\cypress\cucumberReports\cucumber-HTMLreport.html\index.html and pasted it on web browser to view graphical HTML report.
        
        **************************************************
        **************************************************
        **************************************************
        */
        

        Cypress.config('defaultCommandTimeout',30000)   // applied only to this test case // explicit timeout

        const homePage = new HomePage()
        const phonesPage = new PhonesPage()
        const checkOutPage = new CheckOutPage()
        
        cy.visit(Cypress.env('url')+"/angularpractice/")
        // firstname derived from json file
        homePage.getFirstnameBox().type(globalThis.data.name)
        // gendre derived from json file
        homePage.getGendreDropdownBox().select(globalThis.data.gendre)
        // assert 'two-way data binding example' is showing this.data.name 
        homePage.getTwoWayDataBindingBox().should('have.value',globalThis.data.name)
        // assert minLength of Firstname is 2 characters by asserting the HTML minLength=2
        // have.attr = the way to assert attributes from HTML
        homePage.getFirstnameBox().should('have.attr','minlength',2)
        // assert radio button Entrepenuer is disabled
        homePage.getEntrepeunerRadioBttn().should('be.disabled')
        // click on Shop
        homePage.getShopbttn().click()
        // manual pause. test case can be resumed from TestRunner/Cypress again.
        //cy.pause()
        // select the desired phone products using command PhoneShopSelectProduct from commands.json file, data-driven phoneNames from TeamFramework_DataDriven.json file and iteration.
        globalThis.data.phoneNames.forEach(function(element)
        {
            cy.PhoneShopSelectProduct(element)
        })
        // click on check out bttn
        phonesPage.getCheckOutBttn().click()

        var sum = 0
        cy.get('tbody > tr > td:nth-child(4) > strong').each(($el, index, $list) => {
        
            const priceTag = $el.text()
            var seperatePrice = priceTag.split(' ')
            var onlyPrice = seperatePrice[1].trim()
            sum = Number(sum) + Number(onlyPrice)
        
        }).then(function()
        {
            cy.log(sum)     // create .Then() to let the loop finish first before JS moves to the rest of the code.
        })

        cy.get('h3 > strong').then(function(element)
        {
            const totalTag = element.text()
            var totalPrice = totalTag.split(' ')  
            var totalPrice = totalPrice[1].trim()
            expect(sum).to.equal(Number(totalPrice))
        })        

        // on CheckOut page, proceed to submit
        checkOutPage.getCheckoutBttn().click()
        // delivery location page.
        // type fr in the delivery location box
        cy.get('#country').type('i')
        cy.wait(7000)
        cy.get('div.suggestions > ul > li > a').each(($el, index, $list) => {
            if($el.text()===globalThis.data.deliveryCountry) // Indonesia
            {
            const countryIndonesia = $el
            cy.get(countryIndonesia).click()
            }
        })
        cy.get('#country').should('have.value',globalThis.data.deliveryCountry) //assertion Indonesia selected
        // checked box
        cy.get('div > label:nth-child(2)').click()
        // click on Submit bttn
        cy.get('form > input').click()
        // assert the success message appeared on the screen
        cy.get("div[class*='alert']").then(function(element)
        {
            const successMessage = element.text()                   // to extract the Success text message
            expect(successMessage.includes('Success')).to.be.true   // Asserting the text has 'Success' word in it.
        })
    
    })
    
    it('POM_DataDriven_Command_Iteration', function() {
        
        Cypress.config('defaultCommandTimeout',30000)   // applied only to this test case // explicit timeout

        const homePage = new HomePage()
        const phonesPage = new PhonesPage()
        const checkOutPage = new CheckOutPage()
        
        cy.visit(Cypress.env('url')+"/angularpractice/")
        // firstname derived from json file
        homePage.getFirstnameBox().type(globalThis.data.name)
        // gendre derived from json file
        homePage.getGendreDropdownBox().select(globalThis.data.gendre)
        // assert 'two-way data binding example' is showing globalThis.data.name 
        homePage.getTwoWayDataBindingBox().should('have.value',globalThis.data.name)
        // assert minLength of Firstname is 2 characters by asserting the HTML minLength=2
        // have.attr = the way to assert attributes from HTML
        homePage.getFirstnameBox().should('have.attr','minlength',2)
        // assert radio button Entrepenuer is disabled
        homePage.getEntrepeunerRadioBttn().should('be.disabled')
        // click on Shop
        homePage.getShopbttn().click()
        // manual pause. test case can be resumed from TestRunner/Cypress again.
        //cy.pause()
        // select the desired phone products using command PhoneShopSelectProduct from commands.json file, data-driven phoneNames from TeamFramework_DataDriven.json file and iteration.
        globalThis.data.phoneNames.forEach(function(element)
        {
            cy.PhoneShopSelectProduct(element)
        })
        // click on check out bttn
        phonesPage.getCheckOutBttn().click()

        var sum = 0
        cy.get('tbody > tr > td:nth-child(4) > strong').each(($el, index, $list) => {
        
            const priceTag = $el.text()
            var seperatePrice = priceTag.split(' ')
            var onlyPrice = seperatePrice[1].trim()
            sum = Number(sum) + Number(onlyPrice)
        
        }).then(function()
        {
            cy.log(sum)     // create .Then() to let the loop finish first before JS moves to the rest of the code.
        })

        cy.get('h3 > strong').then(function(element)
        {
            const totalTag = element.text()
            var totalPrice = totalTag.split(' ')  
            var totalPrice = totalPrice[1].trim()
            expect(sum).to.equal(Number(totalPrice))
        })        

        // on CheckOut page, proceed to submit
        checkOutPage.getCheckoutBttn().click()
        // delivery location page.
        // type fr in the delivery location box
        cy.get('#country').type('i')
        cy.wait(7000)
        cy.get('div.suggestions > ul > li > a').each(($el, index, $list) => {
            if($el.text()===globalThis.data.deliveryCountry) // Indonesia
            {
            const countryIndonesia = $el
            cy.get(countryIndonesia).click()
            }
        })
        cy.get('#country').should('have.value',globalThis.data.deliveryCountry) //assertion Indonesia selected
        // checked box
        cy.get('div > label:nth-child(2)').click()
        // click on Submit bttn
        cy.get('form > input').click()
        // assert the success message appeared on the screen
        cy.get("div[class*='alert']").then(function(element)
        {
            const successMessage = element.text()                   // to extract the Success text message
            expect(successMessage.includes('Success')).to.be.true   // Asserting the text has 'Success' word in it.
        })
    
    })

    /* run the following command in the Terminal:
    npx cypress run --spec cypress\integration\examples\TestFramework.js --headed browser chrome --env url="https://www.rahulshettyacademy.com"

    npx cypress run = will open Cypress
    --spec cypress\integration\examples\TestFramework.js = will know what spec/test suite to run
    --headed browser chrome = will run the test cases in browser Chrome visually
    --env url="https://www.rahulshettyacademy.com" = will overwrtie the env url with what is written in Terminal
    */

    /* The command to run locally on my own machine (the key is local to my machine) and record the result on Cypress cloud: 
    npx cypress run --record --key a979428a-d58d-44e7-8a7b-954738a203b7
    */

    /* Another example of running on Cloud and recording the result:
    npx cypress run --spec cypress\integration\examples\TestFramework.js --headed browser chrome --record --key a979428a-d58d-44e7-8a7b-954738a203b7
    The command above will run TestFramework.js test suite on Chrome visually and record the result on Cypress cloud.
    */

    /*
    npx cypress run --spec cypress\integration\examples\TestFramework.js --browser chrome --record --key a979428a-d58d-44e7-8a7b-954738a203b7
    */

    /*
    The following command in Terminal:
    npm run test
    It will run all the test cases in the project file becuase I made changes in package.json file and introduced 'test' as all test cases.
    */

    /*
    The following command in Terminal:
    npm run headTest
    It will run all the test cases in headed in Electron. It uses 'test' and 'headTest' introduced in package.json file.

    npm run chromeTest
    It will run all the test cases in headed in Chrome. It uses 'test' introduced in package.json file.

    npm run recordCloudTest
    It will run the test cases on Cloud
    */

    //To run a test only in browsers chrome and edge, for example. => it('POM_DataDriven_Command_Iteration', {browser: ['chrome','edge']} , () => {     test body    })
    //To run a test on any browsers but not firefox or egde, for example  => it('POM_DataDriven_Command_Iteration', {browser: ['!firefox','!edge']} , () => {     test body    })

    // dummy comment to test a push to Github

    /*
    Pass password as env variable in command line
    To feed the password from command line, you need to introduce an env variable called   passowrd=''   in cypress.config.js file first.
    Then, in the command line you pass the follwoing line:
    npx cypress run --env tags="@LogInCommandLine",password=Password123 --headed --browser chrome --no-exit             (for adding multiple env variables, seperate them by comma)
    --env password=Password123     will override the env variable already introduced in cypress.config.js file.
    mix of tags and env variables: npx cypress run --env tags="@LogInCommandLine",password=Password123 --headed --browser chrome --no-exit
    */

    /*
    Run one spec from list of specs
    npx cypress run --spec "cypress/integration/examples/WebControlesUI.js"
    */

    /* parallel test execution on multiple browsers:
    
    add the following lines to "scripts" under package.json file. Then run them from Terminal. You will observe the test spec/s will be run on multiple browsers in paraller on cloud. 
    
    "cy:run_spec": "npx cypress run --spec 'cypress/integration/examples/BDD/*.feature' --headless --record --key a979428a-d58d-44e7-8a7b-954738a203b7"
    "cy:run_browser": " npm run cy:run_spec -- --browser firefox & npm run cy:run_spec -- --browser chrome & npm run cy:run_spec -- --browser edge"
    */



    it('DataDriven_Command_iteration_MultipleItemsSelected', function() {
      
        cy.visit(Cypress.env('url')+"/angularpractice/")
        // click on Shop
        cy.get(':nth-child(2) > .nav-link').click()
        // manual pause. test case can be resumed from TestRunner/Cypress again.
        //cy.pause()
        // select the desired phone products using command PhoneShopSelectProduct from commands.json file, data-driven phoneNames from TeamFramework_DataDriven.json file and iteration.
        globalThis.data.phoneNames.forEach(function(element)
        {
            cy.PhoneShopSelectProduct(element)
        })

    })

    it('BDD_DataDriven_ValidationsAssertions', function() {
      
        /*
        **************************************************
        **************************************************
        **************************************************  
        BDD CUCUMBER: to run BBD, you need to run cucumber .feature file
        cypress run --spec cypress\integration\examples\BDD\ecommerce.feature --headed --browser chrome
        **************************************************
        **************************************************
        **************************************************
        */

        const homePage = new HomePage()

        cy.visit(Cypress.env('url')+"/angularpractice/")
        // firstname derived from json file
        homePage.getFirstnameBox().type(globalThis.data.name)
        // gendre derived from json file
        homePage.getGendreDropdownBox().select(globalThis.data.gendre)
        // assert 'two-way data binding example' is showing globalThis.data.name 
        homePage.getTwoWayDataBindingBox().should('have.value',globalThis.data.name)
        // assert minLength of Firstname is 2 characters by asserting the HTML minLength=2
        // have.attr = the way to assert attributes from HTML
        homePage.getFirstnameBox().should('have.attr','minlength',2)
        // assert radio button Entrepenuer is disabled
        homePage.getEntrepeunerRadioBttn().should('be.disabled')
        Cypress.config('defaultCommandTimeout',8000)
        homePage.getShopbttn().click()

    })

    




})