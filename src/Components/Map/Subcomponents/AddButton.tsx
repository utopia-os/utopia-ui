import * as React from 'react'
import { useLayers } from '../hooks/useLayers'
import { useHasUserPermission } from '../hooks/usePermissions'

export default function AddButton({
  triggerAction,
}: {
  triggerAction: React.Dispatch<React.SetStateAction<any>>
}) {
  const layers = useLayers()
  const hasUserPermission = useHasUserPermission()

  const canAddItems = () => {
    let canAdd = false
    layers.map((layer) => {
      if (
        layer.api?.createItem &&
        hasUserPermission(layer.api.collectionName!, 'create', undefined, layer) &&
        layer.listed
      )
        canAdd = true
      return null
    })
    return canAdd
  }

  return (
    <>
      {canAddItems() ? (
        <div className='tw-dropdown tw-dropdown-top tw-dropdown-end tw-dropdown-hover tw-z-500 tw-absolute tw-right-4 tw-bottom-4'>
          <label tabIndex={0} className='tw-z-500 tw-btn tw-btn-circle tw-shadow tw-bg-base-100'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='3'
              stroke='currentColor'
              className='tw-w-5 tw-h-5'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
            </svg>
          </label>
          <ul tabIndex={0} className='tw-dropdown-content tw-pr-1 tw-list-none'>
            {layers.map(
              (layer) =>
                layer.api?.createItem &&
                hasUserPermission(layer.api.collectionName!, 'create', undefined, layer) &&
                layer.listed && (
                  <li key={layer.name}>
                    <a>
                      <div className='tw-tooltip tw-tooltip-left' data-tip={layer.menuText}>
                        <button
                          tabIndex={0}
                          className='tw-z-500  tw-border-0 tw-pl-2 tw-p-0 tw-mb-3 tw-w-10 tw-h-10 tw-cursor-pointer tw-rounded-full tw-mouse tw-drop-shadow-md tw-transition tw-ease-in tw-duration-200 focus:tw-outline-none'
                          style={{ backgroundColor: layer.menuColor || '#777' }}
                          onClick={() => {
                            triggerAction(layer)
                          }}
                        >
                          <img
                            src={layer.menuIcon}
                            className='tw-h-6 tw-w-6 tw-text-white'
                            style={{ filter: 'invert(100%) brightness(200%)' }}
                          />
                        </button>
                      </div>
                    </a>
                  </li>
                ),
            )}
          </ul>
        </div>
      ) : (
        ''
      )}
    </>
  )
}
