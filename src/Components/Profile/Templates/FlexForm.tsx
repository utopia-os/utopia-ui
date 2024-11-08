import * as React from 'react'
import { Item } from '../../../types'
import { FormState } from './OnepagerForm'
import { GroupSubheaderForm } from '../Subcomponents/GroupSubheaderForm'
import { ContactInfoForm } from '../Subcomponents/ContactInfoForm'
import { ProfileTextForm } from '../Subcomponents/ProfileTextForm'
import { ProfileStartEndForm } from '../Subcomponents/ProfileStartEndForm'

const componentMap = {
  groupSubheaders: GroupSubheaderForm,
  texts: ProfileTextForm,
  contactInfos: ContactInfoForm,
  startEnd: ProfileStartEndForm,
  // weitere Komponenten hier
}

export const FlexForm = ({
  item,
  state,
  setState,
}: {
  state: FormState
  setState: React.Dispatch<React.SetStateAction<any>>
  item: Item
}) => {
  return (
    <div className='tw-mt-6 tw-flex tw-flex-col tw-h-full'>
      {item.layer?.itemType.profileTemplate.map((templateItem) => {
        const TemplateComponent = componentMap[templateItem.collection]
        return TemplateComponent ? (
          <TemplateComponent
            key={templateItem.id}
            state={state}
            setState={setState}
            item={item}
            {...templateItem.item}
          />
        ) : (
          <div key={templateItem.id}>Component not found</div>
        )
      })}
    </div>
  )
}
