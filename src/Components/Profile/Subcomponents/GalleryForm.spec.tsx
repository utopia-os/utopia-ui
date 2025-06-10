import { readFileSync } from 'node:fs'
import path from 'node:path'

import { render, fireEvent, screen } from '@testing-library/react'
import { describe, it, vi, expect } from 'vitest'

import { GalleryForm } from './GalleryForm'

import type { FormState } from '#types/FormState'
import type { GalleryItem, Item } from '#types/Item'
import type { MarkerIcon } from '#types/MarkerIcon'
import type { Tag } from '#types/Tag'

const testImagePaths = ['./tests/image1.jpg', './tests/image2.jpg', './tests/image3.jpg']

const testImages = testImagePaths.map((imagePath) =>
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  readFileSync(path.join(__dirname, '../../../../', imagePath)),
)

const setState = vi.fn()

const baseState = {
  color: '',
  id: '',
  group_type: 'wuerdekompass',
  status: 'active',
  name: '',
  subname: '',
  text: '',
  contact: '',
  telephone: '',
  next_appointment: '',
  image: '',
  marker_icon: {} as MarkerIcon,
  offers: [] as Tag[],
  needs: [] as Tag[],
  relations: [] as Item[],
  start: '',
  end: '',
  openCollectiveSlug: '',
  gallery: [],
  uploadingImages: [],
}

describe('GalleryForm', () => {
  const Wrapper = ({ gallery = [] as GalleryItem[], uploadingImages = [] as File[] } = {}) => {
    const state: FormState = {
      ...baseState,
      gallery,
      uploadingImages,
    }
    return render(<GalleryForm state={state} setState={setState} />)
  }

  describe('without previous images', () => {
    it('renders', () => {
      const wrapper = Wrapper()
      expect(wrapper.container).toMatchSnapshot()
    })
  })

  describe('with previous images', () => {
    const gallery = [
      {
        directus_files_id: {
          id: '1',
          width: 800,
          height: 600,
        },
      },
      {
        directus_files_id: {
          id: '2',
          width: 1024,
          height: 768,
        },
      },
    ]

    it('renders', () => {
      const wrapper = Wrapper({ gallery })
      expect(wrapper.container).toMatchSnapshot()
    })

    it('can delete an image', () => {
      Wrapper({ gallery })
      const deleteButton = screen.getByTestId('delete-image-1')
      expect(deleteButton).toBeInTheDocument()
      fireEvent.click(deleteButton)
    })
  })

  describe('with uploading images', () => {
    it('renders', () => {
      const wrapper = Wrapper({
        uploadingImages: testImages.map(
          (image, index) =>
            new File([image], `test-image-${index + 1}.jpg`, { type: 'image/jpeg' }),
        ),
      })
      expect(wrapper.container).toMatchSnapshot()
    })
  })
})
