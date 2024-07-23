import { Item } from '../../types';
import { hashTagRegex } from '../../Utils/HashTagRegex';
import { randomColor } from '../../Utils/RandomColor';
import { toast } from 'react-toastify';

export const submitNewItem = async (evt: any, type: string, item, user, setLoading, tags, addTag, addItem, linkItem, resetFilterTags, layers, addItemPopupType, setAddItemPopupType,) => {
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