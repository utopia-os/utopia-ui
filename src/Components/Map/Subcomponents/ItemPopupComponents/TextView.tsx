import * as React from 'react'
import { Item } from '../../../../types'
import { useTags } from '../../hooks/useTags';
import { replaceURLs } from '../../../../Utils/ReplaceURLs';
import { heighlightTags } from '../../../../Utils/HeighlightTags';

export const TextView = ({item} : {item?: Item}) => {
    const all_tags = useTags();

  return (
    <p style={{ whiteSpace: "pre-wrap" }} className="!tw-m-0 !tw-mb-2" dangerouslySetInnerHTML={{ __html: replaceURLs(heighlightTags(item && item.text ? item.text:"", all_tags)) }} />

  )
}
