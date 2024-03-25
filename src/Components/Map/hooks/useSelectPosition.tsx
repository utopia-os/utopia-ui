import { createContext, useContext, useEffect, useState } from "react";
import { Item, LayerProps } from '../../../types';
import { useUpdateItem } from "./useItems";
import { toast } from "react-toastify";
import { useHasUserPermission } from "./usePermissions";

type UseSelectPositionManagerResult = ReturnType<typeof useSelectPositionManager>;

const SelectPositionContext = createContext<UseSelectPositionManagerResult>({
    selectPosition: null,
    setSelectPosition: () => { },
    setMarkerClicked: () => { },
});

function useSelectPositionManager(): {
    selectPosition: Item | LayerProps | null;
    setSelectPosition: React.Dispatch<React.SetStateAction<Item | LayerProps | null>>;
    setMarkerClicked: React.Dispatch<React.SetStateAction<Item>>;
} {
    const [selectPosition, setSelectPosition] = useState<LayerProps | null | Item>(null);
    const [markerClicked, setMarkerClicked] = useState<Item>();
    const updateItem = useUpdateItem();
    const hasUserPermission = useHasUserPermission();


    useEffect(() => {
        if (selectPosition && markerClicked && 'text' in selectPosition) {
            itemUpdate({ ...selectPosition, parent: markerClicked.id })
        }
    }, [markerClicked])

    const itemUpdate = async (updatedItem: Item) => {
        if (markerClicked?.layer?.api?.collectionName && hasUserPermission(markerClicked?.layer?.api?.collectionName, "update", markerClicked)) {
            let success = false;
            try {
                await updatedItem?.layer?.api?.updateItem!({ id: updatedItem.id, parent: updatedItem.parent, position: null })
                success = true;
            } catch (error) {
                toast.error(error.toString());
            }
            if (success) {
                await updateItem({ ...updatedItem, parent: updatedItem.parent, position: undefined })
                await linkItem(updatedItem.id);
                toast.success("Item position updated");
                setSelectPosition(null);
            }
        }
        else {
            setSelectPosition(null);
            toast.error("you don't have permission to add items to " + markerClicked?.name);
        }

    }

    const linkItem = async (id: string) => {
        if (markerClicked) {
            let new_relations = markerClicked.relations || [];
            console.log(new_relations);
            console.log(id);
            
            
            if (!new_relations.some(r => r.related_items_id == id)) {
                new_relations?.push({ items_id: markerClicked.id, related_items_id: id })
                const updatedItem = { id: markerClicked.id, relations: new_relations }

                let success = false;
                try {
                    await markerClicked?.layer?.api?.updateItem!(updatedItem)
                    success = true;
                } catch (error) {
                    toast.error(error.toString());
                }
                if (success) {
                    updateItem({ ...markerClicked, relations: new_relations })
                    toast.success("Item linked");
                }
            }
        }
    }
    return { selectPosition, setSelectPosition, setMarkerClicked };
}




export const SelectPositionProvider: React.FunctionComponent<{
    children?: React.ReactNode
}> = ({ children }) => (
    <SelectPositionContext.Provider value={useSelectPositionManager()}>
        {children}
    </SelectPositionContext.Provider>
);

export const useSelectPosition = (): Item | LayerProps | null => {
    const { selectPosition } = useContext(SelectPositionContext);
    return selectPosition;
};

export const useSetSelectPosition = (): UseSelectPositionManagerResult["setSelectPosition"] => {
    const { setSelectPosition } = useContext(SelectPositionContext);
    return setSelectPosition;
}

export const useSetMarkerClicked = (): UseSelectPositionManagerResult["setMarkerClicked"] => {
    const { setMarkerClicked } = useContext(SelectPositionContext);
    return setMarkerClicked;
}