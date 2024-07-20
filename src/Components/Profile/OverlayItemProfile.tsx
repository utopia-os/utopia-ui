import { MapOverlayPage } from '../Templates'
import { useAddItem, useItems, useRemoveItem, useUpdateItem } from '../Map/hooks/useItems'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react';
import { Item, Tag } from '../../types';
import { useMap } from 'react-leaflet';
import { LatLng } from 'leaflet';
import { StartEndView, TextView } from '../Map';
import { useAddTag, useTags } from '../Map/hooks/useTags';
import { useAddFilterTag, useResetFilterTags } from '../Map/hooks/useFilter';
import { useHasUserPermission } from '../Map/hooks/usePermissions';
import { hashTagRegex } from '../../Utils/HashTagRegex';
import { randomColor } from '../../Utils/RandomColor';
import { toast } from 'react-toastify';
import { useAuth } from '../Auth';
import { useLayers } from '../Map/hooks/useLayers';
import { ActionButton } from './ActionsButton';
import { LinkedItemsHeaderView } from './LinkedItemsHeaderView';
import { HeaderView } from '../Map/Subcomponents/ItemPopupComponents/HeaderView';
import { useSelectPosition, useSetSelectPosition } from '../Map/hooks/useSelectPosition';
import { useClusterRef } from '../Map/hooks/useClusterRef';
import { useLeafletRefs } from '../Map/hooks/useLeafletRefs';
import { getValue } from '../../Utils/GetValue';
import { TagView } from '../Templates/TagView';
import RelationCard from "./RelationCard";
import ContactInfo from "./ContactInfo";
import ProfileSubHeader from "./ProfileSubHeader";
import { symbol } from 'prop-types';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { add, eachDayOfInterval, endOfMonth, endOfWeek, format, getDay, isSameMonth, isToday, parse, startOfToday, startOfWeek } from 'date-fns';

export function OverlayItemProfile({ userType }: { userType: string }) {

    const [updatePermission, setUpdatePermission] = useState<boolean>(false);
    const [relations, setRelations] = useState<Array<Item>>([]);
    const [activeTab, setActiveTab] = useState<number>(1);
    const [addItemPopupType, setAddItemPopupType] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [offers, setOffers] = useState<Array<Tag>>([]);
    const [needs, setNeeds] = useState<Array<Tag>>([]);

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
    const addFilterTag = useAddFilterTag();



    const tabRef = useRef<HTMLFormElement>(null);

    function scroll() {
        tabRef.current?.scrollIntoView();
    }

    useEffect(() => {
        scroll();
    }, [addItemPopupType])

    const [profile, setProfile] = useState<Item>();


    useEffect(() => {
        setProfile(items.find(i => (i.user_created?.id === item.user_created?.id) && i.layer?.itemType.name === userType));
    }, [item, items])




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
        let params = new URLSearchParams(location.search);
        let urlTab = params.get("tab");
        urlTab ? setActiveTab(Number(urlTab)) : setActiveTab(1);
    }, [location])


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

    const typeMapping = {
        'default': 'Würdekompass',
        'themenkompass': 'Themenkompass-Gruppe',
        'liebevoll.jetzt': 'liebevoll.jetzt',
    };

    let groupType = item.group_type ? item.group_type : 'default';
    let groupTypeText = typeMapping[groupType];

    const [template, setTemplate] = useState<string>("")

    useEffect(() => {
        setTemplate(item.layer?.itemType.template || userType);
    }, [userType, item])

    const attestations = [{
        from: "Timo",
        avatar: "https://api.utopia-lab.org/assets/262117f8-feb6-444f-9bd2-e84087285760?width=80&heigth=80",
        symbol: "🥇",
        text: "1. Platz im Bogenschießen",
        date: "21.06.2024",
    },
    {
        from: "Sebastian",
        avatar: "https://api.utopia-lab.org/assets/7510a082-882b-41c3-aa7d-5a19f9502f25?width=80&heigth=80",
        symbol: "🌱",
        text: "danke fürs Rasen mähen",
        date: "29.06.2024",
    },
    {
        from: "Yurij",
        avatar: "https://api.utopia-lab.org/assets/abe62291-35ad-45de-b978-e5906d8a3eb6?width=80&heigth=80",
        symbol: "🏆",
        text: "bester Coder ever",
        date: "04.07.2024",
    },
    {
        from: "Luca",
        avatar: "https://api.utopia-lab.org/assets/e285e653-36e8-4211-a69d-00053c1f610e?width=80&heigth=80",
        symbol: "🙏",
        text: "Vielen Dank für deine Hilfe!!!",
        date: "04.07.2024",
    },
    {
        from: "Lisa",
        avatar: "https://i.pinimg.com/originals/c0/ed/08/c0ed088cd6532d4fd27396aefddac57c.jpg",
        symbol: "❤️",
        text: "Vielen Dank für deine Hilfe!!!",
        date: "04.07.2024",
    },
    {
        from: "Timo",
        avatar: "https://api.utopia-lab.org/assets/262117f8-feb6-444f-9bd2-e84087285760?width=80&heigth=80",
        symbol: "🥈",
        text: "2. Platz im Bogenschießen",
        date: "21.06.2024",
    },
    {
        from: "Anton",
        avatar: "https://api.utopia-lab.org/assets/007dc678-6073-4ad1-9b47-f2cfe1dca582?width=80&heigth=80",
        symbol: "🌱",
        text: "danke fürs Rasen mähen",
        date: "29.06.2024"
    },
    ]

    const today = startOfToday();
    const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    const colStartClasses = [
      "",
      "col-start-2",
      "col-start-3",
      "col-start-4",
      "col-start-5",
      "col-start-6",
      "col-start-7",
    ];
  
    const [currMonth, setCurrMonth] = useState(() => format(today, "MMM-yyyy"));
    let firstDayOfMonth = parse(currMonth, "MMM-yyyy", new Date());
  
    const daysInMonth = eachDayOfInterval({
      start: startOfWeek(firstDayOfMonth),
      end: endOfWeek(endOfMonth(firstDayOfMonth)),
    });
  
    const getPrevMonth = (event: React.MouseEvent<SVGSVGElement>) => {
      event.preventDefault();
      const firstDayOfPrevMonth = add(firstDayOfMonth, { months: -1 });
      setCurrMonth(format(firstDayOfPrevMonth, "MMM-yyyy"));
    };
  
    const getNextMonth = (event: React.MouseEvent<SVGSVGElement>) => {
      event.preventDefault();
      const firstDayOfNextMonth = add(firstDayOfMonth, { months: 1 });
      setCurrMonth(format(firstDayOfNextMonth, "MMM-yyyy"));
    };

    const capitalizeFirstLetter = (string: string) => {
        return string
    }

    return (
        <>
            {item &&
                <MapOverlayPage key={item.id}
                    className={`${template == "onepager" && '!tw-p-0'} tw-mx-4 tw-mt-4 tw-max-h-[calc(100dvh-96px)] tw-h-[calc(100dvh-96px)] md:tw-w-[calc(50%-32px)] tw-w-[calc(100%-32px)] tw-min-w-80 tw-max-w-3xl !tw-left-0 sm:!tw-left-auto tw-top-0 tw-bottom-0 tw-transition-opacity tw-duration-500 ${!selectPosition ? 'tw-opacity-100 tw-pointer-events-auto' : 'tw-opacity-0 tw-pointer-events-none'}`}>

                    <>
                        <div className={`${template == "onepager" && "tw-px-6 tw-pt-6"}`}>
                            <HeaderView api={item.layer?.api} item={item} deleteCallback={handleDelete} editCallback={() => navigate("/edit-item/" + item.id)} setPositionCallback={() => { map.closePopup(); setSelectPosition(item); navigate("/") }} big truncateSubname={false} />
                            {template == "onepager" && <ProfileSubHeader
                                type={groupTypeText}
                                status={item.status}
                                url={window.location.href}
                                title={item.name}
                            />}
                        </div>


                        {template == "onepager" &&
                            <div className='tw-h-full tw-overflow-y-auto fade'>

                                {item.user_created.first_name && (
                                    <ContactInfo link={`/item/${profile?.id}`} name={profile?.name ? profile.name : item.user_created.first_name} avatar={profile?.image ? profile.image : item.user_created.avatar} email={item.contact} telephone={item.telephone} />
                                )}

                                {/* Description Section */}
                                <div className="tw-my-10 tw-mt-2 tw-px-6 tw-text-sm tw-text-gray-600">
                                    <TextView rawText={item.text || 'Keine Beschreibung vorhanden'} />
                                </div>

                                {/* Next Appointment Section */}
                                {item.next_appointment && (
                                    <div className="tw-my-10 tw-px-6">
                                        <h2 className="tw-text-lg tw-font-semibold">Nächste Termine</h2>
                                        <div className="tw-mt-2 tw-text-sm tw-text-gray-600">
                                            <TextView rawText={item.next_appointment} />
                                        </div>
                                    </div>
                                )};

                                {/* Relations Section */}
                                {/*{d.relations && (*/}
                                {/*    <div className="tw-my-10 tw-px-6">*/}
                                {/*        <h2 className="tw-text-lg tw-font-semibold tw-mb-4">Projekte</h2>*/}
                                {/*        {d.relations.map((project, index) => (*/}
                                {/*            <RelationCard*/}
                                {/*                key={index}*/}
                                {/*                title={project.title}*/}
                                {/*                description={project.description}*/}
                                {/*                imageSrc={project.imageSrc}*/}
                                {/*            />*/}
                                {/*        ))}*/}
                                {/*    </div>*/}
                                {/*)}*/}
                            </div>
                        }

                        {template == "simple" &&
                            <div className='tw-mt-8 tw-h-full tw-overflow-y-auto fade'>


                                <TextView item={item} />
                            </div>
                        }

                        {template == "tabs" &&
                            <div role="tablist" className="tw-tabs tw-tabs-lifted tw-mt-2 tw-mb-2">
                                {item.layer?.itemType.text &&
                                    <>
                                        <input type="radio" name="my_tabs_2" role="tab"
                                            className={`tw-tab  [--tab-border-color:var(--fallback-bc,oklch(var(--bc)/0.2))]`}
                                            aria-label="👤" checked={activeTab == 1 && true}
                                            onChange={() => updateActiveTab(1)} />
                                        <div role="tabpanel"
                                            className="tw-tab-content tw-bg-base-100 tw-rounded-box tw-h-[calc(100dvh-280px)] tw-overflow-y-auto fade tw-pt-2 tw-pb-4 tw-mb-4 tw-overflow-x-hidden">
                                            {item.layer?.itemType.show_start_end &&
                                                <div className='tw-max-w-xs'><StartEndView item={item}></StartEndView></div>
                                            }
                                            <TextView item={item} />
                                        </div>
                                    </>
                                }
                                {item.layer?.itemType.questlog &&
                                    <>
                                        <input type="radio" name="my_tabs_2" role="tab"
                                            className={`tw-tab  [--tab-border-color:var(--fallback-bc,oklch(var(--bc)/0.2))]`}
                                            aria-label="❤️" checked={activeTab == 2 && true}
                                            onChange={() => updateActiveTab(2)} />

                                        <div role="tabpanel"
                                            className="tw-tab-content tw-bg-base-100 tw-rounded-box tw-h-[calc(100dvh-280px)] tw-overflow-y-auto fade tw-pt-2 tw-pb-4 tw-mb-4 tw-overflow-x-hidden">
                                            <table className="sm:tw-table-sm md:tw-table-md">
                                                <tbody>
                                                    {attestations.map((a, i) => <tr key={i}>
                                                        <td>
                                                            <div className='tw-mask tw-mask-circle tw-text-xl md:tw-text-2xl tw-bg-slate-200 tw-rounded-full tw-p-2 tw-my-1 tw-mr-2'>{a.symbol}</div>

                                                        </td>
                                                        <td>
                                                            <div className='tw-mr-2' ><i>{a.text}</i></div>

                                                        </td>
                                                        <td>
                                                            <div className="flex items-center gap-3">
                                                                <div className="tw-avatar">
                                                                    <div className="tw-mask tw-rounded-full h-8 w-8 tw-mr-2">
                                                                        <img
                                                                            src={a.avatar}
                                                                            alt="Avatar Tailwind CSS Component" />
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="font-bold">{a.from}</div>
                                                                    <div className="tw-text-xs opacity-50 tw-text-zinc-500">{a.date}</div>

                                                                </div>
                                                            </div>
                                                        </td>


                                                    </tr>)}
                                                </tbody>
                                            </table>

                                        </div>
                                    </>
                                }
                                {item.layer?.itemType.text &&
                                    <>
                                        <input type="radio" name="my_tabs_2" role="tab"
                                            className={`tw-tab  [--tab-border-color:var(--fallback-bc,oklch(var(--bc)/0.2))]`}
                                            aria-label="🗓" checked={activeTab == 4 && true}
                                            onChange={() => updateActiveTab(4)} />
                                        <div role="tabpanel"
                                            className="tw-tab-content tw-bg-base-100 tw-rounded-box tw-h-[calc(100dvh-280px)] tw-overflow-y-auto fade tw-pt-2 tw-pb-4 tw-mb-4 tw-overflow-x-hidden tw-mt-4">
                                            <div className="flex items-center justify-between">
                                                <p className="font-semibold text-xl">
                                                    {format(firstDayOfMonth, "MMMM yyyy")}
                                                </p>
                                                <div className="flex items-center justify-evenly gap-6 sm:gap-12">
                                                    <ChevronLeftIcon
                                                        className="w-6 h-6 cursor-pointer"
                                                        onClick={getPrevMonth}
                                                    />
                                                    <ChevronRightIcon
                                                        className="w-6 h-6 cursor-pointer"
                                                        onClick={getNextMonth}
                                                    />
                                                </div>
                                            </div>
                                            <hr className="my-6" />
                                            <div className="grid grid-cols-7 gap-6 sm:gap-12 place-items-center">
                                                {days.map((day, idx) => {
                                                    return (
                                                        <div key={idx} className="font-semibold">
                                                            {capitalizeFirstLetter(day)}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                            <div className="grid grid-cols-7 gap-4 sm:gap-12 mt-8 place-items-center">
                                                {daysInMonth.map((day, idx) => {
                                                    return (
                                                        <div key={idx} className={colStartClasses[getDay(day)]}>
                                                            <p
                                                                className={`cursor-pointer flex items-center justify-center font-semibold h-8 w-8 rounded-full  hover:text-white ${isSameMonth(day, today) ? "text-current" : "text-gray-500"
                                                                    } ${!isToday(day) && "hover:bg-primary-content"} ${isToday(day) && "bg-primary !text-white"
                                                                    }`}
                                                            >
                                                                {format(day, "d")}
                                                            </p>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </>
                                }


                                {item.layer?.itemType.offers_and_needs &&

                                    <>

                                        <input type="radio" name="my_tabs_2" role="tab" className="tw-tab [--tab-border-color:var(--fallback-bc,oklch(var(--bc)/0.2))]" aria-label="🧩" checked={activeTab == 3 && true} onChange={() => updateActiveTab(3)} />
                                        <div role="tabpanel" className="tw-tab-content tw-bg-base-100  tw-rounded-box tw-h-[calc(100dvh-268px)] tw-overflow-y-auto fade tw-pt-4 tw-pb-1" >
                                            <div className='tw-h-full'>
                                                <div className='tw-grid tw-grid-cols-1'>
                                                    {
                                                        offers.length > 0 ?
                                                            <div className='tw-col-span-1'>
                                                                <h3 className='-tw-mb-2'>Offers</h3>
                                                                < div className='tw-flex tw-flex-wrap tw-mb-4'>
                                                                    {
                                                                        offers.map(o => <TagView key={o?.id} tag={o} onClick={() => {
                                                                            addFilterTag(o)
                                                                        }} />)
                                                                    }
                                                                </div>
                                                            </div> : ""
                                                    }
                                                    {
                                                        needs.length > 0 ?
                                                            <div className='tw-col-span-1'>
                                                                <h3 className='-tw-mb-2 tw-col-span-1'>Needs</h3>
                                                                < div className='tw-flex tw-flex-wrap  tw-mb-4'>
                                                                    {
                                                                        needs.map(n => <TagView key={n?.id} tag={n} onClick={() => addFilterTag(n)} />)
                                                                    }
                                                                </div>
                                                            </div> : ""
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </>


                                }

                                {item.layer?.itemType.relations &&
                                    <>
                                        <input type="radio" name="my_tabs_2" role="tab" className="tw-tab  [--tab-border-color:var(--fallback-bc,oklch(var(--bc)/0.2))]" aria-label="🔗" checked={activeTab == 7 && true} onChange={() => updateActiveTab(7)} />
                                        <div role="tabpanel" className="tw-tab-content tw-bg-base-100  tw-rounded-box tw-h-[calc(100dvh-280px)] tw-overflow-y-auto tw-pt-4 tw-pb-1 -tw-mr-4 -tw-mb-4 tw-overflow-x-hidden">
                                            <div className='tw-h-full'>
                                                <div className='tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-1 lg:tw-grid-cols-1 xl:tw-grid-cols-1 2xl:tw-grid-cols-2 tw-pb-4'>
                                                    {relations && relations.map(i =>


                                                        <div key={i.id} className='tw-cursor-pointer tw-card tw-bg-base-200 tw-border-[1px] tw-border-base-300 tw-card-body tw-shadow-xl tw-text-base-content tw-p-6 tw-mr-4 tw-mb-4' onClick={() => navigate('/item/' + i.id)}>
                                                            <LinkedItemsHeaderView unlinkPermission={updatePermission} item={i} unlinkCallback={unlinkItem} loading={loading} />
                                                            <div className='tw-overflow-y-auto tw-overflow-x-hidden tw-max-h-64 fade'>
                                                                <TextView truncate item={i} />
                                                            </div>
                                                        </div>
                                                    )}
                                                    {updatePermission && <ActionButton collection="items" item={item} existingRelations={relations} triggerItemSelected={linkItem} colorField={item.layer.itemColorField}></ActionButton>}

                                                </div>
                                            </div>
                                        </div>
                                    </>
                                }
                            </div>
                        }
                    </>

                </MapOverlayPage >
            }
        </>
    )
}


