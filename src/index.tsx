import { TileLayer, MapContainer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as React from "react";
import MarkerIconFactory from './Utils/MarkerIconFactory';
import MarkerPopup from "./Components/Map/MarkerPopup";
import { Item, Tag } from "./types"
import "./styles.scss"

export interface MapProps {
    height: string,
    width: string,
    center: number[],
    zoom: number,
    places?: Item[],
    events?: Item[],
    tags?: Tag[],
}


const UtopiaMap = (props: MapProps) => {
    let tagMap = new Map(props.tags?.map(key => [key.id, key]));

    const getTags = (item: Item) => {
        let tags: Tag[] = [];
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
                    props.places.map((place: Item) => {
                        let tags = getTags(place);
                        let color1 = "#666";
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
                    })
                }

                {props.events &&
                    props.events.map((event: Item) => {
                        let tags = getTags(event);
                        let color1 = "#666";
                        let color2 = "RGBA(35, 31, 32, 0.2)";
                        if (tags[0]) {
                            color1 = tags[0].color;
                        }
                        if (tags[1]) {
                            color2 = tags[1].color;
                        }
                        return (
                            <Marker icon={MarkerIconFactory('square', color1, color2, 'calendar-days-solid')} key={event.id} position={[event.position.coordinates[1], event.position.coordinates[0]]}>
                                <MarkerPopup item={event} tags={tags} />
                            </Marker>
                        )
                    })
                }
        </MapContainer>

    );
}

export { UtopiaMap, Item, Tag };

