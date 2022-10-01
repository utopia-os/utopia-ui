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
import { ItemsProvider } from "./hooks/useItems";
import { TagsProvider } from "./hooks/useTags";
import { LayersProvider } from "./hooks/useLayers";


export interface MapEventListenerProps {
    selectMode: Layer | null,
    setSelectMode: React.Dispatch<any>,
    setNewItemPopup: React.Dispatch<React.SetStateAction<any>>
}

function MapEventListener(props: MapEventListenerProps) {
    useMapEvents({
        click: (e) => {
            console.log(e.latlng.lat + ',' + e.latlng.lng);
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
        <LayersProvider initialLayers={[]}>
            <TagsProvider initialTags={[]}>
                <ItemsProvider initialItems={[]}>
                    <div className={(selectMode != null ? "crosshair-cursor-enabled" : undefined)}>
                        <MapContainer style={{ height: height, width: width }} center={center} zoom={zoom}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            <MarkerClusterGroup showCoverageOnHover chunkedLoading maxClusterRadius={50}>
                                {
                                    React.Children.toArray(children).map((child) =>
                                        React.isValidElement<{ setNewItemPopup: React.Dispatch<React.SetStateAction<NewItemPopupProps | null>> }>(child) ? React.cloneElement(child, { setNewItemPopup: setNewItemPopup }) : child
                                    )
                                }
                            </MarkerClusterGroup>
                            <MapEventListener setSelectMode={setSelectMode} selectMode={selectMode} setNewItemPopup={setNewItemPopup} />
                            {newItemPopup &&
                                <NewItemPopup position={newItemPopup.position} layer={newItemPopup.layer} setNewItemPopup={setNewItemPopup} item={newItemPopup.item}/>
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
                </ItemsProvider>
            </TagsProvider>
        </LayersProvider>
    );
}

export { UtopiaMap, Item, Tag, API };