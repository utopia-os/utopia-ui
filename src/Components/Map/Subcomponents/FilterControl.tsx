import * as React from 'react'
import { useFilterTags, useRemoveFilterTag, useSetSearchPhrase } from '../hooks/useFilter'



function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


export const FilterControl = () => {
    const filterTags = useFilterTags();
    const removeFilterTag = useRemoveFilterTag();
    const setSearchPhrase = useSetSearchPhrase();
    return (
        <div className='tw-flex tw-flex-col tw-absolute tw-top-4 tw-left-4 tw-z-[699] tw-right-4'>
            <input type="text" placeholder="search ..." className="tw-input tw-input-bordered tw-w-full tw-max-w-sm tw-shadow-xl tw-rounded-2xl" onChange={(e) => setSearchPhrase(e.target.value)} />
            <div className='tw-flex tw-flex-wrap tw-mt-4'>
                {
                    filterTags.map(tag =>
                        <div key={tag.id} className='tw-rounded-2xl tw-text-white tw-p-2 tw-px-4 tw-shadow-xl tw-card tw-mr-2 tw-mb-2' style={{ backgroundColor: tag.color }}>
                            <div className="tw-card-actions tw-justify-end">
                                <label className="tw-btn tw-btn-xs tw-btn-circle tw-absolute tw--right-2 tw--top-2 tw-bg-white tw-text-gray-600" onClick={() => (removeFilterTag(tag.id))}>✕</label>
                            </div><b>#{capitalizeFirstLetter(tag.id)}</b>
                        </div>
                    )
                }


            </div>
        </div>
    )
}
