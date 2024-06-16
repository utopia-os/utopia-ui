import * as React from 'react'
import { useEffect } from 'react';
import { ItemsApi, Tag } from '../../types';
import { useSetTagData, useSetTagApi, useTags } from './hooks/useTags'
import { useLocation } from 'react-router-dom';
import { useAddFilterTag, useFilterTags, useResetFilterTags } from './hooks/useFilter';

export function Tags({data, api} : {data?: Tag[], api?: ItemsApi<Tag>}) {
const setTagData = useSetTagData();
const setTagApi = useSetTagApi();

useEffect(() => {
  data && setTagData(data); 
  api && setTagApi(api);  
}, [api, data])


const location = useLocation();
const addFilterTag = useAddFilterTag();
const resetFilterTags = useResetFilterTags();
const tags = useTags();
const filterTags = useFilterTags()


useEffect(() => {
  let params = new URLSearchParams(location.search);
  let urlTags = params.get("tags")?.split(",");
  if(urlTags?.some(ut => !filterTags.find(ft => ut.toLocaleLowerCase() === ft.name.toLocaleLowerCase()))||filterTags?.some(ft => !urlTags?.find(ut => ut.toLocaleLowerCase() === ft.name.toLocaleLowerCase())))
  {resetFilterTags()
  urlTags?.map(urlTag => {
      const tag = tags.find(t => t.name.toLocaleLowerCase() === urlTag.toLocaleLowerCase())     
      tag && addFilterTag(tag)
  });}

}, [location, tags]);


  return (
    <></>
  )
}
