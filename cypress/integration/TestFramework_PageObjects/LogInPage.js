class LogInPage
{
    getUsernameBox()
    {   
        return cy.get('input#username')
    }
    getPasswordBox()
    {
        return cy.get('input#password')
    }
    getSubmitBox()
    {
        return cy.get('button#submit')

    }
}
export default LogInPage;