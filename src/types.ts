import { LatLng } from "leaflet";

export interface UtopiaMap {
  height?: string,
  width?: string,
  center?: LatLng,
  zoom?: number,
  tags?: Tag[],
  children?: React.ReactNode,
  api?: API
}

export interface Layer {
  data: Item[],
  children?: React.ReactNode
  name: string,
  menuIcon: string,
  menuColor: string,
  menuText: string,
  markerIcon: string,
  markerShape: string,
  markerDefaultColor: string,
  tags?: Tag[],
}

export class Item {
  id: number;
  date_created?: string;
  date_updated?: string | null;
  name: string;
  text: string;
  position: Geometry;
  layer?: Layer;
  start?: string;
  end?: string;
  tags?: number[];
  constructor(id:number,name:string,text:string,position:Geometry, layer: Layer){
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
  id: number;
  name: string;
}

export interface API {
  getAll(): Promise<void>,
  add(item : Item): Promise<void>,
  update(item : Item): Promise<void>,
  remove(id : number): Promise<void>,
}