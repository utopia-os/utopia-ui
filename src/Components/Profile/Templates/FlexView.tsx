import { ContactInfoView } from '#components/Profile/Subcomponents/ContactInfoView'
import { GroupSubHeaderView } from '#components/Profile/Subcomponents/GroupSubHeaderView'
import { ProfileStartEndView } from '#components/Profile/Subcomponents/ProfileStartEndView'
import { ProfileTextView } from '#components/Profile/Subcomponents/ProfileTextView'

import type { Item } from '#types/Item'
import type {
  ContactInfoParameters,
  GroupSubHeaderParameters,
  Parameters,
  TextParameters,
} from '#types/ItemType'

const componentMap: Record<
  string,
  ((item: Item, parameters: Parameters) => JSX.Element) | undefined
> = {
  groupSubheaders: (item: Item, parameters: GroupSubHeaderParameters) => (
    <GroupSubHeaderView
      item={item}
      shareBaseUrl={parameters.shareBaseUrl}
      platforms={parameters.platforms}
    />
  ),
  texts: (item: Item, parameters: TextParameters) => {
    if (!(parameters.dataField in item)) {
      throw new Error(`Item does not have property ${parameters.dataField}`)
    }

    const text = item[parameters.dataField]

    if (typeof text !== 'string') {
      throw new Error(`Property ${parameters.dataField} is not a string`)
    }

    return (
      <ProfileTextView
        item={item}
        heading={parameters.heading}
        text={text}
        hideWhenEmpty={parameters.hideWhenEmpty}
      />
    )
  },
  contactInfos: (item: Item, parameters: ContactInfoParameters) => (
    <ContactInfoView item={item} heading={parameters.heading} />
  ),
  startEnd: (item: Item) => <ProfileStartEndView item={item} />,
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
          TemplateComponent(item, templateItem.item)
        ) : (
          <div key={templateItem.id}>Component not found</div>
        )
      })}
    </div>
  )
}
