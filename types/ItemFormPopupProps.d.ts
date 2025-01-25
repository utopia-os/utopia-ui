import type { Item } from './Item'
import type { LayerProps } from './LayerProps'
import type { LatLng } from 'leaflet'

export interface ItemFormPopupProps {
  position: LatLng
  layer: LayerProps
  item?: Item
  children?: React.ReactNode
  setItemFormPopup?: React.Dispatch<React.SetStateAction<ItemFormPopupProps | null>>
}
