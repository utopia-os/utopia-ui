export function decodeTag (string : string) {
  const formatedTag = string.replace(/_/g, '\u00A0')
  return formatedTag.charAt(0).toUpperCase() + formatedTag.slice(1)
}

export function encodeTag (string : string) {
  return string.replace(/\s+/g, '_')
}
