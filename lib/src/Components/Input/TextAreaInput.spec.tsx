import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'

import { TextAreaInput } from './TextAreaInput'

describe('<TextAreaInput />', () => {
  let wrapper: ReturnType<typeof render>

  const updateFormValue = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    wrapper = render(<TextAreaInput defaultValue={''} updateFormValue={updateFormValue} />)
  })

  it('renders properly', () => {
    expect(wrapper.container.firstChild).toMatchSnapshot()
  })

  describe('handleChange', () => {
    it('calls updateFormValue with new value', () => {
      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } })
      expect(updateFormValue).toBeCalledWith('test')
    })
  })

  describe('labelTitle', () => {
    it('sets label', () => {
      wrapper.rerender(<TextAreaInput defaultValue={''} labelTitle='My Title' />)
      expect(wrapper.container.firstChild).toMatchSnapshot()
    })
  })
})
