/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { ContactInfoView } from '#components/Profile/Subcomponents/ContactInfoView'
import { GalleryView } from '#components/Profile/Subcomponents/GalleryView'
import { GroupSubHeaderView } from '#components/Profile/Subcomponents/GroupSubHeaderView'
import { ProfileStartEndView } from '#components/Profile/Subcomponents/ProfileStartEndView'
import { ProfileTextView } from '#components/Profile/Subcomponents/ProfileTextView'

import type { Item } from '#types/Item'

const componentMap = {
  groupSubheaders: GroupSubHeaderView,
  texts: ProfileTextView,
  contactInfos: ContactInfoView,
  startEnd: ProfileStartEndView,
  gallery: GalleryView,
  // weitere Komponenten hier
}

export const FlexView = ({ item }: { item: Item }) => {
  // eslint-disable-next-line no-console
  console.log(item)
  return (
    <div className='tw-h-full tw-overflow-y-auto fade'>
      {item.layer?.itemType.profileTemplate.map((templateItem) => {
        const TemplateComponent = componentMap[templateItem.collection]
        return TemplateComponent ? (
          <TemplateComponent key={templateItem.id} item={item} {...templateItem.item} />
        ) : (
          <div key={templateItem.id}>Component not found</div>
        )
      })}
    </div>
  )
}
