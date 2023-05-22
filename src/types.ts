import { LatLng } from "leaflet";
import { NewItemPopupProps } from "./Components/Map/Subcomponents/NewItemPopup";

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
  api?: ItemsApi,
  setNewItemPopup?: React.Dispatch<React.SetStateAction<NewItemPopupProps | null>>
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
  constructor(id:string|number,name:string,text:string,position:Geometry, layer: LayerProps){
    this.id = id;
    this.name = name;
    this.text = text;
    this.position = position;
    this.layer = layer;
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
  id: string | number;
  name: string;
}

export interface ItemsApi {
  getItems(): Promise<void>,
  addItem(item : Item): Promise<void>,
  updateItem(item : Item): Promise<void>,
  deleteItem(id : number): Promise<void>,
}