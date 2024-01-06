import * as React from 'react'
import { Link } from 'react-router-dom'
import { getValue } from '../../../../Utils/GetValue'
import { Item } from '../../../../types'

export const PopupButton = ({url, parameterField, text, color = 'oklch(var(--p))', colorField, item} : {url: string, parameterField?: string, text: string, color? : string, colorField?: string, item? : Item}) => {
    return (
        <Link to={`${url}/${parameterField? getValue(item,parameterField):``}`}><button style={{backgroundColor: `${colorField? getValue(item,colorField) : color}`}} className="tw-btn tw-text-white tw-btn-sm tw-float-right -tw-mt-2">{text}</button></Link>
        
    )
}
