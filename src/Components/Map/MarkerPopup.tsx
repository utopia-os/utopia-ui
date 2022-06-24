import * as React from 'react'
import { Popup } from 'react-leaflet'

export interface IMarkerPopupProps {
  item: IMapItem;
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
  tags: ITag[],
  [key: string]:any
}

export interface IGeometry {
  type: string;
  coordinates: number[];
}

export interface ITag {
  Tags_id :
  {
    color: string;
    id: string;
  }
}

const MarkerPopup = (props:IMarkerPopupProps) => {
  const item:IMapItem = props.item;
  return (
    <Popup>
      <b style={{ fontSize: '1.0rem' }}>{item.name}</b>

      <p>{item.start || ""} {item.end || ""}</p>

      <p>{item.text}</p>
        {item.tags.map((tag:ITag) => (
          <span key={tag.Tags_id.id}>#{tag.Tags_id.id} </span>
        ))}
    </Popup>
  )
}

export default MarkerPopup;
