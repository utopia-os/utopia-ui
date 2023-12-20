import * as React from 'react'
import { Popup as LeafletPopup} from 'react-leaflet'
import { Item } from '../../../types'
import { ItemFormPopupProps } from './ItemFormPopup'
import { HeaderView } from './ItemPopupComponents/HeaderView'
import { TextView } from './ItemPopupComponents/TextView'
import { useAssetApi } from '../../AppShell/hooks/useAssets'


export interface ItemViewPopupProps {
  item: Item,
  children?: React.ReactNode;
  itemTitleField?: string;
  itemAvatarField?: string;
  setItemFormPopup?: React.Dispatch<React.SetStateAction<ItemFormPopupProps | null>>
}

function getValue(obj, path) {
  if(obj){
    for (var i=0, path=path.split('.'), len=path.length; i<len; i++){
      obj = obj[path[i]];
  };
  return obj;
  }

};


export const ItemViewPopup = React.forwardRef((props: ItemViewPopupProps, ref: any) => {

  const assetsApi = useAssetApi();

  return (
    <LeafletPopup ref={ref} maxHeight={377} minWidth={275} maxWidth={275} autoPanPadding={[20, 80]}>
      <div className='tw-bg-base-100 tw-text-base-content'>
        <HeaderView item={props.item} title={props.itemTitleField && props.item? getValue(props.item,props.itemTitleField) : undefined} avatar={props.itemAvatarField && props.item? assetsApi.url+getValue(props.item,props.itemAvatarField) : undefined} setItemFormPopup={props.setItemFormPopup} />
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
})

