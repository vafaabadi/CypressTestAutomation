Feature: End to end ecommerce validation

    application regression test

    @accessdb
    Scenario: Access data from DB and use it in test case
    Given I connect to DB to retreive data
    When I pull data from DB to test automation code
    Then Assert the desired data was pulled in 

    @csvfile
    Scenario: Download, Parse CSV file and assert a specific color in the file
    Given I navigate to the web page
    When I download the CSV file
    Then Assert a specific color in the CSV file

    @regression
    Scenario: ecommerce products delivery
    Given I open ecommerce page
    When I add items to Cart
    When Validate the total prices
    Then Select the country, submit and verify Success! message 
    @smoke
    Scenario: Filling the form prior to Shop
    Given I open ecommerce page
    When I fill the form details
    Then Validate the form behaviour
    Then select the shop page
     

