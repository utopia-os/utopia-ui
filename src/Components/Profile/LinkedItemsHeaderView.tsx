import * as React from "react"
import { getValue } from "../../Utils/GetValue";
import { Item, ItemsApi } from "../../types";
import { useAssetApi } from "../AppShell/hooks/useAssets";
import { useHasUserPermission } from "../Map/hooks/usePermissions";




export function LinkedItemsHeaderView({ item, unlinkCallback, itemNameField, itemAvatarField, loading }: {
  item: Item,
  unlinkCallback?: any,
  itemNameField?: string,
  itemAvatarField?: string,
  loading?: boolean,
}) {

  const assetsApi = useAssetApi();


  const avatar = itemAvatarField && getValue(item, itemAvatarField) ? assetsApi.url + getValue(item, itemAvatarField) : item.layer?.itemAvatarField && item && getValue(item, item.layer?.itemAvatarField) && assetsApi.url + getValue(item, item.layer?.itemAvatarField);
  const title = itemNameField ? getValue(item, itemNameField) : item.layer?.itemNameField && item && getValue(item, item.layer?.itemNameField);



  const hasUserPermission = useHasUserPermission();

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
        <div className='tw-col-span-1' onClick={(e) => e.stopPropagation()}>
          { hasUserPermission("items", "update", item) &&
            <div className="tw-dropdown tw-dropdown-bottom">
              <label tabIndex={0} className="tw-bg-base-100 tw-btn tw-m-1 tw-leading-3 tw-border-none tw-min-h-0 tw-h-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="tw-h-5 tw-w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </label>
              <ul tabIndex={0} className="tw-dropdown-content tw-menu tw-p-2 tw-shadow tw-bg-base-100 tw-rounded-box tw-z-1000">
                {true && <li>
                  <a className='tw-cursor-pointer !tw-text-error' onClick={() => unlinkCallback(item.id)}>
                    {loading ? <span className="tw-loading tw-loading-spinner tw-loading-sm"></span>
                      :
                      <svg className="tw-h-5 tw-w-5"  stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M304.083 405.907c4.686 4.686 4.686 12.284 0 16.971l-44.674 44.674c-59.263 59.262-155.693 59.266-214.961 0-59.264-59.265-59.264-155.696 0-214.96l44.675-44.675c4.686-4.686 12.284-4.686 16.971 0l39.598 39.598c4.686 4.686 4.686 12.284 0 16.971l-44.675 44.674c-28.072 28.073-28.072 73.75 0 101.823 28.072 28.072 73.75 28.073 101.824 0l44.674-44.674c4.686-4.686 12.284-4.686 16.971 0l39.597 39.598zm-56.568-260.216c4.686 4.686 12.284 4.686 16.971 0l44.674-44.674c28.072-28.075 73.75-28.073 101.824 0 28.072 28.073 28.072 73.75 0 101.823l-44.675 44.674c-4.686 4.686-4.686 12.284 0 16.971l39.598 39.598c4.686 4.686 12.284 4.686 16.971 0l44.675-44.675c59.265-59.265 59.265-155.695 0-214.96-59.266-59.264-155.695-59.264-214.961 0l-44.674 44.674c-4.686 4.686-4.686 12.284 0 16.971l39.597 39.598zm234.828 359.28l22.627-22.627c9.373-9.373 9.373-24.569 0-33.941L63.598 7.029c-9.373-9.373-24.569-9.373-33.941 0L7.029 29.657c-9.373 9.373-9.373 24.569 0 33.941l441.373 441.373c9.373 9.372 24.569 9.372 33.941 0z"></path></svg>}
                  </a>
                </li>}
              </ul>
            </div>}
        </div>
      </div>
    </>
  )
}
