import { useItems, useUpdateItem, useAddItem } from '../Map/hooks/useItems'
import { useEffect, useState } from 'react';
import { getValue } from '../../Utils/GetValue';
import { useAuth } from '../Auth';
import { useAddTag, useGetItemTags, useTags } from '../Map/hooks/useTags';
import { useLocation, useNavigate } from 'react-router-dom';
import { Item, Tag } from '../../types';
import { MapOverlayPage } from '../Templates';
import { useLayers } from '../Map/hooks/useLayers';
import { useHasUserPermission } from '../Map/hooks/usePermissions';
import { OnepagerForm } from './Templates/OnepagerForm';
import { linkItem, onUpdateItem, unlinkItem } from './itemFunctions';
import { SimpleForm } from './Templates/SimpleForm';
import { TabsForm } from './Templates/TabsForm';
import { FormHeader } from './Subcomponents/FormHeader';

export function ProfileForm({ userType }: { userType: string }) {

    const [state, setState] = useState({
        color: "",
        id: "",
        groupType: "wuerdekompass",
        status: "active",
        name: "",
        subname: "",
        text: "",
        contact: "",
        telephone: "",
        nextAppointment: "",
        image: "",
        markerIcon: "",
        offers: [] as Tag[],
        needs: [] as Tag[],
        relations: [] as Item[],
        start: "",
        end: ""
    });

    const [updatePermission, setUpdatePermission] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [item, setItem] = useState<Item>({} as Item)
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

    useEffect(() => {
        item && hasUserPermission("items", "update", item) && setUpdatePermission(true);
    }, [item])

    useEffect(() => {
        const itemId = location.pathname.split("/")[2];

        const item = items.find(i => i.id === itemId);
        item && setItem(item);

        const layer = layers.find(l => l.itemType.name == userType)

        !item && setItem({ id: crypto.randomUUID(), name: user ? user.first_name : "", text: "", layer: layer, new: true })

    }, [items])   

    useEffect(() => {
        const newColor = item.layer?.itemColorField && getValue(item, item.layer?.itemColorField)
            ? getValue(item, item.layer?.itemColorField)
            : (getItemTags(item) && getItemTags(item)[0]?.color)
                ? getItemTags(item)[0].color
                : item?.layer?.markerDefaultColor;

        const offers = (item?.offers ?? []).reduce((acc: Tag[], o) => {
            const offer = tags.find(t => t.id === o.tags_id);
            if (offer) acc.push(offer);
            return acc;
        }, []);

        const needs = (item?.needs ?? []).reduce((acc: Tag[], o) => {
            const need = tags.find(t => t.id === o.tags_id);
            if (need) acc.push(need);
            return acc;
        }, []);

        const relations = (item?.relations ?? []).reduce((acc: Item[], r) => {
            const relatedItem = items.find(i => i.id === r.related_items_id);
            if (relatedItem) acc.push(relatedItem);
            return acc;
        }, []);

        setState({
            color: newColor,
            id: item?.id ?? "",
            groupType: item?.group_type ?? "wuerdekompass",
            status: item?.status ?? "active",
            name: item?.name ?? "",
            subname: item?.subname ?? "",
            text: item?.text ?? "",
            contact: item?.contact ?? "",
            telephone: item?.telephone ?? "",
            nextAppointment: item?.next_appointment ?? "",
            image: item?.image ?? "",
            markerIcon: item?.marker_icon ?? "",
            offers: offers,
            needs: needs,
            relations: relations,
            start: item?.start ?? "",
            end: item?.end ?? ""
        });
    }, [item, tags, items]);

    const [template, setTemplate] = useState<string>("")

    useEffect(() => {
        setTemplate(item.layer?.itemType.template || userType);
    }, [userType, item])

    let params = new URLSearchParams(window.location.search);

    return (
        <>
            <MapOverlayPage backdrop className='tw-mx-4 tw-mt-4 tw-mb-4 tw-overflow-x-hidden tw-w-[calc(100%-32px)]  md:tw-w-[calc(50%-32px)] tw-max-w-3xl !tw-left-auto tw-top-0 tw-bottom-0'>
                
                <div className='tw-flex tw-flex-col tw-h-full'>

                    <FormHeader item={item} state={state} setState={setState} />

                    {template == "onepager" && (
                        <OnepagerForm item={item} state={state} setState={setState}></OnepagerForm>
                    )}

                    {template == "simple" &&
                        <SimpleForm state={state} setState={setState}></SimpleForm>
                    }

                    {template == "tabs" &&
                        <TabsForm loading={loading} item={item} state={state} setState={setState} updatePermission={updatePermission} linkItem={(id) => linkItem(id, item, updateItem)} unlinkItem={(id) => unlinkItem(id, item, updateItem)}></TabsForm>
                    }

                    <div className="tw-mt-4 tw-mb-4">
                        <button className={loading ? " tw-loading tw-btn tw-float-right" : "tw-btn tw-float-right"} onClick={() => onUpdateItem(state, item, tags, addTag, setLoading, navigate, updateItem, addItem, user, params)} style={true ? { backgroundColor: `${item.layer?.itemColorField && getValue(item, item.layer?.itemColorField) ? getValue(item, item.layer?.itemColorField) : (getItemTags(item) && getItemTags(item)[0] && getItemTags(item)[0].color ? getItemTags(item)[0].color : item?.layer?.markerDefaultColor)}`, color: "#fff" } : { color: "#fff" }}>Update</button>
                    </div>

                </div>

            </MapOverlayPage>
        </>
    )
}