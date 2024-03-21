import * as React from "react"
import { useRemoveItem } from "../../hooks/useItems";
import { useMap } from "react-leaflet";
import { ItemFormPopupProps } from "../ItemFormPopup";
import { LatLng } from "leaflet";
import { Item } from "../../../../types";
import { toast } from "react-toastify";
import { useHasUserPermission } from "../../hooks/usePermissions";
import { useAuth } from "../../../Auth";
import { getValue } from "../../../../Utils/GetValue";
import { useAssetApi } from '../../../AppShell/hooks/useAssets'
import DialogModal from "../../../Templates/DialogModal";
import { useNavigate } from "react-router-dom";




export function HeaderView({ item, setItemFormPopup, hideMenu=false }: {
  item: Item,
  setItemFormPopup?: React.Dispatch<React.SetStateAction<ItemFormPopupProps | null>>,
  hideMenu?: boolean
}) {


  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const [loading, setLoading] = React.useState<boolean>(false);
  const removeItem = useRemoveItem();

  const map = useMap();
  const hasUserPermission = useHasUserPermission();

  const { user } = useAuth();

  const assetsApi = useAssetApi();
  const navigate = useNavigate();

  const avatar = item.layer?.itemAvatarField && item  && getValue(item, item.layer?.itemAvatarField)? assetsApi.url + getValue(item, item.layer?.itemAvatarField ) : undefined;
  const title = item.layer?.itemNameField && item ? getValue(item, item.layer?.itemNameField) : undefined;
  const owner = item.layer?.itemOwnerField && item ? getValue(item, item.layer?.itemOwnerField) : undefined;



  const removeItemFromMap = async (event: React.MouseEvent<HTMLElement>) => {
    setLoading(true);
    let success = false;
    try {
      await item.layer?.api?.deleteItem!(item.id)
      success = true;
    } catch (error) {
      toast.error(error.toString());
    }
    if (success) {
      removeItem(item);
      toast.success("Item deleted");
    }
    setLoading(false);
    map.closePopup();
    let params = new URLSearchParams(window.location.search);
    window.history.pushState({}, "", "/" + `${params? `?${params}` : ""}`);
    event.stopPropagation();
  }

  const openDeleteModal = async (event: React.MouseEvent<HTMLElement>) => {
    setModalOpen(true);
    event.stopPropagation();
  }

  const openEditPopup = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    map.closePopup();
    if (setItemFormPopup && item.position)
      setItemFormPopup({ position: new LatLng(item.position.coordinates[1], item.position.coordinates[0]), layer: item.layer!, item: item, setItemFormPopup: setItemFormPopup })
  }


  return (
    <>
    <div className='tw-grid tw-grid-cols-6 tw-pb-2'>
      <div className='tw-col-span-5'>
        <div className="tw-flex tw-flex-row">{
          avatar ?
            <div className="tw-w-10 tw-min-w-[2.5em] tw-rounded-full">
              <img className="tw-rounded-full" src={`${avatar}?width=80&height=80`} />
            </div>
            :
            ""
        }
            <b className={`tw-text-xl tw-font-bold ${avatar ? "tw-ml-2 tw-mt-1" : ""}`}>{title ? title : item.name}</b>

        </div>
      </div>
      <div className='tw-col-span-1'>
        {(item.layer?.api?.deleteItem || item.layer?.api?.updateItem)
        && ((user && owner?.id === user.id) || owner == undefined)
        && (hasUserPermission(item.layer.api?.collectionName!, "delete") || hasUserPermission(item.layer.api?.collectionName!, "update"))
        && !hideMenu &&
          <div className="tw-dropdown tw-dropdown-bottom">
            <label tabIndex={0} className="tw-bg-base-100 tw-btn tw-m-1 tw-leading-3 tw-border-none tw-min-h-0 tw-h-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="tw-h-5 tw-w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </label>
            <ul tabIndex={0} className="tw-dropdown-content tw-menu tw-p-2 tw-shadow tw-bg-base-100 tw-rounded-box tw-z-1000">
              {((item.layer.api.updateItem && hasUserPermission(item.layer.api?.collectionName!, "update")) || item.layer.customEditLink) && <li>
                <a className="!tw-text-base-content tw-cursor-pointer" onClick={(e) => {
                  item.layer?.customEditLink && navigate(item.layer.customEditLink);
                  !item.layer?.customEditLink && openEditPopup(e);
                  }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="tw-h-5 tw-w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </a>
              </li>}

              {item.layer.api.deleteItem && hasUserPermission(item.layer.api?.collectionName!, "delete") && <li>
                <a className='tw-cursor-pointer !tw-text-error' onClick={openDeleteModal}>
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
    <DialogModal isOpened={modalOpen} title="Are you sure?" showCloseButton={false} onClose={ () => (setModalOpen(false)) }>
      <span>Do you want to delete <b>{item.name}</b>?</span>
      <div className="tw-grid">
        <div className="tw-flex tw-justify-between">
                <label className="tw-btn tw-mt-4 tw-btn-error" onClick={removeItemFromMap}>Yes</label>
                <label className="tw-btn tw-mt-4" onClick={() => setModalOpen(false)}>No</label>
                </div>
            </div>
    </DialogModal>
    </>
  )
}
