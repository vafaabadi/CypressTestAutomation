// describe = test suite. multiple test cases can be in test suite.
// describe has two arguments: description and function without any arguments.
/// <reference types="Cypress" />
/// <reference types="cypress-iframe" />
import 'cypress-iframe'

describe('WOrking with APIs', ()=>{

    it('JSON objects',()=>{

        const simpleObjects = { "key": "value", "key2": "value2" }

        const simpleArrayOfValues = [ "one", "two", "three" ]   // this is array of values and starts by index 0.

        const arrayOfObjects = [{"key": "value"}, {"key2": "value2"}, {"key3": "value3"}]    // array of objects

        const typesOfData = { "string": "this is a string", "number": 10 }

        const mix = {
            "Firstname": "Vafa",
            "Surname": "Abadi",
            "Age": 35,
            "Studnets": 
            [
                {
                    "firstName": "Sara",
                    "surName": "Johnson"
                },
                {
                    "firstName": "Bruce",
                    "surName": "William"
                }
            ]
        }

        console.log(simpleObjects.key2)
        console.log(simpleObjects["key2"])      // same of the line above

        //value of array
        console.log(simpleArrayOfValues[1])     // second value is printed
        console.log(arrayOfObjects[2].key3)     // last value returned

        console.log(mix.Studnets[0].surName)
    })

    it('First API test, intercept() ', ()=> {
        cy.visit(Cypress.env('baseURLAPIs'))
        cy.LoginToAPIapplication()          // custom command to log in
        
        // intercept is going above the code we are going to execute
        cy.intercept('POST', 'https://conduit-api.bondaracademy.com/api/articles/').as('postArticles')
        
        //create article and assert the response
        cy.contains('New Article').click()
        cy.get('[placeholder="Article Title"]').type('jjhghgh')
        cy.get('[placeholder="What\'s this article about?"]').type('What is article about')
        cy.get('fieldset').find('textarea').type('This is the body')
        cy.get('.btn-primary').click()

        cy.wait('@postArticles')
        cy.get('@postArticles').then ( xhr => {
            console.log(xhr)
            expect(xhr.response.statusCode).to.equal(201)
            expect(xhr.request.body.article.body).to.equal('This is the body')
            expect(xhr.response.body.article.description).to.equal('What is article about')
        })
    })


    it('Verify popular tags are displayed - stubbed', () => {
            // First need to intercept before calling the application 
            cy.intercept('GET', 'https://conduit-api.bondaracademy.com/api/tags', {fixture: 'tags.json'})
            cy.visit(Cypress.env('baseURLAPIs'))
            cy.LoginToAPIapplication()          // custom command to log in
            // check those tags are actually displayed
            cy.get('.tag-list').should('contain', 'cypress').and('contain', 'automation').and('contain', 'testing') 
    })

    it('Verify global feed likes count', () => {
        cy.intercept('GET', 'https://conduit-api.bondaracademy.com/api/articles/feed*', '{"articles":[],"articlesCount":0}')
        cy.intercept('GET', 'https://conduit-api.bondaracademy.com/api/articles*', {fixture: 'articles.json'})
        cy.visit(Cypress.env('baseURLAPIs'))
        cy.LoginToAPIapplication()          // custom command to log in
        cy.get('app-article-list').find('button').then( favourites => {
            //cy.wrap(favourites).eq(0).should('have.text', ' 1 ')
            expect(favourites[0]).to.contain(1)
            //cy.wrap(favourites).eq(1).should('have.text', ' 5 ')
            expect(favourites[1]).to.contain(5)
        })

        cy.fixture('articles.json').then(file => {
            const articleLink = file.articles[1].slug
            file.articles[1].favouritesCount = 6
            cy.intercept('POST', 'https://conduit-api.bondaracademy.com/api/articles/'+articleLink+'/favorite', file)
        })
        cy.get('app-favorite-button').eq(1).click().should('contain', '6')
    })
    
    it('Verify popular tags are displayed - stubbed', () => {
        // First need to intercept before calling the application 
        cy.intercept({method: 'GET', path: 'tags'}, {fixture: 'tags.json'})
        cy.visit(Cypress.env('baseURLAPIs'))
        cy.LoginToAPIapplication()          // custom command to log in
        // check those tags are actually displayed
        cy.get('.tag-list').should('contain', 'cypress').and('contain', 'automation').and('contain', 'testing') 
    })

    it('intercepting and modifying the request and response', ()=> {
        cy.visit(Cypress.env('baseURLAPIs'))
        cy.LoginToAPIapplication()          // custom command to log in
        
        // intercept is going above the code we are going to execute
        cy.intercept('POST', '**/articles/', (req) =>{
            req.body.article.description = "What is article about 2"    //intercept and modify the response  
        }).as('postArticles')
        
        //create article and assert the response
        cy.contains('New Article').click()
        cy.get('[placeholder="Article Title"]').type('dfgdfgdfggfg')
        cy.get('[placeholder="What\'s this article about?"]').type('What is article about')
        cy.get('fieldset').find('textarea').type('This is the body')
        cy.get('.btn-primary').click()

        cy.wait('@postArticles')
        cy.get('@postArticles').then ( xhr => {
            console.log(xhr)
            expect(xhr.response.statusCode).to.equal(201)
            expect(xhr.request.body.article.body).to.equal('This is the body')
            expect(xhr.response.body.article.description).to.equal('What is article about 2')
        })
    })

    it.only('Delete article created by APIs', () => {
        cy.LoginToAPIapplication()
        //const logInCredentials = {user: {email: "cytester", password: "ABCD12345"}} 
        const bodyRequest = {article: {title: "Koore", description: "Koore", body: "Koore", tagList: []}}
        
        cy.get('@token').then(token =>{
            
            
            cy.request({
            url: 'https://conduit-api.bondaracademy.com/api/articles/',
            headers: {'Authorization': 'Token '+token},
            method: 'POST',
            body:bodyRequest
            }).then( response => {
            expect(response.status).to.equal(201)
            })

           // cy.visit(Cypress.env('baseURLAPIs'))
          //  cy.LoginToAPIapplication()          // custom command to log in
            cy.get('app-article-list div a').contains('Koore').click()
            cy.wait(1000)
            cy.get('button').eq(1).click()
        
            cy.request({
            url: 'https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0',
            headers: {'Authorization': 'Token '+token},
            method: 'GET'
            }).its('body').then(body=>{
                expect(body.articles[0].title).not.to.equal('Koore')
                
            })
        })
    })






})