import { uploadFiles } from '@directus/sdk';
import { directusClient } from './directus';
import { AssetsApi } from 'utopia-ui/dist/types';


export class assetsApi implements AssetsApi{

  url : string;

  constructor(url: string) {
    this.url = url;
  }

  async upload(file:Blob, title: string) {

    const formData = new FormData();
    formData.append('title', title);
    formData.append('file', file);

    try {
      return await directusClient.request(uploadFiles(formData));
    } catch (error: any) {
      console.log(error);
        throw error;
    }
  }
}