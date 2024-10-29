import * as L from 'leaflet'
import { useMap, useMapEvents } from 'react-leaflet'
import 'leaflet.locatecontrol'

import 'leaflet.locatecontrol/dist/L.Control.Locate.css'
import { useEffect, useRef, useState } from 'react'

// Converts leaflet.locatecontrol to a React Component
export const LocateControl = () => {
  const map = useMap()

  // prevent react18 from calling useEffect twice
  const init = useRef(false)

  const [lc, setLc] = useState<any>(null)
  const [active, setActive] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (!init.current) {
      // @ts-ignore
      setLc(L.control.locate().addTo(map))
      init.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useMapEvents({
    locationfound: () => {
      setLoading(false)
      setActive(true)
    }
  })

  return (<>
        <div className="tw-card tw-h-12 tw-w-12 tw-bg-base-100 tw-shadow-xl tw-items-center tw-justify-center  hover:tw-bg-slate-300 hover:tw-cursor-pointer tw-transition-all tw-duration-300 tw-ml-2">

            <div className="tw-card-body tw-card tw-p-2 tw-h-10 tw-w-10  " onClick={() => {
              if (active) {
                lc.stop()
                setActive(false)
              } else {
                lc.start()
                setLoading(true)
              }
            }}>{loading
              ? <span className="tw-loading tw-loading-spinner tw-loading-md tw-mt-1"></span>
              : <svg fill={`${active ? '#fc8702' : 'currentColor'}`} viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" className='tw-mt-1 tw-p-[1px]'>
                <path d="M30 14.75h-2.824c-0.608-5.219-4.707-9.318-9.874-9.921l-0.053-0.005v-2.824c0-0.69-0.56-1.25-1.25-1.25s-1.25 0.56-1.25 1.25v0 2.824c-5.219 0.608-9.318 4.707-9.921 9.874l-0.005 0.053h-2.824c-0.69 0-1.25 0.56-1.25 1.25s0.56 1.25 1.25 1.25v0h2.824c0.608 5.219 4.707 9.318 9.874 9.921l0.053 0.005v2.824c0 0.69 0.56 1.25 1.25 1.25s1.25-0.56 1.25-1.25v0-2.824c5.219-0.608 9.318-4.707 9.921-9.874l0.005-0.053h2.824c0.69 0 1.25-0.56 1.25-1.25s-0.56-1.25-1.25-1.25v0zM17.25 24.624v-2.624c0-0.69-0.56-1.25-1.25-1.25s-1.25 0.56-1.25 1.25v0 2.624c-3.821-0.57-6.803-3.553-7.368-7.326l-0.006-0.048h2.624c0.69 0 1.25-0.56 1.25-1.25s-0.56-1.25-1.25-1.25v0h-2.624c0.57-3.821 3.553-6.804 7.326-7.368l0.048-0.006v2.624c0 0.69 0.56 1.25 1.25 1.25s1.25-0.56 1.25-1.25v0-2.624c3.821 0.57 6.803 3.553 7.368 7.326l0.006 0.048h-2.624c-0.69 0-1.25 0.56-1.25 1.25s0.56 1.25 1.25 1.25v0h2.624c-0.571 3.821-3.553 6.803-7.326 7.368l-0.048 0.006z"></path>
            </svg>}

            </div>
        </div></>)
}
