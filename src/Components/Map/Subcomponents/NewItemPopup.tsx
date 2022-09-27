import * as React from 'react'
import { LatLng } from 'leaflet'
import { Popup as LeafletPopup, useMap } from 'react-leaflet'
import { useEffect, useState } from 'react'
import { useAddItem, useUpdateItem } from '../hooks/useItems'
import { Geometry, Layer, Item} from '../../../types'

export interface NewItemPopupProps {
    position: LatLng,
    layer: Layer,
    item?: Item,
    setNewItemPopup: React.Dispatch<React.SetStateAction<any>>
}

export default function NewItemPopup(props: NewItemPopupProps) {
    const [name, setName] = useState('')
    const [text, setText] = useState('')

    const map = useMap();
    const addItem = useAddItem();
    const updateItem = useUpdateItem();

    const handleSubmit = (evt: any) => {
        evt.preventDefault()
        console.log("New Item Popup is adding Item ...");
        if(props.item) {
            updateItem(new Item(props.item.id, name, text, new Geometry(props.position.lng, props.position.lat), props.layer))
        }
        else {
            addItem(new Item(crypto.randomUUID(), name, text, new Geometry(props.position.lng, props.position.lat), props.layer))}
        map.closePopup();
        props.setNewItemPopup(null);
    } 

    const resetPopup = () => {
        setName('');
        setText('');
    }

    const setItemValues = () => {
        if(props.item) {
            setName(props.item?.name);
            setText(props.item?.text);
            console.log('set name + txt');
          }
    }

    useEffect(() => {
        setItemValues();
    },[props.item])

    return (
        <LeafletPopup maxHeight={300} minWidth={275} maxWidth={275} autoPanPadding={[20, 5]}
            eventHandlers={{
                remove: resetPopup
            }}
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



