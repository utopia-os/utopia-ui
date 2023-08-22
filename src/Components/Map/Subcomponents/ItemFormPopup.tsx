import * as React from 'react'
import { LatLng } from 'leaflet'
import { Popup as LeafletPopup, useMap } from 'react-leaflet'
import { useEffect, useRef, useState } from 'react'
import { useAddItem, useUpdateItem } from '../hooks/useItems'
import { Geometry, LayerProps, Item, ItemsApi } from '../../../types'
import { TextAreaInput } from '../../Input/TextAreaInput'
import { TextInput } from '../../Input/TextInput'

export interface ItemFormPopupProps {
    position: LatLng,
    layer: LayerProps,
    item?: Item,
    api?: ItemsApi<any>,
    children?: React.ReactNode,
    setItemFormPopup: React.Dispatch<React.SetStateAction<any>>
}

export function ItemFormPopup(props: ItemFormPopupProps) {

    const formRef = useRef<HTMLFormElement>(null);


    const [spinner, setSpinner] = useState(false);

    const map = useMap();
    const addItem = useAddItem();
    const updateItem = useUpdateItem();

    const handleSubmit = async (evt: any) => {
        const formItem: Item = {} as Item;
        Array.from(evt.target).forEach((input: HTMLInputElement) => {
            if (input.name) {
                formItem[input.name] = input.value;
            }
        });
        formItem['position'] = new Geometry(props.position.lng, props.position.lat);
        evt.preventDefault();
        setSpinner(true);

        if (props.item) {
            formItem['id'] = props.item.id;
            await props.api?.updateItem!(formItem);
            formItem['api'] = props.api;
            formItem['layer'] = props.layer;
            await updateItem(formItem);
            setSpinner(false);
            map.closePopup();
        }
        else {
            formItem['id'] = crypto.randomUUID();
            await props.api?.createItem!(formItem);
            formItem['api'] = props.api;
            formItem['layer'] = props.layer;
            await addItem(formItem);
            setSpinner(false);
            map.closePopup();
        }
        props.setItemFormPopup(null);
    }


    const resetPopup = () => {
        if (formRef.current) {
            formRef.current.reset();
        }
    }



    useEffect(() => {
        resetPopup();
    }, [props.position])

    return (
        <LeafletPopup minWidth={275} maxWidth={275} autoPanPadding={[20, 5]}
            eventHandlers={{
                remove: () => {
                    setTimeout(function () {
                        resetPopup()

                    }, 100);
                }
            }}
            position={props.position}>
            <form ref={formRef} onReset={resetPopup} onSubmit={e => handleSubmit(e)}>
                {props.item ? <div className='tw-h-3'></div>
                :
                    <div className='tw-flex tw-justify-center'><b className="tw-text-xl tw-font-bold">New {props.layer.name}</b></div>
                }
                <TextInput type="text" placeholder="Name" dataField="name" defaultValue={props.item ? props.item.name : ""} inputStyle='' />

                {props.children ?

                    React.Children.toArray(props.children).map((child) =>
                        React.isValidElement<{ item: Item, test: string }>(child) ?
                            React.cloneElement(child, { item: props.item }) : ""
                    )

                    :
                    <>
                        <TextAreaInput placeholder="Text" dataField="text" defaultValue={props.item ? props.item.text : ""} inputStyle='tw-h-40 tw-mt-5' />
                    </>
                }

                <div className='tw-flex tw-justify-center'>
                    <button className={spinner ? 'tw-btn tw-btn-disabled tw-mt-5 tw-place-self-center' : 'tw-btn tw-mt-5 tw-place-self-center'} type='submit'>{spinner ? <span className="tw-loading tw-loading-spinner"></span> : 'Save'}</button>
                </div>
            </form>
        </LeafletPopup>
    )
}



