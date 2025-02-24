import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'

import { SelectBox } from './SelectBox'

describe('<SelectBox />', () => {
  let wrapper: ReturnType<typeof render>

  const updateFormValue = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    wrapper = render(
      <SelectBox
        defaultValue={'option-1'}
        updateFormValue={updateFormValue}
        options={[
          {
            name: 'Option 1',
            value: 'option-1',
          },
          {
            name: 'Option 2',
            value: '',
          },
        ]}
      />,
    )
  })

  it('renders properly', () => {
    expect(wrapper.container.firstChild).toMatchSnapshot()
  })

  describe('handleChange', () => {
    it('calls updateFormValue with new value', () => {
      fireEvent.change(screen.getByRole('combobox'), { target: { value: 'option-1' } })
      expect(updateFormValue).toBeCalledWith('option-1')
    })
  })

  describe('labelTitle', () => {
    it('sets label', () => {
      wrapper.rerender(
        <SelectBox
          defaultValue={''}
          updateFormValue={updateFormValue}
          labelTitle='My Title'
          options={[]}
        />,
      )
      expect(wrapper.container.firstChild).toMatchSnapshot()
    })
  })

  describe('labelDescription', () => {
    it('sets label description', () => {
      wrapper.rerender(
        <SelectBox
          defaultValue={''}
          updateFormValue={updateFormValue}
          labelTitle='My Title'
          labelDescription='My Description'
          options={[]}
        />,
      )
      expect(wrapper.container.firstChild).toMatchSnapshot()
    })
  })
})
