/* eslint-disable @typescript-eslint/no-unsafe-call */
import htmlTruncate from 'html-truncate'
import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import { unified } from 'unified'

import { useAddFilterTag } from '#components/Map/hooks/useFilter'
import { useTags } from '#components/Map/hooks/useTags'
import { decodeTag } from '#utils/FormatTags'

import type { Item } from '#types/Item'

export const TextPreview = ({ item }: { item: Item }) => {
  if (!item.text) return null
  // Convert Markdown to HTML and truncate with awareness of markup
  const html = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkBreaks)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .processSync(item.text)
    .toString()

  // decrease heading levels similar to previous Markdown manipulation
  const withSmallHeadings = html.replace(/<(\/?)h([1-6])/g, (_m, slash, level) => {
    const newLevel = Math.min(6, Number(level) + 2)
    return `<${slash}h${newLevel}`
  })

  // Text auf ~100 Zeichen stutzen (inkl. Ellipse „…“)
  const previewRaw = htmlTruncate(withSmallHeadings, 100, {
    ellipsis: '…',
    reserveLastWord: true,
  })

  return (
    <div className='markdown'>
      <Markdown
        remarkPlugins={[remarkBreaks, remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{ span: Span }}
      >
        {previewRaw}
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
