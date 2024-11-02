import { Item } from '../../../../types'
import { useTags } from '../../hooks/useTags'
import { useAddFilterTag } from '../../hooks/useFilter'
import { hashTagRegex } from '../../../../Utils/HashTagRegex'
import { fixUrls, mailRegex } from '../../../../Utils/ReplaceURLs'
import Markdown from 'react-markdown'
import { getValue } from '../../../../Utils/GetValue'
import remarkBreaks from 'remark-breaks'
import { decodeTag } from '../../../../Utils/FormatTags'
import { memo } from 'react'

export const TextView = ({ item, truncate = false, itemTextField, rawText }: { item?: Item, truncate?: boolean, itemTextField?: string, rawText?: string }) => {
  const tags = useTags()
  const addFilterTag = useAddFilterTag()

  let text = ''
  let replacedText = ''

  if (rawText) { text = replacedText = rawText } else if (itemTextField && item) { text = getValue(item, itemTextField) } else { text = item?.layer?.itemTextField && item ? getValue(item, item.layer?.itemTextField) : '' }

  if (item && text && truncate) text = truncateText(removeMarkdownKeepLinksAndParagraphs(text), 100)

  if (item && text) replacedText = fixUrls(text)

  // eslint-disable-next-line no-useless-escape
  if (replacedText) {
    replacedText = replacedText.replace(/(?<!\]?\()https?:\/\/[^\s)]+(?!\))/g, (url) => {
      let shortUrl = url
      // eslint-disable-next-line no-useless-escape
      if (url.match('^https:\/\/')) {
        shortUrl = url.split('https://')[1]
      }
      // eslint-disable-next-line no-useless-escape
      if (url.match('^http:\/\/')) {
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

  // eslint-disable-next-line react/prop-types
  const CustomH1 = ({ children }) => (
    <h1 className="tw-text-xl tw-font-bold">{children}</h1>
  )
  // eslint-disable-next-line react/prop-types
  const CustomH2 = ({ children }) => (
    <h2 className="tw-text-lg tw-font-bold">{children}</h2>
  )
  // eslint-disable-next-line react/prop-types
  const CustomH3 = ({ children }) => (
    <h3 className="tw-text-base tw-font-bold">{children}</h3>
  )
  // eslint-disable-next-line react/prop-types
  const CustomH4 = ({ children }) => (
    <h4 className="tw-text-base tw-font-bold">{children}</h4>
  )
  // eslint-disable-next-line react/prop-types
  const CustomH5 = ({ children }) => (
    <h5 className="tw-text-sm tw-font-bold">{children}</h5>
  )
  // eslint-disable-next-line react/prop-types
  const CustomH6 = ({ children }) => (
    <h6 className="tw-text-sm tw-font-bold">{children}</h6>
  )
  // eslint-disable-next-line react/prop-types
  const CustomParagraph = ({ children }) => (
    <p className="!tw-my-2">{children}</p>
  )
  // eslint-disable-next-line react/prop-types
  const CustomUnorderdList = ({ children }) => (
    <ul className="tw-list-disc tw-list-inside">{children}</ul>
  )
  // eslint-disable-next-line react/prop-types
  const CustomOrderdList = ({ children }) => (
    <ol className="tw-list-decimal tw-list-inside">{children}</ol>
  )
  // eslint-disable-next-line react/prop-types
  const CustomHorizontalRow = ({ children }) => (
    <hr className="tw-border-current">{children}</hr>
  )
  // eslint-disable-next-line react/prop-types
  const CustomImage = ({ alt, src, title }) => (
    <img
      className="tw-max-w-full tw-rounded tw-shadow"
      src={src}
      alt={alt}
      title={title}
    />
  )
  // eslint-disable-next-line react/prop-types
  const CustomExternalLink = ({ href, children }) => (
    <a className='tw-font-bold tw-underline'
      href={href}
      target='_blank' rel="noreferrer"
    > {children}</a>
  )
  /* eslint-disable react/prop-types */
  const CustomHashTagLink = ({ children, tag, item }) => {
    return (
      <a
        style={{ color: tag ? tag.color : '#faa', fontWeight: 'bold', cursor: 'pointer' }}
        key={tag ? tag.name + item!.id : item.id}
        onClick={(e) => {
          e.stopPropagation()
          addFilterTag(tag!)
        }}>{decodeTag(children)}</a>
    )
  }
  /* eslint-enable react/prop-types */

  // eslint-disable-next-line react/display-name
  const MemoizedVideoEmbed = memo(({ url }: { url: string }) => (
    <iframe
      className='tw-w-full'
      src={url}
      allow="fullscreen;  picture-in-picture"
      allowFullScreen
    />
  ))

  return (
    <Markdown className={'tw-text-map tw-leading-map tw-text-sm'} remarkPlugins={[remarkBreaks]} components={{
      p: CustomParagraph,
      a: ({ href, children }) => {
        // eslint-disable-next-line react/prop-types
        const isYouTubeVideo = href?.startsWith('https://www.youtube.com/watch?v=')
        // eslint-disable-next-line react/prop-types
        const isRumbleVideo = href?.startsWith('https://rumble.com/embed/')

        if (isYouTubeVideo) {
          // eslint-disable-next-line react/prop-types
          const videoId = href?.split('v=')[1].split('&')[0]
          const youtubeEmbedUrl = `https://www.youtube-nocookie.com/embed/${videoId}`

          return (
            <MemoizedVideoEmbed url={youtubeEmbedUrl}></MemoizedVideoEmbed>
          )
        }
        if (isRumbleVideo) {
          return (
            <MemoizedVideoEmbed url={href!}></MemoizedVideoEmbed>
          )
        }
        // eslint-disable-next-line react/prop-types
        if (href?.startsWith('#')) {
          const tag = tags.find(t => t.name.toLowerCase() === decodeURI(href).slice(1).toLowerCase())
          return <CustomHashTagLink tag={tag} item={item}>{children}</CustomHashTagLink>
        } else {
          return (
            <CustomExternalLink href={href}>{children}</CustomExternalLink>
          )
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
      h6: CustomH6
    }}>
      {replacedText}
    </Markdown>
  )
}

function removeMarkdownKeepLinksAndParagraphs (text) {
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

function truncateText (text, limit) {
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
