import type { Item } from '#types/Item'

function getNestedValue(obj: Object, path: string) {
  re
}

export function getValue(obj: Item | undefined, path: string): Item | string | undefined {
  if (!obj || typeof path !== 'string') return undefined

  const pathArray = path.split('.') // Use a different variable for the split path
  for (let i = 0, len = pathArray.length; i < len; i++) {
    if (!obj) return undefined // Check if obj is falsy at each step
    // eslint-disable-next-line security/detect-object-injection
    obj = obj[pathArray[i]] as Item // Dive one level deeper
  }
  return obj // Return the final value
}
