import { Item, Tag } from '../../types';
import { encodeTag } from '../../Utils/FormatTags';
import { hashTagRegex } from '../../Utils/HashTagRegex';
import { randomColor } from '../../Utils/RandomColor';
import { toast } from 'react-toastify';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const submitNewItem = async (evt: any, type: string, item, user, setLoading, tags, addTag, addItem, linkItem, resetFilterTags, layers, addItemPopupType, setAddItemPopupType) => {
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

export const linkItem = async (id: string, item, updateItem) => {
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

export const unlinkItem = async (id: string, item, updateItem) => {
    let new_relations = item.relations?.filter(r => r.related_items_id !== id)
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

export const handleDelete = async (event: React.MouseEvent<HTMLElement>, item, setLoading, removeItem, map, navigate) => {
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


export const onUpdateItem = async (state, item, tags, addTag, setLoading, navigate, updateItem, addItem, user, params) => {
    let changedItem = {} as Item;

    let offer_updates: Array<any> = [];
    //check for new offers
    await state.offers?.map(o => {
        const existingOffer = item?.offers?.find(t => t.tags_id === o.id)
        existingOffer && offer_updates.push(existingOffer.id)
        if (!existingOffer && !tags.some(t => t.id === o.id)) addTag({ ...o, offer_or_need: true })
        !existingOffer && offer_updates.push({ items_id: item?.id, tags_id: o.id })
    });

    let needs_updates: Array<any> = [];

    await state.needs?.map(n => {
        const existingNeed = item?.needs?.find(t => t.tags_id === n.id)
        existingNeed && needs_updates.push(existingNeed.id)
        !existingNeed && needs_updates.push({ items_id: item?.id, tags_id: n.id })
        !existingNeed && !tags.some(t => t.id === n.id) && addTag({ ...n, offer_or_need: true })
    });


    // update profile item in current state
    changedItem = {
        id: state.id,
        group_type: state.groupType,
        status: state.status,
        name: state.name,
        subname: state.subname,
        text: state.text,
        color: state.color,
        position: item.position,
        contact: state.contact,
        telephone: state.telephone,
        ...state.markerIcon && { markerIcon: state.markerIcon },
        next_appointment: state.nextAppointment,
        ...state.image.length > 10 && { image: state.image },
        ...state.offers.length > 0 && { offers: offer_updates },
        ...state.needs.length > 0 && { needs: needs_updates }
    };

    let offers_state: Array<any> = [];
    let needs_state: Array<any> = [];

    state.offers.map(o => {
        offers_state.push({ items_id: item?.id, tags_id: o.id })
    });

    state.needs.map(n => {
        needs_state.push({ items_id: item?.id, tags_id: n.id })
    });

    changedItem = { ...changedItem, offers: offers_state, needs: needs_state };

    setLoading(true);

    await state.text.toLocaleLowerCase().match(hashTagRegex)?.map(tag => {
        if (!tags.find((t) => t.name.toLocaleLowerCase() === tag.slice(1).toLocaleLowerCase())) {
            addTag({ id: crypto.randomUUID(), name: encodeTag(tag.slice(1).toLocaleLowerCase()), color: randomColor() })
        }
    });

 
    await sleep(200); 

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
                navigate(`/item/${item.id}${params && "?" + params}`)
            });

    }
    else {
        item.new = false;
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
                navigate(`/${params && "?" + params}`)
            });
    }
}