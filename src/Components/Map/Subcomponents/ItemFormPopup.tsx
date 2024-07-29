import * as React from 'react'
import { LatLng } from 'leaflet'
import { Popup as LeafletPopup, useMap } from 'react-leaflet'
import { useEffect, useRef, useState } from 'react'
import { useAddItem, useItems, useRemoveItem, useUpdateItem } from '../hooks/useItems'
import { Geometry, LayerProps, Item, ItemsApi } from '../../../types'
import { TextAreaInput } from '../../Input/TextAreaInput'
import { TextInput } from '../../Input/TextInput'
import { toast } from 'react-toastify'
import { useResetFilterTags } from '../hooks/useFilter'
import { hashTagRegex } from '../../../Utils/HashTagRegex'
import { randomColor } from '../../../Utils/RandomColor'
import { useAddTag, useTags } from '../hooks/useTags'
import { useAuth } from '../../Auth'

export interface ItemFormPopupProps {
    position: LatLng,
    layer: LayerProps,
    item?: Item,
    children?: React.ReactNode,
    setItemFormPopup?: React.Dispatch<React.SetStateAction<ItemFormPopupProps | null>>
}

export function ItemFormPopup(props: ItemFormPopupProps) {

    const [spinner, setSpinner] = useState(false);

    const [popupTitle, setPopupTitle] = useState<string>("");

    const formRef = useRef<HTMLFormElement>(null);

    const map = useMap();

    const addItem = useAddItem();
    const updateItem = useUpdateItem();
    const items = useItems();
    const removeItem = useRemoveItem();


    const tags = useTags(); 
    const addTag = useAddTag();

    const resetFilterTags = useResetFilterTags();

    const {  user } = useAuth();


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

        formItem.text && formItem.text.toLocaleLowerCase().match(hashTagRegex)?.map(tag=> {
            if (!tags.find((t) => t.name.toLocaleLowerCase() === tag.slice(1).toLocaleLowerCase())) {
              addTag({id: crypto.randomUUID(), name: tag.slice(1), color: randomColor()})
            }
        });



        if(props.item) {
            let success = false;
            try {
                await props.layer.api?.updateItem!({...formItem, id: props.item.id});
                success = true;
            } catch (error) {
                toast.error(error.toString());
            }
            if(success) {
                console.log(props.item);
                
                updateItem({...props.item, ...formItem});
                toast.success("Item updated");
            } 
            setSpinner(false);
            map.closePopup();
        }
        else {
            const item = items.find(i => i.user_created?.id === user?.id && i.layer?.itemType.name === props.layer.itemType.name);
            
            const uuid = crypto.randomUUID();
            let success = false;
            try {
                props.layer.onlyOnePerOwner && item && await props.layer.api?.updateItem!({...formItem, id: item?.id });
                (!props.layer.onlyOnePerOwner || !item) && await props.layer.api?.createItem!({...formItem, id: uuid,  name: formItem.name ? formItem.name : user?.first_name });
                success = true;
            } catch (error) {
                toast.error(error.toString());
            }
            if(success) {                
                props.layer.onlyOnePerOwner && item && updateItem({...item, ...formItem});
                (!props.layer.onlyOnePerOwner || !item) && addItem({...formItem, name: formItem.name ? formItem.name : user?.first_name , user_created: user, type: props.layer.itemType, id: uuid, layer: props.layer, public_edit: !user ? true : false});
                toast.success("New item created");
                resetFilterTags();
            } 
            setSpinner(false);
            map.closePopup();
        }
        props.setItemFormPopup!(null);
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
            <form ref={formRef} onReset={resetPopup} autoComplete='off' onSubmit={e => handleSubmit(e)}>
                {props.item ? <div className='tw-h-3'></div>
                :
                    <div className='tw-flex tw-justify-center'><b className="tw-text-xl tw-text-center tw-font-bold">{  props.layer.menuText}</b></div>
                }

                {props.children ?

                    React.Children.toArray(props.children).map((child) =>
                        React.isValidElement<{ item: Item, test: string, setPopupTitle: React.Dispatch<React.SetStateAction<string>> }>(child) ?
                            React.cloneElement(child, { item: props.item, key: props.position.toString(), setPopupTitle: setPopupTitle }) : ""
                    )

                    :
                    <>
                        <TextInput type="text" placeholder="Name" dataField="name" defaultValue={props.item ? props.item.name : ""} inputStyle='' />
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



