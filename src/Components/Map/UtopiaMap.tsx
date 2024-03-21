import { TileLayer, MapContainer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as React from "react";
import { LayerProps, UtopiaMapProps } from "../../types"
import "./UtopiaMap.css"
import { LatLng } from "leaflet";
import MarkerClusterGroup from 'react-leaflet-cluster'
import AddButton from "./Subcomponents/AddButton";
import { useEffect, useState } from "react";
import { ItemFormPopupProps } from "./Subcomponents/ItemFormPopup";
import { ItemsProvider } from "./hooks/useItems";
import { LayersProvider } from "./hooks/useLayers";
import { FilterProvider } from "./hooks/useFilter";
import { SearchControl } from "./Subcomponents/Controls/SearchControl";
import { LeafletRefsProvider } from "./hooks/useLeafletRefs";
import { LayerControl } from "./Subcomponents/Controls/LayerControl";
import { QuestControl } from "./Subcomponents/Controls/QuestControl";
import { Control } from "./Subcomponents/Controls/Control";
import { Outlet, useLocation } from "react-router-dom";
import { TagsControl } from "./Subcomponents/Controls/TagsControl";


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
    center = [50.6, 9.5],
    zoom = 10,
    children }
    : UtopiaMapProps) {

    function MapEventListener(props: MapEventListenerProps) {
        useMapEvents({
            click: (e) => {
                let params = new URLSearchParams(window.location.search);
                window.history.pushState({}, "", `/`+ `${params.toString() !== "" ? `?${params}` : ""}`)
                document.title = document.title.split("-")[0];
                document.querySelector('meta[property="og:title"]')?.setAttribute("content", document.title);
                document.querySelector('meta[property="og:description"]')?.setAttribute("content", `${document.querySelector('meta[name="description"]')?.getAttribute("content")}`);

                console.log(e.latlng.lat + ',' + e.latlng.lng);
                if (props.selectNewItemPosition != null) {
                    props.setItemFormPopup({ layer: props.selectNewItemPosition, position: e.latlng })
                    props.setSelectNewItemPosition(null)
                }
            },
            moveend: (e) => {
                console.log(e);
            }
        
            
        })
        return null
    }

    const [selectNewItemPosition, setSelectNewItemPosition] = useState<LayerProps | null>(null);
    const [itemFormPopup, setItemFormPopup] = useState<ItemFormPopupProps | null>(null);

    const clusterRef = React.useRef();

    const location = useLocation();

    useEffect(() => {
        let params = new URLSearchParams(location.search);
        let urlPosition = params.get("position");


    }, [location]);


    return (
        <>
            
            <LayersProvider initialLayers={[]}>
                        <FilterProvider initialTags={[]}>
                            <ItemsProvider initialItems={[]}>
                                <LeafletRefsProvider initialLeafletRefs={{}}>
                                    <div className={(selectNewItemPosition != null ? "crosshair-cursor-enabled" : undefined)}>
                                        <MapContainer ref={mapDivRef} style={{ height: height, width: width }} center={new LatLng(center[0], center[1])} zoom={zoom} zoomControl={false} maxZoom={19}>
                                        <Outlet></Outlet>
                                            <Control position='topLeft' zIndex="1000">
                                                <SearchControl clusterRef={clusterRef} />
                                                <TagsControl />
                                            </Control>
                                            <Control position='bottomLeft' zIndex="999">
                                                <QuestControl></QuestControl>
                                                <LayerControl></LayerControl>
                                            </Control>
                                            <TileLayer
                                                maxZoom={19}
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
                                        <AddButton triggerAction={setSelectNewItemPosition}></AddButton>
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
            </LayersProvider>
        </>
    );
}

export { UtopiaMap };