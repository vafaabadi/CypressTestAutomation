Feature: Few basic test cases to check the functionality of BDD

    Paraller test execution - basic test cases



    @CsvFile
    Scenario: Download, Parse, read CSV file and assert a specific color in the file
    Given I navigate to the web page
    When I download the CSV file
    Then Assert a specific color in the CSV file

    @FormValidation
    Scenario: Filling the form prior to Shop
    Given I open ecommerce page
    When I fill the form details
    Then Validate the form behaviour
    Then select the shop page