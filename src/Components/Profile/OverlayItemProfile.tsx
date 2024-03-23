import { MapOverlayPage } from '../Templates'
import { useAddItem, useItems, useRemoveItem, useUpdateItem } from '../Map/hooks/useItems'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react';
import { Item } from '../../types';
import { getValue } from '../../Utils/GetValue';
import { useMap } from 'react-leaflet';
import { LatLng } from 'leaflet';
import { PopupStartEndInput, StartEndView, TextView } from '../Map';
import useWindowDimensions from '../Map/hooks/useWindowDimension';
import { useAddTag, useTags } from '../Map/hooks/useTags';
import { useResetFilterTags } from '../Map/hooks/useFilter';
import { useHasUserPermission } from '../Map/hooks/usePermissions';
import { TextAreaInput, TextInput } from '../Input';
import { hashTagRegex } from '../../Utils/HashTagRegex';
import { randomColor } from '../../Utils/RandomColor';
import { toast } from 'react-toastify';
import { useAuth } from '../Auth';
import { useLayers } from '../Map/hooks/useLayers';
import { ActionButton } from './ActionsButton';
import { LinkedItemsHeaderView } from './LinkedItemsHeaderView';
import { HeaderView } from '../Map/Subcomponents/ItemPopupComponents/HeaderView';

export function OverlayItemProfile() {

    const location = useLocation();
    const items = useItems();
    const updateItem = useUpdateItem();
    const [item, setItem] = useState<Item>({} as Item)
    const map = useMap();
    const windowDimension = useWindowDimensions();

    const [addButton, setAddButton] = useState<boolean>(false);

    const layers = useLayers();

    const removeItem = useRemoveItem();

    const tags = useTags();

    const navigate = useNavigate();

    const [relations, setRelations] = useState<Array<Item>>([]);

    const [activeTab, setActiveTab] = useState<number>(1);

    const [addItemPopupType, setAddItemPopupType] = useState<string>("");

    const [loading, setLoading] = useState<boolean>(false);

    const addTag = useAddTag();
    const resetFilterTags = useResetFilterTags();

    const addItem = useAddItem();
    const { user } = useAuth();

    const hasUserPermission = useHasUserPermission();

    const tabRef = useRef<HTMLFormElement>(null);

    function scroll() {
        tabRef.current?.scrollIntoView();
    }

    useEffect(() => {
        scroll();
    }, [addItemPopupType])

    useEffect(() => {
        console.log(addItemPopupType);

    }, [addItemPopupType])


    const updateActiveTab = (id: number) => {
        setActiveTab(id);

        let params = new URLSearchParams(window.location.search);
        let urlTab = params.get("tab");
        if (!urlTab?.includes(id.toString()))
            params.set("tab", `${id ? id : ""}`)
        window.history.pushState('', '', "?" + params.toString());
    }

    useEffect(() => {

        const itemId = location.pathname.split("/")[2];
        const item = items.find(i => i.id === itemId);
        item && setItem(item);
        const bounds = map.getBounds();
        const x = bounds.getEast() - bounds.getWest()
        if (windowDimension.width > 768)
            if (item?.position && item?.position.coordinates[0])
                map.setView(new LatLng(item?.position.coordinates[1]!, item?.position.coordinates[0]! + x / 4))


    }, [location, items, activeTab])


    useEffect(() => {       
        let params = new URLSearchParams(location.search);
        let urlTab = params.get("tab");        
        urlTab ? setActiveTab(Number(urlTab)) : setActiveTab(1);
    }, [location])



    useEffect(() => {

        setRelations([]);
        item.relations?.map(r => {
            const item = items.find(i => i.id == r.related_items_id)
            item && setRelations(current => [...current, item])
        })
    }, [item, items])

    useEffect(() => {
        item && item.user_created && hasUserPermission("items", "update", item) && setAddButton(true);
    }, [item])


    const submitNewItem = async (evt: any, type: string) => {
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
        console.log(layers);

        const layer = layers.find(l => l.name.toLocaleLowerCase().replace("s", "") == addItemPopupType.toLocaleLowerCase())

        console.log(layer);

        let success = false;
        try {
            await layer?.api?.createItem!({ ...formItem, id: uuid, type: type });
            await linkItem(uuid);
            success = true;
        } catch (error) {
            toast.error(error.toString());
        }
        if (success) {
            addItem({ ...formItem, id: uuid, type: type, layer: layer, user_created: user });
            toast.success("New item created");
            resetFilterTags();
        }
        setLoading(false);
        setAddItemPopupType("");
    }

    const linkItem = async (id: string) => {
        let new_relations = item.relations || [];
        new_relations?.push({ items_id: item.id, related_items_id: id })
        const updatedItem = { id: item.id, relations: new_relations }

        let success = false;
        try {
            await item?.layer?.api?.updateItem!(updatedItem)
            success = true;
        } catch (error) {
            toast.error(error.toString());
        }
        if (success) {
            updateItem({ ...item, relations: new_relations })
            toast.success("Item linked");
        }
    }

    const unlinkItem = async (id: string) => {
        console.log(id);

        let new_relations = item.relations?.filter(r => r.related_items_id !== id)
        console.log(new_relations);

        const updatedItem = { id: item.id, relations: new_relations }


        let success = false;
        try {
            await item?.layer?.api?.updateItem!(updatedItem)
            success = true;
        } catch (error) {
            toast.error(error.toString());
        }
        if (success) {
            updateItem({ ...item, relations: new_relations })
            toast.success("Item unlinked");
        }

    }

    const handleDelete = async (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setLoading(true);
        let success = false;
        try {
          await item.layer?.api?.deleteItem!(item.id)
          success = true;
        } catch (error) {
          toast.error(error.toString());
        }
        if (success) {
          removeItem(item);
          toast.success("Item deleted");
        }
        setLoading(false);
        map.closePopup();
        let params = new URLSearchParams(window.location.search);
        window.history.pushState({}, "", "/" + `${params ? `?${params}` : ""}`);
        navigate("/");
      }
    
    

    return (
        <MapOverlayPage className='tw-mx-4 tw-mt-4 tw-max-h-[calc(100dvh-96px)] tw-h-[calc(100dvh-96px)] md:tw-w-[calc(50%-32px)] tw-w-[calc(100%-32px)] tw-min-w-80 tw-max-w-3xl !tw-left-auto tw-top-0 tw-bottom-0'>
            {item &&
                <>
                    <HeaderView api={item.layer?.api} item={item} deleteCallback={handleDelete} editCallback={ () => navigate("/edit-item/"+item.id)} big/>




                    <div className='tw-h-full'>

                        <div role="tablist" className="tw-tabs tw-tabs-lifted tw-mt-2 tw-mb-2">
                            <input type="radio" name="my_tabs_2" role="tab" className={`tw-tab  [--tab-border-color:var(--fallback-bc,oklch(var(--bc)/0.2))]`} aria-label="Info" checked={activeTab == 1 && true} onChange={() => updateActiveTab(1)} />
                            <div role="tabpanel" className="tw-tab-content tw-bg-base-100 tw-rounded-box tw-h-[calc(100dvh-280px)] tw-overflow-y-auto fade tw-pt-2 tw-pb-4 tw-mb-4 tw-overflow-x-hidden">
                                <TextView item={item} />
                            </div>

                            <input type="radio" name="my_tabs_2" role="tab" className="tw-tab [--tab-border-color:var(--fallback-bc,oklch(var(--bc)/0.2))]" aria-label="Projects" checked={activeTab == 2 && true} onChange={() => updateActiveTab(2)} />
                            <div role="tabpanel" className="tw-tab-content tw-bg-base-100  tw-rounded-box tw-h-[calc(100dvh-280px)] tw-overflow-y-auto tw-pt-4 tw-pb-1 -tw-mx-4 tw-overflow-x-hidden" >
                                <div className='tw-h-full'>
                                    <div className='tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-1 lg:tw-grid-cols-1 xl:tw-grid-cols-2 tw-pb-5'>
                                        {relations && relations.map(i => {
                                            if (i.type == 'project') return (

                                                <div key={i.id} className='tw-cursor-pointer tw-card tw-border-[1px] tw-border-base-300 tw-card-body tw-shadow-xl tw-bg-base-100 tw-text-base-content tw-mx-4 tw-p-4 tw-mb-4 tw-h-fit' onClick={() => navigate('/item/' + i.id)}>
                                                    <LinkedItemsHeaderView loading={loading} item={i} unlinkCallback={unlinkItem} />

                                                    <div className='tw-overflow-y-auto tw-overflow-x-hidden tw-max-h-64 fade'>
                                                        <TextView truncate item={i} />
                                                    </div>
                                                </div>

                                            )
                                            else return null
                                        })}
                                        {addItemPopupType == "project" ?
                                            <form ref={tabRef} autoComplete='off' onSubmit={e => submitNewItem(e, addItemPopupType)} >

                                                <div className='tw-cursor-pointer tw-card tw-border-[1px] tw-border-base-300 tw-card-body tw-shadow-xl tw-bg-base-100 tw-text-base-content tw-mx-4 tw-p-6 tw-mb-4'>
                                                    <label className="tw-btn tw-btn-sm tw-rounded-2xl tw-btn-circle tw-btn-ghost hover:tw-bg-transparent tw-absolute tw-right-0 tw-top-0 tw-text-gray-600" onClick={() => {
                                                        setAddItemPopupType("")
                                                    }}>
                                                        <p className='tw-text-center '>✕</p></label>
                                                    <TextInput type="text" placeholder="Name" dataField="name" defaultValue={""} inputStyle='' />
                                                    <TextAreaInput placeholder="Text" dataField="text" defaultValue={""} inputStyle='tw-h-40 tw-mt-5' />
                                                    <div className='tw-flex tw-justify-center'>
                                                        <button className={loading ? 'tw-btn tw-btn-disabled tw-mt-5 tw-place-self-center' : 'tw-btn tw-mt-5 tw-place-self-center'} type='submit'>{loading ? <span className="tw-loading tw-loading-spinner"></span> : 'Save'}</button>
                                                    </div>
                                                </div>
                                            </form> : <></>
                                        }
                                        {addButton && <ActionButton collection="items" item={item} existingRelations={relations} itemType={"project"} triggerItemSelected={linkItem} triggerAddButton={() => { setAddItemPopupType("project"); scroll() }} color={item.color}></ActionButton>}

                                    </div>
                                </div>
                            </div>

                            <input type="radio" name="my_tabs_2" role="tab" className="tw-tab  [--tab-border-color:var(--fallback-bc,oklch(var(--bc)/0.2))]" aria-label="Events" checked={activeTab == 3 && true} onChange={() => updateActiveTab(3)} />
                            <div role="tabpanel" className="tw-tab-content tw-bg-base-100 tw-rounded-box tw-h-[calc(100dvh-280px)] tw-overflow-y-auto tw-pt-4 tw-pb-1  -tw-mx-4 tw-overflow-x-hidden">
                                <div className='tw-h-full'>
                                    <div className='tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-1 lg:tw-grid-cols-1 xl:tw-grid-cols-2'>
                                        {relations && relations.map(i => {
                                            if (i.type == 'event') return (

                                                <div key={i.id} className='tw-cursor-pointer tw-card tw-border-[1px] tw-border-base-300 tw-card-body tw-shadow-xl tw-bg-base-100 tw-text-base-content tw-mx-4 tw-p-6 tw-mb-4' onClick={() => navigate('/item/' + i.id)}>
                                                    <LinkedItemsHeaderView item={i} unlinkCallback={unlinkItem} loading={loading} />
                                                    <div className='tw-overflow-y-auto tw-overflow-x-hidden tw-max-h-64 fade'>
                                                        <StartEndView item={i}></StartEndView>
                                                        <TextView truncate item={i} />
                                                    </div>
                                                </div>

                                            )
                                            else return null
                                        })}
                                        {addItemPopupType == "event" ?
                                            <form autoComplete='off' onSubmit={e => submitNewItem(e, addItemPopupType)} >

                                                <div className='tw-cursor-pointer tw-card tw-border-[1px] tw-border-base-300 tw-card-body tw-shadow-xl tw-bg-base-100 tw-text-base-content tw-mx-4 tw-p-4 tw-mb-4'>
                                                    <label className="tw-btn tw-btn-sm tw-rounded-2xl tw-btn-circle tw-btn-ghost hover:tw-bg-transparent tw-absolute tw-right-0 tw-top-0 tw-text-gray-600" onClick={() => {
                                                        setAddItemPopupType("")
                                                    }}>
                                                        <p className='tw-text-center '>✕</p></label>
                                                    <TextInput type="text" placeholder="Name" dataField="name" defaultValue={""} inputStyle='' />
                                                    <PopupStartEndInput></PopupStartEndInput>
                                                    <TextAreaInput placeholder="Text" dataField="text" defaultValue={""} inputStyle='tw-h-40 tw-mt-5' />
                                                    <div className='tw-flex tw-justify-center'>
                                                        <button className={loading ? 'tw-btn tw-btn-disabled tw-mt-5 tw-place-self-center' : 'tw-btn tw-mt-5 tw-place-self-center'} type='submit'>{loading ? <span className="tw-loading tw-loading-spinner"></span> : 'Save'}</button>
                                                    </div>
                                                </div>
                                            </form> : <></>
                                        }
                                        {addButton && <ActionButton collection="items" item={item} existingRelations={relations} itemType={"event"} triggerItemSelected={linkItem} triggerAddButton={() => { setAddItemPopupType("event"); scroll() }} color={item.color}></ActionButton>}

                                    </div>
                                </div>
                            </div>
                            <input type="radio" name="my_tabs_2" role="tab" className="tw-tab  [--tab-border-color:var(--fallback-bc,oklch(var(--bc)/0.2))]" aria-label="Friends" checked={activeTab == 4 && true} onChange={() => updateActiveTab(4)} />
                            <div role="tabpanel" className="tw-tab-content tw-bg-base-100 tw-rounded-box tw-h-[calc(100dvh-280px)] tw-overflow-y-auto fade tw-pt-2 tw-pb-1 tw-overflow-x-hidden">
                            </div>
                        </div>
                    </div>
                </>
            }
        </MapOverlayPage >
    )
}


