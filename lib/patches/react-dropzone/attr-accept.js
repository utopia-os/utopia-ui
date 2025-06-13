/**
 * Patched version of attr-accept to fix compatibility issues with react-dropzone
 */

function attrAccept(file, acceptedFiles) {
  if (file && acceptedFiles) {
    const acceptedFilesArray = Array.isArray(acceptedFiles)
      ? acceptedFiles
      : acceptedFiles.split(',')

    if (acceptedFilesArray.length === 0) {
      return true
    }

    const fileName = file.name || ''
    const mimeType = (file.type || '').toLowerCase()
    const baseMimeType = mimeType.replace(/\/.*$/, '')

    return acceptedFilesArray.some(function (type) {
      const validType = type.trim().toLowerCase()

      if (validType.charAt(0) === '.') {
        return fileName.toLowerCase().endsWith(validType)
      } else if (validType.endsWith('/*')) {
        // This is something like a image/* mime type
        return baseMimeType === validType.replace(/\/.*$/, '')
      }

      return mimeType === validType
    })
  }

  return true
}

// Export as both default and named export to support different import styles
export default attrAccept
export { attrAccept }
