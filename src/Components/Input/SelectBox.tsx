
import { useState } from 'react'
import InformationCircleIcon from '@heroicons/react/24/outline/InformationCircleIcon'
import * as React from 'react';

type SelectBoxProps = {
    labelTitle?: string;
    labelStyle?: string;
    type?: string;
    containerStyle?: string;
    defaultValue: string;
    placeholder?: string;
    updateFormValue: (value: string ) => void;

    options: {name: string, value: string}[];
    labelDescription?: string
}

export function SelectBox(props : SelectBoxProps){
    
    const {labelTitle, labelDescription, defaultValue, containerStyle, placeholder, labelStyle, options, updateFormValue} = props

    const [value, setValue] = useState(defaultValue || "")


    const updateValue = (newValue: string) =>{
        updateFormValue(newValue)
        setValue(newValue)
    }


    return (
        <div className={`tw-inline-block ${containerStyle}`}>
            {labelTitle? 
            <label  className={`tw-label  ${labelStyle}`}>
                <div className="tw-label-text">{labelTitle}
                {labelDescription && <div className="tw-tooltip tw-tooltip-right" data-tip={labelDescription}><InformationCircleIcon className='tw-w-4 tw-h-4'/></div>}
                </div>
            </label>
           : ""}
            <select className="tw-select tw-select-bordered tw-w-full" value={value} onChange={(e) => updateValue(e.target.value)}>
                <option disabled value="PLACEHOLDER">{placeholder}</option>
                {
                    options.map((o, k) => {
                        return <option value={o.value || o.name} key={k}>{o.name}</option>
                    })
                }
            </select>
        </div>
    )
}