import { Link } from 'react-router-dom'
import { getValue } from '../../../../Utils/GetValue'
import { Item } from '../../../../types'
import { useGetItemTags } from '../../hooks/useTags';


export const PopupButton = ({url, parameterField, text, colorField, item} : {url: string, parameterField?: string, text: string, colorField?: string, item? : Item}) => {

    let params = new URLSearchParams(window.location.search);
    const getItemTags = useGetItemTags();

    

    
    return (
        <Link to={`${url}/${parameterField? getValue(item,parameterField):``}?${params}`}><button style={{backgroundColor: `${colorField && getValue(item,colorField)? getValue(item,colorField) : (item && getItemTags(item) && getItemTags(item)[0] && getItemTags(item)[0].color ? getItemTags(item)[0].color : item?.layer?.markerDefaultColor)}`}} className="tw-btn tw-text-white tw-btn-sm tw-float-right tw-mt-1">{text}</button></Link>
        
    )
}
