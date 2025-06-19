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

  if (innerText && truncate) innerText = truncateMarkdown(innerText, 100)

  if (innerText) replacedText = fixUrls(innerText)

  if (replacedText) {
    replacedText = replacedText.replace(mailRegex, (url) => {
      return `[${url}](mailto:${url})`
    })
  }

  return <RichTextEditor defaultValue={replacedText} readOnly={true} />
}

export function truncateMarkdown(markdown: string, limit: number): string {
  return markdown.slice(0, limit)
}
