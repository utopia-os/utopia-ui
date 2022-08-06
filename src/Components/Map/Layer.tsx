import * as React from 'react'
import { Marker } from 'react-leaflet'
import { Item, Tag, Layer as LayerProps } from '../../types'
import MarkerIconFactory from '../../Utils/MarkerIconFactory'
import { Popup } from './Subcomponents/Popup'
import { useLayers, useAddLayer } from './hooks/useLayers'
import { useTags } from './hooks/useTags'

export const Layer = (props: LayerProps) => {

    const tags = useTags();    
    
    // create a JS-Map with all Tags 
    let tagMap = new Map(tags?.map(key => [key.id, key]));

    // returns all tags for passed item
    const getTags = (item: Item) => {
        let tags: Tag[] = [];
        item.tags && item.tags.forEach(element => {
            if (tagMap.has(element)) { tags.push(tagMap.get(element)!); };
        });
        return tags;
    };

    const addLayer = useAddLayer();
    addLayer(props);
    const layers = useLayers();
    
    return (
        <>
            {layers.get(props.name)?.data?.map((place: Item) => {
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
