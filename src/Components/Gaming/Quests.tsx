import * as React from 'react'
import { useQuestsOpen, useSetQuestOpen } from './hooks/useQuests';
import { useAuth } from '../Auth';
import { useEffect } from 'react';

export function Quests() {

    const questsOpen = useQuestsOpen();
    const setQuestsOpen = useSetQuestOpen();
    const { isAuthenticated, user } = useAuth();

    useEffect(() => {
      setQuestsOpen(false);
    }, [])
    

    return (
        <>{questsOpen ?
            <div className="tw-card tw-w-48 tw-bg-base-100 tw-shadow-xl tw-absolute tw-bottom-4 tw-left-4 tw-z-[2000]">
                <div className="tw-card-body tw-p-4 tw-pt-0">
                    <div className="tw-card-actions tw-justify-end">
                        <label className="tw-btn tw-btn-sm tw-btn-circle tw-btn-ghost tw-absolute tw-right-1 tw-top-1" onClick={() => setQuestsOpen(false)}>✕</label>
                    </div>
                    <h2 className="tw-card-title tw-m-auto ">
                        Level 1
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#aaa" className="tw-w-5 tw-h-5 tw-cursor-pointer">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                        </svg>

                    </h2>
                    <ul className='tw-flex-row'>
                        <li><label className="tw-label tw-justify-normal tw-pt-1 tw-pb-0"><input type="checkbox" readOnly={true} className="tw-checkbox tw-checkbox-xs tw-checkbox-success" checked={isAuthenticated ? isAuthenticated : false} /><span className='tw-text-sm tw-label-text tw-mx-2'>Sign Up</span></label></li>
                        <li><label className="tw-label tw-justify-normal tw-pt-1 tw-pb-0"><input type="checkbox" readOnly={true} className="tw-checkbox tw-checkbox-xs tw-checkbox-success" checked={user?.description ? true : false} /><span className='tw-text-sm tw-label-text tw-mx-2'>Fill Profile</span></label></li>
                        <li><label className="tw-label tw-justify-normal tw-pt-1 tw-pb-0"><input type="checkbox" readOnly={true} className="tw-checkbox tw-checkbox-xs tw-checkbox-success" checked={user?.avatar ? true : false} /><span className='tw-text-sm tw-label-text tw-mx-2'>Upload Avatar</span></label></li>
                    </ul>
                    { /**                 <button className='tw-btn tw-btn-xs tw-btn-neutral tw-w-fit tw-self-center tw-mt-1'>Next &gt;</button> */
                    }                </div>
            </div>
            : ""
        }
        </>
    )


}
