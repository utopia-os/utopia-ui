/* eslint-disable import/no-unassigned-import */
/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useState } from 'react'
// eslint-disable-next-line import/no-named-as-default
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import { RowsPhotoAlbum } from 'react-photo-album'
import 'react-photo-album/rows.css'

import { useAppState } from '#components/AppShell/hooks/useAppState'

import type { Item } from '#types/Item'

export const GalleryView = ({ item }: { item: Item }) => {
  const [index, setIndex] = useState(-1)
  const appState = useAppState()
  const images = item.gallery.map((i, j) => {
    return {
      src: appState.assetsApi.url + `${i.directus_files_id.id}.jpg`,
      width: i.directus_files_id.width,
      height: i.directus_files_id.height,
      index: j,
    }
  })
  return (
    <div className='tw-mx-6 tw-mb-6'>
      <RowsPhotoAlbum
        photos={images}
        targetRowHeight={150}
        onClick={({ index: current }) => setIndex(current)}
      />

      <Lightbox index={index} slides={images} open={index >= 0} close={() => setIndex(-1)} />
    </div>
  )
}
