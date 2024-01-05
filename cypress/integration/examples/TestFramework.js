// describe = test suite. multiple test cases can be in test suite.
// describe has two arguments: description and function without any arguments.
/// <reference types="Cypress" />
/// <reference types="cypress-iframe" />

import 'cypress-iframe'
import HomePage from '../TestFramework_PageObjects/HomePage'
import PhonesPage from '../TestFramework_PageObjects/PhonesPage'
import CheckOutPage from '../TestFramework_PageObjects/CheckOutPage'


describe('Hooks', function() {
    // it = test case. 

    beforeEach(function()
    {
        cy.fixture('TestFramework_DataDriven').then(function(data)
        {
            globalThis.data = data
        })
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

    // dummy comment to test a push to Github




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