import { createRequire } from 'module'
import { useMemo } from 'react'
import htmlTruncate from 'html-truncate'
import { unified } from 'unified'
import remarkParse from 'remark-parse'

import { useAddFilterTag } from '#components/Map/hooks/useFilter'
import { useTags } from '#components/Map/hooks/useTags'
import { decodeTag } from '#utils/FormatTags'
import { hashTagRegex } from '#utils/HashTagRegex'

import type { Item } from '#types/Item'
import type { Tag } from '#types/Tag'

const require = createRequire(import.meta.url)
let remarkGfm: any
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  remarkGfm = require('remark-gfm')
} catch {
  remarkGfm = undefined
}

const MAX_CHARS = 100

function sanitizeHtml(html: string) {
  return html.replace(/<table[^]*?<\/table>/gis, '')
}

function mdastToHtml(node: any): string {
  switch (node.type) {
    case 'root':
      return node.children.map(mdastToHtml).join('')
    case 'paragraph':
      return node.children.map(mdastToHtml).join('')
    case 'text':
      return node.value
    case 'strong':
    case 'emphasis':
      return node.children.map(mdastToHtml).join('')
    case 'link':
      return `<a href="${node.url}">${node.children.map(mdastToHtml).join('')}</a>`
    case 'break':
      return ' '
    case 'html':
      return node.value
    case 'list':
      return node.children.map(mdastToHtml).join(' ')
    case 'listItem':
      return node.children.map(mdastToHtml).join(' ')
    default:
      return ''
  }
}

function htmlToReact(
  html: string,
  tags: Tag[],
  itemId?: string,
): React.ReactNode[] {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')

  const traverse = (node: ChildNode): React.ReactNode => {
    if (node.nodeType === 3) {
      const text = node.textContent ?? ''
      const parts = text.split(hashTagRegex)
      return parts.map((part, i) => {
        if (hashTagRegex.test(part)) {
          const tag = tags.find(
            (t) => `#${t.name.toLowerCase()}` === part.toLowerCase(),
          )
          return tag ? (
            <HashTag key={`${part}-${i}`} tag={tag} itemId={itemId}>
              {part}
            </HashTag>
          ) : (
            part
          )
        }
        return part
      })
    }

    if (node.nodeType === 1) {
      const el = node as HTMLElement

      if (el.tagName.toLowerCase() === 'a') {
        const href = el.getAttribute('href') ?? ''
        return (
          <a href={href}>{Array.from(el.childNodes).map(traverse)}</a>
        )
      }

      if (
        el.tagName.toLowerCase() === 'span' &&
        (el.getAttribute('data-type') === 'mention' || el.classList.contains('mention'))
      ) {
        const id = el.getAttribute('data-id') ?? el.textContent?.replace('#', '') ?? ''
        const tag = tags.find((t) => t.name.toLowerCase() === id.toLowerCase())
        return (
          <HashTag key={`${id}`} tag={tag ?? { id: id, name: id, color: 'inherit' }} itemId={itemId}>
            #{id}
          </HashTag>
        )
      }

      if (el.tagName.toLowerCase() === 'table') {
        return null
      }

      return <>{Array.from(el.childNodes).map(traverse)}</>
    }

    return null
  }

  return Array.from(doc.body.childNodes).map(traverse)
}

/**
 * @category Map
 * @param maxChars - maximum number of characters to display
 */
export const TextPreview = ({
  item,
  maxChars = MAX_CHARS,
}: {
  item: Item
  maxChars?: number
}) => {
  const tags = useTags()

  const nodes = useMemo(() => {
    if (!item.text) return null

    const processor = unified().use(remarkParse)
    if (remarkGfm) processor.use(remarkGfm)

    const ast = processor.parse(item.text)
    const html = sanitizeHtml(mdastToHtml(ast))
    const truncated = htmlTruncate(html, maxChars, {
      reserveLastWord: true,
    })

    return htmlToReact(truncated, tags, item.id)
  }, [item.text, maxChars, tags, item.id])

  return <span>{nodes}</span>
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
