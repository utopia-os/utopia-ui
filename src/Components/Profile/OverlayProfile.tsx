import * as React from 'react'
import { CardPage, MapOverlayPage } from '../Templates'
import { useItems } from '../Map/hooks/useItems'
import { useLocation } from 'react-router-dom'
import { useState } from 'react';
import { Item } from '../../types';
import { getValue } from '../../Utils/GetValue';
import { useMap } from 'react-leaflet';
import { LatLng } from 'leaflet';
import { TextView } from '../Map';
import useWindowDimensions from '../Map/hooks/useWindowDimension';

export function OverlayProfile() {

    const location = useLocation();
    const items = useItems();
    const [item, setItem] = useState<Item>({} as Item)
    const map = useMap();
    const windowDimension = useWindowDimensions();


    React.useEffect(() => {
        const itemId = location.pathname.split("/")[2];
        const item = items.find(i => i.id === itemId);
        item && setItem(item);
        const bounds = map.getBounds();
        const x = bounds.getEast() - bounds.getWest()
        if (windowDimension.width > 768)
            if (item?.position.coordinates[0])
                map.setView(new LatLng(item?.position.coordinates[1]!, item?.position.coordinates[0]! + x / 4))
    }, [location, items])


    return (
        <MapOverlayPage className='tw-mx-4 tw-mt-4 tw-max-h-[calc(100dvh-96px)] tw-h-[calc(100dvh-96px)] md:tw-w-[calc(50%-32px)] tw-w-[calc(100%-32px)] tw-max-w-xl !tw-left-auto tw-top-0 tw-bottom-0'>
            {item &&
                <>
                    <div className="flex flex-row tw-w-full">
                        <p className="text-4xl">{item.layer?.itemAvatarField && getValue(item, item.layer.itemAvatarField) && <img className='h-20 rounded-full inline' src={`https://api.utopia-lab.org/assets/${getValue(item, item.layer.itemAvatarField)}?width=160&heigth=160`}></img>} {item.layer?.itemNameField && getValue(item, item.layer.itemNameField)}</p>
                    </div>
                    <div className='tw-overflow-y-auto tw-h-full tw-pt-4 fade'>
                        <TextView item={item} />
                    </div>
                </>
            }
        </MapOverlayPage>
    )
}


