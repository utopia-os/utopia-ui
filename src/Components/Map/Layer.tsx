import * as React from 'react'
import { Marker } from 'react-leaflet'
import { Item, Tag, LayerProps } from '../../types'
import MarkerIconFactory from '../../Utils/MarkerIconFactory'
import { ItemViewPopup } from './Subcomponents/ItemViewPopup'
import { useTags } from './hooks/useTags'
import { useAddItem, useItems, useResetItems } from './hooks/useItems'
import { useEffect, useState } from 'react'
import { useAddLayer } from './hooks/useLayers'
import ItemFormPopup, { ItemFormPopupProps } from './Subcomponents/ItemFormPopup'

export const Layer = (props: LayerProps) => {

    const [itemFormPopup, setItemFormPopup] = useState<ItemFormPopupProps | null>(null);


    const tags = useTags();





    // create a JS-Map with all Tags 
    const tagMap = new Map(tags?.map(key => [key.id, key]));
    


    // returns all tags for passed item
    const getTags = (item: Item) => {
        const regex = /(^|\B)#(?![0-9_]+\b)([a-zA-Z0-9_]{1,30})(\b|\r)/g;
        const strings = item.text.toLocaleLowerCase().match(regex);
        const tags: Tag[] = [];
        strings?.map(tag => {
            if (tagMap.has(tag.slice(1))) { tags.push(tagMap.get(tag.slice(1))!) }
        })

        return tags;
    };




    const items = useItems();
    const addItem = useAddItem()
    const addLayer = useAddLayer();
    const resetItems = useResetItems();

    useEffect(() => {
        resetItems(props);

        props.data?.map(item => {
            if (item.position) {
                item.layer = props;
                addItem(item);
            }
        })

        props.api?.getItems().then(result => {
            if (result.data) {
                result.data.map(item => {
                    if (item.position) {
                        addItem(({ layer: props, api: props.api, ...item }));
                    }
                });
            }
        })
        if (props.api || props.api) {
            addLayer(props);
        }

    }, [props.data, props.api])


    return (
        <>
            {items &&
                items.filter(item => item.layer?.name === props.name)?.map((place: Item) => {
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
                            <ItemViewPopup item={place} tags={tags} setItemFormPopup={props.setItemFormPopup} />
                        </Marker>
                    );
                })
            }
            {props.children}
            {props.itemFormPopup && props.itemFormPopup.layer.name == props.name &&
                <ItemFormPopup position={props.itemFormPopup.position} layer={props.itemFormPopup.layer} setItemFormPopup={setItemFormPopup} item={props.itemFormPopup.item} api={props.api} />
            }
        </>
    )
}
