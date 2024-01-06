// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************


const neatCSV = require('neat-csv')



//  -- This command will read data from json file and then select the required product
Cypress.Commands.add('PhoneShopSelectProduct', (ProductName) => { 

    cy.get('app-card > div > div > h4').each(($el, index, $list) => {
        if($el.text().includes(ProductName))
        {
            cy.get('app-card > div > div:nth-child(3) > button').eq(index).click()
        }
    })    
    

})


Cypress.Commands.add('ParseCSVFileColor', (RelativePath,desiredHEX,desiredRGB)=> 
{
    // pick the location and the file dynamically
    cy.readFile(Cypress.config("fileServerFolder")+RelativePath)
    .then(async function(text)      // added async here for await (one line down) doesnt throw error message
    {
        const csv = await neatCSV(text)   // now the constact csv is Javascript object
        console.log(csv)    // run the test case on local cypress test runner and check console on the browser. the csv content will be listed as JS objects.
        const colorHEX = csv[globalThis.data.colorrowincsvfile].HEX
        expect(desiredHEX).to.equal(colorHEX)
        console.log(colorHEX)
        console.log(desiredHEX)
        const colorRGB = csv[globalThis.data.colorrowincsvfile].RGB
        expect(desiredRGB).to.equal(colorRGB)
        console.log(colorRGB)
        console.log(desiredRGB)
        //const TST = csv[1]["Name"]   // If there is space in the js object (for example the js object is Product name), put the object in quotation marks "" and then write it this way:    csv[1]["Product name"]
        //expect('Silver').to.equal(TST)
    }
    )
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
