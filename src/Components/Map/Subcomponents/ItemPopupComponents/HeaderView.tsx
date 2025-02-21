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
import EllipsisVerticalIcon from '@heroicons/react/24/outline/EllipsisVerticalIcon'
import PencilIcon from '@heroicons/react/24/outline/PencilIcon'
import TrashIcon from '@heroicons/react/24/outline/TrashIcon'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppState } from '#components/AppShell/hooks/useAppState'
import { useHasUserPermission } from '#components/Map/hooks/usePermissions'
import DialogModal from '#components/Templates/DialogModal'

import type { Item } from '#types/Item'
import type { ItemsApi } from '#types/ItemsApi'

export function HeaderView({
  item,
  api,
  editCallback,
  deleteCallback,
  setPositionCallback,
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

  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    setImageLoaded(false)
  }, [item])

  const avatar =
    item.image &&
    appState.assetsApi.url + item.image + `${big ? '?width=160&heigth=160' : '?width=80&heigth=80'}`
  const title = item.name
  const subtitle = item.subname

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
                  className={`${
                    big ? 'tw-w-20' : 'tw-w-10'
                  } tw-inline tw-items-center tw-justify-center overflow-hidden`}
                >
                  <img
                    className={'tw-w-full tw-h-full tw-object-cover tw-rounded-full'}
                    src={avatar}
                    alt={item.name + ' logo'}
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImageLoaded(false)}
                    style={{ display: imageLoaded ? 'block' : 'none' }}
                  />
                  {!imageLoaded && (
                    <div className='tw-w-full tw-h-full tw-bg-gray-200 tw-rounded-full' />
                  )}
                </div>
              </div>
            )}
            <div className={`${avatar ? 'tw-ml-2' : ''} tw-overflow-hidden`}>
              <div
                className={`${big ? 'xl:tw-text-3xl tw-text-2xl' : 'tw-text-xl'} tw-font-semibold tw-truncate`}
                title={title}
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
                  <EllipsisVerticalIcon className='tw-h-5 tw-w-5' />
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
                                  `${item.layer.customEditLink}${item.layer.customEditParameter ? `/${item.id}${params && '?' + params}` : ''} `,
                                )
                              : editCallback(e)
                          }
                        >
                          <PencilIcon className='tw-h-5 tw-w-5' />
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
                            <TrashIcon className='tw-h-5 tw-w-5' />
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
