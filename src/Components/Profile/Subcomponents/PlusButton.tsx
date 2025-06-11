/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import PlusIcon from '@heroicons/react/24/outline/PlusIcon'

import { useHasUserPermission } from '#components/Map/hooks/usePermissions'

import type { LayerProps } from '#types/LayerProps'

export function PlusButton({
  layer,
  triggerAction,
  color,
  collection = 'items',
}: {
  layer?: LayerProps
  triggerAction: any
  color: string
  collection?: string
}) {
  const hasUserPermission = useHasUserPermission()
  return (
    <>
      {hasUserPermission(collection, 'create', undefined, layer) && (
        <button
          tabIndex={0}
          className='tw:btn tw:btn-circle tw:shadow tw:z-3000 tw:absolute tw:right-4 tw:bottom-4'
          onClick={() => {
            triggerAction()
          }}
          style={{ backgroundColor: color, color: '#fff' }}
        >
          <PlusIcon className='tw:w-5 tw:h-5 tw:stroke-[2.5]' />
        </button>
      )}
    </>
  )
}
