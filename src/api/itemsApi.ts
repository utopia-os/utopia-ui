import { createItem, deleteItem, readItem, readItems, updateItem } from '@directus/sdk';
import { MyCollections, directusClient } from './directus';
import { ItemsApi } from 'utopia-ui/dist/types';



export class itemsApi<T> implements ItemsApi<T>{

  collectionName: string;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  async getItems() {
    try {
      return await directusClient.request(readItems(this.collectionName as never, { limit: 500 }));
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
      return await directusClient.request(createItem(this.collectionName as keyof MyCollections, item))
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