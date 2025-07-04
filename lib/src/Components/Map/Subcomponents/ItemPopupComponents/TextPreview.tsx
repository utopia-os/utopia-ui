import truncate from 'markdown-truncate'

import { RichTextEditor } from '#components/Input/RichTextEditor/RichTextEditor'
import { fixUrls, mailRegex } from '#utils/ReplaceURLs'

import type { Item } from '#types/Item'

export const TextPreview = ({ item }: { item: Item }) => {
  if (!item.text) return null
  else {
    let replacedText = truncate(item.text, { limit: 100, ellipsis: true }) as string

    replacedText = fixUrls(item.text)

    if (replacedText) {
      replacedText = replacedText.replace(mailRegex, (url) => {
        return `[${url}](mailto:${url})`
      })
    }

    return <RichTextEditor defaultValue={replacedText} readOnly={true} />
  }
}
