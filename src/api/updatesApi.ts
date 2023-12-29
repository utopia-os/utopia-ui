import { readItems,updateItem} from '@directus/sdk';
import { directusClient } from './directus';
import { Point } from 'geojson';


export class updatesApi<T>{

  collectionName: string;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  async getItems() {
    try {
      return await directusClient.request(readItems("updates",{
        fields: ['*', { user_created: ['*'] }],
      }));
    } catch (error: any) {
      console.log(error);
      if (error.errors[0]?.message)
        throw error.errors[0].message;
      else throw error;
    }
  }



  //setting geoposition
  async createItem(item: T & { id?: string, position?: Point }) {
    try {
      return await directusClient.request(updateItem("updates",item.id!,{position: item.position}))
    } catch (error: any) {
      console.log(error);
      if (error.errors[0]?.message)
        throw error.errors[0].message;
      else throw error;
    }
  }


  //setting geoposition to null
  async deleteItem(id: string)  {
    try {
      return await directusClient.request(updateItem("updates",id,{position: undefined}))
    } catch (error: any) {
      console.log(error);
      if (error.errors[0].message)
        throw error.errors[0].message;
      else throw error;
    }
  }
}