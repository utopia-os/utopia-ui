/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

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
}: {
  state: FormState
  setState: React.Dispatch<React.SetStateAction<FormState>>
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
    <div
      className={`tw:max-h-124 tw:md:max-h-full tw:flex tw:flex-col tw:mt-2 ${size === 'full' ? 'tw:flex-1 tw:min-h-42' : 'tw:h-28 tw:flex-none'}`}
    >
      <div className='tw:flex tw:justify-between tw:items-center'>
        <label
          htmlFor='nextAppointment'
          className='tw:block tw:text-sm tw:font-medium tw:text-base-content/50 tw:mb-1'
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
        showMenu={size === 'full'}
        labelStyle={hideInputLabel ? 'tw:hidden' : ''}
        containerStyle={size === 'full' ? 'tw:flex-1' : 'tw:h-24 tw:flex-none'}
      />
    </div>
  )
}
