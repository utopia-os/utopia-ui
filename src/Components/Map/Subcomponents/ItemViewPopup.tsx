import * as React from 'react'
import { Popup as LeafletPopup, useMap } from 'react-leaflet'
import { Item } from '../../../types'
import { ItemFormPopupProps } from './ItemFormPopup'
import { HeaderView } from './ItemPopupComponents/HeaderView'
import { TextView } from './ItemPopupComponents/TextView'
import { timeAgo } from '../../../Utils/TimeAgo'
import { useEffect, useState } from 'react'
import { LatLng } from 'leaflet'
import { useNavigate } from 'react-router-dom'
import { useRemoveItem, useUpdateItem } from '../hooks/useItems'
import { toast } from 'react-toastify'
import { useSetSelectPosition } from '../hooks/useSelectPosition'


export interface ItemViewPopupProps {
  item: Item,
  children?: React.ReactNode;
  setItemFormPopup?: React.Dispatch<React.SetStateAction<ItemFormPopupProps | null>>
}




export const ItemViewPopup = React.forwardRef((props: ItemViewPopupProps, ref: any) => {
  const map = useMap();
  const [loading, setLoading] = React.useState<boolean>(false);
  const removeItem = useRemoveItem();
  const updadateItem = useUpdateItem();
  const navigate = useNavigate();
  const setSelectPosition = useSetSelectPosition();


  const [infoExpanded, setInfoExpanded] = useState<boolean>(false);

  const handleEdit = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    map.closePopup();
    props.setItemFormPopup && props.setItemFormPopup({ position: new LatLng(props.item.position?.coordinates[1]!, props.item.position?.coordinates[0]!), layer: props.item.layer!, item: props.item, setItemFormPopup: props.setItemFormPopup })
  }

  const handleDelete = async (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setLoading(true);
    let success = false;
    try {
      !props.item.layer?.onlyOnePerOwner && await props.item.layer?.api?.deleteItem!(props.item.id);
      props.item.layer?.onlyOnePerOwner && await props.item.layer.api?.updateItem!({id: props.item.id, position: null})
      success = true;
    } catch (error) {
      toast.error(error.toString());
    }
    if (success) {
      !props.item.layer?.onlyOnePerOwner && removeItem(props.item);
      props.item.layer?.onlyOnePerOwner && updadateItem({...props.item, position: undefined});
      toast.success("Item deleted");
    }
    setLoading(false);
    map.closePopup();
    const params = new URLSearchParams(window.location.search);
    window.history.pushState({}, "", "/" + `${params ? `?${params}` : ""}`);
    navigate("/");
  }


  return (
    <LeafletPopup ref={ref} maxHeight={377} minWidth={275} maxWidth={275} autoPanPadding={[20, 80]}>
      <div className='tw-bg-base-100 tw-text-base-content'>
        <HeaderView api={props.item.layer?.api} item={props.item} editCallback={handleEdit} deleteCallback={handleDelete} setPositionCallback={()=>{map.closePopup();setSelectPosition(props.item); navigate("/")}} loading={loading}/>
        <div className='tw-overflow-y-auto tw-overflow-x-hidden tw-max-h-64 fade'>
          {props.children ?

            React.Children.toArray(props.children).map((child) =>
              React.isValidElement<{ item: Item, test: string }>(child) ?
                React.cloneElement(child, { item: props.item }) : ""
            )

            :

            <TextView item={props.item} />

          }

        </div>
        <div className='tw-flex -tw-mb-1 tw-flex-row tw-mr-2 tw-mt-1'>


          {
            infoExpanded ?
            <p className={`tw-italic tw-min-h-[21px] !tw-my-0 tw-text-gray-500`} >{`${props.item.date_updated &&  props.item.date_updated != props.item.date_created ? "updated" : "posted" } ${props.item && props.item.user_created && props.item.user_created.first_name ? `by ${props.item.user_created.first_name}` : ""} ${props.item.date_updated ? timeAgo(props.item.date_updated) : timeAgo(props.item.date_created!)}`}</p>
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

