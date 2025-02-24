import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'

import { TagsProvider } from '#components/Map/hooks/useTags'

import { TextAreaInput } from './TextAreaInput'

// import { useTags } from '#components/Map/hooks/useTags'

// vi.mock('#components/Map/hooks/useTags')

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
            date_created: '2024-11-09T07:57:04',
            id: '03b41b63-4530-4754-95cf-0abf8f9db476',
            map: '3af4863a-7435-4487-aad9-146563ee8e02',
            name: 'Feuer',
            offer_or_need: null,
            user_created: null,
          },
        ]}
      >
        <TextAreaInput updateFormValue={updateFormValue} />
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
      wrapper.rerender(<TextAreaInput labelTitle='My Title' />)
      expect(wrapper.container.firstChild).toMatchSnapshot()
    })
  })
})
