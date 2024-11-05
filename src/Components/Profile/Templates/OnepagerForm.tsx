import * as React from 'react'
import { Item, Tag } from '../../../types'
import { TextAreaInput } from '../../Input'
import { GroupSubheaderForm } from '../Subcomponents/GroupSubheaderForm'
import { ContactInfoForm } from '../Subcomponents/ContactInfoForm'

export type FormState = {
  color: string
  id: string
  group_type: string
  status: string
  name: string
  subname: string
  text: string
  contact: string
  telephone: string
  next_appointment: string
  image: string
  marker_icon: string
  offers: Tag[]
  needs: Tag[]
  relations: Item[]
}

export const OnepagerForm = ({
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
      <GroupSubheaderForm state={state} setState={setState} item={item}></GroupSubheaderForm>
      <ContactInfoForm state={state} setState={setState}></ContactInfoForm>

      <div>
        <label
          htmlFor='description'
          className='tw-block tw-text-sm tw-font-medium tw-text-gray-500 tw-mb-1'
        >
          Gruppenbeschreibung:
        </label>
        <TextAreaInput
          placeholder='Beschreibung'
          defaultValue={state.text || ''}
          updateFormValue={(v) =>
            setState((prevState) => ({
              ...prevState,
              text: v,
            }))
          }
          inputStyle='tw-h-48'
        />
      </div>
    </div>
  )
}
