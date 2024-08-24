Feature: Should List Rules And Show The Pager

  As a cyb3rhq user
  i want to see the Rules pages
  in order to manage them
  
  @rules
  Scenario: Should List Rules And Show The Pager
    Given The cyb3rhq admin user is logged
    When The user navigates to rules
    Then The user should see the rules
  
  @rules
  Scenario: Should List Custom Rules And Show The Pager
    Given The cyb3rhq admin user is logged
    When The user navigates to rules
    And The user clicks the custom rules button
    Then The user should see the rules
