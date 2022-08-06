import { TileLayer, MapContainer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as React from "react";
import { Item, Tag, API, Layer, UtopiaMap as UtopiaMapProps } from "../../types"
import "../../index.css"
import { LatLng } from "leaflet";
import MarkerClusterGroup from 'react-leaflet-cluster'
import AddButton from "./Subcomponents/AddButton";
import { useState } from "react";
import NewItemPopup, { NewItemPopupProps } from "./Subcomponents/NewItemPopup";
import { LayersProvider } from "./hooks/useLayers";
import { TagsProvider } from "./hooks/useTags";



export interface MapEventListenerProps {
    selectMode: Layer | null,
    setSelectMode: React.Dispatch<React.SetStateAction<any>>,
    setNewItemPopup: React.Dispatch<React.SetStateAction<any>>
}

function MapEventListener(props: MapEventListenerProps) {
    useMapEvents({
        click: (e) => {
            console.log(e.latlng.lat + ',' + e.latlng.lng);
            console.log(props.selectMode);

            if (props.selectMode != null) {
                props.setNewItemPopup({ layer: props.selectMode, position: e.latlng })
                props.setSelectMode(null)
            }
        }
    })
    return null
}

function UtopiaMap({
    height = "500px",
    width = "100%",
    center = new LatLng(50.6, 9.5),
    zoom = 10,
    children }
    : UtopiaMapProps) {

    const [selectMode, setSelectMode] = useState<Layer | null>(null);
    const [newItemPopup, setNewItemPopup] = useState<NewItemPopupProps | null>(null);

    return (
        <TagsProvider initialTags={[]}>
            <LayersProvider initialLayers={new Map()}>
                <div className={(selectMode != null ? "crosshair-cursor-enabled" : undefined)}>
                    <MapContainer style={{ height: height, width: width }} center={center} zoom={zoom}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <MarkerClusterGroup showCoverageOnHover chunkedLoading maxClusterRadius={50}>
                            {children}
                        </MarkerClusterGroup>
                        <MapEventListener setSelectMode={setSelectMode} selectMode={selectMode} setNewItemPopup={setNewItemPopup} />
                        {newItemPopup &&
                            <NewItemPopup position={newItemPopup.position} layer={newItemPopup.layer} setNewItemPopup={setNewItemPopup} />
                        }
                        <AddButton setSelectMode={setSelectMode}></AddButton>
                    </MapContainer>
                    {selectMode != null &&
                        <div className="button z-500 absolute right-5 top-5 drop-shadow-md">
                            <div className="alert bg-white text-green-900">
                                <div>
                                    <span>Select {selectMode.name} position!</span>
                                </div>
                            </div>
                        </div>
                    }

                </div>
            </LayersProvider>
        </TagsProvider>
    );
}

export { UtopiaMap, Item, Tag, API };