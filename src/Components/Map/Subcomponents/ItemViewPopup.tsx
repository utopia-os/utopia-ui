import * as React from 'react'
import { Popup as LeafletPopup } from 'react-leaflet'
import { Item } from '../../../types'
import { ItemFormPopupProps } from './ItemFormPopup'
import { HeaderView } from './ItemPopupComponents/HeaderView'
import { TextView } from './ItemPopupComponents/TextView'
import { useAssetApi } from '../../AppShell/hooks/useAssets'
import { timeAgo } from '../../../Utils/TimeAgo'
import { useState } from 'react'


export interface ItemViewPopupProps {
  item: Item,
  children?: React.ReactNode;
  title?: string;
  avatar?: string;
  owner?: string,
  setItemFormPopup?: React.Dispatch<React.SetStateAction<ItemFormPopupProps | null>>
}


export const ItemViewPopup = React.forwardRef((props: ItemViewPopupProps, ref: any) => {

  const [infoExpanded, setInfoExpanded] = useState<Boolean>(false);

  return (
    <LeafletPopup ref={ref} maxHeight={377} minWidth={275} maxWidth={275} autoPanPadding={[20, 80]}>
      <div className='tw-bg-base-100 tw-text-base-content'>
        <HeaderView item={props.item} title={props.title} avatar={props.avatar} owner={props.owner} setItemFormPopup={props.setItemFormPopup} />
        <div className='tw-overflow-y-auto tw-overflow-x-hidden tw-max-h-64'>
          {props.children ?

            React.Children.toArray(props.children).map((child) =>
              React.isValidElement<{ item: Item, test: string }>(child) ?
                React.cloneElement(child, { item: props.item }) : ""
            )

            :

            <TextView item={props.item} />

          }

        </div>
        <div className='tw-flex -tw-mb-1 tw-flex-row tw-mr-2'>


          {
            infoExpanded ?
              <p className={`tw-italic tw-min-h-[21px] !tw-my-0 tw-text-gray-500 tw-cursor-pointer`} onClick={() => setInfoExpanded(false)}>{`posted ${props.item && props.item.user_created && props.item.user_created.first_name ? `by ${props.item.user_created.first_name}` : ""} ${timeAgo(props.item.date_created!)}`}</p>
              :
              <p className="!tw-my-0 tw-min-h-[21px] tw-font-bold tw-cursor-pointer tw-text-gray-500" onClick={() => setInfoExpanded(true)}>ⓘ</p>
          }
          <div className='tw-grow'></div>
{ //**        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="tw-place-self-end tw-w-4 tw-h-4 tw-mb-1 tw-cursor-pointer"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg> */ 
 }
        </div>
      </div>
    </LeafletPopup>
  )
})

