import * as React from 'react'
import DynamicHeroIcon from '../../../Utils/DynamicHeroIcon'
import { useLayers } from '../hooks/useLayers'


export default function AddButton({setSelectMode} : {setSelectMode: React.Dispatch<React.SetStateAction<any>>}) {

    const layers = useLayers();
    
    return (
        <div className="dropdown dropdown-top dropdown-end dropdown-hover z-500 absolute right-5 bottom-5" >
            <button tabIndex={0} className="z-500  border-0 m-0 mt-2 p-0 w-14 h-14 cursor-pointer bg-white rounded-full hover:bg-gray-100 mouse drop-shadow-md transition ease-in duration-200 focus:outline-none">
                <svg viewBox="0 0 20 20" enableBackground="new 0 0 20 20" className="w-6 h-6 inline-block">
                    <path fill="#2e8555" d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
                C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
                C15.952,9,16,9.447,16,10z" />
                </svg>
            </button>
            {layers &&
                <ul tabIndex={0} className="dropdown-content pr-2 mb-0 list-none">
                    {Array.from(layers.values()).map((layer) => (
                        <li key={layer.name} >
                            <a>
                                <div className="tooltip tooltip-left" data-tip={layer.menuText}>
                                    <button tabIndex={0}
                                        className="z-500  border-0  p-0 mb-2 mt-2 w-10 h-10 cursor-pointer rounded-full mouse drop-shadow-md transition ease-in duration-200 focus:outline-none"
                                        style={{ backgroundColor: layer.menuColor }}
                                        onClick={() => { setSelectMode(layer) }}>
                                        <DynamicHeroIcon icon={layer.menuIcon} />
                                    </button>
                                </div>
                            </a>
                        </li>
                    ))}
                </ul>
            }
        </div>
    )
}
