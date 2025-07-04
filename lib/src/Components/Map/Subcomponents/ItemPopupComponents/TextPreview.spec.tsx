import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { TextPreview } from './TextPreview'
import type { Item } from '#types/Item'

describe('<TextPreview />', () => {
  it('does not output partial mention tags when truncated', () => {
    const mention = '<span data-type="mention">#hash</span>'
    const item: Item = {
      id: '1',
      name: 'Test',
      text: `${'a'.repeat(95)} ${mention}`,
    }
    const { container } = render(<TextPreview item={item} />)
    expect(container.innerHTML).not.toContain('<span data-type="mention"')
  })
})
