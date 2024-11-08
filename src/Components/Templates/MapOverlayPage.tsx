/* eslint-disable @typescript-eslint/restrict-template-expressions */
import * as L from 'leaflet'
import * as React from 'react'
import { useNavigate } from 'react-router-dom'

export function MapOverlayPage({
  children,
  className,
  backdrop,
  card = true,
}: {
  children: React.ReactNode
  className?: string
  backdrop?: boolean
  card?: boolean
}) {
  const closeScreen = () => {
    navigate(`/${window.location.search ? window.location.search : ''}`)
  }

  const navigate = useNavigate()

  const overlayRef = React.createRef<HTMLDivElement>()
  const backdropRef = React.createRef<HTMLDivElement>()

  React.useEffect(() => {
    if (overlayRef.current !== null) {
      L.DomEvent.disableClickPropagation(overlayRef.current)
      L.DomEvent.disableScrollPropagation(overlayRef.current)
    }
    if (backdropRef.current !== null && backdrop) {
      L.DomEvent.disableClickPropagation(backdropRef.current)
      L.DomEvent.disableScrollPropagation(backdropRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [overlayRef, backdropRef])

  return (
    <div className={`tw-absolute tw-h-full tw-w-full tw-m-auto ${backdrop && 'tw-z-[2000]'}`}>
      <div
        ref={backdropRef}
        className={`${backdrop && 'tw-backdrop-brightness-75'} tw-h-full tw-w-full tw-grid tw-place-items-center tw-m-auto`}
      >
        <div
          ref={overlayRef}
          className={`${card && 'tw-card tw-card-body'} tw-shadow-xl tw-bg-base-100 tw-p-6 ${className && className} ${!backdrop && 'tw-z-[2000]'} tw-absolute tw-top-0 tw-bottom-0 tw-right-0 tw-left-0 tw-m-auto`}
        >
          {children}
          <button
            className='tw-btn tw-btn-sm tw-btn-circle tw-btn-ghost tw-absolute tw-right-2 tw-top-2'
            onClick={() => closeScreen()}
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  )
}
