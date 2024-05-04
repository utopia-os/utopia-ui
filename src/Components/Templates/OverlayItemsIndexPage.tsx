import { ReactNode, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Item, ItemsApi, LayerProps } from '../../types';
import { getValue } from '../../Utils/GetValue';
import { PopupStartEndInput, StartEndView, TextView } from '../Map';
import { PlusButton } from '../Profile/PlusButton';
import { TextInput, TextAreaInput } from '../Input';
import { useAddTag, useTags } from '../Map/hooks/useTags';
import { toast } from 'react-toastify';
import { hashTagRegex } from '../../Utils/HashTagRegex';
import { randomColor } from '../../Utils/RandomColor';
import { useAuth } from '../Auth';
import { useLayers } from '../Map/hooks/useLayers';
import { HeaderView } from '../Map/Subcomponents/ItemPopupComponents/HeaderView';
import { MapOverlayPage } from './MapOverlayPage';
import { useAddItem, useItems, useRemoveItem } from '../Map/hooks/useItems';
import { DateUserInfo } from './DateUserInfo';


type breadcrumb = {
    name: string,
    path: string
}


export const OverlayItemsIndexPage = ({ url, layerName, parameterField, breadcrumbs, itemNameField, itemTextField, itemImageField, itemSymbolField, itemSubnameField, plusButton = true, children }: { layerName: string, url: string, parameterField: string, breadcrumbs: Array<breadcrumb>, itemNameField: string, itemTextField: string, itemImageField: string, itemSymbolField: string, itemSubnameField: string, plusButton?: boolean, children?: ReactNode }) => {

    console.log(itemSymbolField);
    const [infoExpanded, setInfoExpanded] = useState(new Map());


    const [loading, setLoading] = useState<boolean>(false);
    const [addItemPopupType, setAddItemPopupType] = useState<string>("");

    const tabRef = useRef<HTMLFormElement>(null);

    function scroll() {
        tabRef.current?.scrollIntoView();
    }

    useEffect(() => {
        scroll();
    }, [addItemPopupType])

    const navigate = useNavigate();

    const tags = useTags();
    const addTag = useAddTag();
    const { user } = useAuth();
    const items = useItems();
    const addItem = useAddItem();
    const removeItem = useRemoveItem();
    const layers = useLayers();

    useEffect(() => {
        console.log(items);


    }, [items])

    const layer = layers.find(l => l.name == layerName);


    const submitNewItem = async (evt: any) => {
        evt.preventDefault();
        const formItem: Item = {} as Item;
        Array.from(evt.target).forEach((input: HTMLInputElement) => {
            if (input.name) {
                formItem[input.name] = input.value;
            }
        });
        setLoading(true);
        formItem.text && formItem.text.toLocaleLowerCase().match(hashTagRegex)?.map(tag => {
            if (!tags.find((t) => t.name.toLocaleLowerCase() === tag.slice(1).toLocaleLowerCase())) {
                addTag({ id: crypto.randomUUID(), name: tag.slice(1), color: randomColor() })
            }
        });
        const uuid = crypto.randomUUID();
        let success = false;
        try {
            await layer?.api?.createItem!({ ...formItem, id: uuid });
            success = true;
        } catch (error) {
            toast.error(error.toString());
        }
        if (success) {
            toast.success("New item created");
        }
        addItem({ ...formItem, user_created: user, id: uuid, layer: layer, public_edit: !user ? true : false });
        setLoading(false);
        setAddItemPopupType("");
    }

    const deleteItem = async (item) => {
        setLoading(true);
        let success = false;
        try {
            await layer?.api?.deleteItem!(item.id)
            success = true;
        } catch (error) {
            toast.error(error.toString());
        }
        if (success) {
            toast.success("Item deleted");
        }
        removeItem(item);
        setLoading(false);
    }


    return (
        <>


            <MapOverlayPage className='tw-rounded-none tw-overflow-y-auto tw-bg-base-200'>
                <div className='tw-h-fit'>
                    {breadcrumbs &&
                        <div className="tw-text-sm tw-breadcrumbs">
                            <ul>
                                {breadcrumbs.map((b, i) => <li key={i}><Link to={b.path} >{b.name}</Link></li>)}
                            </ul>
                        </div>}
                </div>
                <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-6 tw-pt-4">
                    {
                        items?.filter(i => i.layer?.name === layerName)
                            .sort((a, b) => {
                                // Convert date_created to milliseconds, handle undefined by converting to lowest possible date (0 milliseconds)
                                const dateA = a.date_updated ? new Date(a.date_updated).getTime() : a.date_created ? new Date(a.date_created).getTime() : 0;
                                const dateB = b.date_updated ? new Date(b.date_updated).getTime() : b.date_created ? new Date(b.date_created).getTime() : 0;
                                return dateB - dateA; // Subtracts milliseconds which are numbers
                            })
                            .map((i, k) => {
                                return (
                                    <div key={k} className='tw-cursor-pointer tw-card tw-border-[1px] tw-border-base-300 tw-card-body tw-shadow-xl tw-bg-base-100 tw-text-base-content tw-p-4 tw-mb-4 tw-h-fit' onClick={() => navigate(url + getValue(i, parameterField))}>
                                        <HeaderView loading={loading} item={i} api={layer?.api} itemAvatarField={itemImageField} itemNameField={itemNameField} itemSubnameField={itemSubnameField} editCallback={() => navigate("/edit-item/" + i.id)} deleteCallback={() => deleteItem(i)}></HeaderView>
                                        <div className='tw-overflow-y-auto tw-overflow-x-hidden tw-max-h-64 fade'>
                                            {i.layer?.itemType.show_start_end &&
                                                <StartEndView item={i}></StartEndView>
                                            }
                                            {i.layer?.itemType.show_text &&
                                                <TextView truncate item={i} itemTextField={itemTextField} />
                                            }
                                        </div>
                                        <DateUserInfo item={i}></DateUserInfo>
                                    </div>

                                )

                            })
                    }
                    {addItemPopupType == "place" ?

                        <form ref={tabRef} autoComplete='off' onSubmit={e => submitNewItem(e)}  >

                            <div className='tw-cursor-pointer tw-card tw-border-[1px] tw-border-base-300 tw-card-body tw-shadow-xl tw-bg-base-100 tw-text-base-content tw-p-6 tw-mb-10'>
                                <label className="tw-btn tw-btn-sm tw-rounded-2xl tw-btn-circle tw-btn-ghost hover:tw-bg-transparent tw-absolute tw-right-0 tw-top-0 tw-text-gray-600" onClick={() => {
                                    setAddItemPopupType("")
                                }}>
                                    <p className='tw-text-center '>✕</p></label>
                                <TextInput type="text" placeholder="Name" dataField="name" defaultValue={""} inputStyle='' />
                                {layer?.itemType.show_start_end_input && 
                                <PopupStartEndInput></PopupStartEndInput>
                                }
                                <TextAreaInput placeholder="Text" dataField="text" defaultValue={""} inputStyle='tw-h-40 tw-mt-5' />
                                <div className='tw-flex tw-justify-center'>
                                    <button className={loading ? 'tw-btn tw-btn-disabled tw-mt-5 tw-place-self-center' : 'tw-btn tw-mt-5 tw-place-self-center'} type='submit'>{loading ? <span className="tw-loading tw-loading-spinner"></span> : 'Save'}</button>
                                </div>
                            </div>
                        </form> : <></>
                    }

                </div>
                {children}


            </MapOverlayPage>


            {plusButton && <PlusButton layer={layer} triggerAction={() => { setAddItemPopupType("place"); scroll(); }} color={'#777'} collection='items' />}

        </>


    )
}
