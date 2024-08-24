Feature: Should List Rules filtered by Level be shown in the list of rules

  As a cyb3rhq user
  i want to see the Rules pages
  in order to manage them

    @rules
    Scenario Outline: Filter Rule By Level
        Given The cyb3rhq admin user is logged
        When The user navigates to rules
        And The user search a rule by Level <condition>
        Then The filter label is displayed on the filter bar with the correct <condition>
        And The user can see the rules that match with the <condition>
        Examples:
        | condition |
        |    2      |