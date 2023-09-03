import * as React from "react"
import { useRemoveItem } from "../../hooks/useItems";
import { useMap } from "react-leaflet";
import { ItemFormPopupProps } from "../ItemFormPopup";
import { LatLng } from "leaflet";
import { Item } from "../../../../types";
import { toast } from "react-toastify";



export function HeaderView({ item, setItemFormPopup }: {
  item: Item,
  setItemFormPopup?: React.Dispatch<React.SetStateAction<ItemFormPopupProps | null>>
}) {

  const [loading, setLoading] = React.useState<boolean>(false);
  const removeItem = useRemoveItem();

  const map = useMap();

  const removeItemFromMap = async (event: React.MouseEvent<HTMLElement>) => {
    setLoading(true);
    let success = false;
    try {
        await item.layer.api?.deleteItem!(item.id)
        success = true;
    } catch (error) {
        toast.error(error.toString());
    }
    if(success) {
      removeItem(item);
        toast.success("Item deleted");
    } 
    setLoading(false);
    map.closePopup();

    event.stopPropagation();
  }

  const openEditPopup = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    map.closePopup();
    if (setItemFormPopup)
      setItemFormPopup({ position: new LatLng(item.position.coordinates[1], item.position.coordinates[0]), layer: item.layer, item: item, setItemFormPopup: setItemFormPopup })
  }

  return (
    <div className='tw-grid tw-grid-cols-6 tw-pb-2'>
      <div className='tw-col-span-5'>
        <b className="tw-text-xl tw-font-bold">{item.name}</b>
      </div>
      <div className='tw-col-span-1'>
        {item.layer.api &&
          <div className="tw-dropdown tw-dropdown-bottom">
            <label tabIndex={0} className="tw-bg-base-100 tw-btn tw-m-1 tw-leading-3 tw-border-none tw-min-h-0 tw-h-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="tw-h-5 tw-w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </label>
            <ul tabIndex={0} className="tw-dropdown-content tw-menu tw-p-2 tw-shadow tw-bg-base-100 tw-rounded-box">
              {item.layer.api.updateItem && <li>
                <a className="!tw-text-base-content" onClick={openEditPopup}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="tw-h-5 tw-w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </a>
              </li>}

              {item.layer.api.deleteItem && <li>
                <a className=' !tw-text-error' onClick={removeItemFromMap}>
                  {loading ? <span className="tw-loading tw-loading-spinner tw-loading-sm"></span>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" className="tw-h-5 tw-w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>}
                </a>
              </li>}
            </ul>
          </div>}
      </div>
    </div>
  )
}