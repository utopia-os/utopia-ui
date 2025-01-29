export function containsUUID(str: string): boolean {
  const uuidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/i
  // eslint-disable-next-line no-console
  uuidRegex.test(str) && console.log('contains UUID')
  return uuidRegex.test(str)
}
