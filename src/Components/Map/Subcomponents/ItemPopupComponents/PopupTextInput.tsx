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
        <TextInput defaultValue={item?.text ? item.text : ""} dataField={dataField} placeholder={placeholder} inputStyle={style}></TextInput>
    )
}
