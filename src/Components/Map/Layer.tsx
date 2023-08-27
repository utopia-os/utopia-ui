import * as React from 'react'
import { Marker } from 'react-leaflet'
import { Item, Tag, LayerProps } from '../../types'
import MarkerIconFactory from '../../Utils/MarkerIconFactory'
import { ItemViewPopup } from './Subcomponents/ItemViewPopup'
import { useTags } from './hooks/useTags'
import { useAddItem, useItems, useResetItems } from './hooks/useItems'
import { useEffect, useState } from 'react'
import { useAddLayer } from './hooks/useLayers'
import { ItemFormPopupProps, ItemFormPopup } from './Subcomponents/ItemFormPopup'
import { toast } from 'react-toastify'
import { hashTagRegex } from '../../Utils/HeighlightTags'


export const Layer = (props: LayerProps) => {

    const [itemFormPopup, setItemFormPopup] = useState<ItemFormPopupProps | null>(null);

    const tags = useTags();

    const items = useItems();
    const addItem = useAddItem()
    const addLayer = useAddLayer();
    const resetItems = useResetItems();

    const getItemTags = (item: Item) : Tag[] => {
        const itemTagStrings = item.text.toLocaleLowerCase().match(hashTagRegex);
        const itemTags: Tag[] = [];
        itemTagStrings?.map(tag => {
            if (tags.find(t => t.id === tag.slice(1))) { itemTags.push(tags.find(t => t.id === tag.slice(1))!) }
        })
        return itemTags;
    };

    const loadItems = async () => {
        props.data?.map(item => {
            if (item.position) {
                item.layer = props;
                addItem(item);
            }
        })
        
        if (props.api) {
            addLayer(props);
        }

        if(props.api) {
            const result = await toast.promise(
                props.api!.getItems(),
                {
                  pending: `loading ${props.name} ...`,
                  success: `${props.name} loaded` ,
                  error: `error while loading ${props.name}`
                }
            );
            if (result) {
                result.map(item => {
                    if (item.position) {
                        addItem(({ layer: props, api: props.api, ...item }));
                    }
                });
            }
        }
    }

    useEffect(() => {
        resetItems(props);
        loadItems();
    }, [props.data, props.api])

    return (
        <>
            {items &&
                items.filter(item => item.layer?.name === props.name)?.map((place: Item) => {
                    const tags = getItemTags(place);
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
                            {
                                (props.children && React.Children.toArray(props.children).some(child => React.isValidElement(child) && child.props.__TYPE === "ItemView") ?
                                    React.Children.toArray(props.children).map((child) =>
                                        React.isValidElement(child) && child.props.__TYPE === "ItemView" ?
                                            <ItemViewPopup key={place.id} item={place} setItemFormPopup={props.setItemFormPopup} >{child}</ItemViewPopup>
                                            : ""
                                    )
                                    :
                                    <>
                                        <ItemViewPopup item={place} setItemFormPopup={props.setItemFormPopup} />
                                    </>)
                            }

                        </Marker>
                    );
                })
            }
            {//{props.children}}
            }
            {props.itemFormPopup && props.itemFormPopup.layer!.name == props.name &&
                (props.children && React.Children.toArray(props.children).some(child => React.isValidElement(child) && child.props.__TYPE === "ItemForm") ?
                    React.Children.toArray(props.children).map((child) =>
                        React.isValidElement(child) && child.props.__TYPE === "ItemForm" ?
                            <ItemFormPopup key={props.setItemFormPopup?.name} position={props.itemFormPopup!.position} layer={props.itemFormPopup!.layer} setItemFormPopup={setItemFormPopup} item={props.itemFormPopup!.item} api={props.api} >{child}</ItemFormPopup>
                            : ""
                    )
                    :
                    <>
                        <ItemFormPopup position={props.itemFormPopup!.position} layer={props.itemFormPopup!.layer} setItemFormPopup={setItemFormPopup} item={props.itemFormPopup!.item} api={props.api} />
                    </>)
            }
        </>
    )
}
