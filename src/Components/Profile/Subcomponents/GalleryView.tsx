import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox/*'

import type { Item } from '#types/Item'

export const GalleryView = ({ item }: { item: Item }) => {
  const [open, setOpen] = useState(false)
  // eslint-disable-next-line no-console
  console.log(item)
  return (
    <>
      <button type='button' onClick={() => setOpen(true)}>
        Open Lightbox
      </button>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[{ src: '/image1.jpg' }, { src: '/image2.jpg' }, { src: '/image3.jpg' }]}
      />
    </>
  )
}
