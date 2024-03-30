Feature: End to end ecommerce validation

    application regression test



    

    @ExcelFile
    Scenario: Download, Parse, read Excel file and assert a specific cell in the file
    Given I navigate to the web page - Excel
    When I download the Excel file
    Then Assert a specific cell in the Excel file

    @DbIntegration
    Scenario: Read credentials from DB and use it to log into web site
    Given I visit the web site I want to log into
    When I read credentials from DB and provide them as username and password
    Then Assert I logged in successfully.

    @LogInCommandLine
    Scenario: Feed password as env variable from command line 
    Given I visit the web site I want to log into
    When I read password from command line as env variable
    Then Assert I logged in successfully.
    
    @LogInEncrypted
    Scenario: Pass encrypted password to the test case
    Given I visit the web site I want to log into
    When I read password from command line as env variable
    Then Assert I logged in successfully.


    

    @OnlinePurchase
    Scenario: ecommerce products delivery
    Given I open ecommerce page
    When I add items to Cart
    When Validate the total prices
    Then Select the country, submit and verify Success! message 
    
    
     
 
 