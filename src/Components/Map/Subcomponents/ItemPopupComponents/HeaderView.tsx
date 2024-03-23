import * as React from "react"
import { Item, ItemsApi } from "../../../../types";
import { useHasUserPermission } from "../../hooks/usePermissions";
import { getValue } from "../../../../Utils/GetValue";
import { useAssetApi } from '../../../AppShell/hooks/useAssets'
import DialogModal from "../../../Templates/DialogModal";
import { useEffect } from "react";




export function HeaderView({ item, api, editCallback, deleteCallback, itemNameField, itemAvatarField, loading, hideMenu = false, big = false }: {
  item: Item,
  api?: ItemsApi<any>,
  editCallback?: any,
  deleteCallback?: any,
  itemNameField?: string,
  itemAvatarField?: string,
  loading?: boolean,
  hideMenu?: boolean,
  big?: boolean
}) {


  const [modalOpen, setModalOpen] = React.useState<boolean>(false);


  const hasUserPermission = useHasUserPermission();


  const assetsApi = useAssetApi();


  const avatar = itemAvatarField && getValue(item, itemAvatarField) ? assetsApi.url + getValue(item, itemAvatarField) + `${big ? "?width=160&heigth=160": "?width=80&heigth=80"}` : item.layer?.itemAvatarField && item && getValue(item, item.layer?.itemAvatarField) && assetsApi.url + getValue(item, item.layer?.itemAvatarField) + `${big ? "?width=160&heigth=160": "?width=80&heigth=80"}`;
  const title = itemNameField ? getValue(item, itemNameField) : item.layer?.itemNameField && item && getValue(item, item.layer?.itemNameField);


  const openDeleteModal = async (event: React.MouseEvent<HTMLElement>) => {
    setModalOpen(true);
    event.stopPropagation();
  }



  return (
    <>
    <div className='tw-flex tw-flex-row'>
        <div className="tw-grow">
        <div className={`${big ? "tw-text-3xl " : "tw-text-xl "} tw-font-semibold`}>
        {avatar &&
                                <img className={`${big ? "tw-w-20" : "tw-w-10"} tw-inline tw-rounded-full`} src={avatar}></img>}
                                <span className={`${avatar ? "tw-ml-2" : ""}`}>{title&& title}</span>

        </div>      </div>
        <div onClick={(e) => e.stopPropagation()} className={`${big ? "tw-mt-5":"tw-mt-1"}`}>
          {(api?.deleteItem || item.layer?.api?.updateItem)
            && (hasUserPermission(api?.collectionName!, "delete", item) || hasUserPermission(api?.collectionName!, "update", item))
            && !hideMenu &&
            <div className="tw-dropdown tw-dropdown-bottom">
              <label tabIndex={0} className="tw-bg-base-100 tw-btn tw-m-1 tw-leading-3 tw-border-none tw-min-h-0 tw-h-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="tw-h-5 tw-w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </label>
              <ul tabIndex={0} className="tw-dropdown-content tw-menu tw-p-2 tw-shadow tw-bg-base-100 tw-rounded-box tw-z-1000">
                {((api?.updateItem && hasUserPermission(api.collectionName!, "update", item)) || item.layer?.customEditLink) && <li>
                  <a className="!tw-text-base-content tw-cursor-pointer" onClick={editCallback}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="tw-h-5 tw-w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </a>
                </li>}

                {api?.deleteItem && hasUserPermission(api.collectionName!, "delete", item) && <li>
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
      <DialogModal isOpened={modalOpen} title="Are you sure?" showCloseButton={false} onClose={() => (setModalOpen(false))} >
        <div onClick={(e) => e.stopPropagation()} >
          <span>Do you want to delete <b>{item.name}</b>?</span>
          <div className="tw-grid">
            <div className="tw-flex tw-justify-between" >
              <label className="tw-btn tw-mt-4 tw-btn-error" onClick={(e) => { deleteCallback(e); setModalOpen(false); }}>Yes</label>
              <label className="tw-btn tw-mt-4" onClick={() => setModalOpen(false)}>No</label>
            </div>
          </div>
        </div>
      </DialogModal>
    </>
  )
}
