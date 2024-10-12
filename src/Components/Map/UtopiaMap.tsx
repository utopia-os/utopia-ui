import { TileLayer, MapContainer, useMapEvents, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as React from "react";
import { UtopiaMapProps } from "../../types"
import "./UtopiaMap.css"
import { LatLng } from "leaflet";
import MarkerClusterGroup from 'react-leaflet-cluster'
import AddButton from "./Subcomponents/AddButton";
import { useEffect, useState } from "react";
import { ItemFormPopupProps } from "./Subcomponents/ItemFormPopup";
import { SearchControl } from "./Subcomponents/Controls/SearchControl";
import { Control } from "./Subcomponents/Controls/Control";
import { BrowserRouter, Outlet, useLocation } from "react-router-dom";
import { TagsControl } from "./Subcomponents/Controls/TagsControl";
import { useSelectPosition, useSetMapClicked, useSetSelectPosition } from "./hooks/useSelectPosition";
import { useClusterRef, useSetClusterRef } from "./hooks/useClusterRef";
import { Feature, Geometry as GeoJSONGeometry } from 'geojson';
import { FilterControl } from "./Subcomponents/Controls/FilterControl";
import { LayerControl } from "./Subcomponents/Controls/LayerControl";
import { useLayers } from "./hooks/useLayers";
import { useAddVisibleLayer } from "./hooks/useFilter";
import { GratitudeControl } from "./Subcomponents/Controls/GratitudeControl";
import { SelectPosition } from "./Subcomponents/SelectPosition";

const mapDivRef = React.createRef();

export const Router = ({ children }) => {
    let location;
    try {
      location = useLocation();
    } catch (e) {
      location = null;
    }
  
    if (!location) {
      return (
        <BrowserRouter>
          {children}
        </BrowserRouter>
      );
    }
      return children;
  };


function UtopiaMap({
    height = "500px",
    width = "100%",
    center = [50.6, 9.5],
    zoom = 10,
    children,
    geo,
    showFilterControl = false,
    showLayerControl = true
}
    : UtopiaMapProps) {

    function MapEventListener() {
        useMapEvents({
            click: (e) => {
                resetMetaTags();
                console.log(e.latlng.lat + ',' + e.latlng.lng);
                selectNewItemPosition && setMapClicked({ position: e.latlng, setItemFormPopup: setItemFormPopup })
            },
            moveend: () => {
            }
        })
        return null
    }

    const resetMetaTags = () => {
        let params = new URLSearchParams(window.location.search);
        if (!location.pathname.includes("/item/")) {
            window.history.pushState({}, "", `/` + `${params.toString() !== "" ? `?${params}` : ""}`)
        }
        document.title = document.title.split("-")[0];
        document.querySelector('meta[property="og:title"]')?.setAttribute("content", document.title);
        document.querySelector('meta[property="og:description"]')?.setAttribute("content", `${document.querySelector('meta[name="description"]')?.getAttribute("content")}`);
    }


    const selectNewItemPosition = useSelectPosition();
    const setSelectNewItemPosition = useSetSelectPosition();
    const setClusterRef = useSetClusterRef();
    const clusterRef = useClusterRef();
    const setMapClicked = useSetMapClicked();

    const [itemFormPopup, setItemFormPopup] = useState<ItemFormPopupProps | null>(null);




    const layers = useLayers();
    const addVisibleLayer = useAddVisibleLayer();

    useEffect(() => {
        layers.map(l => addVisibleLayer(l))

    }, [layers])




    const onEachFeature = (feature: Feature<GeoJSONGeometry, any>, layer: L.Layer) => {
        if (feature.properties) {
            layer.bindPopup(feature.properties.name);
        }
    }

    return (
        <Router>
            <div className={`tw-h-full ${(selectNewItemPosition != null ? "crosshair-cursor-enabled" : undefined)}`}>
                <MapContainer ref={mapDivRef} style={{ height: height, width: width }} center={new LatLng(center[0], center[1])} zoom={zoom} zoomControl={false} maxZoom={19}>
                    <Outlet></Outlet>
                    <Control position='topLeft' zIndex="1000" absolute>
                        <SearchControl />
                        <TagsControl />
                    </Control>
                    <Control position='bottomLeft' zIndex="999" absolute>
                        {/*{!embedded && (*/}
                        {/*    <QuestControl></QuestControl>*/}
                        {/*)}*/}
                        {showFilterControl && <FilterControl />}
                        {/*todo: needed layer handling is located LayerControl*/}
                        {showLayerControl && <LayerControl></LayerControl>}
                        {<GratitudeControl/>}
                    </Control>
                    <TileLayer
                        maxZoom={19}
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://tile.osmand.net/hd/{z}/{x}/{y}.png" />
                    <MarkerClusterGroup ref={(r) => setClusterRef(r)} showCoverageOnHover chunkedLoading maxClusterRadius={50} removeOutsideVisibleBounds={false}>
                        {
                            React.Children.toArray(children).map((child) =>
                                React.isValidElement<{ setItemFormPopup: React.Dispatch<React.SetStateAction<ItemFormPopupProps>>, itemFormPopup: ItemFormPopupProps | null, clusterRef: React.MutableRefObject<undefined> }>(child) ?
                                    React.cloneElement(child, { setItemFormPopup: setItemFormPopup, itemFormPopup: itemFormPopup, clusterRef: clusterRef }) : child
                            )
                        }
                    </MarkerClusterGroup>
                    {geo && <GeoJSON data={geo} onEachFeature={onEachFeature} eventHandlers={{
                        click: (e) => {
                            selectNewItemPosition && e.layer!.closePopup();
                            selectNewItemPosition && setMapClicked({ position: e.latlng, setItemFormPopup: setItemFormPopup })
                        },
                    }} />}
                    <MapEventListener />
                </MapContainer>
                <AddButton triggerAction={setSelectNewItemPosition}></AddButton>
                {selectNewItemPosition != null &&
                    <SelectPosition setSelectNewItemPosition={setSelectNewItemPosition} />
                }
            </div>

        </Router>
    );
}

export { UtopiaMap };