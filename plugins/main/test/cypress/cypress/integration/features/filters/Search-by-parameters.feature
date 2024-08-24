Feature: Search by parameters

    As a Cyb3rhq user
    I want to pin a filter
    in order to aplly it across the modules
    Background:
        Given The cyb3rhq admin user is logged
        And The sample data is loaded

    Scenario Outline: Search by parameters with AND
        When The user goes to <Module Name>
        And The user types a particular search <key> on the search bar
        Then The query is accepted and the results should be displayed
        Examples:
            | Module Name          | key                                              |
            | Security Events      | cluster.name : "cyb3rhq" and rule.level : "3"      |
            | Integrity Monitoring | cluster.name : "cyb3rhq" and agent.id : "001"      |
            | NIST                 | cluster.name : "cyb3rhq" and agent.name : "Ubuntu" |
            | TSC                  | cluster.name : "cyb3rhq" and agent.name : "Ubuntu" |
            | PCIDSS               | cluster.name : "cyb3rhq" and agent.name : "Ubuntu" |

    Scenario Outline: Search by parameters with OR
        When The user goes to <Module Name>
        And The user types a particular search <key> on the search bar
        Then The query is accepted and the results should be displayed
        Examples:
            | Module Name          | key                                             |
            | Security Events      | cluster.name : "cyb3rhq" or rule.level : "3"      |
            | Integrity Monitoring | cluster.name : "cyb3rhq" or agent.id : "001"      |
            | NIST                 | cluster.name : "cyb3rhq" or agent.name : "Ubuntu" |
            | TSC                  | cluster.name : "cyb3rhq" or agent.name : "Ubuntu" |
            | PCIDSS               | cluster.name : "cyb3rhq" or agent.name : "Ubuntu" |