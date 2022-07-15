import { TileLayer, MapContainer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as React from "react";
import { Item, Tag } from "../../types"
import "../../index.css"
import { LatLng } from "leaflet";
import MarkerClusterGroup from 'react-leaflet-cluster'
import AddButton from "./AddButton";
import { Layer, LayerProps } from "./Layer";

export interface MapProps {
    height?: string,
    width?: string,
    center?: LatLng,
    zoom?: number,
    places?: Item[],
    events?: Item[],
    tags?: Tag[],
    children?:  React.ReactNode
}

function UtopiaMap(this: any, props: MapProps) {
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

    const layers: LayerProps[] = [];
    // all the layers
    
    if(props.events) layers.push({ name: 'event', menuIcon: 'CalendarIcon', menuText: 'add new  event', menuColor: '#f9a825', markerIcon: 'calendar-days-solid', markerShape: 'square', markerDefaultColor: '#777', data: props.events });
    if(props.places) layers.push({ name: 'place', menuIcon: 'LocationMarkerIcon', menuText: 'add new place', menuColor: '#2E7D32', markerIcon: 'circle-solid', markerShape: 'circle',  markerDefaultColor: '#777', data: props.places });

    return (
        <>
            <MapContainer style={{ height: height, width: width }} center={center} zoom={zoom}>
                <>
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
                            tags={props.tags}/>
                    ))

                    }
                    {console.log(props.children)}
                </MarkerClusterGroup>
                </>
            </MapContainer>
            <AddButton layers={layers}></AddButton>
        </>


    );
}

export { UtopiaMap, Item, Tag };

