/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'

import { RichTextEditor } from '#components/Input/RichTextEditor'

import { MarkdownHint } from './MarkdownHint'

import type { FormState } from '#types/FormState'

export const ProfileTextForm = ({
  state,
  setState,
  // Is this really used?
  dataField,
  heading,
  size,
  hideInputLabel,
  required,
}: {
  state: FormState
  setState: React.Dispatch<React.SetStateAction<any>>
  dataField?: string
  heading: string
  size: string
  hideInputLabel: boolean
  required?: boolean
}) => {
  const [field, setField] = useState<string>(dataField || 'text')

  useEffect(() => {
    if (!dataField) {
      setField('text')
    }
  }, [dataField])

  return (
    <div className='tw:h-full tw:flex tw:flex-col tw:mt-4'>
      <div className='tw:flex tw:justify-between tw:items-center'>
        <label
          htmlFor='nextAppointment'
          className='tw:block tw:text-sm tw:font-medium tw:text-gray-500 tw:mb-1'
        >
          {heading || 'Text'}:
        </label>
        <MarkdownHint />
      </div>
      <RichTextEditor
        placeholder={'...'}
        // eslint-disable-next-line security/detect-object-injection
        defaultValue={state[field]}
        updateFormValue={(v) =>
          setState((prevState) => ({
            ...prevState,
            [field]: v,
          }))
        }
        labelStyle={hideInputLabel ? 'tw:hidden' : ''}
        containerStyle={size === 'full' ? 'tw:grow tw:h-full' : ''}
        inputStyle={size === 'full' ? 'tw:h-full' : 'tw:h-24'}
        required={required}
        size={size}
      />
    </div>
  )
}
