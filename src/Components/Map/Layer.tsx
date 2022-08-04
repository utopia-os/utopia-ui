import * as React from 'react'
import { Marker } from 'react-leaflet'
import { Item, Tag } from '../../types'
import MarkerIconFactory from '../../Utils/MarkerIconFactory'
import { Popup } from './Popup'
import { useItems } from './useItems'


export interface LayerProps {
    data?: Item[],
    children?: React.ReactNode
    name: string,
    menuIcon: string,
    menuColor: string,
    menuText: string,
    markerIcon: string,
    markerShape: string,
    markerDefaultColor: string,
    tags?: Tag[]
}

export const Layer = (props: LayerProps) => {
    // create a JS-Map with all Tags 
    let tagMap = new Map(props.tags?.map(key => [key.id, key]));

    // returns all tags for passed item
    const getTags = (item: Item) => {
        let tags: Tag[] = [];
        item.tags && item.tags.forEach(element => {
            if (tagMap.has(element)) { tags.push(tagMap.get(element)!); };
        });
        return tags;
    };

    let items = useItems();

    return (
        <>
            {
                items.map((place: Item) => {
                    console.log("Items check in Layer: " + items);
                    let tags = getTags(place);
                    let color1 = "#666";
                    let color2 = "RGBA(35, 31, 32, 0.2)";
                    if (tags[0]) {
                        color1 = tags[0].color;
                    }
                    if (tags[1]) {
                        color2 = tags[1].color;
                    }
                    return (
                        <Marker icon={MarkerIconFactory(props.markerShape, color1, color2, props.markerIcon)} key={place.id} position={[place.position.coordinates[1], place.position.coordinates[0]]}>
                            <Popup item={place} tags={tags} />
                        </Marker>
                    );
                })
            }
            {props.children}
        </>
    )
}
