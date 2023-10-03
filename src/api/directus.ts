import { createDirectus, rest, authentication, AuthenticationData, AuthenticationStorage } from '@directus/sdk';
import { Point } from 'geojson'



export type Place = {
    id: string;
    name: string;
    text: string;
    position?: Point;
  };

  export type Project = {
    id: string;
    name: string;
    text: string;
    position?: Point;
    picture: string;
    subname: string;
  };

  export type Tag = {
    id: string;
    color: string;
  };
  
  export type Event = {
    id: string;
    name: string;
    text: string;
    position?: Point;
    start: Date;
    end: Date;
  };

  export type MyCollections = {
    places: Place;
    events: Event;
  };
  
  

  export const authLocalStorage = (mainKey: string = "directus_storage") => ({
    // implementation of get, here return json parsed data from localStorage at mainKey (or null if not found)
    get: async () => {
        const data = window.localStorage.getItem(mainKey);
        if (data) {
          return JSON.parse(data);
        }
        return null;
      },
    // implementation of set, here set the value at mainKey in localStorage, or remove it if value is null
    set: async (value: AuthenticationData | null) => {
        if (!value) {
          return window.localStorage.removeItem(mainKey);
        }
        return window.localStorage.setItem(mainKey, JSON.stringify(value));
      },
   } as AuthenticationStorage);
   
   export async function getRefreshToken(){
    let auth = await authLocalStorage().get()
    return auth!.refresh_token;
}

  export const directusClient = createDirectus<MyCollections>("https://api.utopia-lab.org/")
  .with(authentication())
  .with(rest())
  .with(authentication('json', { // add this if you want to use authentication, json is important, it's type of your authentication usage, here JWT
    storage: authLocalStorage(), // here set the storage previously created
  }));