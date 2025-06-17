/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { RichTextEditor } from '#components/Input/RichTextEditor/RichTextEditor'
import { fixUrls, mailRegex } from '#utils/ReplaceURLs'

import type { Item } from '#types/Item'

/**
 * @category Map
 */
export const TextView = ({
  item,
  text,
  truncate = false,
  rawText,
}: {
  item?: Item
  text?: string
  truncate?: boolean
  rawText?: string
}) => {
  if (item) {
    text = item.text
  }

  let innerText = ''
  let replacedText = ''

  if (rawText) {
    innerText = replacedText = rawText
  } else if (text) {
    innerText = text
  }

  if (innerText && truncate) innerText = truncateText(removeMarkdownKeepParagraphs(innerText), 100)

  if (innerText) replacedText = fixUrls(innerText)

  if (replacedText) {
    replacedText = replacedText.replace(mailRegex, (url) => {
      return `[${url}](mailto:${url})`
    })
  }

  return <RichTextEditor defaultValue={replacedText} readOnly={true} />
}

function removeMarkdownKeepParagraphs(text: string): string {
  return (
    text
      // 1) Bilder entfernen
      .replace(/!\[.*?\]\(.*?\)/g, '')
      // 2) Markdown-Links [Text](URL) → URL
      .replace(/\[.*?\]\(\s*(https?:\/\/[^\s)]+)\s*\)/g, '$1')
      // 3) Autolinks <http://…> → http://…
      .replace(/<\s*(https?:\/\/[^\s>]+)\s*>/g, '$1')
      // 4) Code-Fences und Inline-Code entfernen
      .replace(/```[\s\S]*?```/g, '')
      .replace(/`([^`]+)`/g, '$1')
      // 8) Tabellen-Pipes entfernen
      .replace(/^\|(.+)\|$/gm, '$1')
      .replace(/^\s*\|[-\s|]+\|$/gm, '')
      // 9) Blockquotes
      .replace(/^>\s+(.*)$/gm, '$1')
      // 10) Echte HTML-Tags (außer Absätze) entfernen
      .replace(/<(?!\s*\/?\s*p\s*>)[^>]+>/g, '')
      // 11) Zeilenumbrüche normalisieren
      .replace(/\r\n|\r/g, '\n')
      // 12) Mehrfache Leerzeilen auf max. 2 reduzieren
      .replace(/\n{3,}/g, '\n\n')
      // 13) Trim
      .trim()
  )
}

function truncateText(text, limit) {
  if (text.length <= limit) {
    return text
  }

  let truncated = ''
  let length = 0

  // Split the text by paragraphs
  const paragraphs = text.split('\n')

  for (const paragraph of paragraphs) {
    if (length + paragraph.length > limit) {
      truncated += paragraph.slice(0, limit - length) + '...'
      break
    } else {
      truncated += paragraph + '\n'
      length += paragraph.length
    }
  }

  return truncated.trim()
}
