import { LatLng, LatLngTuple, latLng } from "leaflet";
import { ItemFormPopupProps } from "./Components/Map/Subcomponents/ItemFormPopup";

export interface UtopiaMapProps {
  height?: string,
  width?: string,
  center?: LatLng,
  zoom?: number,
  tags?: Tag[],
  children?: React.ReactNode,
}

export interface LayerProps {
  data?: Item[],
  children?: React.ReactNode,
  name: string,
  menuIcon: any,
  menuColor: string,
  menuText: string,
  markerIcon: string,
  markerShape: string,
  markerDefaultColor: string,
  api?: ItemsApi<any>,
  itemNameField?: string,
  itemTextField?: string,
  itemAvatarField?: string,
  itemColorField?: string,
  itemOwnerField?: string,
  itemTagField?: string,
  itemLatitudeField?: any,
  itemLongitudeField?: any,
  onlyOnePerOwner?: boolean,
    setItemFormPopup?: React.Dispatch<React.SetStateAction<ItemFormPopupProps | null>>,
    itemFormPopup?: ItemFormPopupProps | null,
  clusterRef?: React.MutableRefObject<any>
}

export class Item {
  id: string ;
  name: string;
  text: string;
  position: Geometry;
  date_created?: string;
  date_updated?: string | null;
  start?: string;
  end?: string;
  api?: ItemsApi<any>;
  tags?: string[];
  layer?: LayerProps;
  [key: string]: any;
  constructor(id:string,name:string,text:string,position:Geometry, layer?: LayerProps, api?: ItemsApi<any>){
    this.id = id;
    this.name = name;
    this.text = text;
    this.position = position;
    this.layer = layer;
    this.api = api;
  }
}

export class Geometry {
  type: string;
  coordinates: number[];
  constructor(lng: number, lat: number) {
    this.coordinates = [lng,lat];
    this.type = "Point";
  }
}

export interface Tag {
  color: string;
  id: string;
  name: string;
}

export interface ItemsApi<T> {
  getItems(): Promise<any>, 
  createItem?(item : T): Promise<any>,
  updateItem?(item : T): Promise<any>,
  deleteItem?(id : string): Promise<any>,
  collectionName?: string
}

export interface AssetsApi {
  upload(file: Blob, title: string): any,
  url: string
}

export interface UserApi {
  register(email: string, password: string, userName: string): Promise<void>,
	login(email: string, password: string): Promise<any>,
	logout(): Promise<void>,
  getUser(): Promise<UserItem>,
  getToken(): Promise<any>,
	updateUser(user: UserItem): Promise<void>,
  requestPasswordReset(email:string, reset_url?:string),
  passwordReset(token:string,new_password:string)
}

export type UserItem = {
  id?: string;
  role?: string;
  email?: string;
  password?: string;
  profile?: Profile;
  [key: string]: any;

}

export type Profile = {
  id?: string;
  avatar?: string;
  color?: string;
  name: string;
  text: string;
  geoposition?: Geometry
}

export type Permission = {
  id?: string;
  role: string;S
  collection: string;
  action: PermissionAction
}


export type PermissionAction =  "create"|"read"|"update"|"delete";
