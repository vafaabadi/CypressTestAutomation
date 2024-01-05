beforeEach(function()
    {
        cy.fixture('TestFramework_DataDriven').then(function(data)
        {
            this.data = data
        })
    })