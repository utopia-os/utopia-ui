import * as React from 'react'
import { LatLng } from 'leaflet'
import { Popup as LeafletPopup, useMap } from 'react-leaflet'
import { useEffect, useState } from 'react'
import { useAddItem, useUpdateItem } from '../hooks/useItems'
import { Geometry, LayerProps, Item, ItemsApi} from '../../../types'
import TextAreaInput from '../../Input/TextAreaInput'
import InputText from '../../Input/InputText'

export interface ItemFormPopupProps {
    position: LatLng,
    layer: LayerProps,
    item?: Item,
    api?: ItemsApi<any>,
    setItemFormPopup: React.Dispatch<React.SetStateAction<any>>
}

export default function ItemFormPopup(props: ItemFormPopupProps) {
    const [name, setName] = useState('')
    const [text, setText] = useState('')
    const [spinner, setSpinner] = useState(false);

    const map = useMap();
    const addItem = useAddItem();
    const updateItem = useUpdateItem();

    const handleSubmit = (evt: any) => {
        evt.preventDefault()
        console.log("New Item Popup is adding Item ...");
        if(props.item) {
            setSpinner(true);
            props.api?.updateItem!(new Item(props.item.id, name, text, new Geometry(props.position.lng, props.position.lat)))
            .then( () =>  updateItem(new Item(props.item!.id, name, text, new Geometry(props.position.lng, props.position.lat), props.layer, props.item!.api)))
            .then(()=> setSpinner(false))
            .then(()=> map.closePopup())
            .catch(err => console.log(err));
        }
        else {
            setSpinner(true);
            props.api?.createItem!(new Item(crypto.randomUUID(), name, text, new Geometry(props.position.lng, props.position.lat)))
            .then( () =>  addItem(new Item(crypto.randomUUID(), name, text, new Geometry(props.position.lng, props.position.lat), props.layer, props.api)))
            .then(()=> setSpinner(false))
            .then(()=> map.closePopup())
            .catch(err => console.log(err));
            }
        props.setItemFormPopup(null);
    } 

    const resetPopup = () => {
        setName('');
        setText('');
    }

    const setItemValues = () => {
        if(props.item) {
            setName(props.item?.name);
            setText(props.item?.text);
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
                <InputText type="text" placeholder="Name" defaultValue={name} updateFormValue={e => setName(e)} />
                <TextAreaInput placeholder="Text" defaultValue={text} updateFormValue={e => setText(e)} inputStyle='tw-h-40 tw-mt-5'/>
                <div className='tw-flex tw-justify-center'><button className={spinner ? 'tw-btn tw-loading tw-mt-5 tw-place-self-center' : 'tw-btn tw-mt-5 tw-place-self-center'}>Save</button></div>
            </form>
        </LeafletPopup>
    )
}



