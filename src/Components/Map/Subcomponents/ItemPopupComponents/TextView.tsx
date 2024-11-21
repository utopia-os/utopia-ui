/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { memo, useEffect } from 'react'
import Markdown from 'react-markdown'
import remarkBreaks from 'remark-breaks'

import { useAddFilterTag } from '#components/Map/hooks/useFilter'
import { useTags } from '#components/Map/hooks/useTags'
import { Item, Tag } from '#src/types'
import { decodeTag } from '#utils/FormatTags'
import { getValue } from '#utils/GetValue'
import { hashTagRegex } from '#utils/HashTagRegex'
import { fixUrls, mailRegex } from '#utils/ReplaceURLs'

export const TextView = ({
  item,
  truncate = false,
  itemTextField,
  rawText,
}: {
  item?: Item
  truncate?: boolean
  itemTextField?: string
  rawText?: string
}) => {
  const tags = useTags()
  const addFilterTag = useAddFilterTag()

  let text = ''
  let replacedText = ''

  if (rawText) {
    text = replacedText = rawText
  } else if (itemTextField && item) {
    text = getValue(item, itemTextField)
  } else {
    text = item?.layer?.itemTextField && item ? getValue(item, item.layer.itemTextField) : ''
  }

  if (item && text && truncate) text = truncateText(removeMarkdownKeepLinksAndParagraphs(text), 100)

  if (item && text) replacedText = fixUrls(text)

  if (replacedText) {
    replacedText = replacedText.replace(/(?<!\]?\()https?:\/\/[^\s)]+(?!\))/g, (url) => {
      let shortUrl = url

      if (url.match('^https://')) {
        shortUrl = url.split('https://')[1]
      }

      if (url.match('^http://')) {
        shortUrl = url.split('http://')[1]
      }

      return `[${shortUrl}](${url})`
    })
  }

  if (replacedText) {
    replacedText = replacedText.replace(mailRegex, (url) => {
      return `[${url}](mailto:${url})`
    })
  }

  if (replacedText) {
    replacedText = replacedText.replace(hashTagRegex, (match) => {
      return `[${match}](${match})`
    })
  }

  const CustomH1 = ({ children }) => <h1 className='tw-text-xl tw-font-bold'>{children}</h1>

  const CustomH2 = ({ children }) => <h2 className='tw-text-lg tw-font-bold'>{children}</h2>

  const CustomH3 = ({ children }) => <h3 className='tw-text-base tw-font-bold'>{children}</h3>

  const CustomH4 = ({ children }) => <h4 className='tw-text-base tw-font-bold'>{children}</h4>

  const CustomH5 = ({ children }) => <h5 className='tw-text-sm tw-font-bold'>{children}</h5>

  const CustomH6 = ({ children }) => <h6 className='tw-text-sm tw-font-bold'>{children}</h6>

  const CustomParagraph = ({ children }) => <p className='!tw-my-2'>{children}</p>

  const CustomUnorderdList = ({ children }) => (
    <ul className='tw-list-disc tw-list-inside'>{children}</ul>
  )

  const CustomOrderdList = ({ children }) => (
    <ol className='tw-list-decimal tw-list-inside'>{children}</ol>
  )

  const CustomHorizontalRow = ({ children }) => <hr className='tw-border-current'>{children}</hr>
  // eslint-disable-next-line react/prop-types
  const CustomImage = ({ alt, src, title }) => (
    <img className='tw-max-w-full tw-rounded tw-shadow' src={src} alt={alt} title={title} />
  )

  const CustomExternalLink = ({ href, children }) => (
    <a className='tw-font-bold tw-underline' href={href} target='_blank' rel='noreferrer'>
      {' '}
      {children}
    </a>
  )

  const CustomHashTagLink = ({
    children,
    tag,
    item,
  }: {
    children: string
    tag: Tag
    item?: Item
  }) => {
    return (
      <a
        style={{ color: tag ? tag.color : '#faa', fontWeight: 'bold', cursor: 'pointer' }}
        key={tag ? tag.name + item?.id : item?.id}
        onClick={(e) => {
          e.stopPropagation()
          addFilterTag(tag)
        }}
      >
        {decodeTag(children)}
      </a>
    )
  }

  // eslint-disable-next-line react/display-name
  const MemoizedVideoEmbed = memo(({ url }: { url: string }) => (
    <iframe
      className='tw-w-full'
      src={url}
      allow='fullscreen;  picture-in-picture'
      allowFullScreen
    />
  ))

  return (
    <Markdown
      className={'tw-text-map tw-leading-map tw-text-sm'}
      remarkPlugins={[remarkBreaks]}
      components={{
        p: CustomParagraph,
        a: ({ href, children }: { href: string; children: string }) => {
          const isYouTubeVideo = href?.startsWith('https://www.youtube.com/watch?v=')

          const isRumbleVideo = href?.startsWith('https://rumble.com/embed/')

          if (isYouTubeVideo) {
            const videoId = href?.split('v=')[1].split('&')[0]
            const youtubeEmbedUrl = `https://www.youtube-nocookie.com/embed/${videoId}`

            return <MemoizedVideoEmbed url={youtubeEmbedUrl}></MemoizedVideoEmbed>
          }
          if (isRumbleVideo) {
            return <MemoizedVideoEmbed url={href}></MemoizedVideoEmbed>
          }

          if (href?.startsWith('#')) {
            console.log(href.slice(1).toLowerCase())
            console.log(tags)
            const tag = tags.find(
              (t) => t.name.toLowerCase() === decodeURI(href).slice(1).toLowerCase(),
            )
            if (tag)
              return (
                <CustomHashTagLink tag={tag} item={item}>
                  {children}
                </CustomHashTagLink>
              )
            else return children
          } else {
            return <CustomExternalLink href={href}>{children}</CustomExternalLink>
          }
        },
        ul: CustomUnorderdList,
        ol: CustomOrderdList,
        img: CustomImage,
        hr: CustomHorizontalRow,
        h1: CustomH1,
        h2: CustomH2,
        h3: CustomH3,
        h4: CustomH4,
        h5: CustomH5,
        h6: CustomH6,
      }}
    >
      {replacedText}
    </Markdown>
  )
}

function removeMarkdownKeepLinksAndParagraphs(text) {
  // Remove Markdown syntax using regular expressions but keep links and paragraphs
  return text
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
    .replace(/(`{1,3})(.*?)\1/g, '$2') // Remove inline code
    .replace(/(\*{1,2}|_{1,2})(.*?)\1/g, '$2') // Remove bold and italic
    .replace(/(#+)\s+(.*)/g, '$2') // Remove headers
    .replace(/>\s+(.*)/g, '$1') // Remove blockquotes
    .replace(/^\s*\n/gm, '\n') // Preserve empty lines
    .replace(/(\r\n|\n|\r)/gm, '\n') // Preserve line breaks
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
