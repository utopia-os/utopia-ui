import { MapOverlayPage } from '#components/Templates/MapOverlayPage'

export const LoadingMapOverlay = () => {
  return (
    <MapOverlayPage>
      <div className='tw:text-center tw:loading tw:loading-spinner'></div>
    </MapOverlayPage>
  )
}
