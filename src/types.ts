/* eslint-disable @typescript-eslint/no-explicit-any */
import { LatLng } from 'leaflet'

export interface Tag {
  color: string
  id: string
  name: string
  offer_or_need?: boolean
}

export interface UtopiaMapProps {
  height?: string
  width?: string
  center?: [number, number]
  zoom?: number
  tags?: Tag[]
  children?: React.ReactNode
  geo?: any
  showFilterControl?: boolean
  showLayerControl?: boolean
  showGratitudeControl?: boolean
  infoText?: string
}

export interface ItemType {
  name: string
  [key: string]: any
}

export interface ItemsApi<T> {
  getItems(): Promise<any>
  getItem?(id: string): Promise<any>
  createItem?(item: T): Promise<any>
  updateItem?(item: T): Promise<any>
  deleteItem?(id: string): Promise<any>
  collectionName?: string
}

export interface LayerProps {
  id?: string
  // eslint-disable-next-line no-use-before-define
  data?: Item[]
  children?: React.ReactNode
  name: string
  menuIcon: any
  menuColor: string
  menuText: string
  markerIcon: string
  markerShape: string
  markerDefaultColor: string
  markerDefaultColor2?: string
  api?: ItemsApi<any>
  itemType: ItemType
  itemNameField?: string
  itemSubnameField?: string
  itemTextField?: string
  itemAvatarField?: string
  itemColorField?: string
  itemOwnerField?: string
  itemTagsField?: string
  itemLatitudeField?: any
  itemLongitudeField?: any
  itemOffersField?: string
  itemNeedsField?: string
  onlyOnePerOwner?: boolean
  customEditLink?: string
  customEditParameter?: string
  public_edit_items?: boolean
  listed?: boolean
  item_presets?: Record<string, unknown>
  // eslint-disable-next-line no-use-before-define
  setItemFormPopup?: React.Dispatch<React.SetStateAction<ItemFormPopupProps | null>>
  // eslint-disable-next-line no-use-before-define
  itemFormPopup?: ItemFormPopupProps | null
  clusterRef?: any
}

export class Geometry {
  type: string
  coordinates: number[]
  constructor(lng: number, lat: number) {
    this.coordinates = [lng, lat]
    this.type = 'Point'
  }
}

export interface Relation {
  related_items_id: string
  [key: string]: any
}

export class Item {
  id: string
  name: string
  text: string
  position?: Geometry
  date_created?: string
  date_updated?: string | null
  start?: string
  end?: string
  api?: ItemsApi<any>
  tags?: string[]
  layer?: LayerProps
  relations?: Relation[]
  parent?: string
  subname?: string
  public_edit?: boolean
  slug?: string;
  [key: string]: any
  constructor(
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
  }
}

export interface AssetsApi {
  upload(file: Blob, title: string): any
  url: string
}

export interface Profile {
  id?: string
  avatar?: string
  color?: string
  name: string
  text: string
  geoposition?: Geometry
}

export interface UserItem {
  id?: string
  role?: any
  email?: string
  password?: string
  profile?: Profile
  [key: string]: any
}

export interface UserApi {
  register(email: string, password: string, userName: string): Promise<void>
  login(email: string, password: string): Promise<any>
  logout(): Promise<void>
  getUser(): Promise<UserItem>
  getToken(): Promise<any>
  updateUser(user: UserItem): Promise<void>
  requestPasswordReset(email: string, reset_url?: string)
  passwordReset(token: string, new_password: string)
}

export interface PermissionCondition {
  user_created?: {
    _eq: string // Erwartet den speziellen Wert "$CURRENT_USER" oder eine spezifische UUID
  }
  public_edit?: {
    _eq: boolean // Erwartet den speziellen Wert "$CURRENT_USER" oder eine spezifische UUID
  }
}

export type PermissionAction = 'create' | 'read' | 'update' | 'delete'

export interface Permission {
  id?: string
  policy: any
  collection: string
  action: PermissionAction
  permissions?: {
    // Optional, für spezifische Bedingungen wie `user_created`
    _and: PermissionCondition[]
  }
}

export interface ItemFormPopupProps {
  position: LatLng
  layer: LayerProps
  item?: Item
  children?: React.ReactNode
  setItemFormPopup?: React.Dispatch<React.SetStateAction<ItemFormPopupProps | null>>
}

export interface FormState {
  color: string
  id: string
  group_type: string
  status: string
  name: string
  subname: string
  text: string
  contact: string
  telephone: string
  next_appointment: string
  image: string
  marker_icon: string
  offers: Tag[]
  needs: Tag[]
  relations: Item[]
}
