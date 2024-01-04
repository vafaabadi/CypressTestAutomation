// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

//  -- This command will read data from json file and then select the required product
Cypress.Commands.add('PhoneShopSelectProduct', (ProductName) => { 

    cy.get('app-card > div > div > h4').each(($el, index, $list) => {
        if($el.text().includes(ProductName))
        {
            cy.get('app-card > div > div:nth-child(3) > button').eq(index).click()
        }
    })    
    

})




//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
