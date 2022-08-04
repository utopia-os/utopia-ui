import { TileLayer, MapContainer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as React from "react";
import { Item, Tag, API, Geometry } from "../../types"
import "./UtopiaMap.css"
import { LatLng } from "leaflet";
import MarkerClusterGroup from 'react-leaflet-cluster'
import AddButton from "./AddButton";
import { LayerProps } from "./Layer";
import { useCallback, useState } from "react";
import NewItemPopup, { NewItemPopupProps } from "./NewItemPopup";
import { ItemsProvider, useAddItem, useItems } from "./useItems";

export interface UtopiaMapProps {
    height?: string,
    width?: string,
    center?: LatLng,
    zoom?: number,
    places?: Item[],
    events?: Item[],
    tags?: Tag[],
    children?: React.ReactNode,
    api?: API
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
                props.setNewItemPopup({ layer: props.selectMode, position: e.latlng })
                props.setSelectMode(null)
            }
        },
        locationfound: (location) => {
            console.log('location found:', location)
        },
    })
    return null
}

function UtopiaMap(props: UtopiaMapProps) {
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
    const [newItemPopup, setNewItemPopup] = useState<NewItemPopupProps | null>(null);

    const addItem = useAddItem();
    const items = useItems();



    const handleSubmit = useCallback((name: string, text: string, position : LatLng, layer : string) => {
        addItem(new Item(123,name,text,new Geometry(position.lng,position.lat)));
        console.log(layer);
        console.log("Items check in Callback: " + items);
        
      }, [addItem]);


    let layers:LayerProps[] = [];
    React.Children.toArray(props.children).map(layer => {
        console.log(layer);
        
        if (React.isValidElement<LayerProps>(layer))
        layers.push(layer.props)
    })

    let initial:Item[] = [];
    if (props.events) initial = props.events; 

    console.log("Items check in Map 1: " + items);


    return (
        <ItemsProvider initialItems={initial}>
        <div className={(selectMode != null ? "crosshair-cursor-enabled" : undefined)}>
            <MapContainer style={{ height: height, width: width }} center={center} zoom={zoom}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <MarkerClusterGroup showCoverageOnHover chunkedLoading maxClusterRadius={50}>
                    {props.children}
                </MarkerClusterGroup>
                <MapEventListener setSelectMode={setSelectMode} selectMode={selectMode} setNewItemPopup={setNewItemPopup} />
                {newItemPopup &&
                    <NewItemPopup position={newItemPopup.position} layer={newItemPopup.layer} onSubmit={handleSubmit} />
                }
            </MapContainer>
            <AddButton layers={layers} setSelectMode={setSelectMode}></AddButton>
            {selectMode != null &&
                <div className="button z-500 absolute right-5 top-5 drop-shadow-md">
                    <div className="alert bg-white text-green-900">
                        <div>
                            <span>Select {selectMode} position!</span>
                        </div>
                    </div>
                </div>
            }

        </div>
        </ItemsProvider>
    );
}

export { UtopiaMap, Item, Tag, API };

