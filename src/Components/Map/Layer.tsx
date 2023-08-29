import * as React from 'react'
import { Marker } from 'react-leaflet'
import { Item, LayerProps } from '../../types'
import MarkerIconFactory from '../../Utils/MarkerIconFactory'
import { ItemViewPopup } from './Subcomponents/ItemViewPopup'
import { useItems, useResetItems, useSetItemsApi, useSetItemsData } from './hooks/useItems'
import { useEffect, useState } from 'react'
import { ItemFormPopupProps, ItemFormPopup } from './Subcomponents/ItemFormPopup'
import { useAddFilterTag, useFilterTags } from './hooks/useFilter'


export const Layer = (props: LayerProps) => {

    const [itemFormPopup, setItemFormPopup] = useState<ItemFormPopupProps | null>(null);

    const filterTags = useFilterTags();
    const setFilterTag = useAddFilterTag();
    

   // setFilterTag({id: "healing", color: "#000"})


    const items = useItems();
    const setItemsApi = useSetItemsApi();
    const setItemsData = useSetItemsData();

    const resetItems = useResetItems();


    useEffect(() => {
        resetItems(props);
        props.data && setItemsData(props);
        props.api && setItemsApi(props);
    }, [props.data, props.api])

    return (
        <>
            {items &&
                items.filter(item => item.layer?.name === props.name)?.filter(item => 
                    filterTags.length == 0 ? item : item.tags?.some(tag => filterTags.some(filterTag => filterTag.id === tag.id)))?.map((place: Item) => {
                    const tags = place.tags;
                    if(place.name === "docutopia")
                    console.log(tags);
                    
                    let color1 = "#666";
                    let color2 = "RGBA(35, 31, 32, 0.2)";
                    if (tags && tags[0]) {
                        color1 = tags[0].color;
                    }
                    if (tags && tags[1]) {
                        color2 = tags[1].color;
                    }
                    return (
                        <Marker icon={MarkerIconFactory(props.markerShape, color1, color2, props.markerIcon)} key={place.id} position={[place.position.coordinates[1], place.position.coordinates[0]]}>
                            {
                                (props.children && React.Children.toArray(props.children).some(child => React.isValidElement(child) && child.props.__TYPE === "ItemView") ?
                                    React.Children.toArray(props.children).map((child) =>
                                        React.isValidElement(child) && child.props.__TYPE === "ItemView" ?
                                            <ItemViewPopup key={place.id} item={place} setItemFormPopup={props.setItemFormPopup} >{child}</ItemViewPopup>
                                            : ""
                                    )
                                    :
                                    <>
                                        <ItemViewPopup item={place} setItemFormPopup={props.setItemFormPopup} />
                                    </>)
                            }

                        </Marker>
                    );
                })
            }
            {//{props.children}}
            }
            {props.itemFormPopup && props.itemFormPopup.layer!.name == props.name &&
                (props.children && React.Children.toArray(props.children).some(child => React.isValidElement(child) && child.props.__TYPE === "ItemForm") ?
                    React.Children.toArray(props.children).map((child) =>
                        React.isValidElement(child) && child.props.__TYPE === "ItemForm" ?
                            <ItemFormPopup key={props.setItemFormPopup?.name} position={props.itemFormPopup!.position} layer={props.itemFormPopup!.layer} setItemFormPopup={setItemFormPopup} item={props.itemFormPopup!.item} >{child}</ItemFormPopup>
                            : ""
                    )
                    :
                    <>
                        <ItemFormPopup position={props.itemFormPopup!.position} layer={props.itemFormPopup!.layer} setItemFormPopup={setItemFormPopup} item={props.itemFormPopup!.item} />
                    </>)
            }
        </>
    )
}
