import type { Item } from './Item'
import type { LayerProps } from './LayerProps'
import type { LatLng } from 'leaflet'

export interface PopupFormState {
  position: LatLng
  layer: LayerProps
  item?: Item
}
