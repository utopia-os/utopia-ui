import * as React from 'react'
import { TextInput } from '../../../Input'
import { Item } from '../../../../types'

export const PopupCheckboxInput = ({ dataField, label, item }:
    {
        dataField: string,
        label: string,
        item?: Item
    }) => {

    return (
        <label htmlFor={item?.id} className="tw-label tw-justify-normal tw-pt-1 tw-pb-1"><input id={item?.id} type="checkbox" name={dataField} className="tw-checkbox tw-checkbox-xs tw-checkbox-success" checked={item?.public_edit} /><span className='tw-text-sm tw-label-text tw-mx-2 tw-cursor-pointer'>{label}</span></label>
    )
}
