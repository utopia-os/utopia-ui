import * as React from 'react'
import * as L from 'leaflet'
import { useLayers } from '../../hooks/useLayers';
import { useAddVisibleGroupType, useIsGroupTypeVisible, useToggleVisibleGroupType } from '../../hooks/useFilter';
import { useEffect } from 'react';

export function FilterControl() {

    const [open, setOpen] = React.useState(false);

    const groupTypes = [{text: "Regional Gruppe", value: "wuerdekompass" },{text: "Themen Gruppe",  value:"themenkompass"}, {text: "liebevoll.jetzt", value: "liebevoll.jetzt"}]


    useEffect(() => {
        groupTypes.map(layer =>
            addVisibleGroupType(layer.value)
        )
    }, [])


    const isGroupTypeVisible = useIsGroupTypeVisible();
    const toggleVisibleGroupType = useToggleVisibleGroupType();
    const addVisibleGroupType = useAddVisibleGroupType();

    return (
        <div className="tw-card tw-bg-base-100 tw-shadow-xl tw-mt-2 tw-w-fit">
            {
                open ?
                    <div className="tw-card-body tw-p-2 tw-w-fit tw-transition-all tw-duration-300">
                        <label className="tw-btn tw-btn-sm tw-rounded-2xl tw-btn-circle tw-btn-ghost hover:tw-bg-transparent tw-absolute tw-right-0 tw-top-0 tw-text-gray-600" onClick={() => {
                            setOpen(false)
                        }}>
                            <p className='tw-text-center '>✕</p></label>
                        <ul className='tw-flex-row'>
                            {
                                groupTypes.map(groupType =>
                                    <li key={groupType.value}><label htmlFor={groupType.value} className="tw-label tw-justify-normal tw-pt-1 tw-pb-1"><input id={groupType.value} onChange={() => toggleVisibleGroupType(groupType.value)} type="checkbox" className="tw-checkbox tw-checkbox-xs tw-checkbox-success" checked={isGroupTypeVisible(groupType.value)} /><span className='tw-text-sm tw-label-text tw-mx-2 tw-cursor-pointer'>{groupType.text}</span></label></li>
                                )
                            }
                        </ul>
                    </div>
                    :
                    <div className="tw-card-body hover:tw-bg-slate-300 tw-card tw-p-2 tw-h-10 tw-w-10 tw-transition-all tw-duration-300 hover:tw-cursor-pointer" onClick={() => {
                        setOpen(true)
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.3} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
                        </svg>
                    </div>

            }

        </div>
    )
}
