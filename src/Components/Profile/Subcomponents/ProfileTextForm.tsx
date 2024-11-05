/* eslint-disable camelcase */
import * as React from 'react'
import { TextAreaInput } from '../../Input'
import { FormState } from '../Templates/OnepagerForm'
import { getValue } from '../../../Utils/GetValue'
import { useEffect, useState } from 'react'

export const ProfileTextForm = ({
  state,
  setState,
  data_field,
  section_name,
}: {
  state: FormState
  setState: React.Dispatch<React.SetStateAction<any>>
  data_field?: string
  section_name: string
}) => {
  const [field, setField] = useState<string>(data_field || 'text')

  useEffect(() => {
    if (!data_field) {
      setField('text')
    }
  }, [data_field])

  return (
    <div>
      <label
        htmlFor='nextAppointment'
        className='tw-block tw-text-sm tw-font-medium tw-text-gray-500 tw-mb-1'
      >
        {section_name || 'Text'}:
      </label>
      <TextAreaInput
        placeholder={'...'}
        defaultValue={getValue(state, field)}
        updateFormValue={(v) =>
          setState((prevState) => ({
            ...prevState,
            [field]: v,
          }))
        }
        inputStyle='tw-h-24'
      />
    </div>
  )
}
