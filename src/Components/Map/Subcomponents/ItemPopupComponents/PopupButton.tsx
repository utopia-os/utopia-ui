import * as React from 'react'
import { Link } from 'react-router-dom'
import { getValue } from '../../../../Utils/GetValue'
import { Item } from '../../../../types'

export const PopupButton = ({url, parameter, text, color, item} : {url: string, parameter: string, text: string, color : string, item? : Item}) => {
    return (
        <Link to={`${url}/${getValue(item,parameter)}`}><button style={{backgroundColor: getValue(item,color)}} className="tw-btn tw-text-white tw-btn-sm tw-float-right -tw-mt-2">{text}</button></Link>
        
    )
}
