import * as L from 'leaflet'
import * as React from 'react'



export const Control = ({ position, children, zIndex }: { position: "topLeft" | "topRight" | "bottomLeft" | "bottomRight", children: React.ReactNode, zIndex: string }) => {


  const controlContainerRef = React.createRef<HTMLDivElement>()


  React.useEffect(() => {
    if (controlContainerRef.current !== null) {
      L.DomEvent.disableClickPropagation(controlContainerRef.current)
      L.DomEvent.disableScrollPropagation(controlContainerRef.current)
    }
  }, [controlContainerRef])

  return (
    <div ref={controlContainerRef} style={{zIndex: zIndex}} className={`tw-absolute tw-z-[999] tw-flex-col ${position === 'topLeft' && "tw-top-4 tw-left-4"} ${position === 'bottomLeft' && "tw-bottom-4 tw-left-4"} ${position === 'topRight' && "tw-bottom-4 tw-right-4"} ${position === 'bottomRight' && "tw-bottom-4 tw-right-4"}`}>

        {children}
    </div>
  )
}
