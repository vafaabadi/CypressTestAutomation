/// <reference types="Cypress" />
/// <reference types="cypress-iframe" />
/// <reference types="cypress-xpath" />


import {Given,When,Then} from "@badeball/cypress-cucumber-preprocessor"
import 'cypress-xpath'





Given("I navigate to my personal GitHub Account", function ()
{
    cy.visit('https://github.com/vafaabadi')
})

When("I visit CypressTestAutomation repository", function () 
{
    cy.contains('vafaabadi/CypressTestAutomation').click()
})

Then("Assert name of the repository is CypressTestAutomation", function ()  
{
    cy.get('strong a').eq(0).should('contain', 'CypressTestAutomation')
       
    
})
   


Given('Visit Github', () =>
{
    cy.visit('https://github.com/vafaabadi')
})

When('Click on pinned repository', () => 
{
    cy.get('span').find('.repo').click()
})

Then('Assert you clicked on C-Sharp Selenium Repository', () => 
{
    cy.get('strong a').eq(0).should('contain', 'C-sharp_Selenium_WebDriver_WebUITestAutomation')
        
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