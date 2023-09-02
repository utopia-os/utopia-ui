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
import { FilterControl } from "./Subcomponents/FilterControl";


export interface MapEventListenerProps {
    selectMode: LayerProps | null,
    setSelectMode: React.Dispatch<any>,
    setItemFormPopup: React.Dispatch<React.SetStateAction<any>>
}

function MapEventListener(props: MapEventListenerProps) {
    useMapEvents({
        click: (e) => {

            console.log(e.latlng.lat + ',' + e.latlng.lng);
            if (props.selectMode != null) {
                props.setItemFormPopup({ layer: props.selectMode, position: e.latlng })
                props.setSelectMode(null)
            }
        },
        resize: () => {
            console.log("resize");

        }
    })
    return null
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

    const [selectMode, setSelectMode] = useState<LayerProps | null>(null);
    const [itemFormPopup, setItemFormPopup] = useState<ItemFormPopupProps | null>(null);



    return (
        <LayersProvider initialLayers={[]}>
            <TagsProvider initialTags={[]}>
                <FilterProvider initialTags={[]}>
                    <ItemsProvider initialItems={[]}>
                        <div className={(selectMode != null ? "crosshair-cursor-enabled" : undefined)}>
                            <MapContainer ref={mapDivRef} style={{ height: height, width: width }} center={center} zoom={zoom} zoomControl={false}>
                                <FilterControl></FilterControl>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://tile.osmand.net/hd/{z}/{x}/{y}.png" />
                                <MarkerClusterGroup showCoverageOnHover chunkedLoading maxClusterRadius={50}>
                                    {
                                        React.Children.toArray(children).map((child) =>
                                            React.isValidElement<{ setItemFormPopup: React.Dispatch<React.SetStateAction<ItemFormPopupProps>>, itemFormPopup: ItemFormPopupProps | null }>(child) ?
                                                React.cloneElement(child, { setItemFormPopup: setItemFormPopup, itemFormPopup: itemFormPopup }) : child
                                        )
                                    }
                                </MarkerClusterGroup>
                                <MapEventListener setSelectMode={setSelectMode} selectMode={selectMode} setItemFormPopup={setItemFormPopup} />
                            </MapContainer>
                            <AddButton setSelectMode={setSelectMode}></AddButton>
                            {selectMode != null &&
                                <div className="tw-button tw-z-500 tw-absolute tw-right-5 tw-top-4 tw-drop-shadow-md">
                                    <div className="tw-alert tw-bg-base-100 tw-text-base-content">
                                        <div>
                                            <span>Select {selectMode.name} position!</span>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </ItemsProvider>
                </FilterProvider>
            </TagsProvider>
        </LayersProvider>
    );
}

export { UtopiaMap };