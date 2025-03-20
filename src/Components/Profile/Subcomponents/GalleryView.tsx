import { useState } from 'react'
import { RowsPhotoAlbum } from 'react-photo-album'
import ReactLightbox from 'yet-another-react-lightbox'

import { useAppState } from '#components/AppShell/hooks/useAppState'

import type { Item } from '#types/Item'

export const GalleryView = ({ item }: { item: Item }) => {
  const [index, setIndex] = useState(-1)
  const appState = useAppState()
  const images = item.gallery?.map((i, j) => {
    return {
      src: appState.assetsApi.url + `${i.directus_files_id.id}.jpg`,
      width: i.directus_files_id.width,
      height: i.directus_files_id.height,
      index: j,
    }
  })

  if (!images) throw new Error('GalleryView: images is undefined')

  return (
    <div className='tw:mx-6 tw:mb-6'>
      <RowsPhotoAlbum
        photos={images}
        targetRowHeight={150}
        onClick={({ index: current }) => setIndex(current)}
      />

      <ReactLightbox index={index} slides={images} open={index >= 0} close={() => setIndex(-1)} />
    </div>
  )
}
