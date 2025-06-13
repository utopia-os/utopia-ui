import { useEffect } from 'react'

import { useAuth } from '#components/Auth/useAuth'

import { useSetPermissionData, useSetPermissionApi, useSetAdminRole } from './hooks/usePermissions'

import type { ItemsApi } from '#types/ItemsApi'
import type { Permission } from '#types/Permission'

export type { Permission } from '#types/Permission'
export type { ItemsApi } from '#types/ItemsApi'

/**
 * This Components injects Permissions comming from an {@link ItemsApi | `API`}
 * ```tsx
 * <Permissions api={itemsApiInstance} adminRole="8141dee8-8e10-48d0-baf1-680aea271298" />
 * ```
 * or from on {@link Permission| `Array`}
 * ```tsx
 * <Permissions data={permissions} adminRole="8141dee8-8e10-48d0-baf1-680aea271298" />
 * ```
 * Can be child of {@link AppShell | `AppShell`}
 * ```tsx
 * <AppShell>
 *     ...
 *     <Permissions api={itemsApiInstance} adminRole="8141dee8-8e10-48d0-baf1-680aea271298" />
 * </AppShell>
 *  ```
 * Or child of {@link UtopiaMap | `UtopiaMap`}
 * ```tsx
 * <UtopiaMap>
 *     ...
 *     <Permissions api={itemsApiInstance} adminRole="8141dee8-8e10-48d0-baf1-680aea271298" />
 * </UtopiaMap>
 * ```
 * @category Map
 */
export function Permissions({
  data,
  api,
  adminRole,
}: {
  /** Array with all the permissions inside */
  data?: Permission[]
  /** API to fetch all the permissions from a server */
  api?: ItemsApi<Permission>
  /** UUID of the admin role which has always all the permissions */
  adminRole?: string
}) {
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
