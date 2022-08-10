import * as React from 'react'
import { LatLng } from 'leaflet'
import { Popup as LeafletPopup, useMap } from 'react-leaflet'
import { useState } from 'react'
import { useAddItem } from '../hooks/useItems'
import { Geometry, Layer, Item} from '../../../types'

export interface NewItemPopupProps {
    position: LatLng,
    layer: Layer,
    setNewItemPopup: React.Dispatch<React.SetStateAction<any>>
}

export default function NewItemPopup(props: NewItemPopupProps) {
    const [name, setName] = useState('')
    const [text, setText] = useState('')

    const map = useMap();
    const addItem = useAddItem();

    const handleSubmit = (evt: any) => {
        evt.preventDefault()
        console.log("New Item Popup is adding Item ...");
        
        addItem(new Item(Math.floor(Math.random() * 1000) + 200, name, text, new Geometry(props.position.lng, props.position.lat), props.layer))
        map.closePopup();
        props.setNewItemPopup(null);
        
    }

    console.log("popup opend");
    

    return (
        <LeafletPopup maxHeight={300} minWidth={275} maxWidth={275} autoPanPadding={[20, 5]}
            position={props.position}>
            <form onSubmit={handleSubmit}>
                <div className='flex justify-center'><b className="text-xl font-bold">New {props.layer.name}</b></div>
                <input type="text" placeholder="Name" className="input input-bordered w-full max-w-xs mt-5" value={name} onChange={e => setName(e.target.value)} />
                <textarea className="textarea textarea-bordered w-full mt-5" placeholder="Text" value={text} onChange={e => setText(e.target.value)}></textarea>
                <div className='flex justify-center'><button className="btn mt-5 place-self-center">Save</button></div>
            </form>
        </LeafletPopup>
    )
}



