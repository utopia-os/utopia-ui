import { TileLayer, MapContainer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as React from "react";
import { LayerProps, UtopiaMapProps } from "../../types"
import "./UtopiaMap.css"
import { LatLng } from "leaflet";
import MarkerClusterGroup from 'react-leaflet-cluster'
import AddButton from "./Subcomponents/AddButton";
import { useState } from "react";
import { ItemFormPopupProps } from "./Subcomponents/ItemFormPopup";
import { ItemsProvider } from "./hooks/useItems";
import { TagsProvider } from "./hooks/useTags";
import { LayersProvider } from "./hooks/useLayers";
import { FilterProvider } from "./hooks/useFilter";
import { SearchControl } from "./Subcomponents/Controls/SearchControl";
import { PermissionsProvider } from "./hooks/usePermissions";
import { LeafletRefsProvider } from "./hooks/useLeafletRefs";
import { LayerControl } from "./Subcomponents/Controls/LayerControl";
import { QuestControl } from "./Subcomponents/Controls/QuestControl";
import { Control } from "./Subcomponents/Controls/Control";
import { Outlet } from "react-router-dom";
import { TagsControl } from "./Subcomponents/Controls/TagsControl";
import { LocateControl } from "./Subcomponents/Controls/LocateControl";


export interface MapEventListenerProps {
    selectNewItemPosition: LayerProps | null,
    setSelectNewItemPosition: React.Dispatch<any>,
    setItemFormPopup: React.Dispatch<React.SetStateAction<any>>
}


// for refreshing map on resize (needs to be implemented)
const mapDivRef = React.createRef();

function UtopiaMap({
    height = "500px",
    width = "100%",
    center = new LatLng(50.6, 9.5),
    zoom = 10,
    children }
    : UtopiaMapProps) {


    let meta = document.getElementsByTagName('meta')
    const [metaTags, setMetaTags] = useState<HTMLCollectionOf<HTMLMetaElement>>(meta);

    function MapEventListener(props: MapEventListenerProps) {
        useMapEvents({
            click: (e) => {
                window.history.pushState({}, "", "/");
                document.title = document.title.split("-")[0];
                document.querySelector('meta[property="og:title"]')?.setAttribute("content", document.title);
                document.querySelector('meta[property="og:description"]')?.setAttribute("content", `${document.querySelector('meta[name="description"]')?.getAttribute("content")}`);

                meta = metaTags;
                console.log(e.latlng.lat + ',' + e.latlng.lng);
                if (props.selectNewItemPosition != null) {
                    props.setItemFormPopup({ layer: props.selectNewItemPosition, position: e.latlng })
                    props.setSelectNewItemPosition(null)
                }
            },
        })
        return null
    }

    const [selectNewItemPosition, setSelectNewItemPosition] = useState<LayerProps | null>(null);
    const [itemFormPopup, setItemFormPopup] = useState<ItemFormPopupProps | null>(null);

    const clusterRef = React.useRef();


    return (
        <>
            <Outlet></Outlet>
            <LayersProvider initialLayers={[]}>
                <TagsProvider initialTags={[]}>
                    <PermissionsProvider initialPermissions={[]}>
                        <FilterProvider initialTags={[]}>
                            <ItemsProvider initialItems={[]}>
                                <LeafletRefsProvider initialLeafletRefs={{}}>
                                    <div className={(selectNewItemPosition != null ? "crosshair-cursor-enabled" : undefined)}>
                                        <MapContainer ref={mapDivRef} style={{ height: height, width: width }} center={center} zoom={zoom} zoomControl={false}>
                                            <Control position='topLeft' zIndex="1000">
                                                <SearchControl clusterRef={clusterRef} />
                                                <TagsControl />
                                            </Control>
                                            <Control position='bottomLeft' zIndex="999">
                                                <QuestControl></QuestControl>
                                                <LayerControl></LayerControl>
                                            </Control>
                                            <TileLayer
                                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                url="https://tile.osmand.net/hd/{z}/{x}/{y}.png" />
                                            <MarkerClusterGroup ref={clusterRef} showCoverageOnHover chunkedLoading maxClusterRadius={50} removeOutsideVisibleBounds={false}>
                                                {
                                                    React.Children.toArray(children).map((child) =>
                                                        React.isValidElement<{ setItemFormPopup: React.Dispatch<React.SetStateAction<ItemFormPopupProps>>, itemFormPopup: ItemFormPopupProps | null, clusterRef: React.MutableRefObject<undefined> }>(child) ?
                                                            React.cloneElement(child, { setItemFormPopup: setItemFormPopup, itemFormPopup: itemFormPopup, clusterRef: clusterRef }) : child
                                                    )
                                                }
                                            </MarkerClusterGroup>
                                            <MapEventListener setSelectNewItemPosition={setSelectNewItemPosition} selectNewItemPosition={selectNewItemPosition} setItemFormPopup={setItemFormPopup} />
                                        </MapContainer>
                                        <AddButton setSelectNewItemPosition={setSelectNewItemPosition}></AddButton>
                                        {selectNewItemPosition != null &&
                                            <div className="tw-button tw-z-1000 tw-absolute tw-right-5 tw-top-4 tw-drop-shadow-md">
                                                <div className="tw-alert tw-bg-base-100 tw-text-base-content">
                                                    <div>
                                                        <span>Select {selectNewItemPosition.name} position!</span>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </LeafletRefsProvider>
                            </ItemsProvider>
                        </FilterProvider>
                    </PermissionsProvider>
                </TagsProvider>
            </LayersProvider>
        </>
    );
}

export { UtopiaMap };