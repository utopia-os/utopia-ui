import { ReactNode, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Item, ItemsApi, LayerProps } from '../../types';
import { getValue } from '../../Utils/GetValue';
import { PopupStartEndInput, StartEndView, TextView } from '../Map';
import { PlusButton } from '../Profile/Subcomponents/PlusButton';
import { TextInput, TextAreaInput } from '../Input';
import { useAddTag, useGetItemTags, useTags } from '../Map/hooks/useTags';
import { toast } from 'react-toastify';
import { hashTagRegex } from '../../Utils/HashTagRegex';
import { randomColor } from '../../Utils/RandomColor';
import { useAuth } from '../Auth';
import { useLayers } from '../Map/hooks/useLayers';
import { HeaderView } from '../Map/Subcomponents/ItemPopupComponents/HeaderView';
import { MapOverlayPage } from './MapOverlayPage';
import { useAddItem, useItems, useRemoveItem } from '../Map/hooks/useItems';
import { DateUserInfo } from './DateUserInfo';
import { ItemCard } from './ItemCard';
import { Control } from '../Map/Subcomponents/Controls/Control';
import { SearchControl } from '../Map/Subcomponents/Controls/SearchControl';
import { TagsControl } from '../Map/Subcomponents/Controls/TagsControl';
import { useFilterTags } from '../Map/hooks/useFilter';


export const OverlayItemsIndexPage = ({ url, layerName, parameterField, plusButton = true }: { layerName: string, url: string, parameterField: string, plusButton?: boolean }) => {



    const [loading, setLoading] = useState<boolean>(false);
    const [addItemPopupType, setAddItemPopupType] = useState<string>("");

    const tabRef = useRef<HTMLFormElement>(null);

    function scroll() {
        tabRef.current?.scrollIntoView();
    }

    useEffect(() => {
        scroll();
    }, [addItemPopupType])

    useEffect(() => {
      setAddItemPopupType("");
    }, [layerName])
    

    const tags = useTags();
    const addTag = useAddTag();
    const { user } = useAuth();
    const items = useItems();
    const addItem = useAddItem();
    const removeItem = useRemoveItem();
    const layers = useLayers();

    const filterTags = useFilterTags();
    const getItemTags = useGetItemTags();

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
            <MapOverlayPage className='tw-rounded-none tw-overflow-y-auto tw-bg-base-200 !tw-p-4'>
                <div className='tw-flex tw-flex-col tw-h-full'>
                    <div className='tw-flex-none'>
                        <Control position='topLeft' zIndex="1000" absolute={false}>
                            <SearchControl />
                            <TagsControl />
                        </Control>
                    </div>
                    <div className="tw-overflow-scroll fade tw-flex-1">
                        <div className='tw-columns-1 md:tw-columns-2 lg:tw-columns-3 2xl:tw-columns-4 tw-gap-6 tw-pt-4'>
                            {
                                items?.filter(i => i.layer?.name === layerName).
                                    filter(item =>
                                        filterTags.length == 0 ? item : filterTags.every(tag => getItemTags(item).some(filterTag => filterTag.name.toLocaleLowerCase() === tag.name.toLocaleLowerCase())))?.
                                    sort((a, b) => {
                                        // Convert date_created to milliseconds, handle undefined by converting to lowest possible date (0 milliseconds)
                                        const dateA = a.date_updated ? new Date(a.date_updated).getTime() : a.date_created ? new Date(a.date_created).getTime() : 0;
                                        const dateB = b.date_updated ? new Date(b.date_updated).getTime() : b.date_created ? new Date(b.date_created).getTime() : 0;
                                        return dateB - dateA; // Subtracts milliseconds which are numbers
                                    })?.
                                    map((i, k) => (
                                        <div key={k} className="tw-break-inside-avoid tw-mb-6">
                                            <ItemCard i={i} loading={loading} url={url} parameterField={parameterField} deleteCallback={() => deleteItem(i)} />
                                        </div>
                                    ))
                            }
                            {addItemPopupType == "place" && (
                                <form ref={tabRef} autoComplete='off' onSubmit={e => submitNewItem(e)}>
                                    <div className='tw-cursor-pointer tw-break-inside-avoid tw-card tw-border-[1px] tw-border-base-300 tw-card-body tw-shadow-xl tw-bg-base-100 tw-text-base-content tw-p-6 tw-mb-10'>
                                        <label className="tw-btn tw-btn-sm tw-rounded-2xl tw-btn-circle tw-btn-ghost hover:tw-bg-transparent tw-absolute tw-right-0 tw-top-0 tw-text-gray-600" onClick={() => setAddItemPopupType("")}>
                                            <p className='tw-text-center'>✕</p>
                                        </label>
                                        <TextInput type="text" placeholder="Name" dataField="name" defaultValue={""} inputStyle='' />
                                        {layer?.itemType.show_start_end_input && <PopupStartEndInput />}
                                        <TextAreaInput placeholder="Text" dataField="text" defaultValue={""} inputStyle='tw-h-40 tw-mt-5' />
                                        <div className='tw-flex tw-justify-center'>
                                            <button className={loading ? 'tw-btn tw-btn-disabled tw-mt-5 tw-place-self-center' : 'tw-btn tw-mt-5 tw-place-self-center'} type='submit'>
                                                {loading ? <span className="tw-loading tw-loading-spinner"></span> : 'Save'}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            )}
                        </div>

                    </div>
                </div>
            </MapOverlayPage>

            {plusButton && <PlusButton layer={layer} triggerAction={() => { setAddItemPopupType("place"); scroll(); }} color={'#777'} collection='items' />}
        </>
    )
}
