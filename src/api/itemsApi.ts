import { createItem, deleteItem, readItems, updateItem } from '@directus/sdk';
import {  MyCollections, directusClient } from './directus';
import { ItemsApi } from 'utopia-ui/dist/types';



export class itemsApi<T> implements ItemsApi<T>{

  collectionName : string;

  constructor(collectionName : string) {
    this.collectionName = collectionName;
  }

  async getItems() {
    try {
      return await directusClient.request(readItems(this.collectionName as never,{limit: 500 }));
    } catch (error) {
      console.log(error);
    }
  }

  async createItem(item: T & { id?: string }) {
    try {
      return await directusClient.request(createItem(this.collectionName as keyof MyCollections,item))
    } catch (error) {
      console.log(error);
    }
  }

  async updateItem(item: T & { id?: string }) {
    try {
      return await directusClient.request(updateItem(this.collectionName as keyof MyCollections,item.id!, item))
    } catch (error) {
      console.log(error);
    }
  }

  async deleteItem(id: string ) {
    try {
      return await directusClient.request(deleteItem(this.collectionName as keyof MyCollections,id))
    } catch (error) {
      console.log(error);
    }
  }
}









