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
        <div className="tw-card tw-bg-base-100 tw-shadow-xl " onClick={e => e.stopPropagation()}>
            {
                open ?
                    <div className="tw-card-body tw-p-2 tw-w-32 tw-transition-all tw-duration-300" onClick={e => e.stopPropagation()}>
                        <label className="tw-btn tw-btn-sm tw-rounded-2xl tw-btn-circle tw-btn-ghost hover:tw-bg-transparent tw-absolute tw-right-0 tw-top-0 tw-bg-white tw-text-gray-600" onClick={() => setOpen(false)}><p className='tw-text-center '>✕</p></label>

                        <ul className='tw-flex-row'>
                            {
                                layers.map(layer =>
                                    <li key={layer.name}><label className="tw-label tw-justify-normal tw-pt-1 tw-pb-1"><input type="checkbox" className="tw-checkbox tw-checkbox-xs tw-checkbox-success" checked={isLayerVisible(layer)} onChange={() => toggleVisibleLayer(layer)} /><span className='tw-text-sm tw-label-text tw-mx-2'>{layer.name}</span></label></li>

                                )
                            }

                        </ul>
                    </div>
                    :
                    <div className="tw-card-body hover:tw-bg-slate-300 tw-rounded-2xl tw-p-2 tw-h-10 tw-w-10 tw-transition-all tw-duration-300 hover:tw-cursor-pointer" onClick={() => setOpen(true)}>
                        <svg version="1.1" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path id="svg_1" fill="#000" d="m2.75565,11.90727l-1.03852,0.28372c-0.77718,0.38859 -0.77718,1.0138 0,1.4023l7.0156,3.5078c0.77718,0.38859 2.0275,0.38859 2.8047,0l7.0156,-3.5078c0.77718,-0.38859 0.77718,-1.0138 0,-1.4023l-0.63311,-0.48643l-4.67718,2.23624c-1.5452,0.77262 -3.31877,1.58343 -4.86407,0.81081l-5.62302,-2.84434z" />
                            <path id="svg_2" strokeWidth="2" stroke="#000" fill="none" d="m11.247,4.30851l6.2349,3.0877c0.69083,0.34211 0.69083,0.89295 0,1.2351l-6.2349,3.0877c-0.69083,0.34211 -1.8031,0.34212 -2.494,0l-6.2349,-3.0877c-0.69083,-0.34211 -0.69083,-0.89295 0,-1.2351l6.2349,-3.0877c0.69083,-0.34211 1.8031,-0.34211 2.494,0z" />
                        </svg>
                    </div>

            }

        </div>
    )
}
