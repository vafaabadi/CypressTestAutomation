class HomePage 

{

getFirstnameBox()
{
    return cy.get("div:nth-child(1) > input") // locates firstname box on the home page https://www.rahulshettyacademy.com/angularpractice/
}
getTwoWayDataBindingBox()
{
    return cy.get("input[class*='ng-pristine']:nth-child(1)") // locates Two-way data binding example box
}
getGendreDropdownBox()
{
    return cy.get('#exampleFormControlSelect1') // locates the gendre dropdwon down box
}
getEntrepeunerRadioBttn()
{
    return cy.get('#inlineRadio3') // locates the disabled Entrepenur radio button
}
getShopbttn()
{
    return cy.get(':nth-child(2) > .nav-link') // locate the Shop button on the top of the page
}


}

export default HomePage;