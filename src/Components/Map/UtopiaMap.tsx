import { TileLayer, MapContainer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as React from "react";
import { Geometry, Item, LayerProps, UtopiaMapProps } from "../../types"
import "./UtopiaMap.css"
import { LatLng } from "leaflet";
import MarkerClusterGroup from 'react-leaflet-cluster'
import AddButton from "./Subcomponents/AddButton";
import { useEffect, useState } from "react";
import { ItemFormPopupProps } from "./Subcomponents/ItemFormPopup";
import { SearchControl } from "./Subcomponents/Controls/SearchControl";
import { LayerControl } from "./Subcomponents/Controls/LayerControl";
import { QuestControl } from "./Subcomponents/Controls/QuestControl";
import { Control } from "./Subcomponents/Controls/Control";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { TagsControl } from "./Subcomponents/Controls/TagsControl";
import { useSelectPosition, useSetSelectPosition } from "./hooks/useSelectPosition";
import { useUpdateItem } from "./hooks/useItems";
import { toast } from "react-toastify";
import { useClusterRef, useSetClusterRef } from "./hooks/useClusterRef";


export interface MapEventListenerProps {
    selectNewItemPosition: LayerProps | Item | null,
    setSelectNewItemPosition: React.Dispatch<any>,
    setItemFormPopup: React.Dispatch<React.SetStateAction<any>>
}


// for refreshing map on resize (needs to be implemented)
const mapDivRef = React.createRef();

function UtopiaMap({
    height = "500px",
    width = "100%",
    center = [50.6, 9.5],
    zoom = 10,
    children }
    : UtopiaMapProps) {

    function MapEventListener(props: MapEventListenerProps) {
        useMapEvents({
            click: (e) => {
                let params = new URLSearchParams(window.location.search);
                window.history.pushState({}, "", `/` + `${params.toString() !== "" ? `?${params}` : ""}`)
                document.title = document.title.split("-")[0];
                document.querySelector('meta[property="og:title"]')?.setAttribute("content", document.title);
                document.querySelector('meta[property="og:description"]')?.setAttribute("content", `${document.querySelector('meta[name="description"]')?.getAttribute("content")}`);                
                console.log(e.latlng.lat + ',' + e.latlng.lng);
                if (selectNewItemPosition != null) {
                    if ('menuIcon' in selectNewItemPosition) {
                        props.setItemFormPopup({ layer: props.selectNewItemPosition, position: e.latlng })
                        props.setSelectNewItemPosition(null)
                    }
                    if ('text' in selectNewItemPosition) {
                        const position = new Geometry(e.latlng.lng,e.latlng.lat);
                        itemUpdate({...selectNewItemPosition as Item, position: position })
                        setSelectNewItemPosition(null);
                    }
                }
            },
            moveend: (e) => {
                console.log(e);
            },
            
        })
        return null
    }

    const itemUpdate = async (updatedItem: Item) => {
        let success = false;
        try {
            await updatedItem?.layer?.api?.updateItem!({id: updatedItem.id, position: updatedItem.position })
            success = true;
        } catch (error) {
            toast.error(error.toString());
        }
        if (success) {
            updateItem(updatedItem)
            toast.success("Item position updated");
            navigate("/" + updatedItem.layer?.name + "/" + updatedItem.id)
        }
    }

    const selectNewItemPosition = useSelectPosition();
    const setSelectNewItemPosition = useSetSelectPosition();
    const location = useLocation();
    const updateItem = useUpdateItem();
    const navigate = useNavigate();
    const setClusterRef = useSetClusterRef();
    const clusterRef = useClusterRef();

    const [itemFormPopup, setItemFormPopup] = useState<ItemFormPopupProps | null>(null);

    useEffect(() => {
        let params = new URLSearchParams(location.search);
        let urlPosition = params.get("position");
    }, [location]);


    return (
        <>
            <div className={(selectNewItemPosition != null ? "crosshair-cursor-enabled" : undefined)}>
                <MapContainer ref={mapDivRef} style={{ height: height, width: width }} center={new LatLng(center[0], center[1])} zoom={zoom} zoomControl={false} maxZoom={19}>
                    <Outlet></Outlet>
                    <Control position='topLeft' zIndex="1000">
                        <SearchControl />
                        <TagsControl />
                    </Control>
                    <Control position='bottomLeft' zIndex="999">
                        <QuestControl></QuestControl>
                        <LayerControl></LayerControl>
                    </Control>
                    <TileLayer
                        maxZoom={19}
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://tile.osmand.net/hd/{z}/{x}/{y}.png" />
                    <MarkerClusterGroup ref={(r)=> setClusterRef(r)} showCoverageOnHover chunkedLoading maxClusterRadius={50} removeOutsideVisibleBounds={false}>
                        {
                            React.Children.toArray(children).map((child) =>
                                React.isValidElement<{ setItemFormPopup: React.Dispatch<React.SetStateAction<ItemFormPopupProps>>, itemFormPopup: ItemFormPopupProps | null, clusterRef: React.MutableRefObject<undefined> }>(child) ?
                                    React.cloneElement(child, { setItemFormPopup: setItemFormPopup, itemFormPopup: itemFormPopup, clusterRef: clusterRef }) : child
                            )
                        }
                    </MarkerClusterGroup>
                    <MapEventListener setSelectNewItemPosition={setSelectNewItemPosition} selectNewItemPosition={selectNewItemPosition} setItemFormPopup={setItemFormPopup} />
                </MapContainer>
                <AddButton triggerAction={setSelectNewItemPosition}></AddButton>
                {selectNewItemPosition != null &&
                    <div className="tw-button tw-z-1000 tw-absolute tw-right-5 tw-top-4 tw-drop-shadow-md">
                        <label className="tw-btn tw-btn-sm tw-rounded-2xl tw-btn-circle tw-btn-ghost hover:tw-bg-transparent tw-absolute tw-right-0 tw-top-0 tw-text-gray-600" onClick={() => {
                            setSelectNewItemPosition(null)
                        }}>
                            <p className='tw-text-center '>✕</p></label>
                        <div className="tw-alert tw-bg-base-100 tw-text-base-content">
                            <div>
                                <span>Select {selectNewItemPosition.name} position!</span>
                            </div>
                        </div>
                    </div>
                }
            </div>

        </>
    );
}

export { UtopiaMap };