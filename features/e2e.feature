Feature: MCP e2e tests

    Validate End to End scenarios from MCP

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

