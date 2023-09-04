import * as React from 'react'
import { useEffect } from 'react';
import { ItemsApi, Permission } from '../../types';
import {  useSetPermissionData, useSetPermissionApi } from './hooks/usePermissions'

export function Permissions({data, api} : {data?: Permission[], api?: ItemsApi<Permission>}) {
const setPermissionData = useSetPermissionData();
const setPermissionApi = useSetPermissionApi();

useEffect(() => {
  data && setPermissionData(data); 
  api && setPermissionApi(api);  
}, [api, data])

  return (
    <></>
  )
}
