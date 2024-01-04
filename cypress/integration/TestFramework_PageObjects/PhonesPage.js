class PhonesPage
{
    getCheckOutBttn()
    {
        return cy.get('#navbarResponsive > .navbar-nav > .nav-item > .nav-link')
    }
}
export default PhonesPage;