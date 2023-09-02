import * as React from 'react'
import { Popup as LeafletPopup, useMap } from 'react-leaflet'
import { Item } from '../../../types'
import { ItemFormPopupProps } from './ItemFormPopup'
import { HeaderView } from './ItemPopupComponents/HeaderView'
import { TextView } from './ItemPopupComponents/TextView'

export interface ItemViewPopupProps {
  item: Item,
  children?: React.ReactNode;
  setItemFormPopup?: React.Dispatch<React.SetStateAction<ItemFormPopupProps | null>>
}

export const ItemViewPopup = (props: ItemViewPopupProps) => {
  const item: Item = props.item;

  return (
    <LeafletPopup maxHeight={377} minWidth={275} maxWidth={275} autoPanPadding={[20, 80]}>
      <div className='tw-bg-base-100 tw-text-base-content'>
        <HeaderView item={props.item} setItemFormPopup={props.setItemFormPopup} />
        <div className='tw-overflow-y-auto tw-max-h-72'>
          {props.children ?

            React.Children.toArray(props.children).map((child) =>
              React.isValidElement<{ item: Item, test: string }>(child) ?
                React.cloneElement(child, { item: props.item }) : ""
            )

            :

            <TextView item={props.item} />

          }
        </div>
      </div>
    </LeafletPopup>
  )
}

