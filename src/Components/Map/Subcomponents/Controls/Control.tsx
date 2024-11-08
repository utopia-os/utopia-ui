/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { DomEvent } from 'leaflet'
import { createRef, useEffect } from 'react'

export const Control = ({
  position,
  children,
  zIndex,
  absolute,
}: {
  position: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'
  children: React.ReactNode
  zIndex: string
  absolute: boolean
}) => {
  const controlContainerRef = createRef<HTMLDivElement>()

  useEffect(() => {
    if (controlContainerRef.current !== null) {
      DomEvent.disableClickPropagation(controlContainerRef.current)
      DomEvent.disableScrollPropagation(controlContainerRef.current)
    }
  }, [controlContainerRef])

  return (
    <div
      ref={controlContainerRef}
      style={{ zIndex }}
      className={`${absolute && 'tw-absolute'} tw-z-[999] tw-flex-col ${position === 'topLeft' && 'tw-top-4 tw-left-4'} ${position === 'bottomLeft' && 'tw-bottom-4 tw-left-4'} ${position === 'topRight' && 'tw-bottom-4 tw-right-4'} ${position === 'bottomRight' && 'tw-bottom-4 tw-right-4'}`}
    >
      {children}
    </div>
  )
}
