import { Given, Then } from '@badeball/cypress-cucumber-preprocessor'

Given('I am on the map page', () => {
  cy.visit('/')
})

Then('the map component should be present', () => {
  cy.get('.leaflet-tile-container')
    .should('exist')
    .children('.leaflet-tile-loaded')
    .should('have.length.greaterThan', 0)
    .and('be.visible')
})

Then('the search input control should be present', () => {
  cy.get('.tw-input').should('be.visible')
})

Then('the geolocation control should be present', () => {
  cy.get('div.tw-card:nth-child(2) > div:nth-child(1)').should('be.visible')
})

Then('the layers control should be present', () => {
  cy.get('div.tw-bg-base-100:nth-child(1)').should('be.visible')
})