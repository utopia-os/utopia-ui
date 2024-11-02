import * as React from 'react'
import { TextInput } from '../../../Input'
import { Item } from '../../../../types'

type StartEndInputProps = {
  item?: Item
  showLabels?: boolean
  updateStartValue?: (value: string) => void
  updateEndValue?: (value: string) => void
}

export const PopupStartEndInput = ({
  item,
  showLabels = true,
  updateStartValue,
  updateEndValue,
}: StartEndInputProps) => {
  return (
    <div className='tw-grid tw-grid-cols-2 tw-gap-2 tw-mb-5'>
      <TextInput
        type='date'
        placeholder='start'
        dataField='start'
        inputStyle='tw-text-sm tw-px-2'
        labelTitle={showLabels ? 'start' : ''}
        defaultValue={item && item.start ? item.start.substring(0, 10) : ''}
        autocomplete='one-time-code'
        updateFormValue={updateStartValue}
      ></TextInput>
      <TextInput
        type='date'
        placeholder='end'
        dataField='end'
        inputStyle='tw-text-sm tw-px-2'
        labelTitle={showLabels ? 'end' : ''}
        defaultValue={item && item.end ? item.end.substring(0, 10) : ''}
        autocomplete='one-time-code'
        updateFormValue={updateEndValue}
      ></TextInput>
    </div>
  )
}
