Feature: Add products to cart

  @add-to-cart
	Scenario Outline: Authenticated Users - Add to cart
    Given user navigates to the login page
    When user enter the username as "<username>"
    And user enter the password as "<password>"
    And user click on the login button
    When user search for a "<book>"
    And user add the book to the cart
    Then the cart badge should get updated

    Examples:
      | username 	| password  	 | book        		  |
      | haristest | Password-123 | Roomies     		  |
      | testhrs   | Password-123 | The Simple Wild  |

  @auth @add-to-cart
  Scenario: Authenticated Users - Add to cart using admin
    Given user navigates to the landing page
    When user search for a "A Court of Mist and Fury"
    And user add the book to the cart
    Then the cart badge should get updated

  @auth @add-to-cart
  Scenario: Authenticated Users - Add to cart using staff
    Given user navigates to the landing page
    When user search for a "All of Us with Wings"
    And user add the book to the cart
    Then the cart badge should get updated