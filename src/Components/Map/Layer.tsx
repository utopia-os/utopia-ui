import * as React from 'react'
import { Marker, Tooltip, useMap, useMapEvents } from 'react-leaflet'
import { Item, LayerProps, Tag } from '../../types'
import MarkerIconFactory from '../../Utils/MarkerIconFactory'
import { ItemViewPopup } from './Subcomponents/ItemViewPopup'
import { useAllItemsLoaded, useItems, useSetItemsApi, useSetItemsData } from './hooks/useItems'
import { useEffect, useState } from 'react'
import { ItemFormPopup } from './Subcomponents/ItemFormPopup'
import { useFilterTags, useIsGroupTypeVisible, useIsLayerVisible } from './hooks/useFilter'
import { useAddTag, useAllTagsLoaded, useGetItemTags, useTags } from './hooks/useTags'
import { useAddMarker, useAddPopup, useLeafletRefs } from './hooks/useLeafletRefs'
import { Popup } from 'leaflet'
import { useLocation } from 'react-router-dom';
import { getValue } from '../../Utils/GetValue'
import { hashTagRegex } from '../../Utils/HashTagRegex'
import { randomColor } from '../../Utils/RandomColor'
import { encodeTag } from '../../Utils/FormatTags'
import { useSelectPosition, useSetMarkerClicked } from './hooks/useSelectPosition'

export const Layer = ({
    data,
    children,
    name = 'places',
    menuIcon = 'MapPinIcon',
    menuText = 'add new place',
    menuColor = '#2E7D32',
    markerIcon = 'circle-solid',
    markerShape = 'circle',
    markerDefaultColor = '#777',
    markerDefaultColor2,
    api,
    itemType,
    itemNameField = 'name',
    itemSubnameField,
    itemTextField = 'text',
    itemAvatarField,
    itemColorField,
    itemOwnerField,
    itemLatitudeField = 'position.coordinates.1',
    itemLongitudeField = 'position.coordinates.0',
    itemTagsField,
    itemOffersField,
    itemNeedsField,
    onlyOnePerOwner = false,
    customEditLink,
    customEditParameter,
    public_edit_items,
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

    const location = useLocation();

    const allTagsLoaded = useAllTagsLoaded();
    const allItemsLoaded = useAllItemsLoaded();

    const setMarkerClicked = useSetMarkerClicked();
    const selectPosition = useSelectPosition();

    const tags = useTags();
    const addTag = useAddTag();
    const [newTagsToAdd, setNewTagsToAdd] = useState<Tag[]>([]);
    const [tagsReady, setTagsReady] = useState<boolean>(false);


    const map = useMap();

    const isLayerVisible = useIsLayerVisible();

    const isGroupTypeVisible = useIsGroupTypeVisible();



    useEffect(() => {
        data && setItemsData({ data, children, name, menuIcon, menuText, menuColor, markerIcon, markerShape, markerDefaultColor, markerDefaultColor2, api, itemType, itemNameField, itemSubnameField, itemTextField, itemAvatarField, itemColorField, itemOwnerField, itemTagsField, itemOffersField, itemNeedsField, onlyOnePerOwner, customEditLink, customEditParameter, public_edit_items, setItemFormPopup, itemFormPopup, clusterRef });
        api && setItemsApi({ data, children, name, menuIcon, menuText, menuColor, markerIcon, markerShape, markerDefaultColor, markerDefaultColor2, api, itemType, itemNameField, itemSubnameField, itemTextField, itemAvatarField, itemColorField, itemOwnerField, itemTagsField, itemOffersField, itemNeedsField, onlyOnePerOwner, customEditLink, customEditParameter, public_edit_items, setItemFormPopup, itemFormPopup, clusterRef });
    }, [data, api])

    useMapEvents({
        popupopen: (e) => {
            const item = Object.entries(leafletRefs).find(r => r[1].popup == e.popup)?.[1].item;
            if (item?.layer?.name == name && window.location.pathname.split("/")[1] != item.id) {
                let params = new URLSearchParams(window.location.search);
                window.history.pushState({}, "", `/${item.id}` + `${params.toString() !== "" ? `?${params}` : ""}`)
                let title = "";
                if (item.name) title = item.name;
                else if (item.layer?.itemNameField) title = getValue(item, item.layer.itemNameField);
                document.title = `${document.title.split("-")[0]} - ${title}`;
            }
        },
    })

    const openPopup = () => {
        if (window.location.pathname.split("/").length <= 1 || window.location.pathname.split("/")[1] === "") {
            map.closePopup();
        }
        else {
            if (window.location.pathname.split("/")[1]) {
                const id = window.location.pathname.split("/")[1]
                const ref = leafletRefs[id];
                if (ref?.marker && ref.item.layer?.name === name) {
                    ref.marker && clusterRef.hasLayer(ref.marker) && clusterRef?.zoomToShowLayer(ref.marker, () => {
                        ref.marker.openPopup();
                    });
                    let title = "";
                    if (ref.item.name) title = ref.item.name;
                    else if (ref.item.layer?.itemNameField) title = getValue(ref.item.name, ref.item.layer.itemNameField);
                    document.title = `${document.title.split("-")[0]} - ${title}`;
                    document.querySelector('meta[property="og:title"]')?.setAttribute("content", ref.item.name);
                    document.querySelector('meta[property="og:description"]')?.setAttribute("content", ref.item.text);
                }
            }
        }
    }

    useEffect(() => {
        openPopup();
    }, [leafletRefs, location])

    useEffect(() => {
        if (tagsReady) {
            const processedTags = {};
            newTagsToAdd.map(newtag => {
                if (!processedTags[newtag.name]) {
                    processedTags[newtag.name] = true;
                    addTag(newtag);
                }
            })
        }
    }, [tagsReady])

    return (
        <>
            {items &&
                items.
                    filter(item => item.layer?.name === name)?.
                    filter(item =>
                        filterTags.length == 0 ? item : filterTags.every(tag => getItemTags(item).some(filterTag => filterTag.name.toLocaleLowerCase() === tag.name.toLocaleLowerCase())))?.
                    filter(item => item.layer && isLayerVisible(item.layer)).
                    filter(item => item.group_type && isGroupTypeVisible(item.group_type)).
                    map((item: Item) => {
                        if (getValue(item, itemLongitudeField) && getValue(item, itemLatitudeField)) {

                            if (getValue(item, itemTextField)) item[itemTextField] = getValue(item, itemTextField);
                            else item[itemTextField] = "";

                            if (item?.tags) {
                                item[itemTextField] = item[itemTextField] + '\n\n';
                                item.tags.map(tag => {
                                    if (!item[itemTextField].includes(`#${encodeTag(tag)}`))
                                        return (item[itemTextField] = item[itemTextField] + `#${encodeTag(tag)} `)
                                    return item[itemTextField]

                                });
                            }


                            if (allTagsLoaded && allItemsLoaded) {
                                item[itemTextField].match(hashTagRegex)?.map(tag => {
                                    if ((!tags.find((t) => t.name.toLocaleLowerCase() === tag.slice(1).toLocaleLowerCase())) && !newTagsToAdd.find((t) => t.name.toLocaleLowerCase() === tag.slice(1).toLocaleLowerCase())) {
                                        const newTag = { id: crypto.randomUUID(), name: tag.slice(1), color: randomColor() };
                                        setNewTagsToAdd(current => [...current, newTag]);
                                    }
                                });
                                !tagsReady && setTagsReady(true);
                            }


                            const itemTags = getItemTags(item);

                            const latitude = itemLatitudeField && item ? getValue(item, itemLatitudeField) : undefined;
                            const longitude = itemLongitudeField && item ? getValue(item, itemLongitudeField) : undefined;

                            let color1 = markerDefaultColor;
                            let color2 = markerDefaultColor2;                           
                            if (itemColorField && getValue(item, itemColorField) != null) color1 = getValue(item, itemColorField);
                            else if (itemTags && itemTags[0]) {
                                color1 = itemTags[0].color;
                            }
                            if (itemTags && itemTags[0] && itemColorField) color2 = itemTags[0].color;
                            else if (itemTags && itemTags[1]) {
                                color2 = itemTags[1].color;
                            }
                            return (
                                <Marker ref={(r) => {
                                    if (!(item.id in leafletRefs && leafletRefs[item.id].marker == r))
                                        r && addMarker(item, r);
                                }}
                                    eventHandlers={{
                                        click: () => {
                                            selectPosition && setMarkerClicked(item)
                                        },
                                    }}
                                    icon={MarkerIconFactory(markerShape, color1, color2, item.markerIcon ? item.markerIcon : markerIcon)} key={item.id} position={[latitude, longitude]}>
                                    {
                                        (children && React.Children.toArray(children).some(child => React.isValidElement(child) && child.props.__TYPE === "ItemView") ?
                                            React.Children.toArray(children).map((child) =>
                                                React.isValidElement(child) && child.props.__TYPE === "ItemView" ?
                                                    <ItemViewPopup ref={(r) => {
                                                        if (!(item.id in leafletRefs && leafletRefs[item.id].popup == r))
                                                            r && addPopup(item, r as Popup);
                                                    }} key={item.id + item.name}
                                                        item={item}
                                                        setItemFormPopup={setItemFormPopup}>
                                                        {child}
                                                    </ItemViewPopup>
                                                    : ""
                                            )
                                            :
                                            <>
                                                <ItemViewPopup key={item.id + item.name} ref={(r) => {
                                                    if (!(item.id in leafletRefs && leafletRefs[item.id].popup == r))
                                                        r && addPopup(item, r as Popup);
                                                }}
                                                    item={item}
                                                    setItemFormPopup={setItemFormPopup} />
                                            </>)
                                    }
                                    <Tooltip offset={[0, -38]} direction='top'>{item.name ? item.name : getValue(item, itemNameField)}</Tooltip>
                                </Marker>
                            );
                        }
                        else return null;
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