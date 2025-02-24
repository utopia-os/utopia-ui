import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'

import { TagsProvider } from '#components/Map/hooks/useTags'

import { TextAreaInput } from './TextAreaInput'

describe('<TextAreaInput />', () => {
  let wrapper: ReturnType<typeof render>

  const updateFormValue = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    wrapper = render(
      <TagsProvider
        initialTags={[
          {
            color: '#b3242f',
            id: '03b41b63-4530-4754-95cf-0abf8f9db476',
            name: 'Feuer',
          },
        ]}
      >
        <TextAreaInput defaultValue={''} updateFormValue={updateFormValue} />
      </TagsProvider>,
    )
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
