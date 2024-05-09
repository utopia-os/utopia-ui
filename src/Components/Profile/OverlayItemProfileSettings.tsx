import { useItems, useUpdateItem, useAddItem } from '../Map/hooks/useItems'
import { useEffect, useState } from 'react';
import { getValue } from '../../Utils/GetValue';
import { toast } from 'react-toastify';
import { useAuth } from '../Auth';
import { TextInput, TextAreaInput } from '../Input';
import { ColorPicker } from './ColorPicker';
import { hashTagRegex } from '../../Utils/HashTagRegex';
import { useAddTag, useGetItemTags, useTags } from '../Map/hooks/useTags';
import { randomColor } from '../../Utils/RandomColor';
import { useLocation, useNavigate } from 'react-router-dom';
import { Item, Tag } from '../../types';
import { MapOverlayPage } from '../Templates';
import { AvatarWidget } from './AvatarWidget';
import { encodeTag } from '../../Utils/FormatTags';
import { useLayers } from '../Map/hooks/useLayers';
import { TagsWidget } from './TagsWidget';
import { LinkedItemsHeaderView } from './LinkedItemsHeaderView';
import { TextView } from '../Map';
import { ActionButton } from './ActionsButton';
import { useHasUserPermission } from '../Map/hooks/usePermissions';



export function OverlayItemProfileSettings() {

    const [id, setId] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [subname, setSubname] = useState<string>("");
    const [text, setText] = useState<string>("");
    const [image, setImage] = useState<string>("");
    const [color, setColor] = useState<string>("");
    const [offers, setOffers] = useState<Array<Tag>>([]);
    const [needs, setNeeds] = useState<Array<Tag>>([]);
    const [relations, setRelations] = useState<Array<Item>>([]);

    const [updatePermission, setUpdatePermission] = useState<boolean>(false);


    const [activeTab, setActiveTab] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const { user } = useAuth();

    const updateItem = useUpdateItem();
    const addItem = useAddItem();
    const layers = useLayers();
    const location = useLocation();


    const tags = useTags();
    const addTag = useAddTag();
    const navigate = useNavigate();
    const hasUserPermission = useHasUserPermission();
    const getItemTags = useGetItemTags();



    const items = useItems();
    const [item, setItem] = useState<Item>({} as Item)

    useEffect(() => {
        item && item.user_created && hasUserPermission("items", "update", item) && setUpdatePermission(true);
    }, [item])

    useEffect(() => {
        const itemId = location.pathname.split("/")[2];

            const item = items.find(i => i.id === itemId);
            item && setItem(item);

        const layer = layers.find(l => l.itemType.name == "user")

        !item && setItem({ id: crypto.randomUUID(), name: user ? user.first_name : "", text: "", layer: layer, new: true })

    }, [items])

    const updateActiveTab = (id: number) => {
        setActiveTab(id);

        let params = new URLSearchParams(window.location.search);
        let urlTab = params.get("tab");
        if (!urlTab?.includes(id.toString()))
            params.set("tab", `${id ? id : ""}`)
        window.history.pushState('', '', "?" + params.toString());
    }

    useEffect(() => {
        let params = new URLSearchParams(location.search);
        let urlTab = params.get("tab");
        urlTab ? setActiveTab(Number(urlTab)) : setActiveTab(1);
    }, [location])



    useEffect(() => {
        if (item.layer?.itemColorField) setColor(getValue(item, item.layer?.itemColorField));
        else setColor(item.layer?.markerDefaultColor || "#3D3846")

        setId(item?.id ? item.id : "");
        setName(item?.name ? item.name : "");
        setSubname(item?.subname ? item.subname : "");
        setText(item?.text ? item.text : "");
        setImage(item?.image ? item?.image : "");
        setOffers([]);
        setNeeds([]);
        setRelations([]);
        item?.offers?.map(o => {
            const offer = tags?.find(t => t.id === o.tags_id);
            offer && setOffers(current => [...current, offer])
        })
        item?.needs?.map(o => {
            const need = tags?.find(t => t.id === o.tags_id);
            need && setNeeds(current => [...current, need])
        })
        item.relations?.map(r => {
            const item = items.find(i => i.id == r.related_items_id)
            item && setRelations(current => [...current, item])
        })

    }, [item])


    const onUpdateItem = async () => {
        let changedItem = {} as Item;

        let offer_updates: Array<any> = [];
        //check for new offers
        offers?.map(o => {
            const existingOffer = item?.offers?.find(t => t.tags_id === o.id)
            existingOffer && offer_updates.push(existingOffer.id)
            if (!existingOffer && !tags.some(t => t.id === o.id)) addTag({ ...o, offer_or_need: true })
            !existingOffer && offer_updates.push({ items_id: item?.id, tags_id: o.id })
        });

        let needs_updates: Array<any> = [];

        needs?.map(n => {
            const existingNeed = item?.needs?.find(t => t.tags_id === n.id)
            existingNeed && needs_updates.push(existingNeed.id)
            !existingNeed && needs_updates.push({ items_id: item?.id, tags_id: n.id })
            !existingNeed && !tags.some(t => t.id === n.id) && addTag({ ...n, offer_or_need: true })
        });







        changedItem = { id: id, name: name, subname: subname, text: text, color: color, position: item.position, ...image.length > 10 && { image: image }, ...offers.length > 0 && { offers: offer_updates }, ...needs.length > 0 && { needs: needs_updates } };
        // update profile item in current state

        let offers_state: Array<any> = [];
        let needs_state: Array<any> = [];

        await offers.map(o => {
            offers_state.push({ items_id: item?.id, tags_id: o.id })
        });

        await needs.map(n => {
            needs_state.push({ items_id: item?.id, tags_id: n.id })
        });

        changedItem = { ...changedItem, offers: offers_state, needs: needs_state };


        text.toLocaleLowerCase().match(hashTagRegex)?.map(tag => {
            if (!tags.find((t) => t.name.toLocaleLowerCase() === tag.slice(1).toLocaleLowerCase())) {
                addTag({ id: crypto.randomUUID(), name: encodeTag(tag.slice(1).toLocaleLowerCase()), color: randomColor() })
            }
        });

        setLoading(true);
        console.log(item.layer);


        if (!item.new) {
            item?.layer?.api?.updateItem && toast.promise(
                item?.layer?.api?.updateItem(changedItem),
                {
                    pending: 'updating Item  ...',
                    success: 'Item updated',
                    error: {
                        render({ data }) {
                            return `${data}`
                        },
                    },
                })
                .then(() => item && updateItem({ ...item, ...changedItem }))
                .then(() => {
                    setLoading(false);
                    navigate("/item/" + item.id)
                });

        }
        else {
            item.layer?.api?.createItem && toast.promise(
                item.layer?.api?.createItem(changedItem),
                {
                    pending: 'updating Item  ...',
                    success: 'Item updated',
                    error: {
                        render({ data }) {
                            return `${data}`
                        },
                    },
                })
                .then(() => item && addItem({ ...item, ...changedItem, layer: item.layer, user_created: user, type: item.layer?.itemType }))
                .then(() => {
                    setLoading(false);
                    navigate("/")
                });
        }
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



    return (
        <>
            <MapOverlayPage backdrop className='tw-mx-4 tw-mt-4 tw-mb-12 tw-overflow-x-hidden tw-max-h-[calc(100dvh-96px)] !tw-h-[calc(100dvh-96px)] tw-w-[calc(100%-32px)]  md:tw-w-[calc(50%-32px)] tw-max-w-3xl !tw-left-auto tw-top-0 tw-bottom-0'>
                <div className='tw-flex tw-flex-col tw-h-full'>
                    <div className="tw-flex">
                        <AvatarWidget avatar={image} setAvatar={setImage} />
                        <ColorPicker color={item.layer?.itemColorField && getValue(item,item.layer?.itemColorField)? getValue(item,item.layer?.itemColorField) : (getItemTags(item) && getItemTags(item)[0] && getItemTags(item)[0].color ? getItemTags(item)[0].color : item?.layer?.markerDefaultColor)} onChange={setColor} className={"-tw-left-6 tw-top-14 -tw-mr-6"} />
                        <div className='tw-grow tw-mr-4'>
                            <TextInput placeholder="Name" defaultValue={item?.name ? item.name : ""} updateFormValue={(v) => setName(v)} containerStyle='tw-grow tw-input-md' />
                            <TextInput placeholder="Subtitle" defaultValue={item?.subname ? item.subname : ""} updateFormValue={(v) => setSubname(v)} containerStyle='tw-grow tw-input-sm tw-px-4 tw-mt-1' />
                        </div>
                    </div>


                    <div role="tablist" className="tw-tabs tw-tabs-lifted tw-mt-4">
                        <input type="radio" name="my_tabs_2" role="tab" className={`tw-tab  [--tab-border-color:var(--fallback-bc,oklch(var(--bc)/0.2))]`} aria-label="Info" checked={activeTab == 1 && true} onChange={() => updateActiveTab(1)} />
                        <div role="tabpanel" className="tw-tab-content tw-bg-base-100 tw-border-[var(--fallback-bc,oklch(var(--bc)/0.2))] tw-rounded-box tw-h-[calc(100dvh-332px)] tw-min-h-56 tw-border-none">
                            <TextAreaInput placeholder="My Vision..." defaultValue={item?.text ? item.text : ""} updateFormValue={(v) => { console.log(v); setText(v) }} containerStyle='tw-h-full' inputStyle='tw-h-full tw-border-t-0 tw-rounded-tl-none' />
                        </div>
                        {item.layer?.itemType.offers_and_needs &&
                            <>
                                <input type="radio" name="my_tabs_2" role="tab" className={`tw-tab tw-min-w-[10em]  [--tab-border-color:var(--fallback-bc,oklch(var(--bc)/0.2))]`} aria-label="Offers & Needs" checked={activeTab == 3 && true} onChange={() => updateActiveTab(3)} />
                                <div role="tabpanel" className="tw-tab-content tw-bg-base-100 tw-border-[var(--fallback-bc,oklch(var(--bc)/0.2))] tw-rounded-box tw-h-[calc(100dvh-332px)] tw-min-h-56 tw-border-none">
                                    <div className='tw-h-full'>
                                        <div className='tw-w-full tw-h-[calc(50%-0.75em)] tw-mb-4'>
                                            <TagsWidget defaultTags={offers} onUpdate={(v) => setOffers(v)} placeholder="enter your offers" containerStyle='tw-bg-transparent tw-w-full tw-h-full tw-mt-3 tw-text-xs tw-h-[calc(100%-1rem)] tw-min-h-[5em] tw-pb-2 tw-overflow-auto' />
                                        </div>
                                        <div className='tw-w-full tw-h-[calc(50%-0.75em)] '>
                                            <TagsWidget defaultTags={needs} onUpdate={(v) => setNeeds(v)} placeholder="enter your needs" containerStyle='tw-bg-transparent tw-w-full tw-h-full tw-mt-3 tw-text-xs tw-h-[calc(100%-1rem)] tw-min-h-[5em] tw-pb-2 tw-overflow-auto' />
                                        </div>
                                    </div>
                                </div>
                            </>
                        }
                        {item.layer?.itemType.relations &&
                                    <>
                                        <input type="radio" name="my_tabs_2" role="tab" className="tw-tab  [--tab-border-color:var(--fallback-bc,oklch(var(--bc)/0.2))]" aria-label="Relations" checked={activeTab == 7 && true} onChange={() => updateActiveTab(7)} />
                                        <div role="tabpanel" className="tw-tab-content tw-bg-base-100  tw-rounded-box tw-h-[calc(100dvh-332px)] tw-overflow-y-auto tw-pt-4 tw-pb-1 -tw-mx-4 tw-overflow-x-hidden">
                                            <div className='tw-h-full'>
                                                <div className='tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-1 lg:tw-grid-cols-1 xl:tw-grid-cols-1 2xl:tw-grid-cols-2'>
                                                    {relations && relations.map(i =>


                                                        <div key={i.id} className='tw-cursor-pointer tw-card tw-bg-base-200 tw-border-[1px] tw-border-base-300 tw-card-body tw-shadow-xl tw-text-base-content tw-mx-4 tw-p-6 tw-mb-4' onClick={() => navigate('/item/' + i.id)}>
                                                            <LinkedItemsHeaderView unlinkPermission={updatePermission} item={i} unlinkCallback={unlinkItem} loading={loading} />
                                                            <div className='tw-overflow-y-auto tw-overflow-x-hidden tw-max-h-64 fade'>
                                                                <TextView truncate item={i} />
                                                            </div>
                                                        </div>
                                                    )}
                                                    {updatePermission && <ActionButton customStyle="!tw-bottom-20" collection="items" item={item} existingRelations={relations} triggerItemSelected={linkItem} colorField={item.layer.itemColorField}></ActionButton>}

                                                </div>
                                            </div>
                                        </div>
                                    </>
                                }


                    </div>

                    <div className="tw-mt-4 tw-mb-4"><button className={loading ? " tw-loading tw-btn tw-float-right" : "tw-btn tw-float-right"} onClick={() => onUpdateItem()} style={true ? { backgroundColor: `${item.layer?.itemColorField && getValue(item,item.layer?.itemColorField)? getValue(item,item.layer?.itemColorField) : (getItemTags(item) && getItemTags(item)[0] && getItemTags(item)[0].color ? getItemTags(item)[0].color : item?.layer?.markerDefaultColor)}`, color: "#fff" } : {color: "#fff"}}>Update</button></div>

                </div>

            </MapOverlayPage>
        </>
    )
}


