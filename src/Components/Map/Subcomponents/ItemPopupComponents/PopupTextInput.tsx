import * as React from 'react'
import { TextInput } from '../../../Input'
import { Item } from '../../../../types'

export const PopupTextInput = ({ dataField, placeholder, style, item }:
    {
        dataField: string,
        placeholder: string,
        style?: string,
        item?: Item
    }) => {

    return (
        <TextInput defaultValue={item?.name ? item.name : ""} dataField={dataField} placeholder={placeholder} inputStyle={style} type='text' containerStyle={'tw-mt-4 tw-mb-4'}></TextInput>
    )
}
