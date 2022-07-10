import * as React from 'react'
import { Popup } from 'react-leaflet'

export interface IMarkerPopupProps {
  item: IMapItem,
  tags: ITag[]
}

export interface IMapItem {
  id?: string,
  date_created?: string,
  date_updated?: string | null,
  name: string,
  text: string,
  position: IGeometry,
  start?: string,
  end?: string,
  tags?: string[],
  [key: string]:any
}

export interface IGeometry {
  type: string;
  coordinates: number[];
}

export interface ITag {

    color: string;
    id: string;
    name: string;
  
}

const MarkerPopup = (props:IMarkerPopupProps) => {
  const item:IMapItem = props.item;
  return (
    <Popup>
      <b style={{ fontSize: '1.0rem' }}>{item.name}</b>

      <p>{item.start || ""} {item.end || ""}</p>

      <p>{item.text}</p>
        {item.tags&&
        props.tags.map((tag:ITag) => (
          <span className="badge" style={{backgroundColor: tag.color,marginLeft: '.2rem'}} key={tag.id}>#{tag.name}</span>
        ))}
    </Popup>
  )
}

export default MarkerPopup;
