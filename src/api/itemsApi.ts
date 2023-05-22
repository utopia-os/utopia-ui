import {  directus } from './directus';


export class itemsApi<T> {

  name ="";

  constructor(name : string) {
    this.name = name;
  }

  async getItems() {
    try {
      return await directus.items(this.name).readByQuery({limit: -1 });
    } catch (error) {
      console.log(error);
    }
  }

  async createItem(item: T & { id?: number }) {
    try {
      return await directus.items(this.name).createOne(item)
    } catch (error) {
      console.log(error);
    }
  }

  async updateItem(item: T & { id?: number }) {
    try {
      return await directus.items(this.name).updateOne(item.id!, item)
    } catch (error) {
      console.log(error);
    }
  }

  async deleteItem(id: number ) {
    try {
      return await directus.items(this.name).deleteOne(id)
    } catch (error) {
      console.log(error);
    }
  }
}









