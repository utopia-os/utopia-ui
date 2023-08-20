import * as React from 'react'
import { Popup as LeafletPopup, useMap } from 'react-leaflet'
import { Item} from '../../../types'
import { ItemFormPopupProps } from './ItemFormPopup'
import {HeaderView} from './HeaderView'
import StartEndView from './StartEndView'
import { TextView } from './TextView'

export interface ItemViewPopupProps {
  item: Item,
  setItemFormPopup?: React.Dispatch<React.SetStateAction<ItemFormPopupProps | null>>
}



export const ItemViewPopup = (props: ItemViewPopupProps) => {
  const item: Item = props.item;

  return (
    <LeafletPopup maxHeight={377} minWidth={275} maxWidth={275} autoPanPadding={[20, 5]}>
      <div>
        <HeaderView item={props.item} setItemFormPopup={props.setItemFormPopup}/>
        <div className='tw-overflow-y-auto tw-max-h-72'>
        {item.start && item.end &&
        <StartEndView item={props.item} />
        }
        <TextView item={props.item}/>
        </div>
      </div>
    </LeafletPopup>
  )
}

