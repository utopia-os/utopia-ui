import { LatLng } from "leaflet";
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
  menuIcon: string,
  menuColor: string,
  menuText: string,
  markerIcon: string,
  markerShape: string,
  markerDefaultColor: string,
  api?: ItemsApi<any>,
  setItemFormPopup?: React.Dispatch<React.SetStateAction<ItemFormPopupProps | null>>,
  itemFormPopup?: ItemFormPopupProps | null
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
  tags?: Tag[];
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
}

export interface ItemsApi<T> {
  getItems(): Promise<any>, 
  createItem?(item : T): Promise<any>,
  updateItem?(item : T): Promise<any>,
  deleteItem?(id : number | string): Promise<any>,
  collectionName?: string
}

export interface UserApi {
  register(email: string, password: string, userName: string): Promise<void>,
	login(email: string, password: string): Promise<any>,
	logout(): Promise<void>,
  getUser(): Promise<UserItem>,
  getToken(): Promise<any>,
	updateUser(user: UserItem): Promise<void>
}

export type UserItem = {
  id?: string;
  avatar?: string;
  role?: string;
  first_name: string;
  description: string;
  email: string;
  password?: string;
}

export type Permission = {
  id?: string;
  role: string;
  collection: string;
  action: PermissionAction
}


export type PermissionAction =  "create"|"read"|"update"|"delete";
