import { TileLayer, MapContainer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as React from "react";
import { Item, Tag } from "../../types"
import "../../index.css"
import { LatLng } from "leaflet";
import MarkerClusterGroup from 'react-leaflet-cluster'
import AddButton from "./AddButton";
import { Layer, LayerProps } from "./Layer";
import { useState } from "react";
import NewItemPopup, { NewItemPopupProps } from "./NewItemPopup";

export interface UtopiaMapProps {
    height?: string,
    width?: string,
    center?: LatLng,
    zoom?: number,
    places?: Item[],
    events?: Item[],
    tags?: Tag[],
    children?: React.ReactNode
}

export interface MapEventListenerProps {
    selectMode: string | null,
    setSelectMode: React.Dispatch<React.SetStateAction<any>>,
    setNewItemPopup: React.Dispatch<React.SetStateAction<any>>
}

function MapEventListener(props: MapEventListenerProps) {
    useMapEvents({
        click: (e) => {
            console.log(e.latlng.lat + ',' + e.latlng.lng);
            console.log(props.selectMode);
            
            if (props.selectMode != null) {
                props.setNewItemPopup({ itemType: props.selectMode, position: e.latlng })
                props.setSelectMode(null)
            }
        },
        locationfound: (location) => {
            console.log('location found:', location)
        },
    })
    return null
}

function UtopiaMap(this: any, props: UtopiaMapProps) {
    // init / set default values
    let center: LatLng = new LatLng(50.6, 9.5);
    if (props.center)
        center = props.center;
    let zoom: number = 10;
    if (props.zoom)
        zoom = props.zoom;
    let height: string = "400px";
    if (props.height)
        height = props.height;
    let width: string = "100vw";
    if (props.width)
        width = props.width;


    const [selectMode, setSelectMode] = useState<string | null>(null);
    const [newItemPopup, setNewItemPopup] = useState<NewItemPopupProps | undefined>(undefined);



    // all the layers
    const layers: LayerProps[] = [];
    // put places / events if provided as props
    if (props.events) layers.push({ name: 'event', menuIcon: 'CalendarIcon', menuText: 'add new  event', menuColor: '#f9a825', markerIcon: 'calendar-days-solid', markerShape: 'square', markerDefaultColor: '#777', data: props.events });
    if (props.places) layers.push({ name: 'place', menuIcon: 'LocationMarkerIcon', menuText: 'add new place', menuColor: '#2E7D32', markerIcon: 'circle-solid', markerShape: 'circle', markerDefaultColor: '#777', data: props.places });

    return (
        <div className={(selectMode != null ? "crosshair-cursor-enabled" : undefined)}>
            <MapContainer style={{ height: height, width: width }} center={center} zoom={zoom}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <MarkerClusterGroup showCoverageOnHover chunkedLoading maxClusterRadius={50}>
                    {layers &&
                        layers.map(layer => (
                            <Layer
                                key={layer.name}
                                name={layer.name}
                                menuIcon={layer.menuIcon}
                                menuText={layer.menuText}
                                menuColor={layer.menuColor}
                                markerIcon={layer.markerIcon}
                                markerShape={layer.markerShape}
                                markerDefaultColor={layer.markerDefaultColor}
                                data={layer.data}
                                tags={props.tags} />
                        ))
                    }
                    {console.log("children of UtopiaMap: " + props.children)}
                </MarkerClusterGroup>
                <MapEventListener setSelectMode={setSelectMode} selectMode={selectMode} setNewItemPopup={setNewItemPopup} />
                {newItemPopup &&
                    <NewItemPopup position={newItemPopup.position} itemType={newItemPopup.itemType}/>
                }
            </MapContainer>
            <AddButton layers={layers} setSelectMode={setSelectMode}></AddButton>
        </div>
    );
}

export { UtopiaMap, Item, Tag };

