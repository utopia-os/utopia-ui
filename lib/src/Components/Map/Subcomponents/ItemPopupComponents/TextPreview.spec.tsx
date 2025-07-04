import { render } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { TextPreview } from './TextPreview'

import type { Item } from '#types/Item'
import type { Tag } from '#types/Tag'

vi.mock('#components/Map/hooks/useTags', () => ({
  useTags: () => [{ id: '1', name: 'tag', color: '#000' }] as Tag[],
}))

vi.mock('#components/Map/hooks/useFilter', () => ({
  useAddFilterTag: () => vi.fn(),
}))

describe('<TextPreview />', () => {
  it('truncates respecting maxChars', () => {
    const item: Item = { id: '1', name: 't', text: 'This is a very long text with a link [here](https://example.com) and more words.' }
    const { container } = render(<TextPreview item={item} maxChars={20} />)
    expect((container.textContent ?? '').length).toBeLessThanOrEqual(20)
  })

  it('renders hashtags and hyperlinks', () => {
    const item: Item = { id: '1', name: 't', text: 'Visit [site](https://example.com) #tag' }
    const { container } = render(<TextPreview item={item} maxChars={100} />)
    const links = container.querySelectorAll('a')
    expect(links.length).toBe(2)
    expect(links[0].getAttribute('href')).toBe('https://example.com')
    expect(links[1].className).toContain('hashtag')
  })

  it('removes tables', () => {
    const item: Item = { id: '1', name: 't', text: '<table><tr><td>bad</td></tr></table>good' }
    const { container } = render(<TextPreview item={item} maxChars={100} />)
    expect(container.textContent).not.toContain('bad')
    expect(container.textContent).toContain('good')
  })
})
