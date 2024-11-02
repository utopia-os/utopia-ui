// eslint-disable-next-line no-useless-escape
export const urlRegex =
  /(^| )(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,10}(:[0-9]{1,10})?(\/.*)?$/gm
export const mailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi

export function fixUrls(message: string): string {
  message = message.replace(urlRegex, function (url) {
    let hyperlink = url.replace(' ', '')
    // eslint-disable-next-line no-useless-escape
    if (!hyperlink.match('^https?://')) {
      hyperlink = 'https://' + hyperlink
    }
    return hyperlink
  })

  return message
}
