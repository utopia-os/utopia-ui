import { LatLng } from 'leaflet'
import { MapContainer } from 'react-leaflet'

import { ContextWrapper } from '#components/AppShell/ContextWrapper'

import { UtopiaMapInner } from './UtopiaMapInner'

import type { UtopiaMapProps } from '#types/UtopiaMapProps'
import 'react-toastify/dist/ReactToastify.css'

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
  infoText,
}: UtopiaMapProps) {
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
          infoText={infoText}
        >
          {children}
        </UtopiaMapInner>
      </MapContainer>
    </ContextWrapper>
  )
}

export { UtopiaMap }
