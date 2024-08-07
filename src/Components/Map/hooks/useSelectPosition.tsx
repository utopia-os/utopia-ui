import { createContext, useContext, useEffect, useState } from "react";
import { Geometry, Item, LayerProps } from '../../../types';
import { useUpdateItem } from "./useItems";
import { toast } from "react-toastify";
import { useHasUserPermission } from "./usePermissions";
import { LatLng } from "leaflet";
import { ItemFormPopupProps } from "../Subcomponents/ItemFormPopup";
import { useNavigate } from "react-router-dom";

type PolygonClickedProps = {
    position: LatLng
    setItemFormPopup: React.Dispatch<React.SetStateAction<ItemFormPopupProps | null>>
}

type UseSelectPositionManagerResult = ReturnType<typeof useSelectPositionManager>;

const SelectPositionContext = createContext<UseSelectPositionManagerResult>({
    selectPosition: null,
    setSelectPosition: () => { },
    setMarkerClicked: () => { },
    setMapClicked: () => {},
});

function useSelectPositionManager(): {
    selectPosition: Item | LayerProps | null;
    setSelectPosition: React.Dispatch<React.SetStateAction<Item | LayerProps | null>>;
    setMarkerClicked: React.Dispatch<React.SetStateAction<Item>>;
    setMapClicked: React.Dispatch<React.SetStateAction<PolygonClickedProps | undefined>>;
} {
    const [selectPosition, setSelectPosition] = useState<LayerProps | null | Item>(null);
    const [markerClicked, setMarkerClicked] = useState<Item | null>();
    const [mapClicked, setMapClicked] = useState<PolygonClickedProps>();
    const updateItem = useUpdateItem();
    const hasUserPermission = useHasUserPermission();



    useEffect(() => {
        if (selectPosition && markerClicked && 'text' in selectPosition && markerClicked.id !==selectPosition.id) {
            itemUpdateParent({ ...selectPosition, parent: markerClicked.id })
        }
    }, [markerClicked])

    useEffect(() => {
       if (selectPosition != null) {
        if ('menuIcon' in selectPosition) {
            mapClicked && mapClicked.setItemFormPopup({ layer: selectPosition as LayerProps, position: mapClicked?.position })
            setSelectPosition(null)
        }
        if ('text' in selectPosition) {
            const position = mapClicked?.position.lng && new Geometry(mapClicked?.position.lng, mapClicked?.position.lat);
            position && itemUpdatePosition({ ...selectPosition as Item, position: position })
            setSelectPosition(null);
        }
    }
        
    }, [mapClicked])
    

    const itemUpdateParent = async (updatedItem: Item) => {
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
                setMarkerClicked(null);
            }
        }
        else {
            setSelectPosition(null);
            toast.error("you don't have permission to add items to " + markerClicked?.name);
        }

    }

    const itemUpdatePosition = async (updatedItem: Item) => {
        let success = false;
        try {
            await updatedItem?.layer?.api?.updateItem!({ id: updatedItem.id, position: updatedItem.position })
            success = true;
        } catch (error) {
            toast.error(error.toString());
        }
        if (success) {
            updateItem(updatedItem)
            toast.success("Item position updated");
        }
    }

    const linkItem = async (id: string) => {
        if (markerClicked) {
            let new_relations = markerClicked.relations || [];
            
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
    return { selectPosition, setSelectPosition, setMarkerClicked, setMapClicked };
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

export const useSetMapClicked = (): UseSelectPositionManagerResult["setMapClicked"] => {
    const { setMapClicked } = useContext(SelectPositionContext);
    return setMapClicked;
}