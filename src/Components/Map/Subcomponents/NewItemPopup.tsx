import * as React from 'react'
import { LatLng } from 'leaflet'
import { Popup as LeafletPopup, useMap } from 'react-leaflet'
import { useEffect, useState } from 'react'
import { useAddItem, useUpdateItem } from '../hooks/useItems'
import { Geometry, LayerProps, Item} from '../../../types'

export interface NewItemPopupProps {
    position: LatLng,
    layer: LayerProps,
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
        <LeafletPopup  minWidth={275} maxWidth={275} autoPanPadding={[20, 5]}
            eventHandlers={{
                remove: resetPopup
            }}
            position={props.position}>
            <form onSubmit={handleSubmit}>
                <div className='tw-flex tw-justify-center'><b className="tw-text-xl tw-font-bold">New {props.layer.name}</b></div>
                <input type="text" placeholder="Name" className="tw-input tw-input-bordered tw-w-full tw-max-w-xs tw-mt-5" value={name} onChange={e => setName(e.target.value)} />
                <textarea className="tw-textarea tw-textarea-bordered tw-w-full tw-mt-5 tw-leading-5 tw-h-40" placeholder="Text" value={text} onChange={e => setText(e.target.value)}></textarea>
                <div className='tw-flex tw-justify-center'><button className="tw-btn tw-mt-5 tw-place-self-center">Save</button></div>
            </form>
        </LeafletPopup>
    )
}



