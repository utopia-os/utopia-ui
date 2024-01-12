import * as React from 'react'
import { Link } from 'react-router-dom'
import { getValue } from '../../../../Utils/GetValue'
import { Item } from '../../../../types'

export const PopupButton = ({url, parameterField, text, colorField, item} : {url: string, parameterField?: string, text: string, colorField?: string, item? : Item}) => {
    return (
        <Link to={`${url}/${parameterField? getValue(item,parameterField):``}`}><button style={{backgroundColor: `${colorField && getValue(item,colorField)? getValue(item,colorField) : item?.layer?.markerDefaultColor}`}} className="tw-btn tw-text-white tw-btn-sm tw-float-right">{text}</button></Link>
        
    )
}
