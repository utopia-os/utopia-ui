import { createItem, deleteItem, readItem, readItems, updateItem } from '@directus/sdk';
import { MyCollections, directusClient } from './directus';
import { ItemsApi } from 'utopia-ui/dist/types';



export class itemsApi<T> implements ItemsApi<T>{

  collectionName: string;
  filter: any;
  layerId: string | undefined;
  mapId: string | undefined;
  customParameter: any


  constructor(collectionName: string, layerId?: string | undefined, mapId?: string | undefined, filter?: any, customParameter?:any ) {
    this.collectionName = collectionName;
    if(filter) this.filter = filter;
    else this.filter = {};
    this.layerId = layerId;
    if(layerId) {
      this.filter = {... filter, ... { "layer" : { "id": { "_eq": layerId }}}}
    }
    this.mapId = mapId;
    if(mapId) {
      this.filter = {... filter, ... { "map" : { "id": { "_eq": mapId }}}}
    }
    if(customParameter) this.customParameter = customParameter;
  }

  async getItems() {
    try {
      return await directusClient.request(readItems(this.collectionName as never, { fields: ['*', 'to.*', "relations.*", "user_created.*", {offers: ['*'], needs: ['*'], gallery: ['*.*']} as any] , filter: this.filter, limit: -1 }));
    } catch (error: any) {
      console.log(error);
      if (error.errors[0]?.message)
        throw error.errors[0].message;
      else throw error;
    }
  }

  async getItem(id : string) {
    try {
      return await directusClient.request(readItem(this.collectionName as never, id));
    } catch (error: any) {
      console.log(error);
      if (error.errors[0]?.message)
        throw error.errors[0].message;
      else throw error;
    }
  }

  async createItem(item: T & { id?: string }) {
    try {
      return await directusClient.request(createItem(this.collectionName as keyof MyCollections, {...item,  ...(this.customParameter && this.customParameter), ...(this.layerId && {layer: this.layerId}), ...(this.layerId && {layer: this.layerId}), ...(this.mapId && {map: this.mapId})}))
    } catch (error: any) {
      console.log(error);
      if (error.errors[0]?.message)
        throw error.errors[0].message;
      else throw error;
    }
  }

  async updateItem(item: T & { id?: string }) {
    try {
      return await directusClient.request(updateItem(this.collectionName as keyof MyCollections, item.id!, item))
    } catch (error: any) {
      console.log(error);
      if (error.errors[0].message)
        throw error.errors[0].message;
      else throw error;
    }
  }

  async deleteItem(id: string) {
    try {
      return await directusClient.request(deleteItem(this.collectionName as keyof MyCollections, id))
    } catch (error: any) {
      console.log(error);
      if (error.errors[0].message)
        throw error.errors[0].message;
      else throw error;
    }
  }
}