import * as React from 'react'
import { LatLng } from 'leaflet'
import { Popup as LeafletPopup, useMap } from 'react-leaflet'
import { useEffect, useRef, useState } from 'react'
import { useAddItem, useUpdateItem } from '../hooks/useItems'
import { Geometry, LayerProps, Item, ItemsApi } from '../../../types'
import { TextAreaInput } from '../../Input/TextAreaInput'
import { TextInput } from '../../Input/TextInput'
import { hashTagRegex } from '../../../Utils/HashTagRegex'
import { useAddTag } from '../hooks/useTags'
import { randomColor } from '../../../Utils/RandomColor'

export interface ItemFormPopupProps {
    position: LatLng,
    layer: LayerProps,
    item?: Item,
    children?: React.ReactNode,
    setItemFormPopup: React.Dispatch<React.SetStateAction<any>>
}

export function ItemFormPopup(props: ItemFormPopupProps) {

    const [spinner, setSpinner] = useState(false);

    const formRef = useRef<HTMLFormElement>(null);

    const map = useMap();

    const addItem = useAddItem();
    const updateItem = useUpdateItem();

    const addTag = useAddTag();

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

        formItem.text.toLocaleLowerCase().match(hashTagRegex)?.map(tag=> {
            addTag({id: tag.slice(1), color: randomColor()})
        });

        if (props.item) {
            await updateItem({...props.item, ...formItem});
            setSpinner(false);
            map.closePopup();
        }
        else {
            await addItem({...formItem, id: crypto.randomUUID(), layer: props.layer});
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
        <LeafletPopup minWidth={275} maxWidth={275} autoPanPadding={[20, 80]}
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
                            React.cloneElement(child, { item: props.item, key: props.position.toString() }) : ""
                    )

                    :
                    <>
                        <TextAreaInput key={props.position.toString()} placeholder="Text" dataField="text" defaultValue={props.item ? props.item.text : ""} inputStyle='tw-h-40 tw-mt-5' />
                    </>
                }

                <div className='tw-flex tw-justify-center'>
                    <button className={spinner ? 'tw-btn tw-btn-disabled tw-mt-5 tw-place-self-center' : 'tw-btn tw-mt-5 tw-place-self-center'} type='submit'>{spinner ? <span className="tw-loading tw-loading-spinner"></span> : 'Save'}</button>
                </div>
            </form>
        </LeafletPopup>
    )
}



