/// <reference types="cypress" />
import { mount } from 'cypress/react'

import { TextInput } from './TextInput'

describe('<TextInput />', () => {

  it('renders with default props', () => {
    mount(<TextInput />)
    cy.get('input').should('have.attr', 'type', 'text')
    cy.get('input').should('have.attr', 'placeholder', '')
    cy.get('input').should('have.attr', 'required')
    cy.get('input').should('have.class', 'tw-input')
    cy.get('input').should('have.class', 'tw-input-bordered')
    cy.get('input').should('have.class', 'tw-w-full')
  })

  it('renders with given labelTitle', () => {
    mount(<TextInput labelTitle='Test Title' />)
    cy.get('label').should('contain.text', 'Test Title')
  })

  it('renders with given type', () => {
    mount(<TextInput type='email' />)
    cy.get('input').should('have.attr', 'type', 'email')
  })

  it('accepts user input', () => {
    mount(<TextInput dataField='test-input' />)
    cy.get('input[name="test-input"]').type('Hello Test')
    cy.get('input[name="test-input"]').should('have.value', 'Hello Test')
  })

  it('renders a label, if labelTitle is set', () => {
    mount(<TextInput dataField='test-input' labelTitle='Test Label' />)
    cy.contains('Test Label').should('exist')
  })

  it('handles default value correctly', () => {
    mount(<TextInput dataField='test-input' defaultValue='Default Value' />)
    cy.get('input[name="test-input"]').should('have.value', 'Default Value')
  })

  it('calls updateFormValue on change', () => {
    const onChangeSpy = cy.spy().as('updateFormValueSpy')
    mount(<TextInput dataField='test-input' updateFormValue={onChangeSpy} />)
    cy.get('input[name="test-input"]').type('Test')
    cy.get('@updateFormValueSpy').should('have.been.calledWith', 'Test')
  })

  it('accepts a specific input type', () => {
    mount(<TextInput dataField='test-input' type='email' />)
    cy.get('input[name="test-input"]').should('have.attr', 'type', 'email')
  })

  it('respects the autocomplete attribute', () => {
    mount(<TextInput dataField='test-input' autocomplete='off' />)
    cy.get('input[name="test-input"]').should('have.attr', 'autocomplete', 'off')
  })

  it('updates form value on change', () => {
    const updateFormValue = cy.stub()
    mount(<TextInput updateFormValue={updateFormValue} />)
    cy.get('input').type('Hello')
    cy.wrap(updateFormValue).should('have.been.calledWith', 'Hello')
  })
})
