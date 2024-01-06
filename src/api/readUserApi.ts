import { readUser } from '@directus/sdk';
import { directusClient } from './directus';



export class readUserApi{

  async getItem(id : string) {
    try {
      return await directusClient.request(readUser(id));
    } catch (error: any) {
      console.log(error);
      if (error.errors[0]?.message)
        throw error.errors[0].message;
      else throw error;
    }
  }

}