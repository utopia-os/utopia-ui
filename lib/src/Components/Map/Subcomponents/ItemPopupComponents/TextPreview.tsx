/* eslint-disable @typescript-eslint/no-unsafe-call */
import truncate from 'markdown-truncate'
import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'

import { useAddFilterTag } from '#components/Map/hooks/useFilter'
import { useTags } from '#components/Map/hooks/useTags'
import { decodeTag } from '#utils/FormatTags'

import type { Item } from '#types/Item'

export const TextPreview = ({ item }: { item: Item }) => {
  if (!item.text) return null
  // Text auf ~100 Zeichen stutzen (inkl. Ellipse „…“)
  const previewRaw = truncate(item.text, { limit: 100, ellipsis: true }) as string

  const withExtraHashes = previewRaw.replace(
    /^(#{1,6})\s/gm,
    (_match: string, hashes: string): string => `${hashes}## `,
  )

  return (
    <div className='markdown'>
      <Markdown
        remarkPlugins={[remarkBreaks, remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{ span: Span }}
      >
        {withExtraHashes}
      </Markdown>
    </div>
  )
}

export const HashTag = ({ tag }: { tag: string }) => {
  const tags = useTags()
  const t = tags.find((t) => t.name === tag.slice(1))
  const addFilterTag = useAddFilterTag()
  if (!t) return <span>{tag}</span>
  return (
    <a
      className='hashtag'
      style={{ color: t.color }}
      key={`${t.name}`}
      onClick={(e) => {
        e.stopPropagation()
        addFilterTag(t)
      }}
    >
      {decodeTag(tag)}
    </a>
  )
}

export const Span = (node) => {
  if (node['data-type'] === 'mention') {
    return <HashTag tag={node.children} />
  }
  return <span {...node}>{node.children}</span>
}
