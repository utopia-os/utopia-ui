import { Directus } from "@directus/sdk"
import { Point } from 'geojson'

export type Place = {
    id: string;
    name: string;
    text: string;
    position?: Point;
  };
  
  export type Event = {
    id: string;
    name: string;
    text: string;
    position?: Point;
    start: Date;
    end: Date;
  };

  type MyCollections = {
    places: Place;
    events: Event;
  };
  
  
  export const directus = new Directus<MyCollections>("https://map.api.free-planet-earth.org/");