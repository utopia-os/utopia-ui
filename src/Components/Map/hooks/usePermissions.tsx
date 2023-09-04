import { useCallback, useReducer, createContext, useContext } from "react";
import * as React from "react";
import { ItemsApi, Permission } from "../../../types";

type ActionType =
  | { type: "ADD"; permission: Permission }
  | { type: "REMOVE"; id: string };

type UsePermissionManagerResult = ReturnType<typeof usePermissionsManager>;

const PermissionContext = createContext<UsePermissionManagerResult>({
  permissions: [],
  setPermissionApi: () => { },
  setPermissionData: () => { }
});

function usePermissionsManager(initialPermissions: Permission[]): {
  permissions: Permission[];
  setPermissionApi: (api: ItemsApi<Permission>) => void;
  setPermissionData: (data: Permission[]) => void;
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

  const [api, setApi] = React.useState<ItemsApi<Permission>>({} as ItemsApi<Permission>)

  const setPermissionApi = useCallback(async (api: ItemsApi<Permission>) => {
    setApi(api);
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


  return { permissions, setPermissionApi, setPermissionData };
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