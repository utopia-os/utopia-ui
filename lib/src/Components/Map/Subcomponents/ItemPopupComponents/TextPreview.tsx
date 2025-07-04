import { useAddFilterTag } from '#components/Map/hooks/useFilter'
import { useTags } from '#components/Map/hooks/useTags'
import { decodeTag } from '#utils/FormatTags'

import type { Item } from '#types/Item'
import type { Tag } from '#types/Tag'

const MAX_CHARS = 100

/**
 * @category Map
 */
export const TextPreview = ({ item }: { item: Item }) => {
  const tags = useTags()

  if (!item.text) return ''
  const s = item.text
    .replace(/`([^`]+)`/g, '$1')
    .replace(/<\/?[^>]+>/g, '') // übrige HTML
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
    .replace(/(`{1,3})(.*?)\1/g, '$2') // Remove inline code
    .replace(/(\*{1,2}|_{1,2})(.*?)\1/g, '$2') // Remove bold and italic
    .replace(/(#+)\s+(.*)/g, '$2') // Remove headers
    .replace(/>\s+(.*)/g, '$1') // Remove blockquotes
    .replace(/^\s*\n/gm, '\n') // Preserve empty lines
    .replace(/(\r\n|\n|\r)/gm, '\n') // Preserve line breaks

  return s
}

const HashTag = ({ children, tag, itemId }: { children: string; tag: Tag; itemId?: string }) => {
  const addFilterTag = useAddFilterTag()

  return (
    <a
      className='hashtag'
      style={{ color: tag.color }}
      key={`${tag.name}-${itemId ?? ''}`}
      onClick={(e) => {
        e.stopPropagation()
        addFilterTag(tag)
      }}
    >
      {decodeTag(children)}
    </a>
  )
}
