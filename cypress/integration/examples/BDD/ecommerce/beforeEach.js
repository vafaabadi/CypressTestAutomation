beforeEach(()=>
    {
        cy.fixture('TestFramework_DataDriven').then(function(data)
        {
            globalThis.data = data
        })
    })


