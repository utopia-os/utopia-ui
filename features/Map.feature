Feature: Map
  As a user
  I want to have the leaflet map and its control elements available
  To be able to interact with the map

  Scenario: The map and its control elements are available
    Given I am on the map page
    Then the map component should be present
    And the search input control should be present
    And the geo location control should be present
    And the layers control should be present
