import * as React from 'react'
import { MapOverlayPage } from '../Templates'
import { useItems } from '../Map/hooks/useItems'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { Item, Tag, UserItem } from '../../types';
import { getValue } from '../../Utils/GetValue';
import { useMap } from 'react-leaflet';
import { LatLng } from 'leaflet';
import { TextView } from '../Map';
import useWindowDimensions from '../Map/hooks/useWindowDimension';
import { TagView } from '../Templates/TagView';
import { useTags } from '../Map/hooks/useTags';
import { useAuth } from '../Auth';
import { useAddFilterTag } from '../Map/hooks/useFilter';

export function OverlayProfile() {

    const location = useLocation();
    const items = useItems();
    const [item, setItem] = useState<Item>({} as Item)
    const map = useMap();
    const windowDimension = useWindowDimensions();

    const tags = useTags();
    const { user } = useAuth();

    const navigate = useNavigate();

    const [owner, setOwner] = useState<UserItem>();
    const [offers, setOffers] = useState<Array<Tag>>([]);
    const [needs, setNeeds] = useState<Array<Tag>>([]);

    const [activeTab, setActiveTab] = useState<number>(1);


    const addFilterTag = useAddFilterTag();



    useEffect(() => {
        const itemId = location.pathname.split("/")[2];
        const item = items.find(i => i.id === itemId);
        item && setItem(item);

        const bounds = map.getBounds();
        const x = bounds.getEast() - bounds.getWest()
        if (windowDimension.width > 768)
            if (item?.position?.coordinates[0])
                map.setView(new LatLng(item?.position.coordinates[1]!, item?.position.coordinates[0]! + x / 4))
    }, [location, items, activeTab])


    useEffect(() => {
        setOffers([]);
        setNeeds([]);
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
    }, [item])




    return (
        <MapOverlayPage className='tw-mx-4 tw-mt-4 tw-max-h-[calc(100dvh-96px)] tw-h-[calc(100dvh-96px)] md:tw-w-[calc(50%-32px)] tw-w-[calc(100%-32px)] tw-max-w-3xl !tw-left-auto tw-top-0 tw-bottom-0'>
            {item &&
                <>
                    <div className='tw-flex tw-flex-row'>
                        <div className="tw-grow">
                            <p className="tw-text-3xl tw-font-semibold">{item.layer?.itemAvatarField && getValue(item, item.layer.itemAvatarField) && <img className='tw-h-20 tw-rounded-full tw-inline' src={`https://api.utopia-lab.org/assets/${getValue(item, item.layer.itemAvatarField)}?width=160&heigth=160`}></img>} {item.layer?.itemNameField && getValue(item, item.layer.itemNameField)}</p>
                        </div>
                        {owner?.id === user?.id  && owner?.id ?
                            <a className='tw-self-center tw-btn tw-btn-sm tw-mr-4 tw-cursor-pointer' onClick={() => navigate("/profile-settings")}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="tw-h-5 tw-w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                </svg>
                            </a> : ""
                        }
                    </div>




                    <div className='tw-h-full'>

                    <div role="tablist" className="tw-tabs tw-tabs-lifted tw-mt-2 tw-mb-2">
                        <input type="radio" name="my_tabs_2" role="tab" className={`tw-tab  [--tab-border-color:var(--fallback-bc,oklch(var(--bc)/0.2))]`} aria-label="Vision" checked={activeTab == 1 && true} onChange={() => setActiveTab(1)} />
                        <div role="tabpanel" className="tw-tab-content tw-bg-base-100 tw-rounded-box tw-h-[calc(100dvh-268px)] tw-overflow-y-auto fade tw-pt-2 tw-pb-1">
                            <TextView item={item} />
                        </div>

                        <input type="radio" name="my_tabs_2" role="tab" className="tw-tab tw-min-w-[10em] [--tab-border-color:var(--fallback-bc,oklch(var(--bc)/0.2))]" aria-label="Offers & Needs" checked={activeTab == 2 && true} onChange={() => setActiveTab(2)} />
                        <div role="tabpanel" className="tw-tab-content tw-bg-base-100  tw-rounded-box tw-h-[calc(100dvh-268px)] tw-overflow-y-auto fade tw-pt-4 tw-pb-1" >
                            <div className='tw-h-full'>
                            <div className='tw-grid tw-grid-cols-1'>
                            {
                                offers.length > 0 ?
                                    <div className='tw-col-span-1'>
                                        <h3 className='-tw-mb-2'>Offers</h3>
                                        < div className='tw-flex tw-flex-wrap tw-mb-4'>
                                            {
                                                offers.map(o => <TagView key={o?.id} tag={o} onClick={() => {console.log(o);
                                                 addFilterTag(o)}} />)
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

                        <input type="radio" name="my_tabs_2" role="tab" className="tw-tab  [--tab-border-color:var(--fallback-bc,oklch(var(--bc)/0.2))]" aria-label="Contact" checked={activeTab == 3 && true} onChange={() => setActiveTab(3)} />
                        <div role="tabpanel" className="tw-tab-content tw-bg-base-100 tw-rounded-box tw-h-[calc(100dvh-268px)] tw-overflow-y-auto fade tw-pt-2 tw-pb-1">
                            <TextView item={item} itemTextField='user_created.contact' />
                        </div>
                    </div>




                    </div>
                </>
            }
        </MapOverlayPage >
    )
}


