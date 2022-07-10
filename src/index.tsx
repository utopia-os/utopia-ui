import { TileLayer, MapContainer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as React from "react";
import MarkerIconFactory from './Utils/MarkerIconFactory';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import MarkerPopup, { IMapItem, ITag } from "./Components/Map/MarkerPopup";
import "./styles.scss"

export interface IMapProps {
    height: string,
    width: string,
    center: number[],
    zoom: number,
    places?: IMapItem[],
    events?: IMapItem[],
    tags?: ITag[],
}

const UtopiaMap = (props: IMapProps) => {
    let tagMap = new Map(props.tags?.map(key => [key.id, key]));

    const getTags = (item: IMapItem) => {
        let tags: ITag[] = [];
        item.tags && item.tags.forEach(element => {
            if (tagMap.has(element)) { tags.push(tagMap.get(element)!) };
        });
        return tags;
    }


    return (
        <MapContainer style={{ height: props.height, width: props.width }} center={props.center} zoom={props.zoom} >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {props.places &&
                    props.places.map((place: IMapItem) => {
                        let tags = getTags(place);
                        let color1 = "#555";
                        let color2 = "RGBA(35, 31, 32, 0.2)";
                        if (tags[0]) {
                            color1 = tags[0].color;
                        }
                        if (tags[1]) {
                            color2 = tags[1].color;
                        }


                        return (
                            <Marker icon={MarkerIconFactory('circle', color1, color2, 'circle-solid')} key={place.id} position={[place.position.coordinates[1], place.position.coordinates[0]]}>
                                <MarkerPopup item={place} tags={tags} />
                            </Marker>
                        )

                    }

                    )
                }

                {props.events &&
                    (props.events).map((event: IMapItem) => (
                        <Marker icon={MarkerIconFactory('square', '#6d398b', 'RGBA(35, 31, 32, 0.2)', 'calendar-days-solid')} key={event.id} position={[event.position.coordinates[1], event.position.coordinates[0]]}>
                            <MarkerPopup item={event} tags={getTags(event)} />
                        </Marker>
                    ))
                }
        </MapContainer>

    );
}

export default UtopiaMap;

