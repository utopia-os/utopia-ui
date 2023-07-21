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
  children?: React.ReactNode
  name: string,
  menuIcon: string,
  menuColor: string,
  menuText: string,
  markerIcon: string,
  markerShape: string,
  markerDefaultColor: string,
  tags?: Tag[],
  api?: ItemsApi<any>,
  setItemFormPopup?: React.Dispatch<React.SetStateAction<ItemFormPopupProps | null>>,
  itemFormPopup?: ItemFormPopupProps | null
}

export class Item {
  id: string | number;
  date_created?: string;
  date_updated?: string | null;
  name: string;
  text: string;
  position: Geometry;
  [key: string]: any;
  start?: string;
  end?: string;
  tags?: number[];
  api?: ItemsApi<any>
  constructor(id:string|number,name:string,text:string,position:Geometry, layer?: LayerProps, api?: ItemsApi<any>){
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
}