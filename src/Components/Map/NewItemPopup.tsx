import * as React from 'react'
import { LatLng } from 'leaflet'
import { Popup as LeafletPopup } from 'react-leaflet'

export interface NewItemPopupProps {
    position: LatLng,
    itemType: string,
}

export default function NewItemPopup(props: NewItemPopupProps) {
    console.log(props.itemType);

    return (
        <LeafletPopup maxHeight={300} minWidth={275} maxWidth={275} autoPanPadding={[20, 5]}
            position={props.position}>
            <div className='flex justify-center'><b className="text-xl font-bold">New {props.itemType}</b></div>
            <input type="text" placeholder="Name" className="input input-bordered w-full max-w-xs mt-5" />
            <textarea className="textarea textarea-bordered w-full mt-5" placeholder="Text"></textarea>
            <div className='flex justify-center'><button className="btn mt-5 place-self-center">Save</button></div>
        </LeafletPopup>
    )
}
