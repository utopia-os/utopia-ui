import * as React from 'react'
import { Item } from '../../../types'
import { FormState } from './OnepagerForm'
import { GroupSubheaderForm } from '../Subcomponents/GroupSubheaderForm'
import { ContactInfoForm } from '../Subcomponents/ContactInfoForm'
import { ProfileTextForm } from '../Subcomponents/ProfileTextForm'

const componentMap = {
  group_subheaders: GroupSubheaderForm,
  texts: ProfileTextForm,
  contact_infos: ContactInfoForm,
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
    <div className='tw-space-y-6 tw-mt-6'>
      {item.layer?.itemType.profile_template.map((templateItem) => {
        const TemplateComponent = componentMap[templateItem.collection]
        return TemplateComponent ? (
          <TemplateComponent
            key={templateItem.id}
            state={state}
            setState={setState}
            {...templateItem.item}
          />
        ) : (
          <div key={templateItem.id}>Component not found</div>
        )
      })}
    </div>
  )
}
