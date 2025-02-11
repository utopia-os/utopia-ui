import { readPermissions } from "@directus/sdk";
import { directusClient } from "./directus";
import { ItemsApi, Permission } from "utopia-ui";

export class permissionsApi implements ItemsApi<Permission> {
  constructor() {}

  async getItems(): Promise<Permission[]> {
    try {
      const result = await directusClient.request(
        readPermissions({ fields: ["*", { policy: ["name", "roles"] } as any] })
      );
      return result as unknown as Permission[]
    } catch (error: any) {
      console.log(error);
      if (error.errors[0]?.message) throw error.errors[0].message;
      else throw error;
    }
  }
}
