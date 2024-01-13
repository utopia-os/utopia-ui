import * as React from 'react'
import { useAddFilterTag, useFilterTags, useResetFilterTags, useSetSearchPhrase } from '../../hooks/useFilter'
import useWindowDimensions from '../../hooks/useWindowDimension';
import axios from 'axios';
import { useRef, useState } from 'react';
import { useMap } from 'react-leaflet';
import { LatLng, LatLngBounds } from 'leaflet';
import { useDebounce } from '../../hooks/useDebounce';
import { useTags } from '../../hooks/useTags';
import { useItems } from '../../hooks/useItems';
import { useLeafletRefs } from '../../hooks/useLeafletRefs';
import { getValue } from '../../../../Utils/GetValue';



export const SearchControl = ({ clusterRef }) => {

    const windowDimensions = useWindowDimensions();
    const [value, setValue] = useState('');
    const [geoResults, setGeoResults] = useState<Array<any>>([]);
    const [tagsResults, setTagsResults] = useState<Array<any>>([]);
    const [itemsResults, setItemsResults] = useState<Array<any>>([]);
    const [hideSuggestions, setHideSuggestions] = useState(true);

    const map = useMap();
    const tags = useTags();
    const items = useItems();
    const leafletRefs = useLeafletRefs();
    const addFilterTag = useAddFilterTag();
    const resetFilterTags = useResetFilterTags();
    const filterTags = useFilterTags();

    useDebounce(() => {
        const searchGeo = async () => {
            try {
                const { data } = await axios.get(
                    `https://photon.komoot.io/api/?q=${value}&limit=5`
                );

                setGeoResults(data.features);
            } catch (error) {
                console.log(error);
            }
        };
        searchGeo();
        setItemsResults(items.filter(item => {
            if (item.layer?.itemTitleField) item.name = getValue(item, item.layer.itemTitleField)
            return item.name?.toLowerCase().includes(value.toLowerCase()) || item.text?.toLowerCase().includes(value.toLowerCase())
        }))
        setTagsResults(tags.filter(tag => tag.id?.toLowerCase().includes(value.toLowerCase())))



    }, 500, [value]);

    const searchInput = useRef<HTMLInputElement>(null);

    return (<>
        {!(windowDimensions.height < 500) &&
            <div className='tw-w-[calc(100vw-2rem)] tw-max-w-[22rem] '>
                <input type="text" placeholder="search ..." autoComplete="off" className="tw-input tw-input-bordered tw-w-full tw-shadow-xl tw-rounded-lg"
                    ref={searchInput}
                    onChange={(e) => setValue(e.target.value)}
                    onFocus={() => setHideSuggestions(false)}
                    onBlur={async () => {
                        setTimeout(() => {
                            setHideSuggestions(true);
                        }, 200);
                    }} />
                {hideSuggestions || Array.from(geoResults).length == 0 && itemsResults.length == 0 && tagsResults.length == 0 || value.length == 0 ? "" :
                    <div className='tw-card tw-card-body tw-bg-base-100 tw-p-4 tw-mt-2 tw-z-1000 tw-shadow-xl'>
                        {tagsResults.length > 0 &&
                            <div className='tw-flex tw-flex-wrap tw-max-h-16 tw-overflow-hidden'>
                                {tagsResults.map(tag => (
                                    <div key={tag.id} className='tw-rounded-2xl tw-text-white tw-p-1 tw-px-4 tw-shadow-md tw-card tw-mr-2 tw-mb-2 tw-cursor-pointer' style={{ backgroundColor: tag.color }} onClick={() => {
                                        addFilterTag(tag)
                                    }}>
                                        <b>#{capitalizeFirstLetter(tag.id)}</b>
                                    </div>
                                ))}
                            </div>
                        }

                        {itemsResults.length > 0 && tagsResults.length > 0 && <hr></hr>}
                        {itemsResults.slice(0, 10).map(item => (
                            <div key={item.id} className='tw-cursor-pointer hover:tw-font-bold' onClick={() => {
                                const marker = Object.entries(leafletRefs).find(r => r[1].item == item)?.[1].marker;

                                if (filterTags.length > 0) {
                                    marker !== null && window.history.pushState({}, "", `/${item.layer.name}/${item.id}`)
                                    resetFilterTags();
                                }
                                else {
                                    marker !== null && clusterRef?.current?.zoomToShowLayer(marker, () => {
                                        marker?.openPopup();
                                    });
                                }
                            }
                            }>{item.name}</div>
                        ))}
                        {Array.from(geoResults).length > 0 && (itemsResults.length > 0 || tagsResults.length > 0) && <hr></hr>}
                        {Array.from(geoResults).map((geo) => (
                            <div className='tw-cursor-pointer hover:tw-font-bold' key={Math.random()}
                                onClick={() => {
                                    searchInput.current?.blur();
                                    if (geo.properties.extent) map.fitBounds(new LatLngBounds(new LatLng(geo.properties.extent[1], geo.properties.extent[0]), new LatLng(geo.properties.extent[3], geo.properties.extent[2])));
                                    else map.setView(new LatLng(geo.geometry.coordinates[1], geo.geometry.coordinates[0]), 15, { duration: 1 })
                                }}>
                                {geo?.properties.name}
                            </div>
                        ))}
                    </div>}
            </div>
        }
    </>

    )
}


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}