
import * as React from 'react'
import { useNavigate } from 'react-router-dom';

export function MapOverlayPage({children} : {children: React.ReactNode}) {


    const closeScreen = () => {
        navigate(`/`);
    }

    const navigate = useNavigate();


    return (
        <div className="tw-absolute tw-z-1000 tw-h-full tw-w-full tw-m-auto">

        <div className='tw-backdrop-brightness-75 tw-h-full tw-w-full tw-grid tw-place-items-center tw-m-auto'
        >
            <div className='tw-card tw-shadow-xl tw-bg-base-100 tw-p-4 tw-max-w-xs tw-absolute tw-top-0 tw-bottom-0 tw-right-0 tw-left-0 tw-m-auto tw-h-fit '>
                <div className="tw-card-body tw-p-2">
                   {children}
                   <button className="tw-btn tw-btn-sm tw-btn-circle tw-btn-ghost tw-absolute tw-right-2 tw-top-2" onClick={() => closeScreen()}>✕</button>
                </div>
            </div>
        </div>
        </div>
    )
}

