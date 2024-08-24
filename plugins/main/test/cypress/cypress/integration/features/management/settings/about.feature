Feature: Cyb3rhq version information

  As a cyb3rhq user
  I want to check the about information
  in order to see information about the system

  @about @actions
  Scenario: Check Cyb3rhq version information
    Given The cyb3rhq admin user is logged
    When The user navigates to About settings
    Then The Cyb3rhq information is displayed
