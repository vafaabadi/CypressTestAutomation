/// <reference types="Cypress" />
/// <reference types="cypress-iframe" />

import HomePage from '../../../TestFramework_PageObjects/HomePage'
import PhonesPage from '../../../TestFramework_PageObjects/PhonesPage'
import CheckOutPage from '../../../TestFramework_PageObjects/CheckOutPage'
import CsvWebPage from '../../../TestFramework_PageObjects/CsvWebPage'
import {Given,When,Then} from "@badeball/cypress-cucumber-preprocessor"


const neatCSV = require('neat-csv')

const homePage = new HomePage()
const phonesPage = new PhonesPage()
const checkOutPage = new CheckOutPage()
const csvWebPage = new CsvWebPage()


Given ('I open ecommerce page',()=>
{
    cy.visit(Cypress.env('url')+"/angularpractice/")
})

//When I add items to Cart
When ('I add items to Cart',()=>
{
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
})

//And Validate the total prices
When ('Validate the total prices',()=>
{
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
})

//Then Select the country, submit and verify Success! message 
Then('Select the country, submit and verify Success! message',(dataTable)=>
{
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


When ('I fill the form details',()=>
{
        // firstname derived from json file
        homePage.getFirstnameBox().type(globalThis.data.name)
        // gendre derived from json file
        homePage.getGendreDropdownBox().select(globalThis.data.gendre)
})

Then ('Validate the form behaviour',()=>
{
        // assert 'two-way data binding example' is showing this.data.name 
        homePage.getTwoWayDataBindingBox().should('have.value',globalThis.data.name)
        // assert minLength of Firstname is 2 characters by asserting the HTML minLength=2
        // have.attr = the way to assert attributes from HTML
        homePage.getFirstnameBox().should('have.attr','minlength',2)
        // assert radio button Entrepenuer is disabled
        homePage.getEntrepeunerRadioBttn().should('be.disabled')
        Cypress.config('defaultCommandTimeout',8000)
})

Then ('select the shop page',()=>
{
        homePage.getShopbttn().click()
})

Given ('I navigate to the web page',()=>
{
    cy.visit(Cypress.env('CsvUrl'))
})

When ('I download the CSV file',()=>
{
    csvWebPage.getCsvDownloadableLink().then(function(element)
        {
            const csvFileText = element.text()                          // to extract the Success text message
            expect(csvFileText.includes('color_srgb.csv')).to.be.true   // Asserting the text has the text in it.
        })
    csvWebPage.getCsvDownloadableLink().click()
    cy.wait(3000)
})

Then ('Assert a specific color is in the CSV file', ()=>
{
    // global path to the project - dynamically
    //Cypress.config("fileServerFolder")
    // pick the location and the file dynamically
    cy.readFile(Cypress.config("fileServerFolder")+'\\cypress\\downloads\\color_srgb.csv')
    .then(async function(text)      // added async here for await (one line down) doesnt throw error message
    {
        const csv = await neatCSV(text)   // now the constact csv is Javascript object
        console.log(csv)    // run the test case on local cypress test runner and check console on the browser. the csv content will be listed as JS objects.
        const silverHEX = csv[1].HEX
        expect('#C0C0C0').to.equal(silverHEX)
        const silverRGB = csv[1].RGB
        expect('rgb(75,75,75)').to.equal(silverRGB)
        //const TST = csv[1]["Name"]   // If there is space in the js object (for example the js object is Product name), put the object in quotation marks "" and then write it this way:    csv[1]["Product name"]
        //expect('Silver').to.equal(TST)
    }
    )
})