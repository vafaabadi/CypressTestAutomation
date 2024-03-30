/// <reference types="Cypress" />
/// <reference types="cypress-iframe" />
/// <reference types="cypress-xpath" />


import 'cypress-xpath'
import HomePage from '../../../TestFramework_PageObjects/HomePage'
import PhonesPage from '../../../TestFramework_PageObjects/PhonesPage'
import CheckOutPage from '../../../TestFramework_PageObjects/CheckOutPage'
import CsvWebPage from '../../../TestFramework_PageObjects/CsvWebPage'
import LogInPage from '../../../TestFramework_PageObjects/LogInPage'
import {Given,When,Then} from "@badeball/cypress-cucumber-preprocessor"


const neatCSV = require('neat-csv')

const homePage = new HomePage()
const phonesPage = new PhonesPage()
const checkOutPage = new CheckOutPage()
const csvWebPage = new CsvWebPage()
const logInPage = new LogInPage()





Given ('I navigate to the web page',()=>
{
    cy.visit(Cypress.env('CsvUrl'))     // written as env variable under cypress.config.js file      CsvUrl: "https://wsform.com/knowledgebase/sample-csv-files/"
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

Then ('Assert a specific color in the CSV file', ()=>
{
    // command from commands.js file // asserts specific cells in the csv file
    cy.ParseCSVFileColor(globalThis.data.relativepathcsv,globalThis.data.csvhex,globalThis.data.csvhgb)

    //// doesnt look for a specific cell and then assert the cell. it will search the whole csv file as a text and find the word you are asserting.
    //cy.readFile(globalThis.data.relativepathcsv).then(function(text)
    //{
    //    expect(text).to.include(globalThis.data.csvhex)
    //    expect(text).to.include(globalThis.data.csvhgb)
    //})
})





Given ('I open ecommerce page',()=>
{
    cy.visit(Cypress.env('url')+"/angularpractice/")
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