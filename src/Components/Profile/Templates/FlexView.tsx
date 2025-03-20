/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { ContactInfoView } from '#components/Profile/Subcomponents/ContactInfoView'
import { GalleryView } from '#components/Profile/Subcomponents/GalleryView'
import { GroupSubHeaderView } from '#components/Profile/Subcomponents/GroupSubHeaderView'
import { ProfileStartEndView } from '#components/Profile/Subcomponents/ProfileStartEndView'
import { ProfileTextView } from '#components/Profile/Subcomponents/ProfileTextView'

import type { Item } from '#types/Item'
import type { Key } from 'react'

const componentMap = {
  groupSubheaders: GroupSubHeaderView,
  texts: ProfileTextView,
  contactInfos: ContactInfoView,
  startEnd: ProfileStartEndView,
  gallery: GalleryView,
  // weitere Komponenten hier
}

export const FlexView = ({ item }: { item: Item }) => {
  return (
    <div className='tw:h-full tw:overflow-y-auto fade'>
      {item.layer?.itemType.profileTemplate.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (templateItem: { collection: string | number; id: Key | null | undefined; item: any }) => {
          const TemplateComponent = componentMap[templateItem.collection]
          return TemplateComponent ? (
            <TemplateComponent key={templateItem.id} item={item} {...templateItem.item} />
          ) : (
            <div className='tw:mx-6 tw:mb-6' key={templateItem.id}>
              {templateItem.collection} view not found
            </div>
          )
        },
      )}
    </div>
  )
}
