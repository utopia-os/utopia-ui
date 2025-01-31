/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
import { Children, isValidElement, useEffect, useState } from 'react'
import { Marker, Tooltip } from 'react-leaflet'

import { encodeTag } from '#utils/FormatTags'
import { getValue } from '#utils/GetValue'
import { hashTagRegex } from '#utils/HashTagRegex'
import MarkerIconFactory from '#utils/MarkerIconFactory'
import { randomColor } from '#utils/RandomColor'

import {
  useFilterTags,
  useIsGroupTypeVisible,
  useIsLayerVisible,
  useVisibleGroupType,
} from './hooks/useFilter'
import { useAllItemsLoaded, useItems, useSetItemsApi, useSetItemsData } from './hooks/useItems'
import { useAddMarker, useAddPopup, useLeafletRefs } from './hooks/useLeafletRefs'
import { useSelectPosition, useSetMarkerClicked } from './hooks/useSelectPosition'
import { useAddTag, useAllTagsLoaded, useGetItemTags, useTags } from './hooks/useTags'
import { ItemFormPopup } from './Subcomponents/ItemFormPopup'
import { ItemViewPopup } from './Subcomponents/ItemViewPopup'

import type { Item } from '#types/Item'
import type { LayerProps } from '#types/LayerProps'
import type { Tag } from '#types/Tag'
import type { Popup } from 'leaflet'

export const Layer = ({
  data,
  children,
  name = 'places',
  menuIcon = 'MapPinIcon',
  menuText = 'add new place',
  menuColor = '#2E7D32',
  markerIcon = 'circle-solid',
  markerShape = 'circle',
  markerDefaultColor = '#777',
  markerDefaultColor2 = 'RGBA(35, 31, 32, 0.2)',
  api,
  itemType,
  itemNameField = 'name',
  itemSubnameField,
  itemTextField = 'text',
  itemAvatarField,
  itemColorField,
  itemOwnerField,
  itemLatitudeField = 'position.coordinates.1',
  itemLongitudeField = 'position.coordinates.0',
  itemTagsField,
  itemOffersField,
  itemNeedsField,
  onlyOnePerOwner = false,
  customEditLink,
  customEditParameter,
  // eslint-disable-next-line camelcase
  public_edit_items,
  listed = true,
  setItemFormPopup,
  itemFormPopup,
  clusterRef,
}: LayerProps) => {
  const filterTags = useFilterTags()

  const items = useItems()
  const setItemsApi = useSetItemsApi()
  const setItemsData = useSetItemsData()
  const getItemTags = useGetItemTags()
  const addMarker = useAddMarker()
  const addPopup = useAddPopup()
  const leafletRefs = useLeafletRefs()

  const allTagsLoaded = useAllTagsLoaded()
  const allItemsLoaded = useAllItemsLoaded()

  const setMarkerClicked = useSetMarkerClicked()
  const selectPosition = useSelectPosition()

  const tags = useTags()
  const addTag = useAddTag()
  const [newTagsToAdd, setNewTagsToAdd] = useState<Tag[]>([])
  const [tagsReady, setTagsReady] = useState<boolean>(false)

  const isLayerVisible = useIsLayerVisible()

  const isGroupTypeVisible = useIsGroupTypeVisible()

  const visibleGroupTypes = useVisibleGroupType()

  useEffect(() => {
    data &&
      setItemsData({
        data,
        children,
        name,
        menuIcon,
        menuText,
        menuColor,
        markerIcon,
        markerShape,
        markerDefaultColor,
        markerDefaultColor2,
        api,
        itemType,
        itemNameField,
        itemSubnameField,
        itemTextField,
        itemAvatarField,
        itemColorField,
        itemOwnerField,
        itemTagsField,
        itemOffersField,
        itemNeedsField,
        onlyOnePerOwner,
        customEditLink,
        customEditParameter,
        // eslint-disable-next-line camelcase
        public_edit_items,
        listed,
        setItemFormPopup,
        itemFormPopup,
        clusterRef,
      })
    api &&
      setItemsApi({
        data,
        children,
        name,
        menuIcon,
        menuText,
        menuColor,
        markerIcon,
        markerShape,
        markerDefaultColor,
        markerDefaultColor2,
        api,
        itemType,
        itemNameField,
        itemSubnameField,
        itemTextField,
        itemAvatarField,
        itemColorField,
        itemOwnerField,
        itemTagsField,
        itemOffersField,
        itemNeedsField,
        onlyOnePerOwner,
        customEditLink,
        customEditParameter,
        // eslint-disable-next-line camelcase
        public_edit_items,
        listed,
        setItemFormPopup,
        itemFormPopup,
        clusterRef,
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, api])

  useEffect(() => {
    if (tagsReady) {
      const processedTags = {}
      newTagsToAdd.map((newtag) => {
        if (!processedTags[newtag.name]) {
          processedTags[newtag.name] = true
          addTag(newtag)
        }
        return null
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tagsReady])

  return (
    <>
      {items &&
        items
          .filter((item) => item.layer?.name === name)
          .filter((item) =>
            filterTags.length === 0
              ? item
              : filterTags.some((tag) =>
                  getItemTags(item).some(
                    (filterTag) =>
                      filterTag.name.toLocaleLowerCase() === tag.name.toLocaleLowerCase(),
                  ),
                ),
          )
          .filter((item) => item.layer && isLayerVisible(item.layer))
          .filter(
            (item) =>
              (item.group_type && isGroupTypeVisible(item.group_type)) ||
              visibleGroupTypes.length === 0,
          )
          .map((item: Item) => {
            if (getValue(item, itemLongitudeField) && getValue(item, itemLatitudeField)) {
              // eslint-disable-next-line security/detect-object-injection
              if (getValue(item, itemTextField)) item[itemTextField] = getValue(item, itemTextField)
              // eslint-disable-next-line security/detect-object-injection
              else item[itemTextField] = ''

              if (item.tags) {
                // eslint-disable-next-line security/detect-object-injection
                item[itemTextField] = item[itemTextField] + '\n\n'
                item.tags.map((tag) => {
                  // eslint-disable-next-line security/detect-object-injection
                  if (!item[itemTextField].includes(`#${encodeTag(tag)}`)) {
                    // eslint-disable-next-line security/detect-object-injection
                    return (item[itemTextField] = item[itemTextField] + `#${encodeTag(tag)} `)
                  }
                  // eslint-disable-next-line security/detect-object-injection
                  return item[itemTextField]
                })
              }

              if (allTagsLoaded && allItemsLoaded) {
                // eslint-disable-next-line security/detect-object-injection
                item[itemTextField].match(hashTagRegex)?.map((tag) => {
                  if (
                    !tags.find(
                      (t) => t.name.toLocaleLowerCase() === tag.slice(1).toLocaleLowerCase(),
                    ) &&
                    !newTagsToAdd.find(
                      (t) => t.name.toLocaleLowerCase() === tag.slice(1).toLocaleLowerCase(),
                    )
                  ) {
                    const newTag = {
                      id: crypto.randomUUID(),
                      name: tag.slice(1),
                      color: randomColor(),
                    }
                    setNewTagsToAdd((current) => [...current, newTag])
                  }
                  return null
                })
                !tagsReady && setTagsReady(true)
              }

              const itemTags = getItemTags(item)

              const latitude =
                itemLatitudeField && item ? getValue(item, itemLatitudeField) : undefined
              const longitude =
                itemLongitudeField && item ? getValue(item, itemLongitudeField) : undefined

              let color1 = markerDefaultColor
              let color2 = markerDefaultColor2
              if (itemColorField && getValue(item, itemColorField) != null)
                color1 = getValue(item, itemColorField)
              else if (itemTags && itemTags[0]) {
                color1 = itemTags[0].color
              }
              if (itemTags && itemTags[0] && itemColorField) color2 = itemTags[0].color
              else if (itemTags && itemTags[1]) {
                color2 = itemTags[1].color
              }
              return (
                <Marker
                  ref={(r) => {
                    if (!(item.id in leafletRefs && leafletRefs[item.id].marker === r)) {
                      r && addMarker(item, r)
                    }
                  }}
                  eventHandlers={{
                    click: () => {
                      selectPosition && setMarkerClicked(item)
                    },
                  }}
                  icon={MarkerIconFactory(
                    markerShape,
                    color1,
                    color2,
                    item.markerIcon ? item.markerIcon : markerIcon,
                  )}
                  key={item.id}
                  position={[latitude, longitude]}
                >
                  {children &&
                  Children.toArray(children).some(
                    (child) => isValidElement(child) && child.props.__TYPE === 'ItemView',
                  ) ? (
                    Children.toArray(children).map((child) =>
                      isValidElement(child) && child.props.__TYPE === 'ItemView' ? (
                        <ItemViewPopup
                          ref={(r) => {
                            if (!(item.id in leafletRefs && leafletRefs[item.id].popup === r)) {
                              r && addPopup(item, r as Popup)
                            }
                          }}
                          key={item.id + item.name}
                          item={item}
                          setItemFormPopup={setItemFormPopup}
                        >
                          {child}
                        </ItemViewPopup>
                      ) : (
                        ''
                      ),
                    )
                  ) : (
                    <>
                      <ItemViewPopup
                        key={item.id + item.name}
                        ref={(r) => {
                          if (!(item.id in leafletRefs && leafletRefs[item.id].popup === r)) {
                            r && addPopup(item, r as Popup)
                          }
                        }}
                        item={item}
                        setItemFormPopup={setItemFormPopup}
                      />
                    </>
                  )}
                  <Tooltip offset={[0, -38]} direction='top'>
                    {item.name ? item.name : `${getValue(item, itemNameField)}`}
                  </Tooltip>
                </Marker>
              )
            } else return null
          })}
      {
        // {children}}
      }
      {itemFormPopup &&
        itemFormPopup.layer.name === name &&
        (children &&
        Children.toArray(children).some(
          (child) => isValidElement(child) && child.props.__TYPE === 'ItemForm',
        ) ? (
          Children.toArray(children).map((child) =>
            isValidElement(child) && child.props.__TYPE === 'ItemForm' ? (
              <ItemFormPopup
                key={setItemFormPopup?.name}
                position={itemFormPopup.position}
                layer={itemFormPopup.layer}
                setItemFormPopup={setItemFormPopup}
                item={itemFormPopup.item}
              >
                {child}
              </ItemFormPopup>
            ) : (
              ''
            ),
          )
        ) : (
          <>
            <ItemFormPopup
              position={itemFormPopup.position}
              layer={itemFormPopup.layer}
              setItemFormPopup={setItemFormPopup}
              item={itemFormPopup.item}
            />
          </>
        ))}
    </>
  )
}
