import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'

import ComboBoxInput from './ComboBoxInput'

describe('<ComboBoxInput />', () => {
  let wrapper: ReturnType<typeof render>

  const updateFormValue = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    wrapper = render(
      <ComboBoxInput
        value={'option-1'}
        onValueChange={updateFormValue}
        options={['Option 1', 'Option 2']}
      />,
    )
  })

  it('renders properly', () => {
    expect(wrapper.container.firstChild).toMatchSnapshot()
  })

  describe('handleChange', () => {
    it('calls updateFormValue with new value', () => {
      fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Option 2' } })
      expect(updateFormValue).toBeCalledWith('Option 2')
    })
  })
})
