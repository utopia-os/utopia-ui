import { GroupSubHeaderView } from '../Subcomponents/GroupSubHeaderView'
import ContactInfo from '../Subcomponents/ContactInfo'
import { ProfileTextView } from '../Subcomponents/ProfileTextView'
import { Item } from '../../../types'

const componentMap = {
  group_subheaders: GroupSubHeaderView,
  texts: ProfileTextView,
  contact_infos: ContactInfo,
  // weitere Komponenten hier
}

export const FlexView = ({ item }: { item: Item }) => {
  console.log(item)
  return (
    <div className='tw-h-full tw-overflow-y-auto fade'>
      {item.layer?.itemType.profile_template.map((templateItem) => {
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
