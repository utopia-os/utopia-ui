import { createUser, readMe, updateMe} from '@directus/sdk';
import {  directusClient } from './directus';
import { UserApi, UserItem } from 'utopia-ui/dist/types';


export class userApi implements UserApi {

  async register(email: string, password: string, userName: string): Promise<any> {
    try {
      return await directusClient.request(createUser({email: email, password: password, first_name: userName}));
    } catch (error) {
      console.log(error);
    }
  }

  async login(email: string, password: string): Promise<any> {
    try {
      return await directusClient.login(email,password,{mode: 'json'});
    } catch (error) {
      console.log(error);
      throw new Error("Failed while logging User in");
    }
  }
  async logout(): Promise<any> {
    try {
      return await directusClient.logout();
    } catch (error) {
      console.log(error);
      throw new Error("Failed while logging User out");
    }
  }
  async getUser(): Promise<any> {
    try {
      let user = await directusClient.request(readMe());
      return user;
    } catch (error) {    
      console.log(error);
      throw new Error("Failed while loading User");
    }
  }

    async getToken(): Promise<any> {
    try {
    const token = await directusClient.getToken();
      return token;
    } catch (error) {
      console.log(error);
      throw new Error("Failed while loading User Token");
    }
  }

  async updateUser(user: UserItem): Promise<any> {
    const { id, ...userRest } = user;
    try {
      const res = await directusClient.request(updateMe(userRest))
      return res as any;
    } catch (error: any) {
      console.log(error);
      throw new Error("Failed while updating User Profile");
    }
  }

}









