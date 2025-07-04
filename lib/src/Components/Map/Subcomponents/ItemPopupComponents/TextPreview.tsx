/* eslint-disable @typescript-eslint/no-unsafe-call */
import truncate from 'markdown-truncate'
import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'

import { useAddFilterTag } from '#components/Map/hooks/useFilter'
import { useGetItemTags, useTags } from '#components/Map/hooks/useTags'
import { decodeTag } from '#utils/FormatTags'

import type { Item } from '#types/Item'

export const TextPreview = ({ item }: { item: Item }) => {
  const getItemTags = useGetItemTags()

  if (!item.text) return null
  // Text auf ~100 Zeichen stutzen (inkl. Ellipse „…“)
  const previewRaw = truncate(item.text, { limit: 100, ellipsis: true }) as string

  const withExtraHashes = previewRaw.replace(
    /^(#{1,6})\s/gm,
    (_match: string, hashes: string): string => `${hashes}## `,
  )

  return (
    <div className='markdown'>
      <Markdown remarkPlugins={[remarkBreaks, remarkGfm]} rehypePlugins={[rehypeRaw]}>
        {removeMentionSpans(removeHashtags(withExtraHashes))}
      </Markdown>
      {getItemTags(item).map((tag) => (
        <HashTag tag={tag} key={tag} />
      ))}
    </div>
  )
}

export const HashTag = ({ tag }: { tag: Tag }) => {
  const tags = useTags()
  const t = tags.find((t) => t.name.toLocaleLowerCase() === tag.name.toLocaleLowerCase())
  const addFilterTag = useAddFilterTag()
  if (!t) return null
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
      {`#${decodeTag(tag.name)} `}
    </a>
  )
}

function removeMentionSpans(html) {
  return html.replace(
    /<span\b(?=[^>]*\bdata-type="mention")(?=[^>]*\bclass="mention")[^>]*>[\s\S]*?<\/span>/gi,
    '',
  )
}

function removeHashtags(str) {
  return str
    // 1. Hashtags entfernen, außer sie stehen am Zeilenanfang als Markdown-Heading
    .replace(
      /(^|\s)(?!#{1,6}\s)(#[A-Za-z0-9_]+)\b/g,
      '$1'
    )

    // 3. Anfangs/Ende trimmen
    .trim()
}