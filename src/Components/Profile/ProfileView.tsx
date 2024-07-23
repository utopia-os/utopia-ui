import { MapOverlayPage } from '../Templates'
import { useAddItem, useItems, useRemoveItem, useUpdateItem } from '../Map/hooks/useItems'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react';
import { Item, Tag } from '../../types';
import { useMap } from 'react-leaflet';
import { LatLng } from 'leaflet';
import { useAddTag, useTags } from '../Map/hooks/useTags';
import { useResetFilterTags } from '../Map/hooks/useFilter';
import { useHasUserPermission } from '../Map/hooks/usePermissions';
import { hashTagRegex } from '../../Utils/HashTagRegex';
import { randomColor } from '../../Utils/RandomColor';
import { toast } from 'react-toastify';
import { useAuth } from '../Auth';
import { useLayers } from '../Map/hooks/useLayers';
import { HeaderView } from '../Map/Subcomponents/ItemPopupComponents/HeaderView';
import { useSelectPosition, useSetSelectPosition } from '../Map/hooks/useSelectPosition';
import { useClusterRef } from '../Map/hooks/useClusterRef';
import { useLeafletRefs } from '../Map/hooks/useLeafletRefs';
import { getValue } from '../../Utils/GetValue';
import { Tabs } from './Templates/Tabs';
import { Onepager } from './Templates/Onepager';
import { Simple } from './Templates/Simple';

export function ProfileView({ userType }: { userType: string }) {

    const [updatePermission, setUpdatePermission] = useState<boolean>(false);
    const [relations, setRelations] = useState<Array<Item>>([]);
    const [offers, setOffers] = useState<Array<Tag>>([]);
    const [needs, setNeeds] = useState<Array<Tag>>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const [addItemPopupType, setAddItemPopupType] = useState<string>("");

    const location = useLocation();
    const items = useItems();
    const updateItem = useUpdateItem();
    const [item, setItem] = useState<Item>({} as Item)
    const map = useMap();
    const layers = useLayers();
    const selectPosition = useSelectPosition();
    const removeItem = useRemoveItem();
    const tags = useTags();
    const navigate = useNavigate();
    const addTag = useAddTag();
    const resetFilterTags = useResetFilterTags();
    const addItem = useAddItem();
    const { user } = useAuth();
    const hasUserPermission = useHasUserPermission();
    const setSelectPosition = useSetSelectPosition();
    const clusterRef = useClusterRef();
    const leafletRefs = useLeafletRefs();

    const tabRef = useRef<HTMLFormElement>(null);

    function scroll() {
        tabRef.current?.scrollIntoView();
    }

    useEffect(() => {
        scroll();
    }, [addItemPopupType])



    useEffect(() => {
        const itemId = location.pathname.split("/")[2];
        const item = items.find(i => i.id === itemId);
        item && setItem(item);
    }, [items, location])

    useEffect(() => {
        setOffers([]);
        setNeeds([]);
        setRelations([]);

        item.layer?.itemOffersField && getValue(item, item.layer.itemOffersField)?.map(o => {
            const tag = tags.find(t => t.id === o.tags_id);
            tag && setOffers(current => [...current, tag])
        })
        item.layer?.itemNeedsField && getValue(item, item.layer.itemNeedsField)?.map(n => {
            const tag = tags.find(t => t.id === n.tags_id);
            tag && setNeeds(current => [...current, tag])
        })
        item.relations?.map(r => {
            const item = items.find(i => i.id == r.related_items_id)
            item && setRelations(current => [...current, item])
        })

    }, [item, items])


    useEffect(() => {
        const setMap = async (marker, x) => {
            await map.setView(new LatLng(item?.position?.coordinates[1]!, item?.position?.coordinates[0]! + x / 4), undefined);
            setTimeout(() => {
                marker.openPopup();
            }, 500);
        }
        if (item) {
            if (item.position) {
                const marker = Object.entries(leafletRefs).find(r => r[1].item == item)?.[1].marker;
                marker && clusterRef.hasLayer(marker) && clusterRef?.zoomToShowLayer(marker, () => {
                    const bounds = map.getBounds();
                    const x = bounds.getEast() - bounds.getWest();
                    setMap(marker, x);
                }
                );
            }
            else {
                const parent = getFirstAncestor(item);
                const marker = Object.entries(leafletRefs).find(r => r[1].item == parent)?.[1].marker;
                marker && clusterRef.hasLayer(marker) && clusterRef?.zoomToShowLayer(marker, () => {
                    const bounds = map.getBounds();
                    const x = bounds.getEast() - bounds.getWest();
                    setMap(marker, x);
                }
                );
            }
        }
    }, [item])

    const getFirstAncestor = (item: Item): Item | undefined => {
        const parent = items.find(i => i.id === item.parent);
        if (parent?.parent) {
            return getFirstAncestor(parent);
        } else {
            return parent;
        }
    };

    useEffect(() => {
        item && hasUserPermission("items", "update", item) && setUpdatePermission(true);
    }, [item])


    useEffect(() => {
        selectPosition && map.closePopup();
    }, [selectPosition])

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

        const layer = layers.find(l => l.name.toLocaleLowerCase().replace("s", "") == addItemPopupType.toLocaleLowerCase())

        let success = false;
        try {
            await layer?.api?.createItem!({ ...formItem, id: uuid, type: type, parent: item.id });
            await linkItem(uuid);
            success = true;
        } catch (error) {
            toast.error(error.toString());
        }
        if (success) {
            addItem({ ...formItem, id: uuid, type: type, layer: layer, user_created: user, parent: item.id });
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

    const [template, setTemplate] = useState<string>("")

    useEffect(() => {
        setTemplate(item.layer?.itemType.template || userType);
    }, [userType, item])

    return (
        <>
            {item &&
                <MapOverlayPage key={item.id} className={`!tw-p-0 tw-mx-4 tw-mt-4 tw-mb-4 md:tw-w-[calc(50%-32px)] tw-w-[calc(100%-32px)] tw-min-w-80 tw-max-w-3xl !tw-left-0 sm:!tw-left-auto tw-top-0 tw-bottom-0 tw-transition-opacity tw-duration-500 ${!selectPosition ? 'tw-opacity-100 tw-pointer-events-auto' : 'tw-opacity-0 tw-pointer-events-none'}`}>
                    <>
                        <div className={`tw-px-6 tw-pt-6`}>
                            <HeaderView api={item.layer?.api} item={item} deleteCallback={handleDelete} editCallback={() => navigate("/edit-item/" + item.id)} setPositionCallback={() => { map.closePopup(); setSelectPosition(item); navigate("/") }} big truncateSubname={false} />
                        </div>


                        {template == "onepager" &&
                            <Onepager item={item} userType={userType}/>
                        }

                        {template == "simple" &&
                            <Simple item={item}></Simple>
                        }

                        {template == "tabs" &&
                            <Tabs item={item} loading={loading} offers={offers} needs={needs} relations={relations} updatePermission={updatePermission} linkItem={linkItem} unlinkItem={unlinkItem}/>
                        }
                    </>

                </MapOverlayPage >
            }
        </>
    )
}