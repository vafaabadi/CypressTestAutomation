// describe = test suite. multiple test cases can be in test suite.
// describe has two arguments: description and function without any arguments.
/// <reference types="Cypress" />
/// <reference types="cypress-iframe" />
import 'cypress-iframe'

describe('Web Controls UI', () => {
    // it = test case. 
    
    it('iFrameHandling', () => {
      
      // test case code must be wrapped under 'it'
      cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
      // Jumping into iFrame
      cy.frameLoaded("#courses-iframe")
      // driving inside iframe. find the web element and carry on. Find title Mentorship
      cy.iframe().find("a[href*='mentorship']").eq(0).click();
      // assert there are two titles, Bronze and Platinum
      cy.wait(3000)
      cy.iframe().find("h1[class*='pricing-title']").as('MentorshipTitles') 
      cy.iframe().get('@MentorshipTitles').should('have.length',2)
      // assert the first title text is Bronze
      cy.iframe().get('@MentorshipTitles').eq(0).should('have.text','BRONZE')
      // assert the second title text is Platinum
      cy.iframe().get('@MentorshipTitles').eq(1).should('have.text','PLATINUM')

    })


    it('MouseHover_InvisibleList', () => {

      // test case code must be wrapped under 'it'
      cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
      // .invoke('show')  will display all the hidden elements at that web location.
      // 'show' must be applied to the immiediate parent of the element we want to show o nthe web page.
      cy.get('body > div:nth-child(6) > div > fieldset > div > div').invoke('show')
      cy.contains('Top').click()
      cy.url().should('include','top')

      //OR THE FOLLOWING CODE
      cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
      cy.contains('Top').click({force: true}) // {force: true} = forcefully click on the element even if it's not visible/displayed
      cy.url().should('include','top')

    })


    it('WebTables', () => {
      // test case code must be wrapped under 'it'
      cy.visit("https://rahulshettyacademy.com/AutomationPractice/");

      // to pick a child in CSS, we need to add    :nth-child()
      cy.get('tr > td:nth-child(2)').each(($el, index, $list) => {
        // grab name of the courses
        const courseName = $el.text()
        if(courseName.includes("Python"))
        {
          // .eq(index) will say to Cypress where in the column you are.  .next() will move to the next sibling in HTML (next td child). 
          cy.get('tr > td:nth-child(2)').eq(index).next().should('have.text','25')
        }
      })
      // OR THE FOLLOWING LOOP (assert the same as above)  
      cy.get('tr > td:nth-child(2)').each(($el, index, $list) => {
        // grab name of the courses
        const courseName = $el.text()
        if(courseName.includes("Python"))
        {
          // .eq(index) will say to Cypress where in the column you are.  .next() will move to the next sibling in HTML (next td child). 
          cy.get('tr > td:nth-child(2)').eq(index).next().then(function(price)
          {
            const priceText = price.text()
            expect(priceText).to.equal('25')
          })
        }
      })

    })


    it('ChildWindow/SecondTab', () => {
      // test case code must be wrapped under 'it'
      cy.visit("https://rahulshettyacademy.com/AutomationPractice/"); 
      // Cypress cannot handle child window. We need to open the child window on the main window (not as a seperate window)
      // By looking at the HTML on the button that opens a new tab, we see it has attribute target=blank. target=blank opens child window
      // By using jQuery, we can alter the attribute target=blank to avoid opening the new page as child window.
      // .invoke() = will remove/disable the attribute 
      cy.get('#opentab').invoke('removeAttr','target').click()
      // we need to change domain for Cypress to nagivate through. Also, everything from here needs to be wrapped inside the new origin. If not, then it will run on the original/first origin.
      cy.origin('https://www.qaclickacademy.com/',()=>
      {
        // click on 'About Us'
        cy.get('#navbarSupportedContent > ul > li:nth-child(4) > a').click()
        // assert text that the user landed on 'About Us' page
        cy.get('#about-page > div > div.row > div.col-lg-5 > div.section-title.mt-50 > h2').should('contain','QAClick')
      })
      
    })

    it('PopUp/Alert', () => {
      // test case code must be wrapped under 'it'
      cy.visit("https://rahulshettyacademy.com/AutomationPractice/"); 
      // click on button 'Alert' to oepn the web pop up
      cy.get('#alertbtn').click()
      // assert the text on the alert/popup. WINDOW.ALERT . This is cypress event. development part.
      // .on('window:alert') = focuses on the alert popup. .on('window:alert'),(str) = grabs the text from the alert/popup. expect(str).to.equal('') = is assertion for strings in development.
      cy.on('window:alert',(str) => 
      {
        expect(str).to.equal('Hello , share this practice page and share your knowledge')
      })
      // click on button 'Confirm' to open the web pop up (OK/Cancel)
      cy.get('#confirmbtn').click()
      // assert the text on the alert/popup. WINDOW.CONFIRM . This is cypress event. development part.
      // .on('window:confirm') = focuses on the confirm popup. .on('window:confirm'),(str) = grabs the text from the confirm popup. expect(str).to.equal('') = is assertion for strings in development.
      cy.on('window:confirm',(str) => 
      {
        expect(str).to.equal('Hello , Are you sure you want to confirm?')
      })


    })

    it('RadioButton', () => {
      // test case code must be wrapped under 'it'
      cy.visit("https://rahulshettyacademy.com/AutomationPractice/"); 
      // get attribute of second radio button, check the box, assert it is checked, assert the value is 'radio2'     
      cy.get('[for="radio2"] > .radioButton').check().should('be.checked').and('have.value','radio2')
    })

    it('VisibleInvisibleElements', () => {
      // test case code must be wrapped under 'it'
      cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
      // assert the text box is visible on the screen
      cy.get('#displayed-text').should('be.visible')
      // click on button 'hide' to hide the text box
      cy.get('#hide-textbox').click()
      // assert the text box is not visible on the screen
      cy.get('#displayed-text').should('not.be.visible')
      // click on button 'show' to appear the text box
      cy.get('#show-textbox').click()
      // assert the text box is visible on the screen
      cy.get('#displayed-text').should('be.visible')
    })

    it('DynamicDropdown', () => {
      // test case code must be wrapped under 'it'
      cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
      // .get('#dropdown-class-example') = opens the static dropdown. 
      // .select('option2') = clicks on the value attribute that is 'option2'. Also, the dropdown option can be selected by using the text 'Option2'. 
      // .should('have.value','option2') = asserts that selected value attribute is option2.
      cy.get('#autocomplete').type('fr')
      cy.get('ul[id="ui-id-1"] li div').each(($el, index, $list) => {

        if($el.text()==="French Southern Territories")
        {
          $el.click()
        }
      })
      cy.get('#autocomplete').should('have.value','French Southern Territories')
    })

    it('Checkboxes', () => {
      // test case code must be wrapped under 'it'
      cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
      // .check() does check/tick a checkbox.     .check().should('be.checked')   assert if the checkbox is checked or not.
      // .check().should('b.checked').and('have.value', 'option1') = check a checkbox. assert it is checked. assert the value is ... . have.value = in HTML = value=option1
      cy.get('#checkBoxOption1').check().should('be.checked').and('have.value','option1');
      // uncheck the checked box above and assert it is unchecked successfully
      cy.get('#checkBoxOption1').uncheck().should('not.be.checked').and('have.value','option1');
      // assert the second checkbox is not checked
      cy.get('#checkBoxOption2').should('not.be.checked').and('have.value','option2');
      // check multiple checkboxes - common property across all three checkboxes is 'type'. value = option2 and value = option3
      cy.get('input[type="checkbox"]').check(['option2','option3']).should('be.checked');   // I think only can assert option2 is checked. (further investigation).
    })

    it('StaticDropdown', () => {
      // test case code must be wrapped under 'it'
      cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
      // .get('#dropdown-class-example') = opens the static dropdown. 
      // .select('option2') = clicks on the value attribute that is 'option2'. Also, the dropdown option can be selected by using the text 'Option2'. 
      // .should('have.value','option2') = asserts that selected value attribute is option2.
      cy.get('#dropdown-class-example').select('option2').should('have.value','option2');
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

/*
How to select a checkbox. There is a method in Cypress called 'check': cy.get('').check()
To assert if the checkbox is checked or not:                           cy.get('').check().should('be.checked')
.check().should('b.checked').and('have.value', 'option1') =            check a checkbox. assert it is checked. assert the value is option1 . value=option1 in HTML

*/


