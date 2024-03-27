import { useState, useEffect } from "react";
import { Item } from "../../types";
import { useItems } from "../Map/hooks/useItems";
import { useLocation } from "react-router-dom";


export const OverlayItemProfileSettings = () => {

    const items = useItems();
    const [item, setItem] = useState<Item>({} as Item)
    const location = useLocation();

    
    useEffect(() => {
        const itemId = location.pathname.split("/")[2];
        const item = items.find(i => i.id === itemId);
        item && setItem(item);

    }, [location, items])
    
  return (
    <div>

    </div>
  )
}
