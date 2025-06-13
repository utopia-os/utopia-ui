import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'

import { TextInput } from './TextInput'

describe('<TextInput />', () => {
  let wrapper = render(<TextInput />)

  beforeEach(() => {
    wrapper = render(<TextInput />)
  })

  it('renders properly', () => {
    expect(wrapper.container.firstChild).toMatchSnapshot()
  })

  describe('handleChange', () => {
    it('calls updateFormValue with new value', () => {
      const updateFormValue = vi.fn()
      wrapper.rerender(<TextInput updateFormValue={updateFormValue} />)
      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } })
      expect(updateFormValue).toBeCalledWith('test')
    })
  })

  describe('labelTitle', () => {
    it('sets label', () => {
      wrapper.rerender(<TextInput labelTitle='My Title' />)
      expect(wrapper.container.firstChild).toMatchSnapshot()
    })
  })
})
