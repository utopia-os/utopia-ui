import { TileLayer, MapContainer, Marker, LayersControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as React from "react";
import MarkerIconFactory from './Utils/MarkerIconFactory';
import MarkerPopup, { IMapItem } from "./Components/Map/MarkerPopup";
import { places, events } from './sampleData/data'
import "./styles.scss"

export interface IMapProps {
    height: string,
    width: string,
    places?: IMapItem[],
    events?: IMapItem[]
}

const Map = (props: IMapProps) => {

    return (
        <MapContainer style={{ height: props.height, width: props.width }} center={[51.3, 9.6]} zoom={8} >
            <LayersControl position="topright">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LayersControl.Overlay checked name="Places">
                        {places &&
                            (places).map((place) => (
                                <Marker icon={MarkerIconFactory('circle', '#f18e1c', 'RGBA(35, 31, 32, 0.2)', 'circle-solid')} key={place.id} position={[place.position.coordinates[1], place.position.coordinates[0]]}>
                                    <MarkerPopup item={place} />
                                </Marker>
                            ))
                        }
                </LayersControl.Overlay>
                <LayersControl.Overlay checked name="Events">
                        {events &&
                        (events).map((event) => (
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
