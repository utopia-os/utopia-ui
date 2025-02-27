import { LatLng } from 'leaflet'
import { MapContainer } from 'react-leaflet'

import { ContextWrapper } from '#components/AppShell/ContextWrapper'

import { UtopiaMapInner } from './UtopiaMapInner'

import 'react-toastify/dist/ReactToastify.css'
import type { GeoJsonObject } from 'geojson'

/**
 * @category Map
 */
function UtopiaMap({
  height = '500px',
  width = '100%',
  center = [50.6, 9.5],
  zoom = 10,
  children,
  geo,
  showFilterControl = false,
  showGratitudeControl = false,
  showLayerControl = true,
  donationWidget,
}: {
  height?: string
  width?: string
  center?: [number, number]
  zoom?: number
  children?: React.ReactNode
  geo?: GeoJsonObject
  showFilterControl?: boolean
  showLayerControl?: boolean
  showGratitudeControl?: boolean
  donationWidget?: boolean
}) {
  return (
    <ContextWrapper>
      <MapContainer
        style={{ height, width }}
        center={new LatLng(center[0], center[1])}
        zoom={zoom}
        zoomControl={false}
        maxZoom={19}
      >
        <UtopiaMapInner
          geo={geo}
          showFilterControl={showFilterControl}
          showGratitudeControl={showGratitudeControl}
          showLayerControl={showLayerControl}
          donationWidget={donationWidget}
        >
          {children}
        </UtopiaMapInner>
      </MapContainer>
    </ContextWrapper>
  )
}

export { UtopiaMap }
