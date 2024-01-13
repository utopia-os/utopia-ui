import * as React from 'react'
import { Marker, Tooltip, useMap, useMapEvents } from 'react-leaflet'
import { Item, LayerProps } from '../../types'
import MarkerIconFactory from '../../Utils/MarkerIconFactory'
import { ItemViewPopup } from './Subcomponents/ItemViewPopup'
import { useItems, useSetItemsApi, useSetItemsData } from './hooks/useItems'
import { useEffect } from 'react'
import { ItemFormPopup } from './Subcomponents/ItemFormPopup'
import { useFilterTags, useIsLayerVisible } from './hooks/useFilter'
import { useGetItemTags } from './hooks/useTags'
import { useAddMarker, useAddPopup, useLeafletRefs } from './hooks/useLeafletRefs'
import { Popup } from 'leaflet'
import { useLocation } from 'react-router-dom';
import { useAssetApi } from '../AppShell/hooks/useAssets'
import { getValue } from '../../Utils/GetValue'

export const Layer = ( {
    data,
    children,
    name='places',
    menuIcon='MapPinIcon',
    menuText='add new place',
    menuColor='#2E7D32',
    markerIcon='circle-solid',
    markerShape='circle',
    markerDefaultColor='#777',
    api,
    itemTitleField='name',
    itemTextField='text',
    itemAvatarField,
    itemColorField,
    itemOwnerField,
    setItemFormPopup,
    itemFormPopup,
    clusterRef
}: LayerProps) => {

    const filterTags = useFilterTags();

    const items = useItems();
    const setItemsApi = useSetItemsApi();
    const setItemsData = useSetItemsData();
    const getItemTags = useGetItemTags();
    const addMarker = useAddMarker();
    const addPopup = useAddPopup();
    const leafletRefs = useLeafletRefs();

    let location = useLocation();


    const map = useMap();

    const isLayerVisible = useIsLayerVisible();

    const assetsApi = useAssetApi();


    useEffect(() => {

        data && setItemsData({data, children, name, menuIcon, menuText, menuColor, markerIcon, markerShape, markerDefaultColor, api, itemTitleField, itemTextField, itemAvatarField, itemColorField, setItemFormPopup, itemFormPopup, clusterRef});
        api && setItemsApi({data, children, name, menuIcon, menuText, menuColor, markerIcon, markerShape, markerDefaultColor, api, itemTitleField, itemTextField, itemAvatarField, itemColorField, setItemFormPopup, itemFormPopup, clusterRef});
    }, [data, api])

    useMapEvents({
        popupopen: (e) => {
            const item = Object.entries(leafletRefs).find(r => r[1].popup == e.popup)?.[1].item;                     
            if (item?.layer?.name == name && window.location.pathname.split("/")[2] != item.id) {
                window.history.pushState({}, "", `/${name}/${item.id}`)
                let title = "";
                if(item.name) title = item.name;
                else if (item.layer?.itemTitleField) title = getValue(item, item.layer.itemTitleField);
                document.title = `${document.title.split("-")[0]} - ${title}`;
            }
        },
    })

    const openPopup = () => {
        if (window.location.pathname.split("/").length <= 2 || window.location.pathname.split("/")[2] === "") {
            map.closePopup();
        }
        else {
            if (window.location.pathname.split("/")[1] == name) {

                if (window.location.pathname.split("/")[2]) {
                    const id = window.location.pathname.split("/")[2]
                    const marker = leafletRefs[id]?.marker;
                    if (marker && marker != null) {
                        marker !== null && clusterRef?.current?.zoomToShowLayer(marker, () => {
                            marker.openPopup();
                        });
                        const item = leafletRefs[id]?.item;
                        let title = "";
                        if(item.name) title = item.name;
                        else if (item.layer?.itemTitleField) title = getValue(item, item.layer.itemTitleField);
                        document.title = `${document.title.split("-")[0]} - ${title}`;
                        document.querySelector('meta[property="og:title"]')?.setAttribute("content", item.name);
                        document.querySelector('meta[property="og:description"]')?.setAttribute("content", item.text);
                    }
                }
            }
        }

    }

    useEffect(() => {
        openPopup();
    }, [leafletRefs, location])


    return (
        <>
            {items &&
                items.
                    filter(item => item.text).
                    filter(item => item.layer?.name === name)?.
                    filter(item =>
                        filterTags.length == 0 ? item : filterTags.every(tag => getItemTags(item).some(filterTag => filterTag.id === tag.id)))?.
                    filter(item => item.layer && isLayerVisible(item.layer)).
                    map((item: Item) => {
                        const tags = getItemTags(item);

                        let color1 = markerDefaultColor;
                        let color2 = "RGBA(35, 31, 32, 0.2)";
                        if (itemColorField) color1 = getValue(item, itemColorField);
                        if(color1 == null) color1 = markerDefaultColor;
                        
                        else if (tags && tags[0]) {
                            color1 = tags[0].color;
                        }
                        if (tags && tags[0] && itemColorField) color2 = tags[0].color;
                        else if (tags && tags[1]) {
                            color2 = tags[1].color;
                        }
                        return (
                            <Marker ref={(r) => {
                                if (!(item.id in leafletRefs && leafletRefs[item.id].marker == r))
                                    r && addMarker(item, r);
                            }} icon={MarkerIconFactory(markerShape, color1, color2, markerIcon)} key={item.id} position={[item.position.coordinates[1], item.position.coordinates[0]]}>
                                {
                                    (children && React.Children.toArray(children).some(child => React.isValidElement(child) && child.props.__TYPE === "ItemView") ?
                                        React.Children.toArray(children).map((child) =>
                                            React.isValidElement(child) && child.props.__TYPE === "ItemView" ?
                                                <ItemViewPopup ref={(r) => {
                                                    if (!(item.id in leafletRefs && leafletRefs[item.id].popup == r))
                                                        r && addPopup(item, r as Popup);
                                                }} key={item.id + item.name}
                                                    title={itemTitleField && item ? getValue(item, itemTitleField) : undefined}
                                                    avatar={itemAvatarField && item && getValue(item, itemAvatarField)? assetsApi.url + getValue(item, itemAvatarField) : undefined}
                                                    owner={itemOwnerField && item ? getValue(item, itemOwnerField) : undefined}
                                                    item={item}
                                                    setItemFormPopup={setItemFormPopup}>
                                                    {child}
                                                </ItemViewPopup>
                                                : ""
                                        )
                                        :
                                        <>
                                            <ItemViewPopup key={item.id + item.name} ref={(r) => {
                                                if (!(item.id in leafletRefs  && leafletRefs[item.id].popup == r))
                                                    r && addPopup(item, r as Popup);
                                            }} title={itemTitleField && item ? getValue(item, itemTitleField) : undefined}
                                                avatar={itemAvatarField && item  && getValue(item, itemAvatarField)? assetsApi.url + getValue(item, itemAvatarField) : undefined}
                                                owner={itemOwnerField && item ? getValue(item, itemOwnerField) : undefined}
                                                item={item}
                                                setItemFormPopup={setItemFormPopup} />
                                        </>)
                                }
                                <Tooltip offset={[0, -38]} direction='top'>{item.name? item.name : getValue(item, itemTitleField)}</Tooltip>
                            </Marker>
                        );
                    })
            }
            {//{children}}
            }
            {itemFormPopup && itemFormPopup.layer!.name == name &&
                (children && React.Children.toArray(children).some(child => React.isValidElement(child) && child.props.__TYPE === "ItemForm") ?
                    React.Children.toArray(children).map((child) =>
                        React.isValidElement(child) && child.props.__TYPE === "ItemForm" ?
                            <ItemFormPopup key={setItemFormPopup?.name} position={itemFormPopup!.position} layer={itemFormPopup!.layer} setItemFormPopup={setItemFormPopup} item={itemFormPopup!.item} >{child}</ItemFormPopup>
                            : ""
                    )
                    :
                    <>
                        <ItemFormPopup position={itemFormPopup!.position} layer={itemFormPopup!.layer} setItemFormPopup={setItemFormPopup} item={itemFormPopup!.item} />
                    </>)
            }
        </>
    )
}