import type { Geometry } from 'geojson'

export interface Profile {
  id?: string
  avatar?: string
  color?: string
  name: string
  text: string
  geoposition?: Geometry
}
