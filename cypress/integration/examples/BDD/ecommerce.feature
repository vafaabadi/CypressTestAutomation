Feature: End to end ecommerce validation

    application regression test

    Scenario: ecommerce products delivery
    Given I open ecommerce page
    When I add items to Cart
    And Validate the total prices
    Then Select the country, submit and verify Success! message 