import * as React from 'react'
import { useItems, useUpdateItem } from '../Map/hooks/useItems'
import { useEffect, useState } from 'react';
import { getValue } from '../../Utils/GetValue';
import { toast } from 'react-toastify';
import { useAuth } from '../Auth';
import { TextInput, TextAreaInput } from '../Input';
import { ColorPicker } from './ColorPicker';
import DialogModal from '../Templates/DialogModal';
import { hashTagRegex } from '../../Utils/HashTagRegex';
import { useAddTag, useTags } from '../Map/hooks/useTags';
import { randomColor } from '../../Utils/RandomColor';
import { useLocation, useNavigate } from 'react-router-dom';
import { Geometry, Item, Tag, UserItem } from '../../types';
import { MapOverlayPage } from '../Templates';
import { TagsWidget } from './TagsWidget';
import { decodeTag, encodeTag } from '../../Utils/FormatTags';
import { AvatarWidget } from './AvatarWidget';


export function OverlayItemProfileSettings() {

    const [id, setId] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [subname, setSubname] = useState<string>("");
    const [text, setText] = useState<string>("");
    const [image, setImage] = useState<string>("");
    const [color, setColor] = useState<string>("");


    const [activeTab, setActiveTab] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);




    const updateItem = useUpdateItem();

    const location = useLocation();
    const items = useItems();
    const [item, setItem] = useState<Item>({} as Item)

    const tags = useTags();
    const addTag = useAddTag();
    const navigate = useNavigate();



    useEffect(() => {
        const itemId = location.pathname.split("/")[2];
        const item = items.find(i => i.id === itemId);
        item && setItem(item);

    }, [location, items, activeTab])

    React.useEffect(() => {
        if (item.layer?.itemColorField) setColor(getValue(item, item.layer?.itemColorField));
        else setColor(item.layer?.markerDefaultColor || "#000")

        setId(item?.id ? item.id : "");
        setName(item?.name ? item.name : "");
        setText(item?.text ? item.text : "");
        setImage(item?.image ? item?.image : "");
    }, [item])


    const onUpdateItem = async () => {
        let changedItem = {} as Item;
        


        changedItem = { id: id, name: name, subname: subname, text: text, color: color, position: item.position, ...image.length > 10 && { image: image }};
        // update profile item in current state
        //const item = items.find(i => i.layer?.itemOwnerField && getValue(i, i.layer?.itemOwnerField).id === id);


      //  if (item && item.layer && item.layer.itemOwnerField) item[item.layer.itemOwnerField] = {... changedUser, offers: offer_state, needs: needs_state};
        // add new hashtags from profile text
        text.toLocaleLowerCase().match(hashTagRegex)?.map(tag => {
            if (!tags.find((t) => t.name.toLocaleLowerCase() === tag.slice(1).toLocaleLowerCase())) {
                addTag({ id: crypto.randomUUID(), name: encodeTag(tag.slice(1).toLocaleLowerCase()), color: randomColor()})
            }
        });

        setLoading(true);

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
            .then(() => item && updateItem({...item, ...changedItem}))
            .then(() => {
                setLoading(false);
                navigate("/item/"+item.id)});
    }


    return (
        <>
            <MapOverlayPage backdrop className='tw-mx-4 tw-mt-4 tw-mb-12 tw-overflow-x-hidden tw-max-h-[calc(100dvh-96px)] !tw-h-[calc(100dvh-96px)] tw-w-[calc(100%-32px)]  md:tw-w-[calc(50%-32px)] tw-max-w-3xl !tw-left-auto tw-top-0 tw-bottom-0'>
                <div className='tw-flex tw-flex-col tw-h-full'>
                    <div className="tw-flex">
                        <AvatarWidget avatar={image} setAvatar={setImage}/>
                        <ColorPicker color={color? color : "#3D3846"} onChange={setColor} className={"-tw-left-6 tw-top-14 -tw-mr-6"} />
                        <div className='tw-grow tw-mr-4'>
                            <TextInput placeholder="Name" defaultValue={item?.name ? item.name : ""} updateFormValue={(v) => setName(v)} containerStyle='tw-grow tw-input-md' />
                            <TextInput placeholder="Subtitle" defaultValue={item?.subname ? item.subname : ""} updateFormValue={(v) => setSubname(v)} containerStyle='tw-grow tw-input-sm tw-px-4 tw-mt-1' />
                        </div>
                    </div>


                    <div role="tablist" className="tw-tabs tw-tabs-lifted tw-mt-4">
                        <input type="radio" name="my_tabs_2" role="tab" className={`tw-tab  [--tab-border-color:var(--fallback-bc,oklch(var(--bc)/0.2))]`} aria-label="Vision" checked={activeTab == 1 && true} onChange={() => setActiveTab(1)} />
                        <div role="tabpanel" className="tw-tab-content tw-bg-base-100 tw-border-[var(--fallback-bc,oklch(var(--bc)/0.2))] tw-rounded-box tw-h-[calc(100dvh-332px)] tw-min-h-56">
                            <TextAreaInput placeholder="My Vision..." defaultValue={item?.text ? item.text : ""} updateFormValue={(v) => {console.log(v);setText(v)}} containerStyle='tw-h-full' inputStyle='tw-h-full tw-border-t-0 tw-rounded-tl-none' />
                        </div>

                        <input type="radio" name="my_tabs_2" role="tab" className="tw-tab [--tab-border-color:var(--fallback-bc,oklch(var(--bc)/0.2))]" aria-label="Projects" checked={activeTab == 2 && true} onChange={() => setActiveTab(2)} />
                        <div role="tabpanel" className="tw-tab-content tw-bg-base-100  tw-rounded-box tw-pt-4 tw-h-[calc(100dvh-332px)] tw-min-h-56">
                        </div>

                        <input type="radio" name="my_tabs_2" role="tab" className="tw-tab  [--tab-border-color:var(--fallback-bc,oklch(var(--bc)/0.2))]" aria-label="Events" checked={activeTab == 3 && true} onChange={() => setActiveTab(3)} />
                        <div role="tabpanel" className="tw-tab-content tw-bg-base-100 tw-border-[var(--fallback-bc,oklch(var(--bc)/0.2))] tw-rounded-box tw-h-[calc(100dvh-332px)] tw-min-h-56">
                        </div>

                        <input type="radio" name="my_tabs_2" role="tab" className="tw-tab  [--tab-border-color:var(--fallback-bc,oklch(var(--bc)/0.2))]" aria-label="Friends" checked={activeTab == 4 && true} onChange={() => setActiveTab(4)} />
                        <div role="tabpanel" className="tw-tab-content tw-bg-base-100 tw-border-[var(--fallback-bc,oklch(var(--bc)/0.2))] tw-rounded-box tw-h-[calc(100dvh-332px)] tw-min-h-56">
                        </div>
                    </div>

                    <div className="tw-mt-4 tw-mb-4"><button className={loading ? " tw-loading tw-btn-disabled tw-btn tw-btn-primary tw-float-right" : "tw-btn tw-btn-primary tw-float-right"} onClick={() => onUpdateItem()}>Update</button></div>

                </div>

            </MapOverlayPage>
        </>
    )
}


