import * as React from 'react'
import { LatLng } from 'leaflet'
import { Popup as LeafletPopup, useMap } from 'react-leaflet'
import { useState } from 'react'
import { useAddItem } from './useItems'
import { Item } from './UtopiaMap'
import { Geometry } from '../../types'

export interface NewItemPopupProps {
    position: LatLng,
    layer: string,
    onSubmit: (name: string, text: string, position : LatLng, layer : string) => void
}

export default function NewItemPopup(props: NewItemPopupProps) {
    const [name, setName] = useState('')
    const [text, setText] = useState('')

    const map = useMap();
    const addItem = useAddItem();

    const handleSubmit = async (evt: any) => {
        evt.preventDefault()
        addItem(new Item(123213, name, text, new Geometry(props.position.lng, props.position.lat)))
        map.closePopup();
    }

    return (
        <LeafletPopup maxHeight={300} minWidth={275} maxWidth={275} autoPanPadding={[20, 5]}
            position={props.position}>
            <form onSubmit={handleSubmit}>
                <div className='flex justify-center'><b className="text-xl font-bold">New {props.layer}</b></div>
                <input type="text" placeholder="Name" className="input input-bordered w-full max-w-xs mt-5" value={name} onChange={e => setName(e.target.value)} />
                <textarea className="textarea textarea-bordered w-full mt-5" placeholder="Text" value={text} onChange={e => setText(e.target.value)}></textarea>
                <div className='flex justify-center'><button className="btn mt-5 place-self-center">Save</button></div>
            </form>
        </LeafletPopup>
    )
}