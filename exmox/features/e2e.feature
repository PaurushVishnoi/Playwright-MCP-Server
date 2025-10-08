Feature: Leapsome e2e tests

    Validate End to End scenarios from Leapsome

    @Login @JIRA-2701
    Scenario: Logging into Sauce Labs with incorrect credentials 
        Given I am on login page for Sauce Labs
        When I enter incorrect credentials 
        Then I see error message

    @Login
    Scenario: Logging into Sauce Labs with correct credentials
        Given I am on login page for Sauce Labs
        When I enter correct credentials 
        Then I see Sauce Labs product page

    @Cart
    Scenario: Verify single product can be added to cart
        Given I am on login page for Sauce Labs
        And I enter correct credentials
        And I am on the products page
        When I add "Sauce Labs Backpack" to the cart
        And I go to the cart section
        Then I see "Sauce Labs Backpack" in the cart
        And the cart badge shows "1" item