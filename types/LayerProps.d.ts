import type { Item } from './Item'
import type { ItemFormPopupProps } from './ItemFormPopupProps'
import type { ItemsApi } from './ItemsApi'
import type { ItemType } from './ItemType'

interface LayerParameters {
  hasAvatar?: boolean
  hasColor?: boolean
  hasTags?: boolean
  hasOffers?: boolean
  hasNeeds?: boolean
}

export interface LayerProps<L extends LayerParameters> {
  id?: string
  data?: Item<L>[]
  children?: React.ReactNode
  name: string
  menuIcon: string
  menuColor: string
  menuText: string
  markerIcon: string
  markerShape: string
  markerDefaultColor: string
  markerDefaultColor2?: string
  api?: ItemsApi<Item<L>>
  itemType: ItemType
  // TODO Conditionally type items with .avatar etc.?
  onlyOnePerOwner?: boolean
  customEditLink?: string
  customEditParameter?: string
  public_edit_items?: boolean
  listed?: boolean
  item_presets?: Record<string, unknown>
  setItemFormPopup?: React.Dispatch<React.SetStateAction<ItemFormPopupProps | null>>
  itemFormPopup?: ItemFormPopupProps | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  clusterRef?: any
}
