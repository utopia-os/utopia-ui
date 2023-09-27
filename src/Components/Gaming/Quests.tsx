import * as React from 'react'

export function Quests() {

    const [open, setOpen] = React.useState(true);

    if (open) return (
        <>
            <div className="tw-card tw-w-48 tw-bg-base-100 tw-shadow-xl tw-absolute tw-bottom-4 tw-left-4 tw-z-[2000]">
                <div className="tw-card-body tw-p-4 tw-pt-0">
                    <div className="tw-card-actions tw-justify-end">
                        <label className="tw-btn tw-btn-sm tw-btn-circle tw-btn-ghost tw-absolute tw-right-2 tw-top-2" onClick={()=>setOpen(false)}>✕</label>
                    </div>
                    <h2 className="tw-card-title tw-m-auto ">Level 1</h2>
                    <ul className='tw-flex-row'>
                        <li><label className="tw-label tw-justify-normal tw-pt-1 tw-pb-0"><input type="checkbox" readOnly={true} className="tw-checkbox tw-checkbox-xs tw-checkbox-success" checked /><span className='tw-text-sm tw-label-text tw-mx-2'>Registrieren</span></label></li>
                        <li><label className="tw-label tw-justify-normal tw-pt-1 tw-pb-0"><input type="checkbox" readOnly={true} className="tw-checkbox tw-checkbox-xs tw-checkbox-success" checked /><span className='tw-text-sm tw-label-text tw-mx-2'>Avatar hochladen</span></label></li>
                        <li><label className="tw-label tw-justify-normal tw-pt-1 tw-pb-0"><input type="checkbox" readOnly={true} className="tw-checkbox tw-checkbox-xs tw-checkbox-success" disabled /><span className='tw-text-sm tw-label-text tw-mx-2'>Profil ausfüllen</span></label></li>
                        <li><label className="tw-label tw-justify-normal tw-pt-1 tw-pb-0"><input type="checkbox" readOnly={true} className="tw-checkbox tw-checkbox-xs tw-checkbox-success" disabled /><span className='tw-text-sm tw-label-text tw-mx-2'>Gruppe beitreten</span></label></li>
                    </ul>
                </div>
            </div>
        </>
    )

    else return (
        <></>
    )
}
