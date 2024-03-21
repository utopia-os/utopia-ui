import * as React from 'react'
import { useItems, useUpdateItem } from '../Map/hooks/useItems'
import { useState } from 'react';
import { getValue } from '../../Utils/GetValue';
import { toast } from 'react-toastify';
import { useAuth } from '../Auth';
import { TextInput, TextAreaInput } from '../Input';
import { ColorPicker } from './ColorPicker';
import { hashTagRegex } from '../../Utils/HashTagRegex';
import { useAddTag, useTags } from '../Map/hooks/useTags';
import { randomColor } from '../../Utils/RandomColor';
import { useNavigate } from 'react-router-dom';
import { Tag, UserItem } from '../../types';
import { MapOverlayPage } from '../Templates';
import { TagsWidget } from './TagsWidget';
import { decodeTag, encodeTag } from '../../Utils/FormatTags';
import { AvatarWidget } from './AvatarWidget';


export function OverlayProfileSettings() {

    const { user, updateUser, loading } = useAuth();

    const [id, setId] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [text, setText] = useState<string>("");
    const [avatar, setAvatar] = useState<string>("");
    const [color, setColor] = useState<string>("");
    const [offers, setOffers] = useState<Array<Tag>>([]);
    const [needs, setNeeds] = useState<Array<Tag>>([]);
    const [contact, setContact] = useState<string>("");

    const [activeTab, setActiveTab] = useState<number>(1);



    const items = useItems();
    const updateItem = useUpdateItem();

    const tags = useTags();
    const addTag = useAddTag();
    const navigate = useNavigate();

    React.useEffect(() => {
        setId(user?.id ? user.id : "");
        setName(user?.first_name ? user.first_name : "");
        setText(user?.description ? user.description : "");
        setAvatar(user?.avatar ? user?.avatar : "");
        setColor(user?.color ? user.color : "#aabbcc");
        setOffers([]);
        setNeeds([]);
        user?.offers.map(o=>  {
            const offer = tags.find(t => t.id === o.tags_id);
            offer && setOffers(current => [...current,offer])
        })
        user?.needs.map(o=>  {
            const need = tags.find(t => t.id === o.tags_id);
            need && setNeeds(current => [...current,need])
        })
        setContact(user?.contact ? user.contact : "");
    }, [user])


    const onUpdateUser = async () => {
        let changedUser = {} as UserItem;

        let offer_updates : Array<any> = [];
        //check for new offers
        offers.map(o => {
            const existingOffer = user?.offers.find(t => t.tags_id === o.id)
            existingOffer && offer_updates.push(existingOffer.id)
            if(!existingOffer && !tags.some(t => t.id === o.id)) addTag({...o,offer_or_need: true})
            !existingOffer && offer_updates.push({directus_user_id: user?.id, tags_id: o.id})
        });

        let needs_updates : Array<any> = [];

        needs.map(n => {
            const existingNeed = user?.needs.find(t => t.tags_id === n.id)
            existingNeed && needs_updates.push(existingNeed.id)
            !existingNeed && needs_updates.push({directus_user_id: user?.id, tags_id: n.id})
            !existingNeed && !tags.some(t => t.id === n.id) && addTag({...n,offer_or_need: true})
        });


        changedUser = { id: id, first_name: name, description: text, contact: contact, color: color, ...avatar.length > 10 && { avatar: avatar }, ... offers.length > 0 && {offers: offer_updates}, ... needs.length > 0 && {needs: needs_updates} };
        // update profile item in current state
        const item = items.find(i => i.layer?.itemOwnerField && getValue(i, i.layer?.itemOwnerField).id === id);

        let offer_state : Array<any> = [];
        let needs_state : Array<any> = [];

        await offers.map(o => {
            offer_state.push({directus_user_id: user?.id, tags_id: o.id})
        });

        await needs.map(n => {
            needs_state.push({directus_user_id: user?.id, tags_id: n.id})
        });


        if (item && item.layer && item.layer.itemOwnerField) item[item.layer.itemOwnerField] = {... changedUser, offers: offer_state, needs: needs_state};
        // add new hashtags from profile text
        text.toLocaleLowerCase().match(hashTagRegex)?.map(tag => {
            if (!tags.find((t) => t.name.toLocaleLowerCase() === tag.slice(1).toLocaleLowerCase())) {
                addTag({ id: crypto.randomUUID(), name: encodeTag(tag.slice(1).toLocaleLowerCase()), color: randomColor()})
            }
        });


        toast.promise(
            updateUser(changedUser),
            {
                pending: 'updating Profile  ...',
                success: 'Profile updated',
                error: {
                    render({ data }) {
                        return `${data}`
                    },
                },
            })
            .then(() => item && updateItem(item))
            .then(() => navigate("/"));
    }


    return (
        <>
            <MapOverlayPage backdrop className='tw-mx-4 tw-mt-4 tw-mb-12 tw-overflow-x-hidden tw-max-h-[calc(100dvh-96px)] !tw-h-[calc(100dvh-96px)] tw-w-[calc(100%-32px)]  md:tw-w-[calc(50%-32px)] tw-max-w-3xl !tw-left-auto tw-top-0 tw-bottom-0'>
                <div className='tw-flex tw-flex-col tw-h-full'>
                    <div className="tw-flex">
                        <AvatarWidget avatar={avatar} setAvatar={setAvatar}/>
                        <ColorPicker color={color} onChange={setColor} className={"-tw-left-6 tw-top-14 -tw-mr-6"} />
                        <TextInput placeholder="Name" defaultValue={user?.first_name ? user.first_name : ""} updateFormValue={(v) => setName(v)} containerStyle='tw-grow tw-ml-6 tw-my-auto ' />
                    </div>


                    <div role="tablist" className="tw-tabs tw-tabs-lifted tw-mt-4">
                        <input type="radio" name="my_tabs_2" role="tab" className={`tw-tab  [--tab-border-color:var(--fallback-bc,oklch(var(--bc)/0.2))]`} aria-label="Vision" checked={activeTab == 1 && true} onChange={() => setActiveTab(1)} />
                        <div role="tabpanel" className="tw-tab-content tw-bg-base-100 tw-border-[var(--fallback-bc,oklch(var(--bc)/0.2))] tw-rounded-box tw-h-[calc(100dvh-332px)] tw-min-h-56">
                            <TextAreaInput placeholder="My Vision..." defaultValue={user?.description ? user.description : ""} updateFormValue={(v) => setText(v)} containerStyle='tw-h-full' inputStyle='tw-h-full tw-border-t-0 tw-rounded-tl-none' />
                        </div>

                        <input type="radio" name="my_tabs_2" role="tab" className="tw-tab tw-min-w-[10em] [--tab-border-color:var(--fallback-bc,oklch(var(--bc)/0.2))]" aria-label="Offers & Needs" checked={activeTab == 2 && true} onChange={() => setActiveTab(2)} />
                        <div role="tabpanel" className="tw-tab-content tw-bg-base-100  tw-rounded-box tw-pt-4 tw-h-[calc(100dvh-332px)] tw-min-h-56">
                            <div className='tw-h-full'>
                                <div className='tw-w-full tw-h-[calc(50%-0.75em)] tw-mb-4'>
                                    <TagsWidget defaultTags={offers} onUpdate={(v)=>setOffers(v)} placeholder="enter your offers" containerStyle='tw-bg-transparent tw-w-full tw-h-full tw-mt-3 tw-text-xs tw-h-[calc(100%-1rem)] tw-min-h-[5em] tw-pb-2 tw-overflow-auto'/>
                                </div>
                                <div className='tw-w-full tw-h-[calc(50%-0.75em)] '>
                                    <TagsWidget defaultTags={needs} onUpdate={(v)=>setNeeds(v)} placeholder="enter your needs" containerStyle='tw-bg-transparent tw-w-full tw-h-full tw-mt-3 tw-text-xs tw-h-[calc(100%-1rem)] tw-min-h-[5em] tw-pb-2 tw-overflow-auto'/>
                                </div>
                            </div>
                        </div>

                        <input type="radio" name="my_tabs_2" role="tab" className="tw-tab  [--tab-border-color:var(--fallback-bc,oklch(var(--bc)/0.2))]" aria-label="Contact" checked={activeTab == 3 && true} onChange={() => setActiveTab(3)} />
                        <div role="tabpanel" className="tw-tab-content tw-bg-base-100 tw-border-[var(--fallback-bc,oklch(var(--bc)/0.2))] tw-rounded-box tw-h-[calc(100dvh-332px)] tw-min-h-56">
                            <TextAreaInput placeholder="Contact ..." defaultValue={user?.contact ? user.contact : ""} updateFormValue={(v) => setContact(v)} containerStyle='tw-h-full' inputStyle='tw-h-full tw-border-t-0 ' />
                        </div>
                    </div>

                    <div className="tw-mt-4 tw-mb-4"><button className={loading ? " tw-loading tw-btn-disabled tw-btn tw-btn-primary tw-float-right" : "tw-btn tw-btn-primary tw-float-right"} onClick={() => onUpdateUser()}>Update</button></div>

                </div>

            </MapOverlayPage>
        </>
    )
}


