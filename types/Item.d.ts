import type { ItemsApi } from './ItemsApi'
import type { LayerProps } from './LayerProps'
import type { Relation } from './Relation'
import type { Point } from 'geojson'

export interface Item {
  id: string
  name: string
  text: string
  position?: Point
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
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
