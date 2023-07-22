import * as React from 'react'
import { useEffect } from 'react';
import { Tag } from '../../types';
import { useAddTag } from './hooks/useTags'

export function Tags({data} : {data: Tag[]}) {
const addTag = useAddTag();
useEffect(() => {
    data.map(tag => {
        tag.id = tag.id.toLocaleLowerCase();
        addTag(tag)
    })
}, [addTag, data])

  return (
    <></>
  )
}
