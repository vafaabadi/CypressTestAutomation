// describe = test suite. multiple test cases can be in test suite.
// describe has two arguments: description and function without any arguments.


describe('First Test Suite', () => {
    // it = test case. 
    
    it('Green Kart', () => {

      // test case code must be wrapped under 'it'
      cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
      cy.get('.search-keyword').type("ca");
      cy.wait(2000);
      // 'should' is the assertion
      cy.get("div[class='product']").should('have.length',4); //adding :visible will only capture visible items on the screen:   cy.get("div[class='product']:visible").should('have.length',4);   or    cy.get('.product:visible').should('have.length',4); 
      //create Alias to simply the code
      cy.get('.products').as('productLocator');
      //Parent Child chaining
      cy.get('@productLocator').find('.product').should('have.length',4);
      cy.get('@productLocator').find('.product').eq(2).contains('ADD TO CART').click();
      
      cy.get('@productLocator').find('.product').each(($el, index, $list) => {
        const vegName = $el.find('h4.product-name').text()
        if(vegName.includes('Cashews'))
        {
          cy.wrap($el).find('button').click();
        }
      })

      //assert if logo text is correctly displayed
      cy.get('.brand').should('have.text','GREENKART');


      //how to use text() in Cypress
      cy.get('.brand').then(function(logoelement)
      {
        cy.log(logoelement.text()) // this log prints on Cypress.
      })


    })

    it('Green Kart', () => {

      // test case code must be wrapped under 'it'
      cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
      cy.get('.search-keyword').type("ca");
      cy.wait(2000);
      // 'should' is the assertion
      //cy.get("div[class='product']").should('have.length',4); //adding :visible will only capture visible items on the screen:   cy.get("div[class='product']:visible").should('have.length',4);   or    cy.get('.product:visible').should('have.length',4); 
      //create Alias to simply the code
      cy.get('.products').as('productLocator');
      //Parent Child chaining
      //cy.get('@productLocator').find('.product').should('have.length',4);
      //cy.get('@productLocator').find('.product').eq(2).contains('ADD TO CART').click();
      
      cy.get('@productLocator').find('.product').each(($el, index, $list) => {
        const vegName = $el.find('h4.product-name').text()
        if(vegName.includes('Cashews'))
        {
          cy.wrap($el).find('button').click();
        }
      })
      //click to view items in kart
      cy.get('.tada').click();
      // click on 'Proceed To Checkout'
      cy.contains('PROCEED TO CHECKOUT').click(); //cy.get('.cart-preview > .action-block > button').click();
      // click on 'Place Order'
      cy.contains('Place Order').click();
      //cy.get('[style="text-align: right; width: 100%; margin-top: 20px; margin-right: 10px;"] > :nth-child(14)').click();

    })

  })

/* Following line of code will trigger/open Cypress:
  PS C:\Users\44741\CypressTestAutomation> c:\Users\44741\CypressTestAutomation\node_modules\.bin\cypress open 
cypress exe file is under '.bin' under 'node_modules' under 'CypressTestAutomation'.  By copying the full path and adding 'open' at the end, the user is able to trigger/open Cypress from Terminal Powershell.
  */ 
/* To run test cases headless in Electron from Terminal
  PS C:\Users\44741\CypressTestAutomation> npx cypress run
*/
/* To run test cases with header in Electron from Terminal
  PS C:\Users\44741\CypressTestAutomation> npx cypress run --headed
*/ 
/* To run test cases headless in Chrome/Edge/Firefox from Terminal
  PS C:\Users\44741\CypressTestAutomation> npx cypress run --browser chrome
  PS C:\Users\44741\CypressTestAutomation> npx cypress run --browser edge
  PS C:\Users\44741\CypressTestAutomation> npx cypress run --browser firefox
*/

/* On Cypress Test Runner, go to Settings, Project Settings, scroll down and pick any defaults settings & change and paste it in cypress.config.js on VS Code to modify that setting.
*/

/* Create CSS Selector:
id -> #idname
classname -> .classname
if there are multiple classnames, then use tagname as follow:
classname -> tagname.classname
for any elements -> tagname[attribute=value]   for example:   input[type='search']
for traverse from parent to child use 'space'. In Selenium it is '/'. FOr example for form/input in selenium, it is in CYpress: form input
*/

/* only get the visible items on the screen
adding :visible will only capture visible items on the screen:   cy.get("div[class='product']:visible").should('have.length',4);   or    cy.get('.product:visible').should('have.length',4); 
*/

/* Parent to Child chaining: 
cy.get('.products').find('.product').should('have.length',4);
// 'eq' is the index in the list.
cy.get('.products').find('.product').eq(1).contains('ADD TO CART').click();
*/

/* 'each' will iterate through an array
*/

/* Each iteration loop:
      // grabs items "products", then finds veggies "products", for each items in the array/listed, will grab the name in text format and if the name contains Cashews, will click on "Add To Cart" to add Cashew to the shopping basket.
      cy.get('.products').find('.product').each(($el, index, $list) => {
        const vegName = $el.find('h4.product-name').text()
        if(vegName.includes('Cashews'))
        {
          cy.wrap($el).find('button').click();
        }
      })

*/

/* .then() keeps Cypress waiting until the code line is completed and then it moves to next line
*/

/* How to get element's text contents?
cy.get('div').should('have.text', 'ThisIsTextHere')
*/

/* alias to simply the code by adding .as('NameGiven')
cy.get('.products').as('productLocator');
cy.get('@productLocator').find('.product').should('have.length',4);
*/

/* console.log() will print the output in browser console on DeveloperTool (Inspect)
console.log('sf')
cy.log('') will print on Cypress log where he shows each line of code it runs.
*/

/* to keep code executed in the order written, print console.log() in the follwoing order:
cy.get('@productLocator').find('.product').eq(2).contains('ADD TO CART').click().then(function()
{
  console.log('sf')
})
*/






