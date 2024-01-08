beforeEach(()=>
    {
        cy.fixture('TestFramework_DataDriven').then(function(data)
        {
            globalThis.data = data
        })
        cy.sqlServer("select * from Credentials").then(function(result)
        {
            globalThis.cred = result
        })
    })


