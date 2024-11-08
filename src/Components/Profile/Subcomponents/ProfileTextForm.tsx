import * as React from 'react'
import { TextAreaInput } from '../../Input'
import { FormState } from '../Templates/OnepagerForm'
import { getValue } from '../../../Utils/GetValue'
import { useEffect, useState } from 'react'

export const ProfileTextForm = ({
  state,
  setState,
  dataField,
  heading,
  size,
  hideInputLabel,
}: {
  state: FormState
  setState: React.Dispatch<React.SetStateAction<any>>
  dataField?: string
  heading: string
  size: string
  hideInputLabel: boolean
}) => {
  const [field, setField] = useState<string>(dataField || 'text')

  useEffect(() => {
    if (!dataField) {
      setField('text')
    }
  }, [dataField])

  return (
    <div className='tw-h-full tw-flex tw-flex-col tw-mt-4'>
      <label
        htmlFor='nextAppointment'
        className='tw-block tw-text-sm tw-font-medium tw-text-gray-500 tw-mb-1'
      >
        {heading || 'Text'}:
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
        labelStyle={hideInputLabel ? 'tw-hidden' : ''}
        containerStyle={size === 'full' ? 'tw-grow tw-h-full' : ''}
        inputStyle={size === 'full' ? 'tw-h-full' : 'tw-h-24'}
      />
    </div>
  )
}
