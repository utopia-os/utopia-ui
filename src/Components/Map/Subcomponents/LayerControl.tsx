import * as React from 'react'
import { useLayers } from '../hooks/useLayers';
import { useAddVisibleLayer, useIsLayerVisible, useToggleVisibleLayer } from '../hooks/useFilter';
import { useEffect } from 'react';

export function LayerControl() {

    const [open, setOpen] = React.useState(false);

    const layers = useLayers();

    useEffect(() => {
        layers.map(layer =>
            addVisibleLayer(layer)
        )

    }, [layers])

    const isLayerVisible = useIsLayerVisible();
    const toggleVisibleLayer = useToggleVisibleLayer();
    const addVisibleLayer = useAddVisibleLayer();

    return (
        <div className="tw-card tw-bg-base-100 tw-shadow-xl tw-absolute tw-bottom-4 tw-left-4 tw-z-1000 " onClick={e=> e.stopPropagation()}>
            {
                open ?
                    <div className="tw-card-body tw-p-2 tw-w-32 tw-transition-all tw-duration-300" onClick={e=> e.stopPropagation()}>
                        <label className="tw-btn tw-btn-sm tw-rounded-2xl tw-btn-circle tw-btn-ghost hover:tw-bg-transparent tw-absolute tw-right-0 tw-top-0 tw-bg-white tw-text-gray-600" onClick={()=>setOpen(false)}><p className='tw-text-center '>✕</p></label>

                        <ul className='tw-flex-row'>
                            {
                                layers.map(layer =>
                                    <li key={layer.name}><label className="tw-label tw-justify-normal tw-pt-1 tw-pb-1"><input type="checkbox" className="tw-checkbox tw-checkbox-xs tw-checkbox-success" checked={isLayerVisible(layer)} onChange={() => toggleVisibleLayer(layer)} /><span className='tw-text-sm tw-label-text tw-mx-2'>{layer.name}</span></label></li>

                                )
                            }

                        </ul>
                    </div>
                    :
                    <div className="tw-card-body tw-p-2 tw-h-10 tw-w-10 tw-transition-all tw-duration-300 hover:tw-cursor-pointer" onClick={() => setOpen(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </div>

            }

        </div>
    )
}
