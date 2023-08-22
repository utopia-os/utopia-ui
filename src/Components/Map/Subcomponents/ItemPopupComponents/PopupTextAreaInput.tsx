import * as React from 'react'
import { TextAreaInput } from '../../../Input'
import { Item } from '../../../../types'

export const PopupTextAreaInput = ({ dataField, placeholder, style, item }:
    {
        dataField: string,
        placeholder: string,
        style?: string,
        item?: Item
    }) => {

    return (
        <TextAreaInput defaultValue={item?.text ? item.text : ""} dataField={dataField} placeholder={placeholder} inputStyle={style}></TextAreaInput>
    )
}
