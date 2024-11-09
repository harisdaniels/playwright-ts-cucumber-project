Feature: User Authentication tests

  Background:
    Given user navigates to the login page

  @login @login-success
  Scenario: Login should be success
    When user enter the username as "haristest"
    And user enter the password as "Password-123"
    When user click on the login button
    Then login should be success

  @login @login-failed
  Scenario: Login should not be success
    When user enter the username as "koushik"
    And user enter the password as "Passkoushik"
    When user click on the login button
    But login should fail