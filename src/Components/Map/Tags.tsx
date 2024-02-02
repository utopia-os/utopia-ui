import * as React from 'react'
import { useEffect } from 'react';
import { ItemsApi, Tag } from '../../types';
import { useSetTagData, useSetTagApi } from './hooks/useTags'

export function Tags({data, api} : {data?: Tag[], api?: ItemsApi<Tag>}) {
const setTagData = useSetTagData();
const setTagApi = useSetTagApi();

useEffect(() => {
  data && setTagData(data); 
  api && setTagApi(api);  
}, [api, data])

  return (
    <></>
  )
}
