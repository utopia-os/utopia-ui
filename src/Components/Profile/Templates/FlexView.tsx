import { ContactInfoView } from '#components/Profile/Subcomponents/ContactInfoView'
import { GroupSubHeaderView } from '#components/Profile/Subcomponents/GroupSubHeaderView'
import { ProfileStartEndView } from '#components/Profile/Subcomponents/ProfileStartEndView'
import { ProfileTextView } from '#components/Profile/Subcomponents/ProfileTextView'

import type { Item } from '#types/Item'

const componentMap = {
  groupSubheaders: GroupSubHeaderView,
  texts: ProfileTextView,
  contactInfos: ContactInfoView,
  startEnd: ProfileStartEndView,
  // weitere Komponenten hier
}

export const FlexView = ({ item }: { item: Item }) => {
  // eslint-disable-next-line no-console
  console.log(item)
  return (
    <div className='tw-h-full tw-overflow-y-auto fade'>
      {item.layer?.itemType.profileTemplate.map((templateItem) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
