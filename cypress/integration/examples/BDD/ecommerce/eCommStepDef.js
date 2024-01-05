import {Given,When,Then} from "cypress-cucumber-preprocessor/steps";

const homePage = new HomePage()
const phonesPage = new PhonesPage()


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
    this.data.phoneNames.forEach(function(element)
    {
        cy.PhoneShopSelectProduct(element)
    })
    // click on check out bttn
    phonesPage.getCheckOutBttn().click()
})

//And Validate the total prices
And ('Validate the total prices',()=>
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
})

//Then Select the country, submit and verify Success! message 
Then('Select the country, submit and verify Success! message',()=>
{
    cy.get('#country').should('have.value',this.data.deliveryCountry) //assertion Indonesia selected
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