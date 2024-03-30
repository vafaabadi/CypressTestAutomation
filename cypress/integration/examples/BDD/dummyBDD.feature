Feature: Dummy BDD test cases for parallel test execution

    Parallel test execution 



    @Dummy001
    Scenario: test case Dummy 001 
    Given I navigate to my personal GitHub Account
    When I visit CypressTestAutomation repository
    Then Assert name of the repository is CypressTestAutomation

    @Dummy002
    Scenario: test case Dummy 002
    Given Visit Github
    When Click on pinned repository
    Then Assert you clicked on C-Sharp Selenium Repository

    @Xpath
    Scenario: X-path extension works
    Given I navigate to a practice web site
    When I use multiple x-path to navigate the web site
    Then Assert the test case doesnt fail using x-path.