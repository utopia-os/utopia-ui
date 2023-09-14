import * as React from 'react'
import { Marker, Tooltip, useMap, useMapEvents } from 'react-leaflet'
import { Item, LayerProps } from '../../types'
import MarkerIconFactory from '../../Utils/MarkerIconFactory'
import { ItemViewPopup } from './Subcomponents/ItemViewPopup'
import { useItems, useSetItemsApi, useSetItemsData } from './hooks/useItems'
import { useEffect, useState } from 'react'
import { ItemFormPopupProps, ItemFormPopup } from './Subcomponents/ItemFormPopup'
import { useFilterTags, useSearchPhrase } from './hooks/useFilter'
import { useGetItemTags } from './hooks/useTags'
import { useAddMarker, useAddPopup, useLeafletRefs } from './hooks/useLeafletRefs'
import { Popup } from 'leaflet'


export const Layer = (props: LayerProps) => {

    const [itemFormPopup, setItemFormPopup] = useState<ItemFormPopupProps | null>(null);

    const filterTags = useFilterTags();

    const items = useItems();
    const setItemsApi = useSetItemsApi();
    const setItemsData = useSetItemsData();
    const getItemTags = useGetItemTags();
    const addMarker = useAddMarker();
    const addPopup = useAddPopup();
    const leafletRefs = useLeafletRefs();

    const searchPhrase = useSearchPhrase();

    const map = useMap();


    useEffect(() => {

        props.data && setItemsData(props);
        props.api && setItemsApi(props);
    }, [props.data, props.api])

    const openPopup = () => {
        if (window.location.pathname.split("/")[1] == props.name) {
            const id = window.location.pathname.split("/")[2]
            const marker = leafletRefs[id]?.marker;
            if (marker && marker != null) {
                marker !== null && props.clusterRef?.current?.zoomToShowLayer(marker, () => {
                    marker.openPopup();
                });
            }
        }
    }

    useMapEvents({
        popupopen: (e) => {
            const item = Object.entries(leafletRefs).find(r => r[1].popup == e.popup)?.[1].item;
            if(item?.layer?.name == props.name )
            window.history.pushState({},"",`/${props.name}/${item.id}`)
        },


    })

    useEffect(() => {
        openPopup();
    }, [leafletRefs])


    return (
        <>
            {items &&
                items.
                    filter(item => item.layer?.name === props.name)?.
                    filter(item =>
                        filterTags.length == 0 ? item : filterTags.every(tag => getItemTags(item).some(filterTag => filterTag.id === tag.id)))?.
                    filter(item => {
                        return searchPhrase === ''
                            ? item :
                            item.name.toLowerCase().includes(searchPhrase.toLowerCase())
                    }).
                    map((item: Item) => {
                        const tags = getItemTags(item);

                        let color1 = "#666";
                        let color2 = "RGBA(35, 31, 32, 0.2)";
                        if (tags && tags[0]) {
                            color1 = tags[0].color;
                        }
                        if (tags && tags[1]) {
                            color2 = tags[1].color;
                        }
                        return (
                            <Marker ref={(r) => {
                                if (!(item.id in leafletRefs))
                                    r && addMarker(item, r);
                            }} icon={MarkerIconFactory(props.markerShape, color1, color2, props.markerIcon)} key={item.id} position={[item.position.coordinates[1], item.position.coordinates[0]]}>
                                {
                                    (props.children && React.Children.toArray(props.children).some(child => React.isValidElement(child) && child.props.__TYPE === "ItemView") ?
                                        React.Children.toArray(props.children).map((child) =>
                                            React.isValidElement(child) && child.props.__TYPE === "ItemView" ?
                                                <ItemViewPopup ref={(r) => {
                                                    if (!(item.id in leafletRefs))
                                                        r && addPopup(item, r as Popup);
                                                }} key={item.id + item.name} item={item} setItemFormPopup={props.setItemFormPopup} >{child}</ItemViewPopup>
                                                : ""
                                        )
                                        :
                                        <>
                                            <ItemViewPopup key={item.id + item.name} ref={(r) => {
                                                if (!(item.id in leafletRefs))
                                                    r && addPopup(item, r as Popup);
                                            }} item={item} setItemFormPopup={props.setItemFormPopup} />
                                        </>)
                                }
                                <Tooltip offset={[0, -38]} direction='top'>{item.name}</Tooltip>
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
                            <ItemFormPopup key={props.setItemFormPopup?.name} position={props.itemFormPopup!.position} layer={props.itemFormPopup!.layer} setItemFormPopup={setItemFormPopup} item={props.itemFormPopup!.item} >{child}</ItemFormPopup>
                            : ""
                    )
                    :
                    <>
                        <ItemFormPopup position={props.itemFormPopup!.position} layer={props.itemFormPopup!.layer} setItemFormPopup={setItemFormPopup} item={props.itemFormPopup!.item} />
                    </>)
            }
        </>
    )
}
