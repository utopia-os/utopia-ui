import * as React from 'react'
import { Item } from '../../../../types'
import { useTags } from '../../hooks/useTags';
import { replaceURLs } from '../../../../Utils/ReplaceURLs';
import reactStringReplace from 'react-string-replace';
import { useAddFilterTag, useResetFilterTags } from '../../hooks/useFilter';
import { hashTagRegex } from '../../../../Utils/HashTagRegex';

export const TextView = ({item} : {item?: Item}) => {
    const tags = useTags();

    const addFilterTag = useAddFilterTag();
    const resetFilterTags = useResetFilterTags();


    return(
      <>
      {
            reactStringReplace(item?.text, hashTagRegex, (match, i) => (
              <>
              {
               
              tags.filter(t => t.id.toLowerCase() == match.slice(1).toLowerCase()).map(tag => 
                 <a style={{color: tag.color, fontWeight: 'bold', cursor: 'pointer'}} key={tag.id+i+item?.id} onClick={()=>{
                  resetFilterTags();
                  addFilterTag(tag);
                }}>#{tag.id}</a>
        
              
                )
              }
              </>
            ))
      }
      </>
    )

    

}
