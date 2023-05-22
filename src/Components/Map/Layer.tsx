import * as React from 'react'
import { Marker } from 'react-leaflet'
import { Item, Tag, Layer as LayerProps } from '../../types'
import MarkerIconFactory from '../../Utils/MarkerIconFactory'
import { Popup } from './Subcomponents/Popup'
import { useTags } from './hooks/useTags'
import { useAddItem, useItems, useResetItems } from './hooks/useItems'
import { useEffect } from 'react'
import { useAddLayer } from './hooks/useLayers'

export const Layer = (props: LayerProps) => {

    const tags = useTags();

    // create a JS-Map with all Tags 
    const tagMap = new Map(tags?.map(key => [key.id, key]));

    // returns all tags for passed item
    const getTags = (item: Item) => {
        const tags: Tag[] = [];
        item.tags && item.tags.forEach(element => {
            if (tagMap.has(element)) { tags.push(tagMap.get(element)!)}
        });
        return tags;
    };

    const items = useItems();
    const addItem = useAddItem()
    const addLayer = useAddLayer();
    const resetItems = useResetItems();

    useEffect(() => {
        resetItems(props);
        props.data?.map(item => {
            if(item.position) {
                item.layer = props;
                addItem(item);
            }   
        })
        addLayer(props);
    }, [props.data])


    return (
        <>
            {items.filter(item => item.layer?.name === props.name)?.map((place: Item) => {              
                const tags = getTags(place);
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
                        <Popup item={place} tags={tags} setNewItemPopup={props.setNewItemPopup}/>
                    </Marker>
                );
            })
            }
            {props.children}
        </>
    )
}
