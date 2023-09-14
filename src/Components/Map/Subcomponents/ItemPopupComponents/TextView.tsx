import * as React from 'react'
import { Item } from '../../../../types'
import { useAddTag, useTags } from '../../hooks/useTags';
import reactStringReplace from 'react-string-replace';
import { useAddFilterTag } from '../../hooks/useFilter';
import { hashTagRegex } from '../../../../Utils/HashTagRegex';
import { fixUrls, mailRegex } from '../../../../Utils/ReplaceURLs';
import { useMap } from 'react-leaflet';
import { randomColor } from '../../../../Utils/RandomColor';
import { useEffect, useRef } from 'react';

export const TextView = ({ item }: { item?: Item }) => {
  const tags = useTags();
  const addTag = useAddTag();
  const addFilterTag = useAddFilterTag();

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

  replacedText = reactStringReplace(replacedText, hashTagRegex, (match, i) => {

    const tag = tags.find(t => t.id.toLowerCase() == match.slice(1).toLowerCase())
    return (
      <a style={{ color: tag ? tag.color : '#aaa' , fontWeight: 'bold', cursor: 'pointer' }} key={tag ? tag.id+item!.id+i  : i} onClick={() => {
        addFilterTag(tag!);
       // map.fitBounds(items)
       // map.closePopup();
      }}>{match}</a>
    )
  })

  return (
    <p style={{ whiteSpace: "pre-wrap" }} className="!tw-m-0 !tw-mb-2">
      {replacedText}
    </p>
  )



}
