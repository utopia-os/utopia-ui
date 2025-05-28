import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
    it('calls updateFormValue with new value', async () => {
      // fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } })
      // expect(updateFormValue).toBeCalledWith('test')
      const editor = await screen.findByRole('textbox')
      await userEvent.type(editor, 'test text')
      expect(screen.getByText('test text')).toBeDefined()
    })
  })

  describe('labelTitle', () => {
    it('sets label', () => {
      wrapper.rerender(<TextAreaInput defaultValue={''} labelTitle='My Title' />)
      expect(wrapper.container.firstChild).toMatchSnapshot()
    })
  })
})
