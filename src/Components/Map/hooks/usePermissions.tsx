import { useCallback, useReducer, createContext, useContext } from 'react'
import * as React from 'react'
import { Item, ItemsApi, LayerProps, Permission, PermissionAction } from '../../../types'
import { useAuth } from '../../Auth'

type ActionType = { type: 'ADD'; permission: Permission } | { type: 'REMOVE'; id: string }

type UsePermissionManagerResult = ReturnType<typeof usePermissionsManager>

const PermissionContext = createContext<UsePermissionManagerResult>({
  permissions: [],
  setPermissionApi: () => {},
  setPermissionData: () => {},
  setAdminRole: () => {},
  hasUserPermission: () => true,
})

function usePermissionsManager(initialPermissions: Permission[]): {
  permissions: Permission[]

  setPermissionApi: (api: ItemsApi<any>) => void

  setPermissionData: (data: Permission[]) => void

  setAdminRole: (adminRole: string) => void

  hasUserPermission: (
    collectionName: string,
    action: PermissionAction,
    item?: Item,
    layer?: LayerProps,
  ) => boolean
} {
  const [permissions, dispatch] = useReducer((state: Permission[], action: ActionType) => {
    switch (action.type) {
      case 'ADD':
        // eslint-disable-next-line no-case-declarations
        const exist = state.find((permission) => permission.id === action.permission.id)
        if (!exist) {
          return [...state, action.permission]
        } else return state

      case 'REMOVE':
        return state.filter(({ id }) => id !== action.id)
      default:
        throw new Error()
    }
  }, initialPermissions)

  const [adminRole, setAdminRole] = React.useState<string | null>(null)
  const { user } = useAuth()

  const setPermissionApi = useCallback(async (api: ItemsApi<Permission>) => {
    const result = await api.getItems()
    if (result) {
      result.map((permission) => {
        dispatch({ type: 'ADD', permission })
        return null
      })
    }
  }, [])

  const setPermissionData = useCallback((data: Permission[]) => {
    data.map((permission) => {
      dispatch({ type: 'ADD', permission })
      return null
    })
  }, [])

  const hasUserPermission = useCallback(
    (collectionName: string, action: PermissionAction, item?: Item, layer?: LayerProps) => {
      const evaluateCondition = (condition: any) => {
        if (condition.user_created?._eq === '$CURRENT_USER') {
          return item?.user_created?.id === user?.id
        }
        if (condition.public_edit?._eq === true) {
          return item?.public_edit === true
        }
        return false
      }

      const evaluatePermissions = (permissionConditions: any) => {
        if (!permissionConditions || !permissionConditions._and) {
          return true
        }

        return permissionConditions._and.every((andCondition: any) =>
          andCondition._or
            ? andCondition._or.some((orCondition: any) => evaluateCondition(orCondition))
            : evaluateCondition(andCondition),
        )
      }
      if (collectionName === 'items' && action === 'create' && layer?.public_edit_items) return true
      // Bedingung für leere Berechtigungen nur, wenn NICHT item und create
      if (permissions.length === 0) return true
      else if (user && user.role.id === adminRole) return true
      else {
        return permissions.some(
          (p) =>
            p.action === action &&
            p.collection === collectionName &&
            ((p.policy?.name === user?.role.name &&
              (!item || evaluatePermissions(p.permissions))) ||
              (p.policy?.name === '$t:public_label' &&
                (layer?.public_edit_items || item?.layer?.public_edit_items) &&
                (!item || evaluatePermissions(p.permissions)))),
        )
      }
    },
    [permissions, user, adminRole],
  )

  return { permissions, setPermissionApi, setPermissionData, setAdminRole, hasUserPermission }
}

export const PermissionsProvider: React.FunctionComponent<{
  initialPermissions: Permission[]
  children?: React.ReactNode
}> = ({ initialPermissions, children }) => (
  <PermissionContext.Provider value={usePermissionsManager(initialPermissions)}>
    {children}
  </PermissionContext.Provider>
)

export const usePermissions = (): Permission[] => {
  const { permissions } = useContext(PermissionContext)
  return permissions
}

export const useSetPermissionApi = (): UsePermissionManagerResult['setPermissionApi'] => {
  const { setPermissionApi } = useContext(PermissionContext)
  return setPermissionApi
}

export const useSetPermissionData = (): UsePermissionManagerResult['setPermissionData'] => {
  const { setPermissionData } = useContext(PermissionContext)
  return setPermissionData
}

export const useHasUserPermission = (): UsePermissionManagerResult['hasUserPermission'] => {
  const { hasUserPermission } = useContext(PermissionContext)
  return hasUserPermission
}

export const useSetAdminRole = (): UsePermissionManagerResult['setAdminRole'] => {
  const { setAdminRole } = useContext(PermissionContext)
  return setAdminRole
}
