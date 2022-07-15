export interface Item {
  id: number,
  date_created?: string,
  date_updated?: string | null,
  name: string,
  text: string,
  position: Geometry,
  start?: string,
  end?: string,
  tags?: number[],
  [key: string]: any
}

export interface Geometry {
  type: string;
  coordinates: number[];
}

export interface Tag {

  color: string;
  id: number;
  name: string;

}


export interface Layer {
  name : string,
  menuIcon: string,
  menuColor: string,
  menuText: string,
  markerIcon: string,
  markerShape: string
}