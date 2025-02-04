import type { ItemsApi } from './ItemsApi'
import type { ItemType } from './ItemType'
import type { LayerParameters, LayerProps } from './LayerProps'
import type { Relation } from './Relation'
import type { UserItem } from './UserItem'
import type { Point } from 'geojson'

type TagIds = { tags_id: string }[]

interface BaseItem<L extends LayerParameters> {
  id: string
  name: string
  text: string
  data?: string
  position?: Point
  date_created?: string
  date_updated?: string | null
  start?: string
  end?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  api?: ItemsApi<any>
  tags?: string[]
  layer?: LayerProps<L>
  relations?: Relation[]
  parent?: string
  subname?: string
  public_edit?: boolean
  slug?: string
  user_created?: UserItem
  image?: string
  group_type?: string
  offers?: TagIds
  needs?: TagIds
  status?: string
  markerIcon?: string
  new?: boolean
  contact?: string
  telephone?: string
  next_appointment?: string
  type?: ItemType
}

export type Item<L extends LayerParameters> = BaseItem<L> &
  (L extends { hasAvatar: true }
    ? {
        avatar: string
      }
    : unknown) &
  (L extends { hasColor: true }
    ? {
        color: string
      }
    : unknown) &
  Record<string, unknown>

type foo = Item<{ hasAvatar: false; hasColor: true }>
