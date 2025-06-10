/* Currently this test suite is skipped due to the need for a browser environment. We could set
 up a headless browser test environment in the future, e.g. https://vitest.dev/guide/browser/ */
import { readFileSync } from 'node:fs'
import path from 'node:path'

import { describe, it, expect } from 'vitest'

import { getImageDimensions } from './getImageDimensions'

const testImagePaths = ['./tests/image1.jpg', './tests/image2.jpg', './tests/image3.jpg']

const testImages = testImagePaths.map((imagePath) =>
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  readFileSync(path.join(__dirname, '../../', imagePath)),
)

describe('getImageDimensions', () => {
  it.skip('returns the correct dimensions for a valid image file', async () => {
    const file = new File([testImages[0]], 'image1.jpg', { type: 'image/jpeg' })
    const dimensions = await getImageDimensions(file)
    expect(dimensions).toEqual({ width: 800, height: 600 }) // Adjust expected values based on actual test image dimensions
  })

  it.skip('throws an error for an invalid file type', async () => {
    const file = new File(['not an image'], 'invalid.txt', { type: 'text/plain' })
    await expect(getImageDimensions(file)).rejects.toThrow('Error reading image file')
  })

  it.skip('throws an error if the image cannot be loaded', async () => {
    const file = new File([''], 'empty.jpg', { type: 'image/jpeg' })
    await expect(getImageDimensions(file)).rejects.toThrow('Error loading image')
  })
})
