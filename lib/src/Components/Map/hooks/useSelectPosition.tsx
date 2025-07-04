/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/restrict-plus-operands */

/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { useUpdateItem } from './useItems'
import { useHasUserPermission } from './usePermissions'

import type { Item } from '#types/Item'
import type { LayerProps } from '#types/LayerProps'
import type { PopupFormState } from '#types/PopupFormState'
import type { Point } from 'geojson'
import type { LatLng } from 'leaflet'

interface PolygonClickedProps {
  position: LatLng
  setItemFormPopup: React.Dispatch<React.SetStateAction<PopupFormState | null>>
}

type UseSelectPositionManagerResult = ReturnType<typeof useSelectPositionManager>

const SelectPositionContext = createContext<UseSelectPositionManagerResult>({
  selectPosition: null,
  setSelectPosition: () => {},
  setMarkerClicked: () => {},
  setMapClicked: () => {},
})

function useSelectPositionManager(): {
  selectPosition: Item | LayerProps | null
  setSelectPosition: React.Dispatch<React.SetStateAction<Item | LayerProps | null>>
  setMarkerClicked: React.Dispatch<React.SetStateAction<Item>>
  setMapClicked: React.Dispatch<React.SetStateAction<PolygonClickedProps | undefined>>
} {
  const [selectPosition, setSelectPosition] = useState<LayerProps | null | Item>(null)
  const [markerClicked, setMarkerClicked] = useState<Item | null>()
  const [mapClicked, setMapClicked] = useState<PolygonClickedProps>()
  const updateItem = useUpdateItem()
  const hasUserPermission = useHasUserPermission()

  useEffect(() => {
    if (
      selectPosition &&
      markerClicked &&
      'text' in selectPosition &&
      markerClicked.id !== selectPosition.id
    ) {
      itemUpdateParent({ ...selectPosition, parent: markerClicked.id })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markerClicked])

  useEffect(() => {
    if (selectPosition != null) {
      // selectPosition can be null, Layer or Item
      if ('menuIcon' in selectPosition) {
        // if selectPosition is a Layer
        mapClicked &&
          mapClicked.setItemFormPopup({
            layer: selectPosition,
            position: mapClicked.position,
          })
        setSelectPosition(null)
      }
      if ('layer' in selectPosition) {
        // if selectPosition is an Item
        const position =
          mapClicked?.position.lng &&
          ({
            type: 'Point',
            coordinates: [mapClicked.position.lng, mapClicked.position.lat],
          } as Point)
        position && itemUpdatePosition({ ...selectPosition, position })
        setSelectPosition(null)
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapClicked])

  const itemUpdateParent = async (updatedItem: Item) => {
    const toastId = toast.loading('Adding item to ' + markerClicked?.name)
    if (
      markerClicked?.layer?.api?.collectionName &&
      hasUserPermission(markerClicked.layer.api.collectionName, 'update', markerClicked)
    ) {
      let success = false
      try {
        await updatedItem.layer?.api?.updateItem!({
          id: updatedItem.id,
          parent: updatedItem.parent,
          position: null,
        })
        success = true
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.update(toastId, { render: error.message, type: 'error', autoClose: 5000 })
        } else if (typeof error === 'string') {
          toast.update(toastId, { render: error, type: 'error', autoClose: 5000 })
        } else {
          throw error
        }
      }
      if (success) {
        await updateItem({ ...updatedItem, parent: updatedItem.parent, position: undefined })
        await linkItem(updatedItem.id)
        toast.update(toastId, {
          render: 'Item position updated',
          type: 'success',
          isLoading: false,
          autoClose: 5000,
        })
        setSelectPosition(null)
        setMarkerClicked(null)
      }
    } else {
      setSelectPosition(null)
      toast.update(toastId, {
        render: "you don't have permission to add items to " + markerClicked?.name,
        type: 'error',
        isLoading: false,
        autoClose: 5000,
        closeButton: true,
      })
    }
  }

  const itemUpdatePosition = async (updatedItem: Item) => {
    let success = false
    const toastId = toast.loading('Updating item position')
    try {
      await updatedItem.layer?.api?.updateItem!({
        id: updatedItem.id,
        position: updatedItem.position,
      })
      success = true
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.update(toastId, {
          render: error.message,
          type: 'error',
          isLoading: false,
          autoClose: 5000,
          closeButton: true,
        })
      } else if (typeof error === 'string') {
        toast.update(toastId, {
          render: error,
          type: 'error',
          isLoading: false,
          autoClose: 5000,
          closeButton: true,
        })
      } else {
        throw error
      }
    }
    if (success) {
      updateItem(updatedItem)
      toast.update(toastId, {
        render: 'Item position updated',
        type: 'success',
        isLoading: false,
        autoClose: 5000,
        closeButton: true,
      })
    }
  }

  const linkItem = async (id: string) => {
    if (markerClicked) {
      const newRelations = markerClicked.relations || []

      if (!newRelations.some((r) => r.related_items_id === id)) {
        newRelations.push({ items_id: markerClicked.id, related_items_id: id })
        const updatedItem = { id: markerClicked.id, relations: newRelations }

        let success = false
        const toastId = toast.loading('Linking item')
        try {
          await markerClicked.layer?.api?.updateItem!(updatedItem)
          success = true
        } catch (error: unknown) {
          if (error instanceof Error) {
            toast.update(toastId, {
              render: error.message,
              type: 'error',
              isLoading: false,
              autoClose: 5000,
              closeButton: true,
            })
          } else if (typeof error === 'string') {
            toast.update(toastId, {
              render: error,
              type: 'error',
              isLoading: false,
              autoClose: 5000,
              closeButton: true,
            })
          } else {
            throw error
          }
        }
        if (success) {
          updateItem({ ...markerClicked, relations: newRelations })
          toast.update(toastId, {
            render: 'Item linked',
            type: 'success',
            isLoading: false,
            autoClose: 5000,
            closeButton: true,
          })
        }
      }
    }
  }
  return { selectPosition, setSelectPosition, setMarkerClicked, setMapClicked }
}

export const SelectPositionProvider: React.FunctionComponent<{
  children?: React.ReactNode
}> = ({ children }) => (
  <SelectPositionContext.Provider value={useSelectPositionManager()}>
    {children}
  </SelectPositionContext.Provider>
)

export const useSelectPosition = (): Item | LayerProps | null => {
  const { selectPosition } = useContext(SelectPositionContext)
  return selectPosition
}

export const useSetSelectPosition = (): UseSelectPositionManagerResult['setSelectPosition'] => {
  const { setSelectPosition } = useContext(SelectPositionContext)
  return setSelectPosition
}

export const useSetMarkerClicked = (): UseSelectPositionManagerResult['setMarkerClicked'] => {
  const { setMarkerClicked } = useContext(SelectPositionContext)
  return setMarkerClicked
}

export const useSetMapClicked = (): UseSelectPositionManagerResult['setMapClicked'] => {
  const { setMapClicked } = useContext(SelectPositionContext)
  return setMapClicked
}
