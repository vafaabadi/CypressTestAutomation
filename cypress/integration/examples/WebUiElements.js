// describe = test suite. multiple test cases can be in test suite.
// describe has two arguments: description and function without any arguments.
/// <reference types="Cypress" />
/// <reference types="cypress-iframe" />
import 'cypress-iframe'

describe('Sample code of how Cypress interacts with Web UI Elements', ()=>{

    describe('suite section - where beforEach runs before a specific set of test cases',()=>{
        
        beforeEach('login',()=>{
            //repear for every test
        })
        it('first test',()=>{
            // test code goes here.
        })
        
    })

    it('first test',()=>{
        // test code goes here.

        // Cypress find web elements in three ways: cy.get(), .find(), cy.contains().
        cy.get()  //find elements 'globally' on the page 
        cy.contains().find() //find 'child' elements 
        cy.get().find() //find 'child' elements 
        cy.contains() //find HTML text and by 'text'.
        cy.contains() //looks for the match and if there are more than one match, Cypress finds the first one. For example, there are two sign in buttons on the screen and we want to select the second one. we can use two attributes: cy.contains('[status="warning"]','Sign in')
        cy.contains('[status="warning"]','Sign in') //Sign in is a text that is common among two buttons however the second button has unique attribute [status="warning"]. the combination will only find the second Sign In button.
        cy.contains('','').find() //good practice
        cy.contains('','').contains('') //good practice. first finds the parent and then inside the parent finds the children elements
        cy.contains('','').get('') //BAD practice. get() still looks globally on the web page.
        
        // Cypress CHAINS - move up or down from child to parents
        cy.get('#inputEmail3')
            .parents('form') //form is tag name
            .find('button')  // find child by text
            .should('contain','Sing in') //assert by text
            .parents('form')        //form is tag name
            .find('nb-checkbox') //nb-checkbox is tag name
            .click()        // do not chain after performing Action becuase the action can change the structure of the page

        // Cypress Alias - Asynchronous - Use alias if you need to use a line of code multiple times for different web elements. By using "alias" we can use a line of code multiple times for different elements
        cy.contains('nb-card','Using the Grid form').as('GridForm')
        cy.get('@GridForm').find('[for="inputEmail"]').should('contain', 'Email')
        cy.get('@GridForm').find('[for="inputPassword"]').should('contain','Password')

        // Cypress .then() method - Asynchronous - Alias or .then() do thesame job. .then() is JQuery method. Alias is Cypress method.
        cy.contains('nb-card','Using the Grid form').then(usingTheGridForm => {         //this is JQuery type of method. So, you need to .wrap() it.
            cy.wrap(usingTheGridForm).find('[for="inputEmail1"]').should('contain','Email')
            cy.wrap(usingTheGridForm).find('[for="inputPassword"]').should('contain','Password')
        })

        // extract text and assert text by using JQuery method .then()
        cy.get('[for="exampleInputEmail"]').then( label => {
            const labelText = label.text()
            expect(labelText).to.equal('Email Address')
        })

        // extract text and assert text by using Cypress method .invoke()    OR   follow the next line of code
        cy.get('[for="exampleInputEmail"]').invoke('text').then( text => {
            expect(text).to.equal('Email Address')
        })

        // extract text and assert text by using Cypress method .invoke()
        cy.get('[for="exampleInputEmail"]').invoke('text').should('contain','Email Address') // or I could also add .as() to use the alias later in the code if needed
        cy.get('[for="exampleInputEmail"]').invoke('text').as('labelText').should('contain','Email Address') // or I could also add .as() to use the alias later in the code if needed

        // extract text and assert text by using Cypress method .invoke()
        cy.get('[for="exampleInputEmail"]').invoke('attr','class').then( classValue => {
            expect(classValue).to.equal('label')
        })

        // Radio buttons
        cy.contains('nb-card','Using the Grid').find('[type="radio"]').then( radioButtons => {
            cy.wrap(radioButtons).eq(0).check({force: true}).should('be.checked')       // use {force: true}  when the button is visually disable (appears on the screen but to Cypress is invisible)
            cy.wrap(radioButtons).eq(1).check({force: true})
            cy.wrap(radioButtons).eq(0).should('not.be.checked')
            cy.wrap(radioButtons).eq(2).should('be.disabled')
        })

        cy.get('[type="checkbox"]').check({force: true})    // check() will check the boxes that are not already checked. if any is already checked, check() will leave it checked
        cy.get('[type="checkbox"]').uncheck({force: true})  // uncheck() will uncheck any boxes that is already checked. If any boxes are unchecked, uncheck() will leave it unchecked.
        
        cy.get('[type="checkbox"]').eq(0).click({force: true})  // clicks on the first checkbox


        //---------------------
        // Assertion of date picker from Calendar - Use JS date object
        function selectDatFromCurrent(day){
            let date = new Date()
            date.setDate(date.getDate() + day)
            let futureDay = date.getDate()
            let futureMonth = date.toLocaleDateString('en-US', {month: 'short'})
            let futureYear = date.getFullYear()
            let dateToAssert = `${futureMonth} ${futureDay}, ${futureYear}`
            cy.get('nb-calendar-navigation').invoke('atte', 'ng-reflect-date').then( dateAttribute => {
                if(!dateAttribute.includes(futureMonth) || !dateAttribute.includes(futureYear)){
                    cy.get('[data-name="chevron-right"]').click()
                    selectDatFromCurrent(day)
                } else{
                    cy.get('.day-cell').not('.bounding-month').contains(futureDay).click()  //.get() gets all days of the month. .not() excludes days from previous month. .contains() pcicks text/day
                }
            })
            return dateToAssert
        }
        cy.contains('nb-card', 'Common DatePicker').find('input').then( input => {
            cy.wrap(input).click()
            const dateToAssert = selectDatFromCurrent(5) 
            cy.get('input').invoke('prop','value').should('contain', dateToAssert)
            cy.get('input').should('have.value', dateToAssert)
        })
        //---------------------

        // Lists and dropdowns
        cy.get('nav nb-select').click()
        cy.get('.options-list').contains('Dark').click()
        cy.get('nav nb-select').should('contain','Dark')
        cy.get('nav nb-select').then( dropdown => {
            cy.wrap(dropdown).click()
            cy.get('.options-list nb-option').each((listItem, index) =>{
                const itemText = listItem.text().trim()
                cy.wrap(listItem).click()
                cy.wrap(dropDown).should('contain', itemText)
                if(index < 3){
                    cy.wrap(dropDown).click()
                }
            })
        })


        // Web tables - table - thead - tbody - trow - td=tcolumn
        // Get the row by text
        cy.get('tbody').contains('tr', 'Larry').then( tableRow =>{
            cy.wrap(tableRow).find('.nb-edit').click()
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('35')
            cy.wrap(tableRow).find('.nb-checkmark').click()
            cy.wrap(tableRow).find('td').eq(6).should('contain','35')
        })

        // Get the row by index
        cy.get('thead').find('.nb-plus').click()
        cy.get('thead').find('tr').eq(2).then (tableRow => {
            cy.wrap(tableRow).find('[placeholder="First Name"]').type("John")
            cy.wrap(tableRow).find('[placeholder="Last Name"]').type("Smith")
            cy.wrap(tableRow).find('.nb-checkmark').click()
        })
        cy.get('tbody tr').first().find('td').then(tableColumns => {
            cy.wrap(tableColumns).eq(2).should('contain', 'John')
            cy.wrap(tableColumns).eq(3).should('contain', 'Smith')
        })

        // Get each row validation
        const age = [20, 30, 40, 200]
        cy.wrap(age).each( age => {
            cy.get('thead [placeholder="Age"]').clear().type(age)
            cy.wait(1000)
            cy.get('tbody tr').each( tableRow => {
                if(age==200){
                    cy.wrap(tableRow).should('contain', 'No data found')
                } else {
                    cy.wrap(tableRow).find('td').eq(6).should('contain', age)
                }
            })
        })
        
        //Tooltips
        cy.contains('nb-card', 'Colored Tooltips').contains('Default').click()
        cy.get('nb-tooltip').should('contain', 'This is a tooltip')

        //Promp popup / window popup - click confirm to delete
        const stub = cy.stub()
        cy.on('window:confirm', stub)
        cy.contains('tbody tr').first().find('.nb-trash').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
        })
        //Promp popup / window popup - click cancel
        cy.get('tbody tr').first().find('.nb-trash').click()
        cy.on('window:confirm', () => false) 

        // Assertions
        .should()
        .and()
        .expect()
        //jQuery has many assertions too.
      

        

    })



})