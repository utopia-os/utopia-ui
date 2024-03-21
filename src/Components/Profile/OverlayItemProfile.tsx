import * as React from 'react'
import { MapOverlayPage, TitleCard } from '../Templates'
import { useAddItem, useItems, useRemoveItem, useUpdateItem } from '../Map/hooks/useItems'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react';
import { Item, Tag, UserItem } from '../../types';
import { getValue } from '../../Utils/GetValue';
import { useMap } from 'react-leaflet';
import { LatLng } from 'leaflet';
import { PopupStartEndInput, StartEndView, TextView } from '../Map';
import useWindowDimensions from '../Map/hooks/useWindowDimension';
import { useAddTag, useTags } from '../Map/hooks/useTags';
import { useAddFilterTag, useResetFilterTags } from '../Map/hooks/useFilter';
import { HeaderView } from '../Map/Subcomponents/ItemPopupComponents/HeaderView';
import { useHasUserPermission } from '../Map/hooks/usePermissions';
import PlusButton from './PlusButton';
import { TextAreaInput, TextInput } from '../Input';
import { hashTagRegex } from '../../Utils/HashTagRegex';
import { randomColor } from '../../Utils/RandomColor';
import { toast } from 'react-toastify';
import { useAuth } from '../Auth';
import { useLayers } from '../Map/hooks/useLayers';

export function OverlayItemProfile() {

    const location = useLocation();
    const items = useItems();
    const updateItem = useUpdateItem();
    const [item, setItem] = useState<Item>({} as Item)
    const map = useMap();
    const windowDimension = useWindowDimensions();

    const layers = useLayers();


    const tags = useTags();

    const navigate = useNavigate();

    const [owner, setOwner] = useState<UserItem>();
    const [offers, setOffers] = useState<Array<Tag>>([]);
    const [needs, setNeeds] = useState<Array<Tag>>([]);
    const [relations, setRelations] = useState<Array<Item>>([]);

    const [activeTab, setActiveTab] = useState<number>(1);

    const [addItemPopupType, setAddItemPopupType] = useState<string>("");

    const [loading, setLoading] = useState<boolean>(false);

    const addTag = useAddTag();
    const resetFilterTags = useResetFilterTags();

    const addItem = useAddItem();
    const { user } = useAuth();

    const hasUserPermission = useHasUserPermission();

    const tabRef = useRef<HTMLDivElement>(null);

    function scroll() {
        tabRef.current?.scrollTo(0, 800);
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
        setActiveTab(1);
    }, [location])

    useEffect(() => {
        setOffers([]);
        setNeeds([]);
        setRelations([]);
        setOwner(undefined);
        item?.layer?.itemOwnerField && setOwner(getValue(item, item.layer?.itemOwnerField));
        item.layer?.itemOffersField && getValue(item, item.layer.itemOffersField).map(o => {
            const tag = tags.find(t => t.id === o.tags_id);
            tag && setOffers(current => [...current, tag])
        })
        item.layer?.itemNeedsField && getValue(item, item.layer.itemNeedsField).map(n => {
            const tag = tags.find(t => t.id === n.tags_id);
            tag && setNeeds(current => [...current, tag])
        })
        item.relations?.map(r => {
            const item = items.find(i => i.id == r.related_items_id)
            item && setRelations(current => [...current, item])
        })
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
        let success = false;
        try {
            await item?.layer?.api?.createItem!({ ...formItem, id: uuid, type: type });
            await linkItem(uuid);
            success = true;
        } catch (error) {
            toast.error(error.toString());
        }
        if (success) {
            addItem({ ...formItem, id: uuid, type: type, layer: item?.layer, user_created: user });
            toast.success("New item created");
            resetFilterTags();
        }
        setLoading(false);
        setAddItemPopupType("");
    }

    const linkItem = async (id: string) => {
        let new_relations = item.relations;
        new_relations?.push({ items_id: item.id, related_items_id: id })

        const updatedItem = { id: item.id, relations: new_relations }

        await item?.layer?.api?.updateItem!(updatedItem)

        updateItem({ ...item, relations: new_relations })
    }

    return (
        <MapOverlayPage className='tw-mx-4 tw-mt-4 tw-max-h-[calc(100dvh-96px)] tw-h-[calc(100dvh-96px)] md:tw-w-[calc(50%-32px)] tw-w-[calc(100%-32px)] tw-max-w-3xl !tw-left-auto tw-top-0 tw-bottom-0'>
            {item &&
                <>
                    <div className='tw-flex tw-flex-row'>
                        <div className="tw-grow">
                            <p className="tw-text-3xl tw-font-semibold">{item.layer?.itemAvatarField && getValue(item, item.layer.itemAvatarField) && <img className='tw-w-20 tw-h-20 tw-rounded-full tw-inline' src={`https://api.utopia-lab.org/assets/${getValue(item, item.layer.itemAvatarField)}?width=160&heigth=160`}></img>} {item.layer?.itemNameField && getValue(item, item.layer.itemNameField)}</p>
                        </div>
                        {(item.layer?.api?.updateItem && hasUserPermission(item.layer.api?.collectionName!, "update")) ?
                            <a className='tw-self-center tw-btn tw-btn-sm tw-mr-4 tw-cursor-pointer' onClick={() => navigate("/edit-item/" + item.id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="tw-h-5 tw-w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                </svg>
                            </a> : ""
                        }
                    </div>




                    <div className='tw-h-full'>

                        <div role="tablist" className="tw-tabs tw-tabs-lifted tw-mt-2 tw-mb-2">
                            <input type="radio" name="my_tabs_2" role="tab" className={`tw-tab  [--tab-border-color:var(--fallback-bc,oklch(var(--bc)/0.2))]`} aria-label="Info" checked={activeTab == 1 && true} onChange={() => setActiveTab(1)} />
                            <div role="tabpanel" className="tw-tab-content tw-bg-base-100 tw-rounded-box tw-h-[calc(100dvh-268px)] tw-overflow-y-auto fade tw-pt-2 tw-pb-1">
                                <TextView item={item} />
                            </div>

                            <input type="radio" name="my_tabs_2" role="tab" className="tw-tab [--tab-border-color:var(--fallback-bc,oklch(var(--bc)/0.2))]" aria-label="Projects" checked={activeTab == 2 && true} onChange={() => setActiveTab(2)} />
                            <div ref={tabRef} role="tabpanel" className="tw-tab-content tw-bg-base-100  tw-rounded-box tw-h-[calc(100dvh-268px)] tw-overflow-y-auto tw-pt-4 tw-pb-1 -tw-mx-4" >
                                <div className='tw-h-full'>
                                    <div className='tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-1 lg:tw-grid-cols-1 xl:tw-grid-cols-2'>
                                        {relations && relations.map(i => {
                                            if (i.type == 'project') return (

                                                <div key={i.id} className='tw-cursor-pointer tw-card tw-border-[1px] tw-border-base-300 tw-card-body tw-shadow-xl tw-bg-base-100 tw-text-base-content tw-mx-4 tw-p-4 tw-mb-4 tw-h-fit' onClick={() => navigate('/item/' + i.id)}>
                                                    <HeaderView item={i} />
                                                    <div className='tw-overflow-y-auto tw-overflow-x-hidden tw-max-h-64 fade'>
                                                        <TextView truncate item={i} />
                                                    </div>
                                                </div>

                                            )
                                            else return null
                                        })}
                                        {addItemPopupType == "project" ?
                                            <form autoComplete='off' onSubmit={e => submitNewItem(e, addItemPopupType)} >

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
                                        <PlusButton triggerAction={() => { setAddItemPopupType("project"); scroll() }} color={item.color}></PlusButton>

                                    </div>
                                </div>
                            </div>

                            <input type="radio" name="my_tabs_2" role="tab" className="tw-tab  [--tab-border-color:var(--fallback-bc,oklch(var(--bc)/0.2))]" aria-label="Events" checked={activeTab == 3 && true} onChange={() => setActiveTab(3)} />
                            <div role="tabpanel" className="tw-tab-content tw-bg-base-100 tw-rounded-box tw-h-[calc(100dvh-268px)] tw-overflow-y-auto tw-pt-4 tw-pb-1">
                                <div className='tw-h-full'>
                                    <div className='tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-1 lg:tw-grid-cols-1 xl:tw-grid-cols-2'>
                                        {relations && relations.map(i => {
                                            if (i.type == 'event') return (

                                                <div key={i.id} className='tw-cursor-pointer tw-card tw-border-[1px] tw-border-base-300 tw-card-body tw-shadow-xl tw-bg-base-100 tw-text-base-content tw-mx-4 tw-p-6 tw-mb-4' onClick={() => navigate('/item/' + i.id)}>
                                                    <HeaderView item={i} hideMenu />
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
                                        <PlusButton triggerAction={() => { setAddItemPopupType("event"); scroll() }} color={item.color}></PlusButton>

                                    </div>
                                </div>
                            </div>
                            <input type="radio" name="my_tabs_2" role="tab" className="tw-tab  [--tab-border-color:var(--fallback-bc,oklch(var(--bc)/0.2))]" aria-label="Friends" checked={activeTab == 4 && true} onChange={() => setActiveTab(4)} />
                            <div role="tabpanel" className="tw-tab-content tw-bg-base-100 tw-rounded-box tw-h-[calc(100dvh-268px)] tw-overflow-y-auto fade tw-pt-2 tw-pb-1">
                            </div>
                        </div>




                    </div>
                </>
            }
        </MapOverlayPage >
    )
}


