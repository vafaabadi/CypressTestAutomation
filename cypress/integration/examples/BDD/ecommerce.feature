Feature: End to end ecommerce validation

    application regression test

    Scenario: ecommerce products delivery
    Given I open ecommerce page
    When I add items to Cart
    When Validate the total prices
    Then Select the country, submit and verify Success! message 

    Scenario: Filling the form prior to Shop
    Given I open ecommerce page
    When I fill the form details
    Then Validate the form behaviour
    Then select the shop page