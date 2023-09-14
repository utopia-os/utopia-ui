import { readPermissions } from '@directus/sdk';
import { directusClient } from './directus';
import { ItemsApi, Permission } from 'utopia-ui/dist/types';



export class permissionsApi implements ItemsApi<Permission>{


  constructor() {
  }

  async getItems() {
    try {
      return await directusClient.request(readPermissions());
    } catch (error: any) {
      console.log(error);
      if (error.errors[0]?.message)
        throw error.errors[0].message;
      else throw error;
    }
  }
}