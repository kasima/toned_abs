Feature: I can run the experiment a bajillion times

@javascript
Scenario: Run the experiment
  Given I run the experiment 1000 times
  Then I should be done