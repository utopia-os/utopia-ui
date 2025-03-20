/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { control } from 'leaflet'
import { useEffect, useRef, useState } from 'react'
import SVG from 'react-inlinesvg'
import { useMap, useMapEvents } from 'react-leaflet'

import TargetSVG from '#assets/target.svg'

// eslint-disable-next-line import/no-unassigned-import
import 'leaflet.locatecontrol'

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
      setLc(control.locate().addTo(map))
      init.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useMapEvents({
    locationfound: () => {
      setLoading(false)
      setActive(true)
    },
  })

  return (
    <>
      <div className='tw-card tw:h-12 tw:w-12 tw:bg-base-100 tw:shadow-xl tw:items-center tw:justify-center  tw:hover:bg-slate-300 tw:hover:cursor-pointer tw:transition-all tw:duration-300 tw:ml-2'>
        <div
          className='tw-card-body tw-card tw:p-2 tw:h-10 tw:w-10  '
          onClick={() => {
            if (active) {
              lc.stop()
              setActive(false)
            } else {
              lc.start()
              setLoading(true)
            }
          }}
        >
          {loading ? (
            <span className='tw-loading tw-loading-spinner tw-loading-md tw:mt-1'></span>
          ) : (
            <SVG
              src={TargetSVG}
              className='tw:mt-1 tw:p-[1px]'
              style={{ fill: `${active ? '#fc8702' : 'currentColor'}` }}
            />
          )}
        </div>
      </div>
    </>
  )
}
