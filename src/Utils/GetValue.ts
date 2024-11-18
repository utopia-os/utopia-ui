/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
export function getValue(obj, path) {
  if (!obj || typeof path !== 'string') return undefined

  const pathArray = path.split('.') // Use a different variable for the split path
  for (let i = 0, len = pathArray.length; i < len; i++) {
    if (!obj) return undefined // Check if obj is falsy at each step
    // eslint-disable-next-line security/detect-object-injection
    obj = obj[pathArray[i]] // Dive one level deeper
  }
  return obj // Return the final value
}
