import { TileLayer, MapContainer, Marker, LayersControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as React from "react";
import MarkerIconFactory from './Utils/MarkerIconFactory';
import MarkerPopup, { IMapItem } from "./Components/Map/MarkerPopup";
import "./styles.scss"

export interface IMapProps {
    height: string,
    width: string,
    center: number[],
    zoom: number,
    places?: IMapItem[],
    events?: IMapItem[],
    children?: any,
    data?: any,
}

const Map = (props: IMapProps) => {
    return (
        <MapContainer style={{ height: props.height, width: props.width }} center={props.center} zoom={props.zoom} >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <LayersControl position="topright">
                <LayersControl.Overlay checked name="Places">
                    {props.places &&
                        (props.places).map((place: IMapItem) => (
                            <Marker icon={MarkerIconFactory('circle', '#f18e1c', 'RGBA(35, 31, 32, 0.2)', 'circle-solid')} key={place.id} position={[place.position.coordinates[1], place.position.coordinates[0]]}>
                                <MarkerPopup item={place} />
                            </Marker>
                        ))
                    }
                </LayersControl.Overlay>
                <LayersControl.Overlay checked name="Events">
                    {props.events &&
                        (props.events).map((event: IMapItem) => (
                            <Marker icon={MarkerIconFactory('square', '#6d398b', 'RGBA(35, 31, 32, 0.2)', 'calendar-days-solid')} key={event.id} position={[event.position.coordinates[1], event.position.coordinates[0]]}>
                                <MarkerPopup item={event} />
                            </Marker>
                        ))
                    }
                </LayersControl.Overlay>
            </LayersControl>
        </MapContainer>

    );
}

export default Map;
