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

Given ('I visit the web site I want to log into', ()=>
{
    cy.visit(Cypress.env('LoginUrl'))
})

When ('I read credentials from DB and provide them as username and password', ()=>
{
    logInPage.getUsernameBox().type(globalThis.cred[1])
    logInPage.getPasswordBox().type(globalThis.cred[2], {log: false})

    logInPage.getSubmitBox().click()
})

Then ('Assert I logged in successfully.', ()=>
{
    cy.wait(1000)
    cy.get('p strong').then(function(ele)
        {
            ele = ele.text()
            console.log(ele)
            expect(ele.includes('Congratulations')).to.be.true
        })
}) 

Given ('I navigate to the web page - Excel', ()=>
{
    cy.visit(Cypress.env('ExcelUrl'))
})

When ('I download the Excel file', ()=>
{
    cy.get('a[download*="Data Join vs Data Blending.xlsx"]').click()
    cy.wait(2000)
})

Then ('Assert a specific cell in the Excel file', ()=>
{
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
})

When ('I read password from command line as env variable', ()=>
{
    const passWord = Cypress.env('password')
    if (typeof passWord !== 'string' || !passWord) {        // If password not provided in command line, the following error message will be triggered
        throw new Error('Missing password value, set password using password=...')
    }
    logInPage.getUsernameBox().type(Cypress.env('username'))
    logInPage.getPasswordBox().type(Cypress.env('password'), {log: false})
    /***************************** 
    ****************************** 
    // npx cypress run --env tags="@LogInCommandLine",password=Password123 --headed --browser chrome --no-exit
    ******************************
    *****************************/
    logInPage.getSubmitBox().click()
})

Given ('I navigate to a practice web site', ()=> 
{
    cy.visit('https://magento.softwaretestingboard.com/')
})

When ('I use multiple x-path to navigate the web site', ()=>
{
    cy.xpath('//*[@id="ui-id-5"]').click()
    cy.xpath('//*[@id="narrow-by-list2"]/dd/ol/li[2]/a').click()
})

Then ('Assert the test case doesnt fail using x-path.', ()=>
{
    cy.xpath('//*[text()[contains(.,"per page")]]').contains('per page')
})