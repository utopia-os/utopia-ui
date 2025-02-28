/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Children, cloneElement, isValidElement, useEffect, useRef, useState } from 'react'
import { TileLayer, useMapEvents, GeoJSON, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import MarkerClusterGroup from 'react-leaflet-cluster'
import { Outlet, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'

import { containsUUID } from '#utils/ContainsUUID'

import { useClusterRef, useSetClusterRef } from './hooks/useClusterRef'
import { useAddVisibleLayer } from './hooks/useFilter'
import { useLayers } from './hooks/useLayers'
import { useLeafletRefs } from './hooks/useLeafletRefs'
import {
  useSelectPosition,
  useSetMapClicked,
  useSetSelectPosition,
} from './hooks/useSelectPosition'
import AddButton from './Subcomponents/AddButton'
import { Control } from './Subcomponents/Controls/Control'
import { FilterControl } from './Subcomponents/Controls/FilterControl'
import { GratitudeControl } from './Subcomponents/Controls/GratitudeControl'
import { LayerControl } from './Subcomponents/Controls/LayerControl'
import { SearchControl } from './Subcomponents/Controls/SearchControl'
import { TagsControl } from './Subcomponents/Controls/TagsControl'
import { TextView } from './Subcomponents/ItemPopupComponents/TextView'
import { SelectPosition } from './Subcomponents/SelectPosition'

import type { ItemFormPopupProps } from '#types/ItemFormPopupProps'
import type { UtopiaMapProps } from '#types/UtopiaMapProps'
import type { Feature, Geometry as GeoJSONGeometry } from 'geojson'

export function UtopiaMapInner({
  children,
  geo,
  showFilterControl = false,
  showGratitudeControl = false,
  showLayerControl = true,
  donationWidget,
}: UtopiaMapProps) {
  const selectNewItemPosition = useSelectPosition()
  const setSelectNewItemPosition = useSetSelectPosition()
  const setClusterRef = useSetClusterRef()
  const clusterRef = useClusterRef()
  const setMapClicked = useSetMapClicked()
  const [itemFormPopup, setItemFormPopup] = useState<ItemFormPopupProps | null>(null)

  const layers = useLayers()
  const addVisibleLayer = useAddVisibleLayer()
  const leafletRefs = useLeafletRefs()

  const location = useLocation()
  const map = useMap()

  useEffect(() => {
    layers.forEach((layer) => addVisibleLayer(layer))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layers])

  const init = useRef(false)
  useEffect(() => {
    if (!init.current) {
      donationWidget &&
        setTimeout(() => {
          toast(
            <>
              <TextView itemId='' rawText={'## Do you like this Map?'} />
              <div>
                <TextView
                  itemId=''
                  rawText={'Support us building free opensource maps and help us grow 🌱☀️'}
                />
                <a href='https://opencollective.com/utopia-project'>
                  <div className='tw-btn tw-btn-sm tw-float-right'>Donate</div>
                </a>
              </div>
            </>,
            { autoClose: false },
          )
        }, 600000)
      init.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function MapEventListener() {
    useMapEvents({
      click: (e) => {
        resetMetaTags()
        // eslint-disable-next-line no-console
        console.log(e.latlng.lat + ',' + e.latlng.lng)
        if (selectNewItemPosition) {
          setMapClicked({ position: e.latlng, setItemFormPopup })
        }
      },
      moveend: () => {},
    })
    return null
  }

  useMapEvents({
    popupopen: (e) => {
      const item = Object.entries(leafletRefs).find((r) => r[1].popup === e.popup)?.[1].item
      if (window.location.pathname.split('/')[1] !== item?.id) {
        const params = new URLSearchParams(window.location.search)
        if (!location.pathname.includes('/item/')) {
          window.history.pushState(
            {},
            '',
            `/${item?.id}` + `${params.toString() !== '' ? `?${params}` : ''}`,
          )
        }
        let title = ''
        if (item?.name) title = item.name
        document.title = `${document.title.split('-')[0]} - ${title}`
      }
    },
  })

  const openPopup = () => {
    if (!containsUUID(window.location.pathname)) {
      map.closePopup()
    } else {
      if (window.location.pathname.split('/')[1]) {
        const id = window.location.pathname.split('/')[1]
        // eslint-disable-next-line security/detect-object-injection
        const ref = leafletRefs[id]
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (ref) {
          clusterRef.hasLayer(ref.marker) &&
            clusterRef?.zoomToShowLayer(ref.marker, () => {
              ref.marker.openPopup()
            })
          let title = ''
          if (ref.item.name) title = ref.item.name
          document.title = `${document.title.split('-')[0]} - ${title}`
          document
            .querySelector('meta[property="og:title"]')
            ?.setAttribute('content', ref.item.name)
          document
            .querySelector('meta[property="og:description"]')
            ?.setAttribute('content', ref.item.text ?? '')
        }
      }
    }
  }

  useEffect(() => {
    openPopup()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leafletRefs, location])

  const resetMetaTags = () => {
    const params = new URLSearchParams(window.location.search)
    if (!containsUUID(window.location.pathname)) {
      window.history.pushState({}, '', '/' + `${params.toString() !== '' ? `?${params}` : ''}`)
    }
    document.title = document.title.split('-')[0]
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', document.title)
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute(
        'content',
        `${document.querySelector('meta[name="description"]')?.getAttribute('content')}`,
      )
  }

  const onEachFeature = (feature: Feature<GeoJSONGeometry, any>, layer: L.Layer) => {
    if (feature.properties) {
      layer.bindPopup(feature.properties.name)
    }
  }

  return (
    <div
      className={`tw-h-full ${selectNewItemPosition != null ? 'crosshair-cursor-enabled' : undefined}`}
    >
      <Outlet />
      <Control position='topLeft' zIndex='1000' absolute>
        <SearchControl />
        <TagsControl />
      </Control>
      <Control position='bottomLeft' zIndex='999' absolute>
        {showFilterControl && <FilterControl />}
        {showLayerControl && <LayerControl />}
        {showGratitudeControl && <GratitudeControl />}
      </Control>
      <TileLayer
        maxZoom={19}
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://tile.osmand.net/hd/{z}/{x}/{y}.png'
      />
      <MarkerClusterGroup
        ref={(r) => setClusterRef(r as any)}
        showCoverageOnHover
        chunkedLoading
        maxClusterRadius={50}
        removeOutsideVisibleBounds={false}
      >
        {Children.toArray(children).map((child) =>
          isValidElement<{
            setItemFormPopup: React.Dispatch<React.SetStateAction<ItemFormPopupProps>>
            itemFormPopup: ItemFormPopupProps | null
            clusterRef: React.MutableRefObject<undefined>
          }>(child)
            ? cloneElement(child, { setItemFormPopup, itemFormPopup, clusterRef })
            : child,
        )}
      </MarkerClusterGroup>
      {geo && (
        <GeoJSON
          data={geo}
          onEachFeature={onEachFeature}
          eventHandlers={{
            click: (e) => {
              if (selectNewItemPosition) {
                e.layer.closePopup()
                setMapClicked({ position: e.latlng, setItemFormPopup })
              }
            },
          }}
        />
      )}
      <MapEventListener />
      <AddButton triggerAction={setSelectNewItemPosition} />
      {selectNewItemPosition != null && (
        <SelectPosition setSelectNewItemPosition={setSelectNewItemPosition} />
      )}
    </div>
  )
}
