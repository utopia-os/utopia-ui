import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { TextInput } from './TextInput'

describe('<TextInput />', () => {
  it('renders properly', () => {
    const wrapper = render(<TextInput />)
    expect(wrapper.container.firstChild).toMatchSnapshot()
  })
})
