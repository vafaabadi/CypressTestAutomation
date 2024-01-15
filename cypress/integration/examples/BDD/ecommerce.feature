Feature: End to end ecommerce validation

    application regression test

    @AAA
    Scenario: Download, Parse, read Excel file and assert a specific cell in the file
    Given I navigate to the web page - Excel
    When I download the Excel file
    Then Assert a specific cell in the Excel file

    @BBB
    Scenario: Read credentials from DB and use it to log into web site
    Given I visit the web site I want to log into
    When I read credentials from DB and provide them as username and password
    Then Assert I logged in successfully. 

    @CCC
    Scenario: Download, Parse, read CSV file and assert a specific color in the file
    Given I navigate to the web page
    When I download the CSV file
    Then Assert a specific color in the CSV file

    @DDD
    Scenario: ecommerce products delivery
    Given I open ecommerce page
    When I add items to Cart
    When Validate the total prices
    Then Select the country, submit and verify Success! message 
    
    @EEE
    Scenario: Filling the form prior to Shop
    Given I open ecommerce page
    When I fill the form details
    Then Validate the form behaviour
    Then select the shop page
     

