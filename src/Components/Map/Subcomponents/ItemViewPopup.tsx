import * as React from 'react'
import { Popup as LeafletPopup } from 'react-leaflet'
import { Item } from '../../../types'
import { ItemFormPopupProps } from './ItemFormPopup'
import { HeaderView } from './ItemPopupComponents/HeaderView'
import { TextView } from './ItemPopupComponents/TextView'
import { useAssetApi } from '../../AppShell/hooks/useAssets'
import { timeAgo } from '../../../Utils/TimeAgo'


export interface ItemViewPopupProps {
  item: Item,
  children?: React.ReactNode;
  title?: string;
  avatar?: string;
  setItemFormPopup?: React.Dispatch<React.SetStateAction<ItemFormPopupProps | null>>
}


export const ItemViewPopup = React.forwardRef((props: ItemViewPopupProps, ref: any) => {



  return (
    <LeafletPopup ref={ref} maxHeight={377} minWidth={275} maxWidth={275} autoPanPadding={[20, 80]}>
      <div className='tw-bg-base-100 tw-text-base-content'>
        <HeaderView item={props.item} title={props.title} avatar={props.avatar} setItemFormPopup={props.setItemFormPopup} />
        <div className='tw-overflow-y-auto tw-max-h-72'>
          {props.children ?

            React.Children.toArray(props.children).map((child) =>
              React.isValidElement<{ item: Item, test: string }>(child) ?
                React.cloneElement(child, { item: props.item }) : ""
            )

            :

            <TextView item={props.item} />

          }
          <p className={`tw-italic !tw-my-0 tw-text-gray-500 tw-float-right`}>{`posted ${props.item && props.item.user_created &&  props.item.user_created.first_name? `by ${props.item.user_created.first_name}` : ""} ${timeAgo(props.item.date_created!)}`}</p>

        </div>
      </div>
    </LeafletPopup>
  )
})

