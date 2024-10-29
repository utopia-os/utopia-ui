/* eslint-disable no-unused-vars */

import * as React from 'react'
import { ItemFormPopupProps } from "./Components/Map/Subcomponents/ItemFormPopup";

export interface UtopiaMapProps {
  height?: string,
  width?: string,
  center?: [number,number],
  zoom?: number,
  tags?: Tag[],
  children?: React.ReactNode,
  geo?: any,
  showFilterControl?: boolean,
  showLayerControl?: boolean,
  showGratitudeControl?: boolean,
  infoText? : string
}

export interface LayerProps {
  id?: string,
  data?: Item[],
  children?: React.ReactNode,
  name: string,
  menuIcon: any,
  menuColor: string,
  menuText: string,
  markerIcon: string,
  markerShape: string,
  markerDefaultColor: string,
  markerDefaultColor2?: string,
  api?: ItemsApi<any>,
  itemType: ItemType,
  itemNameField?: string,
  itemSubnameField?: string,
  itemTextField?: string,
  itemAvatarField?: string,
  itemColorField?: string,
  itemOwnerField?: string,
  itemTagsField?: string,
  itemLatitudeField?: any,
  itemLongitudeField?: any,
  itemOffersField?: string,
  itemNeedsField?: string,
  onlyOnePerOwner?: boolean,
  customEditLink?: string,
  customEditParameter?: string,
  public_edit_items?: boolean,
  listed?: boolean,
  item_presets?: Record<string, unknown>,
    setItemFormPopup?: React.Dispatch<React.SetStateAction<ItemFormPopupProps | null>>,
    itemFormPopup?: ItemFormPopupProps | null,
  clusterRef?: any
}

export interface ItemType {
  name: string;
  [key: string]: any;

}

export class Item {
  id: string ;
  name: string;
  text: string;
  position?: Geometry;
  date_created?: string;
  date_updated?: string | null;
  start?: string;
  end?: string;
  api?: ItemsApi<any>;
  tags?: string[];
  layer?: LayerProps;
  relations?: Relation[];
  parent?:string;
  subname?: string;
  public_edit?: boolean;
  // eslint-disable-next-line no-undef
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
  offer_or_need?: boolean
}

export interface ItemsApi<T> {
  getItems(): Promise<any>, 
  getItem?(id: string): Promise<any>,
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

export type PermissionCondition = {
  user_created?: {
    _eq: string; // Erwartet den speziellen Wert "$CURRENT_USER" oder eine spezifische UUID
  };
  public_edit?: {
    _eq: boolean; // Erwartet den speziellen Wert "$CURRENT_USER" oder eine spezifische UUID
  };
};

export type Permission = {
  id?: string;
  policy: string;
  collection: string;
  action: PermissionAction;
  permissions?: { // Optional, für spezifische Bedingungen wie `user_created`
    _and: PermissionCondition[];
  };
};


export type PermissionAction =  "create"|"read"|"update"|"delete";

export type Relation = {
  related_items_id: string;
  [key: string]: any;
}