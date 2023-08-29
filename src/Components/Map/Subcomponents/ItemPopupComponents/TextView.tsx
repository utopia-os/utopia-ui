import * as React from 'react'
import { Item } from '../../../../types'
import { useTags } from '../../hooks/useTags';
import reactStringReplace from 'react-string-replace';
import { useAddFilterTag, useResetFilterTags } from '../../hooks/useFilter';
import { hashTagRegex } from '../../../../Utils/HashTagRegex';
import { fixUrls, mailRegex, urlRegex } from '../../../../Utils/ReplaceURLs';

export const TextView = ({ item }: { item?: Item }) => {
  const tags = useTags();

  const addFilterTag = useAddFilterTag();
  const resetFilterTags = useResetFilterTags();



  let replacedText;

  if (item && item.text) replacedText = fixUrls(item.text);



  replacedText = reactStringReplace(replacedText, /(https?:\/\/\S+)/g, (url, i) => {
    let  shortUrl =  url;  
    if (url.match('^https:\/\/')) {
      shortUrl = url.split('https://')[1];
    }
    if (url.match('^http:\/\/')) {
      shortUrl = url.split('http://')[1];
    }    
    return (
      <a key={i.toString+item!.id+url} href={url} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
    )
  });

  replacedText = reactStringReplace(replacedText, mailRegex, (url, i) => {
    return (
      <a key={i.toString+item!.id+url} href={`mailto:${url}`} target="_blank" rel="noopener noreferrer">{url}</a>
    )
  });

  //ts-ignore
  replacedText = reactStringReplace(replacedText, hashTagRegex, (match, i) => {

    const tag = tags.find(t => t.id.toLowerCase() == match.slice(1).toLowerCase())
    return (
      <a style={{ color: tag ? tag.color : '#aaa' , fontWeight: 'bold', cursor: 'pointer' }} key={tag ? tag.id+item!.id+i  : i} onClick={() => {
        resetFilterTags();
        addFilterTag(tag!);
      }}>{match}</a>
    )



  })

  return (
    <p style={{ whiteSpace: "pre-wrap" }} className="!tw-m-0 !tw-mb-2">
      {replacedText}
    </p>
  )



}
