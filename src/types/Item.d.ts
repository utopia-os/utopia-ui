import type { ItemsApi } from './ItemsApi'
import type { ItemType } from './ItemType'
import type { LayerProps } from './LayerProps'
import type { Relation } from './Relation'
import type { UserItem } from './UserItem'
import type { Point } from 'geojson'

type TagIds = { tags_id: string }[]

interface GalleryItem {
  directus_files_id: {
    id: number
    width: number
    height: number
  }
}

export interface Item {
  id: string
  name: string
  text?: string
  data?: string
  position?: Point | null
  date_created?: string
  date_updated?: string | null
  start?: string
  end?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  api?: ItemsApi<any>
  tags?: string[]
  layer?: LayerProps
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
  color?: string
  markerIcon?: string
  avatar?: string
  new?: boolean
  contact?: string
  telephone?: string
  next_appointment?: string
  type?: ItemType
  gallery?: GalleryItem[]

  // {
  // coordinates: [number, number]
  /* constructor(
    id: string,
    name: string,
    text: string,
    position: Geometry,
    layer?: LayerProps,
    api?: ItemsApi<any>,
  ) {
    this.id = id
    this.name = name
    this.text = text
    this.position = position
    this.layer = layer
    this.api = api
  } */
}
