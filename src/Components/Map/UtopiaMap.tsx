import { TileLayer, MapContainer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as React from "react";
import { Item, Tag, ItemsApi, LayerProps, UtopiaMapProps } from "../../types"
import "./UtopiaMap.css"
import { LatLng } from "leaflet";
import MarkerClusterGroup from 'react-leaflet-cluster'
import AddButton from "./Subcomponents/AddButton";
import { useState } from "react";
import ItemFormPopup, { ItemFormPopupProps } from "./Subcomponents/ItemFormPopup";
import { ItemsProvider } from "./hooks/useItems";
import { TagsProvider } from "./hooks/useTags";
import { LayersProvider } from "./hooks/useLayers";


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
        }
    })
    return null
}

/** This is a description of the foo function. */
function UtopiaMap({
    height = "500px",
    width = "100%",
    center = new LatLng(50.6, 9.5),
    zoom = 10,
    children }
    : UtopiaMapProps) {

    const [selectMode, setSelectMode] = useState<LayerProps | null>(null);
    const [newItemPopup, setItemFormPopup] = useState<ItemFormPopupProps | null>(null);



    return (
        <LayersProvider initialLayers={[]}>
            <TagsProvider initialTags={[]}>
                <ItemsProvider initialItems={[]}>
                    <div className={(selectMode != null ? "crosshair-cursor-enabled" : undefined)}>
                        <MapContainer style={{ height: height, width: width }} center={center} zoom={zoom}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://tile.osmand.net/hd/{z}/{x}/{y}.png" />
                            <MarkerClusterGroup showCoverageOnHover chunkedLoading maxClusterRadius={50}>
                                {
                                    React.Children.toArray(children).map((child) =>
                                        React.isValidElement<{ setItemFormPopup: React.Dispatch<React.SetStateAction<ItemFormPopupProps | null>> }>(child) ? React.cloneElement(child, { setItemFormPopup: setItemFormPopup }) : child
                                    )
                                }
                            </MarkerClusterGroup>
                            <MapEventListener setSelectMode={setSelectMode} selectMode={selectMode} setItemFormPopup={setItemFormPopup} />
                            {newItemPopup &&
                                <ItemFormPopup position={newItemPopup.position} layer={newItemPopup.layer} setItemFormPopup={setItemFormPopup} item={newItemPopup.item} />
                            }
                            <AddButton setSelectMode={setSelectMode}></AddButton>
                        </MapContainer>
                        {selectMode != null &&
                            <div className="tw-button tw-z-500 tw-absolute tw-right-5 tw-top-20 tw-drop-shadow-md">
                                <div className="tw-alert tw-bg-white tw-text-green-900">
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

export { UtopiaMap, Item, Tag, ItemsApi };