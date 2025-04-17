/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { ContactInfoForm } from '#components/Profile/Subcomponents/ContactInfoForm'
import { CrowdfundingForm } from '#components/Profile/Subcomponents/CrowdfundingForm'
import { GroupSubheaderForm } from '#components/Profile/Subcomponents/GroupSubheaderForm'
import { ProfileStartEndForm } from '#components/Profile/Subcomponents/ProfileStartEndForm'
import { ProfileTextForm } from '#components/Profile/Subcomponents/ProfileTextForm'

import type { FormState } from '#types/FormState'
import type { Item } from '#types/Item'

const componentMap = {
  groupSubheaders: GroupSubheaderForm,
  texts: ProfileTextForm,
  contactInfos: ContactInfoForm,
  startEnd: ProfileStartEndForm,
  crowdfundings: CrowdfundingForm,
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
