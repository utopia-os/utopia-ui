/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { LatLng } from 'leaflet'
import {
  Children,
  cloneElement,
  createRef,
  isValidElement,
  useEffect,
  useRef,
  useState,
} from 'react'
import { TileLayer, MapContainer, useMapEvents, GeoJSON } from 'react-leaflet'
// eslint-disable-next-line import/no-unassigned-import
import 'leaflet/dist/leaflet.css'
import MarkerClusterGroup from 'react-leaflet-cluster'
import { Outlet } from 'react-router-dom'
import { toast } from 'react-toastify'

import { ItemFormPopupProps, UtopiaMapProps } from '#src/types'

// eslint-disable-next-line import/no-unassigned-import
import './UtopiaMap.css'

import { useClusterRef, useSetClusterRef } from './hooks/useClusterRef'
import { useAddVisibleLayer } from './hooks/useFilter'
import { useLayers } from './hooks/useLayers'
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

import type { Feature, Geometry as GeoJSONGeometry } from 'geojson'

const mapDivRef = createRef()

export function UtopiaMapInner({
  height = '500px',
  width = '100%',
  center = [50.6, 9.5],
  zoom = 10,
  children,
  geo,
  showFilterControl = false,
  showGratitudeControl = false,
  showLayerControl = true,
  infoText,
}: UtopiaMapProps) {
  // Hooks that rely on contexts, called after ContextWrapper is provided
  const selectNewItemPosition = useSelectPosition()
  const setSelectNewItemPosition = useSetSelectPosition()
  const setClusterRef = useSetClusterRef()
  const clusterRef = useClusterRef()
  const setMapClicked = useSetMapClicked()
  const [itemFormPopup, setItemFormPopup] = useState<ItemFormPopupProps | null>(null)

  const layers = useLayers()
  const addVisibleLayer = useAddVisibleLayer()

  useEffect(() => {
    layers.forEach((layer) => addVisibleLayer(layer))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layers])

  const init = useRef(false)
  useEffect(() => {
    if (!init.current) {
      infoText &&
        setTimeout(() => {
          toast(<TextView rawText={infoText} />, { autoClose: false })
        }, 4000)
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

  const resetMetaTags = () => {
    const params = new URLSearchParams(window.location.search)
    if (!window.location.pathname.includes('/item/')) {
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
      <MapContainer
        ref={mapDivRef}
        style={{ height, width }}
        center={new LatLng(center[0], center[1])}
        zoom={zoom}
        zoomControl={false}
        maxZoom={19}
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
          ref={(r) => setClusterRef(r)}
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
      </MapContainer>
      <AddButton triggerAction={setSelectNewItemPosition} />
      {selectNewItemPosition != null && (
        <SelectPosition setSelectNewItemPosition={setSelectNewItemPosition} />
      )}
    </div>
  )
}
