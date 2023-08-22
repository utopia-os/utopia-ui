import * as React from 'react'
import { TextInput } from '../../../Input'
import { Item } from '../../../../types'

export const PopupStartEndInput = ({item}:{item?:Item}) => {
    return (
        <div className='tw-grid tw-grid-cols-2 tw-gap-2 tw-mb-5'>
                <TextInput type='date' placeholder='start' dataField='start' inputStyle='tw-text-sm tw-px-2' labelTitle='start' defaultValue={item && item.start? item.start.substring(0, 10) : ""}></TextInput>
                <TextInput type='date' placeholder='end' dataField='end' inputStyle='tw-text-sm tw-px-2' labelTitle='end' defaultValue={item && item.end ? item.end.substring(0, 10) : ""}></TextInput>
        </div>
      )
}
