export function decodeTag (string : string) {
  let formatedTag = string.replace(/_/g, '\u00A0')
  return formatedTag = formatedTag.charAt(0).toUpperCase() + formatedTag.slice(1)
}

export function encodeTag (string : string) {
  return string.replace(/\s+/g, '_')
}
