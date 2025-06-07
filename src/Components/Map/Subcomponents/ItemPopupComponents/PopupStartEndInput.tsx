/* eslint-disable @typescript-eslint/prefer-optional-chain */
import { TextInput } from '#components/Input'

import type { Item } from '#types/Item'

export interface StartEndInputProps {
  item?: Item
  showLabels?: boolean
  labelStyle?: string
  updateStartValue?: (value: string) => void
  updateEndValue?: (value: string) => void
}

/**
 * @category Map
 */
export const PopupStartEndInput = ({
  item,
  showLabels = true,
  labelStyle,
  updateStartValue,
  updateEndValue,
}: StartEndInputProps) => {
  return (
    <div className='tw:grid tw:grid-cols-2 tw:gap-2'>
      <TextInput
        type='date'
        placeholder='start'
        dataField='start'
        inputStyle='tw:text-sm tw:px-2'
        labelTitle={showLabels ? 'Start' : ''}
        labelStyle={labelStyle}
        defaultValue={item && item.start ? item.start.substring(0, 10) : ''}
        autocomplete='one-time-code'
        updateFormValue={updateStartValue}
      ></TextInput>
      <TextInput
        type='date'
        placeholder='end'
        dataField='end'
        inputStyle='tw:text-sm tw:px-2'
        labelTitle={showLabels ? 'End' : ''}
        labelStyle={labelStyle}
        defaultValue={item && item.end ? item.end.substring(0, 10) : ''}
        autocomplete='one-time-code'
        updateFormValue={updateEndValue}
      ></TextInput>
    </div>
  )
}
