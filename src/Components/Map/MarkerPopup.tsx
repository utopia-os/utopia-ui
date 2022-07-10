import * as React from 'react'
import { Popup } from 'react-leaflet'
import { Item, Tag } from '../../types'

export interface MarkerPopupProps {
  item: Item,
  tags: Tag[]
}

const MarkerPopup = (props:MarkerPopupProps) => {
  const item:Item = props.item;
  const tags:Tag[] = props.tags;



  return (
    <Popup>
      <b style={{ fontSize: '1.0rem' }}>{item.name}</b>

      <p>{item.start || ""} {item.end || ""}</p>

      <p>{item.text}</p>
        {item.tags&&
        tags.map((tag:Tag) => (
          <span className="badge" style={{backgroundColor: tag.color,margin: '.1rem', fontSize: "100%"}} key={tag.id}>#{tag.name}</span>
        ))}
    </Popup>
  )
}

export default MarkerPopup;
