Feature: Map
  As a user
  I want to have the leaflet map and its control elements available
  To be able to interact with the map

  Scenario: Map Component
    Given I am on the map page
    Then the map component should be present

  Scenario: Search Control
    Given I am on the map page
    Then the search input control should be present

  Scenario: Geolocation Control
    Given I am on the map page
    Then the geolocation control should be present

  Scenario: Layers Control
    Given I am on the map page
    Then the layers control should be present