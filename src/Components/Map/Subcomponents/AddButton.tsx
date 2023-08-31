import * as React from 'react'
import DynamicHeroIcon from '../../../Utils/DynamicHeroIcon'
import { useLayers } from '../hooks/useLayers'


export default function AddButton({setSelectMode} : {setSelectMode: React.Dispatch<React.SetStateAction<any>>}) {

    const layers = useLayers();
  
    return (
        <div className="tw-dropdown tw-dropdown-top tw-dropdown-end tw-dropdown-hover tw-z-500 tw-absolute tw-right-5 tw-bottom-5" >
            <button tabIndex={0} className="tw-z-500  tw-border-0 tw-m-0 tw-mt-2 tw-p-0 tw-w-14 tw-h-14 tw-cursor-pointer tw-bg-white tw-rounded-full hover:tw-bg-gray-100 tw-mouse tw-drop-shadow-md tw-transition tw-ease-in tw-duration-200 focus:tw-outline-none tw-shadow-xl">
                <svg viewBox="0 0 20 20" enableBackground="new 0 0 20 20" className="tw-w-6 tw-h-6 tw-inline-block">
                    <path fill="#2e8555" d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
                C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
                C15.952,9,16,9.447,16,10z" />
                </svg>
            </button>
                <ul tabIndex={0} className="tw-dropdown-content tw-pr-2 tw-mb-0 tw-list-none">
                    {layers.map((layer) => (
                        layer.api?.createItem && (
                            <li key={layer.name} >
                            <a>
                                <div className="tw-tooltip tw-tooltip-left" data-tip={layer.menuText}>
                                    <button tabIndex={0}
                                        className="tw-z-500  tw-border-0 tw-pl-2 tw-p-0 tw-mb-2 tw-mt-2 tw-w-10 tw-h-10 tw-cursor-pointer tw-rounded-full tw-mouse tw-drop-shadow-md tw-transition tw-ease-in tw-duration-200 focus:tw-outline-none"
                                        style={{ backgroundColor: layer.menuColor }}
                                        onClick={() => { setSelectMode(layer) }}>
                                        <DynamicHeroIcon icon={layer.menuIcon} /> 
                                    </button>
                                </div>
                            </a>
                        </li>
                        )

                    ))}
                </ul>
            
        </div>
    )
}
