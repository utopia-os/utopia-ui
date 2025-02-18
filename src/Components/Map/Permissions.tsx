import { useEffect } from 'react'

import { useAuth } from '#components/Auth'

import { useSetPermissionData, useSetPermissionApi, useSetAdminRole } from './hooks/usePermissions'

import type { ItemsApi } from '#types/ItemsApi'
import type { Permission } from '#types/Permission'

/**
 * @category Types
 */
export interface PermissionsProps {
  data?: Permission[]
  api?: ItemsApi<Permission>
  adminRole?: string
}
export type { Permission } from '#types/Permission'
export type { ItemsApi } from '#types/ItemsApi'

/**
 * @category Map
 */
export function Permissions({ data, api, adminRole }: PermissionsProps) {
  const setPermissionData = useSetPermissionData()
  const setPermissionApi = useSetPermissionApi()
  const setAdminRole = useSetAdminRole()
  const { user } = useAuth()

  useEffect(() => {
    adminRole && setAdminRole(adminRole)
    data && setPermissionData(data)
    api && setPermissionApi(api)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api, data, adminRole, user])

  return <></>
}
