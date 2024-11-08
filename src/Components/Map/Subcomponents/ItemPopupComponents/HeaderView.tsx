/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppState } from '#components/AppShell/hooks/useAppState'
import { useHasUserPermission } from '#components/Map/hooks/usePermissions'
import DialogModal from '#components/Templates/DialogModal'
import { Item, ItemsApi } from '#src/types'
import { getValue } from '#utils/GetValue'

export function HeaderView({
  item,
  api,
  editCallback,
  deleteCallback,
  setPositionCallback,
  itemNameField,
  itemSubnameField,
  itemAvatarField,
  loading,
  hideMenu = false,
  big = false,
  truncateSubname = true,
  hideSubname = false,
  showAddress = false,
}: {
  item: Item
  api?: ItemsApi<any>
  editCallback?: any
  deleteCallback?: any
  setPositionCallback?: any
  itemNameField?: string
  itemAvatarField?: string
  itemSubnameField?: string
  loading?: boolean
  hideMenu?: boolean
  big?: boolean
  hideSubname?: boolean
  truncateSubname?: boolean
  showAddress?: boolean
}) {
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const hasUserPermission = useHasUserPermission()
  const navigate = useNavigate()
  const appState = useAppState()

  const avatar =
    itemAvatarField && getValue(item, itemAvatarField)
      ? appState.assetsApi.url +
        getValue(item, itemAvatarField) +
        `${big ? '?width=160&heigth=160' : '?width=80&heigth=80'}`
      : item.layer?.itemAvatarField &&
        item &&
        getValue(item, item.layer?.itemAvatarField) &&
        appState.assetsApi.url +
          getValue(item, item.layer?.itemAvatarField) +
          `${big ? '?width=160&heigth=160' : '?width=80&heigth=80'}`
  const title = itemNameField
    ? getValue(item, itemNameField)
    : item.layer?.itemNameField && item && getValue(item, item.layer.itemNameField)
  const subtitle = itemSubnameField
    ? getValue(item, itemSubnameField)
    : item.layer?.itemSubnameField && item && getValue(item, item.layer.itemSubnameField)

  const [address] = useState<string>('')

  const params = new URLSearchParams(window.location.search)

  const openDeleteModal = async (event: React.MouseEvent<HTMLElement>) => {
    setModalOpen(true)
    event.stopPropagation()
  }

  return (
    <>
      <div className='tw-flex tw-flex-row'>
        <div className={'tw-grow tw-max-w-[calc(100%-60px)] }'}>
          <div className='flex items-center'>
            {avatar && (
              <div className='tw-avatar'>
                <div
                  className={`${big ? 'tw-w-20' : 'tw-w-10'} tw-inline tw-items-center tw-justify-center overflow-hidden`}
                >
                  <img
                    className={'tw-w-full tw-h-full tw-object-cover tw-rounded-full'}
                    src={avatar}
                    alt={item.name + ' logo'}
                  />
                </div>
              </div>
            )}
            <div className={`${avatar ? 'tw-ml-2' : ''} tw-overflow-hidden`}>
              <div
                className={`${big ? 'xl:tw-text-3xl tw-text-2xl' : 'tw-text-xl'} tw-font-semibold tw-truncate`}
              >
                {title}
              </div>
              {showAddress && address && !hideSubname && (
                <div className={`tw-text-xs  tw-text-gray-500 ${truncateSubname && 'tw-truncate'}`}>
                  {address}
                </div>
              )}
              {subtitle && !hideSubname && (
                <div className={`tw-text-xs  tw-text-gray-500 ${truncateSubname && 'tw-truncate'}`}>
                  {subtitle}
                </div>
              )}
            </div>
          </div>
        </div>
        <div onClick={(e) => e.stopPropagation()} className={`${big ? 'tw-mt-5' : 'tw-mt-1'}`}>
          {(api?.deleteItem || item.layer?.api?.updateItem) &&
            (hasUserPermission(api?.collectionName!, 'delete', item) ||
              hasUserPermission(api?.collectionName!, 'update', item)) &&
            !hideMenu && (
              <div className='tw-dropdown tw-dropdown-bottom'>
                <label
                  tabIndex={0}
                  className='tw-bg-base-100 tw-btn tw-m-1 tw-leading-3 tw-border-none tw-min-h-0 tw-h-6'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='tw-h-5 tw-w-5'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path d='M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z' />
                  </svg>
                </label>
                <ul
                  tabIndex={0}
                  className='tw-dropdown-content tw-menu tw-p-2 tw-shadow tw-bg-base-100 tw-rounded-box tw-z-1000'
                >
                  {api?.updateItem &&
                    hasUserPermission(api.collectionName!, 'update', item) &&
                    editCallback && (
                      <li>
                        <a
                          className='!tw-text-base-content tw-cursor-pointer'
                          onClick={(e) =>
                            item.layer?.customEditLink
                              ? navigate(
                                  `${item.layer.customEditLink}${item.layer.customEditParameter ? `/${getValue(item, item.layer.customEditParameter)}${params && '?' + params}` : ''} `,
                                )
                              : editCallback(e)
                          }
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='tw-h-5 tw-w-5'
                            viewBox='0 0 20 20'
                            fill='currentColor'
                          >
                            <path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z' />
                          </svg>
                        </a>
                      </li>
                    )}
                  {api?.updateItem &&
                    hasUserPermission(api.collectionName!, 'update', item) &&
                    setPositionCallback && (
                      <li>
                        <a
                          className='!tw-text-base-content tw-cursor-pointer'
                          onClick={setPositionCallback}
                        >
                          <svg
                            stroke='currentColor'
                            fill='currentColor'
                            strokeWidth='0'
                            viewBox='0 0 512 512'
                            className='tw-w-5 tw-h-5'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path d='M256 0c17.7 0 32 14.3 32 32V42.4c93.7 13.9 167.7 88 181.6 181.6H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H469.6c-13.9 93.7-88 167.7-181.6 181.6V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V469.6C130.3 455.7 56.3 381.7 42.4 288H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H42.4C56.3 130.3 130.3 56.3 224 42.4V32c0-17.7 14.3-32 32-32zM107.4 288c12.5 58.3 58.4 104.1 116.6 116.6V384c0-17.7 14.3-32 32-32s32 14.3 32 32v20.6c58.3-12.5 104.1-58.4 116.6-116.6H384c-17.7 0-32-14.3-32-32s14.3-32 32-32h20.6C392.1 165.7 346.3 119.9 288 107.4V128c0 17.7-14.3 32-32 32s-32-14.3-32-32V107.4C165.7 119.9 119.9 165.7 107.4 224H128c17.7 0 32 14.3 32 32s-14.3 32-32 32H107.4zM256 224a32 32 0 1 1 0 64 32 32 0 1 1 0-64z'></path>
                          </svg>
                        </a>
                      </li>
                    )}
                  {api?.deleteItem &&
                    hasUserPermission(api.collectionName!, 'delete', item) &&
                    deleteCallback && (
                      <li>
                        <a className='tw-cursor-pointer !tw-text-error' onClick={openDeleteModal}>
                          {loading ? (
                            <span className='tw-loading tw-loading-spinner tw-loading-sm'></span>
                          ) : (
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='tw-h-5 tw-w-5'
                              viewBox='0 0 20 20'
                              fill='currentColor'
                            >
                              <path
                                fillRule='evenodd'
                                d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
                                clipRule='evenodd'
                              />
                            </svg>
                          )}
                        </a>
                      </li>
                    )}
                </ul>
              </div>
            )}
        </div>
      </div>
      <DialogModal
        isOpened={modalOpen}
        title='Are you sure?'
        showCloseButton={false}
        onClose={() => setModalOpen(false)}
      >
        <div onClick={(e) => e.stopPropagation()}>
          <span>
            Do you want to delete <b>{item.name}</b>?
          </span>
          <div className='tw-grid'>
            <div className='tw-flex tw-justify-between'>
              <label
                className='tw-btn tw-mt-4 tw-btn-error'
                onClick={(e) => {
                  deleteCallback(e)
                  setModalOpen(false)
                }}
              >
                Yes
              </label>
              <label className='tw-btn tw-mt-4' onClick={() => setModalOpen(false)}>
                No
              </label>
            </div>
          </div>
        </div>
      </DialogModal>
    </>
  )
}
