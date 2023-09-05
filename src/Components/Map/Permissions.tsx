import * as React from 'react'
import { useEffect } from 'react';
import { ItemsApi, Permission } from '../../types';
import {  useSetPermissionData, useSetPermissionApi, useSetAdminRole } from './hooks/usePermissions'
import { useAuth } from '../Auth';

export function Permissions({data, api, adminRole} : {data?: Permission[], api?: ItemsApi<Permission>, adminRole?: string}) {
const setPermissionData = useSetPermissionData();
const setPermissionApi = useSetPermissionApi();
const setAdminRole = useSetAdminRole();
const {user} = useAuth();

useEffect(() => {
  console.log(adminRole);
  
  adminRole && setAdminRole(adminRole);
  data && setPermissionData(data); 
  api && setPermissionApi(api);  
}, [api, data, adminRole, user])

  return (
    <></>
  )
}
