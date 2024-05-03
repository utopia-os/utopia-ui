import { useCallback, useReducer, createContext, useContext } from "react";
import * as React from "react";
import { Item, ItemsApi, Permission, PermissionAction } from "../../../types";
import { useAuth } from "../../Auth";

type ActionType =
  | { type: "ADD"; permission: Permission }
  | { type: "REMOVE"; id: string };

type UsePermissionManagerResult = ReturnType<typeof usePermissionsManager>;

const PermissionContext = createContext<UsePermissionManagerResult>({
  permissions: [],
  setPermissionApi: () => { },
  setPermissionData: () => { },
  setAdminRole: () => { },
  hasUserPermission: () => true
});

function usePermissionsManager(initialPermissions: Permission[]): {
  permissions: Permission[];
  setPermissionApi: (api: ItemsApi<any>) => void;
  setPermissionData: (data: Permission[]) => void;
  setAdminRole: (adminRole: string) => void;
  hasUserPermission: (collectionName: string, action: PermissionAction, item?: Item) => boolean;
} {
  const [permissions, dispatch] = useReducer((state: Permission[], action: ActionType) => {
    switch (action.type) {
      case "ADD":
        const exist = state.find((permission) =>
          permission.id === action.permission.id ? true : false
        );
        if (!exist) return [
          ...state,
          action.permission,
        ];
        else return state;

      case "REMOVE":
        return state.filter(({ id }) => id !== action.id);
      default:
        throw new Error();
    }
  }, initialPermissions);

  const [adminRole, setAdminRole] = React.useState<string | null>(null);
  const { user } = useAuth();


  const setPermissionApi = useCallback(async (api: ItemsApi<Permission>) => {   
    const result = await api.getItems();
    if (result) {
      result.map(permission => {
        dispatch({ type: "ADD", permission })
      })
    }
  }, [])

  const setPermissionData = useCallback((data: Permission[]) => {
    data.map(permission => {
      dispatch({ type: "ADD", permission })
    })
  }, []);

  const hasUserPermission = useCallback(
    (collectionName: string, action: PermissionAction, item?: Item) => {           
      if (permissions.length === 0) return true;
      else if (user && user.role === adminRole) return true;
      else {
        return permissions.some(p =>
          p.action === action &&
          p.collection === collectionName &&
          p.role === user?.role &&
          (
            // Wenn 'item' nicht gesetzt ist, ignorieren wir die Überprüfung von 'user_created'
            !item || !p.permissions || !p.permissions._and ||
            p.permissions._and.some(condition => 
              condition.user_created &&
              condition.user_created._eq === "$CURRENT_USER" &&
              item.user_created?.id === user?.id
            )
          )
    //      || ( !user && p.role == null )
        );
      }
    },
    [permissions, user]
  );
  



  return { permissions, setPermissionApi, setPermissionData, setAdminRole, hasUserPermission };
}

export const PermissionsProvider: React.FunctionComponent<{
  initialPermissions: Permission[], children?: React.ReactNode
}> = ({ initialPermissions, children }) => (
  <PermissionContext.Provider value={usePermissionsManager(initialPermissions)}>
    {children}
  </PermissionContext.Provider>
);

export const usePermissions = (): Permission[] => {
  const { permissions } = useContext(PermissionContext);
  return permissions;
};


export const useSetPermissionApi = (): UsePermissionManagerResult["setPermissionApi"] => {
  const { setPermissionApi } = useContext(PermissionContext);
  return setPermissionApi;
}

export const useSetPermissionData = (): UsePermissionManagerResult["setPermissionData"] => {
  const { setPermissionData } = useContext(PermissionContext);
  return setPermissionData;
}

export const useHasUserPermission = (): UsePermissionManagerResult["hasUserPermission"] => {
  const { hasUserPermission } = useContext(PermissionContext);
  return hasUserPermission;
}

export const useSetAdminRole = (): UsePermissionManagerResult["setAdminRole"] => {
  const { setAdminRole } = useContext(PermissionContext);
  return setAdminRole;
}